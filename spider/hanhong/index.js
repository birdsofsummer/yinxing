//http://www.hhax.org/p.html?id=
//http://bjhhaxcsjjh.n.gongyibao.cn/g.html?id=c97033d8-0d74-4762-8f5f-7ade64754536&URLparamName=%E6%8D%90%E8%B5%A0%E6%9F%A5%E8%AF%A2

process.env.Prefix='cross'

const moment=require('moment')
const superagent=require('superagent')
const R=require('ramda')
const _=require('lodash/fp')
const utility=require('utility')
const d3=require('d3')
const cos=require('../../cos')
const {URLSearchParams}=require('url')

const qs=(q={})=>new URLSearchParams(q).toString()


const year=x=>moment(x).format('YYYY-MM-DD')
const after=(x,start='2020-01-01')=>moment(x).unix()>moment(start).unix()
const now=()=>moment().format('YYYY-M-D H:m:s')
const day=(d="2020-01-01")=>moment(d).format('YYYY-M-D H:m:s')
const days_ago=(n=1)=>moment().add(-n,'days').format('YYYY-M-D H:m:s')
const hours_ago=(n=1)=>moment().add(-n,'hours').format('YYYY-M-D H:m:s')
const min_ago=(n=1)=>moment().add(-n,'minutes').format('YYYY-M-D H:m:s')
const sec_ago=(n=1)=>moment().add(-n,'seconds').format('YYYY-M-D H:m:s')



const sleep=(n=1)=>new Promise((a,b)=>setTimeout(a,n*1000))
//const [max,min,mean,sum,n]=normal(d)
const normal=(y=[])=>[d3.max,d3.min,d3.mean,d3.sum,R.length].map(x=>x(y))

const normal1=(x=[])=>({
    max:d3.max(x),
    min:d3.min(x),
    mean:d3.mean(x),
    sum:d3.sum(x),
    n:R.length(x),
})


const mini=R.project([ "projectTitle", "payTime", "donationName", "amount", "userRemark" ])
const cat=R.compose(
        R.map((v,k)=>R.sum(R.pluck('amount')(v))),
        R.groupBy(x=>x.projectTitle)
     )

const cat1=R.compose(
        R.map((v,k)=>R.length(v)),
        R.groupBy(x=>x.projectTitle)
)

const format_data=_.map(({payTime,amount})=>[year(payTime),amount])

const calc=(d2=[])=>{
        let g=_.groupBy(x=>x[0])(format_data(d2))
        return  _.map(x=>{
               let ii=x.map(([a,b])=>b)
               let sum=_.sum(ii)
               //const [max,min,mean,sum,n]=normal(ii)
               //return  [x[0][0],sum,mean,n,max,min]
               return  [x[0][0],sum]
        })(g)
}

const analy=({data,...d})=>{
    let m=R.pluck('amount',data)
    let d1={
        ...d,
        data:mini(data),
        calendar:calc(data),
        cat:cat(data),
        normal:normal1(m),
    }
    return d1
}




const API={
    selectSimpleByPage:{
        //   /api/trade/trade/jet/selectSimpleByPage?query%5BpageNo%5D=1&query%5BpageSize%5D=20&query%5BpayState%5D=1&query%5BstartDate%5D=2019-11-3%2000%3A00%3A00&query%5BendDate%5D=2020-2-3%2016%3A52%3A41&pageNo=0
        //pageNo=4&pageSize=20&payState=1&startDate=2019-11-03%2000:00:00
        url:"http://bjhhaxcsjjh.n.gongyibao.cn/api/trade/trade/jet/selectSimpleByPage",
        method:"get",
        query :{
                pageNo: "1",
                pageSize: "20",
                payState: "1",
                startDate:days_ago(),   //"2019-11-3 00:00:00",
                endDate: now(),         //"2020-2-3 14:3:59"
        },
        data:{},
    }
}

const cookie="SERVERID=db19e4a69cc6f7462a2c5986f57bc7d6|1580719295|1580719214; login_state=false; token=efaea9a3-ed0d-4bf6-a5ac-ac0db744de97"
const HEADERS= {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Pragma": "no-cache",
        'X-Requested-With':'XMLHttpRequest',
        "Cache-Control": "no-cache",
        "referrer": "http://bjhhaxcsjjh.n.gongyibao.cn/g.html?id=c97033d8-0d74-4762-8f5f-7ade64754536&URLparamName=%E6%8D%90%E8%B5%A0%E6%9F%A5%E8%AF%A2",
        "X-token": "ed5d8c39-4841-486b-bf0c-0a6aae7731c6",
        "Cookie":cookie,
}

const create_api=(a=API,h=HEADERS)=>{
    let o={}
    for (i in a){
        let {url,method,query,data}=a[i]
        o[i]=(q={},d={})=>superagent[method](url)
            .set(h)
            .type('json')
            .query({...query,...q})
            .send({data,...d})
    }
    return o
}


const get_summery=async (arg={
        startDate:day("2020-01-01"),
        endDate:now(),
        pageNo:0,
    })=>{
    const c=create_api()
    let r1=await c.selectSimpleByPage({pageNo:0,...arg})
    return r1.body
}



// n页
const start=async (arg={})=>{
    const c=create_api()
    let q={pageNo:0,...arg}
    let r=await c.selectSimpleByPage(q)
    let {
        statusMessage,
        dataPoints:{
            pages,
            list,
            customerTotal,
    }}=r.body
    console.log(pages)

    if (statusMessage!='成功') {
        console.log(r.body)
        throw r.body
    }

    let o=[list]
    let err=[]
    for ( i=1; i<pages; i++){
        try{
            console.log(i,"/",pages)
            let r1=await c.selectSimpleByPage({pageNo:i,...arg})
            console.log(i,r1.ok)
            let r2=r1.body.dataPoints.list
            o.push(r2)
        }catch(e){
            console.log(e)
            err.push(i)
        }finally{
            console.log(i,'done')
        }
        //await sleep(1)
    }

    console.log('done!')
    return {summery:customerTotal,data:R.flatten(o),err}
}


const get_old=async ()=>{
    let r=await utility.readJSON('./data/han.json')
    //let r=await superagent.get(SERVER_FILE).type('json')
    //return r.body
    return r
}

const save_data=async (d1={})=>{
    await utility.writeJSON('./data/han.json',d1)
    //let cc=await cos.upload_s(d1,"/cross/hanhong.json")
    let cc=await cos.slice_upload('./data/han.json',"/cross/hanhong.json")
    //console.log(cc)
    console.log('update done!')
}

const update=async ()=>{
    const SERVER_FILE="https://ttt-1252957949.cos.ap-hongkong.myqcloud.com/cross/hanhong.json"
    console.log('get cos')
    let d=await get_old()

    //summery,data,calendar,cat,normal
    let startDate=d.data[0].payTime

    console.log('get new data')
    let {data}=await start({startDate})

    console.log(data)

    console.log("get_summery")
    let r2=await get_summery()
    let s=r2.dataPoints.customerTotal
    console.log(s)
    let d1=analy({data:R.concat(data,d.data),summery:s})
    console.log('now refresh')
    await save_data(d1)
    console.log('finish')
    return d1
}


update()


const test=async ()=>{
    let d=await start()
    let {summery,data,err}=d
    let m=R.pluck('amount',data)
    let t=normal(m)
    console.log(t)

    let d1={
        summery,
        data:mini(data),
        calendar:calc(data),
        cat:cat(data),
        normal:normal1(m),
    }
   //[ 37650, 0.01, 188.6838088235294, 769829.94, 4080 ]
    utility.writeJSON('data/hanhong.json',d)
    utility.writeJSON('data/han.json',d1)

    let r=await cos.upload_s(d1,"/cross/hanhong.json")
    console.log(r)
}


/*
{
  Location: 'ttt-1252957949.cos.ap-hongkong.myqcloud.com/cross/hanhong.json',
  ETag: '"beb09ae6a1dbacfa6726e6035b5b8b75"',
  statusCode: 200,
  headers: {
    'content-length': '0',
    connection: 'keep-alive',
    date: 'Mon, 03 Feb 2020 12:25:31 GMT',
    etag: '"beb09ae6a1dbacfa6726e6035b5b8b75"',
    server: 'tencent-cos',
    'x-cos-request-id': 'NWUzODExMTBfZGQ5MTI3MDlfNDYzMV9hM2IyYWY='
  }
}
*/

/*

{
  statusCode: 0,
  statusMessage: '系统错误，请联系管理员',
  resultCode: null,
  resultMessage: null,
  dataPoints: null,
  errorType: 0
}



    const {
      statusCode,
      errorType,
      statusMessage,
      resultCode,
      resultMessage,
      dataPoints: {
            pageNum,
            pageSize,
            size,
            startRow,
            endRow,
            total,
            pages,
            list,
            prePage,
            nextPage,
            isFirstPage,
            isLastPage,
            hasPreviousPage,
            hasNextPage,
            navigatePages,
            navigatepageNums,
            navigateFirstPage,
            navigateLastPage,
            customerTotal: {
              income,
              expenditure,
              avgAmount,
              expenditureCount,
              incomeCount,
              sumAmount,
            },
            firstPage,
            lastPage,
        }=r.body
*/

