const m = require("msgpack")

test=()=>{
    d={phone:1,password:2}
    d1=m.pack(d)
    d2=m.unpack(d1)

    console.log(d)
    console.log(d1)
    console.log(d2)
}

test1=()=>{
    d={phone:1,password:2}
    d1=m.pack(d).toString('utf-8')
    d2=Buffer.from(d1)
    d3=m.unpack(d2) // 不行
}

test()
