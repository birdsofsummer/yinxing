const {
    SERVER,
    H,
    HEADERS,
    PROVINCE,
    JOB,
}=require("./consts")

const utility=require('utility')
const superagent=require("superagent")
const R=require("ramda")
const readline=require('readline')
const fs=require("fs")


async function *post (arg={u:"https://www.baidu.com",d:{}}){
    a=superagent.agent()
    while(true){
        console.log('zzzzzzzzzz',arg)
        let {u,d}=arg
        try{

            let r=await a
                .post(u)
                .send(d)
                .set(HEADERS)
                .type('form')
            a._saveCookies(r)

            console.log('1111',r.request.url,r.request._query,r.request._data)
            console.log("1111",r.req._header,)
            console.log('2222',r.header)
            arg=yield r

        }catch(e){
             ee={headers:e.response.header}
             a._saveCookies(ee)
             arg=yield e
        }
    }
}

wrap=(u="",d={})=>{
    c=post({u,d})
    return async (u1,d1)=>{
        return await c.next({u,d}).value
    }
}

test1=async ()=>{
    f=()=>({
        u:"localhost:3000?x=1&y=2",
        d:{time:now()}
    })
   c=post(f())
   await c.next(f())
   await c.next(f())
   await c.next(f())
}

test=async ()=> {
   arg={u:"https://www.baidu.com",d:{}}
   arg1={u:"https://www.qq.com",d:{}}
   c=post(arg)
   await c.next(arg)
   await c.next(arg1)
}

