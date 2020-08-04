const R=require('ramda')

const {para}=require("../fp")
const {
    json2env,
    add_vars,
}=require('../fp/scf')

const {
    conn,
    create_req,
}=require("../qcloud/v3")


const {
    set_env,
    set_env_yaml,
    list_fn,
    del_fn,
    copy_fn,
    publish_fn,
    zip_create_fn,
    zip_update_fn,

    cos_create_fn,
    cos_update_fn,

    git_create_fn,
    git_update_fn,
    init_ns,
    copy_ns,
    configs,
    configs_parsed:{
        FN,
        TMP_DIR,
        FN_ENV,
        NS,
        FN_CONFIG,
        GIT,
        fn_zip,
        fn_detail,
    },
}=require("./index")

const NSS=R.map(R.prop("Namespace"))(NS)


//初始化
const dep_first=async (ns="test")=>{
    let n1=fn_detail(ns)


    console.log(NS)
    console.log(n1)
/*
n1
[
  {
    FunctionName: 'user',
    ZipFile: '/tmp/user.zip',
    env: {
      TOKEN_KEY: 'a',
      TOKEN_LIFE: '86400',
      TOKEN_AUD: 'b',
      TOKEN_SUB: 'c',
      TOKEN_ALG: 'HS256',
      TOKEN_TYP: 'JWT',
      server_ip: '1.1.1.1',
      app_name: 'user'
    },
    Namespace: 'test'
  },
  {
    FunctionName: 'token',
    ZipFile: '/tmp/token.zip',
    env: {},
    Namespace: 'test'
  }
]
*/
    console.log('--------------begin deploy-------------\n')

    try{
        console.log('--------------begin init ns-------------\n')
        let n=await init_ns(NS)
        console.log(n)
        console.log('--------------finish init ns-------------\n')
    }catch(e){
        console.log(e)
    }

    try{
        console.log('--------------begin create fn-------------\n')
        let r=await para(cos_create_fn,n1)
        console.log('--------------finish create fn-------------\n')
        console.log('--------------finish deploy-------------\n')
        console.log(r)
        return r
    }catch(e){
        console.log(e)
    }
}

//更新
const update_fn=async (ns="test")=>{
   let n1=fn_zip(ns)
   console.log(n1)
   await para(cos_update_fn,n1)
}

//发布
//copy_ns(NSS[0],NSS[1])
//

const publish_ns=async (ns=NSS)=>{
    let  c=conn()
    for (let n of ns){
        let r1=await c._ListFunctions({"Namespace":n})
        let f=R.project(["FunctionName",'Description'])(r1)
        let r2=para(publish_fn,f)
        console.log(r2)
        return r2
    }
}


const run=(arg=process.argv)=>{
    const commander = require('commander');
    const program = new commander.Command();
    program.version('0.0.1')

    program
      .option('-n, --ns <name>', 'namespace')
      .option('-f, --first', 'init ns & deploy ')
      .option('-u, --update', 'deploy test ns')
      .option('-p, --publish', 'cp test_ns release_ns')


    let help=`
    node deploy.js -n "ccc" -f
    node deploy.js -n "ccc" -u
    node deploy.js -n "ccc" -p
    `
    program.on('--help', function(){
        console.log(help)
    });

    program.parse(arg);

    let ns=program.ns||"test"
    console.log("ns",ns)

    let {first,update,publish}=program

    if  (!(first || update || publish)){
        return console.log(help)
    }

    if (first){
        console.log('init ns & deploy test_ns')
        //dep_first(ns)
    }

    if (update){
        console.log('update test_ns')
        //update_fn(ns)
    }

    if (publish){
        console.log('cp test_ns release_ns')
        //publish()
    }
}


module.exports={
    dep_first,
    update_fn,
    publish_ns,
    copy_ns,
    run,
}
