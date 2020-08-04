// node io.js
//
const Koa = require('koa');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const {all}=require('./middleware')

app.use(all)
var numUsers = 0;
io.on('connection', socket => {
     var addedUser = false;

     console.log('a user connected');
     socket.broadcast.emit('chat message','a user connected');

     socket.on('event', data => {
        console.log('recieve',data)
     });

     socket.on('send', data => {
          console.log('--->', data);
          socket.emit('getMsg', '@'+data);
     })

     socket.on('chat message', function(msg){
          console.log('chat: ' + msg);
          io.emit('chat message', msg);
     });

     socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
              username: socket.username,
              message: data
        });
     });


     socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
          numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username,
          numUsers: numUsers
        });
      });

      // when the client emits 'typing', we broadcast it to others
      socket.on('typing', () => {
        username=socket.username
        socket.broadcast.emit('typing', {
          username
        });
          console.log(username+" is typing")
      });

      // when the client emits 'stop typing', we broadcast it to others
      socket.on('stop typing', () => {
        username=socket.username
        socket.broadcast.emit('stop typing', {
          username: socket.username
        });
          console.log(username+" stop typing")
      });

      socket.on('disconnect', () => {
        console.log('bye',socket)
        if (addedUser) {
          --numUsers;
          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
          });
        }
      });
})

const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
server.listen(port)
