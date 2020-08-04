const {ObjectID}=require('mongodb')
const {
    format_id,
    format_ids,
}=require("yinxing/db/mongo")
const {drop_id}=require('yinxing/fp')


const {
    DB="test",
    TABLE="user",
}=process.env

const list=async (c, n) => {
   //let d=c.params
   let d=c.req_query || {}
   let d1=format_id(d)

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   console.log('>>>>',d)
    try{
       let r=await t.find(d1).toArray()
       c.json(r)
    }catch(e){

    }
}

const create=async (c, n) => {
   //let d=c.params
    let d=c.req_query
    let d1=drop_id(d) // 自带id重复会插入失败!

    let db=c.dbs.dbs[DB]
    let t=db.collection(TABLE)
    try{
        let r=await t.insertOne(d1)
        c.json(r)
    }catch(e){

    }
}

const update=async (c, n) => {
   //let d=c.params
   let d=c.req_query
   let _id=d._id
   if (!_id){
       c.error_400("缺_id")
   }
   let d1={"$set": drop_id(d)}

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   let q={_id:ObjectID(_id)}
    try{
       let r=await t.updateOne(q,d1)
       c.json(r)
    }catch(e){

    }
}

const remove=async (c, n) => {
   //let d=c.params
   let d=c.req_query
   let _id=d._id
   if (!_id){
       c.error_400("缺_id")
   }
   console.log('>>>>',d)

   let db=c.dbs.dbs[DB]
   let t=db.collection(TABLE)

   let q={_id:ObjectID(_id)}
   try{
       let r=await t.deleteOne(q)
       c.json(r)
   }catch(e){

   }
}


module.exports={
    list,
    create,
    update,
    remove,
}
