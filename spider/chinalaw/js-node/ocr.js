const {
    baidu_ocr_AppID:AppID,
    baidu_ocr_APIKey:APIKey,
    baidu_ocr_SecretKey:SecretKey,
}=process.env


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


const conn=()=>new ocr(AppID,APIKey,SecretKey)
/*
不太准
{
  log_id: 2836239052998493000,
  words_result_num: 1,
  words_result: [ { words: ' r&' } ]
}
*/


const reco=(buff)=>{
      let c=conn()
      let o={ }
      //return c.webImageUrl(url)
      image=buff.toString("base64")
      return c.accurateBasic(image,o)
}

module.exports=reco
