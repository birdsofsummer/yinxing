[doc](https://cloud.tencent.com/document/api)

## v2 qcloudapi-sdk

[src](https://github.com/CFETeam/qcloudapi-sdk)

[py](https://github.com/QcloudApi/qcloudapi-sdk-python)



```javascript

const Capi = require('qcloudapi-sdk')

const serviceTypes=[
      "account",
      "apigateway",
      "athena",
      "batch",
      "bgpip",
      "bill",
      "bm",
      "bmeip",
      "bmlb",
      "bmvpc",
      "cbs",
      "ccr",
      "ccs",
      "cdb",
      "cdn",
      "cloudaudit",
      "cmem",
      "cns",
      "cvm",
      "dc",
      "dfw",
      "eip",
      "emr",
      "feecenter",
      "image",
      "lb",
      "live",
      "market",
      "monitor",
      "partners",
      "redis",
      "scaling",
      "scf",
      "sec",
      "snapshot",
      "sts",
      "tbaas",
      "tdsql",
      "tmt",
      "trade",
      "vod",
      "vpc",
      "wenzhi",
      "yunsou",
]


conn=({ SecretId, SecretKey, serviceType = 'apigateway' ,}=process.env)=> (o={})=>new Promise((resolve, reject) => {
        apig.request(
          {
            //Action: 'CreateService',
            RequestClient: 'ServerlessComponent',
            Token: apig.defaults.Token || null,
            ...o,
          },
          function(err, data) {
            console.log(data)
            if (err) {
              return reject(err)
            } else {
                resolve(data)
            }
          }
        )
})

d={
      Action:"CreateService",
      Region,
      serviceDesc: "hello",
      serviceName: "hello",
      protocol:["https"].join('&').toLowerCase(),
}


test=async ()=>{
    serviceType = 'apigateway' 
    //cvm, vpc, dfw, lb 等
    client=new Capi({ SecretId, SecretKey, serviceType,})

    cb=(err,data)=>console.log(err,data)
    client.request(d,cb)

   
}

test2=async ()=>{
      c=conn()
      r=await c(d)
      console.log(r)
}



```

## v3 tencentcloud-sdk-nodejs
[src](https://github.com/TencentCloud/tencentcloud-sdk-nodejs)

```javascript

const tencentcloud=require('tencentcloud-sdk-nodejs')
const Credential = tencentcloud.common.Credential;

const {
     scf:{v20180416:scf},
}=tencentcloud

//a=R.reduce((x,[k,v])=>({...x,[k]:R.last(R.values(v))}))({})(R.toPairs(tencentcloud))
//const {Client, Models}=a.scf
const { SecretId, SecretKey, serviceType = 'apigateway' ,Region="ap-shanghai"}=process.env

test=()=>{
    const {Client, Models}=tencentcloud.scf.v20180416
    let cred = new Credential(SecretId, SecretKey,)
    let client = new Client(cred, Region)
    cb=(err,data)=>console.log(err,data)
    d={}
    let req = new Models.DescribeZonesRequest(d)
    client.DescribeZones(req,cb)
}

api1=[
  "aai",
  "ame",
  "as",
  "asr",
  "batch",
  "billing",
  "bizlive",
  "bm",
  "bmeip",
  "bmlb",
  "bmvpc",
  "bri",
  "cam",
  "captcha",
  "cbs",
  "cdb",
  "cdn",
  "cds",
  "cfs",
  "chdfs",
  "cim",
  "cis",
  "clb",
  "cloudaudit",
  "cme",
  "cms",
  "common",
  "cpdp",
  "cr",
  "cvm",
  "cws",
  "dayu",
  "dbbrain",
  "dc",
  "dcdb",
  "domain",
  "drm",
  "ds",
  "dts",
  "ecc",
  "emr",
  "es",
  "facefusion",
  "faceid",
  "fmu",
  "gaap",
  "gme",
  "gs",
  "habo",
  "hcm",
  "iai",
  "ic",
  "iot",
  "iotcloud",
  "iotexplorer",
  "iottid",
  "kms",
  "live",
  "mariadb",
  "mongodb",
  "monitor",
  "mps",
  "ms",
  "msp",
  "nlp",
  "ocr",
  "organization",
  "partners",
  "postgres",
  "redis",
  "scf",
  "smpn",
  "sms",
  "soe",
  "sqlserver",
  "ssm",
  "sts",
  "tag",
  "tav",
  "tbaas",
  "tbm",
  "tbp",
  "tcaplusdb",
  "tcb",
  "tci",
  "tia",
  "ticm",
  "tics",
  "tiems",
  "tiia",
  "tiw",
  "tke",
  "tkgdq",
  "tmt",
  "trtc",
  "tsf",
  "tts",
  "vod",
  "vpc",
  "wss",
  "youmall",
  "yunjing",
  "yunsou"
]

api_version={
  "aai": [
    "v20180522"
  ],
  "ame": [
    "v20190916"
  ],
  "as": [
    "v20180419"
  ],
  "asr": [
    "v20190614"
  ],
  "batch": [
    "v20170312"
  ],
  "billing": [
    "v20180709"
  ],
  "bizlive": [
    "v20190313"
  ],
  "bm": [
    "v20180423"
  ],
  "bmeip": [
    "v20180625"
  ],
  "bmlb": [
    "v20180625"
  ],
  "bmvpc": [
    "v20180625"
  ],
  "bri": [
    "v20190328"
  ],
  "cam": [
    "v20190116"
  ],
  "captcha": [
    "v20190722"
  ],
  "cbs": [
    "v20170312"
  ],
  "cdb": [
    "v20170320"
  ],
  "cdn": [
    "v20180606"
  ],
  "cds": [
    "v20180420"
  ],
  "cfs": [
    "v20190719"
  ],
  "chdfs": [
    "v20190718"
  ],
  "cim": [
    "v20190318"
  ],
  "cis": [
    "v20180408"
  ],
  "clb": [
    "v20180317"
  ],
  "cloudaudit": [
    "v20190319"
  ],
  "cme": [
    "v20191029"
  ],
  "cms": [
    "v20190321"
  ],
  "common": [
    "HttpConnection",
    "ClientProfile",
    "HttpProfile",
    "Credential"
  ],
  "cpdp": [
    "v20190820"
  ],
  "cr": [
    "v20180321"
  ],
  "cvm": [
    "v20170312"
  ],
  "cws": [
    "v20180312"
  ],
  "dayu": [
    "v20180709"
  ],
  "dbbrain": [
    "v20191016"
  ],
  "dc": [
    "v20180410"
  ],
  "dcdb": [
    "v20180411"
  ],
  "domain": [
    "v20180808"
  ],
  "drm": [
    "v20181115"
  ],
  "ds": [
    "v20180523"
  ],
  "dts": [
    "v20180330"
  ],
  "ecc": [
    "v20181213"
  ],
  "emr": [
    "v20190103"
  ],
  "es": [
    "v20180416"
  ],
  "facefusion": [
    "v20181201"
  ],
  "faceid": [
    "v20180301"
  ],
  "fmu": [
    "v20191213"
  ],
  "gaap": [
    "v20180529"
  ],
  "gme": [
    "v20180711"
  ],
  "gs": [
    "v20191118"
  ],
  "habo": [
    "v20181203"
  ],
  "hcm": [
    "v20181106"
  ],
  "iai": [
    "v20180301"
  ],
  "ic": [
    "v20190307"
  ],
  "iot": [
    "v20180123"
  ],
  "iotcloud": [
    "v20180614"
  ],
  "iotexplorer": [
    "v20190423"
  ],
  "iottid": [
    "v20190411"
  ],
  "kms": [
    "v20190118"
  ],
  "live": [
    "v20180801"
  ],
  "mariadb": [
    "v20170312"
  ],
  "mongodb": [
    "v20180408",
    "v20190725"
  ],
  "monitor": [
    "v20180724"
  ],
  "mps": [
    "v20190612"
  ],
  "ms": [
    "v20180408"
  ],
  "msp": [
    "v20180319"
  ],
  "nlp": [
    "v20190408"
  ],
  "ocr": [
    "v20181119"
  ],
  "organization": [
    "v20181225"
  ],
  "partners": [
    "v20180321"
  ],
  "postgres": [
    "v20170312"
  ],
  "redis": [
    "v20180412"
  ],
  "scf": [
    "v20180416"
  ],
  "smpn": [
    "v20190822"
  ],
  "sms": [
    "v20190711"
  ],
  "soe": [
    "v20180724"
  ],
  "sqlserver": [
    "v20180328"
  ],
  "ssm": [
    "v20190923"
  ],
  "sts": [
    "v20180813"
  ],
  "tag": [
    "v20180813"
  ],
  "tav": [
    "v20190118"
  ],
  "tbaas": [
    "v20180416"
  ],
  "tbm": [
    "v20180129"
  ],
  "tbp": [
    "v20190627",
    "v20190311"
  ],
  "tcaplusdb": [
    "v20190823"
  ],
  "tcb": [
    "v20180608"
  ],
  "tci": [
    "v20190318"
  ],
  "tia": [
    "v20180226"
  ],
  "ticm": [
    "v20181127"
  ],
  "tics": [
    "v20181115"
  ],
  "tiems": [
    "v20190416"
  ],
  "tiia": [
    "v20190529"
  ],
  "tiw": [
    "v20190919"
  ],
  "tke": [
    "v20180525"
  ],
  "tkgdq": [
    "v20190411"
  ],
  "tmt": [
    "v20180321"
  ],
  "trtc": [
    "v20190722"
  ],
  "tsf": [
    "v20180326"
  ],
  "tts": [
    "v20190823"
  ],
  "vod": [
    "v20180717"
  ],
  "vpc": [
    "v20170312"
  ],
  "wss": [
    "v20180426"
  ],
  "youmall": [
    "v20180228"
  ],
  "yunjing": [
    "v20180228"
  ],
  "yunsou": [
    "v20180504"
  ]
}



```



## v2 + v3

```javascript


api={

  "account": 2,
  "apigateway": 2,
  "athena": 2,
  "bgpip": 2,
  "bill": 2,
  "ccr": 2,
  "ccs": 2,
  "cmem": 2,
  "cns": 2,
  "dfw": 2,
  "eip": 2,
  "feecenter": 2,
  "image": 2,
  "lb": 2,
  "market": 2,
  "scaling": 2,
  "sec": 2,
  "snapshot": 2,
  "tdsql": 2,
  "trade": 2,
  "wenzhi": 2,

  "aai": 3,
  "ame": 3,
  "as": 3,
  "asr": 3,
  "batch": 3,
  "billing": 3,
  "bizlive": 3,
  "bm": 3,
  "bmeip": 3,
  "bmlb": 3,
  "bmvpc": 3,
  "bri": 3,
  "cam": 3,
  "captcha": 3,
  "cbs": 3,
  "cdb": 3,
  "cdn": 3,
  "cds": 3,
  "cfs": 3,
  "chdfs": 3,
  "cim": 3,
  "cis": 3,
  "clb": 3,
  "cloudaudit": 3,
  "cme": 3,
  "cms": 3,
  "common": 3,
  "cpdp": 3,
  "cr": 3,
  "cvm": 3,
  "cws": 3,
  "dayu": 3,
  "dbbrain": 3,
  "dc": 3,
  "dcdb": 3,
  "domain": 3,
  "drm": 3,
  "ds": 3,
  "dts": 3,
  "ecc": 3,
  "emr": 3,
  "es": 3,
  "facefusion": 3,
  "faceid": 3,
  "fmu": 3,
  "gaap": 3,
  "gme": 3,
  "gs": 3,
  "habo": 3,
  "hcm": 3,
  "iai": 3,
  "ic": 3,
  "iot": 3,
  "iotcloud": 3,
  "iotexplorer": 3,
  "iottid": 3,
  "kms": 3,
  "live": 3,
  "mariadb": 3,
  "mongodb": 3,
  "monitor": 3,
  "mps": 3,
  "ms": 3,
  "msp": 3,
  "nlp": 3,
  "ocr": 3,
  "organization": 3,
  "partners": 3,
  "postgres": 3,
  "redis": 3,
  "scf": 3,
  "smpn": 3,
  "sms": 3,
  "soe": 3,
  "sqlserver": 3,
  "ssm": 3,
  "sts": 3,
  "tag": 3,
  "tav": 3,
  "tbaas": 3,
  "tbm": 3,
  "tbp": 3,
  "tcaplusdb": 3,
  "tcb": 3,
  "tci": 3,
  "tia": 3,
  "ticm": 3,
  "tics": 3,
  "tiems": 3,
  "tiia": 3,
  "tiw": 3,
  "tke": 3,
  "tkgdq": 3,
  "tmt": 3,
  "trtc": 3,
  "tsf": 3,
  "tts": 3,
  "vod": 3,
  "vpc": 3,
  "wss": 3,
  "youmall": 3,
  "yunjing": 3,
  "yunsou": 3
}


```
