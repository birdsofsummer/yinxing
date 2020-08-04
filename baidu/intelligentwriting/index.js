//
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
    baidu_intelligentwriting_AppID:AppID,
    baidu_intelligentwriting_APIKey:APIKey,
    baidu_intelligentwriting_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const conn=()=>new nlp(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  r=await c.address()
}

