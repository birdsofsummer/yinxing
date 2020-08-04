const statuses = require('statuses');
const {
    cors_headers,
}=require('./cors')

const {
    path2mime,
}=require("../../fp/mime")

const {
    to_json,
    to_s1,
    compose1,
    is_img,
}=require("../../fp")


const set_cookie=(k,v,t=60*1000)=>({
'Set-Cookie':k+"="+"v"+';domain=/;path=/;max-age='+t})

//let cookie="pgv_pvid=8655516800; pgv_pvi=6771314688; pgv_info=ssid=s4931415220; pgv_si=s2344184832"

const res_html=(name="./index.html",headers={})=> ({
    isBase64Encoded: is_img(name) ? true : false,
    statusCode: 200,
    headers: { 'Content-Type': (path2mime(name)||"text/html") + '; charset=utf-8',...cors_headers ,...headers},
    body: fs.readFileSync(path.resolve(__dirname, name), { encoding: 'utf-8' }).toString(is_img(name) ? "base64" : "utf-8"),
})

const res_img=(name="./1.jpg",headers={})=> ({
    isBase64Encoded: true,
    statusCode: 200,
    headers: { 'Content-Type': 'image/jpeg;',...cors_headers ,...headers},
    body: fs.readFileSync(name).toString("base64"),
})

const res_json=(d={},code=200,ok=true)=>({
    "isBase64Encoded": false,
    "statusCode": code,
    "headers": {"Content-Type":"application/json; charset=utf-8",...cors_headers},
    "body": JSON.stringify({"errorCode":0,"errorMessage":"",ok:ok,data:d},null,"\t")
})


const res_error=(d={},code=401,)=>({
    "isBase64Encoded": false,
    "statusCode": code,
    "headers": {"Content-Type":"application/json; charset=utf-8",...cors_headers},
    "body": JSON.stringify({"errorCode":0,"errorMessage":d,ok:false,data:{}},null,"\t")
})


const redirect=(
    url="https://www.baidu.com",
    body="",
    statusCode=302,
    headers={},
)=>({
    isBase64Encoded: false,
    statusCode,
    headers: {
        'Content-Type': 'text/html; charset=utf-8' ,
        "location": url ,
        ...cors_headers,
        ...headers,
       //  'Set-Cookie': 'islogin=0;domain=/;path=/;max-age=60*1000'
        },
    body,
})


const echo=(e, context, callback)=>({
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {"Content-Type":"application/json; charset=utf-8",...cors_headers},
    "body": JSON.stringify({"errorCode":0,"errorMessage":"",ok:true,data:e},null,"\t")
})



const reject_req=(ctx,code=401,data={})=>{
    let h={
        "isBase64Encoded": false,
        "statusCode": code,
        "headers": {"Content-Type":"application/json; charset=utf-8",...cors_headers},
        "body": JSON.stringify({"errorCode":0,"errorMessage":"",ok:false,data},null,"\t")

    }
    ctx.token={}
    ctx.callback(null,h)
}


const redirect_req=(ctx,code=302,location="/",headers={})=>{
    let h={
        isBase64Encoded: false,
        statusCode: code,
        headers: {
            'Content-Type': 'text/html; charset=utf-8' ,
            "location":  location,
 //         'Set-Cookie': 'islogin=0;domain=/;path=/;max-age=60*1000'},
        },
        body: "",
    }
    ctx.token={}
    ctx.callback(null,h)
}


const create_body=(
        x=200,
        d={},
        message="",
        errorCode=0,
        ok=true,
        headers={},
)=>{

            if (!statuses.codes.includes(x)) throw statuses.codes


            let statusCode=code=x
            let isBase64Encoded=false

            let msg=message||statuses[x]

            //不处理图片
            let d1={
                "errorCode":errorCode,
                "errorMessage":msg,
                ok:ok,
                data:d,
            }

            let body=to_s1(d1)
            let body1=to_s1({...d1,ok:false})

            //let d1={code:x,ok,msg,data:d}
            if (x>=200 && x<300){

                let r={
                    isBase64Encoded,
                    statusCode: x,
                    headers: {
                        "Content-Type":"application/json; charset=utf-8",
                        //'Content-Type': 'text/html; charset=utf-8',
                        ...cors_headers,
                        ...headers
                    },
                    body: body,
                }
                return r

            }else if(x>=300 && x<=308){

                let r={
                    isBase64Encoded,
                    statusCode: x,
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8' ,
                        "location":  msg,
             //         'Set-Cookie': 'islogin=0;domain=/;path=/;max-age=60*1000'},
                    },
                    body: "",
                }
                return r
            }else{
               let r={
                    isBase64Encoded,
                    "statusCode": x,
                    "headers": {
                        "Content-Type":"application/json; charset=utf-8",
                        ...cors_headers
                    },
                    "body": body1,
                }
                return r
            }
}



module.exports={
    set_cookie,
    res_json,
    res_html,
    res_img,
    res_error,
    redirect_req,
    reject_req,
    echo,
    redirect,
    create_body,
}
