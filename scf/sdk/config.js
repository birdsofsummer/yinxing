//https://cloud.tencent.com/document/product/583/17238
//本产品所有接口 Region 字段的可选值如下表所示。如果接口不支持该表中的所有地域，则会在接口文档中单独说明。

const Regions= {
	"ap-beijing": "华北地区(北京)",
	"ap-chengdu": "西南地区(成都)",
	"ap-guangzhou": "华南地区(广州)",
	"ap-guangzhou-open": "华南地区(广州Open)",
	"ap-hongkong": "港澳台地区(中国香港)",
	"ap-mumbai": "亚太南部(孟买)",
	"ap-shanghai": "华东地区(上海)",
	"ap-singapore": "亚太东南(新加坡)",
	"na-siliconvalley": "美国西部(硅谷)",
}

//-----------------手写sdk------------------------------------------------------------------------------------------------

let SDK_CONFIG={
    sdkVersion: 'SDK_NODEJS_3.0.93',
    apiVersion: '2018-04-16',
    endpoint: 'scf.tencentcloudapi.com',
    host:"https://scf.tencentcloudapi.com",
    signMethod: 'HmacSHA256',
    protocol: 'https://',
    path:"/",
    reqMethod: 'POST',
    reqTimeout: 60,
}


let SDK_Headers={
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12A365 MicroMessenger/5.4.1 NetType/WIFI",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Accept-Encoding": "gzip, deflate, br",
}

let SDK_API= {
	"CreateFunction": {
		"action": "CreateFunction",
		"name": "创建函数",
		"method": "post",
		"req": "CreateFunctionRequest",
		"res": "CreateFunctionResponse",
		"data0": {
			"FunctionName": null,
			"Code": null,
			"Handler": null,
			"Description": null,
			"MemorySize": null,
			"Timeout": null,
			"Environment": null,
			"Runtime": null,
			"VpcConfig": null,
			"Namespace": null,
			"Role": null,
			"ClsLogsetId": null,
			"ClsTopicId": null,
			"Type": null,
			"CodeSource": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"DeleteFunction": {
		"action": "DeleteFunction",
		"name": "删除函数",
		"method": "post",
		"req": "DeleteFunctionRequest",
		"res": "DeleteFunctionResponse",
		"data0": {
			"FunctionName": null,
			"Namespace": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"GetFunction": {
		"action": "GetFunction",
		"name": "获取函数详细信息",
		"method": "post",
		"req": "GetFunctionRequest",
		"res": "GetFunctionResponse",
		"data0": {
			"FunctionName": null,
			"Qualifier": null,
			"Namespace": null,
			"ShowCode": null
		},
		"data1": {
			"ModTime": null,
			"CodeInfo": null,
			"Description": null,
			"Triggers": null,
			"Handler": null,
			"CodeSize": null,
			"Timeout": null,
			"FunctionVersion": null,
			"MemorySize": null,
			"Runtime": null,
			"FunctionName": null,
			"VpcConfig": null,
			"UseGpu": null,
			"Environment": null,
			"CodeResult": null,
			"CodeError": null,
			"ErrNo": null,
			"Namespace": null,
			"Role": null,
			"InstallDependency": null,
			"Status": null,
			"StatusDesc": null,
			"ClsLogsetId": null,
			"ClsTopicId": null,
			"FunctionId": null,
			"Tags": null,
			"EipConfig": null,
			"AccessInfo": null,
			"Type": null,
			"L5Enable": null,
			"RequestId": null
		}
	},
	"ListNamespaces": {
		"action": "ListNamespaces",
		"name": "列出命名空间列表",
		"method": "post",
		"req": "ListNamespacesRequest",
		"res": "ListNamespacesResponse",
		"data0": {
			"Limit": null,
			"Offset": null,
			"Orderby": null,
			"Order": null
		},
		"data1": {
			"Namespaces": null,
			"TotalCount": null,
			"RequestId": null
		}
	},
	"GetFunctionAddress": {
		"action": "GetFunctionAddress",
		"name": "获取函数代码下载地址",
		"method": "post",
		"req": "GetFunctionAddressRequest",
		"res": "GetFunctionAddressResponse",
		"data0": {
			"FunctionName": null,
			"Qualifier": null,
			"Namespace": null
		},
		"data1": {
			"Url": null,
			"CodeSha256": null,
			"RequestId": null
		}
	},
	"Invoke": {
		"action": "Invoke",
		"name": "运行函数",
		"method": "post",
		"req": "InvokeRequest",
		"res": "InvokeResponse",
		"data0": {
			"FunctionName": null,
			"InvocationType": null,
			"Qualifier": null,
			"ClientContext": null,
			"LogType": null,
			"Namespace": null
		},
		"data1": {
			"Result": null,
			"RequestId": null
		}
	},
	"UpdateFunctionConfiguration": {
		"action": "UpdateFunctionConfiguration",
		"name": "更新函数配置",
		"method": "post",
		"req": "UpdateFunctionConfigurationRequest",
		"res": "UpdateFunctionConfigurationResponse",
		"data0": {
			"FunctionName": null,
			"Description": null,
			"MemorySize": null,
			"Timeout": null,
			"Runtime": null,
			"Environment": null,
			"Namespace": null,
			"VpcConfig": null,
			"Role": null,
			"ClsLogsetId": null,
			"ClsTopicId": null,
			"Publish": null,
			"L5Enable": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"ListVersionByFunction": {
		"action": "ListVersionByFunction",
		"name": "查询函数版本",
		"method": "post",
		"req": "ListVersionByFunctionRequest",
		"res": "ListVersionByFunctionResponse",
		"data0": {
			"FunctionName": null,
			"Namespace": null
		},
		"data1": {
			"FunctionVersion": null,
			"Versions": null,
			"RequestId": null
		}
	},
	"CreateNamespace": {
		"action": "CreateNamespace",
		"name": "创建命名空间",
		"method": "post",
		"req": "CreateNamespaceRequest",
		"res": "CreateNamespaceResponse",
		"data0": {
			"Namespace": null,
			"Description": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"DeleteNamespace": {
		"action": "DeleteNamespace",
		"name": "删除命名空间",
		"method": "post",
		"req": "DeleteNamespaceRequest",
		"res": "DeleteNamespaceResponse",
		"data0": {
			"Namespace": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"CopyFunction": {
		"action": "CopyFunction",
		"name": "复制函数",
		"method": "post",
		"req": "CopyFunctionRequest",
		"res": "CopyFunctionResponse",
		"data0": {
			"FunctionName": null,
			"NewFunctionName": null,
			"Namespace": null,
			"TargetNamespace": null,
			"Description": null,
			"TargetRegion": null,
			"Override": null,
			"CopyConfiguration": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"ListFunctions": {
		"action": "ListFunctions",
		"name": "获取函数列表",
		"method": "post",
		"req": "ListFunctionsRequest",
		"res": "ListFunctionsResponse",
		"data0": {
			"Order": null,
			"Orderby": null,
			"Offset": null,
			"Limit": null,
			"SearchKey": null,
			"Namespace": null,
			"Description": null,
			"Filters": null
		},
		"data1": {
			"Functions": null,
			"TotalCount": null,
			"RequestId": null
		}
	},
	"DeleteTrigger": {
		"action": "DeleteTrigger",
		"name": "删除触发器",
		"method": "post",
		"req": "DeleteTriggerRequest",
		"res": "DeleteTriggerResponse",
		"data0": {
			"FunctionName": null,
			"TriggerName": null,
			"Type": null,
			"Namespace": null,
			"TriggerDesc": null,
			"Qualifier": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"UpdateFunctionCode": {
		"action": "UpdateFunctionCode",
		"name": "更新函数代码",
		"method": "post",
		"req": "UpdateFunctionCodeRequest",
		"res": "UpdateFunctionCodeResponse",
		"data0": {
			"Handler": null,
			"FunctionName": null,
			"CosBucketName": null,
			"CosObjectName": null,
			"ZipFile": null,
			"Namespace": null,
			"CosBucketRegion": null,
			"EnvId": null,
			"Publish": null,
			"Code": null,
			"CodeSource": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"GetFunctionLogs": {
		"action": "GetFunctionLogs",
		"name": "获取函数运行日志",
		"method": "post",
		"req": "GetFunctionLogsRequest",
		"res": "GetFunctionLogsResponse",
		"data0": {
			"FunctionName": null,
			"Offset": null,
			"Limit": null,
			"Order": null,
			"OrderBy": null,
			"Filter": null,
			"Namespace": null,
			"Qualifier": null,
			"FunctionRequestId": null,
			"StartTime": null,
			"EndTime": null,
			"SearchContext": null
		},
		"data1": {
			"TotalCount": null,
			"Data": null,
			"SearchContext": null,
			"RequestId": null
		}
	},
	"CreateTrigger": {
		"action": "CreateTrigger",
		"name": "设置函数触发方式",
		"method": "post",
		"req": "CreateTriggerRequest",
		"res": "CreateTriggerResponse",
		"data0": {
			"FunctionName": null,
			"TriggerName": null,
			"Type": null,
			"TriggerDesc": null,
			"Namespace": null,
			"Qualifier": null,
			"Enable": null
		},
		"data1": {
			"TriggerInfo": null,
			"RequestId": null
		}
	},
	"UpdateNamespace": {
		"action": "UpdateNamespace",
		"name": "更新命名空间",
		"method": "post",
		"req": "UpdateNamespaceRequest",
		"res": "UpdateNamespaceResponse",
		"data0": {
			"Namespace": null,
			"Description": null
		},
		"data1": {
			"RequestId": null
		}
	},
	"PublishVersion": {
		"action": "PublishVersion",
		"name": "发布新版本",
		"method": "post",
		"req": "PublishVersionRequest",
		"res": "PublishVersionResponse",
		"data0": {
			"FunctionName": null,
			"Description": null,
			"Namespace": null
		},
		"data1": {
			"FunctionVersion": null,
			"CodeSize": null,
			"MemorySize": null,
			"Description": null,
			"Handler": null,
			"Timeout": null,
			"Runtime": null,
			"Namespace": null,
			"RequestId": null
		}
	}
}

module.exports={
    Regions,
    SDK_CONFIG,
    SDK_Headers,
    SDK_API,
}


