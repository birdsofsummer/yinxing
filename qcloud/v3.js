const R=require('ramda')
const tencentcloud=require('tencentcloud-sdk-nodejs')
const {Credential} = tencentcloud.common
const {
    get_proto_keys,
    promisify_all_arr,
}=require('../fp')

const create_req=(fn,d1={},d2={})=>{
    let req=new fn()
    let d=R.merge(d1,d2)
    Object.assign(req,d)
    return req
}

const conn=({
    SecretId,
    SecretKey,
    Region,
    serviceType = 'scf',
}=process.env)=>{
   let cred=new Credential(SecretId,SecretKey)
   let a=R.reduce((x,[k,v])=>({...x,[k]:R.last(R.values(v))}))({})(R.toPairs(tencentcloud)) //最后一版
   const {Client, Models}=a[serviceType]
   let c=new Client(cred,Region)
   let m=get_proto_keys(c)
   //let c=new tencentcloud[serviceType].v20180416.Client(cred,Region)
//   let m= R.keys(tencentcloud.scf.v20180416.Models).filter(x=>/resp/i.test(x)).map(x=>x.replace(/resp.*/i,'')).sort()
   return promisify_all_arr(c,m)
}

module.exports={
    create_req,
    conn,
}
