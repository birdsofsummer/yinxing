const {fromEntries}=Object
const UA1="Mozilla/5.0 (Linux; Android 6.0; 1503-M02 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 MicroMessenger/6.3.25.861 NetType/WIFI Language/zh_CN"
const UA2="Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"

const get_headers=(u="")=>({
    "Origin": new URL(u).origin,
    "Referer":u,
    "User-Agent":UA1,
    "Accept":" text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language":" zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Accept-Encoding":" gzip, deflate, br",
    "Content-Type":" application/x-www-form-urlencoded",
    "Connection":" keep-alive",
    "Upgrade-Insecure-Requests":" 1",
    "Pragma":" no-cache",
    "Cache-Control":" no-cache",
})

const attr=(z)=>fromEntries([...z.attributes].map(({name,value})=>[name,value]))


const encode=(b)=>{
    let pwd=b.get('password')
    if (pwd){
        b.set('password',btoa(pwd))
    }
}

const parse_form=(form= document.querySelector('form'),fn=encode)=>{
    let b=new FormData(form)
    fn(b)
    let o=fromEntries([...b])
    let d=attr(form)
    let query=new URLSearchParams(b).toString()
    let is_get=d.method == "get" || !d.method
    let body = is_get ? null : query
    let qs=is_get ? "?"+query : ""
    let r={
        is_get,
        ...d,
        url:d.action+qs,
        data:b,
        json:o,
        get ok(){
            return form.checkValidity()
            //[...form].every(x=>x.checkValidity())
        },
        body,
    }
    r.__proto__.toString=()=>JSON.stringify(o)
    return r
}

const submit_form=(form = document.querySelector('form'),fn=encode)=>{
    const {
        url,
        method="get",
        data,
        body,
    }=parse_form(form,fn)
    return fetch(
        url,
        {
        headers:get_headers(url),
        method:method,
        body,
    })
    .then(x=>x.text())
}

