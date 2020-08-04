
[接口](https://ai.baidu.com/docs#/ImageClassify-API/top "")


## sdk

[sdk 快速入门](https://ai.baidu.com/ai-doc/IMAGERECOGNITION/Xk3bcxjho "")

[sdk 接口说明](https://ai.baidu.com/ai-doc/IMAGERECOGNITION/4k3bcxj1m "")


```bash
  pip3 install baidu-aip
  export baidu_imagerecognition_AppID="********"
  export baidu_imagerecognition_APIKey="************************"
  export baidu_imagerecognition_SecretKey="********************************"
```

```python

from aip import AipImageClassify
import os
env=[
        "baidu_imagerecognition_AppID",
        "baidu_imagerecognition_APIKey",
        "baidu_imagerecognition_SecretKey",
]

#[APP_ID,API_KEY,SECRET_KEY]
config=[os.getenv(x) for x in env]
conn=lambda :AipImageClassify(*config)

def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()


def test():
    file_name="../img/1.jpg"
    b=get_file_content(file_name)
    o={}
    c = conn()
    c.advancedGeneral(b,o)
    c.animalDetect(b,o)
    c.carDetect(b,o)
    c.currency(b,o)
    c.dishDetect(b,o)
    c.flower(b,o)
    c.ingredient(b,o)
    c.landmark(b,o)
    c.logoAdd(b,o)
    c.logoDeleteByImage(b,o)
    c.logoDeleteBySign(b,o)
    c.logoSearch(b,o)
    c.objectDetect(b,o)
    c.plantDetect(b,o)
    c.redwine(b,o)


    c.post()
    c.report()
    c.setConnectionTimeoutInMillis()
    c.setProxies()
    c.setSocketTimeoutInMillis
    c.getVersion()

```
