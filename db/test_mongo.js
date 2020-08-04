const {
    conn,
    set_db_list,
    create_service,
    format_id,
    format_ids,
    ObjectID,
} =require("./mongo")

const test_create_service=async ()=>{
    const Koa = require('koa');
    const {
        NODE_ENV="test", // 数据库名
        TENCENTCLOUD_SERVER_PORT=8080,
    }=process.env

    let options={
        env:NODE_ENV
    }

    const DB={
        DBS:[ "development", "test", "production", ],
        TABLES:["user_basic","user_detail","sms","token","role"],
        TABLES1:new Map([["t1","user_basic"],["t2","user_detail"],["t3","sms"],["t4","token"]]),
    }

    app = new Koa(options);
    console.log(app.env)

    const {DBS,TABLES,TABLES1}=DB

    let dbs=await set_db_list(DBS)
    create_service(app,dbs,TABLES)

    let t1=app.service.user_basic
    let u1=await t1.find().toArray()
    console.log(u1)
    let uu=await t1.findOne({username:"xxx"})
    let me=await t1.findOne({username:"123"})

    console.log('uuuuuu',uu) //{}
    console.log('me',me) //null


    let c=app.context

    let {
        user_basic,
        user_detail,
        sms,
        token
    }=c.service

    let u2=await user_basic.find().toArray()
    console.log(u2)

    //别名
    //create_service(app,dbs,TABLES1)
    //r=await app.service.t1.findOne()
    //console.log("t1",r)
}


const test_set_db_list=async ()=>{
    let dbs=[
        "development",
        "test",
        "production",
    ]
    let z=await set_db_list(dbs)
    {
        let table='user_basic'
        let c=z.dbs.test.collection(table)
        let r1=await c.find().toArray()
        let r2=await c.insertMany([{x:1},{x:2}])
        let r3=await c.find().toArray()
        let r4=await c.deleteMany()
        let r5=await c.drop()
        console.log(r1)
        console.log(r2)
        console.log(r3)
        console.log(r4)
        console.log(r5)
    }
}

const test_format_id=()=>{

    d1={_id:"x".repeat(12),y:123}
    d2={_id:0}  //{ _id: 787878787878787878787878, y: 123 }
    d3={x:1,y:2}
    d4={_id:"x"} //error
    d5={_id:-10}
    d6={_id:"-10"}

    d=[d1,d2,d3]
    r=[
     format_id()
    ,format_id(d1)
    ,format_id(d2)
    ,format_id(d3)
    ,format_id(d4)
    ,format_id(d5)
    ,format_id(d6)
    ,format_ids(d)
    ]
    console.log(r)
}


module.exports={
    test_set_db_list,
    test_create_service,
    test_format_id,
}
