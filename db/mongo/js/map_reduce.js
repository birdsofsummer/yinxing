//http://mongodb.github.io/node-mongodb-native/api-generated/collection.html?highlight=mapreduce#mapReduce
//https://www.runoob.com/mongodb/mongodb-map-reduce.html

const {
    Admin,
    AggregationCursor,
    BSONRegExp,
    Binary,
    BulkWriteError,
    Chunk,
    Code,
    Collection,
    CommandCursor,
    CoreConnection,
    CoreServer,
    Cursor,
    DBRef,
    Db,
    Decimal128,
    Double,
    GridFSBucket,
    GridStore,
    Int32,
    Logger,
    Long,
    Map,
    MaxKey,
    MinKey,
    MongoBulkWriteError,
    MongoClient,
    MongoError,
    MongoNetworkError,
    MongoParseError,
    MongoTimeoutError,
    MongoWriteConcernError,
    Mongos,
    ObjectID,
    ObjectId,
    ReadPreference,
    ReplSet,
    Server,
    Symbol,
    Timestamp,
    connect,
    instrument
}=require('mongodb')

a=require('./mongo')

say=x=>y=>console.log(x,y)

show=async ({collection,stats})=>{
    let data=await collection.find().toArray()
    let d={stats,data}
    say('ccc')(d)
}

test=async ()=>{

    c=await a.conn()
    db=c.db('test')
    t=db.collection('user_basic')
    cc=await db.collections()
    cn=cc.map(x=>x.namespace)
    console.log(cn)

    //emit(k,v) -> reduce(k,v)

    map = function() {
        if (this.username=="xxx"){
            emit(this._id, this);
        }
    }
    var r= function(k,vals) { return 111 };


    o={out:'cc'}
    o={out:{replace: 'cc'}, verbose:true}
    //o={out: {replace : 'tempCollection', readPreference : 'secondary'}}
    t1=await t.mapReduce(map,r,o)
    r=await t1.find().toArray()

    t.find().sort({"age":-1}).limit(2).toArray().then(say('ccc'))

    t.mapReduce(map,r,o).then(x=>x.find().toArray()).then(say('ccc'))

    t.mapReduce(map,r,o).then(x=>x.collection.find().toArray()).then(say('ccc'))
    t.mapReduce(map,r,o).then(show)

    tt = function(val){ return val+100 }
    o={
        out : {inline: 1},
        verbose:true,
        scope: {
            fn1: new Code(tt.toString()),
            fn: tt,
        }

    }
    t.mapReduce(map,r,o).then(say('ccc'))


     map = function(){
          emit(this.username, fn(this.age)+1000);
     }
     // ("xxx",[])
     r= function(k, v){
          count = 0;
          for(i = 0; i < v.length; i++) {
              count += v[i]*100
          }
          return count;
      }

      // Reduce function
      r = function(k, v){
          count = 5000;
          for(i = 0; i < v.length; i++) {
              count += v[i];
          }
          return count;
      }

      t.mapReduce(map,r,o).then(say('ccc'))


      docs = [
        {
        title : "this is my title",
        author : "bob",
        posted : new Date() ,
        pageViews : 5,
        tags : [ "fun" , "good" , "fun" ],
        other : { foo : 5 },
        comments : [
                      { author :"joe", text : "this is cool" },
                      { author :"sam", text : "this is bad" }
                  ]
          }
      ]


      d=[
          { $project : {
                            author : 1,
                            tags : 1,
                            //posted: 1,
                       }
          },
          { $unwind : "$tags" },
          { $group : {
            _id : {tags : "$tags"},
            authors : { $addToSet : "$author" }
          }}
      ]

      r=[
          { _id: { tags: 'good' }, authors: [ 'bob' ] },
          { _id: { tags: 'fun' }, authors: [ 'bob' ] }
      ]

      r1=[
        { _id: 5e2014de6b52da261c8aee33, author: 'bob', tags: 'fun' },
        { _id: 5e2014de6b52da261c8aee33, author: 'bob', tags: 'good' },
        { _id: 5e2014de6b52da261c8aee33, author: 'bob', tags: 'fun' }
      ]


      t=db.collection('zz')
      await  t.insertMany(docs)
      t.aggregate(d).toArray().then(say('cc'))
      t.aggregate(...d).toArray().then(say('cc'))
      c={
          cursor: {batchSize:100}
      }

      c={
        allowDiskUse: true
      }
      // cursor
      t.aggregate(d,c).toArray().then(say('cc'))
      t.aggregate(d,c).explain().then(say('cc'))
      t.aggregate(d,c).next().then(say('cc'))

      t.stats().then(say('cc'))

      c={ out: "ttt" }
      t.aggregate(d,c,say('cc'))
      db.collection('ttt').find().toArray().then(say('ccc'))


      R=require('ramda')
      t=db.collection('parallelCollectionScan')
      t.deleteMany()
      d1=R.range(1,2000).map(i=>({name:"xx",a:1}))
      d2=R.range(1,2000).map(i=>({name:"yy",a:1}))

      t.insertMany(d1)
      t.insertMany(d2)

      map=function(){emit(this.name,this.a)}
      r=function(k,vs){return Array.sum(vs)}
      // [ { _id: 'xx', value: 1999 }, { _id: 'yy', value: 1999 } ]
      r = function(k, v){
          count = 0;
          for(i = 0; i < v.length; i++) {
              count += v[i];
          }
          return count;
      }
      // [ { _id: 'xx', value: 1999 }, { _id: 'yy', value: 1999 } ]
      r=function (k,v){return 100}
      //[ { _id: 'xx', value: 100 }, { _id: 'yy', value: 100 } ]

      r=function (k,vs){
          return vs.join('_')
      }

      r=function (k,vs){
          let o={}
          o.ccc=vs.map(x=>123)
          return o
      }

   // [
   //   { _id: 'xx', value: { ccc: [Array] } },
   //   { _id: 'yy', value: { ccc: [Array] } }
   // ]

      o={ out:{replace: 'cc'}}
      t.mapReduce(map,r,o).then(x=>x.find().toArray()).then(say('ccc'))
      //http://mongodb.github.io/node-mongodb-native/api-generated/collection.html?highlight=mapreduce#mapReduce
      t.drop()
}

{
  results: [ { _id: 'ccc', value: 1 }, { _id: 'xxx', value: 1 } ],
  stats: {
    processtime: 72,
    counts: { input: 2, emit: 2, reduce: 0, output: 2 },
    timing: {
      mapTime: 0,
      emitLoop: 72,
      reduceTime: 0,
      mode: 'mixed',
      total: 72
    }
  }
}



user=[
  {
    _id: 5e1ff0be000c7c2370676a02,
    username: 'xxx',
    password: '5125f37cd3a9d0680efef07c5b6707b0',
    phone: '15012341234',
    name: '',
    age: 0,
    qq: '',
    email: '',
    grade: 0
  },
  {
    _id: 5e1ff63297028d244a3cae8b,
    username: 'ccc',
    password: '5125f37cd3a9d0680efef07c5b6707b0',
    phone: '15012341235',
    name: '',
    age: 0,
    qq: '',
    email: '',
    grade: 0
  }
]

r=[
  { _id: 5e1ff0be000c7c2370676a02, value: 1 },
  { _id: 5e1ff63297028d244a3cae8b, value: 1 }
]



[
  'test.movies',
  'test.user1',
  'test.user_basic',
  'test.user',
  'test.like',
  'test.products',
  'test.douban',
  'test.people',
  'test.cc'
]

