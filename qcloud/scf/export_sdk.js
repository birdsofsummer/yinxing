const tencentcloud=require('tencentcloud-sdk-nodejs')
const R=require('ramda')
const fs=require('mz/fs')

const export_sdk=()=>{
   let dd= {
            "CopyFunction": "复制函数",
            "CreateFunction": "创建函数",
            "DeleteFunction": "删除函数",
            "GetFunction": "获取函数详细信息",
            "GetFunctionLogs": "获取函数运行日志",
            "Invoke": "运行函数",
            "ListFunctions": "获取函数列表",
            "ListVersionByFunction": "查询函数版本",
            "PublishVersion": "发布新版本",
            "UpdateFunctionCode": "更新函数代码",
            "UpdateFunctionConfiguration": "更新函数配置",
            "CreateNamespace": "创建命名空间",
            "DeleteNamespace": "删除命名空间",
            "ListNamespaces": "列出命名空间列表",
            "UpdateNamespace": "更新命名空间",
            "CreateTrigger": "设置函数触发方式",
            "DeleteTrigger": "删除触发器",
            "GetFunctionAddress": "获取函数代码下载地址"
   }
   const m=tencentcloud.scf.v20180416.Models
   let d=R.fromPairs(R.keys(m)
       .filter(x=>/req/i.test(x))
       .map(x=>[
        x.replace(/req.*/i,""),
        {
        action:x.replace(/req.*/i,""),
        name:dd[x.replace(/req.*/i,"")]|| "",
        method:"post",
        req:x,
        res:x.replace(/req.*/i,"Response"),
        data0:(new m[x]),
        data1:new m[x.replace(/req.*/i,"Response")],
    }]))
    fs
      .createWriteStream('d.json')
      .write(JSON.stringify(d,null,'\t'))
}


export_sdk()

