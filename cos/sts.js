//https://www.npmjs.com/package/qcloud-cos-sts
// 密钥的权限列表。简单上传和分片需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923


var STS = require('qcloud-cos-sts');

var policy = {
    'version': '2.0',
    'statement': [{
        'action': [
            'name/cos:PutObject',
            'name/cos:PostObject',
            'name/cos:InitiateMultipartUpload',
            'name/cos:ListMultipartUploads',
            'name/cos:ListParts',
            'name/cos:UploadPart',
            'name/cos:CompleteMultipartUpload',
            'name/cos:SliceUploadFile',
            'name/cos:GetObject',
        ],
        'effect': 'allow',
        'principal': {'qcs': ['*']},
        'resource': [
            //'qcs::cos:ap-guangzhou:uid/1250000000:prefix//1250000000/test/dir/*',
        ],
    }],
};

const {
     SecretId='xxxxxxxxxxxxxxxxxxxxxx',
     SecretKey='xxxxxxxxxxxxxxxxxxxxxx',
     Bucket='ttt-1252957949',
     Region='ap-hongkong',
     Prefix="image/",
}=process.env


const CONFIG={
    secretId: SecretId,
    secretKey: SecretKey,
    policy: policy,
    // durationSeconds: 1800,
    // proxy: '',
}

//getCredential
//getPolicy
const {
    promisify_all_child,
}=require("../fp")


const conn=()=>promisify_all_child(STS)
const get_tk=()=>conn()._getCredential(CONFIG)

module.exports={
    conn,
    get_tk,
}
