//https://docs.mongodb.com/manual/reference/command/createIndexes/

const init_user_basic=async (app)=>{
   const {
        user_basic,
        user_detail,
        sms,
        token,
        role,
    }=app.service

    let i0=[
        {
            name:"username_1",
            key:{username :1},
            unique: true,
            partialFilterExpression: { username : {$exists: true}},
        },
        {
            name:"phone_1",
            key:{phone:1},
            unique: true,
            partialFilterExpression: { phone : {$exists: true}},
        },
        {
            name:"user_basic_model",
            key:{username :1, phone: 1,},
            unique: true,
        },
    ]
  //let r=await user_basic.drop()
  //let r=await user_basic.createIndex( { username: 1 }, { unique: true,  partialFilterExpression: { username: {$exists: true}}})
    let r=await user_basic.createIndexes(i0)
/*
    {
      createdCollectionAutomatically: true,
      numIndexesBefore: 1,
      numIndexesAfter: 4,
      ok: 1
    }
*/
    console.log(r)

    let i=await user_basic.indexes()
    let i1=user_basic.indexInformation()
    console.log(i)
    console.log(i1)
    //user_basic.insert({username:"c",phone:"c"})
    //user_basic.insert({username:"c",phone:"c"}).catch(e=>console.log(e))
    //let a=i.map(x=>x.name).slice(1)
    //r=await u.dropIndexes(a)
    return i
}

