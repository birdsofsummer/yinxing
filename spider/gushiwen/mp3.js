const superagent=require('superagent')
const util=require('utility')
const R=require('ramda')
const child_process=require("mz/child_process")
const exec = child_process.exec
const fs=require('fs')

const {seq1,to_json}=require('../../fp')
const {
    cookie,
    ua,
}=process.env


h={
    "Host" : "song.gushiwen.cn",
    "accept-encoding" : "identity;q=1, *;q=0",
    "user-agent" : ua,
    "chrome-proxy" : "frfr",
    "accept" : "*/*",
    "accept-language" : "en-GB,zh-CN;q=0.9,en-US;q=0.8",
    "x-requested-with" : "org.gushiwen.gushiwen",
    "range" : "bytes=0-",
}

server="https://song.gushiwen.cn/dict/mp3/"
path="./mp3/"
download=(name="que4.mp3")=>superagent
    .get(server+name)
    .set(h)
    .pipe(fs.createWriteStream(path+name))

start=async ()=>{
    zi_file='gushiwen-zidian1.json'
    await exec("mkdir "+path)
    zi=await util.readJSON(zi_file)
    mp3=zi.map(x=>x.tb_zidian.pingyin).map(x=>!x? "" : x.split('|').filter(x=>x).map(x=>x.split(',')[1])).flat().filter(x=>x)
    seq1(download,console.log,R.uniq(mp3))
}

