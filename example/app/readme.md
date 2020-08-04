# app

|method|path|data|
|---|---|----
|get|/list|{}
|post|/insert|{"name":"xxx",...}
|post|/update|{"_id":"xxx",...}
|post|/delete|{"_id":"xxx"}
|post|/find|{"_id":"xxx"}
|post|/bind|{"_id":"xxx",users:[uid1,uid2,...],role:[rid1,rid2]}
|post|/unbind|{"_id":"xxx",users:[uid2,uid2],role:[rid1,rid2]}


```json
{
    "_id":"xxxx",
    "app_key":"xxxx",
    "secret_key":"xxx",
    "name":"ccc",
    "info":"xxxx"
}

```



|字段|示例|说明|
|---|---|---
|_id| "xxxx"| _id
|app_key|"************************"|随机数
|secret_key|"********************************"|随机数
|name|"ccc"|app name
|info|""|备注



