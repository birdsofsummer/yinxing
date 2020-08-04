//const session = require('koa-session');
//const compose = require('koa-compose');

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

const {router}=require("./router")
const path = require("path")

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
      mongo,
      router.routes(),
]);

module.exports=all
