const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router')
const compose = require('koa-compose');


let options={
    env:process.env.NODE_ENV || 'development'
}
const app = new Koa(options);
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
const router = new Router();

now=()=>new Date().getTime().toString()

router.all('/', async (ctx, next) => {
        let mix={
            ...ctx.request.body,
            ...ctx.query
        }
        console.log(ctx.request.body,ctx.query,ctx.querystring,ctx.headers)
        ctx.cookies.set('zzz',now(),{
             expires:new Date('2028-07-06'),
             "max-age":1000*3600*1, //maxAge
             path:'/',
             httpOnly:false,
             overwrite:false,
             domain:'localhost',
             "version":1,
         }
         );
         ctx.body = mix
})

all=compose([
    koaBody(),
    router.routes(),
])

app.use(all)
app.on('error', err => {
      console.error('server error', err)
})
app.listen(3000);


