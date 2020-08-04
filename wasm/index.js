const fs = require('fs');

const read=async (t)=>{
    let r1=await WebAssembly.compile(t)
    let r2=await WebAssembly.instantiate(r1)
    return r2
}

const read1=async (t)=>{
    let typedArray = new Uint8Array(t);
    let env = {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
          initial: 256
        }),
        table: new WebAssembly.Table({
          initial: 0,
          element: 'anyfunc'
        })
      }
    let r1=await WebAssembly.instantiate(typedArray, {env})
    return r1
}

const read2=async (t)=>{
    let r = await WebAssembly.instantiate(t);
    return r
  //  const { instance, module }=r
}

module.exports={
    read,
    read1,
    read2,
}
