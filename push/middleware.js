const cors=require('koa2-cors')
const koaBody = require('koa-body');
const compose = require('koa-compose');


const staticFiles = require('koa-static')
const path = require("path")


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

const logger=async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

const {router}=require("./router")
const maxFileSize = process.env.maxFileSize || 20*Math.pow(1024,2)   // < 20M
const body_parser=koaBody({ multipart: true, formidable: { maxFileSize } })

const mix=async (ctx, next) => {
  ctx.params = {
    ...ctx.request.body,
    ...ctx.query
  };
  await next();
}

const all = compose([
   //   logger,
      cors1,
      staticFiles(path.resolve(__dirname, "./www")),
      body_parser,
      mix,
      router.routes(),
]);

module.exports={all}
