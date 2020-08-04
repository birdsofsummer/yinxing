import requests
import time
import json
import sys
import os
# sys.path+=[os.getcwd()]
import random
import consts


SERVER=consts.SERVER

now=lambda:int(time.time()*1000)
img_url=lambda t:"http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&{}".format(t)
pick=random.choice
rnd=lambda :random.randint(1, 254)
ip=lambda :'.'.join([str(x) for x in [rnd() for y in range(0,4)]])
trim=lambda z:''.join(filter(lambda x:x!=" ",list(z)))


def pick1(arr=[]):
    random.shuffle(arr)
    return arr[0]

def write_json(name,j):
    t=json.dumps(j,indent=4,ensure_ascii=False)
    with open(name,'w',encoding='utf-8') as f:
            f.write(t)

def create_s():
    i=ip()
    H={
        **consts.H,
        'x-real-ip':i,
        'X-Forwarded-For': i,
        "User-Agent":pick(consts.USER_AGENT_LIST),
        "referrer": "http://zqyj.chinalaw.gov.cn/index",
    }
    s = requests.session()
    s.headers.update(H)
    return s



FILE_NAME="code.jpg"
def get_code(s):
    t=now()
    url=img_url(t)
    print(url)
    z=s.get(url)
    l=len(z.content)
    if  l< 400:
        print('l<400 retry')
        return get_code(s)
    with open(FILE_NAME,'wb') as f:
        f.write(z.content)
    print(t,z.status_code,l)
    print('看看验证码。。{}'.format(FILE_NAME))


def login(s,code=""):
    s.headers.update(consts.HEADERS)
    d1={
       "userName": "",
       "province": pick(consts.PROVINCE),
       "job": pick(consts.JOB),
       "email": "",
       "mobile": "",
       "address": "",
       "verifyCode": str(code),
    }
    d={
        "_ZVING_METHOD": "Register.doAnonymousLogin",
        "_ZVING_URL": "%2Findex",
        "_ZVING_DATA": json.dumps(d1),
        "_ZVING_DATA_FORMAT": "json"
    }
    print(d1)
    return s.post(SERVER,data=d)

def reco(file_name):
    from ocr import recognize_captcha
    r=recognize_captcha(file_name)
    print(r)
    try:
        code=r['words_result'][0]['words'].strip()
        return code
    except:
        return ""

def ask(s):
    index="http://zqyj.chinalaw.gov.cn/index"
    s.get(index)
    d={
	"_ZVING_METHOD": "Register.isLogin",
	"_ZVING_URL": "%2Findex",
	"_ZVING_DATA": "{}",
	"_ZVING_DATA_FORMAT": "json"
    }
    r=s.post(SERVER,data=d)
    print(r.text)

def login1(s,ocr=True):
    #ask(s)
    get_code(s)
    code=reco(FILE_NAME) if ocr else input("验证码:")
    print("code {}".format(code))
    if len(code)!=5:
        return login1(s)
    try:
        r=login(s,code)
        print("login...",r.text)
        ll=r.json()
        if ll['_ZVING_STATUS']==0 :
            login1(s,ocr)
    except:
        login1(s,ocr)

def login2(s,code=""):
    r=login(s,code)
    ll=r.json()
    print("login...",ll)
    if ll['_ZVING_STATUS']==0 :
        raise Exception("code err")

def vote(s):
    s.headers.update(consts.HEADERS)
    start=123166
    n=123215
    for i in range(start,n):
        dd={"DraftID":3654,"ID":str(i)}
        d={
              '_ZVING_METHOD' : 'SupportOppose.voteOppose',
              '_ZVING_URL' : '%2FdraftDetail',
              '_ZVING_DATA' : json.dumps(dd),
              '_ZVING_DATA_FORMAT' : 'json',
        }
        r=s.post(SERVER,data=d)
        print(i,r.text)
        time.sleep(3)
        yield (i,r.text)

def vote1(s,ocr=True):
    login1(s,ocr)
    print("vote...")
    r=[x for x in vote(s)]
    return r

def vote2(s,code=""):
    login2(s,code)
    print("vote...")
    r=[x for x in vote(s)]
    return r

def main(ocr=True):
    s=create_s()
    r=vote1(s,ocr)
    print(r)
    write_json("log.json",dict(r))
    print('done')





if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--ocr", help="ocr", action='store_true')
    parser.add_argument("--count", help="vote how many times", default=10, type=int)
    parser.add_argument("--forever", help="vote forever", action='store_true')
    args = parser.parse_args()
    ocr=args.ocr
    print("ocr = {}".format(ocr))
    if args.forever:
        while True:
            main(ocr)
            print('sleep')
            time.sleep(100)
    else:
        for i in range(args.count):
            main(ocr)
            time.sleep(60)


