/*

https://sign-1252957949.cos-website.ap-guangzhou.myqcloud.com/
https://sign-1252957949.cos-website.ap-guangzhou.myqcloud.com/qcloud_sign.html

used...
<script src="js/superagent.js"></script>
<script src="js/crypto-js/crypto-js.js"></script>
https://www.bootcdn.cn/crypto-js/
https://github.com/apigateway-demo/qcloud-apigateway-sign-demo-js/blob/master/demo.js

*/

SERVER1="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/"
SERVER="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec"
SECRETID = "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
SECRETKEY = "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
SOURCE="ccc"

//'Sat, 15 Feb 2020 12:33:40 GMT'
var gmt_now=()=>new Date().toGMTString()
const now=()=>moment().unix()
//sha1=(a,b)=>hmac('sha1',a,b,'base64')
sha1=(b,a)=>CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(a,b))
/*
{
  Source: 'ccc',
  Date: 'Sat, 15 Feb 2020 13:07:19 GMT',
  Authorization: 'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="date source", signature="aSqvktrLNYBwKDeMS43788rJ4rU="'
}
*/

// sort ({x:1,a:2,c:3,b:0}) -> [ [ 'a', 2 ], [ 'b', 0 ], [ 'c', 3 ], [ 'x', 1 ] ]
const sort=R.pipe(R.toPairs,R.sort(R.ascend(R.prop(0))))
const join=R.pipe(R.toPairs,R.map(([k,v])=>`${k}="${v}"`),R.join(", "))               // {} -> Authorization串
const join1=R.pipe(R.toPairs,R.map(([k,v])=>`${k}: "${v}"`),R.join("\n"))
const join2=R.pipe(R.map(([k,v])=>[R.toLower(k),v]),R.map(R.join(": ")),R.join("\n")) // {} -> 签名串
const lower=R.pipe(R.toPairs,R.map(([k,v])=>[R.toLower(k),v]),R.fromPairs)            // convert headers {} -> {}
const split=R.pipe(R.split(','),R.map(R.trim),R.map(R.split('"')),R.map(([k,v])=>[k.replace('=',''),v]),R.fromPairs) // parse Authorization "" -> {}



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

gen=async ()=>{
     let s=getSimpleSign1()
     let s1=JSON.stringify(s)
     document.querySelector('#sign').value=s1
     let r=await get2({x:1,y:2},s)
     console.log(r.body)
}

reset_time=()=>{
    document.querySelector('#time').value=gmt_now()
}

gen1=async()=>{
    let SecretId=document.querySelector('#SECRETID').value
    let SecretKey=document.querySelector('#SECRETKEY').value
    let source=document.querySelector('#SOURCE').value
    let dateTime=document.querySelector('#time').value
    let server=document.querySelector('#SERVER').value || SERVER
    let s=getSimpleSign1(dateTime,source, SecretId, SecretKey)
    let s1=JSON.stringify(s)
    document.querySelector('#sign1').value=s1
    let r=await get2({x:1,y:2},s,server)
    console.log(r.body)
}

reset_time()

//test()

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

 var app = new Vue({
  el: '#app',
  data: {
     headers:create_headers(),
     config:create_config(),
     res:{},
     timer:0,
     delay:5000,
    },
     methods:{
     reset(){
         this.headers=create_headers()
         this.config=create_config()
     },
     async send(){
          let s=this.calc();
          let server=this.config.server
          let r=await get2({x:1,y:2},s,server)
          console.log(r.body)
          this.res=r.body
     },
     now(){
          this.headers["X-Date"]=gmt_now()
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
          return getSimpleSign2(this.headers,this.config.secretid,this.config.secretkey)
     },
   },
  computed:{
     headers1:function(){
         return Object.keys(this.headers)
     },
     sig(){
         return JSON.stringify(this.calc())
     }

   },
    mounted() {
        this.start()
    },
    beforeDestroy() {
        this.stop()
    }

})


