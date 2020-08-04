
//http://www.hbsredcross.org.cn/jzxxgs/index.jhtml
//仁道榜
//有重复


today=(o=document)=>{
    d=[...o.querySelectorAll('ul.infoList li')]
        .map(x=>[...x.children].map(x=>x.title||x.innerText))
        .filter(([a,b])=>!/如何查阅/.test(a))
        .map(([a,b])=>[...a.replace('元','').split('捐款'),b])
        .filter(([a,b,c])=>+b)
        .map(([a,b,c])=>[a,+b,c])
    d.sort((b,a)=>a[1]-b[1])
    return d
}

now=()=> new Date().toString()
calc=(d=[])=>({
        sum:d.reduce((a,b)=>a+b,0),
        n:d.length,
        max:Math.max(...d),
        min:Math.min(...d),
})
today=(o=document)=>{
    d=[...o.querySelectorAll('ul.infoList li')]
        .map(x=>{
            let c=[...x.children]
            let {title,href}=c[0]
            let date=c[1].innerText
            let [who,money]=title.replace('元','').split('捐款')
            return { title, date, href,who,money:+money}
        })
        .filter(({title, date, href,who,money})=>(!/如何查阅/.test(title)) && (money>0))
        .sort((b,a)=>a['money']-b['money'])
    let d1=new Map(d.map(x=>[x.href,x]))
    let d2= [...d1.values()]
    let money=d2.map(x=>x.money)
    let summery={
        name:"湖北省红十字会仁道榜",
        url:"http://www.hbsredcross.org.cn/jzxxgs/index.jhtml",
        update_time:now(),
        ...calc(money),
    }
    console.log(summery)
    return {summery,data:d2,}
}
copy(JSON.stringify(today(),null,'\t'))

// 首页 捐赠信息公示
// url 时而升序 时而降序
// 。。。
get_history=(o=document)=>[...o.querySelectorAll('.right_nei ul li a')]
        .map(x=>({
            title:x.title.replace('元',''),
            date:x.children[1].innerText,
            href:x.href,
        }))


get_history1=(html="")=>{
    let s=document.createElement('section')
    s.innerHTML=html
    return get_history(s)
}


sum=(d=[])=>d.map(x=>x[1]).reduce((a,b)=>a+b,0)

start=async ()=>{
    let htmls=await readAll()
    let d=htmls.map(x=>x.data)
    let r=d.map(get_history1).flat()
    return r
}


download=async ()=>{
    let d=await readAll()
    let d1=JSON.stringify(d, null, '\t')
    //var blob = new Blob([d1], {type : 'application/json'});
    var blob = new Blob([d1], {type: 'application/octet-stream'})
    //buf=await blob.arrayBuffer()
    //t=await (new Response(blob)).text();
    var url = URL.createObjectURL(blob);
    let a=document.createElement('a')
    a.id="download"
    a.innerText="download"
    a.href=url
    a.download="html.json"
    //a.href='javascript:alert(123);'
    document.body.prepend(a)
    a.click()
}

//copy(JSON.stringify(d,null,'\t'))
