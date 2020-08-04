const Koa = require('koa');

let options={
    env:process.env.NODE_ENV || 'development'
}

const port = process.env.TENCENTCLOUD_SERVER_PORT || 8080


const app = new Koa(options);

const all=require("./middleware")
app.use(all)
app.on('error', err => {
      console.error('server error', err)
})
app.on('error', (err, ctx) => {
      console.error('server error', err,ctx)
})

console.log(app)
app.listen(port);
