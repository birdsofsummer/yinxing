const {
    entries:toPairs,
    fromEntries:fromPairs,
    keys,
    values,
    assign
}=Object;
const {isArray}=Array;

//--------------------------------http--------------------------------------
async function* lazy(f,n) {
    for (let i of n){
        yield f(i)
    }
}


const curl_heads=(a="")=>fromPairs(a.split('\n').slice(1).map(x=>x.split(': ')))

const gbk=(x)=>new Promise((resolve,reject)=>{
      let c=new FileReader();
      c.onloadend=e=>{ resolve(c.result) }
      c.readAsText(x,"GBK")
})

const get_gbk=async (x)=>{
      let a=await fetch(x)
      let b=await a.blob()
      let c=await gbk(b)
      return c
}

const response_handler=async (x)=>{
    x.redirected &&  location.replace(x.url);
    try{
        x.txt=await x.clone().text()
        x.data=await x.json();
    }catch(e){
        console.log(e);
        x.data={}
    }finally{
        return x.ok ? Promise.resolve(x) : Promise.reject(x)
    }
}


const get=u=>fetch(u).then(x=>x.text())
const gets=us=>Promise.all(us.map(get))
const post_form=(d={})=>fetch(u,{method:"POST",body:new URLSearchParams(d)}).then(x=>x.json())
const posts_form=us=>Promise.all(us.map(post_form))
const posts_timeout=async (us)=>{
    let r=[]
    for await (const i of lazy(post_form,us)){
        r.push(i)
        await sleep()
    }
    return r
}


//---------------------------------ng----------------------------------
const check_form=(f)=>{
      for (const i in f.controls) {
              let c=f.controls[ i ]
              c.markAsDirty();
              c.updateValueAndValidity();
      }
      return f.value
}


//---------------------------------vue----------------------------------
const vue_log=x=>console.log(JSON.parse(JSON.stringify(x)))
const reducer1=fn=>(o={})=>toPairs(o).reduce((a,[k,v])=>(a[k]=fn(k,v),a),{})
const mapState1=(o={})=>(key="")=>{
    let a=o[key];
    let f=(k,v)=>s=>s[key][k];
    return {
        ...reducer1(f)(a),
        [key]:s=>s[key],
    }
}

//--------------------------------worker--------------------------------------
const get_all=async function(){
    http_get=x=>fetch(x).then(y=>y.text())
    http_gets=(u=[])=>Promise.all(u.map(http_get))
    this.onmessage=async (e)=> {
        let u=e.data
        console.log(u)
        let d=await http_gets(u)
        postMessage(d)
    }
}


function fn2workerURL(fn) {
      var blob = new Blob(['('+fn.toString()+')()'], {type: 'application/javascript'})
      return URL.createObjectURL(blob)
}


//send_to_worker(myWorker,7000,u)
const send_to_worker=(w,interval=7000,[h,...t])=>{
    if (h) {
        w.postMessage(h);
        setTimeout(()=>send(w,interval,t),interval)
    }else{
        console.log('done')
    }
}


export {

	mapState1,
}
