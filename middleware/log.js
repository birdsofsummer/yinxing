const logger=async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      let {method,url}=ctx
      console.log(method,url,ms);
}

const query = async (c,n)=> {
    let ip = c.ip || c.headers['x-forwarded-for']
    console.log("ip:",ip)
    console.log(c.query)       //{x:1,y:2}
    console.log(c.querystring) // "x=1&y=2"
    console.log("body",c.request.body)
    console.log("body+qs",c.params)
    console.log("body+qs-token-sig",c.req_query) //去掉token和签名后的body+query
    await n()
}


module.exports={
    logger,
    query,
}

