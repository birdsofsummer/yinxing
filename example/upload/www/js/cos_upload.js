//const UPLOAD_TOKEN_SERVER="https://service-75ph8ybo-1252957949.ap-hongkong.apigateway.myqcloud.com/release/weibo/upload_tk"
const UPLOAD_TOKEN_SERVER="/api/token"


const CONFIG={
    Prefix : "/music/",
    Bucket : 'ttt-1252957949',
    Region : 'ap-hongkong',
}

const sign=()=>get_json(UPLOAD_TOKEN_SERVER)
const key_formator=({ credentials: { sessionToken, tmpSecretId, tmpSecretKey}, expiredTime, startTime,})=>({
        TmpSecretId: tmpSecretId,
        TmpSecretKey: tmpSecretKey,
        XCosSecurityToken: sessionToken,
        ExpiredTime: expiredTime,
})

var getAuthorization = (k)=>(options, f)=>f(k)
var get_auth=(a)=>cb2promise(new COS({ getAuthorization: getAuthorization(key_formator(a)) }))

const refresh_token=async()=>{
//   let {ok:ok0,data:{ok,data}}=await sign()
//   if (!ok0 || !ok) {
//        return
//   }

   let {ok,data}=await sign()
   if(!ok){
        throw data
   }
   localforage.setItem('token',data)
   return data
}

//{expiredTime,expiration,credentials,requestId,startTime}
const check_token=(tk={expiredTime:0})=>R.isNil(tk)? false : tk.expiredTime-now()>30

const get_token=async ()=>{
    let tk=await localforage.getItem('token')
    return check_token(tk||{}) ? tk : await refresh_token()
}

const get_token1=async ()=>{
    let tk=(await localforage.getItem('token'))||{}
    return auto_update(refresh_token,tk,check_token)
}

const get_cos=async (token,{Bucket,Region,Prefix}=CONFIG)=>{
       if (!token){
            return
       }
       var cos=get_auth(token)
      // path ="img/2019/12/01/"
       const upload=(file,path="")=> cos._sliceUploadFile({
                   Body: file,
                   Key: Prefix + path + file.name,
                   Bucket: Bucket,
                   Region: Region,
                   onHashProgress: say('...'),
                   onProgress: say('p'),
             })
       const list=()=>cos._getBucket({Bucket ,Region,})
       const get=(Key)=>cos._getObject({Bucket ,Region,Key})
       return {cos,list,upload,get}
}

const get_cos1=async (config=CONFIG)=>{
   let token=await get_token()
   if (!token){
       throw "稍后重试"
   }
   return get_cos(token,config)
}

//{Location,Bucket,Key,ETag,statusCode,headers}
const upload_cos=async (file,path="")=>{
       let {cos,list,upload,get}=await get_cos1(CONFIG)
       return upload(file,path)
}

const test_cos=async ()=>{
        const input = document.getElementById('file');
        const onSelectFile =() =>upload_cos(input.files[0],"")
        input.addEventListener('change', onSelectFile, false);
}
