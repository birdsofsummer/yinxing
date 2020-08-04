const joi=Joi=require("@hapi/joi")
const R=require("ramda")

const {
    validate_by,
    validate_arr,
    mongo_id,
    phone,
    phone1,
    captcha,

}=require("yinxing/validate/joi")

const password=Joi.string().min(6).max(12)

const user_basic_c={
      username:Joi.string().required().min(1).max(20),
      phone:Joi.string().required().min(11).max(11),
      password,
     //...
}

const user_basic_u={
      _id:mongo_id,
      username:Joi.string().min(1).max(20),
      phone:Joi.string().min(11).max(11),
      password,
}

const user_basic_d={
      _id:mongo_id,
}

const user_basic_ds={
    data:Joi.array().items(Joi.object().keys({
        _id:mongo_id,
    })),
}

const user_basics={
    data:Joi.array().items(Joi.object().keys({
          username:Joi.string().required().min(3).max(20),
          phone:Joi.string().required().min(11).max(11),
          password:Joi.string().min(6).max(16),
    })),
}

const login1={
      username:Joi.string().required().min(3).max(20),
      password:Joi.string().min(6).max(9),
}

const default_user_basic={
    username:"xxx",
    age:2,
}


const code_v={
    phone: phone1,
    code: captcha,
}

//reset_pwd
const pwd1={
    code:captcha,
    password:Joi.string().required().min(6).max(12),
    phone:phone1,
}

//forget_pwd
const forget_pwd_v={
    phone:phone1,
}

const user_detail_c={


}


const user_detail_u={


}

const user_detail_d={
      _id:mongo_id,
}

const user_detail_ds={
    data:Joi.array().items(Joi.object().keys({
          _id:mongo_id,
    })),
}


const forget_pwd=async (ctx,next)=>{
      let d=ctx.params
      let schema=forget_pwd_v

      let {value,error} = validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}



const login_v1=async (ctx,next)=>{
      let d=ctx.params
      let schema=login1

      let {value,error} = validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const login_v2=async (ctx,next)=>{
      let d=ctx.params
      let schema=login1 //

      let {value,error} = validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_basic_create=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_basic_c

      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_basic_delete=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_basic_d

      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}


const user_basic_deletes=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_basic_ds

      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_basic_creates=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_basics
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_basic_update=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_basic_u
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}


const reset_pwd=async (ctx,next)=>{
      let d=ctx.params
      let schema=pwd1
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_detail_create=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_detail_c
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_detail_update=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_detail_u
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_detail_delete=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_detail_d
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}

const user_detail_deletes=async (ctx,next)=>{
      let d=ctx.params
      let schema=user_detail_ds
      let {value,error}=validate_by(schema,d)
      if (error){
          return ctx.error_400(error)
      }
      //ctx.payload=value
      await next()
}



module.exports={

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
}




















test=()=>{

    d1={
        username:"ccc",
        password:"123456",
        phone:"12345678123",
    }

    d2={username:"c",password:""}

    s1=user_basic
    s2=user_basics

    r1=validate_by(s1,d1)
    r2=validate_by(s1,d2)

    d3={data:[d1,d1]}
    d4={data:[d1,d2]}

    r3=validate_by(s2,d3)
    r4=validate_by(s2,d4)

    console.log(r1)
    console.log(r2)
    console.log(r3)
    console.log(r4)

}




