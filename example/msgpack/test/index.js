const superagent=require('superagent')
const utility=require('utility')
const msgpack = require("msgpack")
const fs=require('fs')


const unpack=(file='res.bin')=>{
   r1=fs.readFileSync(file)
   r2=msgpack.unpack(r1)
   console.log(r2)
   return r2
}

test=async ()=>{
    u="http://localhost:8080/api/bin"
    d={x:1,y:2}
    d1=msgpack.pack(d)

    utility.writeJSON("req.json",d)
    fs.createWriteStream('req.bin').write(d1)

    try{
        r=await superagent
            .post(u)
            .query({xxx:123})
            .send(d1)
            .responseType('blob')
            .set({"Content-Type":"application/octet-stream"})
        b=r.body
        console.log(b)
        r1=msgpack.unpack(b)
        console.log(r1)
        fs.createWriteStream('res.bin').write(b)
        utility.writeJSON("res.json",r1)
    }catch(e){
        z=e
        console.log(e)
    }
}


test1=async ()=>{
    u="http://localhost:8080/api/json"
    d={x:1,y:2}
    d1=msgpack.pack(d)

    utility.writeJSON("req.json",d)
    fs.createWriteStream('req.bin').write(d1)

    try{
        r=await superagent
            .post(u)
            .query({xxx:123})
            .send(d1)
            .set({"Content-Type":"application/octet-stream"})
            //.responseType('blob')
        b=r.body
        console.log(b)
     //   r1=msgpack.unpack(b)
     //   console.log(r1)
     //   fs.createWriteStream('res.bin').write(b)
     //   utility.writeJSON("res.json",r1)
    }catch(e){
        z=e
        console.log(e)
    }
}

test()



