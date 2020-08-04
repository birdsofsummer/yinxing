const koaBody = require('koa-body');




const maxFileSize = process.env.maxFileSize || 20*Math.pow(1024,2)   // < 20M
const form_parser=koaBody({ multipart: true, formidable: { maxFileSize } })

const json_parser=koaBody()

module.exports={
    form_parser,
    json_parser,
}
