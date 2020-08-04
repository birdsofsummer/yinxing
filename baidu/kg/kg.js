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
    baidu_kg_AppID:AppID,
    baidu_kg_APIKey:APIKey,
    baidu_kg_SecretKey:SecretKey,
}=process.env


const conn=()=>new kg(AppID,APIKey,SecretKey)
const test=async ()=>{
  let c=conn()
  let o={ }
  r=await c.createTask()
  r=await c.getTaskInfo()
  r=await c.getTaskStatus()
  r=await c.getUserTasks()
  r=await c.startTask()
  r=await c.updateTask()
}
