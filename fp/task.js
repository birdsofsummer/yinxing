const {promisify} = require('util');
//https://github.com/browserify/node-util



const each=(f)=>(o={})=> Object.entries(o).forEach(f)

const promisify0=(fn,t)=>(...arg)=>new Promise((f1,f2)=>fn.call(t,...arg,(err,d)=>err?f2(err):f1(d)))   //fn(...,cb=(err,d)=>(...)) //redis..
const promisify1=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(...arg,(err,d)=>err?f2(err):f1(d)))   //fn(...,cb=(err,d)=>(...))
const promisify2=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(...arg,f1))   //fn(...,cb)
const promisify3=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(f1,...arg,))  //fn(cb,...)
const promisifyAll=(c,fn=promisify)=>{
    let f=([k,v])=>c.__proto__["_"+k]=fn(v).bind(c)
    each(f)(c.__proto__)
    return c
}
const promisifyAll1=(c)=>{
    let f=([k,v])=>c.__proto__["_"+k]=promisify0(v).bind(c)
    each(f)(c.__proto__)
    return c
}

const promisifyAll2=(c)=>{
    let p=c.constructor;
    let o=p.prototype
    let f=([k,v])=>o["_"+k]=promisify0(v,c)
    each(f)(o)
    return c
}

const run_parallel =(fs=[])=>fs.map(x=>x())
const run_parallel_p =(fs=[])=>Promise.all(fs.map(x=>x()))


const repeat=(x,n)=>Array(n).fill(x)
const run_sequential=(fs=[],result)=>fs.reduce((acc,f)=>f(acc),result)
const run_repeat=async (f,n=1,result)=>run_sequential(repeat(f,n),result)

//async tasks
const run_sequential_p1=async ([h,...t],result)=> h ?  run_sequential(t,await h(result)) : result
const run_sequential_p2=async(fs,result)=>fs.reduce(async (acc,f)=>f(await acc),result)
const run_repeat_p=async (f,n=1,result)=>run_sequential_p2(repeat(f,n),result)



//f=(ctx,next)=>{...;next()}
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

const get=async(u)=>fetch(u).then(x=>x.text())
const gets=(u=[1,2,3,4,5])=>run_parallel(u.map(get))

const test_run_seq=async()=>{
    add=async (x)=>x+10
    r0=await run_sequential_p1([get,get,get,get],"1")
    r1=await run_sequential_p2([get,get,get,get],"1")
    r2=await run_repeat_p(get,5,"1")
    r3=await run_sequential_p1([add,add,add],10)
    console.log(r3)

}

const test_promisify1=async()=>{
      //  callback
      add=(x,y,f)=>f(null,x+y)
      add(1,2,console.log)

      add1=promisify1(add)
      r=await add1(1,3)
      console.log(r)

}

const test_promisify_no_err=async()=>{
      add_ok=(x,y,f)=>f(x,y)
      add_ok1=promisify2(add_ok)
      r=await add_ok1(1,2)
      console.log(r)
}

const test_promisify2=async()=>{
      sleep0=(f,n)=>setTimeout(f,n*1000)
      sleep_p0=promisify2(sleep1)

      console.log(1)
      await sleep_p0(3)
      console.log(2)
}

const test_promisify3=async()=>{
      sleep0=(f,n)=>setTimeout(f,n*1000)
      sleep_p1=promisify3(sleep0)

      console.log(1)
      await sleep_p1(3)
      console.log(2)
}

const test_promisify_all=async ()=>{
    const redis = require("redis");
    const conn=()=>{
        let client = redis.createClient();
        promisifyAll(client)
        //promisifyAll1(client)
        //promisifyAll2(client)
        return client
    }
    c=conn()
    r1=await c._set('foo',"ddd")
    r2=await c._get('foo')
    console.log(r1,r2)
}




module.exports= {
    each,
    promisify0,
    promisify1,
    promisify2,
    promisify3,
    promisifyAll,
    promisifyAll1,
    promisifyAll2,
    repeat,
    run_parallel,
    run_parallel_p,
    run_sequential,
    run_sequential_p1,
}

