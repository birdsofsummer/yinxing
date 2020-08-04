[api](https://ai.baidu.com/ai-doc/BODY/lk3cpywzd "")

[sdk](https://ai.baidu.com/ai-doc/BODY/qk3cpylx2 "")


## 安装

```bash

npm install baidu-aip-sdk
export baidu_body_AppID=********
export baidu_body_APIKey=************************
export baidu_body_SecretKey=**********************************

```


## 示例

```javascript
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


```


## api


|接口名称|接口能力简要描述
|---|---
|人体关键点识别|检测图像中的所有人体并返回每个人体的矩形框位置，精准定位21个核心关键点，包含五官、四肢、脖颈等部位，更多关键点持续扩展中；支持多人检测、人体位置重叠、遮挡、背面、侧面、中低空俯拍、大动作等复杂场景
|人体检测与属性识别|检测图像中的所有人体并返回每个人体的矩形框位置，识别人体的静态属性和行为，共支持20余种属性，包括：性别、年龄阶段、衣着（含类别/颜色）、是否戴帽子、是否戴眼镜、是否背包、是否使用手机、身体朝向等；支持中低空俯拍视角、人体重叠、遮挡、背面、侧面、动作变化等复杂场景
|人流量统计|识别和统计图像当中的人体个数（静态统计，不支持追踪和去重），适用于3米以上的中远距离俯拍，以人头为主要识别目标统计人数，无需正脸、全身照，适应各类人流密集场景；默认识别整图中的人数，支持指定不规则区域的人数统计，同时可输出渲染图片
|手势识别|识别图片中的手势类型，返回手势名称、手势矩形框、概率分数，可识别22种手势，支持动态手势识别，适用于手势特效、智能家居手势交互等场景；支持的手势列表：手指、掌心向前、拳头、OK、祈祷、作揖、作别、单手比心、点赞、diss、rock、掌心向上、双手比心（3种）、数字（7种）
|人像分割|识别人体的轮廓范围，与背景进行分离，适用于拍照背景替换、照片合成、身体特效等场景；输入正常人像图片，返回分割后的二值结果图，返回的二值图像需要进行二次处理才可查看分割效果
|驾驶行为分析|针对车载场景，检测图片中是否有驾驶员，并识别驾驶员是否有使用手机、抽烟、未系安全带、双手离开方向盘 等行为，可用于分析预警危险驾驶行为
|人流量统计（动态版）|动态人数统计和跟踪，主要适用于低空俯拍、出入口场景，以人体头肩为主要识别目标，核心功能：传入监控视频抓拍图片序列，进行人体追踪，根据目标轨迹判断进出区域行为，进行动态人数统计，返回区域进出人数。


## error code

|错误码|错误信息|描述
|---|---|---
|1|Unknown error|服务器内部错误，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|2|Service temporarily unavailable|服务暂不可用，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|3|Unsupported openapi method|调用的API不存在，请检查请求URL后重新尝试，一般为URL中有非英文字符，如“-”，可手动输入重试
|4|Open api request limit reached|集群超限额，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|6|No permission to access data|无权限访问该用户数据，创建应用时未勾选相关接口，请登录百度云控制台，找到对应的应用，编辑应用，勾选上相关接口，然后重试调用
|13|Get service token failed|获取token失败
|14|IAM Certification failed|IAM 鉴权失败，建议参照文档自查生成sign的方式是否正确，或换用控制台中ak sk的方式调用
|15|app not exsits or create failed|应用不存在或者创建失败
|17|Open api daily request limit reached|每天请求量超限额，未上线计费的接口，可通过QQ群（860337848）联系群管、提交工单申请提升限额
|18|Open api qps request limit reached|QPS超限额，未上线计费的接口，可通过QQ群（860337848）联系群管、提交工单申请提升限额
|19|Open api total request limit reached|请求总量超限额，可通过QQ群（860337848）联系群管、提交工单申请提升限额
|100|Invalid parameter|无效的access_token参数，token拉取失败，可以参考“Access Token获取”重新获取
|110|Access token invalid or no longer valid|access_token无效，token有效期为30天，注意需要定期更换，也可以每次请求都拉取新token
|111|Access token expired|access token过期，token有效期为30天，注意需要定期更换，也可以每次请求都拉取新token
|282000|internal error|服务器内部错误，请再次请求， 如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|216100|invalid param|请求中包含非法参数，请检查后重新尝试
|216101|not enough param|缺少必须的参数，请检查参数是否有遗漏
|216102|service not support|请求了不支持的服务，请检查调用的url
|216103|param too long|请求中某些参数过长，请检查后重新尝试
|216110|appid not exist|appid不存在，请重新核对信息是否为后台应用列表中的appid
|216200|empty image|图片为空，请检查后重新尝试
|216201|image format error|上传的图片格式错误，现阶段我们支持的图片格式为：PNG、JPG、BMP，请进行转码或更换图片
|216202|image size error|上传的图片大小错误，现阶段我们支持的图片大小为：base64编码后小于4M，分辨率不高于4096 * 4096，请重新上传图片
|216203|image size error|上传的图片base64编码有误，请校验base64编码方式，并重新上传图片
|216630|recognize error|识别错误，请再次请求，如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|216634|detect error|检测错误，请再次请求，如果持续出现此类错误，请通过QQ群（860337848）或提交工单联系技术支持团队。
|282003|missing parameters: {参数名}|请求参数缺失
|282005|batch  processing error|处理批量任务时发生部分或全部错误，请根据具体错误码排查
|282006|batch task  limit reached|批量任务处理数量超出限制，请将任务数量减少到10或10以下
|282114|url size error|URL长度超过1024字节或为0
|282808|request id: xxxxx not exist|request id xxxxx 不存在
|282809|result type error|返回结果请求错误（不属于excel或json）
|282810|image recognize error|图像识别错误
|283300|Invalid argument|入参格式有误，可检查下图片编码、代码格式是否有误
