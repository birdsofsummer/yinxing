# https://ai.baidu.com/ai-doc/IMAGERECOGNITION/8k3e7f69o

import requests
import base64
from urllib.parse import urlencode


def post(u="/",d={},p={}):
    h= {'content-type': 'application/x-www-form-urlencoded'}
    d1=urlencode(d).encode('utf-8')
    return requests.post(u, data=d1,params=p, headers=h)

def read(file_name):
    with open(file_name, 'rb') as f:
        base64_data = base64.b64encode(f.read())
        s = base64_data.decode()
        return s
        #r='data:image/jpeg;base64,%s'%s

def imagerecognition(file_name,access_token):
        u = "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general"
        p={"access_token":access_token}
        d={"image":read(file_name)}
        r=post(u,d,p)
        #return r.json() if r.ok else {}
        return r.text if r.ok else "{}"


ACCESS_TOKEN = '24.fb87fe7335f073ac02bd2e8c9a3e3173.2592000.1579168740.282335-18048107'
ACCESS_TOKEN1 = '24.346e81211e0b44489d2ab2c2a2847b58.2592000.1579433422.282335-18075594'
z=imagerecognition("../img/2.jpg",ACCESS_TOKEN)
print(z)
