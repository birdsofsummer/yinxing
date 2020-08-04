const superagent=require("superagent")
const moment=require('moment')
const R=require('ramda')


const {URL,URLSearchParams,Url,domainToASCII,domainToUnicode,fileURLToPath,format,parse,pathToFileURL,resolve,resolveObject}=require('url')

const CORS_HEADERS={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width,token',
    'access-control-max-age': '1728000',
}


const remove_unsafe=(tt="")=>[...tt].filter(x=>x.charCodeAt(0)!=65279).join('')

const today=()=>moment().format('YYYYMMDD')
const res_json=(d={},code=200,ok=true)=>({
    "isBase64Encoded": false,
    "statusCode": code,
    "headers": {"Content-Type":"application/json; charset=utf-8",...CORS_HEADERS},
    "body": JSON.stringify({"errorCode":0,"errorMessage":"",ok:ok,data:d},null,"\t")
})

const HEADERS1={
    "Host" : "datanews.caixin.com",
    "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
    "Accept" : "text/csv,*/*",
    "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Connection" : "keep-alive",
    "Referer" : "http://datanews.caixin.com/interactive/2020/iframe/pneumonia/",
    "Pragma" : "no-cache",
    "Cache-Control" : "no-cache",
}

const HEADERS2={
    "Host" : "datanews.caixin.com",
    "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
    "Accept" : "text/csv,*/*",
    "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Connection" : "keep-alive",
    "Referer" : "http://datanews.caixin.com/interactive/2020/iframe/linechart/indexline.html",
}

const API={
    pneumonia:{
        url:"http://datanews.caixin.com/interactive/2020/iframe/pneumonia/data/pneumonia.csv",
        h:HEADERS1,
        data:{},
        title:"疫情序号,时间,省份,显示地点,累计感染（人）,累计出院（人）,在治重症（人）,累计死亡（人）"
    },
    total:{
        url:"http://datanews.caixin.com/interactive/2020/iframe/pneumonia/data/total.csv",
        h:HEADERS1,
        data:{},
        title:'总称,总数,级别,lat,lon,死亡数',
    },
    data2:{
        url:"http://datanews.caixin.com/interactive/2020/iframe/linechart/data/data2.csv",
        h:HEADERS2,
        data:{},
        title:'time,全国,湖北,北京,广东,山东,上海,广西,黑龙江,江苏,河北,天津,江西,四川,湖南,云南,浙江,台湾,河南,重庆,贵州,香港,安徽,海南,澳门,辽宁,福建,山西,宁夏,吉林,内蒙古,陕西,新疆,甘肃,青海,西藏',
    },
}


const is_buf=(b="")=>b.constructor==Buffer

const csv2json=(b="",title="")=>{
    let csv=b.toString('utf-8').replace("<feff>","")
    let [h,...t]=csv.split('\r\n')
    let t1=t.filter(x=>x).map(x=>x.split(',')).filter(x=>x[0])
 // let t2=title.split(",")
    let h1=R.split(',')(remove_unsafe(h)).filter(x=>x)
    let r1=t1.map(R.zipObj(h1))
    return r1
}

const get_csv=(h={},url,d={},title="")=>superagent
    .get(url,d)
    .set(h)
    .responseType('blob')
    .then(x=>csv2json(x.body,title))


const get_csv1=(h={},url,d={},title="")=>superagent
    .get(url,d)
    .set(h)
    .responseType('blob')
    .then(x=>x.body.toString('utf-8'))



const create_api=(a=API)=>{
    let api={}
    for (let i in a){
        let {url,title,h,data}=a[i]
        api[i]=(q={})=>get_csv(h,url,{...data,...q})
    }
    api['all']=async()=>{
        let o={}
        for (let i in a){
            let {url,title,h,data}=a[i]
            let r=await get_csv(h,url,data)
            o[i]=r
        }
        return o
    }
    api['csv']=async()=>{
        let o={}
        for (let i in a){
            let {url,title,h,data}=a[i]
            let r=await get_csv1(h,url,data)
            o[i]=r
        }
        return o
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
     const fn=kk.has(action) ? api[action] : api["all"]
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

