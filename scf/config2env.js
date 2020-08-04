// config.toml -> deploy.sh + env.sh
// 用于ci初始化云函数n个环境变量



const R=require('ramda')
const fs=require('mz/fs')
const child_process=require("mz/child_process")
const exec = child_process.exec
const path=require('path')
const moment=require('moment')




const {
    read_toml,
    read_toml1,
}=require("../io/toml")

const now=()=>new Date().toString()
const now1=()=>Math.round(moment.now()/1000)


const ls=(dir0="../../../poem",re=/toml/)=>fs.readdirSync(dir0).filter(x=>re.test(x)) .map(x=>[path.parse(x).name,path.resolve(dir0,x),dir0])
const wrap=(t="")=>'#'.repeat(40) + t + '#'.repeat(40) +"\n"

const toml2sh=(b={},name="user",stage="test")=>{
    const {env,fn,ns}=b
    let t=wrap(stage+"/"+name)
    t+="echo \"------start set env---------\"\n"
    for (let k in env){
        let o=env[k]
        for (let kk in o){
            let v=o[kk]
            t+="export "+kk+"=\""+v+"\"\n"
        }
    }
    let env_private=fn.private_settings[name]
    for (let k in env_private){
        let v=env_private[k]
        t+="export "+k+"=\""+v+"\"\n"
    }
    t+="export update_time=\""+now()+"\"\n"
    t+="echo \"-------finish set env--------\"\n"
    t+=wrap(name)
    return t
}

const parse_tom=([stage,config_file,dir1])=>{
    const tom=read_toml1(config_file)
    const config_file_name="${DEPLOY_HOME}"+path.basename(config_file)
    const {TMP_DIR,FN}=tom.fn.file
    const t=now1()
    let fns=FN.join(' ')
    let s=`
echo ----------------------------------begin deploy --------------------------------------------\n
# export version=${t}
rm ${TMP_DIR}*.zip
echo ----------------------------------begin install/zip --------------------------------------------\n
for i in ${fns}
do
    echo ----------------------------------begin install/zip  $i-----------------------------------\n
    date
    cd $i
    pwd
    echo $i
    echo "npm install.."
    npm install
    echo "zip -y -r ${TMP_DIR}$i.zip"
    zip -q -y -r ${TMP_DIR}$i.zip *
    ls -l ${TMP_DIR}$i.zip
    echo ----------------------------------finish install/zip $i-----------------------------------\n
    echo cd ..
    cd ..
done
pwd
date
ls ${TMP_DIR}*zip

echo "wait cos upload...."
echo ----------------------------------begin upload ${fns}-----------------------------------\n

for i in ${fns}
do
    echo $i
    . ./$i/env_${stage}.sh
    export CONFIG_FILE="${config_file_name}"
    node upload.js ${TMP_DIR}$i.zip
done

npm run-script init
# npm run-script d0
# npm run-script d1
# npm run-script d2

echo ----------------------------------finish deploy -----------------------------------\n
`
    const ds=path.resolve(dir1,'deploy_'+stage+'.sh')
    fs.writeFileSync(ds,s)
    fs.chmodSync(ds,'777')
    console.log('deploy script',ds)


    let r=FN.map(name=>{
        let dir2=path.resolve(dir1,name)
        let sh=toml2sh(tom,name,stage)
        const env=path.resolve(dir1,name,'env_'+stage+'.sh')
        fs.writeFileSync(env,sh)
        fs.chmodSync(env,'777')
        return {
            name,
            env,
            dir:dir2,
        }
    })

    console.log(r)
    console.log('done')
    return r
}



const start=(dir0="../../../poem")=>{
    const dir1=fs.realpathSync(dir0)
    const tomls=ls(dir1)
    console.log(dir1)
    console.log(tomls)
    return tomls.map(parse_tom)
}


module.exports={
    start,
}

