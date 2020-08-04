const {conn1}=require('../v2')
const APIS=require('./api')
const conn=()=>conn1(APIS)

ServiceId="service-0gg71fu4"
Region="ap-gongzhou"
ServiceId="service-nxxl1y2s"



show=async ()=>{
    c=conn()


    //list
    ss={"ServiceId":"service-nxxl1y2s"}
    ss1=await c.DescribeService(ss)
  //  ss2={"data":{"Response":{"ServiceId":"service-nxxl1y2s","AvailableEnvironments":["release"],"ServiceName":"baidu","ServiceDesc":null,"Protocol":"http&https","CreatedTime":"2020-01-26T09:40:02Z","ModifiedTime":"2020-02-15T18:21:44Z","ExclusiveSetName":"","IpVersion":"IPv4","userType":"","NetTypes":["OUTER"],"InternalSubDomain":"","OuterSubDomain":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com","InnerHttpPort":0,"InnerHttpsPort":0,"SetId":11,"AdminInfo":null,"ApiTotalCount":1,"ApiIdStatusSet":[{"ServiceId":"service-nxxl1y2s","ApiId":"api-ndagz86c","ApiDesc":"","Path":"/newpneumonia","Method":"ANY","CreatedTime":"2020-01-26T09:40:04Z","ModifiedTime":"2020-01-26T09:40:04Z","ApiName":"newpneumonia","UniqVpcId":"","ApiType":"NORMAL","Protocol":"HTTP","IsDebugAfterCharge":"FALSE","AuthType":"NONE","ApiBuniessType":"NORMAL","AuthRelationApiId":"","OauthConfig":null,"TokenLocation":null,"RelationBuniessApiIds":null}],"UsagePlanTotalCount":1,"UsagePlanList":[{"Environment":"release","UsagePlanId":"usagePlan-ds5ooe25","UsagePlanName":"anti","UsagePlanDesc":"","MaxRequestNumPreSec":1,"CreatedTime":"2020-02-06T06:38:33Z","ModifiedTime":"2020-02-15T23:04:54Z"}],"RequestId":"2f7ed438-11e6-4288-a800-b55fbbdcedf0"}},"code":0}


    bb={"offset":0,"limit":20,"serviceId":"service-nxxl1y2s"}
    bb1=await c.DescribeServiceReleaseVersion(bb)
 //   bb2={"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"versionList":[{"environments":["release"],"versionDesc":"由无服务器云函数平台自动发布","createTime":"2020-01-26 17:40:04","versionName":"202001261737250bb4fc6a-646a-41b4-92fb-3b8d8b10c003"}]},"message":"","code":0}


    hj={"serviceId":"service-nxxl1y2s"}
    hj1=await c.DescribeServiceEnvironmentKeyMonitorUpload(hj)
   //hj2={"data":{"code":0,"message":"","codeDesc":"Success","environmentList":[{"environmentName":"prepub","isUpdate":"FALSE"},{"environmentName":"release","isUpdate":"FALSE"},{"environmentName":"test","isUpdate":"FALSE"}]},"message":"","code":0}



    se={"serviceId":"service-nxxl1y2s"}
    se1=await c.DescribeServiceEnvironmentList(se)
    se2={"data":{"code":0,"message":"","codeDesc":"Success","totalCount":3,"environmentList":[{"url":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release","environmentName":"release","status":1,"versionName":"202001261737250bb4fc6a-646a-41b4-92fb-3b8d8b10c003"},{"url":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/test","environmentName":"test","status":0,"versionName":""},{"url":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/prepub","environmentName":"prepub","status":0,"versionName":""}]},"message":"","code":0}


    //list api

    s={"offset":0,"limit":20,"serviceId":"service-nxxl1y2s","apiType":"normal","tags":[]}
    s1=await c.DescribeApisStatus(s)
   // s2={"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"apiIdStatusSet":[{"authType":"NONE","vpcId":-1,"protocol":"HTTP","uniqVpcId":"","modifiedTime":"2020-01-26 17:40:04","tags":[],"apiId":"api-ndagz86c","apiDesc":null,"apiType":"NORMAL","authRequired":"FALSE","serviceId":"service-nxxl1y2s","apiBuniessType":"NORMAL","apiName":"newpneumonia","createdTime":"2020-01-26 17:40:04","path":"/newpneumonia","isDebugAfterCharge":"FALSE","authRelationApiId":"","method":"ANY"}]},"message":"","code":0}


    a={"apiId":"api-ndagz86c","serviceId":"service-nxxl1y2s"}
    a1=await c.DescribeApi(a)
   // a2={"data":{"code":0,"message":"","codeDesc":"Success","serviceId":"service-nxxl1y2s","serviceName":"baidu","serviceDesc":null,"apiId":"api-ndagz86c","apiName":"newpneumonia","apiDesc":null,"createdTime":"2020-01-26 17:40:04","modifiedTime":"2020-01-26 17:40:04","requestConfig":{"path":"/newpneumonia","method":"ANY"},"requestParameters":[],"serviceType":"SCF","serviceTimeout":15,"authRequired":"FALSE","enableCORS":"FALSE","protocol":"HTTP","isDebugAfterCharge":"FALSE","serviceScfFunctionName":"newpneumonia","serviceScfIsIntegratedResponse":"TRUE","serviceScfFunctionNamespace":"wuhan","serviceScfFunctionQualifier":"$LATEST","responseType":"","responseSuccessExample":"","responseFailExample":"","responseErrorCodes":[],"authType":"NONE","apiBuniessType":"NORMAL","authRelationApiId":"","tags":[]},"message":"","code":0}


    p1={"offset":0,"limit":20,"serviceId":"service-nxxl1y2s"}
    p2=await c.DescribeApiUsagePlan(p1)
    p3={"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"usagePlanList":[{"maxRequestNumPreSec":1,"usagePlanId":"usagePlan-ds5ooe25","modifiedTime":"2020-02-16 07:04:54","usagePlanDesc":"","inUseRequestNum":0,"maxRequestNum":1,"environment":"release","createdTime":"2020-02-06 14:38:33","usagePlanName":"anti"}]},"message":"","code":0}

    DescribeApisStatus
}

stop=async({
    serviceId="service-nxxl1y2s",
    environmentName="release",
}={})=>{

    c=conn()
    d1={serviceId,environmentName}
    d2={serviceId}

    r1=await c.UnReleaseService(d1)
    //{"data":{"code":0,"message":"","codeDesc":"Success","unReleaseDesc":null},"message":"","code":0}
    r2=await c.DescribeService(d2)
    //{"data":{"code":0,"message":"","codeDesc":"Success","totalCount":3,"environmentList":[{"url":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release","environmentName":"release","status":0,"versionName":""},{"url":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/test","environmentName":"test","status":0,"versionName":""},{"url":"service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/prepub","environmentName":"prepub","status":0,"versionName":""}]},"message":"","code":0}

}

limit=async ({serviceId="service-bs3gnrke"})=>{
    s=await c.DescribeIPStrategysStatus({serviceId})
    //s1={"data":{"code":0,"message":"","codeDesc":"Success","totalCount":0,"IPStrategyStatusSet":[]},"message":"","code":0}

    se=await c.DescribeServiceEnvironmentList({serviceId})
    //se1={"data":{"code":0,"message":"","codeDesc":"Success","totalCount":3,"environmentList":[{"url":"service-bs3gnrke-1252957949.gz.apigw.tencentcs.com/test","environmentName":"test","status":0,"versionName":""},{"url":"service-bs3gnrke-1252957949.gz.apigw.tencentcs.com/prepub","environmentName":"prepub","status":0,"versionName":""},{"url":"service-bs3gnrke-1252957949.gz.apigw.tencentcs.com/release","environmentName":"release","status":0,"versionName":""}]},"message":"","code":0}

    d={"IPStrategyData":"0.0.0.0/24","IPStrategyName":"test","IPStrategyType":"BLACK","serviceId":"service-bs3gnrke"}
    r=await CreateIPStrategy(d)
    IPStrategyId=r1.IPStrategyId

    // {"data":{"code":0,"message":"","codeDesc":"Success","IPStrategyId":"IPStrategy-dsdgb4fk"},"message":"","code":0}
    r1=await c.DescribeIPStrategysStatus({serviceId})
    // {"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"IPStrategyStatusSet":[{"IPStrategyId":"IPStrategy-dsdgb4fk","IPStrategyData":"0.0.0.0/24","modifiedTime":"2020-02-16 20:13:27","IPStrategyType":"BLACK","createdTime":"2020-02-16 20:13:27","IPStrategyName":"test"}]},"message":"","code":0}
    d1={"serviceId":"service-bs3gnrke","IPStrategyId":"IPStrategy-dsdgb4fk"}
    r2=await c.DescribeIPStrategy(d1)
    //{"data":{"code":0,"message":"","codeDesc":"Success","IPStrategyName":"test","IPStrategyType":"BLACK","IPStrategyData":"0.0.0.0/24","createdTime":"2020-02-16 20:13:27","modifiedTime":"2020-02-16 20:13:27","totalCount":0,"bindApis":[]},"message":"","code":0}

    // release | prepub | test
    d2={"serviceId":"service-bs3gnrke","IPStrategyId":"IPStrategy-dsdgb4fk","environmentName":"release","offset":0,"limit":20}
    r2=await c.DescribeIPStrategy(d2)
    //{"data":{"code":0,"message":"","codeDesc":"Success","IPStrategyName":"test","IPStrategyType":"BLACK","IPStrategyData":"0.0.0.0/24","createdTime":"2020-02-16 20:13:27","modifiedTime":"2020-02-16 20:13:27","totalCount":0,"bindApis":[]},"message":"","code":0}


   //list bind
    d3={"IPStrategyId":"IPStrategy-dsdgb4fk","environmentName":"release","regionId":1,"serviceId":"service-bs3gnrke"}
    r3=await c.DescribeIPStrategyApisStatus(d3)
    //{"data":{"code":0,"message":"","codeDesc":"Success","totalCount":0,"apiIdStatusSet":[]},"message":"","code":0}


/*
    DescribeService
    DescribeApiEnvironmentStrategy
    DescribeServiceEnvironmentStrategy
    ModifyApiEnvironmentStrategy
    DescribeApiEnvironmentStrategy
    ModifyApiEnvironmentStrategy
    DescribeApiEnvironmentStrategy
*/


    DescribeService({"Version":"2018-08-08","ServiceId":"service-qf7o2c4u"})
    //{"data":{"Response":{"ServiceId":"service-qf7o2c4u","AvailableEnvironments":["release"],"ServiceName":"bmap","ServiceDesc":null,"Protocol":"http&https","CreatedTime":"2020-01-28T14:14:43Z","ModifiedTime":"2020-02-15T18:21:44Z","ExclusiveSetName":"","IpVersion":"IPv4","userType":"","NetTypes":["OUTER"],"InternalSubDomain":"","OuterSubDomain":"service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com","InnerHttpPort":0,"InnerHttpsPort":0,"SetId":11,"AdminInfo":null,"ApiTotalCount":1,"ApiIdStatusSet":[{"ServiceId":"service-qf7o2c4u","ApiId":"api-1fsru136","ApiDesc":"","Path":"/bmap","Method":"ANY","CreatedTime":"2020-01-28T14:14:44Z","ModifiedTime":"2020-01-28T14:14:44Z","ApiName":"bmap","UniqVpcId":"","ApiType":"NORMAL","Protocol":"HTTP","IsDebugAfterCharge":"FALSE","AuthType":"NONE","ApiBuniessType":"NORMAL","AuthRelationApiId":"","OauthConfig":null,"TokenLocation":null,"RelationBuniessApiIds":null}],"UsagePlanTotalCount":1,"UsagePlanList":[{"Environment":"release","UsagePlanId":"usagePlan-ds5ooe25","UsagePlanName":"anti","UsagePlanDesc":"","MaxRequestNumPreSec":1,"CreatedTime":"2020-02-06T06:38:33Z","ModifiedTime":"2020-02-15T23:04:54Z"}],"RequestId":"6c771a02-0d6e-4744-9e8b-9d9e5c7795c2"}},"code":0}

    DescribeApiEnvironmentStrategy({
        "page":1,
        "count":20,
        "keyword":"",
        "serviceId":"service-qf7o2c4u",
        "regionId":1,
        "env":"release",
        "offset":0,
        "limit":20,
        "environmentNames":["release"],
    })
    //{"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"apiSet":[{"path":"/bmap","apiId":"api-1fsru136","environmentStrategySet":{"release":1},"method":"ANY","apiName":"bmap"}]},"message":"","code":0}

    DescribeServiceEnvironmentStrategy({"serviceId":"service-qf7o2c4u"})
    //{"data":{"code":0,"message":"","codeDesc":"Success","totalCount":3,"environmentList":[{"url":"service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/release","environmentName":"release","status":1,"versionName":"20200128221203405a5601-47cf-4470-a326-1df78bbd5392","strategy":100},{"url":"service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/test","environmentName":"test","status":0,"versionName":"","strategy":5000},{"url":"service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/prepub","environmentName":"prepub","status":0,"versionName":"","strategy":5000}]},"message":"","code":0}
    s0={
        "serviceId":"service-qf7o2c4u",
        "environmentName":"release",
        "strategy":0, // 0qps
        "apiIds":["api-1fsru136"]
    }
    ModifyApiEnvironmentStrategy(s0)
    //{"data":{"code":0,"message":"","codeDesc":"Success"},"message":"","code":0}


    //list
    DescribeApiEnvironmentStrategy({
        "page":1,
        "count":20,
        "keyword":"",
        "serviceId":"service-qf7o2c4u",
        "regionId":1,
        "env":"release",
        "offset":0,
        "limit":20,
        "environmentNames":["release"],
    })
    //{"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"apiSet":[{"path":"/bmap","apiId":"api-1fsru136","environmentStrategySet":{"release":0},"method":"ANY","apiName":"bmap"}]},"message":"","code":0}
    s1={
        "serviceId":"service-qf7o2c4u",
        "environmentName":"release",
        "strategy":1, // 1qps
        "apiIds":["api-1fsru136"]
    }
    ModifyApiEnvironmentStrategy(s1)
    //{"data":{"code":0,"message":"","codeDesc":"Success"},"message":"","code":0}

    DescribeApiEnvironmentStrategy({
        "page":1,
        "count":20,
        "keyword":"",
        "serviceId":"service-qf7o2c4u",
        "regionId":1,
        "env":"release",
        "offset":0,
        "limit":20,
        "environmentNames":["release"]},
    )
    //{"data":{"code":0,"message":"","codeDesc":"Success","totalCount":1,"apiSet":[{"path":"/bmap","apiId":"api-1fsru136","environmentStrategySet":{"release":1},"method":"ANY","apiName":"bmap"}]},"message":"","code":0}

}



start=async ()=>{
    c=conn()

/*
DescribeServiceEnvironmentKeyMonitorUpload

DescribeServiceEnvironmentList

DescribeServiceReleaseVersion

UpdateService

DescribeServiceEnvironmentList

*/



    d={
        "serviceId": "service-nxxl1y2s"
    }
    r=await c.DescribeServiceEnvironmentKeyMonitorUpload(d)
    r={
        "data": {
            "code": 0,
            "message": "",
            "codeDesc": "Success",
            "environmentList": [
                {
                    "environmentName": "prepub",
                    "isUpdate": "FALSE"
                },
                {
                    "environmentName": "release",
                    "isUpdate": "FALSE"
                },
                {
                    "environmentName": "test",
                    "isUpdate": "FALSE"
                }
            ]
        },
        "message": "",
        "code": 0
    }

    d={
        "serviceId": "service-nxxl1y2s"
    }
    r=await c.DescribeServiceEnvironmentList(d)
    r={
        "data": {
            "code": 0,
            "message": "",
            "codeDesc": "Success",
            "totalCount": 3,
            "environmentList": [
                {
                    "url": "service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release",
                    "environmentName": "release",
                    "status": 0,
                    "versionName": ""
                },
                {
                    "url": "service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/test",
                    "environmentName": "test",
                    "status": 0,
                    "versionName": ""
                },
                {
                    "url": "service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/prepub",
                    "environmentName": "prepub",
                    "status": 0,
                    "versionName": ""
                }
            ]
        },
        "message": "",
        "code": 0
    }

    d={
        "serviceId": "service-nxxl1y2s",
        "offset": 0,
        "limit": 20
    }
    r=await c.DescribeServiceReleaseVersion(d)
    r={
        "data": {
            "code": 0,
            "message": "",
            "codeDesc": "Success",
            "totalCount": 1,
            "versionList": [
                {
                    "environments": [],
                    "versionDesc": "由无服务器云函数平台自动发布",
                    "createTime": "2020-01-26 17:40:04",
                    "versionName": "202001261737250bb4fc6a-646a-41b4-92fb-3b8d8b10c003"
                }
            ]
        },
        "message": "",
        "code": 0
    }


    // release

    versionName= r.data.versionList[0].versionName

    d={
        "serviceId": "service-nxxl1y2s",
        "environmentName": "release",
        "versionName": versionName, //"202001261737250bb4fc6a-646a-41b4-92fb-3b8d8b10c003"
    }
    r=await c.UpdateService(d)
    r={
        "data": {
            "code": 0,
            "message": "",
            "codeDesc": "Success",
            "updateDesc": null,
            "requestId": null
        },
        "message": "",
        "code": 0
    }

    d={
        "serviceId": "service-nxxl1y2s"
    }
    r=await c.DescribeServiceEnvironmentList(d)
    r={
        "data": {
            "code": 0,
            "message": "",
            "codeDesc": "Success",
            "totalCount": 3,
            "environmentList": [
                {
                    "url": "service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/release",
                    "environmentName": "release",
                    "status": 1,
                    "versionName": "202001261737250bb4fc6a-646a-41b4-92fb-3b8d8b10c003"
                },
                {
                    "url": "service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/test",
                    "environmentName": "test",
                    "status": 0,
                    "versionName": ""
                },
                {
                    "url": "service-nxxl1y2s-1252957949.gz.apigw.tencentcs.com/prepub",
                    "environmentName": "prepub",
                    "status": 0,
                    "versionName": ""
                }
            ]
        },
        "message": "",
        "code": 0
    }

}




