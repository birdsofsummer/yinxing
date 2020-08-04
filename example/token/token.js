const Koa = require('koa');
const Router = require('koa-router')
//const session = require('koa-session');
//const compose = require('koa-compose');
const staticFiles = require('koa-static')
const path = require("path")


const {
    mix,
    www,
    cors,
    form_parser,
    json_parser,
    compose,
    json,
    err,
    token,
    sign,
    db,
    logger,
    Ok,
    query,
}=require("../../middleware")
//}=require("yinxing/middleware")

const {
    create_token,
    parse_token,
    refresh_token,
}=require('../../token')

let options={
    env:process.env.NODE_ENV || 'development'
}

const app = new Koa(options);
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
const router = new Router();


router.get('/token', async (c, n) => {
    let token=create_token()
    c.json({token})
})

router.get('/parse_token', async (c, n) => {
    let {token}=c.params
    if (!token){
        c.error_400("token呢?")
    }else{
        let {ok,data}=parse_token(token)
        ok ? c.json(data) :  c.error_400("bad token")
    }
})

router.get('/refresh_token', async (c, n) => {
    let {token}=c.params
    if (!token){
        c.error_400("token呢?")
    }else{
        let {ok,...data}=refresh_token(token)
        console.log("dddd",data)
        ok ? c.json(data) :  c.error_400("bad token")
    }
})

const all = compose([
      logger,
      cors,
      www(__dirname),
      json_parser,
      mix,
 //   {"Content-Type": "application/json; charset=utf-8",}  不可少
      query,
      Ok,
      json,
      err,
      router.routes(),
]);

app.use(all)
app.on('error', err => {
      console.error('server error', err)
})
app.listen(3000);

