const {drop_keys}=require('../fp')

const EXTRA_KEYS=['token','sig']

const mix=async (ctx, next) => {

      let params ={
        ...ctx.request.body,
        ...ctx.query,
      }

      console.log("pppp",params)

      ctx.req_query=drop_keys(EXTRA_KEYS)(params)
      ctx.params = params
      await next();
}

module.exports=mix
