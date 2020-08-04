const SERVER="http://zqyj.chinalaw.gov.cn/ajax/invoke"
const H={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0",
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "X-Requested-With": "XMLHttpRequest",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
}

const HEADERS={
            ...H,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        }

const PROVINCE=["北京市","天津市","重庆市","上海市","河北省","山西省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省","陕西省","甘肃省","青海省","台湾省","内蒙古自治区","广西壮族自治区","宁夏回族自治区","新疆维吾尔自治区","西藏自治区","香港特别行政区","澳门特别行政区"]

const JOB=["销售|客服|市场","财务|人力资源|行政","项目|质量|高级管理","IT|互联网|通信","房产|建筑|物业管理","金融","采购|贸易|交通|物流","生产|制造","传媒|印刷|艺术|设计","咨询|法律|教育|翻译","服务业","能源|环保|农业|科研","兼职|实习|社工|其他"]

module.exports={
    SERVER,
    H,
    HEADERS,
    PROVINCE,
    JOB,
}
