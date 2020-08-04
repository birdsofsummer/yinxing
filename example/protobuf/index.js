// https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/proto

var protobuf= require("protobufjs");

const PROTO="./v3/zzz.proto"



const CORS_HEADERS={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width,token',
    'access-control-max-age': '1728000',
}

// application/json
const res_base64=(s="",code=200,ok=true)=>({
    "isBase64Encoded": true,
    "statusCode": code,
    "headers": {"Content-Type": "text/plain; charset=utf-8",...CORS_HEADERS},
    "body": s,
})


const encode=(n=109)=>{
    var root = protobuf.loadSync(PROTO);
    var AccountList = root.lookupType("zzz.AccountList");
    var Account = root.lookupType("zzz.Account");
    var users = AccountList.create();
    const create_user=(i=0)=>{
        const a = Account.create();
        a.accountName = "aaa"+i
        a.pwd = "bbb"+i
        return a
    }
    for(var i = 0; i < n; i++){
        let z=create_user(i)
        users.list.push(z);
        //users.list.pop()
        //users.list.shift()
        //users.list.splice(0,3)
    }

    var buffer = AccountList.encode(users).finish();
    let s= buffer.toString('base64')
    return s
}


const encode1=(z={index:0,list:[]})=>{
    var root = protobuf.loadSync(PROTO);
    var AccountList = root.lookupType("zzz.AccountList");
    var Account = root.lookupType("zzz.Account");

    var users=AccountList.fromObject(z)
    var buffer = AccountList.encode(users).finish();
    let s= buffer.toString('base64')
    return s
}

const decode1=(b)=>{
    var root = protobuf.loadSync(PROTO);
    var AccountList = root.lookupType("zzz.AccountList");
    var Account = root.lookupType("zzz.Account");
    let us=AccountList.decode(b)
    let o1=AccountList.toObject(us)
    let o=us.toJSON()
    let oo=AccountList.toJSON()
    return o
}


const decode=(s="")=>{
    let b=Buffer.from(s, 'base64')
    return decode1(b)
}


//exports={}
exports.main_handler = async (event, context={}, callback=console.log) => {
    console.log({event, context,})
    let body=event.body


    //v2 解不出报错
    //v3 不会报错 返回{}
    try{
        let r=decode(body)
        console.log('zzzzzzzzzzzzzzzzz',r)
        if (r.list){
            let r1=encode1(r)
            console.log(r1)
            return res_base64(r1,200,true)
        }else{

        }
    }catch(e){
        console.log(e)
    }
    let d=encode()
    return res_base64(d,200,true)
}


test=()=>{
    z={
      index: 0,
      list: [
        { accountName: 'aaa0', pwd: 'bbb0' },
        { accountName: 'aaa1', pwd: 'bbb1' },
        { accountName: 'aaa2', pwd: 'bbb2' },
        { accountName: 'aaa3', pwd: 'bbb3' },
        { accountName: 'aaa4', pwd: 'bbb4' },
        { accountName: 'aaa5', pwd: 'bbb5' },
        { accountName: 'aaa6', pwd: 'bbb6' },
        { accountName: 'aaa7', pwd: 'bbb7' },
        { accountName: 'aaa8', pwd: 'bbb8' },
        { accountName: 'aaa9', pwd: 'bbb9' }
      ]
    }
    decode(encode1(z))
    decode(encode())
}

test1=()=>{
    const { create_e, }=require("./e")
    let e1=create_e(encode(10))
    let e2=create_e("")
    z1=exports.main_handler(e1)
    z2=exports.main_handler(e2)
    console.log(z1)
    console.log(z2)
}

//test1()
