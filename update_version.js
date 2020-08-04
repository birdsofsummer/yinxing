const utility=require('utility')
const fs=require('mz/fs')
const child_process=require("mz/child_process")
const exec = child_process.exec
const R=require('ramda')


const incr=(a='0.1.26')=>R.converge(R.pipe(R.concat,R.join('.')),[R.init,x=>[R.last(x)+1]])((R.compose(R.map(Number),R.split('.'))(a)))

const update=async (dir=".")=>{
    let file=dir+'/package.json'
    let o=await utility.readJSON(file)
    let v=o.version
    let v1=incr(v)
    o.version=v1
    console.log(v,'->',v1)
    utility.writeJSON(file,o)
}

update()
exec('gu ..').then(console.log)
