var nano = require('nanomsg');
var sub = nano.socket('sub');
var addr = 'tcp://127.0.0.1:7789'
sub.connect(addr);
sub.pipe(process.stdout);

