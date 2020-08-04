import requests
import re
import json
import os
import time
from sms import *

'''
1. redirct (3次...)
2. get sms
3. login

'''


PHONE='18576690127'
headers={
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0",
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "X-Requested-With": "XMLHttpRequest",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "referrer":"",
}

config={
    'id' : '0',
    'ssid' : 'SZ-WLAN(free)',
    'wlanapmac' : '384223470000',
    'userAgent' : 'Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0',
    'url' : 'null',
    'reffer' : 'null',

    'wlanuserip' : '183.16.224.56',
    'wlanacname' : 'GD-SZ-HMG-MSE-4.MAN.NE40E',
    'wlanacip' : '59.38.105.46',
    'wlanusermac' : 'e23a17387fca',
}

def merge(*a):
    o={}
    for x in a:
        o=dict(o,**x)
    return o

join=lambda z:"&".join(["{}={}".format(a,b) for (a,b) in z.items()])
#requests.urllib3.util.parse_url(u)
def qs(u=""):
    u1=requests.utils.urlparse(u)
    return dict([x.split("=") for x in u1.query.split("&")])

def get_host(u=""):
    u1=requests.utils.urlparse(u)
    return "{}://{}".format(u1.scheme,u1.netloc)


'''
/pwd
{
    'actiontype' : 'APPLYPWD',
    'USER' : '18576690127',
}

{"code":0,"msg":"您可能更换了设备或手机号码，需重新认证，新密码已发送到您当前输入的手机号码，请查收。"}
{'code': 5, 'msg': '您上次申请的密码已过期，新密码已发送。'}
'''
def get_sms(s,base1,q,phone=PHONE):
    d={
        'actiontype' : 'APPLYPWD',
        "USER":phone,
    }
    r3=s.post(base1+"/pwd",params=merge(config,q,d))
    print(r3.json())


'''
/webauth
{
    'actiontype' : 'LOGIN',
    'USER' : '18576690127',
    'PWD' : '123456',
}
{"code":16,"msg":""}
{"code":0,"msg":"上线成功","url":"http://www.hao123.com"}
'''
def login(s,base1,q,sms="1234",phone=PHONE):
    d1={
        'actiontype' : 'LOGIN',
        "USER":phone,
        'PWD' : sms,
    }
    #data=json.dumps(d1)
    r4=s.post(base1+"/webauth",params=merge(config,q,d1))
    print(r4.json())
    #print(requests.get(u1).text)



'''
{
    'wlanuserip': '183.16.224.56',
    'wlanacname': 'GD-SZ-HMG-MSE-4.MAN.NE40E',
    'wlanacip': '59.38.105.46',
    'wlanusermac': 'e2-3a-17-38-7f-ca',
    'nasid': 'eth/1/0/1:3842.2347'
}
'''
def main():
    print("wait...")
    u1 = "http://www.baidu.com"
    r = requests.head(u1)
    h = r.headers
    print(h)
    if 'Location' in h:
        u2 = h['Location']
        base=u2.split("?")[0]

        headers["referrer"]=u2
        s = requests.Session()
        s.headers.update(headers)
        print("redirect 2 ->",u2)
        r2=s.get(u2)
        u3=r2.url
        print("redirect 3 ->",u3)
        q=qs(u3)
        base1=get_host(r2.url)
        print("send sms")
        get_sms(s,base1,q,PHONE)
        # sms=input("看看手机验证码....:\n")
        time.sleep(6)
        sms=parse_sms()
        print("ssss",sms)
        login(s,base1,q,sms)

    else:
        print("connect...")
        print(requests.get(u1).text)


main()
