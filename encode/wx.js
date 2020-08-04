const {sha1}=require('utility')
const R=require('ramda')
const crypto = require('crypto')
const algorithm = 'aes-256-cbc'

const {
    WX_MINI_TOKEN,
    WX_MINI_SECRET = '123',
    WX_MINI_EncodingAESKey,
    WX_MINI_PUSH_URL,
}=process.env

const  encode_id= (id=0,s=WX_MINI_SECRET) =>{
      const encoder = crypto.createCipher(algorithm, s)
      const str = [id, Date.now(), s].join('|')
      let encrypted = encoder.update(str, 'utf8', 'hex')
      encrypted += encoder.final('hex')
      return encrypted
}

const decode_id = (str="",s=WX_MINI_SECRET)=> {
      const decoder = crypto.createDecipher(algorithm, s)
      let decoded = decoder.update(str, 'hex', 'utf8')
      decoded += decoder.final('utf8')
      return decoded.split('|')
}

const encodeErCode=()=>encode(Math.random())

//https://developers.weixin.qq.com/miniprogram/dev/framework/server-ability/message-push.html
const checkSignature=({signature,timestamp,nonce},token=WX_MINI_TOKEN)=>{
    let d=[token, timestamp, nonce]
    d.sort()
    s=d.join(",")
    return sha1(s)==signature
}


module.exports={
   encode_id,
   decode_id,
   encodeErCode,
   checkSignature,
}


