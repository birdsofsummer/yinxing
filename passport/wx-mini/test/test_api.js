const {conn}=require("../api")

const test=async ()=>{
    a=conn()
    d={js_code:"123"}

    r1=await a.login(d)
    r2=await a.token()
}



