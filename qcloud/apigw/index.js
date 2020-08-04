const {conn1}=require('../v2')
const APIS=require('./api')
const conn=()=>conn1(APIS)

const insert_or_modify=async ({
      region=Region,
      serviceId=null, // "service-8dsikiq6" id ? modify : create
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
})=>{
    let c=conn1(APIS)

    let i={
      Region: region,
      serviceDesc: description,
      serviceName: serviceName,
      protocol:protocols.join('&').toLowerCase(),
      exclusiveSetName : Region == "ap-beijing" ? 'APIGW_FOR_SCF_SET1' :null,
    }


   // {serviceId,serviceName,serviceDesc,}
   const serviceMsg =serviceId
        ? (await c.ModifyService({  serviceId, ...i }))
        : (await c.CreateService(i)).data

    //serviceId=...
   let i1=endpoints.map(endpoint=>({
              Region: region,
              serviceId: serviceId,
              apiName: apiName,
              apiDesc: endpoint.description,
              apiType: 'NORMAL',
              authRequired: endpoint.auth ? 'TRUE' : 'FALSE',
              enableCORS: endpoint.enableCORS ? 'TRUE' : 'FALSE',
              serviceType: serviceType,
              requestConfig: {path:endpoint.path||"/",method:endpoint.method||"ANY"},
              serviceTimeout: endpoint.serviceTimeout || serviceTimeout,
              responseType: endpoint.responseType || 'HTML',
              serviceScfFunctionName: endpoint.function.functionName || "hello",
              serviceScfIsIntegratedResponse: endpoint.function.isIntegratedResponse ? 'TRUE' : 'FALSE',
              serviceScfFunctionQualifier: endpoint.function.functionQualifier || '$LATEST',
              requestParameters : endpoint.param ||[],
    }))

    //create_or_modify(i1)
    //let r=await c.CreateApi(i1)
    //await c.ModifyApi({apiId, ...apiInputs })

//    return {
//      protocols,
//      subDomain,
//      environment,
//      region,
//      serviceId,
//      apis: outputs
//    }
}

module.exports={
   conn,
   insert_or_modify,
}
