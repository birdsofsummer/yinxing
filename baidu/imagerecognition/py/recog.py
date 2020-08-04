# pip3 install baidu-aip

# https://ai.baidu.com/ai-doc/IMAGERECOGNITION/Xk3bcxjho
# https://ai.baidu.com/ai-doc/IMAGERECOGNITION/4k3bcxj1m

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


def recog(file_name):
    image = get_file_content(file_name)
    c= conn()
    options = {}
    options["baike_num"] = 5
    r=c.advancedGeneral(image, options)
    return r

z=recog("../img/1.jpg")
print(z)



