// https://blog.csdn.net/u013052238/article/details/81010794
// https://www.npmjs.com/package/protobufjs

var protobuf=ProtoBufJs = require("protobufjs");
const PROTO="./v3/zzz.proto"

const encode1=async (file=PROTO)={
    var root=await protobuf.load(file)
    var AccountList = root.lookupType("zzz.AccountList");
    var Account = root.lookupType("zzz.Account");

    //...
}


var root = ProtoBufJs.loadSync(PROTO);
var AccountList = root.lookupType("zzz.AccountList");
var Account = root.lookupType("zzz.Account");


// json -> buffer -> base64
// base64 -> buffer -> json

const encode=()=>{
    var users = AccountList.create();

    const create_user=(i=0)=>{
        const a = Account.create();
        a.accountName = "aaa"+i
        a.pwd = "bbb"+i
        return a
    }
    const create_user1=(i=0)=>{
        let o={accountName:"aaa"+i,pwd:"bbb"+i,}
        const a=Account.fromObject(o)
        return a
    }
    // users=AccountList.fromObject({index:"0", list:[create_user1(0)]})

    for(var i = 0; i < 10; i++){
        let z=create_user(i)
        users.list.push(z);
    }

    var buffer = AccountList.encode(users).finish();

    //'[{"accountName":"aaa0","pwd":"bbb0"},{"accountName":"aaa1","pwd":"bbb1"},{"accountName":"aaa2","pwd":"bbb2"},{"accountName":"aaa3","pwd":"bbb3"},{"accountName":"aaa4","pwd":"bbb4"},{"accountName":"aaa5","pwd":"bbb5"},{"accountName":"aaa6","pwd":"bbb6"},{"accountName":"aaa7","pwd":"bbb7"},{"accountName":"aaa8","pwd":"bbb8"},{"accountName":"aaa9","pwd":"bbb9"}]'
//
    let s= buffer.toString('base64')
    console.log(s.length) // 192
    console.log(JSON.stringify(users.list).length) //361

    return s
}




decode=(s="")=>{
    b=Buffer.from(s, 'base64')
    us=AccountList.decode(b)
    o1=AccountList.toObject(us)
    o=us.toJSON()
    oo=AccountList.toJSON()
}

