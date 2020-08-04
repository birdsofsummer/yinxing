const Koa = require('koa');
const Router = require('koa-router')
const compose = require('koa-compose');
//const koaBody = require('koa-body');
//const path = require("path")

const {
    pack,
    unpack,
    echo,
    echo1,
    json,
}=require("./pack")

let options={
    env:process.env.NODE_ENV || 'development'
}
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080

const router = new Router({
    prefix: '/api',
})

router.all('/bin', echo)
router.all('/json', echo1)

const all = compose([
    unpack,
    json,
    pack,
    router.routes(),
])

const app = new Koa(options);
app.on('error', err => {
      console.error('server error', err)
})

app.use(all)
app.listen(port,(x)=>console.log(x));


