const {
    conn
    cache,
}=require('../cache/redis')


const redis=async (ctx, next) => {
    let c=conn()
    ctx.redis=c
    ctx.cache=cache(c)
    await next();
}

module.exports={
    redis,
}

