var nano = require('nanomsg');
var rep = nano.socket('rep');
var addr = 'tcp://127.0.0.1:5555';
rep.bind(addr);
rep.wsopt('text');
rep.on('data', function (buf) {
  console.log('received request: ', buf.toString());
  rep.send('world');
});


