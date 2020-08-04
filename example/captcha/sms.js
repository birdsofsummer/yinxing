const Koa = require('koa');
const Router = require('koa-router')
//const session = require('koa-session');
//const compose = require('koa-compose');
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
    db:{
        mongo,
    },

    logger,
    Ok,
    query,
}=require("../../middleware")
//}=require("yinxing/middleware")


const {
    send,
    verify,
}=require("../../middleware/sms")

const router = new Router();
router.get('/sms', send)
router.get('/verify', verify)

const all = compose([
      logger,
      cors,
      www(__dirname),
      json_parser, // body: {}
      mix,
      json,
      err,
      mongo,
      router.routes(),
]);

const app = new Koa();
app.use(all)
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
app.listen(port,()=>console.log(process.env));

