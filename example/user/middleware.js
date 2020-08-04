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
    error_handler,
    common_error,
}=require("yinxing/middleware")

const {
    router,
}=require("./router")

const all = compose([
      cors,
      logger,
      common_error,
      err,
      www(__dirname),
      json_parser,
      mix,
 //   {"Content-Type": "application/json; charset=utf-8",}  不可少
      query,
      Ok,
      json,
      //mongo,
      router.routes(),
]);

module.exports=all
