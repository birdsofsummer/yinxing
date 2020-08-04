///xbin/node/lib/node_modules/koa-router/lib/router.js

const Router = require('koa-router')
const {drop_id}=require('yinxing/fp')

const {
    DB="test",
    TABLE="user",
    NODE_ENV,
}=process.env

const {
    sign,
    token,
}=require("yinxing/middleware")

const user_basic=require("./user_basic")
const user_detail=require("./user_detail")

const {
    user_basic_create,
    user_basic_creates,
    user_basic_update,
    user_basic_delete,
    user_basic_deletes,

    user_detail_create,
    user_detail_update,
    user_detail_delete,
    user_detail_deletes,

    forget_pwd,
    reset_pwd,

    login_v1,
    login_v2,

}=require("./validator")


const router = new Router({
    prefix: '/api',
})


const guest=[
    '/create',
    '/creates',
    '/forget_pwd',
    '/verify_code',
    '/reset_pwd',
    '/login',
    '/exist'
]

const admin=[
    "/list",
    "/update",
    '/delete',
    '/deletes',
]

//router.use(admin, sign, token)

router.all('/register', user_basic_create, user_basic.insert)
router.all('/exist',  user_basic.exist_user)
router.all('/login1',  login_v1 ,user_basic.login1)
router.all('/login2',  login_v2 ,user_basic.login2)
router.all('/out',  login_v1 ,user_basic.logout)


router.all('/list',   user_basic.list)
router.all('/update', user_basic_update, user_basic.update)
router.all('/update_detail', user_detail_update, user_basic.update_detail)

router.all('/delete', user_basic_delete , user_basic.remove)
router.all('/deletes',user_basic_deletes, user_basic.removes)

router.all('/create', user_basic_create, user_basic.insert)
router.all('/creates', user_basic_creates, user_basic.inserts)

router.all('/forget_pwd', user_basic.forget_pwd)
router.all('/verify_code', user_basic.verify_code)
router.all('/reset_pwd', reset_pwd,user_basic.reset_pwd)

module.exports={
    router,
}


