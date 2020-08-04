const fs = require('mz/fs')
const R=require('ramda')
const {any_nil,merge_o}=require('../fp')
const {create_code}=require('../encode/captcha')


const {
    SmsSingleSender_send,
    SmsSingleSender_sendWithParam,
    SmsMultiSender_send,
    SmsMultiSender_sendWithParam,
    SmsStatusPuller__pull,
    SmsStatusPuller_pullCallback,
    SmsStatusPuller_pullReply,
    SmsMobileStatusPuller__pull,
    SmsMobileStatusPuller_pullCallback,
    SmsMobileStatusPuller_pullReply,
    SmsVoicePromptSender_send,
    PromptVoiceSender_send,
    SmsVoiceVerifyCodeSender_send,
    CodeVoiceSender_send,
    TtsVoiceSender_send,
    VoiceFileUploader_upload,
    FileVoiceSender_send,
    send,
    sends,
    get_reply,
    get_reply1,
}=require("../sms")

const {
    DB="test",
    TABLE="sms",
}=process.env

const send_sms=async (c,n)=>{
   let {phone}=c.params
   if (!phone){
       c.error_400("miss phone")
   }else{
       let t=c.dbs.dbs[DB].collection(TABLE)
       let d=c.req_query || {}
       let duration="3"
       let d1=create_code({phone},duration) //ip?
       let {code}=d1
       let r1=await t.insertOne(d1)
       let r2=await send(phone,[code,duration])
       c.json(merge_o(d1,r1,r2))
   }
}

const verify_sms=async (c,n)=>{
   let {phone,code,timestamp,exp}=c.params
   let p=any_nil([phone,code,timestamp,exp])
   if (p){
       c.error_400("miss phone/code/timestamp/exp")
   }else if(exp <= now()){
       c.error_400("exp")
   }else{
       let d={phone,exp,code,timestamp}
       let t=c.dbs.dbs[DB].collection(TABLE)
       let r1=await t.find(d).toArray()
       let valid= !R.isEmpty(r1)
       valid ? c.json({valid:true}) : c.error_400("exp")
  }
}

module.exports={
    send_sms,
    verify_sms,
}
