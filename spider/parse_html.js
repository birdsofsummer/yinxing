const R=require('ramda')
const util=require('utility')
const fs=require('mz/fs')
const cheerio=require('cheerio')

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

const map_text=(o)=>R.range(0,o.length).map(x=>o.eq(x).text())

module.exports={
    map_text,
}
