const path = require("path")
const staticFiles = require('koa-static')

const www=(dir="./",p="./www")=>staticFiles(path.resolve(dir, p))

module.exports=www


