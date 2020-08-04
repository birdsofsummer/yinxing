//https://www.npmjs.com/package/ua-parser-js

const jwt = require("koa-jwt");

const {
    TOKEN_KEY="The",
    TOKEN_LIFE="86400",
    TOKEN_AUD="aaaa",
    TOKEN_SUB="cccc",
    TOKEN_ALG="HS256",
    TOKEN_TYP="JWT",
}=process.env

const {
    create_token,
    parse_token,
    refresh_token,
}=require("../")

const auth=async (ctx,next,)=>{
    //let {body,headers,httpMethod,queryString,path}=ctx.event
    let token=ctx.headers['token']
    if (!token) {
        return ctx.error_401("no token")
    }

    //let r=await verify_token(token)
    //let token=r.data

    let r= {ok:true}
    let tk = parse_token(token)   //{exp: Date.now()  }
    let ok=true //|| r.ok && tk.data.exp > Date.now() / 1000

    if (ok) {
        ctx.token=tk
        await next()
    }else{
        ctx.error_401("bad token")
        //ctx.reject_req(ctx)
    }
}


/*

const auth=async (ctx,next,)=>{
   //let getParams = ctx.request.query
   ctx.response.set('token', token);

}

const {BASE_URL,TOKEN_SERVER}=process.env
const {get,post_json}=require('../ajax')
const verify_token=(t="")=>get( TOKEN_SERVER+"/parse?token=" + t)
const create_token=(d={})=>post_json(TOKEN_SERVER+"/create", d)

*/

module.exports={
    token:jwt({
        secret: TOKEN_KEY,
        passthrough: true,
    }).unless({path: ["/create_token"]}),
    auth,
}
