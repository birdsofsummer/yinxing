const R=require('ramda')
const moment=require('moment')

const {
    ObjectID,
    MongoClient,
}=require("mongodb")

const {
    //is_arr,
    //is_map,
    before,
}=require("../fp")


// 数字或 12位字符串
const format_id=({_id,...d}={})=>{
    const has_id=!R.isNil(_id)

    if (has_id) {
        try{
            const oid=ObjectID(_id)
            return {_id:oid,...d}
        }catch(e){
            console.log("eeee",_id)
            return d
        }
    }else{
        return d
    }
}



const convert_id=(t)=>before(t,format_id)

const format_ids=(d=[])=>d.map(format_id)

const CONNECT_OPTIONS={
      "useNewUrlParser": true,
      "useUnifiedTopology": true,
      'auto_reconnect': true,
      'poolSize': 20,
      'keepAlive':1,
      'numberOfRetries': 10,
      'connectTimeoutMS':5000,
      'socketTimeoutMS':5000,
      'serverSelectionTimeoutMS':5000,
 //   'wtimeout':5000,
}

const MONGO_LOCAL="mongodb://localhost:27017/?retryWrites=true&w=majority&connect=direct"
const MONGO_SERVER=process.env.mongo

const conn=(url=MONGO_SERVER||MONGO_LOCAL,o=CONNECT_OPTIONS)=>MongoClient.connect(url,o)


const set_db_list=async (dbs=[])=>{
    let c=await conn()
    let r={ client:c, dbs:{}, }
    if (R.isEmpty(dbs)){ return r }
    let d=dbs.reduce((a,b)=>({...a,[b]:c.db(b)}),{})
    return { client:c, dbs:d }
}


const create_service=(app={env:"test",context:{}},d={},table=["user"])=>{
    let env=app.env
    let {client,dbs}=d

    let db=dbs[env]

    app.mongo=client
    app.context.mongo=client
    app.context.dbs=d

    app.service={}
    app.context.service={}

    table.forEach((v,k,o)=>{
       let t=db.collection(v)
        convert_id(t)
        app.service[v]=t
        app.context.service[v]=t

        if (!Number(k)) {
            //别名
            app.service[k]=t
            app.context.service[k]=t
        }
    })
    return app
}


const init_mongo=async (app,{DBS,TABLES})=>{
    let dbs=await set_db_list(DBS)
    create_service(app,dbs,TABLES)
}

module.exports={
    conn,
    set_db_list,
    create_service,
    format_id,
    format_ids,
    convert_id,
    ObjectID,
}




