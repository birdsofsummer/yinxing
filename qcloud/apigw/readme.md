# deploy

### token

+ weixin scan

+ get token && save to .env_temp

+ read token /flush token  && save token


### upload

+ npm i

+ zip

+ upload ->cos

### fn

+ create ns

+ create fn

+ publish fn

### apigw

apiAuthSetting = CreateUsagePlan/DescribeUsagePlan({Region,usagePlanId,limit,offset:0})/ModifyUsagePlan({usagePlanId,...})

filterUsagePlanSecretId = DescribeUsagePlanSecretIds/CreateApiKey({Region,secretName,type: 'auto'})/DescribeApiKeysStatus({ secretIds, Region, limit, })


+ read serviceId from .serverless/_.json

+ DescribeService({Region,serviceId})/ModifyService({serviceId,...})/CreateService({...})

+ DescribeApisStatus({Region,serviceId,limit:100})

+ ModifyApi({apiId,...})/CreateApi({...})/DescribeApi({apiId,serviceId, Region})

+ apiAuthSetting/filterUsagePlanSecretId

+ BindSecretIds({Region,secretIds,usagePlanId})/UnBindSecretIds({Region,secretIds,usagePlanId})

+ DescribeApiUsagePlan({serviceId,Region,apiIds})

+ BindEnvironment/UnBindEnvironment({Region, usagePlanIds, serviceId, environment, bindType, apiIds,})

+ ReleaseService({Region,serviceId,environmentName,releaseDesc})/UnReleaseService({Region,serviceId,environmentName,unReleaseDesc})

+ save ServiceID to .serverless/_.json


```json
{
  "id": "1lddp7wk"
}

```
