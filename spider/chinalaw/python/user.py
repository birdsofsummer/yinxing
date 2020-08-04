from faker import Factory
import random
import consts

#{'_ZVING_METHOD': 'Register.doRegister', '_ZVING_URL': '%2Fregister', '_ZVING_DATA': "{'userName': 'sue68', 'email': 'cisnerosrobert@hotmail.com', 'password': '123456', 'password1': '123456', 'realName': '吕淑兰', 'province': '北京市', 'job': 'IT|互联网|通信', 'mobile': '', 'address': ''}", '_ZVING_DATA_FORMAT': 'json'}

pick=random.choice

def reg():
    fake = Factory.create()
    username = fake.user_name()
    email = fake.email()
    real_name = Factory.create(locale='zh_CN').name()
    register_data = {
        "userName": username,
        "email": email,
        "password": "123456",
        "password1": "123456",
        "realName": real_name,
        "province": pick(consts.PROVINCE),
        "job": pick(consts.JOB),
        "mobile": "",
        "address": "",
    }
    d={
        '_ZVING_METHOD': 'Register.doRegister',
        '_ZVING_URL': '%2Fregister',
        '_ZVING_DATA': str(register_data),
        '_ZVING_DATA_FORMAT': 'json',
    }
    return d

# {'userName': 'matthew02', 'email': 'dpierce@gmail.com', 'realName': '王柳'}
def gen():
    fake = Factory.create()
    username = fake.user_name()
    email = fake.email()
    real_name = Factory.create(locale='zh_CN').name()
    return {
        "userName": username,
        "email": email,
        "realName": real_name,
    }
