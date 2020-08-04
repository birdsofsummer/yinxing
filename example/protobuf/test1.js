superagent=require("superagent")
protobuf= require("protobufjs");
fs=require('mz/fs')

SERVER='https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/proto'

decode1=(b)=>{
    var root = protobuf.loadSync("./v3/zzz.proto");
    var AccountList = root.lookupType("zzz.AccountList");
    var Account = root.lookupType("zzz.Account");
    let us=AccountList.decode(b)
    let o1=AccountList.toObject(us)
    let o=us.toJSON()
    let oo=AccountList.toJSON()
    return o
}


const test=async ()=>{
     r=await superagent.
           get(SERVER)
           .responseType('binary')
     fs.writeFileSync('v3/zzz.bin',r.body)
     o=decode1(r.body)
     console.log(o)
}


const test1=async ()=>{
             //s="CAASDAoEYWFhMBIEYmJiMBIMCgRhYWExEgRiYmIxEgwKBGFhYTISBGJiYjISDAoEYWFhMxIEYmJiMxIMCgRhYWE0EgRiYmI0EgwKBGFhYTUSBGJiYjUSDAoEYWFhNhIEYmJiNhIMCgRhYWE3EgRiYmI3EgwKBGFhYTgSBGJiYjgSDAoEYWFhORIEYmJiOQ=="

    //v3
s= 'EgwKBGFhYTASBGJiYjASDAoEYWFhMRIEYmJiMRIMCgRhYWEyEgRiYmIyEgwKBGFhYTMSBGJiYjMSDAoEYWFhNBIEYmJiNBIMCgRhYWE1EgRiYmI1EgwKBGFhYTYSBGJiYjYSDAoEYWFhNxIEYmJiNxIMCgRhYWE4EgRiYmI4EgwKBGFhYTkSBGJiYjk='
     r=await superagent.
           post(SERVER)
           .send(s)
           .responseType('binary')
     //fs.writeFileSync('v3/zzz.bin',r.body)
     o=decode1(r.body)
     console.log(o)
}


test()
test1()
