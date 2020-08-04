[接口](https://ai.baidu.com/docs#/ImageClassify-API/top "")


## 在baidu网页新建app,获取ak


```bash
  export baidu_imagerecognition_AppID="********"
  export baidu_imagerecognition_APIKey="************************"
  export baidu_imagerecognition_SecretKey="********************************"
```


## ak换token

```javascript


//https://ai.baidu.com/ai-doc/IMAGERECOGNITION/7k3bcxdn8
const get_token=()=>{
    const tk_url="https://aip.baidubce.com/oauth/2.0/token"
    const d={
      grant_type: 'client_credentials',
      client_id: baidu_imagerecognition_APIKey,
      client_secret: baidu_imagerecognition_SecretKey,
    }
    let r=await superagent.get(tk_url,d)
    return r.body
}

```

有效期一个月

```json
{
  "refresh_token": "**.********************************.*********.**********.******-********",
  "expires_in": 2592000,
  "session_key": "************************************************************************************************",
  "access_token": "**.********************************.*******.**********.***************",
  "scope": "public vis-classify_dishes vis-classify_car brain_all_scope vis-classify_animal vis-classify_plant brain_object_detect brain_realtime_logo brain_dish_detect brain_car_detect brain_animal_classify brain_plant_classify brain_ingredient brain_advanced_general_classify brain_custom_dish brain_poi_recognize brain_vehicle_detect brain_redwine brain_currency brain_vehicle_damage wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test权限 vis-classify_flower lpq_开放 cop_helloScope ApsMis_fangdi_permission smartapp_snsapi_base iop_autocar oauth_tp_app smartapp_smart_game_openapi oauth_sessionkey smartapp_swanid_verify smartapp_opensource_openapi smartapp_opensource_recapi fake_face_detect_开放Scope vis-ocr_虚拟人物助理 idl-video_虚拟人物助理",
  "session_secret": "********************************"
}

```

scope:

+ public
+ vis-classify_dishes
+ vis-classify_car
+ brain_all_scope
+ vis-classify_animal
+ vis-classify_plant
+ brain_object_detect
+ brain_realtime_logo
+ brain_dish_detect
+ brain_car_detect
+ brain_animal_classify
+ brain_plant_classify
+ brain_ingredient
+ brain_advanced_general_classify
+ brain_custom_dish
+ brain_poi_recognize
+ brain_vehicle_detect
+ brain_redwine
+ brain_currency
+ brain_vehicle_damage
+ wise_adapt
+ lebo_resource_base
+ lightservice_public
+ hetu_basic
+ lightcms_map_poi
+ kaidian_kaidian
+ ApsMisTest_Test权限
+ vis-classify_flower
+ lpq_开放
+ cop_helloScope
+ ApsMis_fangdi_permission
+ smartapp_snsapi_base
+ iop_autocar
+ oauth_tp_app
+ smartapp_smart_game_openapi
+ oauth_sessionkey
+ smartapp_swanid_verify
+ smartapp_opensource_openapi
+ smartapp_opensource_recapi
+ fake_face_detect_开放Scope
+ vis-ocr_虚拟人物助理
+ idl-video_虚拟人物助理



## api

```json
{
	"通用物体和场景识别高级版": "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
	"图像主体检测": "https://aip.baidubce.com/rest/2.0/image-classify/v1/object_detect",
	"植物识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant",
	"果蔬识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient",
	"菜品识别": "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish",
	"红酒识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine",
	"动物识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/animal",
	"地标识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/landmark",
	"货币识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/currency",
	"车型识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/car",
	"车辆检测": "https://aip.baidubce.com/rest/2.0/image-classify/v1/vehicle_detect",
	"车辆外观损伤识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/vehicle_damage",
	"logo 商标识别-入库": "https://aip.baidubce.com/rest/2.0/realtime_search/v1/logo/add",
	"logo 商标识别-检索": "https://aip.baidubce.com/rest/2.0/image-classify/v2/logo",
	"logo 商标识别-删除": "https://aip.baidubce.com/rest/2.0/realtime_search/v1/logo/delete",
	"自定义菜品识别-入库": "https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/dish/add",
	"自定义菜品识别-删除": "https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/dish/delete",
	"自定义菜品识别-检索": "https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/dish/search"
}

```

## 图像识别

+ PNG、JPG、JPEG、BMP、GIF**
+ base64   -> 去掉（data:image/jpg;base64,）
+ Content-Type 	application/x-www-form-urlencoded
+ post一把梭

## 示例

```javascript

    const superagent=require("superagent")
    const fs=require('mz/fs')
    const {
        img2base641,
    }=require('../../fp')

    const post=(url,image,access_token,o={})=>superagent
        .post(url)
        .query({access_token})
        .send({image,...o})
        .type('form')
  
    const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))
    test=async (i="./img/2.jpg")=>{
        access_token = '24.fb87fe7335f073ac02bd2e8c9a3e3173.2592000.1579168740.282335-18048107'
        //access_token1 = '24.346e81211e0b44489d2ab2c2a2847b58.2592000.1579433422.282335-18075594'
        image=await read(i)
        u=api["通用物体和场景识别高级版"]
        r=await post(u,image,access_token)
        console.log(r.body)
        return r.body
    }

```

```javascript

test("./img/1.jpg")
{
  log_id: 4209074256566439400,
  result_num: 5,
  result: [
    { score: 0.895367, root: '动物-鱼类', keyword: '草鱼' },
    { score: 0.709587, root: '商品-食材', keyword: '鲫鱼' },
    { score: 0.521255, root: '商品-食物', keyword: '鲫鱼（食材）' },
    { score: 0.337986, root: '动物-鱼类', keyword: '青鱼' },
    { score: 0.153704, root: '动物-鱼类', keyword: '大鲫鱼' }
  ]
}


```

```javascript

//缩成300x300以后再识别一下...

test("./img/2.jpg")

{
  log_id: 7670234154515239000,
  result_num: 5,
  result: [
    { score: 0.852406, root: '动物-鱼类', keyword: '草鱼' },
    { score: 0.671002, root: '商品-食材', keyword: '鲫鱼' },
    { score: 0.492952, root: '动物-鱼类', keyword: '青鱼' },
    { score: 0.317563, root: '动物-鱼类', keyword: '鲮鱼' },
    { score: 0.139847, root: '动物-鱼类', keyword: '大鲫鱼' }
  ]
}

```


## sdk
 

[src]( https://github.com/Baidu-AIP/nodejs-sdk "")

[sdk 快速入门](https://ai.baidu.com/ai-doc/IMAGERECOGNITION/bk3bcxkdg "node skd")

[sdk 接口说明](https://ai.baidu.com/ai-doc/IMAGERECOGNITION/Fk3bcxjx7)


### 方法列表

+ advancedGeneral
+ animalDetect
+ carDetect
+ currency
+ dishDetect
+ flower
+ ingredient
+ landmark
+ logoAdd
+ logoDeleteByImage
+ logoDeleteBySign
+ logoSearch
+ objectDetect
+ plantDetect
+ redwine
+ vehicleDamage
+ vehicleDetect


### 安装

```bash
    npm install baidu-aip-sdk  
```



### 示例
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
    baidu_imagerecognition_AppID="********",
    baidu_imagerecognition_APIKey="************************",
    baidu_imagerecognition_SecretKey="********************************"
}=process.env

const fs=require('mz/fs')
const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

test=(i="img/1.jpg")=>{
    o={}
    c=new imageClassify(baidu_imagerecognition_AppID,baidu_imagerecognition_APIKey,baidu_imagerecognition_SecretKey)

    let  s=await read("img/1.jpg")
    r=await c.advancedGeneral(s,o)
    console.log(r)

/*
    c.sk
    c.ak
    c.appId
    c.status
    c.options
    c.authType
    c.devAccessToken
    c.devAuth
    c.pms


    r=await c.advancedGeneral(s,o)
    r=await c.animalDetect(s,o)
    r=await c.carDetect(s,o)
    r=await c.checkDevPermission(s,o)
    r=await c.commonImpl(s,o)
    r=await c.currency(s,o)
    r=await c.flower(s,o)
    r=await c.ingredient(s,o)
    r=await c.landmark(s,o)
    r=await c.logoAdd(s,o)
    r=await c.logoDeleteByImage(s,o)
    r=await c.logoDeleteBySign(s,o)
    r=await c.logoSearch(s,o)
    r=await c.objectDetect(s,o)
    r=await c.plantDetect(s,o)
    r=await c.redwine(s,o)
    r=await c.vehicleDamage(s,o)
    r=await c.vehicleDetect(s,o)

    r=await c.doRequest()
    r=await c.preRequest()

    r=await c.valueOf()
    r=await c.authTypeReq()
    r=await c.gotDevAuthFail()
    r=await c.gotDevAuthSuccess()
    r=await c.setAccessToken()

*/
    return r
}

```
### General

```javascript
    s=await read("img/1.jpg")
    o={}
    r=await c.advancedGeneral(s,o)
    console.log(r)
```


```json
{
  "log_id": 8234750648927260000,
  "result_num": 5,
  "result": [
    {
      "score": 0.895367,
      "root": "动物-鱼类",
      "keyword": "草鱼"
    },
    {
      "score": 0.709587,
      "root": "商品-食材",
      "keyword": "鲫鱼"
    },
    {
      "score": 0.521255,
      "root": "商品-食物",
      "keyword": "鲫鱼（食材）"
    },
    {
      "score": 0.337986,
      "root": "动物-鱼类",
      "keyword": "青鱼"
    },
    {
      "score": 0.153704,
      "root": "动物-鱼类",
      "keyword": "大鲫鱼"
    }
  ]
}


```

### 植物识别


```javascript

    s1=await read("img/3.jpg")
    r=await c.plantDetect(s1)

```

```json
{
  "log_id": 9026495214604599000,
  "result": [
    {
      "score": 0.8164179921150208,
      "name": "蓝花丹"
    },
    {
      "score": 0.12391960620880127,
      "name": "蓝雪花"
    },
    {
      "score": 0.004211827181279659,
      "name": "白花丹"
    }
  ]
}
```

### 食物识别


```javascript

    //菜品
    o={
        "top_num":"3",
        "filter_threshold":"0.7",
        "baike_num":"5",
    }
    r=await c.dishDetect(s,o)


    s=await read("img/4.jpg")
    o={}
    //{top_num:1}
    r=await c.dishDetect(s,o)
    console.log(r)



```

```json
{
  "log_id": 419145016847122240,
  "result_num": 1,
  "result": [
    {
      "has_calorie": false,
      "baike_info": {},
      "probability": "0.950134",
      "name": "非菜"
    }
  ]
}
```

```json
{
  "log_id": 7726467935812232000,
  "result_num": 6,
  "result": [
    {
      "calorie": "194",
      "has_calorie": true,
      "name": "烤鱼",
      "probability": "0.510991"
    },
    {
      "calorie": "108",
      "has_calorie": true,
      "name": "香酥鲫鱼",
      "probability": "0.270462"
    },
    {
      "calorie": "310",
      "has_calorie": true,
      "name": "秋刀鱼",
      "probability": "0.0439721"
    },
    {
      "calorie": "129",
      "has_calorie": true,
      "name": "煎鱼",
      "probability": "0.029111"
    },
    {
      "calorie": "96",
      "has_calorie": true,
      "name": "烤鳕鱼",
      "probability": "0.0205475"
    },
    {
      "calorie": "171",
      "has_calorie": true,
      "name": "熏鱼",
      "probability": "0.0142306"
    }
  ]
}




```

### 动物识别

```javascript

const test=async (i)=>{
    o={}
    r=await c.animalDetect(s,o)
    console.log(r)

    let s3=await read(i)
    let r3=await c.animalDetect(s3,{'with_face': 1})
    console.log(r3)
}

i0="img/4.jpg"
i1="img/5.jpg"

test(i0)
test(i1)

```


```json
{
  "log_id": 2508943844496099300,
  "result": [
    {
      "score": "0.918944",
      "name": "鲮鱼"
    },
    {
      "score": "0.045093",
      "name": "草鱼"
    },
    {
      "score": "0.00527778",
      "name": "野鲮"
    },
    {
      "score": "0.00502025",
      "name": "青鱼"
    },
    {
      "score": "0.00180692",
      "name": "黄河鲤"
    },
    {
      "score": "0.00111816",
      "name": "青根鱼"
    }
  ]
}
```

```json
{
  "log_id": 2989955639112826400,
  "result": [
    {
      "score": "0.452171",
      "name": "中华田园犬"
    },
    {
      "score": "0.316387",
      "name": "威尔士柯基"
    },
    {
      "score": "0.0880914",
      "name": "查理士王小猎犬"
    },
    {
      "score": "0.0548986",
      "name": "金毛犬"
    },
    {
      "score": "0.0384593",
      "name": "拉布拉多"
    },
    {
      "score": "0.00534197",
      "name": "比格猎犬"
    }
  ]
}
```
```json
{
  "log_id": 4137654601146600000,
  "result": [
    {
      "score": "0.997947",
      "name": "非动物"
    }
  ]
}


```

## error code

```json
{
  "1": {
    "error_code": 1,
    "error_msg": "Unknown error",
    "desc": "服务器内部错误，请再次请求， 如果持续出现此类错误，请通过QQ群（659268104）或工单联系技术支持团队。"
  },
  "2": {
    "error_code": 2,
    "error_msg": "Service temporarily unavailable",
    "desc": "服务暂不可用，请再次请求， 如果持续出现此类错误，请通过QQ群（659268104）或工单联系技术支持团队。"
  },
  "3": {
    "error_code": 3,
    "error_msg": "Unsupported openapi method",
    "desc": "调用的API不存在，请检查后重新尝试"
  },
  "4": {
    "error_code": 4,
    "error_msg": "Open api request limit reached",
    "desc": "集群超限额"
  },
  "6": {
    "error_code": 6,
    "error_msg": "No permission to access data",
    "desc": "无权限访问该用户数据"
  },
  "13": {
    "error_code": 13,
    "error_msg": "Get service token failed",
    "desc": "获取token失败"
  },
  "14": {
    "error_code": 14,
    "error_msg": "IAM Certification failed",
    "desc": "IAM鉴权失败"
  },
  "15": {
    "error_code": 15,
    "error_msg": "app not exsits or create failed",
    "desc": "应用不存在或者创建失败"
  },
  "17": {
    "error_code": 17,
    "error_msg": "Open api daily request limit reached",
    "desc": "每天请求量超限额，已上线计费的接口，请直接在控制台开通计费，调用量不受限制，按调用量阶梯计费；未上线计费的接口，请通过QQ群（659268104）联系群管手动提额"
  },
  "18": {
    "error_code": 18,
    "error_msg": "Open api qps request limit reached",
    "desc": "QPS超限额，已上线计费的接口，请直接在控制台开通计费，调用量不受限制，按调用量阶梯计费；未上线计费的接口，请通过QQ群（659268104）联系群管手动提额"
  },
  "19": {
    "error_code": 19,
    "error_msg": "Open api total request limit reached",
    "desc": "请求总量超限额，已上线计费的接口，请直接在控制台开通计费，调用量不受限制，按调用量阶梯计费；未上线计费的接口，请通过QQ群（659268104）联系群管手动提额"
  },
  "100": {
    "error_code": 100,
    "error_msg": "Invalid parameter",
    "desc": "无效的access_token参数，请检查后重新尝试"
  },
  "110": {
    "error_code": 110,
    "error_msg": "Access token invalid or no longer valid",
    "desc": "access_token无效"
  },
  "111": {
    "error_code": 111,
    "error_msg": "Access token expired",
    "desc": "access token过期"
  },
  "216100": {
    "error_code": 216100,
    "error_msg": "invalid param",
    "desc": "请求中包含非法参数，请检查后重新尝试"
  },
  "216101": {
    "error_code": 216101,
    "error_msg": "not enough param",
    "desc": "缺少必须的参数，请检查参数是否有遗漏"
  },
  "216102": {
    "error_code": 216102,
    "error_msg": "service not support",
    "desc": "请求了不支持的服务，请检查调用的url"
  },
  "216103": {
    "error_code": 216103,
    "error_msg": "param too long",
    "desc": "请求中某些参数过长，请检查后重新尝试"
  },
  "216110": {
    "error_code": 216110,
    "error_msg": "appid not exist",
    "desc": "appid不存在，请重新核对信息是否为后台应用列表中的appid"
  },
  "216200": {
    "error_code": 216200,
    "error_msg": "empty image",
    "desc": "图片为空，请检查后重新尝试"
  },
  "216201": {
    "error_code": 216201,
    "error_msg": "image format error",
    "desc": "上传的图片格式错误，现阶段我们支持的图片格式为：PNG、JPG、JPEG、BMP，请进行转码或更换图片"
  },
  "216202": {
    "error_code": 216202,
    "error_msg": "image size error",
    "desc": "上传的图片大小错误，现阶段我们支持的图片大小为：base64编码后小于4M，分辨率不高于4096*4096，请重新上传图片"
  },
  "216203": {
    "error_code": 216203,
    "error_msg": "image size error",
    "desc": "上传的图片base64编码有误，请校验base64编码方式，并重新上传图片"
  },
  "216630": {
    "error_code": 216630,
    "error_msg": "recognize error",
    "desc": "识别错误，请再次请求，如果持续出现此类错误，请通过QQ群（659268104）或工单联系技术支持团队。"
  },
  "216631": {
    "error_code": 216631,
    "error_msg": "recognize bank card error",
    "desc": "识别银行卡错误，出现此问题的原因一般为：您上传的图片非银行卡正面，上传了异形卡的图片或上传的银行卡正品图片不完整"
  },
  "216633": {
    "error_code": 216633,
    "error_msg": "recognize idcard error",
    "desc": "识别身份证错误，出现此问题的原因一般为：您上传了非身份证图片或您上传的身份证图片不完整"
  },
  "216634": {
    "error_code": 216634,
    "error_msg": "detect error",
    "desc": "检测错误，请再次请求，如果持续出现此类错误，请通过QQ群（659268104）或工单联系技术支持团队。"
  },
  "282000": {
    "error_code": 282000,
    "error_msg": "internal error",
    "desc": "服务器内部错误，请再次请求， 如果持续出现此类错误，请通过QQ群（659268104）或工单联系技术支持团队。"
  },
  "282003": {
    "error_code": 282003,
    "error_msg": "missing parameters: {参数名}",
    "desc": "请求参数缺失"
  },
  "282005": {
    "error_code": 282005,
    "error_msg": "batch  processing error",
    "desc": "处理批量任务时发生部分或全部错误，请根据具体错误码排查"
  },
  "282006": {
    "error_code": 282006,
    "error_msg": "batch task  limit reached",
    "desc": "批量任务处理数量超出限制，请将任务数量减少到10或10以下"
  },
  "282100": {
    "error_code": 282100,
    "error_msg": "image transerror_code error",
    "desc": "图片压缩转码错误"
  },
  "282101": {
    "error_code": 282101,
    "error_msg": "image split limit reached",
    "desc": "长图片切分数量超限"
  },
  "282102": {
    "error_code": 282102,
    "error_msg": "target detect error",
    "desc": "未检测到图片中识别目标"
  },
  "282103": {
    "error_code": 282103,
    "error_msg": "target recognize error",
    "desc": "图片目标识别错误"
  },
  "282114": {
    "error_code": 282114,
    "error_msg": "url size error",
    "desc": "URL长度超过1024字节或为0"
  },
  "282808": {
    "error_code": 282808,
    "error_msg": "request id: xxxxx not exist",
    "desc": "request id xxxxx 不存在"
  },
  "282809": {
    "error_code": 282809,
    "error_msg": "result type error",
    "desc": "返回结果请求错误（不属于excel或json）"
  },
  "282810": {
    "error_code": 282810,
    "error_msg": "image recognize error",
    "desc": "图像识别错误"
  },
  "283300": {
    "error_code": 283300,
    "error_msg": "Invalid argument",
    "desc": "入参格式有误，可检查下图片编码、代码格式是否有误"
  },
  "336000": {
    "error_code": 336000,
    "error_msg": "Internal error",
    "desc": "服务器内部错误，请再次请求， 如果持续出现此类错误，请通过QQ群（659268104）或工单联系技术支持团队"
  },
  "336001": {
    "error_code": 336001,
    "error_msg": "Invalid Argument",
    "desc": "入参格式有误，比如缺少必要参数、图片base64编码错误等等，可检查下图片编码、代码格式是否有误。有疑问请通过QQ群（659268104）或工单联系技术支持团队"
  }
}

```

