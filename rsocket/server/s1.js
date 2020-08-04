const insert=(arr=[],key="id",d={})=>(new Set(arr.map(x=>x[key])).has(d[key]) ? arr : [...arr,d])
const remove=(arr=[],key="id",d={})=>arr.filter(item => item[key] !== d[key])

//原生ws
//https://www.jianshu.com/p/f0baf93a3795


const ws = require('nodejs-websocket')

let chatUsers = []
PORT=8001

function broadcast(server, msg) {
  console.log("<---",msg)
  server.connections.forEach(function(conn) {
    conn.sendText(JSON.stringify(msg))
  })
}

//count
const broadcastInfo = (server, info) => {
  let result = {
    code: 0,
    count: server.connections.length,
    ...info
  }
  broadcast(server, result)
}

sendChatUsers = (server, user) => {
    let u=insert(chatUsers,"chatId",user)
    let result = {
    code: 1,
    count: u.length,
    chatUsers:u,
  }
  chatUsers =u
  broadcast(server, result)
}


handleCloseConnect = (server, user) => {
  chatUsers = remove(chatUsers,"chatId",user)
  let result = {
    code: 0,
    count: chatUsers.length,
    chatUsers: chatUsers
  }
  console.log('handleCloseConnect', user)
  broadcast(server, result)
}

reply=(server,result)=>{
    //{code,data}
    let info = JSON.parse(result) || {code:0,data:{}}
    let code = info.code
    switch(code){
        case 0:
            handleCloseConnect(server, info)
            break;
        case 1:
            sendChatUsers(server, info)
            break;
        default:
            broadcastInfo(server, info)
    }
}

const createServer = () => {
  let server = ws.createServer(connection => {

    console.log('New connection',server.connections.length)
    console.log(chatUsers )

    connection.on('text', function(result) {
          console.log('-->', result)
          reply(server,result)
        //connection.send(result)
        //echo
    })
    connection.on('connect', function(code) {
      console.log('开启连接', code)
    })
    connection.on('close', function(code) {
      chatUsers = []
      console.log('关闭连接', code)
    })
    connection.on('error', function(code) {
          try {
            connection.close()
          } catch (error) {
            console.log('close异常', error)
          }
    })

   connection.on('binary', function(inStream) {
      var data = new Buffer(0)
      inStream.on('readable', function() {
        var newData = inStream.read()
        if (newData)
          data = Buffer.concat([data, newData], data.length + newData.length)
      })
      inStream.on('end', function() {
        console.log(data)
      })
    })

  })
  return server
}

test=()=>{
    let s=createServer()
    s.listen(PORT)
    console.log(s)
}

test()

module.exports = createServer()
