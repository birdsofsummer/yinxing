const sqlite3 = require('sqlite3').verbose();
//https://github.com/mapbox/node-sqlite3/tree/master/test

const {serialize}=require('../fp/q')
const {drop_keys}=require('../fp')


const FILE_NAME="test.db"

// 只管字符串
const to_sql=(d={})=>" "+serialize(' = \"')('\" , ')(d)+"\" "

const conn=(file_name=FILE_NAME)=>new sqlite3.Database(file_name)

const exec=(file_name,q)=>{
       const db = conn(file_name);
       return new Promise((f1,f2)=> db.all(q,(e,d)=>e?f2(e):f1(d)))
}
const get_tables=(file_name)=>{
        let q="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
        return exec(file_name,q)
}
//[{ name: 'xxx' }]

const query=(file_name,table)=>{
        let q="SELECT * FROM "+ table
        return exec(file_name,q)
}

const update=(file_name,table,d={},k="name")=>{
    let s=to_sql(drop_keys([k])(d))
    let c=` ${k} = "${d[k]}"`
    let q=`UPDATE ${table} SET ${s} WHERE ${c};`
 //   return q
    return exec(file_name,q)
}


const read=async (file_name,tables=[])=>Promise.all(tables.map(t=>query(file_name,t)))

const write=(file_name,d={})=>{
        const fs=require("mz/fs")
        let d1=JSON.stringify(d,null,'\t')
        return fs.writeFile(file_name,d1)
}

const sqlite2json=async ( db_file_name="1.db",)=>{
        let t=await get_tables(db_file_name)
        let d=await read(t.map(x=>x.name))
        Promise.all(d.map((x,i)=>write(t[i]+".json",x)))
}

const inserts=(d=[],table="user",file_name=FILE_NAME)=>{
    const db = conn(file_name);
    db.serialize(function() {
          db.run(`CREATE TABLE  IF NOT EXISTS ${table}  (info TEXT)`);
          var stmt = db.prepare(`INSERT INTO ${table} VALUES (?)`);
          d.forEach(x=>stmt.run(x))
          stmt.finalize();
    });
    db.close();
}


const init=(file_name,t=[],cb=console.log)=>{
    let db=conn()
    db = new sqlite3.Database(file_name, t.map(x=>db.run(`CREATE TABLE  IF NOT EXISTS ${x} (info TEXT)`, cb)));
}

const clean=(t=TABLES)=>{
    const db = conn();
    return Promise.all(t.map(table=>new Promise((f1,f2)=> db.all(`delete FROM ${table}`,(e,d)=>e?f2(e):f1(d)))))
}

const test=async (t="xx.db",tt=["user"])=>{
    let tables=await get_tables(t)
    let d=await read(t,tt)
    Promise.all(d.map((x,i)=>write(tt[i]+".json",x)))
    console.log(tables)
    console.log(d)
}



module.exports={
    conn,
    exec,
    query,
    get_tables,
    read,
    write,
    sqlite2json,
}


