//https://service-090qwgea-1252957949.gz.apigw.tencentcs.com/release/

//const msgpack = require("msgpack")

const CORS_HEADERS={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width,token',
    'access-control-max-age': '1728000',
}

const res_json=(d={},code=200,ok=true)=>({
    "isBase64Encoded": false,
    "statusCode": code,
    "headers": {"Content-Type":"application/json; charset=utf-8",...CORS_HEADERS},
    "body": JSON.stringify({"errorCode":0,"errorMessage":"",ok:ok,data:d},null,"\t")
})

const res_pack=(d={},code=200,ok=true)=>({
    "isBase64Encoded": false,
    "statusCode": code,
    "headers": {"Content-Type":"application/octet-stream",...CORS_HEADERS},
    //"body": msgpack.pack({"errorCode":0,"errorMessage":"",ok:ok,data:d}),//.toString('utf-8'),
    "body": Buffer.from(JSON.stringify({"errorCode":0,"errorMessage":"",ok:ok,data:d}))
})

//exports={}
exports.main_handler = async (event, context={}, callback=console.log) => {
    console.log({event, context,})
    let body=event.body
    //let d1=msgpack.unpack(body)
    //console.log('body',d1)
    let d=event
    let r=res_pack(d,200,true)
    console.log('res',r)
    return r
}

test=()=>{
    d={x:1,y:2}
    body=msgpack.pack(d)
    body1=msgpack.pack(d).toString('utf-8')
    e={
                "body": body,
                "headerParameters": {},
                "headers": {
                    "accept": "*/*",
                    "content-length": "7",
                    "content-type": "application/x-www-form-urlencoded",
                    "endpoint-timeout": "15",
                    "host": "service-9rx17sto-1252957949.ap-hongkong.apigateway.myqcloud.com",
                    "user-agent": "curl/7.61.1",
                    "x-anonymous-consumer": "true",
                    "x-api-requestid": "08467aa6cc3ea52069d0c806675fc410",
                    "x-b3-traceid": "08467aa6cc3ea52069d0c806675fc410",
                    "x-qualifier": "$LATEST"
                },
                "httpMethod": "POST",
                "path": "/echo",
                "pathParameters": {},
                "queryString": {
                    "x": "1",
                    "y": "2"
                },
                "queryStringParameters": {},
                "requestContext": {
                    "httpMethod": "ANY",
                    "identity": {},
                    "path": "/douban",
                    "serviceId": "service-9rx17sto",
                    "sourceIp": "112.97.38.11",
                    "stage": "release"
                }
            }
    exports.main_handler(e)

}


//test()
