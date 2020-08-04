//初始化环境变量
//

const fs=require('fs')
const {start}=require('yinxing/scf/config2env')

const init=()=>{
    const root_path=fs.realpathSync('..')
    start(root_path)
    console.log("done :)")
}

init()
