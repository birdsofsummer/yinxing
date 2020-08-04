const superagent=require('superagent')

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


// https://news.qq.com/zt2020/page/feiyan.htm
// https://service-n9zsbooc-1252957949.gz.apigw.tencentcs.com/release/qq

const SERVER="https://view.inews.qq.com/g2/getOnsInfo"
const NAMES=[
   "wuwei_ww_area_counts",
   "wuwei_ww_cn_day_counts",
   "wuwei_ww_global_vars",
   "wuwei_ww_time_line",
   "disease_h5",
]

const HEADERS={
    "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
    "Accept" : "*/*",
    "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Connection" : "keep-alive",
}

const get_data=async ()=>{
    const get=(name="")=>superagent
        .get(SERVER)
        .set(HEADERS)
        .query({name})
        .type('json')
    let o={}
    for (let i of NAMES){
        let r=await get(i)
        let {ret,data}=r.body
        o[i]= ret==0 ? JSON.parse(data) :{}
    }
    return o
}

const test=async ()=>{
    let u=require('utility')
    let r=await get_data()
    u.writeJSON('qq.json',r)
}

//exports={}

exports.main_handler = async (event, context, callback) => {
    console.log({event, context,})
    try{
       let d=await get_data()
       console.log(d)
       return res_json(d,200,true)
    }catch(e){
       return res_json({},500,false)
    }
}

