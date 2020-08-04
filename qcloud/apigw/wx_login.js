//微信扫码登录

const fs = require('fs')
const TencentLogin = require('tencent-login')

const format_k=({
        secret_id:SecretId,
        secret_key:SecretKey,
        appid:AppId,
        token,
        expired, //6秒
        signature,
        uuid,
})=>{
    let timestamp = Date.now() / 1000
    let t1=timestamp+6000
    return { SecretId, SecretKey, AppId, token, expired, signature, uuid, timestamp, t1, }
}

const login=async ()=>{
    const l = new TencentLogin()
    return format_k(await l.login())
}

const flush=async ({ uuid, expired, signature, AppId,})=>{
   const l = new TencentLogin()
   let r1= await l.flush({ uuid, expired, signature, AppId,})
   return format_k(r1)
}

module.exports={
    login,
    flush,
}
