const superagent=require('superagent')
const cheerio=require('cheerio')

const CORS_HEADERS={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width,token',
    'access-control-max-age': '1728000',
}

const HEADERS={
            "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
            "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Accept-Encoding" : "gzip, deflate, br",
            "Connection" : "keep-alive",
            "Cookie" : "DXY_USER_GROUP=56; ifVisitOldVerBBS=false",
            "Upgrade-Insecure-Requests" : "1",
            "Pragma" : "no-cache",
            "Cache-Control" : "no-cache",
}

const res_json=(d={},code=200,ok=true)=>({
    "isBase64Encoded": false,
    "statusCode": code,
    "headers": {"Content-Type":"application/json; charset=utf-8",...CORS_HEADERS},
    "body": JSON.stringify({"errorCode":0,"errorMessage":"",ok:ok,data:d},null,"\t")
})

const parse_dxy=(html="")=>{
    const $=cheerio.load(html)
    let window={}
    let s=$('script[id]')
    for (let i=0;i<s.length;i++){
        let id=s.eq(i).attr('id')
        let js=s.eq(i).html()
        eval(js)
        console.log(id)
    }
    let img=$("img")
    let imgs=[]
    for (let i=0;i<img.length;i++){
        imgs.push(img.eq(i).attr("src"))
    }
    window.trend=imgs.filter(x=>/dxycdn/.test(x)).slice(-1)[0]
    return window
}

const get_dxy=async ()=>{
    let h={
            ...HEADERS,
            "Host" : "3g.dxy.cn",
    }
    let dxy="https://3g.dxy.cn/newh5/view/pneumonia"
    let r=await superagent
        .get(dxy)
        .set(h)
    return parse_dxy(r.text)
}

const test=async ()=>{
    let u=require('utility')
    let r=await get_dxy()
    u.writeJSON('d.json',r)
}


exports.main_handler = async (event, context, callback) => {
    console.log({event, context,})
    try{
       let d=await get_dxy()
       console.log(d)
       return res_json(d,200,true)
    }catch(e){
       return res_json({},500,false)
    }
}

/*
[
  'getTimelineService',
  'getAreaStat',
  'getPV',
  'getStatisticsService', // 主页
  'getListByCountryTypeService1',
  'getListByCountryTypeService2',
  'getEntries',
  'showPuppeteerUA'
  'trend', //趋势
]
*/
