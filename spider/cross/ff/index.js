//http://www.hbsredcross.org.cn/jzxxgs/index_5.jhtml

post=()=>{
    var xhr = new window.XMLHttpRequest();
    xhr.open('POST','/hello',true);
    xhr.send('abc');
}
test=()=>{
    post()
    post()
}




say=(x="")=>(y="")=>console.log(x,y)
// ----------------------------------db------------------------------
init_db=(db)=>{
  var objectStore = db.createObjectStore('t', {
      keyPath: 'id' ,
      autoIncrement: true,

  });
  //objectStore.createIndex('url', 'url', { unique: true });
}

db={}
request = window.indexedDB.open("html", 1);
request.onupgradeneeded = e=>{
    db=e.target.result
    db.onclose=say('close')
    db.onabort=say('abort')
    db.onerror=say('error')
    db.onversionchange=say('v-change')
    init_db(db)
}
//request.onsuccess=e=>db=e.target.result;



save=(d={})=>db.transaction(['t'], 'readwrite') .objectStore('t') .add(d)

readAll=()=>new Promise((a,b)=>{
  let r=[]
  var objectStore = db.transaction('t').objectStore('t');
   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;
     if (cursor) {
         r.push(cursor.value)
       cursor.continue();
     } else {
      console.log('done');
     }
    a(r)
  }
})

// ----------------------------------db------------------------------

page=(n=0)=>"http://www.hbsredcross.org.cn/jzxxgs/index_"+n+".jhtml"
get_urls=(from=0,to=0)=>{
    const total=to || +[...document.querySelectorAll('.page-large a')].slice(-2,-1)[0].innerText
    const urls=[]
    for (let i=from;i<=total;i++){
        let u=page(i)
        urls.push(u)
    }
    return urls
}

get=(u="/")=>fetch(u).then(x=>x.text())
gets=async (us=[])=>{
    let r=[]
    let err=[]
    let j=0
    for (let i of us){
        console.log(j,i)
        try{
            let ii=await get(i)
            r.push(ii)
            //防崩
            save({url:i,data:ii})
        }catch(e){
            console.log(e)
            err.push(i)
            //break
        }finally{

        }
        j++
    }
    console.log('done')
    return {err,r}
}

start=(u=get_urls(0,2))=>gets(u)


