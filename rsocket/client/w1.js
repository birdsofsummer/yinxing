say=(x)=>y=>console.log(x,y)
var ws = new WebSocket("ws://localhost:8080");
ws.onopen=say('open')
ws.onmessage=say('msg')
ws.onerror=say('error')
ws.onclose=say('bye')

