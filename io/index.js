const fs=require("mz/fs")
const dns=require("mz/dns")
const zlib=require("mz/zlib")
const crypto=require("mz/crypto")
const readline=require("mz/readline")
const child_process=require("mz/child_process")
const exec = child_process.exec
const fs1=require('fs')

const {
    to_s,
    to_json,
    when_p,
}=require('../fp')

const save=(path,path1)=> fs.
    createReadStream(path)
    .pipe(fs.createWriteStream(path1));

const read_base64=(i="img/yzm.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))

const read_s=(i="1.txt")=>fs.readFile(i).then(x=>x.toString("utf-8"))
const read_s1=(i="1.txt")=> new Promise((resolve, reject)=>{
    let t=""
    var stream = fs.createReadStream(i)
        .on('data', c=>t+=c)
        .on('error', reject)
        .on('end',()=> resolve(t))
        .on('close',()=>console.log('close'))
    })

const read_s2=(file_name="/tmp/1.txt")=>fs1.readFileSync(file_name).toString() //sync
const read_json=(file_name="/tmp/1.json")=>read_s1(file_name).then(to_json)
const write_s=(s="",p="/tmp/1.txt")=>fs.createWriteStream(p).write(s)

const write_json=(o={},p="/tmp/1.json",pretty=true)=>new Promise((a,b)=>fs
    .createWriteStream(p)
    .on('error',b)
    .on('finish',()=>a(true))
    .write(to_s(o,pretty))
    )

const zip_file=(p1="index.js",p2="/tmp/1.gz")=>fs
  .createReadStream(p1)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(p2))

const unzip_file=(p1="/tmp/1.gz",p2="/tmp/1.txt")=>fs
  .createReadStream(p1)
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream(p2))

const ls=fs.readdirSync
const pwd1=process.cwd
const pwd=()=>fs.realpathSync('.')
const rm = when_p([fs.exists],fs.unlink)


module.exports={
    save,
    fs,
    dns,
    zlib,
    crypto,
    readline,
    child_process,
    exec,

    read_base64,
    read_s,
    read_s1,
    read_s2,
    read_json,

    write_s,
    write_json,

    zip_file,
    unzip_file,

    ls,
    pwd,
    pwd1,
    rm,
}
