# -*- coding: utf8 -*-

import json
import requests

CORS_HEADERS={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width,token',
    'access-control-max-age': '1728000',
}

def res_json(d={},code=200,ok=True,errorMessage=""):
    return {
    "isBase64Encoded":False,
    "statusCode": code,
    "headers":  dict({"Content-Type":"application/json; charset=utf-8"},**CORS_HEADERS),
    "body": json.dumps({"errorCode":0,"errorMessage":errorMessage,"ok":ok,"data":d})
    }

def main_handler(event, context):
    print(event)
    #h=event["headers"]
    print(context)
    d=event
    return res_json(d)

