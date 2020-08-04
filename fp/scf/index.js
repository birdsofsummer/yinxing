const R=require('ramda')
const tencentcloud=require('tencentcloud-sdk-nodejs')

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
    format_kv,
   // promisify_all_arr,
}=require("../index")

const json2env=(d={})=>{
    let env=new Environment()
    env.deserialize({Variables:format_kv(d)})
    return env
}

//add_vars({x:1,y:2},json2env({g:123,h:234}))
const add_vars=(d={},env,)=>{
    if (env) {
        //let v1=format_kv(d)
        //env.Variables.push(...v1)
        let v=env.Variables
        let d1=R.fromPairs([...new Map(R.map(R.props(['Key','Value']))(v).concat(R.toPairs(d)))])
        return json2env(d1)
    }else{
        return json2env(d)
    }
}


const create_tag=(t={ CLI: 'Serverless' })=>{
    const f=([k,v])=>{
        const a=new Tag()
        a.deserialize({Key:k,Value:v})
        return a
    }
    return format_kv(t,f)
}

module.exports={
    json2env,
    add_vars,
    create_tag,
}
