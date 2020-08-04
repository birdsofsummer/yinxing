const crypto = require('crypto');


const moment=require("moment")
const now=()=>Math.floor(moment.now()/1000)
const {randomString}=require('utility')

const{
    PWD_KEY="ccc",
}=process.env


const encode_pwd=(d="",key=PWD_KEY)=>{
    const cipher = crypto.createCipher("aes-256-cbc", key);
    return cipher.update(d.toString(), "utf8", "hex") + cipher.final("hex");
}


const  create_code=(
    d={},
    duration=3,
    len=6,
    src='1234567890',
)=>{
       let code = randomString(len,src)
       let timestamp = now()
       let exp = timestamp + parseInt(duration)*60
       let d1={
           ...d,
           duration,
           code,
           timestamp,
           exp,
       }
       return d1
}

const check_code=(code=null)=> code && code.exp < now()

module.exports={
    create_code,
    encode_pwd,
    check_code,
    now,
}
