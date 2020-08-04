const APIS=[
        'CreateService',        //{Region,serviceName,serviceDesc,protocol}
        'ModifyService',        //{serviceId,Region,serviceName,serviceDesc,protocol}
        'DeleteService',        //{ serviceId, Region, }
        'DescribeService',      //{Region,serviceId}

        'CreateApi', /*
        [{
                  Region:"ap-guangzhou",
                  serviceId: "service-8dsikiq6",
                  apiName: "xx",
                  apiDesc: "xx",
                  apiType: 'NORMAL',
                  authRequired: 'FALSE',
                  enableCORS: 'TRUE' ,
                  serviceType: "apigateway",
                  requestConfig: {path:"/",method:"ANY"},
                  serviceTimeout: 15,
                  responseType: 'HTML',
                  serviceScfFunctionName: "xxx",
                  serviceScfIsIntegratedResponse: 'TRUE',
                  serviceScfFunctionQualifier:'$LATEST',
                  requestParameters : [],
        }]
*/
        'DescribeApi',          //{Region,apiId, serviceId,}
        'DescribeApisStatus',   //{ Region, serviceId, limit: 100 }
        'ModifyApi',            //{apiId:"xxx",...} //同CreateApi
        'DescribeUsagePlanSecretIds', // { Region, usagePlanId: "xxx", limit: 100, offset: 0, }

        'DeleteApi',            //{Region, apiId, serviceId,}

        'DescribeApiUsagePlan', //{ serviceId, Region, apiIds: [] }
        'DescribeUsagePlan',    //{ Region, usagePlanId: "xxx", }
        'CreateUsagePlan',      //{ Region, usagePlanName: '', usagePlanDesc:  '', maxRequestNumPreSec: 10, maxRequestNum:1000, }
        'ModifyUsagePlan',      //{usagePlanId,...}
        'DeleteUsagePlan',      //{ Region, usagePlanId}

        'CreateApiKey',         //{ Region, secretName: "xxx", type: 'auto' }
        'DeleteApiKey',         //{ Region,secretId }
        'DisableApiKey',        //{ Region,secretId }
        'DescribeApiKeysStatus',//{ secretIds: ["x","y"], Region, limit:2 }

        'BindEnvironment',      //{ Region, usagePlanIds: [], serviceId, environment, bindType, apiIds: [] }
        'UnBindEnvironment',    //{ Region, usagePlanIds: [], serviceId, environment, bindType,  apiIds:[] }

        'BindSecretIds',        //{ Region, secretIds=[], usagePlanId, }
        'UnBindSecretIds',      //{ Region, secretIds=[], usagePlanId, }

        'ReleaseService',       //{ Region, serviceId, environmentName, releaseDesc: 'Serverless api-gateway component deploy' }
        'UnReleaseService',     //{ Region, serviceId, environmentName, unReleaseDesc: 'Serverless API-Gateway component offline' }

        'DescribeProject',
        'DescribeInstances',    //{ Region: 'gz',serviceType: 'cvm', method: 'get'  },

        'CreateFunction',       //{scf:{runtime,handler,functionName,memorySize,code}}
        'GetTags',  // {"page":1,"rp":1000}
        'UpdateService',
        'DescribeServicesStatus',
        'DescribeLogSearch', // {StartTime,EndTime,ServiceId,ConText,Limit,Query,Sort}
]

module.exports=APIS
