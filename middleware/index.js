const compose = require('koa-compose');
const {
    logger,
    query,
}=require("./log")

const {
    form_parser, //上传文件
    json_parser,
}=require("./body")

const mix=require('./mix')
const www=require('./static')
const cors=require('./cors')
const {Ok,json}=require("./json")
const {token}=require('./token')

module.exports={
    query,
    Ok,
    mix,
    www,
    cors,
    form_parser,
    json_parser,
    compose,
    Ok,
    json,
    err:require("./err"),
    token,
    sign:require("./sign"),
    db:require("./db"),
    logger,
    //upload:require("./upload"),
    common_error:require("./common-error")
}


/*
 *

const {router}=require("../router")
router.prefix('/api')
const upload = compose([
      logger,
      cors,
      www,
      form_parser,
      mix,
    //  sign,
      token,
      router.routes(),
]);

*/


