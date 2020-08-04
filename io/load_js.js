const path = require("path");
const fs = require('mz/fs');
const R=require('ramda')
// a/b ./a/b
const is_js=(x="")=>path.extname(x) === '.js'
const ls_js=(folder=".")=>fs.readdirSync(folder).filter(is_js)
const add_relative=R.when(x=>!/^\.|^\//.test(x),R.pipe(R.prepend('./'),R.join('')))
const join_path=R.pipe(path.join,add_relative)

const load = (folder="../cos", filename="index.js")=>require(join_path(folder, filename))
const get_name=(filename="",ext=".js")=>path.basename(filename, ext)
const loads=(folder="../cos")=>R.pipe(ls_js,R.map(x=>[get_name(x),load(folder,x)]),R.fromPairs)(folder)

module.exports={
    is_js,
    ls_js,
    load ,
    get_name,
    join_path,
    loads,
}

const test=()=>{
    const a=loads('.')
    const b=loads('../cos')
/*
{
  index: {
    cos: [Function: cos],
    list: [Function: list],
    del: [Function: del],
    slice_upload: [Function: slice_upload],
    upload_s: [Function: upload_s],
    upload_s1: [Function: upload_s1],
    upload1: [Function: upload1]
  },
  sts: { conn: [Function: conn], get_tk: [Function: get_tk] }
}
*/
}
