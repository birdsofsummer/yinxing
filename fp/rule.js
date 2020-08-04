const moment=require("moment")

const  is_s=(x)=>x.constructor==String
const  is_in_length_range=([a,b])=>(x="")=>is_s(x) ? x.length<=b && x.length>=a : false
const  is_n=(x)=>Number.isInteger(+x)
const  is_in_range=([a,b])=>(x=0)=>is_n(x) ? x<=b && x>=a : false
const  is_in_enum=(arr=[])=>(x="")=>arr.includes(x)

module.exports={
    is_s,
    is_in_length_range,
    is_n,
    is_in_range,
    is_in_enum,
}
