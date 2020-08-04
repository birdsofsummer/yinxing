const path = require("path")
const Koa = require('koa');
//const session = require('koa-session');
//const compose = require('koa-compose');

const {
    create_logger,
    create_logger1,
    create_logger2,
}=require('yinxing/log')

const {
    init_mongo,
}=require("yinxing/db/mongo")

const {
    NODE_ENV="development",
    TENCENTCLOUD_SERVER_PORT=8080,
}=process.env

const DB={
    DBS:[
        "development",
        "test",
        "production",
        //...
    ],
    TABLES:[
        "user_basic",
        "user_detail",
        "sms",
        "token",
        "role",
        //...
    ],
}

const LOG_CONFIG={
    app_name:"user",
    server_ip:"1.1.1.1",
}

// ctx.service.user_basic ...


const create_app=async (all=[],{DBS,TABLES}=DB)=>{
    let options={
        env:NODE_ENV
    }
    const app = new Koa(options);
    //app.context.l=create_logger1()
    const logger=create_logger2(app,LOG_CONFIG)
    //app.context.l._info()('ccc')
    //ctx.l.debug("xxx")
    app.use(logger)
    app.use(all)
    await init_mongo(app,DB)
    app.on('error', err => {
         console.error('eeeeeeeeeeee', err)
         app.context.l.error("eeeeeeeeeeeeeee",error)
    })
    return app
}

const all=require("./middleware")

create_app(all,DB).then(app=>{
    const port = TENCENTCLOUD_SERVER_PORT
    app.listen(port);
})

