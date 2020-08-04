const superagent=require("superagent")
const R=require("ramda")
const util = require('util');
const crypto = require('crypto');
var fs = require('fs');
var Q = require('q');

const {
    genMd5,
    md5sum,
    md5stream,
    md5file,
    md5blob,
    hash,
}=require("./md5")


const get_token=(
    ak=process.env.baidu_speech_APIKey,
    sk=process.env.baidu_speech_SecretKey,
)=>{
    let {url,method,form}={
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'post',
      form: {
        grant_type: 'client_credentials',
        client_id: ak,
        client_secret: sk,
      }
    }
    return superagent.post(url)
           .send(form)
           .type('form')
}

const fomat_token=(params,token)=>({
            ...params,
            tok:token,
            cuid:genMd5(token),
            ctp:1,
})

const conn=async (
    params={},
    token="",
    path="text2audio",
    module="tsn",
    ak=process.env.baidu_speech_APIKey,
    sk=process.env.baidu_speech_SecretKey,
    h1={
            Host: 'tsn.baidu.com',
            'Content-Type': 'application/x-www-form-urlencoded'
   },
)=>{
    let d={}
    if (!token){
          const {
                    refresh_token,
                    expires_in,
                    session_key,
                    access_token,
                    scope,
                    session_secret
          }=(await get_token(ak,sk)).body
         d=fomat_token(params,access_token)
    }else{
         d=fomat_token(params,token)
    }
      console.log(d)
      let url=`http://${module}.baidu.com/${path}`
      //url='http://tsn.baidu.com/text2audio'
      return superagent.post(url)
                .set(h1)
                .send(d)
                .type('form')
                .responseType('blob')
}

const test=async ()=>{
  let o={
        spd: 3,
        per: 103,
        pit: 6,
        vol: 5,
        tex: '叼',
        lan: 'zh',
  }

  let tk="24.32ec942a04b1cb0d033dfc60c7b9b6a1.2592000.1585563095.282335-18091708"
  let r1=await conn(o,tk)
  fs.writeFileSync('./1.mp3',r1.body)
  let r2=await conn(o)
  fs.writeFileSync('./2.mp3',r2.body)
}

//test()




module.exports={
    get_token,
    conn,
    test,
}
