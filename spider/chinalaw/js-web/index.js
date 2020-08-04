// http://zqyj.chinalaw.gov.cn/draftDetail?listType=1&DraftID=3654&1583032457181
HEADERS={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0",
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
        }

SERVER="http://zqyj.chinalaw.gov.cn/ajax/invoke"

post=(
    u=SERVER,
    body="",
    referrer,
    headers=HEADERS
)=>{
        let o={
            headers,
            referrer,
            body ,
            "credentials": "include",
            "method": "POST",
            "mode": "cors"
        }
        console.log(i)
        return fetch(u, o)
        .then(x=>x.json())
        .then(console.log)
}


reco_code=()=>{
   t=new Date().getTime()
   u="http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&"+ t
   fetch(u)
    /*
   cookie="SERVERID=c41f28a6d49a96da7ea5913be8862045|1583035841|1583029472; _ZVING_AUTHCODE=86238c1c6a3f0f29e69a2cac6e745637_1583035841993; JSESSIONID=5CCED269D085668E0CC62956D35200E5; 14_vq=9"
    {
        "SERVERID": "c41f28a6d49a96da7ea5913be8862045|1583035841|1583029472",
        "_ZVING_AUTHCODE": "86238c1c6a3f0f29e69a2cac6e745637_1583035841993", // 验证码
        "JSESSIONID": "5CCED269D085668E0CC62956D35200E5",
        "14_vq": "9"
    }
    */
}


// 1. http://zqyj.chinalaw.gov.cn/index#
// get index -> cookie1 -> get code ->cookie2 | reco code  -> login(code) ->cookie3 -> vote

login=(code="c47kf")=>{
    u="http://zqyj.chinalaw.gov.cn/ajax/invoke"
    province=["北京市","天津市","重庆市","上海市","河北省","山西省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省","陕西省","甘肃省","青海省","台湾省","内蒙古自治区","广西壮族自治区","宁夏回族自治区","新疆维吾尔自治区","西藏自治区","香港特别行政区","澳门特别行政区"]
    job=["销售|客服|市场","财务|人力资源|行政","项目|质量|高级管理","IT|互联网|通信","房产|建筑|物业管理","金融","采购|贸易|交通|物流","生产|制造","传媒|印刷|艺术|设计","咨询|法律|教育|翻译","服务业","能源|环保|农业|科研","兼职|实习|社工|其他"]
    d1={
        userName: "",
        province: "北京市",
        job: "销售|客服|市场",
        email: "",
        mobile: "",
        address: "",
        verifyCode: code,
    }
    d={
        "_ZVING_METHOD": "Register.doAnonymousLogin",
        "_ZVING_URL": "%2Findex",
        "_ZVING_DATA": JSON.stringify(d1),
        "_ZVING_DATA_FORMAT": "json"
    }
    body=new URLSearchParams(d)
    referrer="http://zqyj.chinalaw.gov.cn/index",
    post(u,body,referrer)
}

/*
{ _ZVING_STATUS: 0, _ZVING_MESSAGE: "您的IP在2020年03月01日11时17分已投票,现在不能参与投票！" }
{ _ZVING_STATUS: 0, _ZVING_MESSAGE: "IP正在操作" }
{ _ZVING_STATUS: 1, _ZVING_MESSAGE: "感谢您的参与！" }
{ _ZVING_STATUS: 0, _ZVING_MESSAGE: "条目不存在" }
*/
vote=()=>{
    u="http://zqyj.chinalaw.gov.cn/ajax/invoke"
    referrer="http://zqyj.chinalaw.gov.cn/draftDetail?listType=1&DraftID=3654&1583032457181"
    start=123166
    n=5*11
    for (i=start;i<=start+n;i++) {
        body="_ZVING_METHOD=SupportOppose.voteOppose&_ZVING_URL=%252FdraftDetail&_ZVING_DATA=%7B%22DraftID%22%3A3654%2C%22ID%22%3A%22"+i+"%22%7D&_ZVING_DATA_FORMAT=json"
        post(u,body,referrer)
    }
}





vote()
setInterval(vote,10000)
