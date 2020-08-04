var path = require('path');
var childprocess = require('child_process');
//var cluster = require('cluster');
var sendmessage = require('sendmessage');

test=()=>{
    let d={
        from:"zzz",
        action:"add",
        data:[1,2],
    }

    let d1={
        from:"zzz",
        action:"get",
        data:"http://www.baidu.com/"
    }
    let d2={
        from:"zzz",
        action:"bye",
        data:"",
    }
    W="./worker.js"


    send=(d,fn=console.log,file_name=W)=>{
        var worker = childprocess.fork(file_name)
        sendmessage(worker,d);
        worker.on('message', fn);
        return worker
    }
    setInterval(()=>send(d),2000)
    send1=(d,fn=console.log,file_name=W)=>{
        var worker = childprocess.fork(file_name)
        worker.on('message', fn);
        setInterval(()=>sendmessage(worker,d),2000)
        return worker
    }
}


