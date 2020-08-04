const {promisify} = require('util');


const {to_s}=require('../fp')
const each=(f)=>(o={})=> Object.entries(o).forEach(f)
const promisifyAll=(c)=>{
    let f=([k,v])=>c.__proto__["_"+k]=promisify(v).bind(c)
    each(f)(c.__proto__)
    return c
}

const redis = require("redis");
const conn=()=>{
    let client = redis.createClient();
    promisifyAll(client)
    return client
}

const cache=(client,name="push")=>(k="",v="")=>{
    //let client=conn()
    if (k && v) {
        return client._hset(name,k,to_s(v))
    }else if (k){
        return client._hget(name,k,)
    }else{
        return client._hgetall(name)
    }
}

module.exports={
    conn,
    cache,
}



