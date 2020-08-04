const {
    normalize_k,
}=require("../fp")

const joi=Joi=require("@hapi/joi")

const validate_by=(schema={},d={})=>Joi.object(schema).validate(normalize_k(schema)(d))
const validate_arr=(schema=[],d=[])=>Joi.array().items(Joi.object().keys(schema)).validate(d.map(normalize_k(schema))) // 允许多余key

const test_validate_arr=()=>{
    schema={
              username:Joi.string().required().min(3).max(20),
              phone:Joi.string().required().min(11).max(11),
              password:Joi.string().min(6).max(16),
    }

    d1=[{username:"ccc","phone":"12341234123",password:"123456",pwd:123}]
    d2=[{username:"",password:"123",pwd:123}]

    r1=validate_arr(schema,d1)
    r2=validate_arr(schema,d2)
}


const mongo_id=Joi.string().required().min(12).max(12)
const phone=Joi.string().min(11).max(11)
const phone1=Joi.compile(/^[1][3-8][0-9]{9}$/)
const captcha=Joi.compile(/^[0-9]{6}$/)


module.exports={
    validate_by,
    validate_arr,
    mongo_id,
    phone,
    phone1,
    captcha,
}



