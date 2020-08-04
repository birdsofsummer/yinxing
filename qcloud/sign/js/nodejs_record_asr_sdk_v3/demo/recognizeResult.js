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

//调用录音识别结果查询接口
let reqResult = new models.DescribeTaskStatusRequest();
//reqResult.TaskId为创建识别任务时response里的TaskId字段
//示例TaskId不可用，需要客户替换成可用TaskId
reqResult.TaskId = 080387961;

client.DescribeTaskStatus(reqResult, function(errMsg, response) {
    if (errMsg) {
        console.log(errMsg);
        return;
    }

    console.log(response.to_json_string());
});