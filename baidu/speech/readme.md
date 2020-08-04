[api](https://cloud.baidu.com/doc/SPEECH/s/Jjwvy670f/ "") 

[sdk](https://cloud.baidu.com/doc/SPEECH/s/Ojwvy66bh "") 

[参数](https://ai.baidu.com/ai-doc/SPEECH/jk38y8cp8 "")

[参数](https://ai.baidu.com/ai-doc/SPEECH/Rk38y8jax "")

```bash

npm install baidu-aip-sdk
export baidu_speech_AppID=12345
export baidu_speech_APIKey="************************"
export baidu_speech_SecretKey="********************************"


```

## 语音识别

[sdk](https://cloud.baidu.com/doc/SPEECH/s/fjwvy5dwk)

### 音频

+ 原始 PCM 的录音参数必须符合 8k/16k 采样率、16bit 位深、单声道，
+ pcm（不压缩）、wav（不压缩，pcm编码）、amr（压缩格式）。
+ 语音时长上限为60s

### 示例
```javascript

const fs=require('mz/fs')

const audio2text=async (file_name='test.pcm')=>{
    let c=new speech(AppID,APIKey,SecretKey)
    let voice =await fs.readFile(file_name);
    let voiceBuffer = new Buffer(voice);
    o={dev_pid: '1536', cuid: Math.random()}
    r1=await c.recognize(voiceBuffer, 'pcm', 16000)
    r2=await c.recognize(voiceBuffer, 'pcm', 16000，o )
    console.log(r1)
    console.log(r2)
}

```

|dev_pid|语言|模型|是否有标点|备注
|---|---|----|----|----
|1536|普通话(支持简单的英文识别)|搜索模型|无标点|支持自定义词库
|1537|普通话(纯中文识别)|输入法模型|有标点|不支持自定义词库
|1737|英语||无标点|不支持自定义词库
|1637|粤语||有标点|不支持自定义词库
|1837|四川话||有标点|不支持自定义词库
|1936|普通话远场|远场模型|有标点|不支持

## 语音合成

### 文字

+ <1024字


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
    baidu_speech_AppID:AppID,
    baidu_speech_APIKey:APIKey,
    baidu_speech_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/yzm.jpg")=>fs.readFile(i).then(x=>x.toString("utf-8"))

const test=async ()=>{
      let c=new speech(AppID,APIKey,SecretKey)
      let o={ }
     //let o= {spd: 0, per: 4}
      let t = await read("t.txt")
      r=await c.text2audio(t,o)
      console.log(r)
      s=fs.createWriteStream('t.mp3')
      s.write(r.data)
}



```

```json
{
	"短语音识别-中文普通话（输入法）": "http://vop.baidu.com/server_api",
	"短语音识别-中文普通话（搜索）": "http://vop.baidu.com/server_api",
	"短语音识别-英语": "http://vop.baidu.com/server_api",
	"短语音识别-粤语": "http://vop.baidu.com/server_api",
	"短语音识别-四川话": "http://vop.baidu.com/server_api",
	"短语音识别极速版": "https://vop.baidu.com/pro_api",
	"语音合成-基础音库": "http://tsn.baidu.com/text2audio",
	"语音合成-精品音库": "http://tsn.baidu.com/text2audio",
	"语音自训练平台-输入法": "http://vop.baidu.com/server_api",
	"语音自训练平台-搜索": "http://vop.baidu.com/server_api",
	"呼叫中心语音解决方案-语音识别": "--",
	"呼叫中心语音解决方案-语音合成": "--",
	"远场语音识别": "http://vop.baidu.com/server_api"
}
```
