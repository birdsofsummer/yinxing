from aip import AipBodyAnalysis
import os

env=[
     "baidu_body_AppID",
     "baidu_body_APIKey",
     "baidu_body_SecretKey",
    ]

#[APP_ID,API_KEY,SECRET_KEY]
config=[os.getenv(x) for x in env]
conn = lambda : AipBodyAnalysis(*config)

def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

# {'labelmap':"", 'foreground':"", 'scoremap':"", 'log_id'}
def cutout(file_name='../img/1.jpg'):
    image = get_file_content(file_name)
    options={}
    options["type"] = "labelmap"
    c=conn()
    return c.bodySeg(image)


def test():
    r=cutout('../img/1.jpg')
    l=r['labelmap']
    from save import save_labelmap
    save_labelmap(l,"../img/2.jpg")

