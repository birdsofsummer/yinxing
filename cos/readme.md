## env

```bash

export SecretId='xxxxxxxxxxxxxxxxxxxxxx'
export SecretKey='xxxxxxxxxxxxxxxxxxxxxx'
export Bucket='ttt-1252957949'
export Region='ap-hongkong'
export Prefix="image/"

```
## cos

[cos]("cos.md" "cos")

```javascript

const {
    cos,
    list,
    del,
    slice_upload,
    upload_s,
    upload_s1,
    upload1,
}=require("./index")

test=async ()=>{
    l=await list()
    console.log(l)
    return l
}


```


## sts 


```javascript

test=async ()=>{
    a=require('./sts')
    let r=await a.get_tk()
    console.log(r)
    const {
        expiredTime,
        expiration,
        credentials,
        requestId,
        startTime,
    }=r
    //...
}

test()

```

```json

{
  "expiredTime": 1578199196,
  "expiration": "2020-01-05T04:39:56Z",
  "credentials": {
    "sessionToken": "c2acU51IbJAqI3w51KPEI553nvyH8pXVa138c49800f8cab5d87c1ada1fe33a27A7nawKIsdouU24cbQYbG21cZ00MaPtzSpmV3LH-EO2rUpE84iOoAaE0ilqfQl6vwmloXzkHXsH6Ebo1_go3IOjVPZo174vhDsGRO08UKSwU",
    "tmpSecretId": "AKIDVPvcx8Z6E_tcD7CcWmfvSblpGgNF24pssPJ8tkxTZFNeB9ENVG9tIo4i70mqiekJ",
    "tmpSecretKey": "aR8G7fWg18W5i7QHIwR9Lkcoz3eS0KlaUvWTX/kssCA="
  },
  "requestId": "7c71aace-959b-4722-845e-d9c849e58dc9",
  "startTime": 1578197396
}


```
