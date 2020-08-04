say=(x="")=>(y="")=>console.log(x,y)

init_db=(db)=>{
  var objectStore = db.createObjectStore('t', {
      keyPath: 'id' ,
      autoIncrement: true,

  });
  objectStore.createIndex('scheme', 'scheme', { unique: false });
}


db=null
request = window.indexedDB.open("html", 1);

request.onsuccess=e=>{
    say('open db')(e)
    db=request.result
}
request.onerror = function(event) {
    say('eee')(event)
};
request.onupgradeneeded = e=>{
    db=e.target.result
    db.onclose=say('close')
    db.onabort=say('abort')
    db.onerror=say('error')
    db.onversionchange=say('v-change')
    init_db(db)
}
//request.onsuccess=e=>db=e.target.result;

save=(d={})=>db.transaction(['t'], 'readwrite').objectStore('t').add(d)
saves=(d=[])=>Promise.all(d.map(save))

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



