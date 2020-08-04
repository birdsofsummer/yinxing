const R=require("ramda")
const a=require("tencentcloud-sdk-nodejs")
const u=require('utility')

get_models=(
    name="json/v3_m.json"
)=>{
    const f=R.pipe(R.toPairs,R.map(([k1,v])=>[k1,R.pipe(R.toPairs,R.map(([k,v])=>[k,new v()]),R.fromPairs)(v.Models)]),R.fromPairs)
    const d=R.map(f,a)
    u.writeJSON(name,d)
    return d
}

get_client=(
    name="json/v3_c.json"
)=>{
    f=R.map(R.pipe(R.prop('Client'),x=>x? new x() :{}))
    const d=R.map(f,a)
    u.writeJSON(name,d)
    //endpoints=R.map(R.map(R.pipe(R.prop('endpoint'))))(d)
    //u.writeJSON("json/end.json",endpoints)
    return d
}


get_keys=(
    name="json/v.json"
)=>{
    const v=R.map(R.keys)(a)
    u.writeJSON(name,v)
}

get_models()



test=()=>{

    let [x,y]= R.props(["SecretId","SecretKey"],process.env)
     b={secretId:x,secretKey:y}
    c=new a.scf.v20180416.Client(...b)
    c.ListFunctions({},console.log)
}

test()
