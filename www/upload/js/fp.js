const now=()=>moment.now()/1000
const sleep=(n=1)=>new Promise((f1,f2)=>setTimeout(f1,n*1000))
const to_promise=fn=>(...args)=>new Promise((resolve,reject)=>fn(...args,(err,data)=>err? reject(err) : resolve(data)))
const forEach=f=>o=> Object.entries(o).map(f)
const cb2promise=(cos)=>{
    const p=cos.constructor.prototype
    const pc=cos.__proto__
  //promiseify=([x,y])=>p["_"+x]=to_promise(y.bind(cos))
    const promiseify=([x,y])=>pc["_"+x]=to_promise(y.bind(cos))
    forEach(promiseify)(p)
    return cos
}

const cb2promise1=(c)=>{
    const promiseify=([x,y])=>c["_"+x]=to_promise(y.bind(c))
    forEach(promiseify)(c)
    return c
}

const say=x=>(...y)=>console.log(x,...y)
const read=(blob)=>new Promise((f1,f2)=>{
        reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = function(e){
            var binary = this.result;
            f1(binary)
        }
})

async function* lazy(f,d=[],n=2,t1=0,t2=0){
    let l=d.length
    if (l==0) return
    let d1=R.splitEvery(n,d)
    let offset=0
    for (j=0; j<d1.length; j++){
        for (let i=0; i<n && offset < l ; i++){
            let r= await f(d1[j][i])
            console.log(offset,"/",l,j,i)
            yield r
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


const get_json=u=>fetch(u).then(x=>x.json())
const URL="/upload"
const put=([binary,Content_Range])=>new Promise((f1,f2)=>{
        console.log(Content_Range)
        var xhr = new XMLHttpRequest();
        url=URL
        xhr.open("PUT", url);
        //xhr.setRequestHeader('x-requested-with','XMLHttpRequest');
        xhr.setRequestHeader('Content-Range', Content_Range);
        xhr.send(binary);
        xhr.onload = function(e){
            let r=xhr.responseText
            f1(r)
            //var response=JSON.parse(r);
            //f1(response)
        };
})

const split_upload=async (file,size=1e5,cb=console.log,n=4)=>seq1(put,cb,await split_file2(file,size),n,1)

const kv2form=(d={})=>{
    const formData = new FormData()
    R.mapObjIndexed((v,k)=>formData.append(k,v),d)
    return formData
}

const post_form=(url,d={})=>fetch(url,{
        method :"POST",
        body: kv2form(d),
//       headers:{ "Content-Type": "multipart/form-data" }
    }).then(x=>x.json())


const init_loading=()=>{
    let target= document.querySelector('#loading')
    spinner = new Spinner().spin();
    target.appendChild(spinner.el);
    return (stop="")=> stop ? spinner.stop() : spinner.spin(target)
}

const reg_sw=async (file,scope={ scope: '/' })=>{
    //window.addEventListener("message", receiveMessage, false);
    navigator.serviceWorker.addEventListener('message', event => {
              console.log(event.data);
    });
    const s=await navigator.serviceWorker.register(file,scope)
    const t=await navigator.serviceWorker.ready
    console.log(s)
    console.log(t)
}

