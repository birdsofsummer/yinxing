[doc](https://cloud.tencent.com/document/product/628)

[密钥对认证](https://cloud.tencent.com/document/product/628/11819)


```
HTTP/1.1 435 status code 435
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
X-Api-RequestId: 7bdbc73c75a53b2aa59235974522a5bd
X-Api-ID: api-3fvhfwso
X-Service-RateLimit: 5000/5000
X-Api-RateLimit: unlimited
Date: Sat, 15 Feb 2020 06:44:05 GMT
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: X-Api-ID,X-Service-RateLimit,X-UsagePlan-RateLimit,X-UsagePlan-Quota,Cache-Control,Connection,Content-Disposition,Date,Keep-Alive,Pragma,Via,Accept,Accept-Charset,Accept-Encoding,Accept-Language,Authorization,Cookie,Expect,From,Host,If-Match,If-Modified-Since,If-None-Match,If-Range,If-Unmodified-Since,Range,Origin,Referer,User-Agent,X-Forwarded-For,X-Forwarded-Host,X-Forwarded-Proto,Accept-Range,Age,Content-Range,Content-Security-Policy,ETag,Expires,Last-Modified,Location,Server,Set-Cookie,Trailer,Transfer-Encoding,Vary,Allow,Content-Encoding,Content-Language,Content-Length,Content-Location,Content-Type
X-Api-FuncName: hello
X-Api-AppId: 1252957949
X-Api-ServiceId: service-hc5rz9qa
X-Api-HttpHost: service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com
X-Api-Uri: /release
X-Api-Status: 435
X-Api-UpstreamStatus: 435

```


```python
KEYS=[
{
  "code": 0,
  "message": "",
  "codeDesc": "Success",
  "secretName": "l5mpkfyc",
  "secretId": "AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
  "secretKey": "jiw41swyus7q84s3q0mx71sxlu8who4s5d8iv271",
  "createdTime": "2020-02-15 16:51:21",
  "type": "auto"
},
{
  "code": 0,
  "message": "",
  "codeDesc": "Success",
  "secretName": "5yvdl942",
  "secretId": "AKIDktnI9rRlc1kAhy30737sw7JAW34llDVaf8lT",
  "secretKey": "5G6jQJ9EGo1k289P5qtaN5I1glzhsj8wchd3pg7",
  "createdTime": "2020-02-15 16:53:07",
  "type": "auto"
}
]

```


```javascript
//伪代码

sha1=(key,s)=>base64(hmacsha1(key,s))
key="123455dgdgdf"

// (": ","\n")
join1=...

// (" ")
join2=...

// `k1="v1", k2="v2", k3="v3", k4="v4"`
// ("=",", ")
join=...

h={
    k1:v1,
    k2:v2,
    k3:v3,
    //...
}
s=`k1: v1\nk2: v2\nk3: v3}`    //join1
o={
        "hmac id":SecretId,
        "algorithm":"hmac-sha1",
        "headers":`k1 k2 k3`,          //join2
        "signature":sha1(key,s),
}
h1={
    k1:v1,
    k2:v2,
    k3:v3,
    //...
    Authorization: join(o), 
}

```

```json
{
  "Source": "ccc",
  "X-Token": "123",
  "X-ZZZ": "123",
  "X-Date": "Thu, 20 Feb 2020 15:36:53 GMT",
  "Authorization": "hmac id=\"AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD\", algorithm=\"hmac-sha1\", headers=\"source x-token x-zzz x-date\", signature=\"6SFwUazVPxjw35Ecv8fGxew0rEc=\""
}
```




```
GET /release/sec?x=1&y=2&z=3 HTTP/1.1
Host: service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com
Accept-Encoding: gzip, deflate
User-Agent: node-superagent/5.0.5
Source: ccc
X-Token: 123
X-ZZZ: 123
X-Date: Thu, 20 Feb 2020 16:13:58 GMT
Authorization: hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="source x-token x-zzz x-date", signature="uMRPvY52/SM9A3PGuEaZPG3tu7k="
Content-Type: application/json
Connection: close
```
