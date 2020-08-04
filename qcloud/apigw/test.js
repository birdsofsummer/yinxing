const utility=require('utility')
const R=require('ramda')

const {
   conn,
   insert_or_modify,
}=require("./index")


/*
test_insert_service
{
  code: 0,
  message: '',
  codeDesc: 'Success',
  data: {
    createdTime: '2020-02-11 22:51:55',
    serviceName: 'hello',
    subDomain: 'service-3es5s73i-1252957949.gz.apigw.tencentcs.com',
    serviceId: 'service-3es5s73i',
    serviceDesc: 'hello'
  }
}
*/

c=conn()
Region="ap-guangzhou"

s={
      Region,
      serviceDesc: "hello",
      serviceName: "hello",
      protocol:["https"].join('&').toLowerCase(),
}

test_service=async ()=>{
    d=await c.CreateService(s)

    let {createdTime,serviceName,subDomain,serviceId,serviceDesc}=d.data

    console.log(serviceId)
    s1={...s,serviceDesc:"cc",serviceId}

    r2=await c.ModifyService(s1)
    //{code,message,codeDesc,serviceId,serviceName,serviceDesc,protocol,modifiedTime}

    r1=await c.DescribeService({Region,serviceId})
    //{code,message,codeDesc,serviceId,serviceName,serviceDesc,subDomain,protocol,createdTime,modifiedTime,availableEnvironments,exclusiveSetName}
    r3=await c.DeleteService({Region,serviceId})

    utility.writeJSON('json/service/insert.json',d)
    utility.writeJSON('json/service/find.json',r1)
    utility.writeJSON('json/service/update.json',r2)
    utility.writeJSON('json/service/remove.json',r3)
    console.log('done')
}

test_api=async ()=>{
    serviceId="service-bs3gnrke"
    apiName="user"
    endpoints=[
        {
          //apiId :"xxx",
          path: '/',
          description:"",
          method: 'ANY', // GET|POST|PUT|DELETE|HEAD|ANY
          enableCORS:true,
          //apiId: "api-id",
          //responseType: "HTML",
          serviceTimeout: 20,
          //"param":[],
          function:
          {
            isIntegratedResponse: true, // 集成响应?
            functionName: "hello",
            functionQualifier: '$LATEST',
          }
        }
    ]

    i1=endpoints.map(endpoint=>({
                  Region:"ap-guangzhou",
                  serviceId: serviceId,
                  apiName: apiName,
                  apiDesc: endpoint.description,
                  apiType: 'NORMAL',
                  authRequired: endpoint.auth ? 'TRUE' : 'FALSE',
                  enableCORS: endpoint.enableCORS ? 'TRUE' : 'FALSE',
                  serviceType: "SCF",
                  requestConfig: {path:endpoint.path||"/",method:endpoint.method||"ANY"},
                  serviceTimeout: endpoint.serviceTimeout || serviceTimeout,
                  responseType: endpoint.responseType || 'HTML',
                  serviceScfFunctionName: endpoint.function.functionName || "hello",
                  serviceScfIsIntegratedResponse: endpoint.function.isIntegratedResponse ? 'TRUE' : 'FALSE',
                  serviceScfFunctionQualifier: endpoint.function.functionQualifier || '$LATEST',
                  requestParameters : endpoint.param ||[],
                  tags:['x','y'],
     }))
    //r=await Promise.all(i.map(c.CreateApi))
    r=await c.CreateApi(i1[0])
    //{code,message,codeDesc,apiId,path,method,createdTime}
    apiId=r.apiId
    i2={...i1[0],apiName:"tt",apiId:r.apiId}
    r1=await c.ModifyApi(i2)
    //{ code: 0, message: '', codeDesc: 'Success' }
    r2=await c.DescribeApi({Region:"ap-guangzhou",apiId,serviceId,})
    //{code,message,codeDesc,serviceId,serviceName,serviceDesc,apiId,apiName,apiDesc,createdTime,modifiedTime,requestConfig,requestParameters,serviceType,serviceTimeout,authRequired,enableCORS,protocol,isDebugAfterCharge,serviceScfFunctionName,serviceScfIsIntegratedResponse,serviceScfFunctionNamespace,serviceScfFunctionQualifier,responseType,responseSuccessExample,responseFailExample,responseErrorCodes,authType,apiBuniessType,authRelationApiId,tags}


}



test_api1=async ()=>{
    a={
          region=Region,
          serviceId=serviceId, // "service-8dsikiq6" id ? modify : create
          serviceName="serverless",
          description="",
          apiName="user",
          protocols=[
             // "http",
              "https"
          ],
          //auth={ serviceTimeout:15, secretName :"c" ,secretIds :["abc"] },
          //usagePlan={ "usagePlanId": "xx", "usagePlanName": "xxx", "usagePlanDesc": "xxx", "maxRequestNum": 1, "maxRequestNumPreSec": 1000 },
          environment="release", // prepub|test|release
          endpoints=[
            {
              //apiId :"xxx",
              path: '/',
              description:"",
              method: 'ANY', // GET|POST|PUT|DELETE|HEAD|ANY
              enableCORS:true,
              //apiId: "api-id",
              //responseType: "HTML",
              serviceTimeout: 20,
              //"param":[],
              function:
              {
                isIntegratedResponse: true, // 集成响应?
                functionName: "hello",
                functionQualifier: '$LATEST',
              }
            }
        ],
    }

}
