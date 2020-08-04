import requests
import time
import consts

now=lambda:int(time.time()*1000)
img_url=lambda t:"http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&{}".format(t)

def get_code():
    t=now()
    s = requests.session()
    s.headers.update(consts.H)
    z=s.get(img_url(t))
    l=len(z.content)
    if  l== 0:
        print('retry')
        return get_code()
    with open("code/{}.jpg".format(t),'wb') as f:
        f.write(z.content)
    print(t,z.status_code,l)

while True:
    get_code()
    time.sleep(1)

