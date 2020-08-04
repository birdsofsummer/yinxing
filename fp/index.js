const R=require('ramda')
const moment=require("moment")
const fs=require('mz/fs')
const crypto = require('crypto');
const assert=require('assert')

const {
    Url,
    parse,
    resolve,
    resolveObject,
    format,
    URL,
    URLSearchParams,
    domainToASCII,
    domainToUnicode,
    pathToFileURL,
    fileURLToPath,
    protocol,
    slashes,
    auth,
    host,
    port,
    hostname,
    hash,
    search,
    query,
    pathname,
    path,
    href
}=require("url")

const {promisify}=require('util')

//---------------------------------------------------------------------------------
const {
    assign,
    create,
    defineProperties,
    defineProperty,
    entries,
    freeze,
    fromEntries,
    getOwnPropertyDescriptor,
    getOwnPropertyDescriptors,
    getOwnPropertyNames,
    getOwnPropertySymbols,
    getPrototypeOf,
    is,
    isExtensible,
    isFrozen,
    isSealed,
    keys,
//    length,
//    name,
    preventExtensions,
    prototype,
    seal,
    setPrototypeOf,
    values,
}=Object

const now=moment.now
const it=x=>x
const say=x=>(...y)=>(console.log(x,...y),y)
const say1=(x="")=>(y)=>(console.log(x,y),y)
const say2=(x="")=>async (y)=>(console.log(x,await y),y)

const throw_it=(x="")=>{throw x}



//  -----------------------------------------------------------------------------------


const is_in=([a,b])=>x=> (x<=b) && (x>=a)
const is_in_unix=(d=[])=>is_in(d.map(x=>moment(x).unix()))

const {isArray} =Array
const is_arr=isArray
const is_map=(x="")=>x.constructor == Map

const is_null=x=>x==null
const is_un=x=>x==undefined
const is_nil=x=>is_null(x) || is_un(x)

const is_int=Number.isInteger
const is_nan=Number.isNaN
const is_number=(x=0)=>is_arr(x) ? false :x>0 || x<0 ||x==0

const is_s=(s="")=>is_nil(s)? false : s.constructor == String

const is_oid=(s="")=>is_s(s) ? s.length==12 : is_number(s) ? true :false

const is_fn=o=>o.constructor==Function
const is_o=(s="")=>R.isNil(s) ? false : s.constructor == Object

const is_img=(name="1.jpg")=>/jpeg|jpg|png|gif/.test(name)

const is_promise=x=>x.constructor == Promise



const get_fn_child=(o={})=>Object.entries(o).filter(([k,v])=>is_fn(v))
const get_fn_child_key=(o={})=>get_fn_child(o).map(([k,v])=>k)


//  -----------------------------------------------------------------------------------
const uniq=(...arg)=>[...arg.reduce((a,b)=>(b.map(x=>a.add(x)),a),new Set())];

const diff=R.pipe(R.difference,R.uniq)

//  -----------------------------------------------------------------------------------

const rnd=(n=1)=>Math.floor(Math.random()*n)



function *loop (f,x=""){
    let d=x
    while(true){
        let r=f(d)
        yield r
        d=r
    }
}

async function *loop1 (f,x=""){
    let d=x
    while(true){
        let r=await f(d)
        yield r
        d=r
    }
}

const loop2=(f,n=1)=>R.pipe(...R.repeat(f,n))

const iter=(f,x="")=>{
    let g=loop(f,x)
    return ()=>g.next().value
}

const iter1=(f,x="")=>{
    let g=loop1(f,x)
    return async ()=> (await g.next()).value
}

const test_iter=()=>{
    f=x=>x+1
    g=iter(f,0)
    a=g()
    b=g()
    console.log(a,b)
    r1=R.range(1,100).map(g)
    r2=R.range(1,100).map(g)
    console.log(r1)
    console.log(r2)
}

const test_iter1=async ()=>{
    f=async x=>x+1
    g=iter1(f,0)

    a=await g()
    b=await g()
    console.log(a,b)
    r=await Promise.all(R.range(1,100).map(g))
    console.log(r)
}


function rainbow(arr=[]){
   let index=0
   let l=arr.length
   function* foo() {
      while (true) {
          let i= index <l ? index++ : 0
          yield arr[i];
      }
    }
    iterator = foo()
    return ()=>iterator.next().value
}

function* shuffle(arr=[]) {
    let l=arr.length
    while (true) {
          yield arr[rnd(l)];
    }
}



const seq_word=()=>R.range(65,65+62)
    .map(x=>String.fromCharCode(x))
    .filter(x=>/[a-zA-Z]/.test(x))
    .sort()
const lower_word=()=>R.takeLast(26)(seq_word()) //[a..z]
const upper_word=()=>R.take(26)(seq_word())     //[A..Z]
const seq_word1=()=>R.concat(lower_word(),upper_word()) //[a..Z]

const rand_word=(n=1)=>{
    let dict=seq_word()
    let z=shuffle(dict)
    return R.repeat(1,n).map(x=>z.next().value).join('')
}
const rand_word1=(n=1)=>Math.random().toString(36).substring(2).slice(0,n)

const rand_number=(n=1)=>{
    let z=shuffle(R.range(0,10))
    return R.repeat(1,n).map(x=>z.next().value).join('')
}

//-----------------------------------迭代器-----------------------------------------------
const forEach=f=>(o={})=>entries(o).map(f)
/*
d = [] -> f(v,i,d)
d = {} -> f(v,k,d)
d={x:1,y:2}
d1=[1,2,3]

each((v,k)=>([k+"cc",v+10]))(d) -> { xcc: 11, ycc: 12 }
each(x=>x+1)(d1) -> [2,3,4]
*/
const each=f=>(o={})=>is_arr(o) ? o.map(f) :fromEntries(entries(o).map(([k,v],o)=>f(v,k,o)))
const drop_id=R.pickBy((v,k)=>k!="_id")
const drop_keys=(arr=[])=>R.pickBy((v,k)=>!arr.includes(k))

// json 换key
const map_key=(f)=>(o={})=>fromEntries(entries(o).map(([k,v],i)=>[f(k,i),v]))
const map_keys=(f)=>(arr=[])=>arr.map(map_key(f))
const map_keys_by_dict=(o={})=>(arr=[])=>arr.map(map_key(x=>o[x]||x))


//len(keys)<52
//{xx:1,yy:2,zz:3,...} -> {a:1,b:2,c:3,...}
const minifi_keys=R.pipe(R.values,R.zip(seq_word1()),R.fromPairs)


//----------------------------------------------------------------------------------

//f=(context,next)=>{...;next()}
const compose=([h,...t])=>ctx=>{
    if (!h) { return ; }
    h(ctx,()=>compose(t)(ctx))
}

//f=async(ctx,next)=>{await g(ctx),await next()}
//compose([f1,f2,...,fn])
const compose1=([h,...t])=>async ctx=>{
    if (!h) { return ; }
    await h(ctx,()=>compose1(t)(ctx))
}


const test_compose1=async()=>{
   g=()=>new Promise((a,b)=>a(123))
   ctx={a:1,b:2,f:console.log}
   f1=async (ctx,next)=>{
       ctx.a+=10
       await next()
   }
   f2=async (ctx,next)=>{
       ctx.f("dddd")
       //await next()
   }
   f3=async (ctx,next)=>{
       ctx.b+=2
       await next()
   }
   f4=async (ctx,next)=>{
       ctx.c=await g()
       await next()
   }
   f=compose1([f1,f2,f3,f4])
   await f(ctx)
   console.log(ctx)
   return ctx
}


//中间件通用写法
create_middleware=(
    fn=console.log,
    p=(x)=>true,
    fail=console.log
) => async(c,n) =>{
    try{
       let r=await fn(c)
       if (p(r)){
           await n()
       }else{
           fail(c,n)
           console.log('不走了')
       }
    }catch(e){
        fail(c,n,e)
    }finally{
        console.log(fn.name,"done")
    }
}

//-------------
const arr2reg=(arr)=>new RegExp(arr.join("|"),"i");
const json2s=(a="=",b=" ;")=>(c={})=>R.values(R.mapObjIndexed((v,k)=>k+a+v)(c)).join(b)
const json2cookie=(c={})=>R.values(R.mapObjIndexed((v,k)=>k+"="+v)(c)).join("; ")
const api_gen=(configs={},http)=>R.mapObjIndexed(({url,method,params,data,},k,o)=>(d={})=>http[method.toLowerCase()||"get"](url,{...params,...d}))(configs)

const sleep=(n=1)=>new Promise((f1,f2)=>setTimeout(f1,n*1000))




//--------------------------------------------------------------------

const get_proto_keys=(c)=>getOwnPropertyNames(c.__proto__)
    .filter(x=>!/constr|impl/i.test(x))
    .sort()

const DEFAULT_PROTO=[
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

const get_proto_keys1=c=>get_proto_keys(c)
    .filter(x=>!/^__/.test(x))
    .filter(x=>!DEFAULT_PROTO.includes(x))

const has_own_p=(c={})=>!R.isEmpty(get_proto_keys1(c))

const test_proto=(c)=>(d="")=>get_proto_keys(c).forEach(x=>c[x](d).then(y=>fs.createWriteStream('x'+".json").write(JSON.stringify(y,null,'\t'))))

const to_promise=fn=>(...args)=>new Promise((resolve,reject)=>fn(...args,(err,data)=>err? reject(err) : resolve(data)))


const promisify_all_arr=(c,m=["ListFunctions"],fn=promisify_d)=>{
    m.forEach(x=>{
        c["_"+x]=fn(c[x].bind(c))
    })
    return c
}

const promisify_all=(c={},fn=promisify)=>{
    if (has_own_p(c)){
        R.mapObjIndexed((v,k,o)=>o.__proto__["_"+k]=promisify(v.bind(c)))(c.__proto__)
    }else{
        let arr=get_fn_child_key(c)
        if (R.isEmpty(arr)) {
            return c
        }
        return promisify_all_arr(c,arr,fn)
    }
    return c
}


const promisify_all1=(c)=>{
    const p=c.constructor.prototype
    const pc=c.__proto__
  //promiseify=([x,y])=>p["_"+x]=to_promise(y.bind(cos))
    const promiseify=([x,y])=>pc["_"+x]=to_promise(y.bind(c))
    forEach(promiseify)(p)
    return c
}


const promisify1=(c)=>{
    const promiseify=([x,y])=>c["_"+x]=to_promise(y.bind(c))
    forEach(promiseify)(c)
    return c
}


//fn({},cb) -> fn({}).then(cb)
const promisify_d=fn=>(arg={})=>new Promise((a,b)=>fn(arg,(e=null,d={})=>e ? b(e):a(d)))


const promisify_all_child=(o={},fn=promisify)=>{
    let arr=get_fn_child_key(o)
    promisify_all_arr(o,arr,fn)
    return o
}


async function* lazy(f,d=[],n=2,t1=0,t2=0){
    let l=d.length
    if (l==0) return
    let d1=R.splitEvery(n,d)
    let offset=0
    for (j=0; j<d1.length; j++){
        for (let i=0; i<n && offset < l ; i++){
            try{
                let r= await f(d1[j][i])
                yield r
            }catch(e){
                console.log(e)
                //cb?
            }finally{
                console.log(offset,"/",l,j,i)
            }
            await sleep(t1)
            offset++
        }
        await sleep(t2)
    }
    console.log('done')
}



async function* lazy1(f,d=[],n=2,t=0){
    let l=d.length
    if (l==0) return
    let d1=R.splitEvery(n,d)
    let offset=0
    for (j=0; j<d1.length; j++){
        let r = await Promise.all(d1[j].map(f))
        console.log(offset,"/",l,j)
        yield r
        await sleep(t)
    }
    console.log('done')
}


async function *time_machine(fn,z,check){
    while(true){
        if (check(z)){
            yield z
        }else{
            z = await fn(z)
            yield z
        }
    }
}


const auto_update=async (fn,z,check)=>{
    let s=time_machine(fn,z,check)
    let d=await s.next()
    return d.value
}


const para=(f,d=[])=>Promise.all([...d].map(x=>f(x)))

const seq=async(f,cb=console.log,d=[],n=2,t1=0,t2=0,)=>{
   let r=[]
   for await (let i of lazy(f,d,n,t1,t2)) {
       try{
           cb(i);
       }catch(e){
           console.log(e)
       }finally{
           r.push(i)
       }
   }
   return r
}

const seq1=async (f,cb=console.log,d=[],n=2,t=1)=>{
   let r=[]
   for await (let i of lazy1(f,d,n,t)) {
       try{
           i.map(cb);
       }catch(e){
           console.log(e)
       }finally{
           r.push(i)
       }
   }
   return r.flat()
}

const test_seq=async ()=>{
    f=x=>x+200
    d=R.range(1,30)
    n=10
    t1=1
    t2=2

    cb=x=>console.log("<<<<",x)
    await seq(f,cb,d,n,t1,t2)
    console.log('dddd!')

    cb1=x=>console.log("####",x)
    await seq1(f,cb1,d,n,t1)
    console.log('eeee!')
}

const chunk=(a=10,b=3)=>R.range(0,a+1).filter(x=>x%b==0).map(x=>[x,Math.min(a,x+b-1) ])
const chunk1=(a=10,b=3)=>R.range(0,a).filter(x=>x%b==0).map(x=>[x,x+b])



const split_file=(file,size=1e5)=>Promise.all(
    chunk(file.size,size)
    .map(([a,b])=>file.slice(a,b))
    .map(read)
)
const split_file1=(file,size=1e5)=>chunk(file.size,size)
    .map(([a,b])=>'bytes ' + a + '-' + b +'/'+ file.size)

const split_file2=async (file,size=1e5)=>R.zip(
    await split_file(file,size),
          split_file1(file,size),
)


///

const to_json=(d='{}',d0={})=>{
    if (R.isNil(d)) return {}
    if (is_o(d)){ return d}
    try {
        return JSON.parse(d)
    }catch(e){
        console.error("<<<",d)
        return d0
    }
}


const to_string=(o="")=>Object.prototype.toString.call(o)

const to_s=(o={},pretty=false)=> pretty ? JSON.stringify(o,null,'\t') :JSON.stringify(o)

//safe
const to_s1=(o={})=>{
    if (is_s(o)){
        return o
    }
    return JSON.stringify(o,null,'\t')
}


const to_qs=R.pipe(R.map((k,v)=> isArray(k)?  k.join(','):k),R.toPairs,R.map(x=>x.join('=')),x=>x.join('&'))

const qs=(d={})=>new URLSearchParams(d)
const qs1=(u,d={})=>u+"?"+qs(d)


const parse_jsonp=(t="callback({})")=>{
    let j=t.match(/callback\((.*)\)/)
    if (j && j.length>0){
        return to_json(j[1])
    }else {
        console.log(t)
        return {}
    }
}




const write_json=(t={},name="1.json")=>fs
    .createWriteStream(name)
    .write(JSON.stringify(t,null,'\t'))


const cors_headers={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width',
    'access-control-max-age': '1728000',
}

//const whiteHeader=['content-type','content-length','client-ip','age','x-via','last-modified']
const whiteHeader=['content-type']
const headers_filter=(h=whiteHeader)=>(headers={})=>R.pickBy((v,k)=>h.includes(k),headers)
const headers_filter1=headers_filter()

const res_html=(name="./index.html")=> ({
    isBase64Encoded: false,
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: fs.readFileSync(path.resolve(__dirname, name), { encoding: 'utf-8' }),
})

const res_json=(d={})=>({
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {"Content-Type":"application/json; charset=utf-8",...cors_headers},
    "body": JSON.stringify(d,null,"\t")
})


const echo=(...e)=>({
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {"Content-Type":"application/json; charset=utf-8",...cors_headers},
    "body": JSON.stringify(e,null,"\t")
})


function bufferToHex (buffer) {
    return Array
        .from (new Uint8Array (buffer))
        .map (b => b.toString (16).padStart (2, "0"))
        .join ("");
}
const body2hex=(body)=>{
    var arrayBuffer = new TextEncoder().encode (body)
    var hexString = bufferToHex (arrayBuffer);
}


const get_bin=async (u)=>{
    const fetch = require ("node-fetch");
    const r1=await fetch(u)
    const r2=await r1.arrayBuffer()
    const hexString = bufferToHex (r2)
    return hexString
}
const save_bin=(body)=>{
    fs.writeFileSync('cc.acc', body.toString('binary'), { encoding: 'binary'});
}
const isBase64Encoded =(headers)=>/image/.test(headers['content-type'])  //|audio|video
const parse_body1=({body,headers})=>{
    let m=[
        [/image/,x=>x.toString("base64")],
        [/audio/,x=>x.toString('binary')],
        [/text|script/,x=>x.toString("utf-8")],
    ]
    let c=headers['content-type'];
    let m1=m.filter(([k])=>k.test(c))
    let f=m1.length ? m1[0][1] : it
    return f(body)
}
const parse_body=({headers,statusCode,text,body})=>{
    b=isBase64Encoded(headers)
    return {
        isBase64Encoded:b,
        headers: {...headers_filter1(headers),...cors_headers},
        statusCode: statusCode,
        body: parse_body1({body,headers}),
    }
}

const res_proxy=({
_events,_eventsCount,_maxListeners,res,request,req,text,body,files,buffered,headers,header,statusCode,status,statusType,info,ok,redirect,clientError,serverError,error,created,accepted,noContent,badRequest,unauthorized,notAcceptable,forbidden,notFound,unprocessableEntity,type,links,setEncoding,redirects,pipe,
})=> parse_body({headers,text,body,statusCode})


function stringToUint(string) {
    var string = btoa(unescape(encodeURIComponent(string))),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}

function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(atob(encodedString)));
    return decodedString;
}

function uintToString1(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}






const remove_html=(s="")=> s.replace(/<[^>]+>/g, '')
//------------------------------------------------------------------------------------------------------

const clean=R.pickBy((v,k)=>!R.isNil(v))
const join=(d={})=>entries(d).sort().map(x=>x.join('=')).join('&')
const cp=(x={})=>JSON.parse(JSON.stringify(x))

const to_int=(d="0")=>(d &&  /^[+|-]?\d+$/.test(d)) ? +d  :0

const url2qs=(url="")=>R.fromPairs([... new URLSearchParams(parse(url).query)])
const to_json1=(o={})=>JSON.stringify(o,null,'\t')


const base64_clean=(s="")=>s.replace(/^data:image\/\w+;base64,/, "")
const img2base64=b=>Buffer.from(b, 'binary').toString('base64')
const img2base641=R.pipe(img2base64,base64_clean)
const base642img=(s="")=>new Buffer(base64_clean(s), 'base64')


const any_nil=R.any(R.isNil)
//merge_o({x:1},{y:2},{z:3}) -> {x:1,y:2,z:3}
const merge_o=(...x)=>x.reduce(R.merge,{})



// [k1,v2,k2,v2,k3,v3....] -> {k1:v1,k2:v2,k3:v3}
const list2nest=(f=x=>x)=>R.pipe(R.pipe(R.splitEvery(2),R.map(([k,v])=>[k,v.map(f)])),R.fromPairs)

const test_list2nest=()=>{
    a=[1,[10,20],2,[10,20]]
    b=list2nest()(a)
    c=list2nest(x=>x+100)(a)
    console.log(b)
    console.log(c)
    //{ '1': [ 10, 20 ], '2': [ 10, 20 ] }
    //{ '1': [ 110, 120 ], '2': [ 110, 120 ] }
}

// [k1,v1,v2,v3,k2,v1,v2,v3....]
// {k1:[v1,v2,v3],k2:[],...}

const split_when=([h,...t],acc={},k="",fn=is_s)=>{
    if (!h ) return acc
    if (fn(h)) {
        let acc1={...acc,[h]:[]}
        return split_when(t,acc1,h,fn)
    }else{
        let h0=acc[k] || []
        let h1=[...h0,h]
        let acc1={...acc,[k]:h1}
        return split_when(t,acc1,k,fn)
    }
}

const split_when1=(a=[],fn=is_s)=>R.isEmpty(a) ? {} : split_when(a,{},a[0],fn)

const test_split_when=()=>{
    a=["x",[1,2],[3,4],'y',[2,3]]
    //{ x: [ [ 1, 2 ], [ 3, 4 ] ], y: [ [ 2, 3 ] ] }
    r1=split_when(a,{},a[0])
    r2=split_when1(a)
}

const index_by_key=R.compose(R.indexBy,R.prop)

const has_all_keys=(o={},k=[])=>k.every(x=>x in o)
const sort_key=R.compose(R.fromPairs,R.sortBy(R.prop(0)),R.toPairs)
const json2params=(o={})=>new URLSearchParams(o).toString()
const sort_join=R.compose(json2params,sort_key)


const normalize_k=(schema={})=>R.pickAll(R.keys(schema))




// when([>0,<10],(+100),(-100))
const when=(p=[],f1=say('ok'),f2=say('__'))=>R.cond([
        [R.allPass(p),f1],
        [R.T,f2],
])
const pass=(p=[])=>when(p,say('ok'),throw_it)

const all_pass=(p=[])=>async (x="")=>{
   let r=await Promise.all(p.map(f=>(f(x))))
   return r.every(Boolean)
}

//cond([[[x=>x>10,x=>x<100],x=>1+100]])
const cond=(c=[])=>async (x="")=>{
    if (c.length==0) throw x
    for (let [p,f] of c){
        let ok=false
        if (is_arr(p)) {
            ok=await all_pass(p)(x)
        }else{
            ok=await p(x)
        }
        //console.log(x,ok)
        if (ok){
            return f(x)
        }
    }
    return x
}

// when_p([>0,<10],+100,-100)
const when_p=(p=[],f1=say2('ok'),f2=say2("__"))=>cond([
        [all_pass(p),f1],
        [R.T,f2],
])

const pad_s=(s="")=>(x="")=>[s,x].join('')
const pad_e=(s="")=>(x="")=>[x,s].join('')
const pad_a=(a="",b="")=>(x="")=>[a,x,b].join('')

const map_j=(f=say('<<<'))=>(x=[])=>[...x].map(f).join('')
const map_s=(f)=>(s1="-",s2="")=>R.compose( R.join(s2), R.map(f), R.split(s1))

// mongodb $or
const split_o=(o={})=>entries(o).map(([k,v])=>({[k]:v}))
const split_o_clean=(o={})=>entries(o)
    .filter(([k,v])=>v)
    .map(([k,v])=>({[k]:v}))


const test_split_o=()=>{
    const d1={x:1,y:2}
    const d2=[{x:1},{y:2}]
    const r=split_o(d1)
    console.log(r)
}


//[a,b,c,...] -> {a,b,c,...}
const eval_o=(x=[],f=eval)=>fromEntries(x.map(y=>[y,f(y)]))


const test_eval_o=()=>{
   const a=1
   const b=2
   const c=3
   const f=x=>eval(x)
   const d=eval_o(['a','b','c'],f)
   console.log(d)
   //{ a: 1, b: 2, c: 3 }
}


//多参
const pipe=([h,...t])=>(...x)=>{
    if (!h) {
        return x.length==1 ? x[0] : x
    }
    const r=h.length>1 && x.length==1 ? h(...x[0]): h(...x)
    return pipe(t)(r)
}

const add=x=>y=>x+y
const sum=(x=[])=>x.reduce((a,b)=>a+b)

const test_pipe=()=>{

    const add1=(x,y)=>[x+10,y+10] // !!!
    const add2=(x)=>x.map(add(100))
    const add3=n=>x=>x.map(add(n))
    const r=pipe([add1,add1])(0,0)
    //[20,20]
    const r1=pipe([add(1),add(2)])(10)
    //13

    const r2=pipe([add1,add2])(1,2) //[ 111, 112 ]
    const r3=pipe([add1,add2,add3(1000)])(1,2) //[ 1111, 1112 ]
    const r4=pipe([add1,add2,add3(1000),sum,add(10000)])(1,2)
    //12223
    // import numpy as np
    // (np.array([1,2])+10+100+1000).sum()+10000
    const r5=pipe([add3(100)])([1,2,3])
    //[ 101, 102, 103 ]
    //np.array([1,2,3])+100
}



//单参
const pipe1=([h,...t])=>async (x)=>!h ? x : pipe1(t)(h(await x))

// @
const before=(c,...f)=>{
    let kk=Object.keys(c.__proto__)
    kk.forEach((v,k)=>{
        const g=c[v]
        c["_"+v]=R.pipe(...f,g) //单参
    })
    return c
}

const maybe_id=(v,k)=>/id/.test(k)
const pick_id= R.pickBy(maybe_id)


//cross_join()('xyz','123','+-=')
const cross_join=(f=R.join('_'))=>(...x)=>R.liftN(x.length,R.unapply(f))(...x)
const extract=(t1='```javascript',t2='```')=>(d=[])=>R.apply(R.zip)([t1,t2].map(v=>d.map((x,i)=>x!==v?'':i).filter(x=>x))).map(([a,b])=>R.slice(a+1,b)(d))

const test_extract=()=>{
    const d=[1,2,3,"a",11,22,33,"b",4,5,'a',0,'b']
    const r=extract('a','b')(d)
    console.log(r)
    //[ [ 11, 22, 33 ], [ 0 ] ]
}

const stripe=(x="",a='//',e=/^[>|\.]/,)=>!e.test(x)? a+x :x.replace(e,'').trim()

const extract_md=(s="")=>s.split('\n')
    .map(extract)
    .map(y=>y
        .filter(x=>x)
        .map(stripe)
        .join('\n'))
    .join('\n')

//csv2json("x,1,y,2") -> { x: '1', y: '2' }
const csv2json=R.compose(R.fromPairs,R.splitEvery(2),R.split(','))
//format_kv({x:1,y:2}) -> [ { Key: 'x', Value: 1 }, { Key: 'y', Value: 2 } ]
const format_kv=(d={},f=([k,v])=>({Key:k,Value:v}))=>R.toPairs(d).map(f)
//format_kv1()({x:1,y:2}) -> [ { Key: 'x', Value: 1 }, { Key: 'y', Value: 2 } ]
const format_kv1=(title=['Key','Value'])=>R.pipe(R.toPairs,R.map(R.zipObj(title)))



const camel=(x="")=>x.replace(/^\S/,x=>x.toUpperCase())
const camels1=map_s(camel)()
const camels2=map_s(camel)("_")

const test_camel=()=>{
    const s1='xx'
    const s2='Xx'
    const s3='xx-yy'
    const s4="xx_yy"
    const s5='XxYy'
    const r1=camel(s1)
    const r2=camels1(s3)
    const r3=camels2(s4)
    assert.equal(r1,s2)
    assert.equal(r2,s5)
    assert.equal(r3,s5)
}

// ("xxxxx")=>'xx\nxx\nxx\nxx\nx'
const word_break=(a="",sep="\n",step=2)=>[...a].map((x,i)=>a.slice(i,i+step)).join(sep)
// (2,"xxxxx") => ...
const word_break1=R.pipe(R.splitEvery(R.__),R.join("\n"))


const has_child=(o={},c="child")=>{
      let o1=R.propOr([],c)(o)
      return !R.isEmpty(o1)
}

const tree_add_pid=(oo={},p="pid",g="gid",c="child",)=>{
    let o=cp(oo)
    const r=(x={})=>{
        let o1=R.propOr([],c)(x)
        if (!R.isEmpty(o1)){
            for (let i of o1){
                i[p] = x[g]
                r(i)
            }
        }
    }
    r(o)
    o[p]=o[g]
    return o
}

const test_tree_add_pid=()=>{
    let o1={
        x:"1",
        gid:"1",
        child:[
            {x:'1-1',gid:"1-1",},
            {x:'1-2',gid:"1-1",},
            {x:'1-3',gid:"1-1-3",child:[ {x:"1-3-1",gid:"1-3"},] },
        ],
    }
    o3={
      x: '1',
      gid: '1',
      child: [
        { x: '1-1', gid: '1-1', pid: '1' },
        { x: '1-2', gid: '1-1', pid: '1' },
        { x: '1-3', gid: '1-1', child: [{ x: '1-3-1', gid: '1-3', pid: '1-1-3' } ], pid: '1' }
      ],
      pid: '1'
    }
    o2=tree_add_pid(o1) //==o3
}

const tree_flat=(c="child")=>(o={})=>{
       let r=[]
       let re=(d={})=>{
            if (R.isEmpty(d)) return
            r.push(R.dissoc(c,d))
            let x=R.propOr([],c)(d)
            if (!R.isEmpty(x)){
                x.map(re)
            }
        }
        re(o)
        return r
}

const test_flat_tree=()=>{
    let c="child"
    let o={
        x:1,
        child:[
            {x:2, child:[{x:"2-1"},{x:"2-2"} ]},
            {x:3, child:[{x:"3-1"},{x:"3-2"}]},
            {x:4, child:[{x:"4-1",child:[{x:"4-1-1"}]}]},
        ]
    }
    d1=tree_flat(c)(o)
    d2=[
      { x: 1 },
      { x: 2 },
      { x: '2-1' },
      { x: '2-2' },
      { x: 3 },
      { x: '3-1' },
      { x: '3-2' },
      { x: 4 },
      { x: '4-1' },
      { x: '4-1-1' }
    ]
}

const find_position=(i=[-10,10,50,100])=>(y=0)=>{
   let [a,b,]=i
   if (a>b) {
         let i1=R.sort(R.descend(x=>x))(i)
         return R.takeWhile(x=>x>=y)(i1).length
   }else{
         let i1=R.sort(R.ascend(x=>x))(i)
         return R.takeWhile(x=>x<=y)(i1).length
    }
}

const scale_bind=(i=[])=>(y=[])=>y.map(find_position(i))
const scale_bind1=(i=[])=>(o=[])=>(d=[])=>scale_bind(i)(d).map(x=>o[x])

// i: 升序 [1,10,20 ... ]
const scale_bind2=(i=[])=>(o=[])=>(d=0)=>{
    let k=1
    for (let ii of i){
        let c= k<i.length ? (d<i[k]) : (d>=ii)
        if (c){
            return o[k-1]
        }
        k++
    }
}



const test_find_position=()=>{
      const i=[-10,10,50,100]
      const i1=["<<<<","x","y","z",">>>"]
      const o=[-20,-10,1,10,20,50,60,100,200]
       //['<<<<','x','x','y','y','z','z','>>>','>>>']
      const o1=[ 0, 1, 1, 2, 2, 3, 3, 4, 4 ]
      const y=20
      const r=find_position(i)(y)       //2
      const p=scale_bind(i)(o)        //[ 0, 1, 1, 2, 2, 3, 3, 4, 4 ]
      const r1=scale_bind1(i)(i1)(o)  //['<<<<','x','x','y','y','z','z','>>>','>>>']
      const i2=["xs","s","m","l","xl"]
      const r2=scale_bind1(i)(i2)(o)  // ['xs','s','s','m','m','l','l','xl','xl' ]
      i.reverse()
      const r4=scale_bind1(i)(i2)(o)  //[ 'xl', 'xl', 'l', 'l',  'm',  'm', 's',  's',  'xs' ]
      let f=scale_bind2([0,50,100])(['a','b','c'])
      let r5=[-10,0,10,50,55,100,199].map(f) // ['a', 'a', 'a', 'b', 'b', 'c', 'c' ]

}


// ap()([1,2,3,4]) -> [ { min: 1, max: 2 }, { min: 2, max: 3 }, { min: 3, max: 4 } ]
const ap=(x=['min','max'])=>R.pipe(R.aperture(2),R.map(R.zipObj(x)))

// count(['a','b','a']) -> { a: 2, b: 1 }
const count=R.pipe(R.groupBy(x=>x),R.map(x=>x.length),R.toPairs,R.sort(R.descend(R.prop(1))),R.fromPairs)

const count_time=(g)=>(...a)=>{
    console.time();
    let r=g(...a);
    console.timeEnd();
    return r
}
const count_time1=(g)=>async (...a)=>{
    console.time();
    let r=await g(...a);
    console.timeEnd();
    return r
}

const test_count_time=async ()=>{
   let g=()=>JSON.stringify(R.range(1,1e6).map(x=>({x:1,y:x})))
   let r1=count_time(g)()
   let r2=await count_time1(g)()
}


// [1,2,3,4] -> [[1,2],[3,4]]
const split_every=(n=2)=>(z=[])=>z.reduce((x,y,i)=>i%n == 0? [...x,z.slice(i,i+n)] : x ,[])

// ["a",2,"b",4] -> {a:2,b:4}
const split2o=(a=[])=>Object.fromEntries(split_every(2)(a))
const table2o=(a)=>split2o([...a.querySelectorAll('td')].map(x=>x.innerText))


// [1,2,3,4] -> [[1,2],[2,3],[3,4]]
const aperture=(n=2)=>(a=[])=> n > a.length? [...a] : a.reduce((x,y,i)=>( i<a.length-n+1 ? [...x,a.slice(i,i+n)] : x) , [])







module.exports={
    to_int,
    to_json,
    to_json1,
    to_string,
    to_s,
    to_s1,
    to_qs,
    qs,
    qs1,
    url2qs,

    parse_jsonp,
    write_json,

    echo,
    res_json,
    res_proxy,

    is_in,
    is_in_unix,
    isArray,
    is_s,
    is_o,
    is_img,
    is_arr,
    is_map,
    is_int,
    is_nan,
    is_number,
    is_oid,
    is_promise,


    //--------
    get_proto_keys,
    sleep,
    para,
    seq1,
    format_kv,
    format_kv1,
    promisify_all,
    promisify_all_arr,
    promisify_all_child,
    clean,

//------
    uniq,
    arr2reg,
    json2cookie,
    rainbow,
    rand_number,
    rand_word,
    diff,
    compose,
    compose1,
    create_middleware,
    get_fn_child_key,


    drop_id,
    drop_keys,
    map_key,
    map_keys,
    map_keys_by_dict,
    minifi_keys,

    forEach,
    each,

//------
    base64_clean,
    img2base64,
    img2base641,
    base642img,
    any_nil,
    merge_o,
    test_proto,
    remove_html,
    list2nest,
    split_when,
    split_when1,
    index_by_key,

    has_all_keys,
    sort_key,
    json2params,
    sort_join,

    normalize_k,
    cp,

    when,
    when_p,
    say,
    say1,
    throw_it,
    pass,

    pad_s,
    pad_e,
    pad_a,

    map_j,
    map_s,

    split_o,
    split_o_clean,
    iter,
    iter1,
    loop2,
    eval_o,
    test_eval_o,

    pipe,
    pipe1,
    before,
    csv2json,

    camel,
    camels1,
    camels2,


}

