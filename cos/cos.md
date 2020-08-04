```javascript

const test=async ()=>{
    const {promisify_all}=require("../fp")
    const cos_cfg={
        SecretId: 'xxxxxxxxxxxxxxxxxxxxxx',
        SecretKey: 'xxxxxxxxxxxxxxxxxxxxxx',
        Bucket: 'ttt-1252957949',
        Region: 'ap-hongkong',
        Prefix: 'music/',
    }
    var COS = require('cos-nodejs-sdk-v5');
    var cos=promisify_all( new COS(cos_cfg))


    const upload=(Key="./cos.js",fn)=>cos.multipartUpload({ ...cos_cfg, Key, },fn)
    const upload1=(Key="./cos.js")=>cos._multipartUpload({ ...cos_cfg, Key, })
    const list=()=>cos._getBucket(cos_cfg)
    //https://cloud.tencent.com/document/product/436/36119#.E7.AE.80.E5.8D.95.E4.B8.8A.E4.BC.A0.E5.AF.B9.E8.B1.A1
     let c=cos
     let r
     r=await c._abortUploadTask()
     r=await c._deleteBucket()
     r=await c._deleteBucketCORS()
     r=await c._deleteBucketCors()
     r=await c._deleteBucketLifecycle()
     r=await c._deleteBucketPolicy()
     r=await c._deleteBucketReplication()
     r=await c._deleteBucketTagging()
     r=await c._deleteMultipleObject()
     r=await c._deleteObject()
     r=await c._getAuth()
     r=await c._getBucket()
     r=await c._getBucketACL()
     r=await c._getBucketAcl()
     r=await c._getBucketCORS()
     r=await c._getBucketCors()
     r=await c._getBucketLifecycle()
     r=await c._getBucketLocation()
     r=await c._getBucketPolicy()
     r=await c._getBucketReplication()
     r=await c._getBucketTagging()
     r=await c._getBucketVersioning()
     r=await c._getObject()
     r=await c._getObjectACL()
     r=await c._getObjectAcl()
     r=await c._getObjectUrl()
     r=await c._getService()
     r=await c._getV4Auth()
     r=await c._headBucket()
     r=await c._headObject()
     r=await c._listObjectVersions()
     r=await c._multipartAbort()
     r=await c._multipartComplete()
     r=await c._multipartInit()
     r=await c._multipartList()
     r=await c._multipartListPart()
     r=await c._multipartUpload()
     r=await c._optionsObject()
     r=await c._putBucket()
     r=await c._putBucketACL()
     r=await c._putBucketAcl()
     r=await c._putBucketCORS()
     r=await c._putBucketCors()
     r=await c._putBucketLifecycle()
     r=await c._putBucketPolicy()
     r=await c._putBucketReplication()
     r=await c._putBucketTagging()
     r=await c._putBucketVersioning()
     r=await c._putObject()
     r=await c._putObjectACL()
     r=await c._putObjectAcl()
     r=await c._putObjectCopy()
     r=await c._restoreObject()
     r=await c._sliceCopyFile()
     r=await c._sliceUploadFile()
     r=await c._uploadFiles()
     r=await c._uploadPartCopy()
}

module.exports={
    cos,
    upload1,
    list,
}
```
