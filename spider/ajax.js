const superagent=require('superagent')
const R=require('ramda')
const util=require('utility')
const fs=require('mz/fs')

const {
    URL,
    URLSearchParams,
    Url,
    domainToASCII,
    domainToUnicode,
    fileURLToPath,
    format,
    parse,
    pathToFileURL,
    resolve,
    resolveObject
}=require('url')

const to_qs=(o={})=>new URLSearchParams(o).toString()
const UA1="Mozilla/5.0 (Linux; Android 6.0; 1503-M02 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 MicroMessenger/6.3.25.861 NetType/WIFI Language/zh_CN"
const UA2="Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"


const get_headers=(u="")=>({
    "Origin": new URL(u).origin,
    "Referer":u,
    "User-Agent":UA1,
    "Accept":" text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language":" zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Accept-Encoding":" gzip, deflate, br",
    "Content-Type":" application/x-www-form-urlencoded",
    "Connection":" keep-alive",
    "Upgrade-Insecure-Requests":" 1",
    "Pragma":" no-cache",
    "Cache-Control":" no-cache",
})

module.exports={
    to_qs,
    get_headers,
}
