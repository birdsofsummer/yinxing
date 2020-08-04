const R=require('ramda')
const {
    sign,
    check_sign,
    now,
}=require('../encode')

const {csv2json}=require('../fp')

const {
    SIGNATURE_KEY="sig",
    SIGN_FIELDS="appkey,random,time,token", //签名字段
    REQ_VALID_SECONDS="180",                //3分钟超时
    HEADERS_MUST_HAVE="x,1,y,2",            //默认请求头,不符则拒绝
}=process.env


const KEYS_TO_CHECK=SIGN_FIELDS.split(",")
const DEFAULT_HEADERS=csv2json(HEADERS_MUST_HAVE) //{}

// 简单检查headers
const create_check_headers=(o=DEFAULT_HEADERS)=>async (ctx,next)=>{
    let headers=ctx.headers
    let query=ctx.query
    for (let i in o){
        if (o[i] != headers[i]){
          return  ctx.body = {
                "errorCode":0,
                "errorMessage":"headers字段不全",
                message: "fail",
                ok: false,
                data:{},
            }
        }
    }
    await next()
}

// 签名在headers
const create_sign_headers=(k=KEYS_TO_CHECK,sig_name=SIGNATURE_KEY)=>async (ctx,next)=>{
    let headers=ctx.headers
    let query=ctx.query
    let miss=k.some(x=>R.isNil(headers[x]))
    if (miss){
          return  ctx.body = {
                "errorCode":0,
                "errorMessage":"字段不全,签名校验失败",
                message: "fail",
                ok: false,
                data:{},
            }
    }
    let d=R.merge(query,headers)
    let ok=check_sign(d,k)
    if (ok){
        await next()
    }else{
      return  ctx.body = {
            "errorCode":0,
            "errorMessage":"签名校验失败",
            message: "fail",
            ok: false,
            data:{},
        }
    }
}

// 签名在body/query
const create_sign_qs=(k=KEYS_TO_CHECK,sig_name=SIGNATURE_KEY)=>async (ctx,next)=>{
    let o=R.merge(ctx.query,ctx.headers)
    let ok=check_sign(o,k,sig_name)
    if (ok){
        await next()
    }else{
      return  ctx.body = {
            "errorCode":0,
            "errorMessage":"签名校验失败",
            message: "fail",
            ok: false,
            data:{},
        }
    }
}


module.exports={
    create_sign_qs,
    create_sign_headers,
    create_check_headers,
}
