//http://lbs.baidu.com/index.php?title=webapi/guide/webservice-geocoding

const superagent=require('superagent')
const R=require("ramda")
const {URL,URLSearchParams,Url,domainToASCII,domainToUnicode,fileURLToPath,format,parse,pathToFileURL,resolve,resolveObject}=require('url')

const get_pathname=(u="")=>parse(u).pathname
const qs=(o={})=>new URLSearchParams(o)

const {
    baidu_lbs_ak="********************************",
}=process.env

const HEADERS={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "referrer": "http://api.map.baidu.com/lbsapi/getpoint/index.html",
}

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



const API={
    search:{
        method:"get",
        url:"https://api.map.baidu.com/",
        eg:"https://api.map.baidu.com/?qt=s&c=15&wd=十堰酒店&rn=10&ie=utf-8&oue=1&res=json&ak=E4805d16520de693a3fe707cdc962045",
        query:{
                "qt": "s",
                "c": "15",
                "wd": "十堰 酒店",
                "rn": "10",
                "pn": "1", //分页
                "ie": "utf-8",
                "oue": "1",
                "res": "json",
                //"fromproduct": "jsapi",
                //"callback": "BMap._rd._cbk34597",
                "ak": "E4805d16520de693a3fe707cdc962045",
        },
        res:{
             content:[],
             result: {
                ad_display_type: 0,
                aladdin_res_num: 145,
                aladin_query_type: 0,
                area_profile: 1,
                bd_search_enable: 0,
                broadcast_type: 0,
                business_bound: '',
                catalogID: 0,
                cmd_no: 1,
                count: 10, // 149/10 =15
                current_null: 0,
                data_security_filt_res: 0,
                db: 0,
                debug: 0,
                illegal: 0,
                jump_back: 1,
                loc_attr: 0,
                op_gel: 1,
                page_num: 0,
                pattern_sign: 0,
                profile_uid: 'c3a30dc95145cf2a77026975',
                qid: '6013583878676011771',
                requery: '',
                res_bound: '(12327303,3732459;12337064,3866819)',
                res_bound_acc: '(0,0;0,0)',
                res_l: 0,
                res_x: '0.000000',
                res_y: '0.000000',
                result_show: 0,
                return_query: '十堰酒店',
                rp_strategy: 0,
                spec_dispnum: 0,
                spothot: false,
                sug_index: -1,
                time: 0,
                total: 149,
                total_busline_num: 0,
                tp: 0,
                type: 11,
                wd: '十堰酒店',
                wd2: '',
                what: '酒店',
                where: '十堰',
                error: 0,
                qt: 's',
                c: '15',
                cb_wd: '十堰酒店',
                rn: '10',
                ie: 'utf-8',
                oue: '1',
                res: 'json',
                ak: 'E4805d16520de693a3fe707cdc962045'
              }
        }
    },
    geocoding:{
        method:"get",
        url:"http://api.map.baidu.com/geocoding/v3/",
        query:{
            address:"华中科技大学",
            output:"json",
            ak:baidu_lbs_ak,
           //callback:"showLocation"
        },
        data:{},
        res:{
              "status": 0,
              "result": {
                "location": {
                  "lng": 113.95035286222772,
                  "lat": 22.534366847228462
                },
                "precise": 0,
                "confidence": 70,
                "comprehension": 0,
                "level": "教育"
              }
        },
    },
    batch:{
        url:"http://api.map.baidu.com/batch",
        query:{},
        data:[],
    }

}

const create_api=(a=API)=>{
    let api={}
    for (let i in a){
        let {url,method,query,data}=a[i]
        api[i]=(q={},d={})=>superagent[method](url)
            .query({...query,...q})
            .type('json')
            .send(d)
            .then(x=>JSON.parse(x.text))
    }

    api['search']=async ({wd="汉口 火车站",pn=0}={wd:"汉口 火车站",pn:0})=>{
        let k="search"
        let {method,query,url,data}=a[k]

        const get=(pn=0)=> superagent
            .get(url)
            .query({...query,wd,pn})
            .set(HEADERS)
            .type('json')
            .then(x=>JSON.parse(x.body.toString()))
        return get(pn)
    }


    api['find']=async (wd="十堰 酒店")=>{
        let k="search"
        let {method,query,url,data}=a[k]

        const get=(pn=0)=> superagent
            .get(url)
            .query({...query,wd,pn})
            .set(HEADERS)
            .type('json')
            .then(x=>JSON.parse(x.body.toString()))

        let zzz=await get()
        const {content,...cc}=zzz

        let {result:{ count, total, }}=cc
        let n=Math.round(total/count)
        let r=[content]
        console.log(count,"*",n,total)

        //不能太快了！
        for (let i=1;i<n;i++){
            let z=await get(i)
            r.push(z.content)
            console.log(i,"/",n,total)
        }
        console.log('done!')
        return {...cc,content: R.flatten(r)}

    }


    api["batch"]=(d=[])=>{
        let d1={reqs:d.map(({api,query})=>({
            method:"get",
            url:get_pathname(a[api]['url'])+"?"+ qs({...a[api]['query'],...query})
        }))}
        console.log(d1)
        return superagent.post(a['batch'].url)
        //    .query({})
            .type('json')
            .send(d1)
            .then(x=>JSON.parse(x.text))


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

    const is_black=/local/.test(headers.origin+headers.referer + headers['x-forwarded-host']) || /^137\.132.*/.test(requestContext.sourceIp) || /^127/.test(headers['x-forwarded-for'])

    if ( is_black){ return res_json({},200,true) }


     const {action="geocoding",...payload}=queryString
     let d={}
     try{
         if (action == "batch"){
             console.log('bbbbbbbbbbb',body)
             let b=JSON.parse(body)
             console.log(b)
             d=await api["batch"](b)
             console.log('dddddddddddd',d)
         }else{
            const fn=kk.has(action) ? api[action] : api["geocoding"]
            d=await fn(payload)
            console.log(d)
        }
        return res_json(d,200,true)
     }catch(e){
        console.log(e)
        return res_json({},500,false)
     }
}



const test1=async ()=>{
    const u=require('utility')
    let c=create_api()
    let r=await c.geocoding({address:"南山智园"})
    console.log(r)
    let r1={
      status: 0,
      result: {
        location: { lng: 114.01139397923826, lat: 22.59995346204627 },
        precise: 0,
        confidence: 50,
        comprehension: 100,
        level: '工业园区'
      }
    }
    let r2=await c.search({wd:"长沙 火车站"})
    let r3=await c.search({wd:'长沙',pn:2})
    console.log(r2)
    console.log(r3)
}



const find_h=async ()=>{
    const u=require('utility')
    let c=create_api()
    let d=[
        "武汉",
        "武昌",
        "汉阳",
        "黄石",
        "十堰",
        "沙市",
        "宜昌",
        "襄樊",
        "孝感",
        "黄陂",
        "汉川",
        "云梦",
        "应山",
        "大悟",
        "应城",
        "安陆",
        "鄂城",
        "黄冈",
        "新洲",
        "红安",
        "麻城",
        "罗川",
        "浠水",
        "蕲春",
        "黄梅",
        "广济",
        "英山",
        "咸宁",
        "阳新",
        "通山",
        "通城",
        "嘉鱼",
        "崇阳",
        "蒲圻",
        "荆门",
        "江陵",
        "钟祥",
        "京山",
        "监利",
        "石首",

        "襄阳",
        "鄂州",
        "荆州",
        "随州",
        "恩施",
        "仙桃",
        "潜江",
        "天门",
        //"神农架林区",
    ]
    let k=[
        "医院",
        "酒店",
    ]
    let kk= R.lift((a,b)=>[a,b].join(' ')) (d,k)
    let err=[]
    let j=0
    const g=async ([i,...t])=>{
        if (!i) {
            console.log('oooooooooooooo')
            return
        }
        console.log(i,j)
        try {
            let r=await c.find(i)
            let [a,b]=i.split(" ")
            u.writeJSON('json/'+ b + "/"+ a +'.json',r)
        }catch(e){
            console.log(i,'eeeeeeeeeeeeeeeeeeeeeee')
            err.push(i)
            console.log(e)
            return g([i,...t])
        }finally{

        }
        j++
        g(t)
    }
    g(kk)
}


const test=async ()=>{
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
      "queryString": {address:"南山智园"},
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



const test2=async ()=>{
    let q=[
        {api:"geocoding",query:{address:"株洲"}},
        {api:"geocoding",query:{address:"长沙"}},
        {api:"geocoding",query:{address:"岳阳"}},
    ]
    let e={
       body:JSON.stringify(q),
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
      "httpMethod": "POST",
      "path": "/qianxi",
      "pathParameters": {},
      "queryString": {"action":"batch"},
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





const test3=async ()=>{
    let q={"action":"search",wd:"长沙",pn:2}
    let e={
       //body:JSON.stringify(q),
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
      "httpMethod": "POST",
      "path": "/qianxi",
      "pathParameters": {},
      "queryString": q,
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




