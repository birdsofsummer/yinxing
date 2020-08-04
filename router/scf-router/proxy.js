const superagent=require("superagent")
const {URL}=require("url")


const ajax=(method,url,data=null,cookie="")=>{
     let m=method.toLowerCase()
     let {host,origin,hostname}=new URL(url)
     let r=superagent[m](url,data)
        .set("referer",origin)
        .set("host",host)
        .set("User-Agent","Mozilla/5.0 (X11; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0")
 //     .set("Cookie",cookie)

     console.log(r)
     return r
}

const proxy=async ({body,headers,httpMethod,queryString:{url}, path})=>{
     let r=await ajax(httpMethod,url)
     console.log(r)
     let {text,body:body1,statusCode,headers:h}=r
     let c=h['content-type']
     const isBase64Encoded =/image/.test(c)  //|audio|video
     let b= isBase64Encoded ? body1.toString("base64") : text||body1.toString("utf-8");
     return {
       //  ...r,
         "body":b,
         isBase64Encoded,
         statusCode,
         headers:{
             "content-type":c,
         },
     }
}

