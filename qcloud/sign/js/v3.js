/*

https://github.com/TencentCloud/tencentcloud-sdk-nodejs/tree/master/tencentcloud/common
https://github.com/TencentCloud/tencentcloud-sdk-nodejs/tree/master/tencentcloud/scf

tencentcloud-sdk-nodejs
qcloudapi-sdk
qcloud-cos-sts
qcloudsms_js
tencent-login

*/


const crypto=require("crypto")
const R=require("ramda")
const {URLSearchParams}=require('url')
const utility = require('utility')
const superagent=require('superagent')
const {hmac}=utility

const sha1=(a,b)=>hmac('sha1',a,b,'base64')
const sha256=(a,b)=>hmac('sha256',a,b,'base64')

// expand_qs({x:1,x_0:1,y:[1,2,3]}) -> { x: 1,'x.0':1, 'y.0': 1, 'y.1': 2, 'y.2': 3 }
const expand_qs=R.pipe(
    R.toPairs,
    R.map(([k,v])=>Array.isArray(v)
        ?
        v.map((x,i)=>[k+"."+i,x])
        :[[k.replace('_',"."),v]]
    ),
    R.invoker(0,'flat'),
    R.fromPairs,
)


const qs=(x={})=>new URLSearchParams(x)
const qs1=R.pipe(
    R.toPairs,
    R.sort(R.ascend(R.prop(0))),
    R.fromPairs,
    qs
)




const SERVER=".tencentcloudapi.com"

const init=({
    SecretKey="xxx",        //
    SecretId="xxx",         //
    Region="ap-guangzhou",  //
    Action="ListFunctions",
    SignatureMethod="HmacSHA256",
    apiVersion="2018-04-16",
    sdkVersion="3.0.121",   //
    endpoint="scf.tencentcloudapi.com",
    module="scf",
    host=SERVER,
    token="",
    reqMethod = "POST",
    protocol = "https://",
    reqTimeout = 60,
    Language = "en-US",
    path = "/",
}=process.env)=>{
    const config={
            Language ,
            path ,
            sdkVersion : "SDK_NODEJS_" + sdkVersion,
            RequestClient : "SDK_NODEJS_" + sdkVersion,
            Version : apiVersion,
            apiVersion : apiVersion,
            endpoint: module+host,
            url:protocol+module+host,
            Region ,
            Action,
            Nonce: Math.round(Math.random() * 65535),
            Timestamp : Math.round(Date.now() / 1000),
            token:token,
            SecretId,
            SecretKey,
            SignatureMethod,
            credential:{
                SecretId,
                SecretKey,
            },
            profile:{
                SignatureMethod,
                httpProfile:{
                        reqMethod ,
                        protocol,
                        endpoint : module+host,
                        reqTimeout,
                },
            },
    }
    return config
}

// d={x:1,y:null,z:[1,2,3]}
// d1={x:1,"z.0":1,"z.1":2,"z.2":3}
sign=(d={},config={})=>{

    const kk=[
          "Action",    // 'GetUserAppId',
          "RequestClient",    // 'SDK_NODEJS_3.0.118',
          "Nonce",    // 53367,
          "Timestamp",    // 1582130163,
          "Version",    // '2019-01-16',
          "Language",    // 'en-US',
          "SecretId",    // 'xxxx',
          "Region",    // 'ap-guangzhou',
          "SignatureMethod",// 'HmacSHA256',
          //"token",
    ]

    const {
            SecretId,
            SecretKey,
            SignatureMethod,
            path,
            profile:{
                httpProfile:{
                        reqMethod ,
                        protocol,
                        endpoint,
                        reqTimeout,
                },
            },
    }=config

    let config1=R.pickAll(kk)(config)
    let d1=R.pipe(R.merge(config1),R.pickBy((v,k)=>v),expand_qs)(d)
    let ss= [
        reqMethod.toLocaleUpperCase(),
        endpoint,
        path,
        "?",
        qs1(d1),
    ].join("")
    console.log(ss)
/*
 *

POSTscf.tencentcloudapi.com/?Action=ListFunctions&Language=en-US&Nonce=13412&Region=ap-guangzhou&RequestClient=SDK_NODEJS_3.0.113&SecretId=AKIDlQ2ZnrCd2iI1bx5F9i9dtSn374tsacZc&SignatureMethod=HmacSHA256&Timestamp=1582824790&Version=2018-04-16

*/
    return {
        ...d1,
        Signature:sha256(SecretKey,ss),
    }
}

//php $_POST
const post=(d={},config=init())=> superagent.post(config.url)
              .type("form")
              .send(d)

const test=async ()=>{
    let d={}
    let config=R.merge(process.env,{
        "apiVersion":'2018-04-16',
        "module":"scf",
        "Action":"ListFunctions",
    })
    let c=init(config)
    let d1=sign(d,c)
    console.log(d1)
    let r=await post(d1,c)
    console.log(r.body)
    return r
}

//test()
















module.exports={
    init,
    sign,
    post,
    test,
}





