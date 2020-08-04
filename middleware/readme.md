#  中间件


## 中间件示例

```javascript
    fn=async (c)=>{
        c.ok=(x={},code=200)=>{
             c.type = 'application/json'
             c.response.type = 'application/json'
             c.status = code;
             c.append('token',"123")
             c.set({
                 "x":"ccc",
                 "ddd":"xzz",
             })
             c.body=x //JSON.stringify(x)
        }
    }
    OK = async(c,n)=>{
        fn(c)
        await n()
    }
   // 可以改写为
   const {create_middleware}=require("../fp")
   OK=create_middleware(fn,(x)=>true)

   // 需要校验的token/sign中间件
   // 假设请求方式为qs
   // http://localhost:3000?appkey=ccc&random=ccc&time=ccc&token=ccc&sig=ccc
   check_token=...
   check_sig=...

   token_middleware=create_middleware(c=>c.query.token,check_token,(c,n)=>c.error_401("bad token"))
   signature_middleware=create_middleware(c=>c.query,check_sig,(c,n)=>c.error_401("bad sig"))


    query = async (c,n)=> {
        console.log(c.query)       //{x:1,y:2}
        console.log(c.querystring) // "x=1&y=2"
        console.log("body",c.request.body)
        console.log("body+qs",c.params)
        console.log("body+qs-token-sig"c.req_query) //去掉token和签名后的body+query
        await n()
    }


```

```javascript

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
}=require("./index")

const Koa = require('koa');
const Router = require('koa-router')
//const session = require('koa-session');
//const compose = require('koa-compose');
const staticFiles = require('koa-static')
const path = require("path")

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
      staticFiles(path.resolve(__dirname, "./www")),
      json_parser,
      mix,
 //   {"Content-Type": "application/json; charset=utf-8",}  前端请求时不可少,否则会乱
      query,
      OK,
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
app.listen(3000);
//app.listen(port,()=>console.log(process.env));

//"http://localhost:3000/?x=1&y=2"

```

默认的c.redirect(url) 无法带body

c.go(url,"baidu...") 可带body

```
< HTTP/1.1 302 Found
< Location: http://www.baidu.com
< Content-Type: text/html; charset=utf-8
< Content-Length: 8
< Date: Thu, 19 Dec 2019 05:27:57 GMT
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
baidu... 

```




## koa 解析




```javascript
// https://www.npmjs.com/package/koa2
// https://www.npmjs.com/package/koa-route
//node_modules/_koa@2.9.0@koa/lib/context.js
//ctx

c.inspect()
c.toJSON()
c.assert()
c.throw()
c.onerror()
c.attachment()
c.redirect()
c.remove()
c.vary()
c.set()
c.append()
c.flushHeaders()
c.acceptsLanguages()
c.acceptsEncodings()
c.acceptsCharsets()
c.accepts()
c.get()
c.is()


c.cookies
c.cookies(req,res,{...})
c.status
c.message
c.body
c.length
c.type
c.lastModified
c.etag
c.headerSent
c.writable

c.querystring
c.idempotent
c.socket
c.search
c.method
c.query
c.path
c.url
c.accept
c.origin
c.href
c.subdomains
c.protocol
c.host
c.hostname
c.URL
c.header
c.headers
c.secure
c.stale
c.fresh
c.ips
c.ip

c.state //{}
c.originalUrl = request.originalUrl = req.url


//res

r.response()
r.attachment()
r.redirect()
r.remove()
r.vary()
r.set()
r.append()
r.flushHeaders()
r.status
r.message
r.body
r.length
r.type
r.lastModified
r.etag
r.headerSent
r.writable

//req

r.acceptsLanguages()
r.acceptsEncodings()
r.acceptsCharsets()
r.accepts()
r.get()
r.is('html')
r.querystring
r.idempotent
r.socket
r.search
r.method
r.query
r.path
r.url
r.accept
r.origin
r.href
r.subdomains
r.protocol
r.host
r.hostname
r.URL
r.header
r.headers
r.secure
r.stale
r.fresh
r.ips
r.ip

```

# ctx

```
{
  request: {
    method: 'GET',
    url: '/',
    header: {
      host: 'localhost:3000',
      'user-agent': 'curl/7.61.1',
      accept: '*/*'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: [Object: null prototype] {}
  },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}

```
