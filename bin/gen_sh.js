const {start}=require("../scf/config2env")

if (process.argv.length<3) {
    throw "file???"
}else{
    let a=process.argv[2] || "."
    console.log(a)
    start(a)
}

