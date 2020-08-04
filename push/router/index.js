const Router = require('koa-router')
const PassThrough = require('stream').PassThrough

const router = new Router();


//https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events
router.get('/stream', async (ctx, next) => {
      let {token}=ctx.params
      console.log(token)
      let i=0;
      var stream = new PassThrough()
      let timer=setInterval(function() {
          let now=+new Date()
          i=i+1
          let d={i,now,token}
          let d1=JSON.stringify(d)
          stream.write(`id: ${now}\n`)
          stream.write(`data: ${d1}\n`);
          stream.write('retry: 10000\n');
          stream.write('\n\n');
          console.log(i,now,token)
      }, 1000);

      stream.on('close', function() {
            console.log(i,token,'closed.')
            clearInterval(timer);
      })

      ctx.type = 'text/event-stream'
      ctx.body = stream
})


module.exports={router}
