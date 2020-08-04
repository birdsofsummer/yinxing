var through = require('through');

var msgprocessor = through(function(msg){
  var str = msg; //'hello from nanømsg'
  this.queue(str + ' and cheers!');
});

socket.pipe(msgprocessor); //msg transformed to: 'hello from nanømsg and cheers!'


