var nano = require('nanomsg');
var push = nano.socket('push');
var addr = 'ws://127.0.0.1:7789';
push.bind(addr);
setInterval( send, 100 );

function send(){
	push.send('hello from nanomsg stream api');
}

/*
 *
var pull = nano.socket('pull', {encoding:'utf8'} );
pull.connect(addr);
pull.on('data', console.log);
*/

