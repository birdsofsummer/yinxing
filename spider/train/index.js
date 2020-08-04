// https://trains.ctrip.com/TrainBooking/Search.aspx?fromCn=%E5%8C%97%E4%BA%AC&toCn=%E6%B7%B1%E5%9C%B3&day=&trainstype=&mkt_header=bdkx&allianceID=949992&sid=1565644&from=beijing&to=shenzhen#



const superagent=require('superagent')
require('superagent-charset')(superagent)


const R=require('ramda')


const encode_city_name =R.pipe(
        encodeURI,
        R.split('%'),
        R.lift((a,b)=>b? a+b :"")(['25']),
        R.join('%'),
)

const to_json=(s="")=>{
    try{
        return JSON.parse(s)
    }catch(e){
        return {}
    }
}


const HEADERS={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
       // "Accept": "application/json, text/javascript, */*; q=0.01",
       // "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
       // "X-Requested-With": "XMLHttpRequest",
       // "Pragma": "no-cache",
       // "Cache-Control": "no-cache",
      //  "referrer": "https://trains.ctrip.com/TrainBooking/Search.aspx?fromCn=%E5%8C%97%E4%BA%AC&toCn=%E6%B7%B1%E5%9C%B3&day=&trainstype=&mkt_header=bdkx&allianceID=949992&sid=1565644&from=beijing&to=shenzhen",
    }


const API={
    station:{
        h:{},
        url:"https://trains.ctrip.com/TrainBooking/Ajax/TrainExtendHandler.ashx",
        method:"get",
        query:{
             Action: "searchCitybyName",
             cityName: "%25E5%258C%2597%25E4%25BA%25AC"
        },
        data:{},
        res:{},
        eg:"",
    },
    book:{
        h:{
            'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
            'Accept-Encoding':'deflate',
        },
        url:"https://trains.ctrip.com/TrainBooking/Ajax/SearchListHandler.ashx?Action=getQueryBooking",
        method:"post",
        query:{},
        data:'value={"trainNum":"G4847","departure":"\u5317\u4eac\u897f","arrive":"\u77f3\u5bb6\u5e84","date":"2020-01-30"}',
        res:{},
    }
}

const create_api=(a=API)=>{
    let api={}
    for (let i in a){
        let {url,h,method,query,data}=a[i]
        api[i]=(q={},d={})=>superagent[method](url)
            .set({...HEADERS,...h})
            .query({...query,...q})
            .buffer()
            .charset('gbk')
            //.responseType('blob')
            .send(data)
            //.pipe(fs.createWriteStream('ttt'))
            .then(x=>to_json(x.text))
    }
    return api
}


























const test1=async ()=>{
    c=create_api()
    r1=await c.station()
    console.log(r1)

    let n="株洲"
    let q={cityName:encode_city_name(n)}
    r2=await c.station(q)
    //q={cityName:n}
    console.log(r2)
}




//....
cosnt test2=async ()=>{
    c=create_api()
    fs=require('fs')
    r3=await c.book()
}


