//https://alihealth.taobao.com/medicalhealth/influenzamap?chInfo=spring2020-stay-in
// f=x=>({url:x,data:Object.fromEntries([...new URL(x).searchParams])})
//
/*
cookie={
	"t": "5baf9bcb5a6fa37dd27cdf35ef7cc9d0",
	"cna": "ONSRFSgDfHICATo8ARajmDEK",
	"thw": "cn",
	"_m_h5_tk": "22706db5a8d62e27476b9aeab8ba21c9_1580205653654",
	"_m_h5_tk_enc": "4c1f5344b46753976ab9044296494289",
	"_bl_uid": "Cekbw5Okx64kq7i9193hezgxXynX",
	"isg": "BOXl0Y1p18u3czDls_X1TcHQ96gfIpm0jAIHMefKoZwr_gVwr3KphHOcjOKIZbFs",
	"l": "cBjFx0OIQjaUZjH9BOCahurza77OSIOYYuPzaNbMi_5CO6T60M7OoDAgSF96VsWd9nLB4xRPdRJ9-eteqNNRLCu_Wf-c."
}
*/



const superagent=require('superagent')

cookie="t=5baf9bcb5a6fa37dd27cdf35ef7cc9d0; cna=ONSRFSgDfHICATo8ARajmDEK; thw=cn; _m_h5_tk=22706db5a8d62e27476b9aeab8ba21c9_1580205653654; _m_h5_tk_enc=4c1f5344b46753976ab9044296494289; _bl_uid=Cekbw5Okx64kq7i9193hezgxXynX; l=cBjFx0OIQjaUZFlLBOfZmuIRXjQ9qIdVCkPzw4ZBSICP_v5p5nSFWZmHiU89Cn1VL6zBP3k2a9wwBWLKQyUJlluyIQnvWYQf.; isg=BGVlUg3pV0s_fbBlM3V1zUFQdyifohk0DIKHsWdL5RyrfoDwJ_KaBA9cDGII5THs"

HEADERS= {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
    "Accept": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Content-type": "application/x-www-form-urlencoded",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
    "referrer": "https://alihealth.taobao.com/medicalhealth/influenzamap?chInfo=spring2020-stay-in",
    "Cookie":cookie,
}

API={
    getepidemichotinfo:{
        url: "https://h5api.m.taobao.com/h5/mtop.alihealth.mdeer.pidemic.getepidemichotinfo/1.2/",
        data:{
            "jsv": "3.0.5",
            "appKey": "12574478",
            "t": "1580197103202", //13位
            "sign": "c98bb5a3ab00c38f7916e2f1f8e30d86", //32位
            "type": "originaljson",
            "valueType": "original",
            "v": "1.2",
            "api": "mtop.alihealth.mdeer.pidemic.getEpidemicHotInfo",
            "env": "m",
            "cookie2": "1acd4784c0bac1786f171f373fe78dd6", //!
            "sg": "365",
            "data": "{\"channel\":\"yzl\"}"
        },
    },
    getcitydiseaseinfo:{
        url:"https://h5api.m.taobao.com/h5/mtop.alihealth.mdeer.pidemic.getcitydiseaseinfo/1.0/",
        data:{
            "jsv": "3.0.5",
            "appKey": "12574478",
            "t": "1580197103220",
            "sign": "3828c41d3880e2e8cef4190a45362c2c",
            "type": "originaljson",
            "valueType": "original",
            "v": "1.0",
            "api": "mtop.alihealth.mdeer.pidemic.getCityDiseaseInfo",
            "env": "m",
            "cookie2": "1acd4784c0bac1786f171f373fe78dd6",
            "sg": "365",
            "data": "{}"
        }
    },
    getlocalcitydiseaseinfo:{
        "url": "https://h5api.m.taobao.com/h5/mtop.alihealth.mdeer.pidemic.getlocalcitydiseaseinfo/1.0/",
        "data": {
            "jsv": "3.0.5",
            "appKey": "12574478",
            "t": "1580197103233",
            "sign": "6f62cb43367b96a244d9af764117619e",
            "type": "originaljson",
            "valueType": "original",
            "v": "1.0",
            "api": "mtop.alihealth.mdeer.pidemic.getLocalCityDiseaseInfo",
            "env": "m",
            "cookie2": "1acd4784c0bac1786f171f373fe78dd6",
            "sg": "365",
            "data": "{\"province\":\"湖北省\",\"city\":\"武汉市\"}"
        }
    },
    citylist:{
        "url": "https://h5api.m.taobao.com/h5/mtop.alihealth.serviceitem.location.citylist.get/1.0/",
        "data": {
            "jsv": "3.0.5",
            "appKey": "12574478",
            "t": "1580197109401",
            "sign": "2045607aef9a3215cd235a112b13a5e8",
            "type": "originaljson",
            "valueType": "original",
            "v": "1.0",
            "api": "mtop.alihealth.serviceitem.location.citylist.get",
            "env": "m",
            "cookie2": "1acd4784c0bac1786f171f373fe78dd6",
            "sg": "365",
            "data": "{}"
        },
        fail:{
            tk:{"api":"mtop.alihealth.serviceitem.location.citylist.get","data":{},"ret":["FAIL_SYS_TOKEN_EMPTY::令牌为空"],"v":"1.0"}
        }
    },

}



const sign=(q={})=>q //......

const get=(u="/",q={})=>superagent
    .get(u)
    .query(sign(q))
    .set(HEADERS)
    .type('json')


const create_api=(a=API)=>{
    let api={}
    for (let i in a){
        let {url,data}=a[i]
        api[i]=(q={})=>get(url,{...data,...q})
    }
    return api
}

const test1=async ()=>{
   HOME="https://alihealth.taobao.com/medicalhealth/influenzamap?chInfo=spring2020-stay-in"
   //get(HOME) -> save cookie -> get(...)
   c= create_api()
   r=await c.citylist()
   console.log(r)
}


