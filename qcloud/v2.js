const _ = require('lodash')
const Capi = require('qcloudapi-sdk')
const ylru = require("ylru")

const {
    SecretId = "****",
    SecretKey = "****",
    bindType = 'API',
    serviceName = 'serverless',
    serviceDesc = "hehe",
    //serviceType = 'apigateway',
    serviceType = 'SCF', // HTTP,MOCK,SCF,TSF,WEBSOCKET,TARGET
    serviceTimeout = 15,
    Region = "ap-guangzhou",
    apiType = 'NORMAL',
  //method: 'ANY', // GET|POST|PUT|DELETE|HEAD|ANY
    authRequired = 'FALSE',
    enableCORS = 'TRUE' ,
    responseType = 'JSON', // HTML|JSON|TEST|BINARY|XML
    //environment="release", // prepub|test|release
    serviceScfFunctionQualifier = '$LATEST' ,
    serviceScfIsIntegratedResponse= 'TRUE',
    //protocol="https",
    //AppId = "****",
    //token = "****",
    //expired = "****",
    //signature = "****",
    //uuid = "****",
    //timestamp = "****",
}=process.env

const conn=({
        SecretId,
        SecretKey,
        serviceType = 'apigateway',
        Region="ap-shanghai",
        Token="",
    }=process.env)=>{
    const apig = new Capi({
        SecretId,
        SecretKey,
        serviceType,
        Region,
        //Token,
    })
    const f =(o={})=>new Promise((resolve, reject) => {
        apig.request(
          {
            //Action: 'CreateService',
            RequestClient: 'ServerlessComponent',
            Token: apig.defaults.Token || null,
            Region,
            ...o,
          },
          function(err, data) {
            console.log(data)
            if (err) {
              return reject(err)
            } else {
                resolve(data)
            }
          }
        )
      })
    return f
}


const conn1=(APIS=[],{
    SecretId,
    SecretKey,
    serviceType = 'apigateway',
    Region="ap-shanghai",
    Token,
}=process.env)=>{
    let o={
        SecretId,
        SecretKey,
        serviceType,
        Region,
        //Token,
    }
    //console.log(o)
    const apig = new Capi(o)
    let Actions=new Set(APIS)
    const f = (Action="")=>(o={})=>new Promise((resolve, reject) => {
        if (!Actions.has(Action)) throw "???"
        apig.request(
          {
            //Action: 'CreateService',
            RequestClient: 'ServerlessComponent',
            Token: apig.defaults.Token || null,
            Action,
            Region,
            ...o,
          },
          function(err, data) {
            //console.log(data)
            if (err) {
              return reject(err)
            } else {
                resolve(data)
            }
          }
        )
      })
    return APIS.reduce((a,b)=>({...a,[b]:f(b)}),{})
}

module.exports={
   conn,
   conn1,
}
