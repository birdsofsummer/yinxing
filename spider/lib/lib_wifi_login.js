const superagent=require('superagent')
const R=require('ramda')
const util=require('utility')
const fs=require('mz/fs')
const cheerio=require('cheerio')

const {
    URL,
    URLSearchParams,
    Url,
    domainToASCII,
    domainToUnicode,
    fileURLToPath,
    format,
    parse,
    pathToFileURL,
    resolve,
    resolveObject
}=require('url')

const {
    map_text,
}=require('../parse_html')

const {
    to_qs,
    get_headers,
}=require('../ajax')


const {
    LIB_USERNAME="*******",
    LIB_PASSWORD="*******",
    LIB_LOGIN_PAGE="http://...",
}=process.env

const CONFIG={
    'username':LIB_USERNAME,
    'password':util.base64encode(LIB_PASSWORD),
    'continueLogin':"1",
    "checkbox":"on",
}

const parser=(u="",html="",)=>{
    const $=cheerio.load(html)
    const form=$('form')
    const action=form.attr('action')
    const method=form.attr('method')
    const input=form.find('input')
    const o={}
    for (let i=0;i<input.length;i++){
         let name=input.eq(i).attr('name')
         let value=input.eq(i).attr('value')||""
         o[name]=value
    }
    let o1=R.merge(o,CONFIG)
    return {
        url:resolve(u,action),
        method,
        action,
        data:to_qs(o1),
    }
}

const parser1=(html="")=>{
   const $=cheerio.load(html)
   const t=$('table').eq(0)
   const td=t.find('td div')
   const bi=$('#balance_in').text()
   const bo=$('#balance_out').text()
   const a=map_text($('#user_name'))
   const td1=map_text(td).slice(0,-1)
   const oo=R.flatten([a,td1,bi,bo]).join(" ")
   return oo
}


const get_cookie1=(r)=>r.request.cookies  //agent
const get_cookie=(r)=>r.header['set-cookie']
            .map(x=>x.split(';')[0])
            .join(' ;')

say_cookie=(r,i=0)=>{
    console.log(i,"----------\n")

    c_0=r.request ? r.request.cookies : ""
    console.log('------>',c_0)

    console.log("<-------",r.headers['set-cookie'])
 // console.log("<-------",r.header['set-cookie'])
}

const login=async (i=0)=>{
        const agent = superagent
        console.log('第',i,"次")

        if (i>100) {
            throw "服务器好像不行...稍后重试"
        }

        u=LIB_LOGIN_PAGE

        r=await agent.get(u)
        c1=get_cookie(r)

        r1=parser(u,r.text)
        //console.log('<<<<',r1)

        r2=await agent[r1.method](r1.url)
            .set("Cookie",c1)
            .set(get_headers(r1.url))
            .type('form')
         // .redirects(0)
            .send(r1.data)
        c2=get_cookie(r2)
        //console.log('c1<<<<',c1)
        console.log('c2<<<<',c2)
        re=r2.redirects
        console.log(re)
        if (re.length>0){
            let u=r2.redirects[0]
            r3=await agent.get(u)
                .set("Cookie",c2)
                .set(get_headers(u))

            c3=get_cookie(r3)
            console.log('c3<<<<',c3)
            console.log('done!')
        }else{
            setTimeout(login,500,i+1)
        }


}


login1=async (i=0,a=superagent.agent())=>{
   console.log('第',i,"次")
   if (i>100) {
       throw "服务器好像不行...稍后重试"
   }

   u1=LIB_LOGIN_PAGE
   r1=await a.get(u1)

  // say_cookie(r1,1)

   let {url:u2,data,method}=parser(u1,r1.text)


    {
       //手动跳
       done=false
       try{
           r2=await a.post(u2)
                    .redirects(0)
                    .send(data)
           say_cookie(r2,2)
           a._saveCookies(r2)
           console.log('zzzzzzzzz',r2.status,r2.redirects)
        }catch(e){
            if (e.status == 302){
                h=e.response.header
                ee={headers:h}
                a._saveCookies(ee)
                u3=h.location
                r3=await a.get(u3)
                done=true
                console.log(u3,r3.status)
                console.log(":::",parser1(r3.text))
                console.log('done!')
            }
        }finally{
            if (!done){
                login1(i+1)
            }
        }

    }

//自动跳
//    {
//       r2=await a.post(u2)
//                //.redirects(0)
//                .send(data)
//       say_cookie(r2,2)
//       a._saveCookies(r2)
//       console.log(r2.redirects)
//       if (r2.redirects.length>0) {
//           u3=r2.redirects[0]
//           r3=await a.get(u3)
//           say_cookie(r3,3)
//           console.log('done')
//       }else{
//           login1(i+1)
//       }
//
//    }
}

login1()

