var {promisify}=require('util')
var convert = require('xml-js');
var parser = require('fast-xml-parser');

const json2xml=(js,option={compact: true})=>convert.js2xml(js, option)
const xml2json=(xml,option={compact: true})=>convert.xml2js(xml,option)
const xml2json1=(xml)=>parser.parse(xml)['xml']


const {
    wx_token="***",
    wx_EncodingAESKey="****",
    wx_AppID="****",
    wx_AppSecret="****",
}=process.env

const CONFIG={
    token : wx_token,
    EncodingAESKey : wx_EncodingAESKey,
    AppID : wx_AppID,
    AppSecret : wx_AppSecret,
}

const get=(u)=>fetch(u).then(x=>x.json())
const get_token=({AppID,AppSecret})=>{
    tk_url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppID}&secret=${AppSecret}`
    return get(tk_url)
}


/*

const has_child=(c)=>c.constructor== Object && Object.keys(c).length>0
const parse=(r={},key="_cdata")=>{
    for (let c in r) {
       let leaf=r[c]
       if (has_child(leaf) ){
           key in leaf ? r[c]=leaf[key] : parse(r[c],key)
       }
    }
}
*/


templates=()=>({
link:`
<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1351776360</CreateTime>
  <MsgType><![CDATA[link]]></MsgType>
  <Title><![CDATA[公众平台官网链接]]></Title>
  <Description><![CDATA[公众平台官网链接]]></Description>
  <Url><![CDATA[url]]></Url>
  <MsgId>1234567890123456</MsgId>
</xml>

`,
text:`<xml>
      <ToUserName><![CDATA[toUser]]></ToUserName>
      <FromUserName><![CDATA[fromUser]]></FromUserName>
      <CreateTime>1348831860</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[this is a test]]></Content>
      <MsgId>1234567890123456</MsgId>
    </xml>` ,
video:`<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1357290913</CreateTime>
  <MsgType><![CDATA[video]]></MsgType>
  <MediaId><![CDATA[media_id]]></MediaId>
  <ThumbMediaId><![CDATA[thumb_media_id]]></ThumbMediaId>
  <MsgId>1234567890123456</MsgId>
</xml>`,
image:`<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1348831860</CreateTime>
  <MsgType><![CDATA[image]]></MsgType>
  <PicUrl><![CDATA[this is a url]]></PicUrl>
  <MediaId><![CDATA[media_id]]></MediaId>
  <MsgId>1234567890123456</MsgId>
</xml>
`,
voice:`
    <xml>
      <ToUserName><![CDATA[toUser]]></ToUserName>
      <FromUserName><![CDATA[fromUser]]></FromUserName>
      <CreateTime>1357290913</CreateTime>
      <MsgType><![CDATA[voice]]></MsgType>
      <MediaId><![CDATA[media_id]]></MediaId>
      <Format><![CDATA[Format]]></Format>
      <MsgId>1234567890123456</MsgId>
    </xml>
`,
shortvideo:`
<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1357290913</CreateTime>
  <MsgType><![CDATA[shortvideo]]></MsgType>
  <MediaId><![CDATA[media_id]]></MediaId>
  <ThumbMediaId><![CDATA[thumb_media_id]]></ThumbMediaId>
  <MsgId>1234567890123456</MsgId>
</xml>
`,
location:`
    <xml>
      <ToUserName><![CDATA[toUser]]></ToUserName>
      <FromUserName><![CDATA[fromUser]]></FromUserName>
      <CreateTime>1351776360</CreateTime>
      <MsgType><![CDATA[location]]></MsgType>
      <Location_X>23.134521</Location_X>
      <Location_Y>113.358803</Location_Y>
      <Scale>20</Scale>
      <Label><![CDATA[位置信息]]></Label>
      <MsgId>1234567890123456</MsgId>
    </xml>
`,
})


const echo1=(xml)=>{
    let cdata="__cdata"
    let o={cdataTagName:cdata}
    let p = new Parser(o)
    let _tox=x=>p.parse(x)
    let _toj=x=>parser.parse(x,o)
    let swap=(xml)=>{
        let {ToUserName,FromUserName,CreateTime,MsgType,MsgId,Content}=xml2json1(xml)
        let json=_toj(xml)
        json.xml.FromUserName[cdata]=ToUserName
        json.xml.ToUserName[cdata]=FromUserName
        return json
    }
    return _tox(swap(xml))
}

const echo=(xml)=>{
    json=xml2json(xml)
    to=json.xml.ToUserName._cdata
    from=json.xml.FromUserName._cdata
    json.xml.FromUserName._cdata=to
    json.xml.ToUserName._cdata=from
    return json2xml(json)
}

const reply=(xml)=>{
    let d=echo(xml)
    return new Response(d, { status: 200 })
}

//gen=()=>Object.keys(templates()).map(x=>[x,`(json)=>{return  Content }`]).reduce((a,[k,v])=>({...a,[k]:v,}),{})


const reply1=(xml)=>{
    let json=xml2json1(xml)
    let {ToUserName,FromUserName,CreateTime,MsgType,Title,Description,Url,MsgId,Content,MediaId,ThumbMediaId,PicUrl,Format,Location_X,Location_Y,Scale,Label}=json
    let handler={
          link: ()=>{return  Url},
          text: ()=>{return  Content },
          video: ()=>{return  MediaId},
          image: ()=>{return  PicUrl},
          voice: ()=>{return  MediaId},
          shortvideo: ()=>{return  MediaId},
          location: ()=>{return  `${Location_X} ${Location_Y}`},
    }
    let msg=handler[MsgType]()
    let d=`
            <xml>
              <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
              <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
              <CreateTime>${CreateTime}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${msg}]]></Content>
              <MsgId>${MsgId}</MsgId>
            </xml>
    `
    return new Response(d, { status: 200 })
}

async function handleRequest(request) {
      let {url,method}=request
      let u=new URL(url)
      if (u.pathname === "/echo"){
          if (method=="POST"){
              xml=await request.text()
              return reply1(xml)
          }else if(method=="GET"){
              // {token,timestamp,nonce,echostr}
              let echostr = u.searchParams.get('echostr')
              return new Response(echostr, { status: 200 })
          }
      }else if(u.pathname === "/test"){
              xml=await request.text()
              return reply1(xml)
      }else{
          return new Response(method, { status: 200 })
      }
}


addEventListener('fetch', event => {
      event.respondWith(handleRequest(event.request))
})

