const cors=require('koa2-cors')
const cors1=cors({
      origin: function(ctx) {
        if (ctx.url === '/test') {
          return false;
        }
        return '*';
      },
      exposeHeaders: ['token'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'token', 'Accept'],
})

module.exports=cors1
