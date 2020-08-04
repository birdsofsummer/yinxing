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
    baidu_ocr_AppID:AppID,
    baidu_ocr_APIKey:APIKey,
    baidu_ocr_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/yzm.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))
const conn=()=>new ocr(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  let image = await read("img/1.jpg")
  let url="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1967042201,3167384364&fm=26&gp=0.jpg"
  r1=await c.generalBasic(image,o)
  r2=await c.accurateBasic(image,o)
  r3=await c.webImageUrl(url)
  console.log(r2)
  console.log(r2)
  console.log(r3)
}

test()
