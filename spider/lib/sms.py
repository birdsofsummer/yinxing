'''
root
数据线? adb devices
wifi? adb connect 14.127.177.146
adb pull /data/data/com.android.providers.telephony/databases/mmssms.db .

select body from sms where address =106912230005028770  ORDER BY date DESC  limit 1;
{
 '_id': 58,
 'thread_id': 7,
 'address': '106912230005028770',
 'person': '',
 'date': 1587883897530,
 'date_sent': 1587883897000,
 'protocol': 0,
 'read': 1,
 'status': -1,
 'type': 1,
 'reply_path_present': 0,
 'subject': '',
 'body': '【深圳公益WLAN】您本次的短信验证码为：6283，有效期为7天。您可免费使用SZ-WLAN(free)无线上网服务。请遵守相关法律法规，文明上网。',
 'service_center': '+8613010200500',
 'locked': 0,
 'sub_id': 2,
 'error_code': -1,
 'creator': 'com.android.messaging',
 'seen': 1
}
【深圳公益WLAN】您本次的短信验证码为：6283，有效期为7天。您可免费使用SZ-WLAN(free)无线上网服务。请遵守相关法律法规，文明上网。
'''

import os
import sqlite3
import re

DB_FILE="/data/data/com.android.providers.telephony/databases/mmssms.db"
IP="14.127.177.146"

def exec(cmd=""):
    r=os.popen(cmd)
    r1=list(r)
    print(r1)
    return r1

def pull1(ip=IP,db_file=DB_FILE):
    c2="adb pull {} ".format(db_file)
    exec(c2)

def pull2(db_file=DB_FILE):
    c1="adb connect "+ip
    exec(c1)

'''
adb shell 'sqlite3 /data/data/com.android.providers.telephony/databases/mmssms.db "select * from sms limit 1;"'
cmd="""adb shell 'sqlite3 /data/data/com.android.providers.telephony/databases/mmssms.db "select * from sms limit 1;"'"""
'''
def pull3(db_file=DB_FILE):
    #c0="adb devices"
    c0="adb root"
    a=os.popen(c0)
    print(list(a))
    sql='select body from sms where address =106912230005028770 ORDER BY date DESC limit 1;'
    c1="""adb shell 'sqlite3 {} "{}"' """.format(db_file,sql)
    r=os.popen(c1)
    r1=list(r)[0]
    print(r1)
    code=re.compile(r'\d{4}').findall(r1,0)[0]
    return code


def query():
    file1="mmssms.db"
    sql='select body from sms where address =106912230005028770 ORDER BY date DESC limit 1;'
    conn = sqlite3.connect(file1)
    c = conn.cursor()
    cursor = c.execute(sql)
    d=list(cursor)[0][0]
    code=re.compile(r'\d{4}').findall(d,0)[0]
    print(d)
    #print(code)
    conn.close()
    return code


def parse_sms1():
    pull1()
    z=query()
    #print(z)
    os.unlink("mmssms.db")
    return z


def parse_sms():
    z=pull3()
    return z
