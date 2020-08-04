const {
    getFileList,
    getFileLists,
}=require('./walk_dir')

const path=require('path')


const DIR1="tmp"
const DIR2="./tmp"
const DIR3="/tmp"

const test=async ()=>{
    //a=await getFileList(__dirname)
    const   a=await getFileList(DIR1)
    const   b=await getFileList(DIR2)
    console.log(a,b)
    //{ files: [ './router/index.js', './router/test_router.js' ], dirs: [] }
    //{ files: [ 'router/index.js', 'router/test_router.js' ], dirs: [] }
}

const test1=()=>{
   console.log(__dirname)
   const a=path.resolve(__dirname,DIR1)
   const b=path.resolve(__dirname,DIR2)
   const c=path.resolve(__dirname,DIR3)
   console.log([a,b,c].join('\n'))
}

test()
test1()
