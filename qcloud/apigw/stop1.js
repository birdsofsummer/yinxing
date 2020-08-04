const {conn1}=require('../v2')
const APIS=require('./api')

const Region="ap-guangzhou"
const conn=()=>conn1(APIS,{...process.env,Region,})
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

const c=conn()
const list=async ()=>{
    d={"offset":0,"limit":100}
    r=await c.DescribeServicesStatus(d)
    console.log(r)
    return r
}

const limit=async ({serviceId,environmentName,strategy,apiIds})=>{
    d={serviceId,environmentName,strategy,apiIds}
    r = await c.ModifyApiEnvironmentStrategy(d)
    console.log(r)
}

const unrelease=async ({ serviceId, environmentName, }={})=>{
    d1={serviceId,environmentName}
    r1=await c.UnReleaseService(d1)
    console.log(r1)
}

const release=async ({ serviceId, environmentName, versionName, })=>{
    d={serviceId, environmentName, versionName,}
    r=await c.UpdateService(d)
    console.log(r)
}






if (process.argv.length >2 ){
    console.log('zzzzzzzzzzzzzz')
    para(release,Service)
}else{
    console.log('bye')
    para(unrelease,Service)
}
