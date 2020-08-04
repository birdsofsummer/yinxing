//https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html

const superagent=require("superagent")

const {
    wx_mini_appKey:appid = "ccc",
    wx_mini_appSecret:secret = "ddd",
} = process.env

const CONFIG={
    appid,
    secret,
}

const API={
    login:{
        url:"https://api.weixin.qq.com/sns/jscode2session",
        method:"get",
        query:{ ...CONFIG, grant_type: "authorization_code", js_code:"", },
        data:{},
    },
    token:{
        url:"https://api.weixin.qq.com/cgi-bin/token",
        method:"get",
        query:{ ...CONFIG, grant_type:"client_credential", },
        data:{}
    },
    send:{
        //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/customer-message/customerServiceMessage.send.html
        url:"https://api.weixin.qq.com/cgi-bin/message/custom/send",
        method:"post",
        query:{access_token:""},
        data:{
            touser:"xxx",
           // msgtype:"text",
           // text:{"content":"Hello World"}
        },
    }
}




const ajax=(u="/",method="get",q={},d={})=>superagent
    [method](u)
    .query(q)
    .send(d)
    .type('json')

const conn=()=>{
    let o={}
    for (let a in API){
        let {url,method,query,data}=API[a]
        o[a]=(q={},d={})=>ajax(url,method,{...query,...q,},{...data,...d})
    }
    return o
}

module.exports={
    API,
    conn,
}
