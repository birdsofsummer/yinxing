var nano = require('nanomsg');
var through = require('through');
const { spawn } = require('child_process');



var addr = 'tcp://127.0.0.1:7789'
var addr1="ws://127.0.0.1:7790"
var addr2="ws://127.0.0.1:7791"

var pub_gen=(addr)=>{
    var pub = nano.socket('pub');
    pub.bind(addr);
    pub.wsopt('text')
    return pub
}

var msgprocessor = through(function(msg){
  var str = msg;
  this.queue(str + ' and cheers!');
});
var sub_gen=(addr)=>{
    var sub = nano.socket('sub');
    sub.wsopt('text')
    sub.connect(addr);
    sub.pipe(msgprocessor).pipe(process.stdout);
    return sub
}


pub=pub_gen(addr1)
setInterval(()=> pub.send('\nhello from nanomsg @ '+new Date()), 500)
sub_gen(addr2)



const ls = spawn('node', ['./hserver']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
