const superagent=require('superagent')
const moment=require('moment')
const {URL,URLSearchParams,Url,domainToASCII,domainToUnicode,fileURLToPath,format,parse,pathToFileURL,resolve,resolveObject}=require('url')




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




const HEADERS={
    "Host" : "huiyan.baidu.com",
    "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
    "Accept" : "*/*",
    "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Connection" : "keep-alive",
    "Referer" : "https://qianxi.baidu.com/?from=shoubai",
    "Pragma" : "no-cache",
    "Cache-Control" : "no-cache",
}

const today=()=>moment().format('YYYYMMDD')

const API={
    get_city : {
        url:"https://huiyan.baidu.com/migration/getcity.jsonp?callback=",
        data:{},
    },
    last_data:{
        url:"https://huiyan.baidu.com/migration/lastdate.jsonp?callback=",
        data:{},
    },
    city_rank:{
        url:"https://huiyan.baidu.com/migration/cityrank.jsonp?callback=",
        data:{
                'dt' : 'city',
                id:'420100',
                date: today(), //'20200125',
                type:'move_out'
             //     'callback' : ''
            },
    },
    history_curve:{
        url:"https://huiyan.baidu.com/migration/historycurve.jsonp?callback=",
        data: {
              'dt' : 'city',
              'id' : '420100',
              'type' : 'move_out',
              'startDate' : '20200101',
              'endDate' : today(), //'20200125'
           //   'callback' : ''
        },
    }
}


const parse_jsonp=(t="({})")=>{
    try{
       return JSON.parse(t.match(/^\((.*)\)$/)[1] ||{})
    }catch(e){
        console.log(e)
        return {}
    }
}

const get_jsonp=async (u="",q={})=>{
    let r=await superagent
        .get(u)
        .set(HEADERS)
        .query(q)
    if (r.ok){
        let {errno,errmsg,data}=parse_jsonp(r.text)
        return data
    }
    return {}
}

const create_api=(a=API)=>{
    let api={}
    for (let i in a){
        let {url,data}=a[i]
        api[i]=(q={})=>get_jsonp(url,{...data,...q})
    }
    return api
}

//exports={}
exports.main_handler = async (event, context={}, callback=console.log) => {
    const api=create_api(API)
    const kk=new Set(Object.keys(api))
    console.log(event)
    const {
                body,
                headerParameters,
                headers,
                httpMethod,
                path,
                pathParameters,
                queryString,
                queryStringParameters,
                requestContext,
                stageVariables
     }=event
     const {action="history_curve",...payload}=queryString
     const fn=kk.has(action) ? api[action] : api["history_curve"]
    try{
       let d=await fn(payload)
       console.log(d)
       return res_json(d,200,true)
    }catch(e){
       return res_json({},500,false)
    }
}

test=async ()=>{
    let e={
      "headerParameters": {},
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "connection": "keep-alive",
        "endpoint-timeout": "15",
        "host": "service-8o85sm22-1252957949.gz.apigw.tencentcs.com",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
        "x-anonymous-consumer": "true",
        "x-api-requestid": "6d7a4cb935e001a8d31405d5d8ec00a4",
        "x-b3-traceid": "6d7a4cb935e001a8d31405d5d8ec00a4",
        "x-qualifier": "$LATEST"
      },
      "httpMethod": "GET",
      "path": "/qianxi",
      "pathParameters": {},
      "queryString": {},
      "queryStringParameters": {},
      "requestContext": {
        "httpMethod": "ANY",
        "identity": {},
        "path": "/qianxi",
        "serviceId": "service-8o85sm22",
        "sourceIp": "183.239.147.178",
        "stage": "release"
      }
    }
    let r=await exports.main_handler(e)
    console.log(r)
    return r
}

