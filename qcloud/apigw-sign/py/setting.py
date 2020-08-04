#/usr/local/lib/python3.8/site-packages/QcloudApi

from QcloudApi.qcloudapi import QcloudApi
import os

env=lambda x: os.environ[x] if x in os.environ else ""
module = 'apigateway'
config = {
    'Region': 'ap-guangzhou', # env ("Region")
    'secretId': env ("SecretId"),
    'secretKey': env("SecretKey"),
    'method': 'GET',
    'SignatureMethod': 'HmacSHA1',
    'Version': '2017-03-12'
}
service = QcloudApi(module, config)



d1={
      "Action":"CreateApiKey",
      "secretName":"wuhan",
}
d2={
       'Action': 'CreateApiKey',
       'secretName': 'wuhan',
       'secretId': 'AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD',
       'secretKey': 'ccc',
       'type': 'manual' ,#  auto|manunal
}

print(service.generateUrl('CreateApiKey', d1))
print(service.generateUrl('CreateApiKey', d2))
r=service.call('CreateApiKey',d1)
r=service.call('CreateApiKey',d2)

'''
{"code":0,"message":"","codeDesc":"Success","secretName":"wuhan","secretId":"AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD","secretKey":"k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX","createdTime":"2020-02-15 18:43:23","type":"auto"}

'''




r=service.call("DescribeApiKeysStatus", {"secretIds":["AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"]})
action = 'DescribeInstances'
r=service.generateUrl(action, action_params)


