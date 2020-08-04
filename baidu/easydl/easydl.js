const {
    HttpClient,
    bodyanalysis,
    contentCensor,
    easydl,
    face,
    imageClassify,
    imageProcess,
    imageSearch,
    kg,
    nlp,
    ocr,
    speech
}=require("baidu-aip-sdk")

const {
    baidu_easydl_AppID:AppID,
    baidu_easydl_APIKey:APIKey,
    baidu_easydl_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const conn=()=>new easydl(AppID,APIKey,SecretKey)

const test=async ()=>{
      let c=conn()
      let o={ }
      let s= await read("img/1.jpg")
      r=await c.requestImage(s,o)
      r=await c.requestSound(s,o)
}

