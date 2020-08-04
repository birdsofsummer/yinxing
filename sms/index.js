/*
 *
../../node_modules/_qcloudsms_js@0.1.1@qcloudsms_js/lib/sms.js
https://cloud.tencent.com/document/product/382/3772
https://cloud.tencent.com/document/product/382/36136#Template
https://cloud.tencent.com/document/product/382/5976
https://cloud.tencent.com/document/product/382/5807

params=["1234","10"]
sms_content="{1}为您的登录验证码，请于{2}分钟内填写。如非本人操作，请忽略本短信。"

{
    SmsSingleSender,
    SmsMultiSender,
    SmsStatusPuller,
    SmsMobileStatusPuller,
    SmsVoicePromptSender,
    PromptVoiceSender,
    SmsVoiceVerifyCodeSender,
    CodeVoiceSender,
    TtsVoiceSender,
    VoiceFileUploader,
    FileVoiceSender,
}

去掉回调,改造成

{
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
}

*/

const moment=require('moment')
const QcloudSms = require("qcloudsms_js");
const {
    sms_test_phone, //测试机
    sms_AppID,
    sms_AppKey,
    sms_Sign,
    sms_templateId,
}=process.env


const {get_fn_child_key}=require("../fp")

const conn=(id=sms_AppID, key=sms_AppKey)=>{
    let q=QcloudSms(id,key);
    let arr=get_fn_child_key(q)
    let g={}
    for (let a of  arr){
        let b=q[a]()
        for (let i in b.__proto__){
            g[a+"_"+ i] =((...d)=>new Promise((f1,f2)=>b[i](...d,(...z)=>f1(z)))).bind(b)
        }
    }
    return g
}

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
}=conn()

const send=async (
    phoneNumber=sms_test_phone,
    params = ["5678","3"],
    template=sms_templateId,
)=>{

    let p1=params.map(x=>x.toString())
    let d=["86", phoneNumber, template, p1, sms_Sign, "", "",]
    let r=await SmsSingleSender_sendWithParam(...d)
    return r
}

/*
{
  result: 0,
  errmsg: 'OK',
  ext: '',
  sid: '8:0dhbbXeAf1DnL9966X120191215',
  fee: 1
}
*/

const sends=async (
    phoneNumbers=[sms_test_phone],
    params = ["1234","3"],
    template=sms_templateId,
)=>{
    let d=["86", phoneNumbers, template, params, sms_Sign, "", "",]
    //var msender = qcloudsms.SmsMultiSender();
    //msender.sendWithParam(...d,callback)
    let r=await SmsMultiSender_sendWithParam( ...d);
    // [undefined,res,data]
    return r
}

/*
 *
{
  result: 0,
  errmsg: 'OK',
  ext: '',
  detail: [
    {
      result: 0,
      errmsg: 'OK',
      mobile: '18576690127',
      nationcode: '86',
      sid: '8:GypVA9VVQ1EMky7UDP120191215',
      fee: 1
    }
  ]
}

*/

const get_reply=async (
    maxNum = 10,
)=>{
/*
      qcloudsms= QcloudSms(sms_AppID,sms_AppKey)
      var spuller = qcloudsms.SmsStatusPuller();
      spuller.pullCallback(maxNum,callback);
      spuller.pullReply(maxNum, callback);
*/
    let r1=await SmsStatusPuller_pullReply(maxNum)
    let r2=await SmsStatusPuller_pullCallback(maxNum)
    return [r1,r2].map(x=>x[2])
}

const get_reply1=async (
    phoneNumbers=[sms_test_phone],
    beginTime = 1511125600,
    endTime = moment.now(),
    maxNum = 10,
)=>{
    // var mspuller = qcloudsms.SmsMobileStatusPuller();
    // mspuller.pullCallback( callback);
    // mspuller.pullReply
    let d=["86", phoneNumbers, beginTime, endTime, maxNum,]
    let r1=await SmsMobileStatusPuller_pullCallback(...d)
    let r2=await SmsMobileStatusPuller_pullReply(...d);
    // [,,{ result: 0, errmsg: 'ok', count: 0, data: [] }]
    return [r1,r2].map(x=>x[2])
}

module.exports={
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
}
