const fs = require('fs')
const moment=require("moment")
const now=()=>moment.now()

const {save}=require('../io')
const {
    Prefix
} = process.env
const BASE_DIR= "/var/user/"
const UPLOAD_DIR1= BASE_DIR + Prefix


const {
    cos,
    list,
    del,
    slice_upload,
    upload_s,
    upload_s1,
    upload1,
}=require("../cos")

/*

export SecretId=AKIDlQ2Znxxxxxxxxxxxxxxxxxxxxxxxx
export SecretKey=aO7QfZxxxxxxxxxxxxxxxxxxxxxxxxx
export Bucket=ttt-1252957949 #
export Region=ap-hongkong    #
export Prefix=music          #根文件夹名
export maxFileSize="6291456"  #文件大小限制 < 6m

*/


/*

prefix=music
name=1.aac
那么
如果存在本地(云函数所在文件夹): /var/user/music/1.aac
远程 https://ttt-1252957949.cos.ap-hongkong.myqcloud.com/music/1.aac

*/


// 存本地
/*
    如果您需要在本地写临时文件，只能写到 /tmp 路径下，其他路径下写操作会失败。
    /tmp 路径下空间有限，您需要定时清理。
    https://cloud.tencent.com/document/product/583/37290
*/


const upload=async (ctx,next)=> {
       // console.log(ctx.request)
       // console.log(ctx.request.files)
        let file=ctx.request.files['file']
        let {size,type,name,path}=file
        let path1 = UPLOAD_DIR1 + name
        save(path,path1)
        return ctx.body = {
            "errorCode":0,
            "errorMessage":"",
            message: "文件上传成功",
            ok: true
        }
}

const upload_cos=async (ctx,next)=>{
 //       console.log(ctx.request)
 //       console.log(ctx.request.files)
        let p=ctx.request.body.path || ""
        //"img/2019/12/01/"
        let file=ctx.request.files['file']
        let {size,type,name,path}=file
        let path1 = Prefix + "/" + p + name
        // fs.createReadStream
        let r = await slice_upload(path,path1)
        console.log(r)
        //const COS_HOST=process.env.COS_HOST
        //let url=COS_HOST+path1
        return ctx.body = {
            "errorCode":0,
            "errorMessage":"",
            message: "文件上传成功",
            ok: true,
            data:r ,//path1,
        }
}
const list_cos=async (ctx,next)=>{
    let c=cos()

    return ctx.body = {
            "errorCode":0,
            "errorMessage":"",
            data: await list(),
            message: "",
            ok: true
    }
}

const delete_cos = async (ctx,next)=>{
    let c=cos()
    console.log(ctx.request.body)
    let {Key}=ctx.request.body
    if (!Key){
        return ctx.body = {
            "errorCode":0,
            "errorMessage":"",
            data: {},
            message: "no key",
            ok:false,
        }
    }
    return ctx.body = {
            "errorCode":0,
            "errorMessage":"",
            data: await del(Key),
            message: "",
            ok: true,
    }
}

const get_cos_tk=async (ctx,next)=>{
   let {get_tk}=require("../cos/sts")
   let r=await get_tk()
   return ctx.body = {
            "errorCode":0,
            "errorMessage":"",
            data: r,
            message: "",
            ok: true,
    }
}

module.exports={
    upload,
    upload_cos,
    list_cos,
    delete_cos,
    get_cos_tk,
}


