

[sdk](https://cloud.baidu.com/doc/OCR/s/Ajwvxzibi "")


```javascript
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
  let image = await read("img/yzm.jpg")
  let url="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1967042201,3167384364&fm=26&gp=0.jpg"
  r1=await c.generalBasic(image,o)
  r2=await c.accurateBasic(image,o)
  r3=await c.webImageUrl(url)
  console.log(r1)
  console.log(r2)
  console.log(r3)
}


```
![](https://github.com/birdsofsummer/yinxing/raw/master/src/baidu/ocr/img/yzm.jpg "")

## 一般精度


```json
{
  "log_id": 8154177677564048000,
  "words_result_num": 1,
  "words_result": [
    {
      "words": "gi v6"
    }
  ]
}


```
## 高精度

```json
{
  "log_id": 7462141053101458000,
  "words_result_num": 1,
  "words_result": [
    {
      "words": " gi v6J"
    }
  ]
}


```

![](https://github.com/birdsofsummer/yinxing/raw/master/src/baidu/ocr/img/1.jpg "")

```json
{
  "log_id": 5874656113454757000,
  "words_result_num": 1,
  "words_result": [
    {
      "words": "请点击下图中所有的拖把"
    }
  ]
}
```

## 网络图片


![](https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1967042201,3167384364&fm=26&gp=0.jpg "")

```json
{
  "log_id": 8388702899265583000,
  "words_result_num": 1,
  "words_result": [
    {
      "words": "Guanzhong"
    }
  ]
}


```

## 其他

```javascript

test=async ()=>{
    c=conn()
    o={}
    s = await read("img/yzm.jpg")
    url="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1967042201,3167384364&fm=26&gp=0.jpg"

    r=await c.HKMacauExitentrypermit(s,o)
    r=await c.accurate(s,o)
    r=await c.accurateBasic(s,o)
    r=await c.airTicket(s,o)
    r=await c.bankcard(s,o)
    r=await c.birthCertificate(s,o)
    r=await c.businessCard(s,o)
    r=await c.businessLicense(s,o)
    r=await c.custom(s,o)
    r=await c.drivingLicense(s,o)
    r=await c.form(s,o)
    r=await c.general(s,o)
    r=await c.generalBasic(s,o)
    r=await c.generalBasicUrl(s,o)
    r=await c.generalEnhance(s,o)
    r=await c.generalEnhanceUrl(s,o)
    r=await c.generalUrl(s,o)
    r=await c.handwriting(s,o)
    r=await c.householdRegister(s,o)
    r=await c.idcard(s,o)
    r=await c.insuranceDocuments(s,o)
    r=await c.invoice(s,o)
    r=await c.licensePlate(s,o)
    r=await c.lottery(s,o)
    r=await c.numbers(s,o)
    r=await c.passport(s,o)
    r=await c.qrcode(s,o)
    r=await c.quotaInvoice(s,o)
    r=await c.receipt(s,o)
    r=await c.tableBegin(s,o)
    r=await c.tableGetresult(s,o)
    r=await c.tableRecorgnize(s,o)
    r=await c.taiwanExitentrypermit(s,o)
    r=await c.taxiReceipt(s,o)
    r=await c.trainTicket(s,o)
    r=await c.vatInvoice(s,o)
    r=await c.vehicleCertificate(s,o)
    r=await c.vehicleInvoice(s,o)
    r=await c.vehicleLicense(s,o)
    r=await c.vinCode(s,o)
    r=await c.webImage(s,o)
    r=await c.webImageUrl(url,o)
}

```

|接口名称|接口能力简要描述
|---|---
|通用文字识别|对各类通用场景、文件的识别接口，按行返回识别结果
|通用文字识别|识别图片中的文字信息
|通用文字识别（高精度版）|更高精度地识别图片中的文字信息
|通用文字识别（含位置信息版）|识别图片中的文字信息（包含文字区域的坐标信息）
|通用文字识别（高精度含位置版）|更高精度地识别图片中的文字信息（包含文字区域的坐标信息）
|通用文字识别（含生僻字版）|识别图片中的文字信息（包含对常见字和生僻字的识别）
|卡证文字识别|对各类卡片、证照进行结构化识别，按字段返回识别结果
|身份证识别|对二代居民身份证正反面所有8个字段进行结构化识别
|银行卡识别|对银行卡的卡号、有效期、发卡行、卡片类型进行结构化识别
|营业执照识别|对营业执照进行识别
|护照识别|支持对中国大陆居民护照的资料页进行结构化识别，包含国家码、姓名、性别、护照号、出生日期、签发日期、有效期至、签发地点
|港澳通行证识别|对港澳通行证证号、姓名、姓名拼音、性别、有效期限、签发地点、出生日期字段进行识别
|台湾通行证识别|对台湾通行证证号、签发地、出生日期、姓名、姓名拼音、性别、有效期字段进行识别
|户口本识别|对出生地、出生日期、姓名、民族、与户主关系、性别、身份证号码字段进行识别
|名片识别|提供对各类名片的结构化识别功能，提取姓名、邮编、邮箱、电话、网址、地址、手机号字段
|出生医学证明识别|对出生时间、姓名、性别、出生证编号、父亲姓名、母亲姓名字段进行识别
|票据文字识别|对各类票据进行结构化识别，按字段返回识别结果（通用票据识别除外）
|混贴票据识别|对增值税发票、卷票、火车票、出租车票、行程单等7类票据混贴的图片进行切分识别
|银行回单识别|对各大银行的收/付款人户名、账号、开户银行、金额、日期等关键字段进行结构化识别
|增值税发票识别|对增值税发票进行文字识别，并结构化返回字段信息，支持增值税专票、普票、电子发票
|定额发票识别|对各类定额发票、过路过桥费专用发票代码、号码、金额进行识别
|通用机打发票识别|【请点击申请邀测提交需求申请开通该接口使用权限】对国家/地方税务局发行的横/竖版通用机打发票的号码、代码、日期、合计金额、类型、商品名称字段进行结构化识别
|火车票识别|支持对大陆火车票的车票号、始发站、目的站、车次、日期、票价、席别、姓名进行结构化识别
|出租车票识别|针对全国各大城市出租车票的发票号码、发票代码、车号、日期、时间、金额进行结构化识别
|行程单识别|【请点击申请邀测提交需求申请开通该接口使用权限】对飞机行程单中的姓名、始发站、目的站、航班号、日期、票价字段进行结构化识别
|彩票识别|【请点击申请邀测提交需求申请开通该接口使用权限】对大乐透、双色球彩票进行识别，并按行返回识别结果
|保险单识别|对各类人身保险保单中投保人、受益人的各项信息、保费、保险名称等字段进行结构化识别
|通用票据识别|对各类票据图片进行文字识别，并按行（半结构化）返回文字在图片中的位置信息
|教育场景文字识别|针对教育相关场景所涉及的文字、数字、符号进行识别
|手写文字识别|对手写汉字或手写数字进行识别
|公式识别|【请点击申请邀测提交需求申请开通该接口使用权限】对试卷中的数学公式及题目内容进行识别
|汽车场景文字识别|针对汽车相关场景的各类证件、票据结构化识别
|车牌识别|对机动车蓝牌、绿牌、单/双行黄牌的车牌号码进行识别，并能同时识别图像中的多张车牌
|VIN码识别|对车辆车架、挡风玻璃上的VIN码进行识别
|驾驶证识别|对机动车驾驶证正本所有9个字段进行结构化识别
|行驶证识别|对机动车行驶证主页及副页所有21个字段进行结构化识别
|机动车销售发票|【请点击申请邀测提交需求申请开通该接口使用权限】对机动车销售发票的号码、代码、日期、价税合计等14个关键字段进行结构化识别
|车辆合格证识别|对车辆合格证的编号、车架号、排放标准、发动机编号等12个关键字段进行结构化识别
|其它文字识别|对一些特殊场景所涉及图片中的文字内容进行识别
|表格文字识别|对单据或报表中的表格内容进行结构化识别，并以JSON或Excel形式返回
|网络图片文字识别|针对网络图片进行专项优化，对艺术字体或背景复杂的文字内容具有更优的识别效果
|数字识别|识别图片中的数字，适用于手机号提取、快递单号提取、充值号码提取等场景
|二维码识别|对二维码、条形码中对应的文字内容进行识别
|印章检测|【请点击申请邀测提交需求申请开通该接口使用权限】对合同文件或常用票据中的印章进行检测，并返回其位置信息




## error code

```json
{
  "error_code": 110,
  "error_msg": "Access token invalid or no longer valid"
}

```

|错误码|错误信息|描述
|---|---|---
|1|Unknown error|服务器内部错误，请再次请求， 如果持续出现此类错误，请在控制台提交工单联系技术支持团队
|2|Service temporarily unavailable|服务暂不可用，请再次请求， 如果持续出现此类错误，请在控制台提交工单联系技术支持团队
|3|Unsupported openapi method|调用的API不存在，请检查后重新尝试
|4|Open api request limit reached|集群超限额
|6|No permission to access data|无权限访问该用户数据
|14|IAM Certification failed|IAM鉴权失败，建议用户参照文档自查生成sign的方式是否正确，或换用控制台中ak sk的方式调用
|17|Open api daily request limit reached|每天请求量超限额
|18|Open api qps request limit reached|QPS超限额
|19|Open api total request limit reached|请求总量超限额
|100|Invalid parameter|无效的access_token参数，请检查后重新尝试
|110|Access token invalid or no longer valid|access_token无效
|111|Access token expired|access token过期
|282000|internal error|服务器内部错误，如果您使用的是高精度接口，报这个错误码的原因可能是您上传的图片中文字过多，识别超时导致的，建议您对图片进行切割后再识别，其他情况请再次请求， 如果持续出现此类错误，请在控制台提交工单联系技术支持团队
|216100|invalid param|请求中包含非法参数，请检查后重新尝试
|216101|not enough param|缺少必须的参数，请检查参数是否有遗漏
|216102|service not support|请求了不支持的服务，请检查调用的url
|216103|param too long|请求中某些参数过长，请检查后重新尝试
|216110|appid not exist|appid不存在，请重新核对信息是否为后台应用列表中的appid
|216200|empty image|图片为空，请检查后重新尝试
|216201|image format error|上传的图片格式错误，现阶段我们支持的图片格式为：PNG、JPG、JPEG、BMP，请进行转码或更换图片
|216202|image size error|上传的图片大小错误，现阶段我们支持的图片大小为：base64编码后小于4M，分辨率不高于4096*4096，请重新上传图片
|216630|recognize error|识别错误，请再次请求，如果持续出现此类错误，请在控制台提交工单联系技术支持团队
|216631|recognize bank card error|识别银行卡错误，出现此问题的原因一般为：您上传的图片非银行卡正面，上传了异形卡的图片或上传的银行卡正品图片不完整
|216633|recognize idcard error|识别身份证错误，出现此问题的原因一般为：您上传了非身份证图片或您上传的身份证图片不完整
|216634|detect error|检测错误，请再次请求，如果持续出现此类错误，请在控制台提交工单联系技术支持团队
|272000|structure failed|未进行分类，未能匹配模板，请检查参照字段的设置是否符合规范，并重新选取或增加更多的参照字段
|272001|classify failed|未能成功分类
|272002|structure failed|分类成功，但未能匹配模板。请检查参照字段的设置是否符合规范，并重新选取或增加更多的参照字段
|272003|unsuccessfully detected receipt|未成功检测到票据
|272004|classifier does not exist|分类器不存在
|282003|missing parameters: {参数名}|请求参数缺失
|282004|invalid parameter, appId doesn't own this template nor not launch|您指定的模板暂未发布，请先保存发布该模板，再调用
|282005|batch processing error|处理批量任务时发生部分或全部错误，请根据具体错误码排查
|282006|batch task limit reached|批量任务处理数量超出限制，请将任务数量减少到10或10以下
|282102|target detect error|未检测到图片中识别目标，请确保图片中包含对应卡证票据
|282103|target recognize error|图片目标识别错误，请确保图片中包含对应卡证票据，如果持续出现此类错误，请在控制台提交工单联系技术支持团队
|282110|urls not exit|URL参数不存在，请核对URL后再次提交
|282111|url format illegal|URL格式非法，请检查url格式是否符合相应接口的入参要求
|282112|url download timeout|url下载超时，请检查url对应的图床/图片无法下载或链路状况不好，您可以重新尝试一下，如果多次尝试后仍不行，建议更换图片地址
|282113|url response invalid|URL返回无效参数
|282114|url size error|URL长度超过1024字节或为0
|282808|request id: xxxxx not exist|request id xxxxx 不存在
|282809|result type error|返回结果请求错误（不属于excel或json）
|282810|image recognize error|图像识别错误
