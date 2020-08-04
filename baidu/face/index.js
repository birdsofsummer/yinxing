//https://ai.baidu.com/ai-doc/FACE/Nk37c1r9i
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
    baidu_face_AppID:AppID,
    baidu_face_APIKey:APIKey,
    baidu_face_SecretKey:SecretKey,
}=process.env

const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))
const conn=()=>new face(AppID,APIKey,SecretKey)

const test=async ()=>{
  let c=conn()
  let o={ }
  let s= await read("img/1.jpg")
  let s1= await read("img/2.jpg")
  let images=[s,s1].map(image=>({image,image_type: 'BASE64'}))
  var t= "BASE64"

  var groupId = "group1";
  var groupIdList = "3,2";
  var userId = "user1";
  var faceToken = "face_token_23123";
  var idCardNumber = "110233112299822211";
  var name = "张三";

  r=await c.detect(s,t,o)

  r=await c.addUser(s,t, groupId, userId, o)
  r=await c.deleteUser(groupId, userId)
  r=await c.updateUser(s,t, groupId, userId,o)
  r=await c.faceDelete(userId, groupId, faceToken)
  r=await c.getUser(userId, groupId)

  r=await c.faceGetlist(userId, groupId)
  r=await c.getGroupUsers(groupId,o)
  r=await c.userCopy(userId, o)

  r=await c.groupAdd(groupId)
  r=await c.groupDelete(groupId)
  r=await c.getGrouplist(o)

  r=await c.videoSessioncode()

  r=await c.personVerify(s, t, idCardNumber, name)
  r=await c.faceverify(images)
  r=await c.match(images)

  r=await c.multiSearch(s,t,groupIdList)
  r=await c.search(s,t,groupIdList)
}
