# 签名

## 检查字段

```javascript
const KEYS_TO_CHECK=["appkey" ,"random","time","token"]
const REQ_VALID_SECONDS=60*3 //3分钟超时

const moment=require('moment')
const now=()=>Math.floor(moment.now()/1000)
const check_time= (time=0) => now() < time ? false : now()-time < REQ_VALID_SECONDS

```
1. 4个字段缺一不可
2. time字段为unix时间戳 
   
   3分钟超时

   当前时间-t<180秒

   未来时间不行


示例

```
{
        "appkey":"xxx" ,
        "random":"ddd",
        "time":now(),
        "token":"xxxxx",
        "x":1,
        "y":2,
}

```

## 签名方法

   1. json 按key排序 
   2. join 两次 "k1=v1&k2=v2"
   3. sig=sha256("k1=v1&k2=v2...")

## 检查签名方法

   1. 字段不全
   2. 时间不对不通过
   3. data取出```["appkey" ,"random","time","token"]```字段重新sha256签名,
      与sig相同即可

