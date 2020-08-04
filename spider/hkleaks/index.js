const request = require('superagent')
const superagent=require('superagent-charset')(request)
const agent = superagent.agent();
const R=require("ramda")
const cheerio=require("cheerio")

const url2file=(url)=>decodeURI(url).split('/').slice(-1)[0].split('.')[0]

HOST=`https://hkleaks.ru`
detail_page=(name=`Chau_Ka_Shing`)=>`${HOST}/model/pc/content_${name}.html`

parse_name_card1=x=>{
        img=x.attr('style').match(/\'.*\'/)[0].replace(/\'/g,'')
        img1=HOST+'/'+img
        url=HOST+'/'+x.find('.sbtn').attr('onclick').match(/=(.*)/)[1].replace(/\'/g,'')
       let [zh,en]= img.split('/').slice(-1)[0].split('+')
       zh=zh.trim()
       let en1=en.split('.')[0]
       return {zh,en1,img1,url }
}

parse_detail=({text},i=0)=>{
    console.log(i)
    $=cheerio.load(text)
    attr=(a='src')=>(x)=>$(x).attr(a)
    it=x=>x
    parent_url=x=>x.replace("../..",HOST)
    z={
       "content":['.sgray11','text',it],
        "type":[".sgray11_p1","text",it],
        "title":['.sgray11_p1',"text",it],
        "type":['.sgray4-img',"src",url2file],
        "head":['.sgray3-img',"src",parent_url],
    }
    return R.mapObjIndexed(([s,method,fn],k,o)=>method=='text' ? fn($(s).text().trim()) : fn(attr(method)(s)))(z)
}

get_list=async()=>{
    r=await get(HOST);
    $=cheerio.load(r.text)
    map=f=>x=>R.range(0,$(x).length).map(i=>f($(x).eq(i)))
    return map(parse_name_card1)('.stable_1')
}

sleep=(ms=1)=>new Promise(resolve => setTimeout(resolve, ms*1000));

async function* gets(list) {
    for (let  u of list){
        try{
          r=await get(u)
          console.log(u,r.ok)
          yield r
          sleep(3)
        }catch(e){
          console.log(e)
        }
     }
}
z1=[]
start=async(list)=>{
    i=0;
    for await (const r of gets(list)) {
        console.log(i)
        z=parse_detail(r)
        z1.push(z)
        i++
    }
    return z1
}

