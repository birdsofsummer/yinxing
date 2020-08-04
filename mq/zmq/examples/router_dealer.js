/*
 *
 * One server two clients
 *
 */

var cluster = require('cluster')
  , zeromq = require('../')
  , port = 'tcp://127.0.0.1:12345';

if (cluster.isMaster) {
  for (var i = 0; i < 4; i++) cluster.fork();

  cluster.on('death', function(worker) {

    console.log('worker ' + worker.pid + ' died');
  });

  //router = server

  var socket = zeromq.socket('router');

  socket.identity = 'server' + process.pid;

  socket.bind(port, function(err) {
    if (err) throw err;
    console.log('bound!');

    socket.on('message', function(envelope, data) {
      console.log(socket.identity + ': received ' + envelope + ' - ' + data.toString());
      socket.send([envelope, data*10]);
    });
  });
} else {
  //dealer = client

  var socket = zeromq.socket('dealer');

  socket.identity = 'client' + process.pid;

  socket.connect(port);
  console.log('connected!');
  i=0
  setInterval(function() {
    i++
    var value = Math.floor(Math.random()*100);

    socket.send(i);
    console.log(socket.identity + ': asking ' + i);
  }, 100);

  socket.on('message', function(data) {
    console.log(socket.identity + ': answer data ' + data);
  });
}
