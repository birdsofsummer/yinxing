//https://ai.baidu.com/ai-doc/BODY/qk3cpylx2
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
    baidu_body_AppID:AppID,
    baidu_body_APIKey:APIKey,
    baidu_body_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))
const conn=()=>new bodyanalysis(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  let s= await read("img/1.jpg")

  r=await c.bodyAnalysis(s,o)
  r=await c.bodyAttr(s,o)
  r=await c.bodyNum(s,o)
  r=await c.bodySeg(s,o)
  r=await c.bodyTracking(s,o)
  r=await c.driverBehavior(s,o)
  r=await c.gesture(s,o)
  r=await c.handAnalysis(s,o)
}

