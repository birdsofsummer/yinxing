[预览](https://upload-game-1252957949.ap-shanghai.tencentserverless.com)


https://upload-game-1252957949.ap-shanghai.tencentserverless.com



# 环境变量
```yaml
    SecretId: AKIDlQ2Znxxxxxxxxxxxxxxxxxxxxxxxx
    SecretKey: aO7QfZxxxxxxxxxxxxxxxxxxxxxxxxx
    Bucket: ttt-1252957949 #
    Region: ap-hongkong    #
    Prefix: music          #根文件夹名
    maxFileSize: "6291456"  #文件大小限制 < 6m
```

# 安装云函数

   函数类型:http

   [快速入门](https://cloud.tencent.com/document/product/583/37278)

   打包

   ```bash
        cnpm i
        scf deploy -n upload --skip-event -f -r ap-shanghai -ns poem  #这一步主要是为了传环境变量上去,失败了没有关系,网页刷新一下出了环境变量就行了
        rm -rf .scf_build
        zip  -r /tmp/1.zip *
   ```
   然后网页上传zip

   传完以后检查一下环境变量有木有...这里坑爹

   没有就在函数配置页面手动输入一下....
   





# 接口


## 上传文件

base:  https://upload-game-1252957949.ap-shanghai.tencentserverless.com

****

|actio|路径|方法|data|
|--|--|--|--|--
|上传| /api/create |post|form
|删除| /api/delete |post|"Key=upload/2.aac"
|list| /api/list |get|空

****

测试


```bash
npm insatll
node index.js

host=localhost:8080


####修改环境变量
export SecretId=xxxx
export SecretKey=*****
export Bucket=ttt-1252957949
export Region=ap-hongkong
export Prefix=music
export COS_HOST=https://ttt-1252957949.cos.ap-hongkong.myqcloud.com
####修改环境变量


#模拟云函数环境
#####################
mkdir -p /var/user/${prefix}


#####################
curl $host/list    #列表
curl $host/create -F "file=@hongdou.mp3"  #上传
curl $host/list
curl $host/delete -d 'Key=music/hongdou.mp3'  #删除

# 网页打开也可..
```


### 上传


```
curl 'http://...../create'
-H 'Content-Type: multipart/form-data; boundary=---------------------------12864488541456898568309584675' 
--data-binary $'-----------------------------12864488541456898568309584675\r\nContent-Disposition: form-data; name="file"; filename="2.aac"\r\nContent-Type: audio/aac\r\n\r\n-----------------------------12864488541456898568309584675--\r\n'

```
```javascript

upload=async (url="/create",file,)=>{
   const formData = new FormData()
    formData.append('file', file)
    fetch(url,{
        method :"POST",
        body: formData,
 //       headers:{ "Content-Type": "multipart/form-data" }
    }).then(console.log)
}

test=async ()=>{
    SERVER="http://localhost:8080/create"
    input=document.querySelector('#file1')
    var file=input.files[0];
    r=await upload(SERVER,file)
}

```

### 上传成功
```
{
	"data": {
		"Location": "ttt-1252957949.cos.ap-hongkong.myqcloud.com/upload/2.aac",
		"Bucket": "ttt-1252957949",
		"Key": "upload/2.aac",
		"ETag": "\"a09506f966fa0de768ef48ff3c15733b-4\"",
		"statusCode": 200,
		"headers": {
			"content-type": "application/xml",
			"transfer-encoding": "chunked",
			"connection": "keep-alive",
			"date": "Sun, 17 Nov 2019 09:01:02 GMT",
			"server": "tencent-cos",
			"x-cos-request-id": "NWRkMTBjNGVfZTFhNzM4MDlfMjJjM19kNGYyNmY="
		}
	},
	"message": "文件上传成功",
	"ok": true
}

```

### 上传失败

status code: 500 
status text: Internal Server Error
body:  空

## list

```json
{
	"Name": "ttt-1252957949",
	"Prefix": "music",
	"Marker": "",
	"MaxKeys": "1000",
	"IsTruncated": "false",
	"Contents": [
		{
			"Key": "music/",
			"LastModified": "2019-07-29T12:47:25.000Z",
			"ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
			"Size": "0",
			"Owner": {
				"ID": "1252957949",
				"DisplayName": "1252957949"
			},
			"StorageClass": "STANDARD"
		},
		{
			"Key": "music/2.aac",
			"LastModified": "2019-11-17T03:49:56.000Z",
			"ETag": "\"34edf859f00409981b93cdf21ba419cd\"",
			"Size": "3291634",
			"Owner": {
				"ID": "1252957949",
				"DisplayName": "1252957949"
			},
			"StorageClass": "STANDARD"
		}
	],
	"CommonPrefixes": [],
	"statusCode": 200,
	"headers": {
		"content-type": "application/xml",
		"content-length": "1457",
		"connection": "keep-alive",
		"date": "Sun, 17 Nov 2019 09:47:19 GMT",
		"server": "tencent-cos",
		"x-cos-bucket-region": "ap-hongkong",
		"x-cos-request-id": "NWRkMTE3MjdfMjVhODM4MDlfYjQ5Ml9kODg0MTI="
	}
}

```

## 删除文件

删除不存在的文件视为删除成功

path : /delete
body : "Key=music/2.aac"    
成功 :

```json
{
  "data": {
    "statusCode": 204,
    "headers": {
      "connection": "keep-alive",
      "date": "Sun, 17 Nov 2019 10:23:22 GMT",
      "server": "tencent-cos",
      "x-cos-request-id": "NWRkMTFmOWFfYTZhNzM4MDlfYWMwM19kNTFjNmE="
    }
  },
  "message": "",
  "ok": true
}


```

无key


```
{
    "data": {},
    "message": "no key",
    "ok": false
}

```

```bash
    curl "localhost:8080/delete" -d 'Key=music/2.aac'
```




## 调试


ctx.request

```
{
  method: 'POST',
  url: '/',
  header: {
    host: 'localhost:8080',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.5',
    'accept-encoding': 'gzip, deflate',
    referer: 'http://localhost/',
    'content-type': 'multipart/form-data; boundary=---------------------------1551967995777521245943947853',
    origin: 'http://localhost',
    'content-length': '27393',
    dnt: '1',
    connection: 'keep-alive',
    pragma: 'no-cache',
    'cache-control': 'no-cache'
  }
}

```
ctx.request.files["file"]

```

{
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  size: 26302,
  path: '/tmp/upload_60f31a06bb80a7f62918857c8537ae17',
  name: '1.png',
  type: 'image/png',
  hash: null,
  lastModifiedDate: 2019-11-17T07:35:40.677Z,
  _writeStream: WriteStream {
    _writableState: WritableState {
      objectMode: false,
      highWaterMark: 16384,
      finalCalled: true,
      needDrain: true,
      ending: true,
      ended: true,
      finished: true,
      destroyed: true,
      decodeStrings: true,
      defaultEncoding: 'utf8',
      length: 0,
      writing: false,
      corked: 0,
      sync: false,
      bufferProcessing: false,
      onwrite: [Function: bound onwrite],
      writecb: null,
      writelen: 0,
      bufferedRequest: null,
      lastBufferedRequest: null,
      pendingcb: 0,
      prefinished: true,
      errorEmitted: false,
      emitClose: false,
      autoDestroy: false,
      errored: false,
      bufferedRequestCount: 0,
      corkedRequestsFree: [Object]
    },
    writable: false,
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    path: '/tmp/upload_60f31a06bb80a7f62918857c8537ae17',
    fd: null,
    flags: 'w',
    mode: 438,
    start: undefined,
    autoClose: true,
    pos: undefined,
    bytesWritten: 26302,
    closed: false
  }
}

*/


```
