const {is_promise} =require('../fp')

const json=async (ctx, next) => {
    ctx.json=(d={},code=200,ok=true,msg="success")=>{
        ctx.response.type = 'application/json'
//      ctx.append('ccc', 'ddd');
//      ctx.set({
//          'Etag': '1234',
//          'Last-Modified': "",
//          'Cache-Control', 'no-cache',
//        });
    ctx.body = {
                "errorCode":0,
                "errorMessage":msg,
                message:msg,
                code,
                ok,
                data:d, // JSON.stringify(
    }
    }
    await next();
}

let fn=async (c)=>{
    c.ok=(x={},code=200,h={})=>{
         c.type = 'application/json'
         c.response.type = 'application/json'
         c.status = code;
         //c.append('token',"123")
         c.set(h)
         c.body=x //JSON.stringify(x)
    }
}

const Ok = async(c,n)=>{
    fn(c)
    await n()
}



module.exports={
    Ok,
    json,
}
