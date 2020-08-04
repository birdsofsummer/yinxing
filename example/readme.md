#  example


## token server


```javascript
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
    }=require("../middleware")
    //}=require("yinxing/middleware")

    const {
        create_token,
        parse_token,
        refresh_token,
    }=require('../token')

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
            c.error_400("你的token呢?")
        }else{
            let {ok,data}=parse_token(token)
            ok ? c.json(data) :  c.error_400("bad token")
        }
    })

    router.get('/refresh_token', async (c, n) => {
        let {token}=c.params
        if (!token){
            c.error_400("你的token呢?")
        }else{
            let {ok,...data}=refresh_token(token)
            console.log("dddd",data)
            ok ? c.json(data) :  c.error_400("bad token")
        }
    })

    const all = compose([
          logger,
          cors,
          staticFiles(path.resolve(__dirname, "./www")),
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
    app.listen(3000);

```

```bash
    node token.js
```

### localhost:3000/token


```json
{
  "code": 200,
  "ok": true,
  "msg": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiIwIiwidXNlcl9uYW1lIjoiY2NjYyJ9LCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6ImFhYWEiLCJzdWIiOiJjY2NjIiwiZXhwIjoxNTc2ODQ5NjU0LCJpYXQiOjE1NzY3NjMyNTR9.6uwmS5_pBsOBdxYUdLuvLvGIY46leIdojng0TLk3HkE"
  }
}

```


### localhost:3000/parse_token?token=xxx


```json
{
  "code": 200,
  "ok": true,
  "msg": "success",
  "data": {
    "data": {
      "user_id": "0",
      "user_name": "cccc"
    },
    "alg": "HS256",
    "typ": "JWT",
    "aud": "aaaa",
    "sub": "cccc",
    "exp": 1576849654,
    "iat": 1576763254
  }
}


```

### localhost:3000/refresh_token?token=xxx

```json

{
  "code": 200,
  "ok": true,
  "msg": "success",
  "data": {
    "old_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiIwIiwidXNlcl9uYW1lIjoiY2NjYyJ9LCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6ImFhYWEiLCJzdWIiOiJjY2NjIiwiZXhwIjoxNTc2ODQ5NjU0LCJpYXQiOjE1NzY3NjMyNTR9.6uwmS5_pBsOBdxYUdLuvLvGIY46leIdojng0TLk3HkE",
    "new_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiIwIiwidXNlcl9uYW1lIjoiY2NjYyJ9LCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImF1ZCI6ImFhYWEiLCJzdWIiOiJjY2NjIiwiZXhwIjoxNTc2ODQ5Njg0LCJpYXQiOjE1NzY3NjMyODR9.NgiDEoudqVVs3bML0LJq2qrsZjAAdG74_tKVsh_D9CY",
    "life": 86400,
    "exp": 1576849684
  }
}


```


