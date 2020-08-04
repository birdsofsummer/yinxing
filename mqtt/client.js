var mqtt = require('mqtt')

//server='mqtt://localhost:27017/mqtt'
port=1883
server=`mqtt://localhost:${port}`

var client  = mqtt.connect(server)

client.on('connect', function () {
  console.log('cccccccccc')

  client.subscribe('presence', function (err) {
    console.log('eeeeeeeee',err)
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})



client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  setTimeout(()=>client.publish('presence', new Date().toString()),2000)
 // client.end()
})
//console.log(client)
//mqtt sub -t 'hello' -h 'test.mosquitto.org' -v
//mqtt pub -t 'hello' -h 'test.mosquitto.org' -m 'from MQTT.js'
//https://www.npmjs.com/package/mqtt
