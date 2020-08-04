//从toml里读设置
//https://cloud.tencent.com/document/api/583/17244#Code

const R=require('ramda')
const {
    json2env,
}=require("../fp/scf")

const parse_toml_configs=(configs={})=>{
    const {
      env: {
        app: { SecretId, SecretKey, Region},
        code: { CodeSources, CodeSource, DemoId},
        cos: {
          Bucket,
          Prefix,
          COS_HOST,
          maxFileSize,
          CosBucketName,
          CosObjectName,
          CosBucketRegion,
          TempCosObjectName,
        },
        git,
      },
      ns: { NS},
      fn: {
        file: { TMP_DIR, ZipFile , FN  },
        public_settings,
        private_settings,
      }
    }=configs

    const ENV={
        SecretId,
        SecretKey,
        Bucket,
        Region,
        Prefix,
        maxFileSize,
        COS_HOST,
    }

    let env_pub=R.map((v,k)=>Array.isArray(v)?v.join(','):v)(R.reduce((a,b)=>({...a,...b}),{})(R.flatten(R.values(configs.env))))
    let pub_env=json2env(env_pub)

    let FN_CONFIG={
        ...public_settings,
        Environment:pub_env,
    }
    let FN_ENV=private_settings
    let GIT=git

    const fn_zip=(Namespace="test")=>FN.map(x=>({
        FunctionName:x,
        ZipFile:TMP_DIR+x+".zip",
        Namespace,
    }))

    const fn_detail=(Namespace="test")=>FN.map(x=>({
        FunctionName:x,
        ZipFile:TMP_DIR+x+".zip",
        env:FN_ENV[x]||{},
        Namespace,
    }))

    return  {
        configs,
        FN,
        TMP_DIR,
        FN_ENV,
        NS,
        FN_CONFIG,
        GIT,
        fn_zip,
        fn_detail,
    }
}

module.exports={
    parse_toml_configs
}
