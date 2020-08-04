# pip3 install baidu-aip

# https://ai.baidu.com/ai-doc/OCR/Ek3h7xypm
# https://ai.baidu.com/ai-doc/OCR/3k3h7yeqa

from aip import AipOcr
import os

env=["baidu_ocr_AppID",
     "baidu_ocr_APIKey",
     "baidu_ocr_SecretKey",
    ]

#[APP_ID,API_KEY,SECRET_KEY]
config=[os.getenv(x) for x in env]

conn=lambda :AipOcr(*config)

def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

def recognize_captcha(file_name):
    image = get_file_content(file_name)
    c= conn()
    options = {}
    options["detect_direction"] = "true"
    options["probability"] = "true"
    #r=c.basicGeneral(image,options)
    r=c.basicAccurate(image,options)
    return r

def test():
    r={
       'log_id': 2605279958787575970,
       'direction': 0,
       'words_result_num': 1,
       'words_result': [{'words': ' 4cxyb', 'probability': {'variance': 0.0, 'average': 1.0, 'min': 1.0}}]
    }
    t=r['words_result'][0]['words'].strip()
    print(t)
    z=recognize_captcha("code.jpg")
    print(z)

