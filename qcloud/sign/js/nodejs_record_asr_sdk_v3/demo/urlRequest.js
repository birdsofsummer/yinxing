//将require中路径替换为项目中SDK的真实路径
const tencentcloud = require("../../nodejs_record_asr_sdk_v3");

// 导入对应产品模块的client models以及需要用到的模块
const AsrClient = tencentcloud.asr.v20190614.Client;
const models = tencentcloud.asr.v20190614.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

// Your SecretId、Your SecretKey 需要替换成客户自己的账号信息
let cred = new Credential("Your SecretId", "Your SecretKey");

let httpProfile = new HttpProfile();
httpProfile.reqMethod = "POST";
httpProfile.reqTimeout = 30;
httpProfile.endpoint = "asr.tencentcloudapi.com";

let clientProfile = new ClientProfile();
clientProfile.httpProfile = httpProfile;
clientProfile.signMethod = "TC3-HMAC-SHA256";
// 实例化要请求产品(asr)的client对象
let client = new AsrClient(cred, "", clientProfile);

//通过语音URL方式调用 

// 实例化一个请求对象
let req = new models.CreateRecTaskRequest();
// 设置接口需要的参数，参考 接入须知 中 [请求接口说明]
req.EngineModelType = '16k_0';
req.ChannelNum = 1;
req.ResTextFormat = 0;
req.SourceType = 0;
req.Url = 'https://ruskin-1256085166.cos.ap-guangzhou.myqcloud.com/test.wav';

// 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
client.CreateRecTask(req, function(errMsg, response) {
    if (errMsg) {
        console.log(errMsg);
        return;
    }

    console.log(response.to_json_string());
});