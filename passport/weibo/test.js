const weibo=require("./index")
const superagent=require("superagent")

const get_token=(code="xxx")=>{
    let api=weibo({code})
    let {url,data}=api.token
    return superagent.
        post(url)
        .type('form')
        .send(data)
}

