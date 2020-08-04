const mime = require('mime');
const R=require('ramda')
const {
    Url,
    parse,
    resolve,
    resolveObject,
    format,
    URL,
    URLSearchParams,
    domainToASCII,
    domainToUnicode,
    pathToFileURL,
    fileURLToPath,
    protocol,
    slashes,
    auth,
    host,
    port,
    hostname,
    hash,
    search,
    query,
    pathname,
    path,
    href
}=require("url")




const name_tail=p=>p.split('/').slice(-1)[0].split('.').slice(-1)[0]
const get_ext=(u='https://www.baidu.com/cache/fpid/chromelib_1_1.js?_=1573613647632')=>/http/.test(u) ? name_tail(new URL(u).pathname) : name_tail(u)
const path2mime1=R.pipe(get_ext,mime.getType)
const path2mime=mime.getType


module.exports={
    name_tail,
    get_ext,
    path2mime,
    path2mime1,

}
