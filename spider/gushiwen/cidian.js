superagent=require('superagent')
util=require('utility')
R=require('ramda')
fs=require('fs')
const child_process=require("mz/child_process")
const exec = child_process.exec

const {seq1,to_json}=require('../../fp')
const {
    cookie,
    ua,
}=process.env


h={
    "Host":"app.gushiwen.cn",
    "cookie":cookie,
    "content-type":"application/x-www-form-urlencoded",
    "user-agent":"okhttp/3.12.1",
}
d={
    value:"月",
    token:"gswapi",
}
server="https://app.gushiwen.cn/api/other/cidian.aspx"
path="./json/"
find=(value="月")=>superagent
    .post(server,{...d,value})
    .set(h)
    .pipe(fs.createWriteStream(path + value + '.json'))

start=async (zi_file='./zi.json')=>{
   await exec("mkdir "+path)
   zi=await util.readJSON(zi_file)
   seq1(find,console.log,zi)
}

