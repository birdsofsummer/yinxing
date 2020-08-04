const crypto=require("crypto")
const R=require("ramda")
const {URLSearchParams}=require('url')
const utility = require('utility')
const superagent=require('superagent')

// expand_qs({x:1,x_0:1,y:[1,2,3]}) -> { x: 1,'x.0':1, 'y.0': 1, 'y.1': 2, 'y.2': 3 }
const expand_qs=R.pipe(
    R.toPairs,
    R.map(([k,v])=>Array.isArray(v)
        ?
        v.map((x,i)=>[k+"."+i,x])
        :[[k.replace('_',"."),v]]
    ),
    R.invoker(0,'flat'),
    R.fromPairs,
)

const sort_join=R.pipe(
    R.toPairs,
    R.sort(R.ascend(R.prop(0))),
    R.map(R.join('=')),
    R.join('&')
)

const {
    SecretId="xxx",
    SecretKey="xxx",
    Region="ap-guangzhou",
}=process.env

const encode=(s="",
           signMethod="HmacSHA256",
           {SecretKey}=process.env
      )=> {
        let signMethodMap = {
            HmacSHA1: "sha1",
            HmacSHA256: "sha256"
        };
        let m=signMethodMap[signMethod]
        let hmac = crypto.createHmac(m , SecretKey);
        return hmac
            .update(Buffer.from(s, 'utf8'))
            .digest('base64')
}



const formatSignString= (
    url="ssss",
    method="GET",
    params={},
    path=""
)=>method.toLocaleUpperCase() + url + path + "?" + sort_join(params)
    //new URLSearchParams(params)

const sign=(q={"Action":"DescribeApiKeysStatus"},module="apigateway",)=>{
     const q1=expand_qs(q)
     const u=module + ".api.qcloud.com/v2/index.php"
     const m="GET"
     const d={
            //"Action":"",
            'Nonce': utility.random(1e5),
            'Region': Region,
            'SecretId': SecretId,
            'SignatureMethod': 'HmacSHA256',
            //"Signature":"",
            'Timestamp': utility.timestamp(),
            //'Token':"",
     }
     const p=""
     const d1=R.merge(d,q1)
     //const d1=R.merge(d,R.pickAll(['Action'],q1))
     const ss=formatSignString(u,m,d1,p)
     console.log(ss)
     const r={
        ...d,
        ...q1,
        Signature:encode(ss),
      }
      console.log(r)
      return r
}

const get=(
    q={"Action":"DescribeApiKeysStatus"},
    module="apigateway",
)=>superagent
    .get('https://'+module+".api.qcloud.com/v2/index.php")
    .query(sign(q,module))
    .type('json')



const test=async ()=>{
     let qq={
        "Action":"DescribeApiKeysStatus",
        "offset":"0",
        "limit":"2",
        "orderby":"createdTime",
        "order":"desc",
        //"searchKey":"aa",
        "secretIds":[
            "AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
            "AKIDktnI9rRlc1kAhy30737sw7JAW34llDVaf8lT",
        ],
     }
     let q={
       'Action': 'CreateApiKey',
       'secretName': 'wuhan',
     }

     let r1=await get(q)
     console.log(r1.request.url)
     console.log(JSON.parse(r1.text))

     let r2=await get(qq)
     console.log(JSON.parse(r2.text))
     return [r1,r2]
}

module.exports={
    encode,
    sign,
    formatSignString,
    get,
    test,
}

