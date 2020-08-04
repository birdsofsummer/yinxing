const pub = require('nanomsg').socket('pub')
const sub = require('nanomsg').socket('sub')

pub.bind('ws://127.0.0.1:7790')
pub.wsopt('text')
setInterval(()=> pub.send('hello from nanomsg @ '+new Date()), 3000)
reply=msg=>{
      d='->'+msg
      console.log(d);
      pub.send(d);
}


sub.bind('ws://127.0.0.1:7791')
sub.wsopt('text')
sub.on('data', reply);

require('http').createServer(function (req, res) {
  require('fs').createReadStream('sub1.html').pipe(res);
}).listen(3000);
