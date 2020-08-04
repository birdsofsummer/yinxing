const R=require('ramda')
const conn=require('./index')

test_v2=async ()=>{
    d1=R.merge(process.env,{ serviceType:'apigateway', })
    c1=conn(d1)
    s={
      Action:"CreateService",
      Region:"ap-shanghai",
      serviceDesc: "ccc",
      serviceName: "ccc",
      protocol:["https"].join('&').toLowerCase(),
    }
    r=await c1(s)
    console.log(r)
}

test_v3=async ()=>{
    d2=R.merge(process.env,{ serviceType:'scf', })
    c2=conn(d2)
    r=await c2._ListFunctions()
    console.log(r)
}


test_v2()
test_v3()
