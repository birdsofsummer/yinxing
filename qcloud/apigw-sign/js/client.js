const {getSimpleSign,get}=require('./encode')

const test=async ()=>{
    r=await get()
    console.log(r.body)
    return r
}

test()
