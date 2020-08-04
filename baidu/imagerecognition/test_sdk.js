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
    baidu_imagerecognition_AppID="********",
    baidu_imagerecognition_APIKey="************************",
    baidu_imagerecognition_SecretKey="********************************"
}=process.env

const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const test=async ()=>{
  let c=new imageClassify(baidu_imagerecognition_AppID,baidu_imagerecognition_APIKey,baidu_imagerecognition_SecretKey)
  let o={}

  let s1=await read("img/1.jpg")
  let r1=await c.advancedGeneral(s1,o)
  console.log(r1)

  let s2=await read("img/4.jpg")
  let r2=await c.dishDetect(s2,o)
  console.log(r2)

  let s3=await read("img/5.jpg")
  let r3=await c.animalDetect(s3,{'with_face': 1})
  console.log(r3)

  let s4=await read("img/6.jpg")
  let r4=await c.flower(s4,{})
  console.log(r4)
  //{ error_code: 6, error_msg: 'No permission to access data' }

}

test()
