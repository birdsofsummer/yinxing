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
    baidu_imageProcess_AppID:AppID,
    baidu_imageProcess_APIKey:APIKey,
    baidu_imageProcess_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const conn=()=>new imageProcess(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  let s= await read("img/1.jpg")
  r=await colourize(s,o)
  r=await contrastEnhance(s,o)
  r=await dehaze(s,o)
  r=await imageQualityEnhance(s,o)
  r=await stretchRestore(s,o)
}

