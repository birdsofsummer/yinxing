const { Regions, SDK_CONFIG, SDK_Headers, SDK_API, }=require("./config")
const { clean,sign, formatSignString, }=require("../../fp")
const R=require("ramda")
const superagent=require("superagent")

//-----------------手写sdk------------------------------------------------------------------------------------------------

const ajax=(
        {action,data,}={action:"ListFunctions",data:{}},
        { sdkVersion, apiVersion, endpoint, signMethod, protocol, reqTimeout, reqMethod, path}=SDK_CONFIG,
        api=SDK_API,
        {SecretId,SecretKey,Region}=process.env,
)=>{
    let kk=new Set(R.keys(api))
    if (!kk.has(action)) {
        console.log(kk)
        return {ok:false,}
    }
    let url=protocol + endpoint + path
    let d={
        Action : action,
        RequestClient : sdkVersion,
        Nonce: Math.round(Math.random() * 65535),
        Timestamp : Math.round(Date.now() / 1000),
        Version : apiVersion,
        SecretId,
        Region,
        SignatureMethod:signMethod,
        Token:"",
        ...clean(data),
    }
    //签名
    //https://cloud.tencent.com/document/product/583/17238
    let Signature = sign(
        formatSignString( endpoint, reqMethod, d, path),
        signMethod,
        {SecretKey},
    )
    let method=reqMethod.toLocaleLowerCase()
    return superagent[method](url,{...d,Signature})
        //.set(SDK_Headers)
        .type('form')
}

module.exports={
    ajax,
}

/*
//使用 HmacSHA1 和 HmacSHA256 签名方法时，公共参数需要统一放到请求串中，如下
{
	"Action": "",
	"Region": "",
	"Timestamp": 0,
	"Nonce": 0,
	"SecretId": "",
	"Signature": "",
	"Version": "",
	"SignatureMethod": "",
	"Token": ""
}

export interface SignStr {
    Action:          string;
    Region:          string;
    Timestamp:       number;
    Nonce:           number;
    SecretId:        string;
    Signature:       string;
    Version:         string;
    SignatureMethod?: string; //HmacSHA256|HmacSHA1
    Token?:           string;
}
*/

