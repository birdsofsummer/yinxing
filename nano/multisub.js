var nano = require('nanomsg');

g=(addr)=>{
    var pub = nano.socket('pub');
    pub.bind(addr);
    pub.wsopt('text')
    pub.on('data',console.log)
    send=()=> {
       let d=Date();
       pub.send(d);
    }
  //  setInterval(send , 1000);
    send()
    return [addr,pub]
}

c=(addr,pub)=>{
        let sub = nano.socket('sub');
        sub.wsopt('text')
        sub.connect(addr);
            sub.on('data', function (str) {
              d=`${addr}->${str}`
              console.log(d);
              pub.send(`aaaaaaa`+d)
              //sub.close();
        });
        return [addr,pub,sub]
}

init=()=>{
    a=[ 'tcp://127.0.0.1:7789', "ws://127.0.0.1:7790", "ws://127.0.0.1:7791", ]
    a.map(g).map(([a,p])=>{ c(a,p) })
}
init()


