//https://cloud.tencent.com/document/api/583/17235
const tencentcloud=require('tencentcloud-sdk-nodejs')
const R=require('ramda')
const fs=require('mz/fs')
const moment=require('moment')
const path=require('path')


const {read_base64}=require('../io')
const cos=require("../cos")

const now=()=>Math.round(moment.now()/1000)


const {
    AccessInfo,
    Code,
    CopyFunctionRequest,
    CopyFunctionResponse,
    CreateFunctionRequest,
    CreateFunctionResponse,
    CreateNamespaceRequest,
    CreateNamespaceResponse,
    CreateTriggerRequest,
    CreateTriggerResponse,
    DeleteFunctionRequest,
    DeleteFunctionResponse,
    DeleteNamespaceRequest,
    DeleteNamespaceResponse,
    DeleteTriggerRequest,
    DeleteTriggerResponse,
    EipOutConfig,
    Environment,
    Filter,
    //Function,
    FunctionLog,
    FunctionVersion,
    GetFunctionAddressRequest,
    GetFunctionAddressResponse,
    GetFunctionLogsRequest,
    GetFunctionLogsResponse,
    GetFunctionRequest,
    GetFunctionResponse,
    InvokeRequest,
    InvokeResponse,
    ListFunctionsRequest,
    ListFunctionsResponse,
    ListNamespacesRequest,
    ListNamespacesResponse,
    ListVersionByFunctionRequest,
    ListVersionByFunctionResponse,
    LogFilter,
    LogSearchContext,
    Namespace,
    PublishVersionRequest,
    PublishVersionResponse,
    Result,
    Tag,
    Trigger,
    UpdateFunctionCodeRequest,
    UpdateFunctionCodeResponse,
    UpdateFunctionConfigurationRequest,
    UpdateFunctionConfigurationResponse,
    UpdateNamespaceRequest,
    UpdateNamespaceResponse,
    Variable,
    VpcConfig
}=tencentcloud.scf.v20180416.Models

const {
    CONFIG_FILE="../config.toml",
    SecretId,
    SecretKey,
    Region='ap-hongkong',
    Bucket,
    Prefix,
    maxFileSize,
    CodeSource,
    //cos...
    COS_HOST="https://ttt-1252957949.cos.ap-hongkong.myqcloud.com",
    CosBucketName="ttt-1252957949",
    CosBucketRegion="ap-hongkong",
    CosObjectName="",
    TempCosObjectName="",
    version="",
}=process.env

const {
    para,
    format_kv,
}=require('../fp')

const {
    json2env,
    add_vars,
}=require('../fp/scf')

const {
    conn,
    create_req,
}=require("../qcloud/v3")

const {
    read_toml,
    read_toml1,
}=require("../io/toml")

const {
    parse_toml_configs,
}=require("./read_config")


//https://github.com/tc39/proposal-top-level-await
//(async (CONFIG_FILE="/tmp/config.toml")=>{
//     let configs=await read_toml(CONFIG_FILE)
//     let t=parse_toml_configs(configs)
//     NS=t.NS
//     FN_CONFIG=t.FN_CONFIG
//     GIT=t.FN_CONFIG
//})()

const configs=read_toml1(CONFIG_FILE)
const configs_parsed=parse_toml_configs(configs)

const verify_size=(z="")=>{
    if (z.length > 20*Math.pow(1024,2)){
        throw "<20m"
    }
}


const {
        FN,
        TMP_DIR,
        FN_ENV,
        NS,
        FN_CONFIG,
        GIT,
        fn_zip,
        fn_detail,
}=configs_parsed

//------------------------------------------------------------------------------------
//https://cloud.tencent.com/document/api/583/18580
//'{"Variables":[{"Key":"k1","Value":"v1"},{"Key":"k2","Value":"v2"}]}'
// {RequestId: '1856d711-26b9-4166-94dd-744cdf3434d3'}



//-------------------------------------------env--------------------------------------------------------

const set_env=async (c,config={FunctionName:"hello"},d={})=>{
    let env=add_vars(d,FN_CONFIG.Environment)
    let d1={
        ...FN_CONFIG,
        Environment:env,
        ...config,
    }
    let req=create_req(UpdateFunctionConfigurationRequest,d1)
    let r=await c._UpdateFunctionConfiguration(req)
    let {FunctionName}=config
    let r1=await c._GetFunction({FunctionName})
    console.log(r)
    console.log(r1)
    return r1
}

const set_env_yaml=(c,file_name='template.yaml')=>{
    const {read_env}=require("./env")
    let {name,props,Timeout}=read_env(file_name)
    let vars=props.Environment.Variables
    let e=add_vars(vars,FN_CONFIG.Environment)
    let d1={
        ...FN_CONFIG,
        ...props,
        FunctionName:name,
        Timeout,
        Environment:e,
    }
    let req=create_req(UpdateFunctionConfigurationRequest,d1)
    console.log(req)
    return c._UpdateFunctionConfiguration(req)
}


//-------------------------------------------fn--------------------------------------------------------


const list_fn=async (d={})=>{
  let  c=conn()
  return c._ListFunctions(d)
}

const copy_fn=async (d={})=>{
    let c=conn()
    let req=create_req(CopyFunctionRequest,d)
    return c._CopyFunction(req)
}

const publish_fn=(config={FunctionName:"hello",Description:""})=>{
    let c=conn()
    let req=create_req(PublishVersionRequest,FN_CONFIG,config)
    return c._PublishVersion(req)
}

const del_fn=(config={FunctionName:"hello",Namespace:"test"})=>{
    let c=conn()
    let req=create_req(DeleteFunctionRequest,config)
    return c._DeleteFunction(req)

}

//--------------------------------------ns------------------------------------------------

const init_ns=async (ns=[])=>{
       if (R.isEmpty(ns)){
            return []
       }
       let c=conn()
       //let req=await para(c._DeleteNamespace,ns)
       let req=await para(c._CreateNamespace,ns)
       let ns_list1=await c._ListNamespaces()
       console.log(req)
       console.log(ns_list1)
       return ns_list1
}

const check_ns=async (c,ns1,ns2)=>{
       let {Namespaces,TotalCount}=await c._ListNamespaces({})
       if (TotalCount<1||Namespaces.filter(x=>x.Namespace==ns1)==0 ){
           throw "no source ns"
       }else if(Namespaces.filter(x=>x.Namespace==ns2)==0){
           return c._CreateNamespace({
                "Namespace": ns2,
                "Description":ns2,
           })
       }
}

const copy_ns=async (ns1,ns2,{Region}=process.env)=>{
       let c=conn()
       await check_ns(c,ns1,ns2)
       let r=await c._ListFunctions({"Namespace":ns1})
       let d=r.Functions.map(x=>({
			"FunctionName": x.FunctionName,
			"NewFunctionName": x.FunctionName,
			"Namespace": ns1,
			"TargetNamespace": ns2,
			"Description": x.Description,
			"TargetRegion": Region,
			"Override": "TRUE",
			"CopyConfiguration": "TRUE",
        }))
       return para(copy_fn,d)
}



const test_copy_fn=()=>{
    let cfg={
			"FunctionName": "pan-php",
			"NewFunctionName": "pan-php-tttt",
			"Namespace": "default",
			"TargetNamespace": "test1",
			"Description": "ddd",
			"TargetRegion": Region,
			"Override": "TRUE",
			"CopyConfiguration": "TRUE",
    }
    return  copy_fn(cfg)
}


//--------------------------------------ns------------------------------------------------

//"/tmp/user.zip" -> https://....com/server/user_123.zip
const upload=async (file="/tmp/user.zip")=>{

    const file_name=path.basename(file)
    let {name,ext}=path.parse(file)
    let file_name1=[name,version].join("_")+ext
    let Key=path.resolve("/server/",file_name1)

    console.log('--------------begin upload zip-------------\n')
    const t0=now()
    let up=await cos.slice_upload(file,Key)
    const t1=now()

    console.log('----------------------------------\n')
    console.log(up)
    console.log(t1-t0)
    console.log('--------------finish upload zip-------------\n')
    return up
}


const cos_create_fn=async ({ FunctionName,ZipFile,env={}, ...config})=>{

    if(!FunctionName) {
        throw "no fn name"
    }
    let c=conn()
    let k=path.resolve("/server/",FunctionName+"_"+version+".zip")

    // http://ttt-1252957949.cos.ap-hongkong.myqcloud.com/server/user_1581043843.zip
    let code=create_req(Code,{
          CosBucketName,
          CosBucketRegion,
          CosObjectName:k,
    })

    let d={
        ...FN_CONFIG,
        CodeSource:'Cos',
        //Type:"HTTP", //Event
        Code:code,
        ...config,
        FunctionName,
    }
    console.log(d)
    let d1= R.pickAll(["FunctionName","Description","Namespace"])(d)

    let r=await c._CreateFunction(create_req(CreateFunctionRequest,d))
    let r1=await set_env(c,d,env)
    let r3=await c._PublishVersion(create_req(PublishVersionRequest,d1))
    let r2=await c._GetFunction({FunctionName})

    console.log('----------create fn------------------------\n')
    console.log(r)
    console.log('----------set env------------------------\n')
    console.log(r1)
    console.log('----------get fn------------------------\n')
    console.log(r2)
    console.log('----------publish------------------------\n')
    console.log(r3)
    console.log('-----------------------------------------\n')
    return r2
}


//ZipFile 包含函数代码文件及其依赖项的 zip 格式文件，
//使用该接口时要求将 zip 文件的内容转成 base64 编码
//最大支持20M!!!
//https://cloud.tencent.com/document/api/583/18586

const zip_create_fn=async ({ FunctionName, ZipFile , env={}, ...config})=>{
    if(!FunctionName) {
        throw "no fn name"
    }
    let c=conn()

    let z=await read_base64(ZipFile)
    verify_size(z)

    let code=create_req(Code,{ZipFile:z})
    let d={
        ...FN_CONFIG,
        CodeSource:"ZipFile",
        //Type:"HTTP", //Event
        Code:code,
        ...config,
        FunctionName,
    }
    console.log(d)
    let d1= R.pickAll(["FunctionName","Description","Namespace"])(d)

    let req=create_req(CreateFunctionRequest,d)
    let r=await c._CreateFunction(req)
    let r1=await set_env(c,d,env)
    let r2=await c._GetFunction({FunctionName})
    let r3=await c._PublishVersion(create_req(PublishVersionRequest,d1))

    console.log(r)
    console.log(r1)
    console.log(r2)
    console.log(r3)
    return r2
}


const git_create_fn=async ({FunctionName,env={},git=GIT,...config})=>{
    if(!FunctionName) {
        throw "no fn name"
    }
    let c=conn()
    let code=create_req(Code,git)
    let d={
        ...FN_CONFIG,
        CodeSource:"Git",
        //Type:"HTTP", //Event
        Code:code,
        ...config,
        FunctionName,
    }

    let d1= R.pickAll(["FunctionName","Description","Namespace"])(d)
    let req=create_req(CreateFunctionRequest,d)
    let r=await c._CreateFunction(req)
    let r1=await set_env(c,d,env)
    let r2=await c._GetFunction({FunctionName})
    let r3=await c._PublishVersion(create_req(PublishVersionRequest,d1))

    console.log(r)
    console.log(r1)
    console.log(r2)
    console.log(r3)

    return r2
}



const cos_update_fn=async ({
        FunctionName,
        Description="",
        Namespace="test",
        ZipFile,
        ...config
    })=>{
    let c=conn()

    let k=path.resolve("/server/",FunctionName+"_"+version+".zip")

    let code=create_req(Code,{
          CosBucketName,
          CosObjectName:k,
          CosBucketRegion,
    })
    let d={
        ...FN_CONFIG,
        FunctionName,
        Description,
        Namespace,
      //  CosBucketName: null,
      //  CosObjectName: null,
      //  CosBucketRegion: null,
      //  EnvId: null,
      //  Publish: "TRUE",
        ZipFile,
        Code: code,
        CodeSource:'ZipFile',
        ...config,
    }

    console.log('----------update fn------------------------\n')
    let r1=await c._UpdateFunctionCode(create_req(PublishVersionRequest,d))
    console.log('----------finish update fn------------------\n')
    //let d1= R.pickAll(["FunctionName","Description","Namespace"])(d)
    return r1
}



//ZipFile 包含函数代码文件及其依赖项的 zip 格式文件，
//使用该接口时要求将 zip 文件的内容转成 base64 编码
//最大支持20M!!!
//https://cloud.tencent.com/document/api/583/18581
const zip_update_fn=async ({
        FunctionName,
        Description="",
        Namespace="test",
        ZipFile,
        ...config
    })=>{
    let c=conn()
    let z=await read_base64(ZipFile)
    verify_size(z)
    let code=create_req(Code,{ZipFile:z})
    let d={
        ...FN_CONFIG,
        FunctionName,
        Description,
        Namespace,
      //  CosBucketName: null,
      //  CosObjectName: null,
      //  CosBucketRegion: null,
      //  EnvId: null,
      //  Publish: "TRUE",
        ZipFile ,
        Code: code,
        CodeSource:'ZipFile',
        ...config,
    }
    let req=create_req(PublishVersionRequest,d)
    return c._UpdateFunctionCode(req)
}

const git_update_fn=({FunctionName,...config})=>{
    let c=conn()
    let code=create_req(Code,{
        ...GIT,
        ...config,
      //  GitUrl,
      //  GitUserName,
      //  GitPassword,
      //  GitPasswordSecret,
      //  GitBranch,
      //  GitDirectory,
      //  GitCommitId,
      //  GitUserNameSecret
    })
    let {Namespace}=FN_CONFIG
    let d={
        Namespace,
        FunctionName,
        Description,
      // ...FN_CONFIG,
      //  Namespace: null,
      //  CosBucketName: null,
      //  CosObjectName: null,
      //  CosBucketRegion: null,
      //  EnvId: null,
      //  Publish: "TRUE",
      //  ZipFile: file_name,
      //  Code: code,
      //  CodeSource:"Git",
    }
    let req=create_req(PublishVersionRequest,d)
    return c._UpdateFunctionCode(req)
}


module.exports={
    now,
    set_env,
    set_env_yaml,
    list_fn,
    del_fn,
    copy_fn,
    publish_fn,

    zip_create_fn,
    zip_update_fn,

    upload,
    cos_create_fn,
    cos_update_fn,

    git_create_fn,
    git_update_fn,

    init_ns,
    copy_ns,
    configs,
    configs_parsed,
}
