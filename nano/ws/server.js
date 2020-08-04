var nano = require('nanomsg');

var pair = nano.socket('pair');
console.log('http://localhost:3000/')

pair.bind('ws://127.0.0.1:7789');
pair.on('data', function(msg){
      m1="***"+msg+'##'
      console.log('->'+msg);
      console.log('<-'+m1);
      pair.send(m1);
});

require('http').createServer(function (req, res) {
  require('fs').createReadStream('index.html').pipe(res);
}).listen(3000);

