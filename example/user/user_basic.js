const R=require("ramda")
const {
    any_nil,
    merge_o,
    drop_id,
    drop_keys,
    split_o_clean,
}=require('yinxing/fp')

const {
    NODE_ENV,
    PWD_KEY="ccc",
}=process.env


const {ObjectID}=require('mongodb')

const {
    create_code,
    encode_pwd,
    now,
    check_code,
}=require('yinxing/encode/captcha')


const {
    create_token,
    parse_token,
    refresh_token,
}=require('yinxing/token')

const {
    send,
}=require("yinxing/sms")


// $or=[{username:"xx"},{phone:"xxx"}]
const check_exist=async (t,$or=[])=>{
    let exist=false
    if ($or.length==0) {
        throw "...."
    }
    try{
        exist=await t.findOne({$or})
        console.log('check_exist>>>>',exist)
    }catch(e){
        console.log('check_exist>>>>[error]',exist)
    }finally{
        return exist
    }
}

const exist_user=async (c,n)=>{
   //let d=c.params
    let d=c.req_query

    console.log('insert>>>>',d)

    let {
        username,
        phone,
    }=d

    // let d1=[{username},{phone}]
    let d1=split_o_clean({username,phone})
    let exist=await check_exist(user_basic,d1)

    if (exist) {
        return c.json({exist:true})
    }

    return c.json({exist:false})
}


const login1=async (c,n)=>{

   let d=c.req_query || {}
   let db=c.dbs.dbs[DB]

   const {
        user_basic,
        user_detail,
        sms,
        token,
        role,
    }=c.service

   let {
       username,
       password,
   }=d
   if (any_nil([username,password])){
        throw "???"
   }
   let pwd=encode_pwd(password,PWD_KEY)
   let d1={username,password:pwd}
   try{
       let u=await user_basic.findOne({username})
       if (!u) {
           return c.error_404("nothing")
       }
       if(u.password != pwd){
           return c.error_401("bad pwd")
       }

       let basic=u.drop_keys(["password"])
       let detail=await user_detail.findOne({user_id:u._id})
  //   let role=await role.find({user_id:u._id}).toArray()
       let u1={
           basic,
           detail,
  //       role,
       }
       //let token=create_token({user_id: u? u._id : 0})
       let token=create_token(u1)
       let r = {...u1,token}
       return c.json(r)
   }catch(e){
       console.log(e)
       return c.error_500(e)
   }
}

const login2=async (c,n)=>{

   let d=c.req_query || {}
   let {
       username,
       password,
   }=d

   if (any_nil([username,password])){
        throw "???"
   }

   let pwd=encode_pwd(password,PWD_KEY)
   let d1={username,password:pwd}

   const {
        user_basic,
        user_detail,
        sms,
        token,
        role,
    }=c.service

   try{
       let u=await user_basic.findOne({username})

       if (!u) {
           return c.error_404("nothing")
       }

       if(u.password != pwd){
           return c.error_401("bad pwd")
       }

       let basic=u.drop_keys(["password"])
       let detail=await user_detail.findOne({user_id:u._id})
  //   let role=await role.find({user_id:u._id}).toArray()
       let u1={
           basic,
           detail,
  //       role,
       }
       //let token=create_token({user_id: u? u._id : 0})
       let token=create_token(u1)
       let r = {...u1,token}
       return c.json(r)

   }catch(e){

       console.log(e)

   }
}


const logout=async (c,n)=>{



}

const list=async (c, n) => {
   //let d=c.params
   let d=c.req_query || {}
   console.log('list >>>>',d)
   console.log('-----------',c.dbs)

   const {
        user_basic,
        user_detail,
        sms,
        token,
        role,
    }=c.service

   try{
       let r=await user_basic.find(d).toArray()
       let r1=r.map(drop_keys(["password"]))
       console.log('list <<<<',r)
       return c.json(r1)

   }catch(e){
       console.log('list <<<<',e)
   }
}


const find=async (c, n) => {

   //let d=c.params
   let d=c.req_query || {}
   console.log('find >>>>',d)

   const {
        user_basic,
        user_detail,
        sms,
        token,
        role,
    }=c.service

   try{
       let basic=await user_basic.findOne(d)
       if (!basic){
           return c.error_404({})
       }
       let d1={
           user_id:basic._id,
       }
       let detail=(await user_detail.findOne(d1)) || {}
       let r={basic,detail}
       console.log('find <<<<',r)
       c.json(r)
    }catch(e){
       console.log('find <<<<',e)
       c.error_500(e)
    }
}


const update=async (c, n) => {
   //let d=c.params
   let d=c.req_query
   let {_id,password,username,phone,...z}=d

   const {
        user_basic,
        user_detail,
        sms,
        token,
        role,
   }=c.service

   let d1={"$set": {...z}}


   // encode password
   if (password){
       let pwd=encode_pwd(password,PWD_KEY)
       d1["$set"]['password']=pwd
   }

   try{
       let r=await user_basic.findOneAndUpdate({_id:ObjectID(_id)},d1)
       console.log('update<<<<',r)
       c.json(r)
   }catch(e){
/*
{
  err: {
    index: 0,
    code: 11000,
    errmsg: 'E11000 duplicate key error collection: test.user_basic index: username_1 dup key: { username: "c" }',
    op: { username: 'c', phone: 'c', _id: 5e22f5bdda3cb90ee14ebf8f }
  }
}
*/
       console.log('update<<<<',e)
       c.error_500(e)
   }

}


const create_detail=async (c,n)=>{
      //let d=c.params
      let d=c.req_query
      let {_id,password,username,phone,...z}=d

      const {
            user_basic,
            user_detail,
            sms,
            token,
            role,
     }=c.service

     try{
        let d1={user_id:_id,...z}
        let r=await user_detail.insert(d1)
        return c.json(r)
     }catch(e){
        return c.error_500(e)
     }
}


const update_detail=async (c,n)=>{

      //let d=c.params
      let d=c.req_query
      let {_id,password,username,phone,...z}=d

      const {
            user_basic,
            user_detail,
            sms,
            token,
            role,
      }=c.service

      let d1={ "$set": { ...z}}

      try{
          let r=await user_detail.updateOne({user_id:ObjectID(_id)},d1)
          c.json(r)
      }catch(e){
          c.error_500(e)
      }
}


const insert=async (c, n) => {
   //let d=c.params
    let d=c.req_query

    console.log('insert>>>>',d)

    let {
        username,
        password,
        phone,
    }=d

    const {
          user_basic,
          user_detail,
          sms,
          token,
          role,
    }=c.service

    let pwd=encode_pwd(password,PWD_KEY)
    let d1={...drop_id(d),password:pwd}

    try{
        let r1=await user_basic.insertOne(d1)
        let {result,insertedCount,insertedId,n:qty,ok}=r1

        // init role
        // init user_detail
        // ...

        console.log('insert<<<<<',r1)
        c.json({result,insertedCount,insertedId,qty,ok})
    }catch(e){
        console.log('insert<<<<<',e)
        c.error_500(e)
    }

}

const inserts=async (c, n) => {
   //let d=c.params
    let d=c.req_query
    console.log('insert_many>>>>',d)
    let {data}=d

    if (data.length==0){
        return c.json()
    }

    const {
          user_basic,
          user_detail,
          sms,
          token,
          role,
    }=c.service

    try{

       let d1=data.map(drop_id)
       let r1=await user_basic.insertMany(d1)
       return c.json(r1)

    }catch(e){
       return c.error_500(e)
    }
}


const remove=async (c, n) => {
   //let d=c.params
   let d=c.req_query
   console.log('delete>>>>',d)

   const {
          user_basic,
          user_detail,
          sms,
          token,
          role,
    }=c.service

   try{
       let id = ObjectID(d._id)
       let r = await user_basic.deleteOne({_id:id})
       let r1=await user_detail.deleteOne({user_id:id})
       console.log('delete<<<<',r)
       let { result,deletedCount,n:qty,ok }=r
       c.json({ result,deletedCount,qty,ok })
    }catch(e){
       console.log('delete<<<<',e)
    }
}


const removes=async (c,n)=>{

   let d=c.req_query
   console.log('delete_many>>>>',d)

   let {ids}=d

   if (ids.length==0){
       return c.json([])
   }

   const {
          user_basic,
          user_detail,
          sms,
          token,
          role,
    }=c.service

   try{

       let ids1=ids.map(ObjectID)
       let q={_id: { $in:ids1}}
       let q1={user_id: { $in:ids1}}

       let r=await user_basic.deleteMany(q)
       let r1=await user_detail.deleteMany(q1)
       console.log('delete_many<<<<',r)
       return c.json(r)
   }catch(e){
       console.log('delete_many<<<<',e)
       return c.error_500(e)
   }

}


const forget_pwd=async (c, n) => {
 //   let { basic:{_id} }=c.token.payload
    let d=c.req_query

   console.log('forget>>>>',d)

   const {
          user_basic,
          user_detail,
          sms,
          token,
          role,
    }=c.service

    try{
       let u=await user_basic.findOne({phone})
       if (!u){
           return c.error_404("nothing")
       }
       let duration=3 //min
       let d1=create_code({phone},duration) //ip?
       let r=await send(phone,code)
       //  await send({phone,email,payload:token})
       let r1=await sms.insertOne(d1)
       c.json({phone})
    }catch(e){
        c.error_500('db...')
    }
}

const verify_code=async (c, n) => {
     let d=c.req_query
     let {phone,code,exp}=d

     console.log('verify_code>>>>',d)

     if(any_nil([phone,code])){
        return c.error_401("no code/phone")
     }

     const {
            user_basic,
            user_detail,
            sms,
            token,
            role,
      }=c.service

     let code1=await sms.findOne({phone,code})
     if (!code1){
        return c.error_401("bad code")
     }
     return c.json({})
}

const reset_pwd=async (c, n) => {
     let d=c.req_query
     console.log('reset_pwd>>>>',d)

     let {phone,password,code}=d

     let db=c.dbs.dbs[DB]

     const {
            user_basic,
            user_detail,
            sms,
            token,
            role,
      }=c.service

     try{
         let code1=await sms.findOne({phone,code})
         if ( !check_code(code1)) {
            return c.error_401("code exp")
         }

         let d1={ "$set": { "password":encode_pwd(password),}}

         let r1=await user_basic.updateOne({_id:ObjectID(_id)},d1)
         let r2=await sms.deleteOne(code1)

         return c.json(d)

    }catch(e){
         return c.error_500(e)
    }
}

module.exports={
    login1,
    login2,

    logout,

    forget_pwd,
    verify_code,
    reset_pwd,

    list,
    find,

    insert,
    inserts,

    update,
    update_detail,

    remove,
    removes,
}
