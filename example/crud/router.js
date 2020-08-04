const Router = require('koa-router')
const cc=require("./crud")

const router = new Router();

router.get('/list', cc.list)
router.post('/create',cc.create )
router.post('/update', cc.update)
router.post('/delete', cc.remove)

module.exports={router}
