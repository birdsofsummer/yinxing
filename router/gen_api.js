const R=require('ramda')
const fs=require('mz/fs')
const utility=require('utility')

const apply_api=(api=[],router={})=>{
    for (
        let {
        name,
        path,
        method='all',
        validator,
        middleware,
        role,
        fn
    } of api){
        let m_ok = /get|put|delete|post/i.test(method)
        let m = m_ok ?  method.toLowerCase() : 'all'
        router[m](name||path,...validator,...middleware ,fn)
    }
    return router
}

/*
 *
"user.js"
module.exports={list,insert,remove,update}

gen('user')

api.js
const user=require('./user')
const api=[
    {
        name:"insert",
        role:[],
        method:"all",
        validator:[],
        middleware:[],
        fn:user.insert
     },
]

生成crud
再稍微改改就行了。。。

 * */



const gen=(
    file='progress',
    role=['admin'],
    file1='api.js',
    method="all",
    middleware=[],
    validator=[],
    config={},
)=>{
    let p=fs.realpathSync('.')
    let exist=fs.existsSync(path.resolve(p,file+".js"))
    console.log(p)
    if (!exist){
        throw "???"
    }
    let p1=path.resolve(p,file)
    let p2=path.resolve(p,file1)
    console.log(p1,"->",p2)
    let a=require(p1)
    let z=R.toPairs(a).map(([k,v])=>({
        name:k,
        path:k,
        method,
        middleware,
        validator,
        config,
        role,
        fn:`@${file}.${k}@`})
    )
    let s=JSON.stringify(z,null,'\t')
        .replace(/"@/g,'')
        .replace(/@"/g,",")
    let s0=`
const R=require('ramda')
const Router = require('koa-router')
const {apply_api}=require('yinxing/router')
const ${file}=require('./${file}')

const router = new Router({
    prefix: '/api',
})
const api=`
let kk=`
const guest=[]
const admin = ` + JSON.stringify(R.keys(a),null,'\t') +
`
apply_api(api,router)

module.exports={
    router,
}

`
    const s1=s0+s+kk
    fs
    .createWriteStream(file1)
    .write(s1)
    console.log(file1)
}


module.exports={
   gen,
   apply_api,
}

