const {
    exec,
    write
}=require('./sqlite2json')
const R=require('ramda')



const zidian=()=> exec("dict/cc.db","SELECT * FROM WRCHWord where length(name)=1")
const py2hanzi=(dd=[])=> Object.fromEntries(dd.map(x=>[x.name,x.ampersand]))
const pyshouzimu=(dd=[])=>{
    p1=dd.map(R.pickAll(["name","ampersand"]))
    return R.groupBy(({ampersand,name})=>ampersand.slice(0,1))(p1)
}

const tongyinzi=(dd=[])=>{
    let p1=dd.map(R.pickAll(["name","ampersand"]))
    let zz=R.groupBy(({ampersand,name})=>ampersand)(p1)
    let f=x=>R.uniq(x.map(R.props(['name'])).flat())
    return R.mapObjIndexed((v,k,o)=>o[k]=f(v))(zz)
}
const duoyinzi=(dd=[])=>{
    let p1=dd.map(R.pickAll(["name","ampersand"]))
    let zz=R.groupBy(({ampersand,name})=>name)(p1)
    let f=x=>R.uniq(x.map(R.props(['ampersand'])).flat())
    return R.mapObjIndexed((v,k,o)=>o[k]=f(v))(zz)
}
const test=async ()=>{
   let d=await zidian()
   d.forEach(x=>{
        x.ampersand=x.ampersand.replace("\n",'')
    })
   let g=pyshouzimu(d)
   write("shouzimu.json",g)
   //write('kong.json',g[''].map(x=>x.name))
   write("dict.json",d)
   write("pinyin.json",py2hanzi(d))
   write("tongyinzi.json",tongyinzi(d))
   write("duoyinzi.json",duoyinzi(d))
}

module.exports={
    zidian,
    tongyinzi,
    duoyinzi,
    pyshouzimu,
    py2hanzi,
    test,
}
