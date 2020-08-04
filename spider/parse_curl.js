const superagent=require('superagent')
const util=require('utility')
const R=require('ramda')
const fs=require('mz/fs')
const child_process=require("mz/child_process")
const exec = child_process.exec
const {
   parse,
   URLSearchParams,
   URL,
}=require('url')

const {
    url2qs,
    to_json1,
}=require("../fp")




const get2sa=(s="")=>{
   if (!s) throw "???"
   const  s1=s.replace(/\"/ig,'').split(' ').slice(1)
   const  paris=R.partition(x=>x=='-H'||x=='-X')(s1)[1]
   const  method=paris[0]
   const  url=R.last(paris)
   let {host,pathname}=parse(url)
   const u1=url.replace(/\?.*/,'')
   const headers=R.fromPairs(paris.slice(1,-1)
        .map(x=>x.split(":"))
        .filter(([k,v])=>!/gzip/.test(v))
    )
    const params=url2qs(url)
    let m=method.toLowerCase()
        return {
            url:u1,
            path:pathname,
            headers,
            host,
            method:m,
            params,
            data:{}
        }
}

const get2sa1=(s=``)=>{
   let [h,...t]=s.replace('curl','')
       .split(' -H ')
       .map(x=>x.replace(/\'/ig,''))
       .map(x=>x.trim())
   let t1=t.map(x=>x.split(': '))
   let headers=Object.fromEntries(t1)
   let u=new URL(h)
   const {host,pathname,searchParams}=u
   return {url:h,headers,method:"get",host,pathname,searchParams}
}


const start=async (file="c")=>{
    if (!file) throw "???"
    b=await fs.readFile(file)
    s=b.toString()
    a=s.split('\r\n').filter(x=>x)
    b=a.map(get2sa).reduce((x,y,i)=>({...x,[i]:y}),{})
    //b=a.map(get2sa).join('\n')
    fs.createWriteStream(file+".json").write(to_json1(b))
}

module.exports={
    get2sa,
    get2sa1,
}
