const assert=require('assert')
const {formatSignString}=require("../fp")
const {ajax,}=require("./sdk")

const test_formatSignString=()=>{
   let u="scf.tencentcloudapi.com"
   let m="POST"
   let d={
          Action: 'ListFunctions',
          Nonce: '7537',
          RequestClient: 'SDK_NODEJS_3.0.93',
          SecretId: 'AKIDlQ2ZnrCd2iI1bx5F9i9dtSn374tsacZc',
          Timestamp: '1575378005',
          Version: '2018-04-16'
   }
   let path="/"
   let r1=formatSignString(u,m,d,path)
   let r2="POSTscf.tencentcloudapi.com/?Action=ListFunctions&Nonce=7537&RequestClient=SDK_NODEJS_3.0.93&SecretId=AKIDlQ2ZnrCd2iI1bx5F9i9dtSn374tsacZc&Timestamp=1575378005&Version=2018-04-16"
   assert.equal(r1,r2)
}

const test_ajax=async ()=>{

    let r1=await ajax({action:"ListNamespaces",data:{}})
    let ns=r1.body.Response
    console.log(ns)
    assert.ok(r1.ok)
    assert.ok(ns.TotalCount>0)

    let r2=await ajax({action:"ListFunctions",data:{}})
    let fn=r2.body.Response
    console.log(fn)
    assert.ok(r2.ok)
    assert.ok(fn.TotalCount>0)
}

main=()=>{
    test_formatSignString()
    test_ajax()
}

main()

module.exports={
    test_formatSignString,
    test_ajax,
    main,
}
