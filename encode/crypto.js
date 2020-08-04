const crypto = require('crypto')
const algorithm = 'aes-256-cbc'

const {
    WX_MINI_SECRET = '123'
}=process.env

const  encode= (id=0,s=WX_MINI_SECRET) =>{
      const encoder = crypto.createCipher(algorithm, s)
      const str = [id, Date.now(), s].join('|')
      let encrypted = encoder.update(str, 'utf8', 'hex')
      encrypted += encoder.final('hex')
      return encrypted
}


const decode = (str="",s=WX_MINI_SECRET)=> {
      const decoder = crypto.createDecipher(algorithm, s)
      let decoded = decoder.update(str, 'hex', 'utf8')
      decoded += decoder.final('utf8')
      return decoded.split('|')
}

const encodeErCode=()=>encode(Math.random())

module.exports={
   encode,
   decode,
   encodeErCode,
}
