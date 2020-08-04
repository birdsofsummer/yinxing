//https://ai.baidu.com/docs#/NLP-API/top
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
    baidu_nlp_AppID:AppID,
    baidu_nlp_APIKey:APIKey,
    baidu_nlp_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const conn=()=>new nlp(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  t="普京感叹克里米亚大桥是个美人 坐火车过桥比开车稳"
  r=await c.address(t)
  r=await c.commentTag(t)
  r=await c.depparser(t)
  r=await c.dnnlmCn(t)
  r=await c.ecnet(t)
  r=await c.emotion(t)
  r=await c.keyword(t)
  r=await c.lexer(t)
  r=await c.lexerCustom(t)
  r=await c.newsSummary(t)
  r=await c.sentimentClassify(t)
  r=await c.simnet(t)
  r=await c.topic(t)
  r=await c.wordSimEmbedding(t)
  r=await c.wordembedding(t)
}

