/*

https://sign-1252957949.cos-website.ap-guangzhou.myqcloud.com/
https://sign-1252957949.cos-website.ap-guangzhou.myqcloud.com/qcloud_sign.html

*/

SERVER1="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/"
SERVER="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec"
SECRETID = "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
SECRETKEY = "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
SOURCE="ccc"

//'Sat, 15 Feb 2020 12:33:40 GMT'
const gmt_now=()=>new Date().toGMTString()
const now=()=>moment().unix()
const random=(n=1e5)=> Math.floor(Math.random()*n)
//sha1=(a,b)=>hmac('sha1',a,b,'base64')
//key在前
const sha1=(b,a)=>CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(a,b))
const sha256=(b,a)=>CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(a,b))
// sort ({x:1,a:2,c:3,b:0}) -> [ [ 'a', 2 ], [ 'b', 0 ], [ 'c', 3 ], [ 'x', 1 ] ]
const sort=R.pipe(R.toPairs,R.sort(R.ascend(R.prop(0))))
const join=R.pipe(R.toPairs,R.map(([k,v])=>`${k}="${v}"`),R.join(", "))               // {} -> Authorization串
const join1=R.pipe(R.toPairs,R.map(([k,v])=>`${k}: "${v}"`),R.join("\n"))
const join2=R.pipe(R.map(([k,v])=>[R.toLower(k),v]),R.map(R.join(": ")),R.join("\n")) // {} -> 签名串
const lower=R.pipe(R.toPairs,R.map(([k,v])=>[R.toLower(k),v]),R.fromPairs)            // convert headers {} -> {}
const split=R.pipe(R.split(','),R.map(R.trim),R.map(R.split('"')),R.map(([k,v])=>[k.replace('=',''),v]),R.fromPairs) // parse Authorization "" -> {}

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






/*
{
  Source: 'ccc',
  Date: 'Sat, 15 Feb 2020 13:07:19 GMT',
  Authorization: 'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="date source", signature="aSqvktrLNYBwKDeMS43788rJ4rU="'
}
*/
const getSimpleSign =(dateTime=gmt_now(),source=SOURCE, SecretId=SECRETID, SecretKey=SECRETKEY)=>{
    var auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"date source\", signature=\"";
    var signStr = "date: " + dateTime + "\n" + "source: " + source;
    const sign = auth + sha1(SecretKey,signStr) + "\""
    return {
        "Source":source,
        "Date":dateTime,
        "Authorization":sign
    }
}

const getSimpleSign1 =(dateTime=gmt_now(),source=SOURCE, SecretId=SECRETID, SecretKey=SECRETKEY)=>{
    var auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"x-date source\", signature=\"";
    var signStr = "x-date: " + dateTime + "\n" + "source: " + source;
    const sign = auth + sha1(SecretKey,signStr) + "\""
    return {
        "Source":source,
        "X-Date":dateTime,
        "Authorization":sign
    }
}

const getSimpleSign2=(h={},SecretId=SECRETID, SecretKey=SECRETKEY)=>{
  let h1=R.pipe(R.toPairs,R.map(([k,v])=>[R.toLower(k),v]))(h)
  let signStr=join2(h1);
  console.log(signStr)
  const au={
        "hmac id":SecretId,
        "algorithm":"hmac-sha1",
        "headers":R.pipe(R.pluck(0),R.join(" "))(h1),
        signature:sha1(SecretKey,signStr)
  }
  return  {
      ...h,
      Authorization:join(au),
  }
}


const get=(u=SERVER,d={})=>superagent
    .get(u)
    .set(getSimpleSign())
    .query(d)
    .type('json')


const get1=(u=SERVER,d={})=>superagent
    .get(u)
    .set(getSimpleSign1())
    .query(d)
    .type('json')

const get2=(d={},h={},u=SERVER)=>superagent
    .get(u)
    .set(h)
    .query(d)
    .type('json')


const test=async ()=>{
    s0='LBxi4Eilgk37PtaY7475b1GFo2k='
    s1=sha1('x','y')
    console.log('sha1 ok?',s0==s1)

    t='Sat, 15 Feb 2020 13:07:19 GMT'
    h1={
      "Source": 'ccc',
      "Date": 'Sat, 15 Feb 2020 13:07:19 GMT',
      "Authorization": 'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="date source", signature="aSqvktrLNYBwKDeMS43788rJ4rU="'
    }

    h=getSimpleSign(t)
    ok=h.Authorization == h1.Authorization


    console.log('ok?',ok,)

    a=getSimpleSign1()
    console.table([h,h1,a])

    b=getSimpleSign()
    console.log(b)

    r=await get1()
    console.log(r.body)
    return r
}


create_headers=()=>({
      "Source": 'ccc',
      "X-Token": "123",
      "X-ZZZ": "123",
      "X-Date": gmt_now(),
})

create_config=()=>({
       "server":SERVER,
       "secretid": SECRETID,
       "secretkey": SECRETKEY,
})


//-----------------qcloud---------------------

create_config1=()=>({
    SecretId:"AKIDlQ2ZnrCd2iI1bx5F9i9dtSn374tsacZc",
    SecretKey:"xxx",
    Region:"ap-guangzhou",
    host:".api.qcloud.com/v2/index.php",
    module:"apigateway",
    protocol:'https://',
    path:"",
    SignatureMethod:'HmacSHA256',
    version:"2",
    method:"GET",
    Nonce:random(1e5),
    Timestamp:now() ,
    get url(){ return this.protocol + this.module + this.host+this.path },
})


const encode=(s="",
           {SecretKey,SignatureMethod}=create_config1()
      )=> {
        let fn= /256/.test(SignatureMethod) ? sha256 : sha1
        return fn(SecretKey,s)
}

const formatSignString= (
    url="ssss",
    method="GET",
    params={},
    path=""
)=>method.toLocaleUpperCase() + url + path + "?" + sort_join(params)
    //new URLSearchParams(params)


const sign=(
    q={"Action":"DescribeApiKeysStatus"},
    config=create_config1(),
)=>{
     const  {
         SecretId="xxx",
         SecretKey="xxx",
         Region = "ap-guangzhou",
         module = "apigateway",
         path = "",
         SignatureMethod = 'HmacSHA256',
         version = "2",
         method = "GET",
         Nonce = random(1e5),
         Timestamp = now(),
         host,
     }=config

     const q1=expand_qs(q)
     const u=module + host
     const d={
            "Action":"",
            Nonce,
            Timestamp,
            Region,
            SecretId,
            SignatureMethod,
            //"Signature":"",
            //'Token':"",
     }
     const d1=R.merge(d,q1)
     //const d1=R.merge(d,R.pickAll(['Action'],q1))
     const ss=formatSignString(u,method,d1,path)
     console.log(ss)
     const r={
        ...d,
        ...q1,
        Signature:encode(ss,config),
      }
      console.log(r)
      return r
}


const qcloud_get=(
    q={"Action":"DescribeApiKeysStatus"},
    config,
)=>superagent
    .get(config.url)
    .query(sign(q,config))
    .type('json')


const test_data=[
    {"Action":"DescribeApiKeysStatus"},
    {
       'Action': 'CreateApiKey',
       'secretName': 'wuhan',
    },
    {
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
     },
]

var app = new Vue({
  el: '#app',
  data: {
         test_data,
         config:create_config1(),
         req:test_data[0],
         res:{},
         timer:0,
         delay:5000,
     },
     methods:{
         reset(){
             this.config=create_config1()
         },
         async send(){
              try {
                   let r=await qcloud_get(this.req,this.config)
                   console.log(r.body)
                   this.res=r.body
              }catch(e){
                  console.log(e)
                  window.open(this.url)
              }
         },
         now(){
              this.config.Timestamp=now()
         },
         start(){
             if (this.timer>0){
                  clearInterval(this.timer);
             }
             this.timer = setInterval(this.now, this.delay);
         },
         stop(){
              clearInterval(this.timer);
              this.timer=0
         },
         calc(){
              return sign(this.req,this.config)
         },
   },
  computed:{
     sig(){
         return this.calc()
     },
     url(){
          return this.config.url + "?"+new URLSearchParams(this.sig)
     }
   },
    mounted() {
        //this.start()
    },
    beforeDestroy() {
        //this.stop()
    }

})


