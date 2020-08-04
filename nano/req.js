var nano = require('nanomsg');
var req = nano.socket('req');
var addr = 'tcp://127.0.0.1:5555';
req.connect(addr);
req.on('data', function (buf) {
  console.log('received response: ', buf.toString());
 // req.close();
});
send=()=>req.send('hello')
setInterval(send,1000)

