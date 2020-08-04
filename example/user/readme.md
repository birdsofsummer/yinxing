## user_basic

|method|path|data|
|---|---|----
|get|/list|{}
|post|/insert|{"username":"ccc","password":"ccc"}
|post|/inserts|{"data":[{"username":"ccc","password":"ccc"}]}
|post|/update|{"_id":"xxx","username":"ccc","password":"ccc"}
|post|/delete|{"_id":"xxx"}
|post|/deletes|{"_ids":["xxx",]}
|post|/find|{"_id":"xxx"}
|post|/login|{"name":"xxx","password":"xxx"}
|post|/logout|{"_id":"xxx"}
|post|/forget_pwd|{"_id":"xxx","phone":"13512341234"}
|post|/verify_code|{"_id":"xxx","phone":"13512341234",code:"1234","timestamp":1577165431,"exp":1577165639}
|post|/reset_pwd|{"_id":"xxx","password":"xxx"}


===========================


```json
{
      "user_id": "xxxxx",
      "username": "ccc"
}

```

|字段|示例|说明|
|---|---|---
|user_id| "xxxx"| _id


## user_detail

|method|path|data|
|---|---|----
|get|/list|{}
|post|/insert|{"user_id":"xxx","info":"ccc"}
|post|/update|{"user_id":"xxx","info":"ddd"}
|post|/delete|{"user_id":"xxx"}
|post|/find|{"user_id":"xxx"}

===========================

```json
{
      "user_id": "xxxxx",
      "xxx":"xxx"
}

```
|字段|示例|说明|
|---|---|---
|user_id| "xxxx"| _id
