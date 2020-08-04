const superagent=require('superagent')
/*
 *
 *
https://developer.travis-ci.com/resource/env_vars#Env%20vars
https://developer.travis-ci.com/resource/env_var#Env%20var
 /
 /owner/birdsofsummer/repos
 /owner/birdsofsummer/repos?limit=5&sort_by=active,name
 /repo/11957886/branch/master
 /repo/11957886/env_vars
*/

const {
    travis_token,
    NPM_TOKEN,
    REPO_ID=11957886,
}=process.env

const ROOT_PATH="https://api.travis-ci.com"
const HEADERS={
        "Content-Type":"application/json",
        "Travis-API-Version": "3",
        "Authorization": "token "+travis_token,
        "User-Agent":"API Explorer",
}

const ajax = (method="get",path,d)=>superagent[method]( ROOT_PATH + path, d,).set(HEADERS).type('json')

const list_var=(rid=REPO_ID)=>ajax("get","/repo/"+rid+"/env_vars")
const add_var=(d=TK,rid=REPO_ID)=>ajax("post","/repo/"+rid+"/env_vars",d)
const get_var=(var_id,rid=REPO_ID)=>ajax('get',`/repo/${rid}/env_var/${var_id}`)
const update_var=(var_id,d={},rid=REPO_ID)=>ajax('patch',`/repo/${rid}/env_var/${var_id}`,d)

let TK= {
    "env_var.name": "NPM_TOKEN",
    "env_var.value": NPM_TOKEN,
    "env_var.public": false,
}
const update_npmtk=()=>update_var("9255423d-d068-41f1-9188-e38d2f7b336e",TK)

module.exports={
    add_var,
    list_var,
    get_var,
    update_var,
    update_npmtk,
}

