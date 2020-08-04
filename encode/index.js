const moment=require('moment')
const R=require('ramda')
const {
    sha256,
}=require('utility')

const {
    has_all_keys,
    sort_key,
    json2params,
    sort_join,
}=require("../fp")

const {
       SIGN_FIELDS="appkey,random,time,token", //签名字段
       REQ_VALID_SECONDS="180",                //3分钟超时
       SIGNATURE_KEY="sig",                    //sig
       TIMESTAMP_KEY="timestamp",              //now
}=process.env

const KEYS_TO_CHECK=SIGN_FIELDS.split(",")

const now=()=>Math.floor(moment.now()/1000)
const check_time= (time=0) => now() < time ? false : now()-time < +REQ_VALID_SECONDS
const sign_sha256=R.pipe(sort_join,sha256)

const sign=(d={},k=KEYS_TO_CHECK)=>{
    let o=R.pickAll(k)(d)
    return sign_sha256(o)
}

//签名
const check_sign=(o,k=KEYS_TO_CHECK,sig_name=SIGNATURE_KEY,ts_name="timestamp")=>{
    let d=R.dissoc(sig_name)(o)
    let sig=o[sig_name]
    let time=d[ts_name]
    let time_ok=time && check_time(time)
    let keys_ok=has_all_keys(d,k)

    console.log('<<<',time_ok,keys_ok,">>>")

    if (time_ok && keys_ok){
        return sign(d,k) == sig
    }
    return false
}

module.exports={
    sign,
    check_sign,
    now,
}

