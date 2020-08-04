say=(x)=>(y="")=>console.log(x,y)
rnd=()=>Math.ceil(Math.random()*1e7)

PORT="8001"
HOST=location.href.replace('http','ws')+":"+PORT

let websocket = new WebSocket(HOST)
send=(info)=>websocket.send(JSON.stringify(info))

websocket.onopen = () => {
  let id=rnd()
  setInterval(()=>send({"chatId":id,"code":2,"data":{"time":Date()}}),2000)
  setInterval(()=>send({"chatId":id,"code":1,"data":{"time":Date(),title:"uuuuuuuuuuu"}}),4000)
}
websocket.onmessage = event => {
  let data = event.data
  console.log(data)
}
websocket.onclose = say('close')
websocket.onerror = say('error')

window.onunload = () => {
    websocket.close()
}

