const util = require('utility')
const fs=require('fs')


const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
const HOST='http://localhost:' + port + "/"

const HEADERS={
    "Content-Type": "application/json; charset=utf-8",  //不可少
    "token" :"ddddd",
}

superagent=require('superagent')
post=(u="/",d={})=>superagent
    .post(HOST+u,d)
    .set(HEADERS)
    .type('json')

get=(u="/",d={})=>superagent
    .get(HOST+u,d)
    .set(HEADERS)
    .type('json')


//----------------------------------echo--------------------------------
//node index.js
//curl 'http://localhost:3000/?cc=1&dd=2'  -H 'Content-Type: application/json; charset=utf-8' --data '{"x":1,"y":2}'

echo=async ()=>{
   let u="echo?cc=1&dd=2"
   let d={"x":1,"y":2}
   r1=await post(u,d)
   r2=await get(u,d)
   console.log(r1.body)
   console.log(r2.body)
}

//----------------------------------mongo--------------------------------
// mongod
// node mongo.js

d={
      name: '呵呵',
      srcnode: 0,
      dstnode: 0,
      time: 100
}

d1={
  name: 'dddd',
  srcnode: 0,
  dstnode: 0,
  time: 100,
  _id: '5dfd85c0a5f81f2da88d47cc'
}

list=async(o={})=>{
   let r=await get("list",o)
   console.log(r.body)
   return r.body
}

insert=async ()=>{
  let r=await post("create",d)
  let {code,ok,msg,data:{
        result,
        connection,
        ops,
        insertedCount,
        insertedId,
        n,
        ok:ok1,
   }}=r.body
   console.log(r.body)
  return r.body
}

update=async ()=>{
     r=await post("update",d1)
     console.log(r.body)
     return r.body
}

del=async ()=>{
     let o={_id:"5dfd85c0a5f81f2da88d47cc" }
     let r=await post("delete",o)
     console.log(r.body)
     return r.body
}

//echo()
