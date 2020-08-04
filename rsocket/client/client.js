import { RSocketClient, JsonSerializers, } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

const client = new RSocketClient({
  serializers: JsonSerializers,
  setup: {
    keepAlive: 60000,
    lifetime: 180000,
    dataMimeType: 'application/json',
    metadataMimeType: 'application/json',
  },
  transport: new RSocketWebSocketClient({url: 'wss://...'}),
});

client.connect().subscribe({
  onComplete: socket => {

    socket.fireAndForget({
      data: {some: {json: {value: 1}}},
      metadata: {another: {json: {value: true}}},
    });
  },
  onError: error => console.error(error),
  onSubscribe: cancel => {/* call cancel() to abort */}
});


