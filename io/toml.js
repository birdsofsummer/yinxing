const toml=require("toml")
const {cp}=require("../fp")
const path=require('path')

const {
    read_s1,
    read_s2,
}=require("./index")

const read_toml=async (file_name='../config.toml')=>{
    //const dir1=fs.realpathSync(dir0)
    const s=await read_s1(file_name)
    const s1=toml.parse(s)
    return cp(s1)
}

const read_toml1=(file_name='../config.toml')=>{
    const s=read_s2(file_name)
    const s1=toml.parse(s)
    return cp(s1)
}

module.exports={
    read_toml,
    read_toml1, //sync
}
