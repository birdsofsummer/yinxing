const { RSocketClient, BufferEncoders, }=require('rsocket-core') ;
const RSocketTcpClient = require('rsocket-tcp-client')


client = new RSocketClient({
  setup: {
    keepAlive: 60000,
    lifetime: 180000,
    dataMimeType: 'application/octet-stream',
    metadataMimeType: 'application/octet-stream',
  },
  transport: new RSocketTcpClient.default( {host: '127.0.0.1', port: 8080}, BufferEncoders,),
});

client.connect().subscribe({
  onComplete: socket => {
    socket.fireAndForget({
      data: new Buffer("cccc"),
      metadata: null, // or new Buffer(...)
    });
  },
  onError: error => console.error(error),
  onSubscribe: cancel => {/* call cancel() to abort */}
});
