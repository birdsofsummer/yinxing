const {drop_id}=require("../fp")
const {ObjectID}=require('mongodb')

const {
    conn,
    set_db_list,
    format_id,
    format_ids,
}=require("../db/mongo")

const {
    DB="test",
    TABLE="user",
}=process.env


const add=async (c)=>{
   let d=c.req_query
   let d1=drop_id(d)

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   let r=await t.insertOne(d1)
   c.json(r)
}

const list=async (c)=>{
   let d=c.req_query

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   let r=await t.find(d).toArray()
   c.json(r)
}


const find=async (c)=>{
   let d=c.req_query

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   let d1=format_id(d)
   let r=await t.findOne(d1)
   c.json(r)
}



const edit=async (c)=>{
   let d=c.req_query
   let _id=d._id
   if (!_id){
       c.error_400("缺_id")
   }
   let d1={"$set": drop_id(d)}

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   let r=await t.updateOne(format_id({_id}),d1)
   c.json(r)
}

const del=async (c)=>{
   let d=c.req_query
   if (!d._id){
       c.error_400("缺_id")
   }
   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   //let r=await t.deleteOne({_id:ObjectID(_id)})
   let d1=format_id({_id})
   let r=await t.deleteOne(d1)
   c.json(r)
}




module.exports={
    list,
    find,
    add,
    del,
    edit,
}
