const moment=require('moment')
const QcloudSms = require("qcloudsms_js");
const {
    sms_test_phone, //测试机
    sms_AppID,
    sms_AppKey,
    sms_Sign,
    sms_templateId,
}=process.env

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
}=require('./index')


test_send=async ()=>{
    let params=["1234","3"]
    let d=["86",sms_test_phone,sms_templateId,params,sms_Sign+"test", "", "", ]
    const [err, res, resData]=await SmsSingleSender_sendWithParam(...d)
    console.log(resData)
}

test_send1=async ()=>{
    let params=["1234","3"]
    let d=["86", [sms_test_phone], sms_templateId, params, sms_Sign+"test", "", "",]
    let r=await SmsMultiSender_sendWithParam(...d)
    console.log(r[2])
}

test1=async ()=>{
    let p=["5678","3"]
    r1=await send(sms_test_phone,p)
    r2=await sends([sms_test_phone],p)
    console.log(r1[2])
    console.log(r2[2])
}


cb_test=(phone=sms_test_phone,p=["5678","3"])=>{
    qcloudsms = QcloudSms(sms_AppID,sms_AppKey)
    b=qcloudsms.SmsSingleSender()
    d=["86",phone,sms_templateId,p,sms_Sign, "", "", ]
    b.sendWithParam(...d,callback)
    //[undefined,]
}
/*
push result
POST http://example.com/sms/callback

[
    {
        "user_receive_time": "2015-10-17 08:03:04",
        "nationcode": "86",
        "mobile": "13xxxxxxxxx",
        "report_status": "SUCCESS",
        "errmsg": "DELIVRD",
        "description": "用户短信送达成功",
        "sid": "xxxxxxx"
    }
]

{
    "result": 0,
    "errmsg": "OK"
}

*/

