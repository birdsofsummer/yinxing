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
    baidu_imageSearch_AppID:AppID,
    baidu_imageSearch_APIKey:APIKey,
    baidu_imageSearch_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const conn=()=>new imageSearch(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  let s= await read("img/1.jpg")
  r=await c.productAdd()
  r=await c.productAddUrl()
  r=await c.productDeleteByImage()
  r=await c.productDeleteBySign()
  r=await c.productDeleteByUrl()
  r=await c.productSearch()
  r=await c.productSearchUrl()
  r=await c.productUpdate()
  r=await c.productUpdateContSign()
  r=await c.productUpdateUrl()
  r=await c.sameHqAdd()
  r=await c.sameHqAddUrl()
  r=await c.sameHqDeleteByImage()
  r=await c.sameHqDeleteBySign()
  r=await c.sameHqDeleteByUrl()
  r=await c.sameHqSearch()
  r=await c.sameHqSearchUrl()
  r=await c.sameHqUpdate()
  r=await c.sameHqUpdateContSign()
  r=await c.sameHqUpdateUrl()
  r=await c.similarAdd()
  r=await c.similarAddUrl()
  r=await c.similarDeleteByImage()
  r=await c.similarDeleteBySign()
  r=await c.similarDeleteByUrl()
  r=await c.similarSearch()
  r=await c.similarSearchUrl()
  r=await c.similarUpdate()
  r=await c.similarUpdateContSign()
  r=await c.similarUpdateUrl()
}

