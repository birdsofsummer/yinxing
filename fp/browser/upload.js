const sleep=(n=1)=>new Promise((f1,f2)=>setTimeout(f1,n*1000))


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




const read_blob=(blob)=>new Promise((f1,f2)=>{
        reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = function(e){
            var binary = this.result;
            f1(binary)
        }
})


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

