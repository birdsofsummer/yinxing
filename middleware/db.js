const {
    //conn,
    set_db_list,
}=require('../db/mongo')

const DBS=[
    "dev",
    "test",
    "production",
]

const TABLES=[
       "meta",
       "user_basic",
       "user_detail",
       "sign",
       "progress",
       "app",
       "prop",
//     "upload",
//     "captcha",
]

const mongo=async (ctx, next) => {
    ctx.dbs=await set_db_list(DBS)
    await next();
}

module.exports={
    mongo,
}
