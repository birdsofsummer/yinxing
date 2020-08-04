//a=`curl 'https://search.damai.cn/searchajax.html'  --data 'keyword=&cty=%E6%B7%B1%E5%9C%B3&ctl=%E6%BC%94%E5%94%B1%E4%BC%9A&tn=&sctl=&singleChar=&tsg=0&order=1' |jq ".pageData.resultData" `

const fetch=require('node-fetch')
meta={
    url:`https://search.damai.cn/searchajax.html`,
    method:"post",
    data:{
        keyword:"",
        cty:"深圳",
        ctl:"演唱会",
        tn:"",
        sctl:"",
        singleChar:"",
        tsg:0,
        order:1,
    },
};




const serialize=({data})=>new URLSearchParams(data).toString();
const http=({url,method,data,...a})=>fetch(url,{method,body:serialize(data),...a});
const get_damai=async()=>{
        d1=await http(meta)
        d2=await d1.json()
        console.log(d2)
        return d2
}



get_damai()



