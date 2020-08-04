
var zmq = require('../../')
  , sock = zmq.socket('push');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');
i=0
setInterval(function(){
   i++
    t=`${i}`
  console.log(t);
  sock.send(t);
}, 500);
