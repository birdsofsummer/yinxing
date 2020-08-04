const conn=require("../../qcloud")

const config={
    ...process.env,
    Region:"ap-shanghai",
    serviceType:"scf",
}
const c=conn(config)

d={
    "Action": "CreateFunction",
    "Version": "2018-04-16",
    "Region": "ap-guangzhou",
    "Type": "Service",
    "FunctionName": "echo",
    "MemorySize": 128,
    "Namespace": "default",
    "Handler": "index.js",
    "Runtime": "Nodejs8.9",
    "Description": "",
    "InstallDependency": "FALSE",
    "UseGpu": "FALSE",
    "Code": {
      "CosBucketName": "sh-test",
      "CosObjectName": "/1.zip",
      "CosBucketRegion": "ap-shanghai"
    }
  }

const main=async()=>{
    d2=await c._CreateFunction(d) //
    //{ RequestId: '7cc102d5-3d2e-4673-ac58-17a69ebcbc3a' }
    d1=await c._ListFunctions()
    console.log(d1)
    /*
    {
      "Functions": [
        {
          "ModTime": "2020-02-17 16:40:04",
          "AddTime": "2020-02-17 16:40:04",
          "Runtime": "Nodejs8.9",
          "FunctionName": "echo",
          "FunctionId": "svc-blpiyu34",
          "Namespace": "default",
          "Status": "CreateFailed",
          "StatusDesc": "CreateAbnormal",
          "Description": "",
          "Tags": [],
          "Type": "Service"
        }
      ],
      "TotalCount": 1,
      "RequestId": "2368d425-2c25-46a5-a980-775227f1f5b2"
    }
    */
}

main()
