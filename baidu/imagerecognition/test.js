const {api,post}=require("./index")
const fs=require('mz/fs')
const {
    img2base641,
}=require('../../fp')


ACCESS_TOKEN = '24.fb87fe7335f073ac02bd2e8c9a3e3173.2592000.1579168740.282335-18048107'
ACCESS_TOKEN1 = '24.346e81211e0b44489d2ab2c2a2847b58.2592000.1579433422.282335-18075594'

const test=async (i="./img/2.jpg",tk=ACCESS_TOKEN)=>{
    b=await fs.readFile(i)
    image=img2base641(b)
    u=api["通用物体和场景识别高级版"]
    r=await post(u,image,tk)
    console.log(r.body)
    return r.body
}

test()
