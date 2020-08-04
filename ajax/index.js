const R=require("ramda")
const {URL}=require('url')
const superagent=require("superagent")
const {createWriteStream}=require('mz/fs')


const {
    to_json,
    to_qs,
    parse_jsonp,
}=require("../fp")

const {
    MOBILE_UA,
    MOBILE_UA1,
    FF_UA,
    WX_UA,
    SF_UA,
}=require("./ua")


const ajax_safe=(
    url='https://segment.io',
    method="get",
    data={},
    params={},
    retry_times=3,
)=>{
   require('superagent-retry')(superagent);
   return superagent[method](url)
      .query(params)
      .send(data)
      .retry(retry_times)
}

const get_json=(u)=> superagent.get(u).type('json')
const get_jsons=(u=[])=> Promise.all(u.map(get_json))

const get_jsonp=async (url,params)=>{
    let r=await superagent.get(url,params)
    let r1=r.body.toString()
    return parse_jsonp(r1)
}

const get_blob2json=async (url)=>{
      let r=await superagent.get(url)
      .set({...FF_UA,'Accept':'application/json'})
      .responseType('blob')
      let s=r.body.toString()
      return to_json(s)
}
//'https://y.qq.com/portal/playlist.html'
const download=(u,file_name)=>
        superagent
        .get(u,file_name)
        .set(SF_UA)
        .set("referrer",new URL(u).origin)
        .pipe(createWriteStream(file_name))

const gets=(ps=[])=>Promise.all(ps.map(([u,d])=>superagent.get(u,d)))

const posts=(req)=>Promise.all(req.map(({url,data})=>superagent
    .post(url,data)
    .set(WX_UA)
    .set("referrer",new URL(url).origin)
))

const post_form=async ({url,data})=>{
      let r={}
      try{
         let t=await superagent.post(url).type('form').send(data)
         r=JSON.parse(t.text);
      }catch(e){
         console.log(e)
      }finally{
         return r
      }
}

const post_json=(u,d,h={})=>superagent
    .post(u,d)
    .set({"Content-type":"application/json",...h})
    .type('json')

const proxy=async({url})=>await superagent.get(url)
    .set(MOBILE_UA)
    .set("referrer",url)
    .responseType('blob')


const VID_ERROR= {
            "code":104001,
            "cid":205361747,
            "errinfo":"mid decrypt error",
            "data":{
                "items": []
            }
}

const get=async (u,d={})=>{
    let r=await  superagent
        .get(u)
        .query(d)
        .set({
            "Referer":u,
        })
        .set(MOBILE_UA1)
       // .type('json')
       // .charset()
       // .buffer(true)

    let r1=r.body.toString()
    return to_json(r.text||r1)
}

const get1=async (u,d={})=>{
    let z=await superagent
        .get(u)
        .query(d)
        .responseType('blob')
        .buffer(true)
    let b=z.body.toString()
 //   console.log(b)
    return to_json(b,VID_ERROR)
}


module.exports={
    posts,
    post_form,
    post_json,
    get_jsonp,
    gets,
    get_blob2json,
    proxy,
    download,
    get,
    get1,
}






