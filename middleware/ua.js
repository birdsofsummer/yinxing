const ua_parser = require("ua-parser-js");

const FF_UA="Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"

const get_ua=(ua=FF_UA)=>new ua_parser(ua)

const parse_ua=async (c,n)=>{
    let ua = c.headers["user-agent"];
    let r=get_ua(ua)
    ctx.ua=r
    await n()
}

const check_ua=async (c,n)=>{
    let ua = c.headers["user-agent"];
    let r=get_ua(ua).getResult()
    const p=(r)=>{
        let {ua,browser,engine,os,cpu}=r
        if (/firefox/.test(ua.browser.name)){
            //...
            return true
        }
        return false
    }
    if(p(r)){
        await n()
    }else{
        console.log('bad ua....')
    }
}

module.exports={
    get_ua,
    parse_ua,
    check_ua,
}
