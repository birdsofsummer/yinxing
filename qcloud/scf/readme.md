```javascript

    const R=require('ramda')
    const tencentcloud=require('tencentcloud-sdk-nodejs')
    //
    const API =  [
        "ListFunctions",
        "ListNamespaces",
        "ListVersionByFunction",

        "GetFunction",
        "GetFunctionAddress",
        "GetFunctionLogs",

        "CopyFunction",
        "CreateFunction",
        "CreateNamespace",
        "CreateTrigger",

        "PublishVersion",
        "UpdateFunctionCode",
        "UpdateFunctionConfiguration",
        "UpdateNamespace",

        "DeleteFunction",
        "DeleteNamespace",
        "DeleteTrigger",

        "doRequest",
        "failRequest",
        "formatRequestData",
        "formatSignString",
        "getEndpoint",
        "mergeData",
        "request",
        "succRequest",
        "Invoke",
    ]

    //数据结构
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

```
