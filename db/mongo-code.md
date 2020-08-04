[doc](https://cloud.tencent.com/document/product/240/38577 "")  


/xbin/node/lib/node_modules/mongodb/lib/operations/db_ops.js

```javascript

    const error = new MongoError('server/primary/mongos does not support collation');
    error.code = 67;

    /**
     * The following errors mean that the server recognized `createIndex` as a command so we don't need to fallback to an insert:
     * 67 = 'CannotCreateIndex' (malformed index options)
     * 85 = 'IndexOptionsConflict' (index already exists with different options)
     * 86 = 'IndexKeySpecsConflict' (index already exists with the same name)
     * 11000 = 'DuplicateKey' (couldn't build unique index because of dupes)
     * 11600 = 'InterruptedAtShutdown' (interrupted at shutdown)
     * 197 = 'InvalidIndexSpecificationOption' (`_id` with `background: true`)
     */

```



# 腾讯云

## res


```json
{
    "Response": {
        "Error": {
            "Code": "AuthFailure.SignatureFailure",
            "Message": "The provided credentials could not be validated. Please check your signature is correct."
        },
        "RequestId": "ed93f3cb-f35e-473f-b9f3-0d451b8b79c6"
    }
}

```

## code

type

+  0  通用错误 
+  1  业务错误



```
[
	{
		"Code": "AuthFailure.InvalidSecretId",
		"Message": "密钥非法（不是云 API 密钥类型）。",
		"type": 0
	},
	{
		"Code": "AuthFailure.MFAFailure",
		"Message": "MFA 错误。",
		"type": 0
	},
	{
		"Code": "AuthFailure.SecretIdNotFound",
		"Message": "密钥不存在。 请在控制台检查密钥是否已被删除或者禁用，如状态正常，请检查密钥是否填写正确，注意前后不得有空格。",
		"type": 0
	},
	{
		"Code": "AuthFailure.SignatureExpire",
		"Message": "签名过期。Timestamp 和服务器时间相差不得超过五分钟，请检查本地时间是否和标准时间同步。",
		"type": 0
	},
	{
		"Code": "AuthFailure.SignatureFailure",
		"Message": "签名错误。 签名计算错误，请对照调用方式中的接口鉴权文档检查签名计算过程。",
		"type": 0
	},
	{
		"Code": "AuthFailure.TokenFailure",
		"Message": "token 错误。",
		"type": 0
	},
	{
		"Code": "AuthFailure.UnauthorizedOperation",
		"Message": "请求未授权。请参考 CAM 文档对鉴权的说明。",
		"type": 0
	},
	{
		"Code": "DryRunOperation",
		"Message": "DryRun 操作，代表请求将会是成功的，只是多传了 DryRun 参数。",
		"type": 0
	},
	{
		"Code": "FailedOperation",
		"Message": "操作失败。",
		"type": 0
	},
	{
		"Code": "InternalError",
		"Message": "内部错误。",
		"type": 0
	},
	{
		"Code": "InvalidAction",
		"Message": "接口不存在。",
		"type": 0
	},
	{
		"Code": "InvalidParameter",
		"Message": "参数错误。",
		"type": 0
	},
	{
		"Code": "InvalidParameterValue",
		"Message": "参数取值错误。",
		"type": 0
	},
	{
		"Code": "LimitExceeded",
		"Message": "超过配额限制。",
		"type": 0
	},
	{
		"Code": "MissingParameter",
		"Message": "缺少参数错误。",
		"type": 0
	},
	{
		"Code": "NoSuchVersion",
		"Message": "接口版本不存在。",
		"type": 0
	},
	{
		"Code": "RequestLimitExceeded",
		"Message": "请求的次数超过了频率限制。",
		"type": 0
	},
	{
		"Code": "ResourceInUse",
		"Message": "资源被占用。",
		"type": 0
	},
	{
		"Code": "ResourceInsufficient",
		"Message": "资源不足。",
		"type": 0
	},
	{
		"Code": "ResourceNotFound",
		"Message": "资源不存在。",
		"type": 0
	},
	{
		"Code": "ResourceUnavailable",
		"Message": "资源不可用。",
		"type": 0
	},
	{
		"Code": "UnauthorizedOperation",
		"Message": "未授权操作。",
		"type": 0
	},
	{
		"Code": "UnknownParameter",
		"Message": "未知参数错误。",
		"type": 0
	},
	{
		"Code": "UnsupportedOperation",
		"Message": "操作不支持。",
		"type": 0
	},
	{
		"Code": "UnsupportedProtocol",
		"Message": "HTTP(S)请求协议错误，只支持 GET 和 POST 请求。",
		"type": 0
	},
	{
		"Code": "UnsupportedRegion",
		"Message": "接口不支持所传地域。",
		"type": 0
	},
	{
		"Code": "InternalError",
		"Message": "内部错误",
		"type": 1
	},
	{
		"Code": "InvalidParameter",
		"Message": "参数错误",
		"type": 1
	},
	{
		"Code": "InvalidParameter.PermissionDenied",
		"Message": "当前子帐号无权执行该操作。",
		"type": 1
	},
	{
		"Code": "InvalidParameter.ZoneClosed",
		"Message": "可用区已关闭售卖。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.BackupFileNotFound",
		"Message": "备份文件未找到。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ClusterTypeError",
		"Message": "无效的实例类型。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.IllegalInstanceName",
		"Message": "非法的实例名。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.IllegalInstanceStatus",
		"Message": "非法的实例状态。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.IllegalStatusToOffline",
		"Message": "实例状态不允许进行下线，进行下线操作的实例状态必须为隔离状态。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.InstanceHasBeenDeleted",
		"Message": "实例已删除。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.InstanceHasBeenIsolated",
		"Message": "实例已隔离。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.InvalidTradeOperation",
		"Message": "计费相关错误，不允许对当前实例进行对应的新购/续费/配置变更操作。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.LockFailed",
		"Message": "实例锁定失败。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.MachineTypeError",
		"Message": "错误的机型。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ModifyModeError",
		"Message": "内存和磁盘必须同时升配或降配。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.MongoVersionError",
		"Message": "实例版本错误。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.MongoVersionNotSupportQueryClient",
		"Message": "实例版本不支持查询客户端信息。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.NotFoundInstance",
		"Message": "未找到实例。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.OplogSizeOutOfRange",
		"Message": "OplogSize参数设置错误，应介于磁盘容量的10%和90%之间。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.PasswordRuleFailed",
		"Message": "密码不符合规范。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.PostPaidInstanceBeyondLimit",
		"Message": "单个地域后付费实例数量超过限制。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.PrePaidInstanceUnableToIsolate",
		"Message": "预付费实例不支持销毁。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ProjectNotFound",
		"Message": "项目不存在。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ProxyNotSupportQueryClient",
		"Message": "proxy版本不支持查询客户端信息，请联系工作人员进行升级。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.RegionError",
		"Message": "无效的地域。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.RegionNotSupportQueryClient",
		"Message": "地域尚不支持查询客户端信息。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ReplicaSetNumError",
		"Message": "副本集（分片）数量错误。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.SecondaryNumError",
		"Message": "从节点数错误。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.SetDiskLessThanUsed",
		"Message": "设置的磁盘大小不得低于已用磁盘的1.2倍。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.SpecNotOnSale",
		"Message": "购买规格错误。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.StatusAbnormal",
		"Message": "实例处于不允许操作的状态。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.TagNotFound",
		"Message": "未找到指定的标签。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.VpcIdOrSubnetIdNotFound",
		"Message": "未找到虚拟网络（子网）。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ZoneClosed",
		"Message": "可用区已关闭售卖。",
		"type": 1
	},
	{
		"Code": "InvalidParameterValue.ZoneError",
		"Message": "无效的可用区。",
		"type": 1
	}
]

```
