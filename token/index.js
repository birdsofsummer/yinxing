const jwt = require('jsonwebtoken');
const moment=require('moment')
const {
    to_int,
}=require('../fp')


const {
    TOKEN_KEY="zzzzzzzzz",
    TOKEN_LIFE="86400",
    TOKEN_AUD="aaaa",
    TOKEN_SUB="cccc",
    TOKEN_ALG="HS256",
    TOKEN_TYP="JWT",
}=process.env


const now=()=>Math.floor(moment.now()/1e3)
//const now1=()=>Math.floor(Date.now() / 1000)
const now_add_seconds=(t=0)=>now() + parseInt(t)

const create_token=(
    data={user_id:"0",user_name:"cccc"} ,
    t=TOKEN_LIFE,
    key=TOKEN_KEY,
    aud=TOKEN_AUD,
    sub=TOKEN_SUB,
    alg=TOKEN_ALG,
    typ=TOKEN_TYP,
)=>{
    let a={
      data,
      alg,
      typ ,
      aud,
      sub,
      exp:now_add_seconds(t),
      //"iat": <NumericDate>,
      //"nbf": <NumericDate>,
    }
    return jwt.sign(a, key);
}

const create_token1=(
    data={user_id:"0",user_name:"cccc"} ,
    t=TOKEN_LIFE,
    key=TOKEN_KEY,
    aud=TOKEN_AUD,
    sub=TOKEN_SUB,
    alg=TOKEN_ALG,
    typ=TOKEN_TYP,
)=>{
    let tt=Number(t)
    let t1=now()
    let t2=t1+tt
    let t3=moment.unix(t2).format()
    let a={
      data,
      alg,
      typ ,
      aud,
      sub,
      exp:t2,
      //"iat": <NumericDate>,
      //"nbf": <NumericDate>,
    }
    let token=jwt.sign(a, key);
    return {
        token,
        life:tt,
        startTime:t1,
        expiredTime:t2,
        "expiration":t3,
    }
}


const parse_token=(s="",k=TOKEN_KEY,)=>{
    let r={ok:false,data:{}}
    if ( !s ) {
        return r
    }
    try {
        let decoded = jwt.verify(s, k);
        return {ok:true,data:decoded}
    } catch(err) {
        return r
    }
}


const refresh_token=(
    s="",
    t=TOKEN_LIFE,
    k=TOKEN_KEY,
)=>{
    let r= {
        ok:false,
        old_token:s,
        new_token:"",
        life:0,
        exp:now(),
    }
    if (!s) {
        return r
    }
    let {ok,data}=parse_token(s,k)
    if (ok) {
        let { data:d, alg, typ, aud, sub, exp, }=data
        return {
            ok,
            old_token:s,
            new_token:create_token(d,t,k,aud,sub,alg, typ,),
            life:to_int(t),
            exp:now_add_seconds(t),
        }
    }else{
        return r
    }

}

module.exports={
    create_token,
    create_token1,
    parse_token,
    refresh_token,
}


