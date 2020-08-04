const utility=require('utility')
const moment=require("moment")
const qcloud=require('../index')
const {conn1}=require('../v2')
const APIS=require('./api')

const Region="ap-guangzhou"
const conn=()=>conn1(APIS,{...process.env,Region,})
const get_ip=(t="sourceIp: '117.172.26.96'")=>{
    let ip=/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
   return t.match(/sourceIp: .*,/)[0].match(ip)[0]
}

const count=R.pipe(R.groupBy(x=>x),R.map(x=>x.length),R.toPairs,R.sort(R.descend(R.prop(1))),R.fromPairs)

const para=(f,d=[])=>Promise.all(d.map(f))

const Service=[
    {
        "serviceId":"service-n9zsbooc", //qq
        "environmentName":"release",
        "strategy":0, // 0qps
        "apiIds":["api-7obu2ohs"],
        "versionName":"2020012711595671bfeada-0185-457e-95d3-44a66ebc2c38",
    },
    {
        "serviceId":"service-0gg71fu4", //dxy
        "environmentName":"release",
        "strategy":0, // 0qps
        "apiIds":["api-1fsru136"],
        "versionName":"202001261603538553588f-9ceb-46f6-a23b-b036c269b912",
    },
    {
        serviceId:"service-nxxl1y2s",  //baidu
        environmentName:"release",
        "strategy":0, // 0qps
        "apiIds": ["api-ndagz86c"],
        "versionName": "202001261737250bb4fc6a-646a-41b4-92fb-3b8d8b10c003",
    },
]

// api网关日志
const find1=async (d={
  "StartTime": "2020-02-18 20:51:06",
  "EndTime":"2020-02-18 21:51:06",
  "ServiceId": "service-0gg71fu4",
  "ConText": "",
  "Limit": 20,
  "Query": "",
  "Sort": "desc",
  "Version":"2018-08-08",
})=>{
   const c=conn()
   r=await c.DescribeLogSearch(d)
   console.log(r)
/*
{
  code: 6100,
  message: '本版本内不支持的接口或者接口已经被废弃，请参考该接口的文档。',
  codeDesc: 'ActionNotFound'
}
*/

}

// 云函数日志
const find2=async (d={
    "Version": "2018-04-16",
    "Region": "ap-guangzhou",
    "FunctionName": "dingxiangyuan",
    "Qualifier": "$LATEST",
    "Namespace": "wuhan", //"default"
    "Offset": 0,
    "Limit": 20
})=>{

    const scf=qcloud({...process.env,Region:"ap-guangzhou",serviceType:'scf'})
    r=await scf._GetFunctionLogs(d)
    //console.log(r)
    await utility.writeJSON('json/log.json',r)
    console.log('done!')
    ips=r.Data.map(x=>get_ip(x.Log))
    console.log(ips)
    z=count(ips)
    console.log(z)
    z1={
      '171.83.11.155': 5,
      '113.142.72.204': 3,
      '117.172.26.96': 2,
      '111.85.49.149': 2,
      '113.246.241.200': 2,
      '183.195.36.68': 1,
      '112.74.177.103': 1,
      '221.181.128.253': 1,
      '115.211.116.77': 1,
      '120.78.228.217': 1,
      '113.222.16.225': 1
    }
}

/*
    {
     TotalCount: 71,
     Data: [
         {
          FunctionName:"echo",
          RetMsg:"{}", // body
          RequestId:'f758ff45bb228cbdbf7eb5671a707a74',
          StartTime:'2020-02-18 19:41:45',
          RetCode:0,
          "InvokeFinished": 1,
          "Duration": 1,
          "BillDuration": 1,
          "MemUsage": 22052864,
           Log:"", //日志
          "Level": "",
          "Source": "",
         }
     ],
     SearchContext: LogSearchContext { Offset: '', Limit: 0, Keyword: '', Type: '' },
     RequestId: 'ab1b7ae9-dd6e-4721-8361-3e5e82a242ca',
    }
*/

