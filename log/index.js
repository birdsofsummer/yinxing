//https://github.com/log4js-node/log4js-example/blob/master/app.js
// express
// log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' })


//msg
//user
//ip
//url
//action
//payload
//result
//User-Agent


//log=log4js.getLogger("app");
//log.error("Something went wrong:", err);

const appenders={
      "access": {
        "type": "dateFile",
        "filename": "/tmp/app-access.log",
        "pattern": "-yyyy-MM-dd",
        "category": "http"
      },
      "app":
        {
        //"type": "file",
        "type": "dateFile",
        "filename": "/tmp/app.log",
        "pattern": "-yyyy-MM-dd",
        "maxLogSize": 10485760,
        "numBackups": 3
      },
      "errorFile": {
        //"type": "file",
        "type": "dateFile",
        "pattern": "-yyyy-MM-dd",
        "filename": "/tmp/app-errors.log"
      },
      "errors": {
        "type": "logLevelFilter",
        "level": "ERROR",
        "appender": "errorFile"
      },
     "cheese" : {
        type: 'dateFile',
        filename: `/tmp`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      },

    }



const CONFIG={
    "appenders": appenders,
    "categories": {
      "default": { "appenders":Object.keys(appenders) , "level": "DEBUG" },
      "http": { "appenders": [ "access"], "level": "DEBUG" }
    },
  }



const log4js = require('log4js')
const access = require('./access')

const create_logger=()=>log4js.configure(CONFIG) //.getLogger

//'cheese'
const create_logger1=( category="app")=>{
    log4js.configure(CONFIG)
    return log4js.getLogger(category)
}
const R=require('ramda')

const create_logger2=(app,config={})=>{
    const m=[
       // 'all',
        'trace',
        'debug',
        'info',
        'warn',
        'error',
        'fatal',
        'mark',
       // 'off',
       ]
    const {env,context}=app
    const cfg={env,...config}
    const l=create_logger1()
    m.forEach((x) => {
        l["_"+x]=(ctx)=>(msg="")=>l[x](access(ctx,cfg)(msg))
    })
    context.l=l
    app.context.l._info()('-'.repeat(80))
   // app.context.l.debug("xxx")
   // ctx.l.debug("xxx")
    return async (ctx, next) => {
        const start = Date.now()
        ctx.log = m.reduce((a,b)=>({...a,[b]:x=>l[b](access(ctx,cfg)(x))}),{})

        //ctx.l._error(ctx)('z'.repeat(80))
        //ctx.log.error('eeeeeeeeeeeeeeee')
        await next()
        const t = (Date.now() - start)/1000;
        l.info(access(ctx,cfg)(t))
   }
}

const test=()=>{
    log_config={app_name:"user",server_ip:"1.1.1.1"}
    o={env:"ccc"}

    Koa = require('koa')
    app = new Koa(o)
    logger=create_logger2(app,log_config)
    app.use(logger)
    app.context.l._info()('-'.repeat(80))
    app.listen(8080)

}


module.exports={
    create_logger,
    create_logger1,
    create_logger2,
    test,
}
