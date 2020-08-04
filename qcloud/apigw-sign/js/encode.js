const moment=require('moment')
const R=require("ramda")
const {hmac}=require("utility")
const superagent=require('superagent')

const KEY_MAP={
    "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD": "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX",
}

const SERVER="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec"
const SECRETID = "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
const SECRETKEY = "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
const SOURCE="ccc"
const EXP=15 *60


//'Sat, 15 Feb 2020 12:33:40 GMT'
const gmt_now=()=>new Date().toGMTString()
const now=()=>moment().unix()
const sha1=(a,b)=>hmac('sha1',a,b,'base64')
// sort ({x:1,a:2,c:3,b:0}) -> [ [ 'a', 2 ], [ 'b', 0 ], [ 'c', 3 ], [ 'x', 1 ] ]
const sort=R.pipe(R.toPairs,R.sort(R.ascend(R.prop(0))))
const join=R.pipe(R.toPairs,R.map(([k,v])=>`${k}="${v}"`),R.join(", "))               // {} -> Authorization串
const join1=R.pipe(R.toPairs,R.map(([k,v])=>`${k}: "${v}"`),R.join("\n"))
const join2=R.pipe(R.map(([k,v])=>[R.toLower(k),v]),R.map(R.join(": ")),R.join("\n")) // {} -> 签名串
const lower=R.pipe(R.toPairs,R.map(([k,v])=>[R.toLower(k),v]),R.fromPairs)            // convert headers {} -> {}
const split=R.pipe(R.split(','),R.map(R.trim),R.map(R.split('"')),R.map(([k,v])=>[k.replace('=',''),v]),R.fromPairs) // parse Authorization "" -> {}



// ----------------------------------------encode--------------------------------------------------------------
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

// https://cloud.tencent.com/document/product/628/11819
const getSimpleSign2 =(h={},SecretId=SECRETID, SecretKey=SECRETKEY)=>{
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


// ----------------------------------------decode--------------------------------------------------------------


const check_source=(s="")=> s == SOURCE
const check_time=(t="")=>{
    if ( !t ) return false
    let t1=now()
    let t0=moment(t.trim()).unix()
    let d=t1-t0
    let r= (d>=0) && (d < EXP)
    console.log('time',t,d)
    return r
}


const check_auth=(source,dateTime,au="")=>{
  let o=R.pipe(R.split(','),R.map(R.split('"')),R.map(R.map(R.invoker(0,'trim'))),R.map(([k,v])=>[k.replace('=',''),v]),R.fromPairs)(au)
  let a= o['hmac id'] == SECRETID
  let {algorithm,headers,signature}=o
  var signStr = "date: " + dateTime + "\n" + "source: " + source;
  let s=sha1(SECRETKEY,signStr)
  //console.log(s,signature)
  let b = s == signature
  return a && b

}

const verify=(x={})=>{
   let a=check_source(x.Source)
   let b=check_time(x.Date)
   let c=check_auth(x.Source,x.Date,x.Authorization)
   //console.log(a,b,c)
   if (a && b && c) {
       return true
   }else{
       return false
   }
}


/*
 *
{
  Source: 'ccc',
  'X-Token': '123',
  'X-ZZZ': '123',
  'X-Date': 'Thu, 20 Feb 2020 15:36:53 GMT',
  Authorization: 'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="source x-token x-zzz x-date", signature="6SFwUazVPxjw35Ecv8fGxew0rEc="'
}
*/


const verify1=(h={},cond=[])=>{
  let h1=lower(h)
  let {source,authorization}=h1

  // time
  let t= R.pipe(R.props(['date','x-date']),R.filter(Boolean),R.head)(h1)
  let b=check_time(t)
  console.log('time',t,b)

  // source
  let a=check_source(source)
  console.log('source',source,a)

  let au=split(authorization)
  console.log('au',au)

  let kk=au.headers.split(' ')
  let h2=R.pipe(R.map((x)=>[x,h1[x]]),R.fromPairs)(kk)

  // sig
  let key=KEY_MAP[au['hmac id']] || ""
  if (!key) {
      console.log('key is empty')
      return false
  }

  let s=R.pipe(R.map((x)=>[x,h1[x]]),join2)(kk)
  let s0=au['signature']
  let s1=sha1(key,s)
  let c=s0 == s1
  console.log('signature',s0,s1,c)

  // other field
  let d=R.allPass(cond)(h1)
  console.log('cond',d)

  return a && b && c && d

}

const get=(u=SERVER,d={})=>superagent
    .get(u)
    .set(getSimpleSign1())
    .query(d)
    .type('json')


const get1=(h={},d={},u=SERVER,)=>superagent
    .get(u)
    .set(h)
    .query(d)
    .type('json')




// ----------------------------------------test--------------------------------------------------------------

const test=()=>{
  assert.equal(sha1('x','y'),'LBxi4Eilgk37PtaY7475b1GFo2k=')
  let t='Sat, 15 Feb 2020 13:07:19 GMT'
  let h=getSimpleSign(t)
  let r=verify(h)
  console.log(r)
}


const test1=async ()=>{
  let t='Sat, 15 Feb 2020 13:07:19 GMT'
  let h=getSimpleSign1(t)
  console.log(h)
  console.log(getSimpleSign1())
  let r=await get()
  console.log(r.body)
}
//test()

const test2=()=>{
    let h={
      //"X-ZZZ": "123",
      "X-Date": 'Thu, 20 Feb 2020 15:06:15 GMT', //gmt_now(),
      Source: 'ccc',
      //"X-Token": "123",
    }
    h1=getSimpleSign2(h)
    h2=getSimpleSign1(h['X-Date'])
    console.log(h1)
    console.log(h2)
    assert.equal(h1.Authorization,h2.Authorization)
}



const test3=async ()=>{
    let z={
      Source: 'ccc',
      "X-Token": "123",
      "X-ZZZ": "123",
      "X-Date": gmt_now(),
    }
    z1=getSimpleSign2(z)
    console.log(z1)
    r=await get1(z1,{x:1,y:2,z:3})
    console.log(r)
    console.log(r.body)
}


const test4=()=>{
    let z={
      "Source": 'ccc',
      "X-Token": "123",
      "X-ZZZ": "123",
      "X-Date": gmt_now(),
    }
    z1=getSimpleSign2(z)
    console.log(z1)

    check_token=(x)=> x['x-token'] == '123'
    check_zzz=(x)=> x['x-zzz'] == '123'
    cond=[check_token,check_zzz]

    ok=verify1(z1,cond)
    assert.ok(ok)
}










module.exports={
    getSimpleSign,
    getSimpleSign1,
    getSimpleSign2,
    verify,
    get,
    test,
    test1,
    test2,
    test3,
    test4,
}
