const utility=require('utility')
const superagent=require("superagent")
const R=require("ramda")
const readline=require('readline')
const fs=require("fs")

const {
    SERVER,
    H,
    HEADERS,
    PROVINCE,
    JOB,
}=require("./consts")

const reco=require("./ocr")

const now=()=>new Date().getTime().toString()

const format_cookie1=R.pipe(
    R.pathOr([],['header','set-cookie']),
    R.map(
        R.pipe(R.split(";"),
        R.head)
    ),
    R.join('; '),
)

const mix_cookie=R.pipe(
    R.join("; "),
    R.pipe(R.split('; '),R.map(R.split('='))),
    R.fromPairs,
    R.toPairs,
    R.map(R.join('=')),
    R.join('; ')
)

const wait=(tips = '> ') => new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    })


const login=async (h={},code="")=>{
    console.log(h,code)
    referrer="http://zqyj.chinalaw.gov.cn/index",
    d1={
        userName: "",
        province: "北京市",
        job: "销售|客服|市场",
        email: "",
        mobile: "",
        address: "",
        verifyCode: code,
    }
    d={
        "_ZVING_METHOD": "Register.doAnonymousLogin",
        "_ZVING_URL": "%2Findex",
        "_ZVING_DATA": JSON.stringify(d1),
        "_ZVING_DATA_FORMAT": "json"
    }
   //body=new URLSearchParams(d)
    h1={...h,referrer}
    return superagent
        .post(SERVER)
        .send(d)
        .type("form")
        .set(h1)
}

vote=async (h={})=>{
    referrer="http://zqyj.chinalaw.gov.cn/draftDetail?listType=1&DraftID=3654&1583032457181"
    let h1={...h,referrer}
    console.log(h1)
    const s=123166
    const n=5*11
    let log=[]
    for (i=s;i<=s+n;i++) {
        let dd={"DraftID":3654,"ID":`${i}`}
        let d={
              '_ZVING_METHOD' : 'SupportOppose.voteOppose',
              '_ZVING_URL' : '%2FdraftDetail',
              '_ZVING_DATA' : JSON.stringify(dd),
              '_ZVING_DATA_FORMAT' : 'json',
        }
        //body="_ZVING_METHOD=SupportOppose.voteOppose&_ZVING_URL=%252FdraftDetail&_ZVING_DATA=%7B%22DraftID%22%3A3654%2C%22ID%22%3A%22"+i+"%22%7D&_ZVING_DATA_FORMAT=json"
        let r=await superagent
            .post(SERVER)
            .set(h1)
            .send(d)
            .type('form')
        console.log(i,d,r.body)
        log.push({i,d,res:r.body})
    }
    console.log('done :)')
    utility.writeJSON('log/log.json',log)
}

const img_url=()=>{
   t=new Date().getTime()
   u="http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&"+ t
   return u
}


//acw_tc=2760821f15830630071588192e97cebdeb7243efda55a8d95c07920f75e5c9; _ZVING_AUTHCODE=fbd153dfbf9c397f45c349ab6bffcf85_1583063007160; SERVERID=0f3ede75121c6142e2a8ab2aa93ff6b0|1583063007|1583063007
const get_code=async ()=>{
   code_u=img_url()
   let r1=await superagent
        .get(code_u)
        .set(H)
        .responseType('blob')

   //ocr不准
   //let code=await reco(r1.body)
   let hh={...HEADERS,"Cookie":format_cookie1(r1)}
   //console.log(hh)
   fs.writeFileSync('code/code.jpg',r1.body)
   console.log('code/code.jpg')
   let code=await wait()
   return [hh,code]
}


// 1. http://zqyj.chinalaw.gov.cn/index#
// get code ->cookie1 | reco code  -> login(code) ->cookie2 -> vote
const start=async ()=>{

   console.log('get code')
   let [h,code]=await get_code()

   r1=await login(h,code)
   console.log('login!',r1.body)
   console.log(r1.header)

   h1={
        "Cookie":mix_cookie([
            h["Cookie"],
            format_cookie1(r1)
        ]),
        ...HEADERS,
   }
   console.log('wait vote...')
   await vote(h1)
}

start()




