## 示例

```javascript
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



```


## error code

|错误码|错误信息|描述
|---|---|---
|1|Unknown error|服务器内部错误，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|2|Service temporarily unavailable|服务暂不可用，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|3|Unsupported openapi method|调用的API不存在，请检查请求URL后重新尝试，一般为URL中有非英文字符，如“-”，可手动输入重试
|4|Open api request limit reached|集群超限额，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|6|No permission to access data|无权限访问该用户数据，创建应用时未勾选相关接口
|13|Get service token failed|获取token失败
|14|IAM Certification failed|IAM 鉴权失败
|15|app not exsits or create failed|应用不存在或者创建失败
|17|Open api daily request limit reached|每天请求量超限额，可通过QQ群（860337848）联系群管、提交工单提升限额
|18|Open api qps request limit reached|QPS超限额，可通过QQ群（860337848）联系群管、提交工单提升限额
|19|Open api total request limit reached|请求总量超限额，可通过QQ群（860337848）联系群管、提交工单提升限额
|100|Invalid parameter|无效的access_token参数，请检查后重新尝试
|110|Access token invalid or no longer valid|access_token无效
|111|Access token expired|access token过期
|222001|param[] is null|必要参数未传入
|222002|param[start] format error|参数格式错误
|222003|param[length] format error|参数格式错误
|222004|param[op_app_id_list] format error|参数格式错误
|222005|param[group_id_list] format error|参数格式错误
|222006|group_id format error|参数格式错误
|222007|uid format error|参数格式错误
|222008|face_id format error|参数格式错误
|222009|quality_conf format error|参数格式错误
|222010|user_info format error|参数格式错误
|222011|param[uid_list] format error|参数格式错误
|222012|param[op_app_id] format error|参数格式错误
|222013|param[image] format error|参数格式错误
|222014|param[app_id] format error|参数格式错误
|222015|param[image_type] format error|参数格式错误
|222016|param[max_face_num] format error|参数格式错误
|222017|param[face_field] format error|参数格式错误
|222018|param[user_id] format error|参数格式错误
|222019|param[quality_control] format error|参数格式错误
|222020|param[liveness_control] format error|参数格式错误
|222021|param[max_user_num] format error|参数格式错误
|222022|param[id_card_number] format error|参数格式错误
|222023|param[name] format error|参数格式错误
|222024|param[face_type] format error|参数格式错误
|222025|param[face_token] format error|参数格式错误
|222026|param[max_star_num] format error|参数格式错误
|222201|network not available|服务端请求失败
|222202|pic not has face|图片中没有人脸
|222203|image check fail|无法解析人脸
|222204|image_url_download_fail|从图片的url下载 图片失败
|222205|network not availablel|服务端请求失败
|222206|rtse service return fail|服务端请求失败
|222207|match user is not found|未找到匹配的用户
|222208|the number of image is incorrect|图片的数量错误
|222209|face token not exist|face token不存在
|222300|add face fail|人脸图片添加失败
|222301|get face fail|获取人脸图片失败
|222302|system error|服务端请求失败
|222303|get face fail|获取人脸图片失败
|223100|group is not exist|操作的用户组不存在
|223101|group is already exist|该用户组已存在
|223102|user is already exist|该用户已存在
|223103|user is not exist|找不到该用户
|223104|group_list is too large|group_list包含组 数量过多
|223105|face is already exist|该人脸已存在
|223106|face is not exist|该人脸不存在
|223110|uid_list is too large|uid_list包含数量过多
|223111|dst group is not exist|目标用户组不存在
|223112|quality_conf format error|quality_conf格式不正确
|223113|face is covered|人脸有被遮挡
|223114|face is fuzzy|人脸模糊
|223115|face light is not good|人脸光照不好
|223116|incomplete face|人脸不完整
|223117|app_list is too large|app_list包含app数量 过多
|223118|quality control error|质量控制项错误
|223119|liveness control item error|活体控制项错误
|223120|liveness check fail|活体检测未通过
|223121|left eye is occlusion|质量检测未通过 左眼 遮挡程度过高
|223122|right eye is occlusion|质量检测未通过 右眼 遮挡程度过高
|223123|left cheek is occlusion|质量检测未通过 左脸 遮挡程度过高
|223124|right cheek is occlusion|质量检测未通过 右脸 遮挡程度过高
|223125|chin contour is occlusion|质量检测未通过 下巴遮挡程度过高
|223126|nose is occlusion|质量检测未通过 鼻子遮挡程度过高
|223127|mouth is occlusion|质量检测未通过 嘴巴 遮挡程度过高
|222350|police picture is none or low quality|公安网图片不存在或 质量过低
|222351|id number and name not match or id number not exist|身份证号与姓名不匹配或该 身份证号不存在
|222352|name format error|身份证名字格式错误
|222353|id number format error|身份证号码格式错误
|222354|id number not exist|公安库里不存在此身份证号
|222355|police picture not exist|身份证号码正确，公安库里没有 对应的照片
|222360|invalid name or id number|身份证号码或名字非法（公安网校 验不通过）
|222901|system busy|系统繁忙
|222902|system busy|系统繁忙
|222903|system busy|系统繁忙
|222904|system busy|系统繁忙
|222905|system busy|系统繁忙
|222906|system busy|系统繁忙
|222907|system busy|系统繁忙
|222908|system busy|系统繁忙
|222909|system busy|系统繁忙
|222910|system busy|系统繁忙
|222911|system busy|系统繁忙
|222912|system busy|系统繁忙
|222913|system busy|系统繁忙
|222914|system busy|系统繁忙
|222915|system busy|系统繁忙
|222916|system busy|系统繁忙
|222361|system busy|系统繁忙

