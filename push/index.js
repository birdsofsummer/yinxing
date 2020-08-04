//https://github.com/kudos/koa-websocket



const Koa = require('koa');
const {all}=require('./middleware')
const websockify = require('koa-websocket');

//const app = new Koa();
const wsOptions = {};
const app = websockify(new Koa(),wsOptions);
app.ws.use(function(ctx, next) {
  //    console.log(ctx.request)
      console.log(ctx.request.querystring)
      return next(ctx);
});

app.ws.use((ctx) => {
      i=0
      console.log(ctx.request.url)
      let {token}=ctx.request.query
      console.log("token",token)
      ctx.websocket.on('message', function(message) {
          i++
          d=JSON.parse(message)
          console.log(i,d['now'])
          ctx.websocket.send('>>>'+ message)
      });
      ctx.websocket.on('close', function(message) {
          console.log(token,i,'closed',message)
      });
      ctx.websocket.on('error', function(message) {
          console.log(token,i,'error',message)
      });

});

app.use(all)
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
app.listen(port,()=>console.log(process.env));
