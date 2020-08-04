const R=require('ramda')
const util=require('utility')
const {
    is_s,
    list2nest,
    split_when1,
    seq1,
    index_by_key,
}=require('../../fp')
const {get2sa1}=require('../parse_curl')
const cheerio=require('cheerio')
const {
    conn,
    cache,
}=require("../../cache/redis")

const rxjs=require('rxjs')
const op=require('rxjs/operators')

const {
    interval,
    of,
    from,
    throwError,
}=rxjs

const {
    debounceTime,
    take,
    retry,
    retryWhen,
    map,
    mergeMap,
   // catch,
}=op


charset = require('superagent-charset')
superagent = require('superagent')

asay=x=>x.then(console.log)


//----------------------browser-----------------------------------------------
link=x=>[...x.querySelectorAll('a')].map(y=>({text:y.innerText,url:y.attributes['href'].value}))
td=x=>x.querySelector('td').innerText
td1=cc=>[...cc.childNodes].map(x=> x.nodeType==3 ? x.textContent.trim() : link(x).flat())
parse_list=a=>[...a.querySelectorAll('td')].map(td1)
start=()=>{
    a=document.querySelector('table tbody')
    d=parse_list(a)
    return d
}
//----------------------browser-----------------------------------------------



const format_d=(d)=>{
    host="http://www.dodobook.com/"
    d1=list2nest()(d)
    d2=Object.entries(d1)
        .map(([k,v])=>v.filter(x=>!is_s(x)).map(x=>({...x[0],name:k})))
        .flat()
        .map(({url,...c})=>({url:host+url,...c}))
    return d2
}

const parse_html=(t)=>{
    $=cheerio.load(t)
    return $('#main').html()
}


CURL=`curl 'http://www.dodobook.com/index.php?id=books/maozedongxuanji/100' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0' -H 'Accept: */*' -H 'Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2' --compressed -H 'Referer: http://www.dodobook.com/index.php?id=books/maozedongxuanji/100' -H 'Connection: keep-alive' -H 'Cookie: Hm_lvt_06fae602ae7b751d3611d927ad3d9a26=1577674613; Hm_lpvt_06fae602ae7b751d3611d927ad3d9a26=1577694645' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'`


let {headers}=get2sa1(CURL)
const get=(u)=>superagent.get(u).set(headers)

del_h=async (c,name='mx_ok')=>{
    //let vv=await c._hvals(name)
    let a=await c._hkeys(name)
    return c._hdel(name,a)
}

start=async ()=>{
    c=conn()
    save=(k,v)=>c._hset("mx",k,v)
    d0=await util.readJSON('list.json')
    d1=format_d(d0)
    d2=index_by_key('url')(d1)
    get_d2=R.map(R.prop(R.__,d2))
    next=x=>console.log(">>>")
    get1=async ({url,text,name},x) => {
            let u1=url.replace('../','')
            console.log(x,u1,'start')
            try{
                r=await get(u1)
                console.log(x,r.ok)
                let html=parse_html(r.text)||""
                c._hset("mx_data",url,html)
                c._sadd('mx_ok',url)
                c._srem('mx_fail',url)
                return of(r)
            }catch(e){
                console.log('zzzzzzzzzzzzzzzzzzz')
                c._sadd('mx_fail',url)
                throw e
                //return throwError(url)
            }
    }
    error=async (x)=>{
       // ddd=x
        console.log('-----------------------eeeee------------\n')
        //console.log('fail',x)
        console.log('fail',x.status,x.response.request.url)
        // console.log(x)
        // let uu=await c._SMEMBERS('mx_fail')
        // let u1=get_d2(uu)
        // console.log(u1)
         console.log('-----------------------eeeee------------\n')
    }

    complete=async ()=>{
        let aa=await c._hkeys('mx_data')
        //htmls=await c._hmget('mx_data',d1.map(x=>x.url))
        //c._hgetall('mx_data')
        let bb=await c._SMEMBERS('mx_fail')
        let cc=await c._SMEMBERS('mx_ok')

        //console.log('data',aa)
        //console.log('ok',cc)
        console.log('fail',bb)
    }
    interval(1000)
    .pipe(
        take(d1.length),
        mergeMap(x=>get1(d1[x],x)),
        retry(1)
    )
    .subscribe({
         next,
         error,
         complete,
     })
    //seq1(get,console.log,d1)
}

