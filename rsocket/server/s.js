//https://github.com/jjeffcaii/rsocket-minibroker
//https://github.com/rsocket/rsocket-js/blob/master/packages/rsocket-websocket-server/src/RSocketWebSocketServer.js
//https://github.com/rsocket/rsocket-js/blob/master/packages/rsocket-websocket-server/src/__tests__/RSocketWebSocketServer-test.js

EventEmitter = require('events');
RSocketWebSocketServer = require("rsocket-websocket-server").default
RSocketTcpServer = require("rsocket-tcp-server").default

const {
    FRAME_TYPES,
    deserializeFrameWithLength,
    serializeFrameWithLength,

    RSocketClient,
    BufferEncoders,
    encodeAndAddCustomMetadata,
    encodeAndAddWellKnownMetadata,
    TEXT_PLAIN,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    MESSAGE_RSOCKET_ROUTING,

} = require('rsocket-core');


let emitter;
let connection;
let server;
let status;
const maxRSocketRequestN = 2147483647;


emitter = new EventEmitter();
emitter.close = () => {};
emitter.error = () => {};

//ws = require('ws');
//ws.servers[0].emit('connection', emitter);


//https://github.com/rsocket/rsocket-js/blob/master/packages/rsocket-examples/src/CompositeMetadataExample.js
const send_buff=socket=> {
  socket
    .requestStream({
      data: new Buffer('request-stream'),
      metadata: encodeAndAddWellKnownMetadata(
        encodeAndAddCustomMetadata(
          Buffer.alloc(0),
          TEXT_PLAIN.string,
          Buffer.from('Hello World'),
        ),
        MESSAGE_RSOCKET_ROUTING,
        Buffer.from('test.service'),
      ),
    })
    .subscribe({
      onComplete: () => console.log('Request-stream completed'),
      onError: error => console.error(`Request-stream error:${error.message}`),
      onNext: value => console.log('%s', value.data),
      onSubscribe: sub => sub.request(maxRSocketRequestN),
    });
}

say=x=>y=>console.log(x,y)


onNext= _status => {
        status = _status
        console.log(status)
}

onSubscribe=subscription =>{
        d=subscription
        console.log('sssssssss',d)
        n=Number.MAX_SAFE_INTEGER
        subscription.request(n)
}

sub=_connection =>{
        connection = _connection
        connection
            .connectionStatus()
            .subscribe(onNext , onSubscribe );
        connection
            .receive()
        .subscribe(x=>{
            say('<<<<')(x)
           // say('sss')(connection)
           // say('_____')(connection.send.toString())
           //connection.send({ data:{x:123}, metadata:{z:111}, })
        })
}

//server = new RSocketTcpServer({port: 8080});
server = new RSocketWebSocketServer({port: 8080});

server
    .start()
    .subscribe(sub)
