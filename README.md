# 银杏

[![travis_Build Status](https://travis-ci.com/birdsofsummer/yinxing.svg?branch=master)](https://travis-ci.com/birdsofsummer/yinxing)

[![Build Status](https://github.com/birdsofsummer/yinxing/workflows/publish/badge.svg)](https://github.com/birdsofsummer/yinxing/actions)  

[![Actions Status](https://github.com/birdsofsummer/yinxing/workflows/publish/badge.svg)](https://github.com/birdsofsummer/yinxing/actions) 


##

https://www.npmjs.com/package/yinxing

```bash
# 本地模拟云端环境

    cnpm i -g cos-nodejs-sdk-v5
    cnpm i -g qcloudapi-sdk
    cnpm i -g tencentcloud-sdk-nodejs
    cnpm i -g base64-js
    cnpm i -g buffer
    cnpm i -g crypto-browserify
    cnpm i -g ieee754
    cnpm i -g imagemagick
    cnpm i -g isarray
    cnpm i -g jmespath
    cnpm i -g lodash
    cnpm i -g punycode
    #cnpm i -g puppeteer
    cnpm i -g querystring
    cnpm i -g request
    cnpm i -g sax
    cnpm i -g url
    cnpm i -g uuid
    cnpm i -g xml2js
    cnpm i -g xmlbuilder


    export SecretId=****
    export SecretKey=****
    export Region=****
    export Bucket=****
    export Prefix=****
    export COS_HOST=****
    export maxFileSize=****
    export CosBucketName=****
    export CosObjectName=****
    export CosBucketRegion=****
    export ZipFile=****
    export CodeSource=****
    export DemoId=****
    export TempCosObjectName=****
    export GitUrl="https://github.com/xxx/xxx"
    export GitRepository=****
    export GitUserName=****
    export GitPassword=****
    export GitPasswordSecret=****
    export GitBranch=****
    export GitDirectory=****
    export GitCommitId=****
    export GitUserNameSecret=****

    export sms_test_phone=""
    export sms_AppID=""
    export sms_AppKey=""
    export sms_Sign=""
    export sms_templateId=""
    export sms_content="{1}为您的登录验证码，请于{2}分钟内填写。如非本人操作，请忽略本短信。" #

    export TOKEN_LIFE="86400"
    export TOKEN_AUD="aaaa"
    export TOKEN_SUB="cccc"
    export TOKEN_ALG="HS256"
    export TOKEN_TYP="JWT"

    npm install --save yinxing 


```




```javascript

const {
    fp,
    q,
    cache,
    db,
    cos,
    sms,
    router,
 //   middleware,
 //   action,
    token,
    //...
}=require("yinxing")





```


























## scf


https://cloud.tencent.com/document/product/583/11060


Node.js 8.9 云端自带库

```json

{
"dependencies":
    {
        "cos-nodejs-sdk-v5": "2.5.7",
        "base64-js": "1.2.1",
        "buffer": "5.0.7",
        "crypto-browserify": "3.11.1",
        "ieee754": "1.1.8",
        "imagemagick": "0.1.3",
        "isarray": "2.0.2",
        "jmespath": "0.15.0",
        "lodash": "4.17.4",
        "npm": "5.6.0",
        "punycode": "2.1.0",
        "puppeteer": "1.14.0",
        "qcloudapi-sdk": "0.1.5",
        "querystring": "0.2.0",
        "request": "2.87.0",
        "sax": "1.2.4",
        "tencentcloud-sdk-nodejs": "3.0.52",
        "url": "0.11.0",
        "uuid": "3.1.0",
        "xml2js": "0.4.17",
        "xmlbuilder": "9.0.1"
    }
}
```

https://cloud.tencent.com/document/product/583

## SCF CLI 

### install
  ```bash
    pip3 install scf  
    scf --version
  ```

### init
```bash
    scf init
    scf init --runtime python2.7 --name testproject --output-dir /Users/xxx/code/scf/
    scf init --runtime python2.7 --name hello 
    scf init --runtime nodejs6.10 --name hello 
    scf init --runtime nodejs8.9 --name hello 
    scf init --runtime python3.6 --name hello 
    scf init --runtime php5 --name hello 
    scf init --runtime php7 --name hello 
    scf init --runtime go1 --name hello 
    scf init --runtime nodejs 8.9 --name hello  --location http://..  --output-dir ./hello
```
### test
```bash
    scf local generate-event cos post
    scf local generate-event cos put
    scf local generate-event cos delete
    scf local generate-event timer timeup
    scf local generate-event apigateway proxy
    scf local generate-event apigateway proxy > event.json

    scf native invoke --template template.yaml --event event.json
    scf native generate-event cos post| scf native invoke --template template.yaml
    scf local  invoke --template template.yaml --event event.json
    scf local generate-event cos post | scf local invoke --template template.yaml
    scf local generate-event cos post | scf local invoke -t template.yaml testfunction
```
### deploy
```bash
   scf deploy
   scf deploy --cos-bucket temp-code-1253970226
   scf deploy -t deploy.yaml -f -c temp-code-1253970226 -n test-func -ns ccc -r ap-hongkong --skip-event
```

