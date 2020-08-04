const superagent=require("superagent")
const R=require("ramda")
const util = require('util');

const {
    genMd5,
    md5sum,
    md5stream,
    md5file,
    md5blob,
    hash,
}=require("./md5")


/*
a=require("baidu-aip-sdk")
/xbin/node/lib/node_modules/baidu-aip-sdk/src/auth
*/

const HOST_DEFAULT = 'aip.baidubce.com';
const CONTENT_TYPE_FORMDEFAULT = 'application/x-www-form-urlencoded';
const SYMBOL_QUERYSTRING_PREFIX = '?aipSdk=node&access_token=';
const SYMBOL_QUERYSTRING_PREFIX_BCE = '?aipSdk=node';
const SYMBOL_HTTPS_PREFIX = 'https://';
const SYMBOL_HTTP_PREFIX = 'http://';

const AUTHTYPE_INIT = 0;
const AUTHTYPE_BCE = 1;
const AUTHTYPE_DEV = 2;
const AUTHTYPE_DEV_OR_BCE = 3;

const STATUS_INIT = 0;
const STATUS_AUTHTYPE_REQESTING = 1;
const STATUS_READY = 2;
const STATUS_ERROR = -1;

const httpHeader = {
    BCE_DATE: 'x-bce-date',
    HOST: 'Host',
    BCE_AUTHORIZATION: 'authorization',
    CONTENT_TYPE: 'Content-Type'
};


DEFAULT_FETCH_AHEAD_DURATION = 24 * 60 * 60 * 1000;
CONTENT_TYPE = 'Content-Type';
CONTENT_LENGTH = 'Content-Length';
CONTENT_MD5 = 'Content-MD5';
CONTENT_ENCODING = 'Content-Encoding';
CONTENT_DISPOSITION = 'Content-Disposition';
ETAG = 'ETag';
CONNECTION = 'Connection';
HOST = 'Host';
USER_AGENT = 'User-Agent';
CACHE_CONTROL = 'Cache-Control';
EXPIRES = 'Expires';

AUTHORIZATION = 'Authorization';
X_BCE_DATE = 'x-bce-date';
X_BCE_ACL = 'x-bce-acl';
X_BCE_REQUEST_ID = 'x-bce-request-id';
X_BCE_CONTENT_SHA256 = 'x-bce-content-sha256';
X_BCE_OBJECT_ACL = 'x-bce-object-acl';
X_BCE_OBJECT_GRANT_READ = 'x-bce-object-grant-read';

X_HTTP_HEADERS = 'http_headers';
X_BODY = 'body';
X_STATUS_CODE = 'status_code';
X_MESSAGE = 'message';
X_CODE = 'code';
X_REQUEST_ID = 'request_id';

SESSION_TOKEN = 'x-bce-security-token';

X_VOD_MEDIA_TITLE = 'x-vod-media-title';
X_VOD_MEDIA_DESCRIPTION = 'x-vod-media-description';

ACCEPT_ENCODING = 'accept-encoding';
ACCEPT = 'accept';

const code = {
    GBK: 'GBK',
    BIN: 'binary',
    UTF8: 'utf-8',
    BASE64: 'base64'
};
const devScope = 'brain_all_scope';


http_uri=({host,path})=>SYMBOL_HTTPS_PREFIX + host + path + SYMBOL_QUERYSTRING_PREFIX_BCE
https_uri=({host,path})=> SYMBOL_HTTP_PREFIX + host + path + SYMBOL_QUERYSTRING_PREFIX_BCE

// 2020-02-29T07:37:56.561Z
// 2020-02-29T07:37:47Z

const now =(timestamp=0)=> (timestamp
    ? new Date(timestamp * 1000)
    : new Date()
   ).toISOString().replace(/\.\d+Z$/, 'Z')

const now_unix_ms=()=>new Date().getTime()
const sort = R.sort(R.ascend(R.prop(0)))
const qs=R.pipe(
        R.pickBy((v,k)=>k!=AUTHORIZATION.toLowerCase()),
        R.toPairs,
        sort,
        R.fromPairs,
        x=>new URLSearchParams(x),
     )

const sign= ({
    ak,
    sk,

    method,
    resource="speech",
    uri,
    params={},
    headers={
        [HOST]: HOST_DEFAULT,
        [CONTENT_TYPE] :CONTENT_TYPE_FORMDEFAULT,
        //[BCE_AUTHORIZATION]:signature,
        [BCE_DATE]:now(),
    },
    time=now(),

    path,
    isHttp=true,
    host = HOST_DEFAULT,
    createDate=new Date(),
    mergeHeaders={},
    devAccessToken="",
    aipSdk='node',

    expirationInSeconds = 1800,
    headersToSign=[
        HOST,
        CONTENT_MD5,
        CONTENT_LENGTH,
        CONTENT_TYPE,
    ],
})=>{
   //path =path + SYMBOL_QUERYSTRING_PREFIX + token;
     const need_sign=(x="")=>/^x\-bce\-/.test(x) || headersToSign.inclues(x)
     const filter_sort=R.pipe(
              R.toPairs,
              R.filter(([k,v])=>need_sign(k)),
              sort,
     )
     const headersCanonicalization=R.pipe(
         filter_sort,
         R.map(x=>x.map(encodeURIComponent).join(":")),
         R.join("\n"),
     )
     const rawSignature=[
         method,
         resource,
         qs(params),
         headersCanonicalization(headers),
     ].join("\n")

     const signedHeaders=R.pipe(
         filter_sort,
         R.pluck(0),
         R.join(";")
     )(headers)

    const rawSessionKey =[
       'bce-auth-v1',
        ak,
        time,
        expirationInSeconds,
    ].join("/")

    const sessionKey = hash(rawSessionKey, sk)
    const signature =  hash(rawSignature, sessionKey)

    const r=[
            rawSessionKey,
            signedHeaders || "" ,
            signature
        ].join("/")
    console.log(r)
    return  r
}

init=(
    params={},
    resource="tsn",
    path="text2audio",
    method="post",
    ak=process.env.baidu_speech_APIKey,
    sk=process.env.baidu_speech_SecretKey,
)=>({
    ak,
    sk,
    method,
    resource,
    uri:"",
    params,
    headers:{
        [HOST]: HOST_DEFAULT,
        [CONTENT_TYPE] :CONTENT_TYPE_FORMDEFAULT,
        //[BCE_AUTHORIZATION]:signature,
        [BCE_DATE]:now(),
    },
    time:now(),
    path,
    isHttp:true,
    host : HOST_DEFAULT,
    createDate:new Date(),
    mergeHeaders:{},
    devAccessToken:"",
    aipSdk:'node',
    expirationInSeconds : 1800,
    headersToSign:[
        HOST,
        CONTENT_MD5,
        CONTENT_LENGTH,
        CONTENT_TYPE,
    ],
})


conn=(params={})=>{
        headers={
            ...httpHeader,
            //...
        }

        // ...
        signature = sign(
            method,
            path,
            {aipSdk: 'node'},
            headers,
            now_unix_ms(),
       )
       h1= {
           ...headers,
           [BCE_AUTHORIZATION] : signature
       }
       let d=params
       return superagent.post(url)
                .set(h1)
                .send(d)
                .type('form')
}






