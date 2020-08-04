// https://www.npmjs.com/package/koa2
// https://www.npmjs.com/package/koa-route


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
    Ok,
    query,
    err,
    token,
    sign,
    db,
    logger,
}=require("../middleware")

let options={
    env:process.env.NODE_ENV || 'development'
}
const app = new Koa(options);
const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080



//--------------------------------------------------------------------------------
const router = new Router();

router.post('/echo', async (c, n) => {
    let d={...c.params,"呵呵":"O(∩_∩)O~"}
    c.ok(d,201);
    // c.error_400("O(∩_∩)O~",d);
    // c.error_401("O(∩_∩)O~");
    // c.json(d);
    // c.go("http://www.baidu.com","baidu...")
    // c.redirect("http://www.baidu.com")
})

router.get('/echo', async (c, n) => {
    let d={...c.params,"呵呵":"O(∩_∩)O~"}
    c.ok(d,201);
    // c.error_400("O(∩_∩)O~",d);
    // c.error_401("O(∩_∩)O~");
    // c.json(d);
    // c.go("http://www.baidu.com","baidu...")
    // c.redirect("http://www.baidu.com")
})


router.get('/baidu', async (c, n) => {
    c.go("http://www.baidu.com","baidu...")
})


router.get('/admin', async (c, n) => {
    c.error_401("O(∩_∩)O~");
})

router.get('/hehe', async (c, n) => {
    let d={"呵呵":"O(∩_∩)O~"}
    c.error_400("O(∩_∩)O~",d);
})


router.get('/baidu1', async (c, n) => {
    c.redirect("http://www.baidu.com")
})
router.post('/create', async (c, n) => {
    let d={"呵呵":"O(∩_∩)O~"}
    c.ok(d,201)
})
router.post('/delete', async (c, n) => {
    c.json({x:"dddd"})
})

//--------------------------------------------------------------------------------

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

app.on('error', (err, ctx) => {
      console.error('server error', err,ctx)
})

console.log(app)
app.listen(port,()=>console.log(process.env));

//"http://localhost:8080/?x=1&y=2"



