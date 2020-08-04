const port="3000"
const server='mqtt://localhost:'+port
const help=`
npm i mosca -g
mkdir www
...
mosca --http-port ${port} --http-static www --http-bundle --verbose
`
console.log("start server:",help)
console.log(server)


const init=(server)=>{
  var client = mqtt.connect(server);
  client.subscribe("presence");
  client.on("message", function(topic, payload) {
      console.log(topic, payload.toString())
      setTimeout(()=>client.publish('presence', new Date().toString()),2000)
  });
  client.publish("presence", "hello world!");
}

init(server)

