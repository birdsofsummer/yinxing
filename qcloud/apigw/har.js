//https://console.cloud.tencent.com/apigateway/
har=(a={log:{entries:[]}})=>a.log.entries
    .map(({request:{postData:{text:a}},response:{content:{text:b}}})=>
        [
         'd='+JSON.stringify(JSON.parse(a).data,null,'\t'),
         "r=await c."+JSON.parse(a).action+"(d)",
         'r='+JSON.stringify(JSON.parse(b),null,'\t')
        ]
    .join('\n')
    )
.join('\n\n')

har1=(a={log:{entries:[]}})=>a.log.entries
    .map(({request:{postData:{text:a}},response:{content:{text:b}}})=>
        JSON.parse(a).action
    )
.join('\n\n')

