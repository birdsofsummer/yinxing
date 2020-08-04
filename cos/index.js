var COS = require('cos-nodejs-sdk-v5');
const R=require("ramda")
const {promisify_all}=require("../fp")


const {
     SecretId='xxxxxxxxxxxxxxxxxxxxxx',
     SecretKey='xxxxxxxxxxxxxxxxxxxxxx',
     Bucket='ttt-1252957949',
     Region='ap-hongkong',
     Prefix="image/",
}=process.env

const CONFIG={
    SecretId,
    SecretKey,
    Bucket,
    Region,
    Prefix,
}

var cos =()=>promisify_all( new COS(CONFIG))

const upload=(Key="./cos.md",fn,o={})=>cos().multipartUpload({ ...CONFIG, Key,...o },fn)
const upload1=(Key="./cos.md",o={})=>cos()._multipartUpload({ ...CONFIG, Key, ...o})
const upload_s=( Body={}, Key="/music/list.json", o={})=>cos()._putObject({
    ...CONFIG,
    Key,
    Body:JSON.stringify(Body),
    ...o,
})

const upload_s1=( Body="", Key="/music/list.json",o={})=>cos()._putObject({
    ...CONFIG,
    Key,
    Body,
    ...o,
})


const slice_upload=(FilePath,Key="/music/1.aac",o={})=>cos()._sliceUploadFile({
    ...CONFIG,
    Key,
    FilePath,
    ...o,
    onTaskReady: function(taskId) {                   /* 非必须 */
        console.log(taskId);
    },
    onHashProgress: function (progressData) {       /* 非必须 */
        console.log(FilePath,"->",Key,progressData);
    },
    onProgress: function (progressData) {           /* 非必须 */
        console.log(FilePath,"->",Key,progressData);
    }
})


const list=()=>cos()._getBucket(CONFIG)
const del=(Key="/music/1.aac",o={})=>cos()._deleteObject({ ...CONFIG,Key,...o})


module.exports={
    cos,
    list,
    del,
    slice_upload,
    upload_s,
    upload_s1,
    upload1,
}
