

//主要用来catch数据库超时之类的错误
//用上这个app.on('error',f)会失效

//如果需要恢复则需要
//ctx.throw(500)
//err=>ctx.app.emit("error", err, ctx);


const error_handler = async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        console.log('cccccccccccccccc',error)
        ctx.response.status =  500;
        ctx.response.body={
             "errorCode": 0,
             "errorMessage": error,
             "message": "",
             "code": 500,
             "ok": false,
             "data": {}
        }
     }
}


module.exports = error_handler
