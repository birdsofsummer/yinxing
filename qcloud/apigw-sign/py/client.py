'''
{"message":"HMAC signature cannot be verified, a validate authorization header is required"}
https://cloud.tencent.com/document/product/628/11819
https://github.com/apigateway-demo

https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec
'''

import json
import requests
import datetime
import hashlib
from hashlib import sha1
import hmac
import base64

KEYS=[
{
  "code": 0,
  "message": "",
  "codeDesc": "Success",
  "secretName": "wuhan",
  "secretId": "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD",
  "secretKey": "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX",
  "createdTime": "2020-02-15 18:43:23",
  "type": "auto"
}
]

GMT_FORMAT = '%a, %d %b %Y %H:%M:%S GMT'
SECRETID = "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
SECRETKEY = "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
SOURCE="ccc"
gmt_now=lambda : datetime.datetime.utcnow().strftime(GMT_FORMAT)

'''
Authorization: hmac id="secret_id", algorithm="hmac-sha1", headers="date source", signature="Base64(HMAC-SHA1(signing_str, secret_key))"
'''

def sha1(a,b):
    sign = hmac.new(a.encode('utf-8'), b.encode('utf-8'), hashlib.sha1).digest()
    return base64.b64encode(sign).decode()

def getSimpleSign(dateTime =gmt_now(),source=SOURCE, SecretId=SECRETID, SecretKey=SECRETKEY) :
    auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"date source\", signature=\""
    signStr = "date: " + dateTime + "\n" + "source: " + source
    s1=sha1(SecretKey,signStr)
    s2 = auth + s1 + "\""
    return s2, dateTime

'''
Authorization: 'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="date source", signature="FgKZs4y/r+EEk4/583FI6LkaQvo"'
Date : 'Sat, 15 Feb 2020 11:43:56 GMT'
Source : "ccc"
'''
def get(d={}):
   u="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec"
   sign, dateTime = getSimpleSign()
   h={
       'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
       "Source": SOURCE,
       "Date": dateTime,
       "Authorization": sign,
   }
   s=requests.session()
   s.headers.update(h)
   r=s.get(u,params=d)
   return r

def main():
   r=get({"x":123})
   print(r.json())
   print(r.headers)
   return r

main()

