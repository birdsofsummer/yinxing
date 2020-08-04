const path=require('path')
const upload=(file="/tmp/user.zip")=>{
    const file_name=path.basename(file)
    let Key=path.resolve("/function/",file_name)
    console.log(file,Key)
    const {slice_upload}=require("yinxing/cos")
    return slice_upload(file,Key)
}


if (process.argv.length<3) {
    throw "file???"
}else{
    let file=process.argv[2]
    console.log(file)
    upload(file)
}
