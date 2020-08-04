const request = require('superagent')
const superagent=require('superagent-charset')(request)
const agent = superagent.agent();
const R=require("ramda")
const cheerio=require("cheerio")

cookie={}
const json2cookie=(c={})=>R.values(R.mapObjIndexed((v,k)=>k+"="+v)(c)).join("; ")

const get_cookie=()=>json2cookie(cookie)
const url2headers=(x)=>({
    "referrer": x,
    //"Cookie":get_cookie(),
    ...headers,
})

headers= {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
       // "referrer": url,
    }



const get=(x)=>{
    let headers= url2headers(x)
    let req=agent
        .get(x)
        .charset()
        .buffer(true)
     R.mapObjIndexed((v,k,o)=>req.set(k,v))(headers)
     return req
}


module.exports=get
