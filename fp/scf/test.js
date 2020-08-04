const {
    json2env,
    add_vars,
    create_tag,
}=require("./index")

const test=()=>{

    let d1={x:1,y:2}
    let d2={x:123,z:3} //覆盖x

    let r1=json2env(d1)
    let r2=add_vars(d2,r1)

    console.log(r1)
    console.log(r2)

    let r3=create_tag({x:1,y:2})
    console.log(r3)
}
/*

Environment {
  Variables: [ Variable { Key: 'x', Value: 1 }, Variable { Key: 'y', Value: 2 } ]
}
Environment {
  Variables: [
    Variable { Key: 'x', Value: 123 },
    Variable { Key: 'y', Value: 2 },
    Variable { Key: 'z', Value: 3 }
  ]
}

[ Tag { Key: 'x', Value: 1 }, Tag { Key: 'y', Value: 2 } ]
*/



test()
