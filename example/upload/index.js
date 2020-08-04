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
    db,
    logger,
    Ok,
    query,
}=require("yinxing/middleware")

const {
        upload_cos,
        list_cos,
        delete_cos,
        get_cos_tk,
}=require("yinxing/middleware/upload")


const router = new Router({
    prefix: '/api',
})

router.all('/list', list_cos)
router.all('/token', get_cos_tk)
router.all('/create', upload_cos)
router.all('/delete', delete_cos)

const all = compose([
      logger,
      cors,
      www(__dirname),
      form_parser, // body: x=1&y=2
      mix,
      router.routes(),
]);

const app = new Koa();
app.use(all)
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080
app.listen(port,()=>console.log("http://localhost:"+port));

