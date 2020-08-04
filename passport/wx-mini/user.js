const {
   encode_id,
   decode_id,
   encodeErCode,
   checkSignature,
} = require('./../encode/wx')

const {conn}=require('../../db/mongo')

const login =async (openId="") {

    const c=await conn()
    const db=c.db('test')
    const col=collection('user')


    let d={openId}
    let user = await col.findOne(d)
    if (!user) {
        user = await User.insertOne(d)
    }
    const id = user.insertedId
    let r=await col.updateOne({ _id: id }, {"$set":{ lastLogin: Date.now() }})

    return { sessionKey : encode_id(id) }
}

const list=(col,s=0,l=10)=>col.find().skip(s).limit(l).toArray()

module.exports = {
    login,
    list,
}
