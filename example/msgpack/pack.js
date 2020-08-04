const msgpack = require("msgpack")
const is_stream=(ctx)=>/stream/i.test(ctx.req.headers["content-type"])


const collect=(ctx)=>{
   ctx.request["body"] = {}
   if (!is_stream(ctx)){
       return {}
   }
   return new Promise((a,b)=>{
       let r=[]
       let l=0
       ctx.req.on('data', x=>{
            r.push(x)
            l+=x.length
       });
       ctx.req.on('end', async x=>{
           let d=Buffer.concat(r,l)
           let r1=msgpack.unpack(d)
           ctx.request["body"] = r1
           a(r1)
       })

    })
}


const unpack=async (ctx,next)=>{
   await collect(ctx)
   await next()
}

const unpack1=async (ctx,next)=>{
   ctx.request["body"] = {}
   if (is_stream(ctx)){
       let r=[]
       let l=0
       ctx.req.on('data', x=>{
            r.push(x)
            l+=x.length
       });
       ctx.req.on('end', async x=>{
           let d=Buffer.concat(r,l)
           let r1=msgpack.unpack(d)
           ctx.request["body"] = r1
           await next() // 不行
       })
   }else{
        await next()
   }
}


const pack=async (ctx, next) => {
    ctx.pack=(d={},code=200,ok=true,msg="success")=>{
//      ctx.response.type = 'application/json'
//      ctx.append('ccc', 'ddd');
//      ctx.set({
//          'Etag': '1234',
//          'Last-Modified': "",
//          'Cache-Control', 'no-cache',
//        });
        ctx.response.type = 'application/octet-stream'
        const d1={
                    "errorCode":0,
                    "errorMessage":msg,
                    message:msg,
                    code,
                    ok,
                    data:d,
            }
         ctx.body = msgpack.pack(d1)
    }
    await next();
}


const json=async (ctx, next) => {
    ctx.json=(d={},code=200,ok=true,msg="success")=>{
      ctx.response.type = 'application/json'
//      ctx.append('ccc', 'ddd');
//      ctx.set({
//          'Etag': '1234',
//          'Last-Modified': "",
//          'Cache-Control', 'no-cache',
//        });
        const d1={
                    "errorCode":0,
                    "errorMessage":msg,
                    message:msg,
                    code,
                    ok,
                    data:d,
            }
         ctx.body = d1
    }
    await next();
}




function getClientIP(ctx) {
    const req=ctx.req
    return req.headers['x-forwarded-for']  ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

const echo=async (ctx,next)=>{
    let r={
        headers:ctx.headers,
        //h1:ctx.req.headers,
        query:ctx.query,
        body:ctx.request.body,
        ip:getClientIP(ctx),
    }
    console.log(r)
    ctx.pack(r)
}


const echo1=async (ctx,next)=>{
    let r={
        headers:ctx.headers,
        //h1:ctx.req.headers,
        query:ctx.query,
        body:ctx.request.body,
        ip:getClientIP(ctx),
    }
    console.log(r)
    ctx.json(r)
}



module.exports={
    pack,
    unpack,
    unpack1,
    echo,
    echo1,
    json,
}
