/*
 *
 *
 *
"https://httpbin.org/put";
"https://httpbin.org/get";
"https://httpbin.org/delete";
"https://httpbin.org/post";

mitmproxy

https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
xhr (superagent,axios)
fetch

*/


restore_console=function(){
　　var iframe = document.createElement('iframe')
　　document.body.appendChild(iframe)
　　window.console = iframe.contentWindow.console
    console.log("zzz")
}

restore_console()


post=async (uri="",body={})=>{
    r1=await fetch(uri,{method:"POST",body:JSON.stringify(body)})
    r2=await r1.json()
    console.log(uri,r2)
    return r2
}



save=(d={})=>{
   let URI = "https://httpbin.org/post";
   post(URI,d)
}






//fetch
proxy1=()=>{
    let z=fetch
    const post=async (uri,body={})=>{
        r1=await z(uri,{method:"POST",body:JSON.stringify(body)})
        r2=await r1.json()
        console.log(uri,r2)
        return r2
    }

    const req=async (...d)=>{
        r1=await z(...d)
        r2=await r1.clone().text()
        console.log(r2)
        save(r2)

        return r1
    }
    globalThis.fetch=req
    console.log("done")
}



// proxy1()
// fetch("/ddd")





///xhr

kk=[
// open
// send
// abort
// setRequestHeader
// getResponseHeader
// getAllResponseHeaders
// overrideMimeType
// onreadystatechange
// upload
     "readyState",
     "timeout",
     "withCredentials",
     "responseURL",
     "status",
     "statusText",
     "responseType",
     "response",
     "responseText",
     "responseXML",
     "mozAnon",
     "mozSystem",
     "UNSENT",
     "OPENED",
     "HEADERS_RECEIVED",
     "LOADING",
     "DONE",
]


onreadystatechange=function(e){
    for (let k of kk) {
        let v=e.target[k]
        this[k]=v
       //Object.defineProperty(this,k,v)
    }

    console.log('zzzzzzzzz',e)

    let {readyState,responseURL,response,status,statusText}=e.target

    if (readyState==4){
        let body={readyState,responseURL,response,status,statusText}
        save({...body,data:this.data}) ///...
    }

}


const proxy=()=>{
    let z=XMLHttpRequest
    //XMLHttpRequest=null
    X=function(){
         this.data=""
         let xhr = new z();
         xhr.onreadystatechange=onreadystatechange.bind(this)
         // xhr.upload.onerror=console.log
         xhr.timeout=3000


        for (let k of kk) {
            this[k]=xhr[k]
           // Object.defineProperty(this,k,v)
        }

        //[onloadstart, onprogress, onabort, onerror, onload, ontimeout, onloadend,]
        let o={}
        for (let k in xhr.upload){
            o[k]=g=>xhr.upload[k]=g
        }
        this.upload=o

        //Object.defineProperty(xhr, "onreadystatechange", {value: onreadystatechange, configurable: true});
        Object.defineProperty(this,'onreadystatechange', {
            set: function(g) {
                xhr.onreadystatechange = e=>{
                    onreadystatechange.call(this,e)
                    g(e)
            }},
            get:function(){ return xhr.onreadystatechange },
         })

        Object.defineProperty(this,'timeout', {
            set: function(t) { xhr.timeout=t },
            get:function(){ return xhr.timeout },
         })

        this.xhr=xhr
    }

    X.prototype.getResponseHeader=function(k){
         return this.xhr.getResponseHeader(k)
    }

    X.prototype.getAllResponseHeaders=function(){
         return this.xhr.getAllResponseHeaders()
    }


    X.prototype.ontimeout=function(g){
        this.xhr.ontimeout=function(e){
            console.log("timeout",e)
            g(e)
        }
    }
    X.prototype.setRequestHeader=function(k,v){
         this.xhr.setRequestHeader(k,v)
    }
    X.prototype.open=function(m,u,withCredentials=true){
        this.xhr.open(m,u, true)
       // this.xhr.open(m,"/api/"+u, true)
    }
 //   X.prototype.onreadystatechange=function(g){
 //       this.xhr.onreadystatechange=e=>{
 //           onreadystatechange(e)
 //           g(e)
 //       }
 //   }


    X.prototype.send=function(d=""){
        this.xhr.send(d)
        this.data=d
        console.log("send",d)
    }
    globalThis.XMLHttpRequest=X
    console.log("done")

}







get=(u="ddd")=>{
    x = new XMLHttpRequest()
    x.open("POST", u, true)
    x.setRequestHeader("aaa","111")
    x.setRequestHeader("bbb","111")
    x.setRequestHeader("ccc","111")
    //x.onreadystatechange(e=>console.log("eeeeeeeeeeee",e))
    x.onreadystatechange=e=>console.log("eeeeeeeeeeee",e)
    x.send("123")
    //x.upload.onerror=console.log
    //x.onreadystatechange=console.log
}


function proxy2(){

    let z=XMLHttpRequest
    let p=function (){
        let a= new z
        this.data=""
        a.onreadystatechange=function(e){
            console.log('zzzzzzzz',e)
            console.log("<<<<",this,">>>>")
        }
        return new Proxy(a, {
            get: function(o, k="open") {
                // open
                // send
                // abort
                // setRequestHeader
                // getResponseHeader
                // getAllResponseHeaders
                // overrideMimeType
                // onreadystatechange
                // upload
                if (a?.[k]?.constructor == Function) {
                    if (k=="send"){
                        return function(v=""){
                            this.data=v
                            a?.[k]?.(v)
                        }
                    }else{
                        return a?.[k].bind(a)
                    }
                }
                if (k=="headers"){
                    let h=a.getAllResponseHeaders()
                    return h.length ? Object.fromEntries(h.trim().replace(/\r/ig,'').split('\n').map(x=>x.split(": "))) : {}
                }
                return  a?.[k] ?? ""
            },
            set: function(o={},k="onreadystatechange",v=""){
                    switch (k) {
                        case "onreadystatechange":
                                a[k]=function (e){
                                    console.log('zzzzzzzz',e)
                                    console.log("<<<<",this,">>>>")
                                    v?.(e)
                                }
                            break;
                        default:
                            a[k]=v
                    }
            },
        })
    }

    XMLHttpRequest=p

    test=()=>{
        let a=new XMLHttpRequest()
        a.open("POST","/ddd")
        a.onreadystatechange=e=>console.log('eeeeeeee',e)
        a.send("ddd")
        a.getResponseHeader('server')
        a.getAllResponseHeaders()
    }
    test()
}

// proxy2()



proxy3=()=>{
     let z=globalThis.XMLHttpRequest
     const say=(x)=>(...y)=>console.log(x,...y)
     const echo=function(e){
         console.log("zzzzzzzzzzzzzzzzz",e,this)
     }

     function a(f=echo){
           let xhr=new z()
           xhr.fs=[f]
           xhr.onreadystatechange=(e)=>xhr.fs.map(x=>x.call(xhr,e))
           Object.defineProperty(xhr,'onreadystatechange', {
                set: function(g) { xhr.fs.push(g) },
           })
           let o=xhr.open
           let g=xhr.send
           xhr.open=(...d)=>{
               o.call(xhr,...d)
               console.log("oooooooo",d)
              // let [m,u,c]=d
           }
           xhr.send=(d="")=>{
                 console.log('ssssssssss',d)
                 g.call(xhr,d)
           }
           return xhr
    }

    globalThis.XMLHttpRequest=a


    test=()=>{
         b=new XMLHttpRequest(say(1))
         b.open('POST','/ddd')
         b.onreadystatechange=say(2)
         b.fs.push(say(3))
         b.send('ddd')
    }

    test()
}






test1=()=>{
    proxy()
    get()
}



// https://api.weibo.com/chat/#/chat?source_from=4
test=()=>{
    //u="https://api.weibo.com/chat/#/chat?source_from=4"
    //location.href=u
    a= document.querySelectorAll('ul')[0]
    auto=setInterval(()=>{
        let i=Math.random()>0.4 ? 1 : 0
        console.log(i)
        a.children[i].click()
    },3e4,)
}












