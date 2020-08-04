// https://shimo.im/sheets/yXwh9yGDJgPRQt93/MODOC/
const superagent=require("superagent")
const cheerio=require("cheerio")
const R=require("ramda")
const utility=require('utility')

const HOST="http://www.ccg.org.cn"
const get=(u)=>superagent.get(u).then(x=>x.text)
const map=(f,x=[])=>x? R.range(0,x.length).map((i)=>f(x.eq(i))) :[]

const json2csv1=(o=[])=>{
    yinhao=R.map(x=>`"${x}"`)
    let k=R.pipe(R.head,R.keys,yinhao)(o)
    let d=R.pipe(R.map(R.pipe(R.values,yinhao)))(o)
    return R.pipe(R.map(R.join(",")),R.join("\n"))([k,...d])
}


const get_link=(x,i)=>[
            x.text().trim(),
            HOST+x.attr('href'),
]
get_lishi=async ()=>{
    let lishi=HOST+"/Director/"
    let t=await get(u)
    let $=cheerio.load(t)
    let l=$('.subnav li a')
    let a=map(get_link,l)
    return a
}
const get_total=(t)=>{
    let $=cheerio.load(t)
    return $('.page_bar a.current').length
}

const parse_list=(t)=>{
    let $=cheerio.load(t)
    let s=$('li.staff-block')
    parse_person=(x)=>({
        title:$('h1').text().trim().split(' ')[0].replace(" ",""),
        name:x.find("img").attr('alt'),
        desc:x.find('span').text().trim(),
        uri:HOST+"/"+x.find('a').attr('href'),
        img:HOST+x.find("img").attr('src'),
    })
    return map(parse_person,s)
}

//http://www.ccg.org.cn/Director/People.aspx?ClassId=115&keywords=&page=2
const get_list=async ([name,uri])=>{
    let t=await get(uri)
    let n=get_total(t)
    let first=parse_list(t)
    console.log(n)
    if (n>0) {
        for (let i=2;i<=n;i++){
            let u1=new URL(uri)
            u1.searchParams.set('page',i)
            let t1=await get(u1)
            let r=parse_list(t1)
            first.push(...r)
            console.log(i,n)
        }
    }
    await utility.writeJSON("json/"+name+'.json',first)
    console.log(name,n,"done")
    return first
}

start=async()=>{
    a=[
          ["国际专家" , "http://www.ccg.org.cn/Expert/People.aspx?ClassId=121"],
          ["国内专家", "http://www.ccg.org.cn/Expert/People.aspx?ClassId=122"],
          [ '主席', 'http://www.ccg.org.cn/Director/People.aspx?ClassId=111' ],
          [ '副主席', 'http://www.ccg.org.cn/Director/People.aspx?ClassId=115' ],
          [ '理事长', 'http://www.ccg.org.cn/Director/People.aspx?ClassId=133' ],
          [ '常务理事', 'http://www.ccg.org.cn/Director/People.aspx?ClassId=113' ],
          [ '理事', 'http://www.ccg.org.cn/Director/People.aspx?ClassId=114' ],
          [ '企业理事', 'http://www.ccg.org.cn/Director/People.aspx?ClassId=135' ],
    ]
    dd=await Promise.allSettled(a.map(get_list))
    dd1=dd.map(x=>x.value).flat()
    dd2=R.project(['name','title','desc'])(dd1)

    console.log(dd1.length)
    await utility.writeJSON("json/person.json",dd1)
    await utility.writeJSON("json/person1.json",dd2)
    let a1=json2csv(dd1)
    fs.writeFileSync("person.csv",a1)

    console.log("done")
    return dd1
}

get_person=(uri)=>{

//http://www.ccg.org.cn/About/intro.aspx?ClassId=53
//http://www.ccg.org.cn/About/intro.aspx?ClassId=55
// [...a.querySelectorAll('p')].map(x=>x.innerText).filter(x=>x.length>-1 && x!="\n").slice(1).join('\n'
//b=a.filter(x=>x.length>10).map(x=>({name:x.split('，')[0].replace("\n",""),desc:x,url:"http://www.ccg.org.cn/About/intro.aspx?ClassId=55"}))

//http://www.ccg.org.cn/Expert/Default.aspx

}




//start()
