#############################################环境变量#######################################################
#   export Region="xxx"
#   export SecretId="xxx"
#   export SecretKey="xxx"
#############################################环境变量#######################################################

'''
https://cloud.tencent.com/document/product/628/18814
https://cloud.tencent.com/document/product/628/18818

SecretId=xxxxxxx&Region=ap-guangzhou&Timestamp=1465055529&Nonce=59485&Signature=mysignature&SignatureMethod=HmacSHA256
d0={
        'SecretId': 'xxxxxxx',
        'Region': 'ap-guangzhou',
        'Timestamp': '1465055529',
        'Nonce': '59485',
        'Signature': 'mysignature',
        'SignatureMethod': 'HmacSHA256'
}
https://cloud.tencent.com/document/product/628/14916

https://github.com/CFETeam/qcloudapi-sdk
https://github.com/QcloudApi/qcloudapi-sdk-python
https://github.com/QcloudApi/qcloudapi-sdk-python/blob/master/QcloudApi/common/sign.py
'''

import os
import json
import requests
import time, datetime
import random

import binascii
import hashlib
import hmac
import sys

rand=lambda: random.randint(10000,100000)
merge=lambda a,b: dict(a,**b)
qs=lambda d:dict([x.split('=') for x in d.split('&')])
env=lambda x: os.environ[x] if x in os.environ else ""
now=lambda :int(time.time())
join=lambda b:'&'.join(['{}={}'.format(k,v) for k,v in b.items()])

def pick(a=[],d={}):
    return {x: d[x] for x in a}

def ksort(d={}):
    z=list(d.items())
    z.sort()
    return dict(z)

def ksort1(d={}):
    k=sorted(d)
    return {x:d[x] for x in k}


def expand_qs(d={}):
    r={}
    for k,v in d.items():
        if isinstance(v,list):
            for i,vv in enumerate(v):
                 r["{}.{}".format(k,i)]=vv
        else:
            r[k.replace('_', '.')] = v
    return r

def sign_str(d={},module="apigateway",m="GET"):
    u="{}.api.qcloud.com/v2/index.php".format(module)
    d1=join(ksort(d))
    s='{}{}?{}'.format(m.upper(),u,d1).encode('utf-8')
    #print(s)
    e=hashlib.sha256 if d["SignatureMethod"] == "HmacSHA256" else hashlib.sha1
    SECRET_KEY=env("SecretKey").encode('utf-8')
    hashed=hmac.new(SECRET_KEY, s, e)
    b=binascii.b2a_base64(hashed.digest())[:-1].decode()
    return b

#  [ "Action", "Nonce", "Region", "SecretId", "Signature", "SignatureMethod", "Timestamp", "Token" ]
def sign(d={},module="apigateway",m="GET"):
    d0={
            #"Action":"",
            'Nonce': rand(),
            'Region': env ("Region"),
            'SecretId': env("SecretId"),
            'SignatureMethod': 'HmacSHA256',
            #"Signature":"",
            'Timestamp': now(),
            #'Token':"",
    }
    d1=merge(d0,d)
    s={ "Signature":sign_str(d1,module,m)}
    return merge(d1,s)


def get(d={"Action":""},module="apigateway"):
   h={
      #"token":TOKEN,
   }
   u="https://{}.api.qcloud.com/v2/index.php".format(module)
   d0=expand_qs(d)
   d1=merge(sign(d0,module),d0)
   s=requests.session()
   s.headers.update(h)
   r=s.get(u,params=d1)
   #print(d0)
   #print(d1)
   #print(r.request.url)
   return r

####################################################################################################

def test():
   d1={
       'Action': 'CreateApiKey',
       'secretName': 'wuhan',
       'secretId': 'token',
       'secretKey': 'ccc',
    #   'type': 'manual' ,#  auto|manunal
   }
   d2={
           "Action":"CreateApiKey",
           "secretName":"wuhan",
   }
   s={}
   r1=get(d1).json()
   r2=get(d2).json()
   print(r1)
   print(r2)




def test1():
   d1={
        "Action":"UpdateApiKey",
        "secretId":"AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
   }
   d2={
        "Action":"UpdateApiKey",
        "secretId":"AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
        "secretKey":"123",
   }
   d3={
        "Action":"DescribeApiKeysStatus",
        "offset":"0",
        "limit":"2",
        "orderby":"createdTime",
        "order":"desc",
        #"searchKey":"aa",
        "secretIds":["AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r","AKIDktnI9rRlc1kAhy30737sw7JAW34llDVaf8lT"],
   }
   d4={
        "Action":"DescribeApiKey",
        "secretId":"AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
   }
   d5={
        "Action":"DisableApiKey",
        "secretId":"AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
   }
   d6={
        "Action":"EnableApiKey",
        "secretId":"AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
   }
   d7={
        "Action":"DeleteApiKey",
        "secretId":"AKID20n8cYBb0k7ydY38TV2w0L1MM8qkveNtkn5r",
   }
   r3=get(d3)
   print(r3.json())


#test1()
####################################################################################################
