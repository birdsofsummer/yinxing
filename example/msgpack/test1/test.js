fs= require('fs')
m = require("msgpack")
R = require('ramda')

test=()=>{
    d=R.range(1,1e5).map(x=>({x,y:"zzzz","z":1234,dd:[1,2,3],name:"呵呵"}))
    r=m.pack(d)
    fs.createWriteStream("z").write(r)
    fs.createWriteStream("z.json").write(JSON.stringify(d))
    r1=fs.readFileSync('z')
    d1=m.unpack(r1)
    console.log(d[0])
    console.log(d1[0])


    s=fs.createWriteStream("z1")
    ms = new m.Stream(s);
    ms.addListener('msg', console.log)
    ms.send({x:1,y:2})

    r2=fs.readFileSync('z1')
    n=m.unpack(r2)
}

