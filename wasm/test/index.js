fs = require('fs');
const {
    read,
    read1,
    read2,
}=require("../index")

test=async (file="add.wasm")=>{
   let t = fs.readFileSync(file);

   let f1=await read2(t)
   let f2=await read(t)
   let f3=await read1(t)

   let r1=f1.instance.exports.add(8, 5)
   let r2=f2.exports.add(12,20)
   let r3=f3.instance.exports.add(1,1)

   console.log(r1,r2,r3)

 ///  let f4=await read1(fs.readFileSync("./c/add.wasm"))
 ///  let r4=f4.instance.exports.add(1,10)

}

a=['wasm/add.wasm','wasm/add1.wasm']

test(a[0])
test(a[1])
