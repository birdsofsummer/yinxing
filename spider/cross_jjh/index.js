to_int=( a="2,000.00")=> Number(a.replace(/[,]/ig,''))

to_o=(r="")=> {
    let s=document.createElement('div')
    s.innerHTML=r
    return s
}

now=()=> new Date().toString()
calc=(d=[])=>({
        sum:d.reduce((a,b)=>a+b,0),
        n:d.length,
        max:Math.max(...d),
        min:Math.min(...d),
})

clean=(x="`2020-02-02 10:43:40")=>x.replace(/[`]/i,'').replace(/\s+/,' ').trim()
parse_table=(o=document)=>{
    let [h,...t]=[...o.querySelectorAll('table tr')]
    .map(x=>[...x.children]
    .map(y=>y.innerText.trim()))
    let t1=t.map((x,i)=>x.map((y,j)=>[h[j],y]))
        .map(Object.fromEntries)
        .map(x=>({
            ...x,
            日期:clean(x["日期"]),
            捐赠金额:to_int(x["捐赠金额"]),
            money:x["捐赠金额"],
        }))
    return t1
}

// http://www.hbsrcf.org.cn/contents/24/451.html
parse_detail=(o=document)=>{
    let title=o.querySelector('.news_title_con h2').innerText
    let pub_date=o.querySelector('.news_title_con_p01 span').innerText
    let data=parse_table(o)
    return data.map(x=>({...x,title,pub_date}))
}

// http://www.hbsrcf.org.cn/channels/24.html
parse_list=(o=document)=> [...o.querySelectorAll('.projectConent a')]
    .map(({href,innerText:title})=>({href,title}))
    .filter(x=>/收入公/.test(x.title))



get=(u="/")=>fetch(u).then(x=>x.text())

get_page=(page=1)=>{
    let q= {
        "type": "news",
        "channel": "24",
        "search": "",
        "page": page,
    }

    let u="/NList.aspx??" + new URLSearchParams(q)
    return get(u)
}

get_list=async (from=1,to=3)=>{
    let l=[]
    for (i=from;i<to;i++){
        console.log(i)
        let r=await get_page(i)
        l.push(parse_list((to_o(r))))
    }
    console.log('done')
    return l.flat()
}



get_detail=async (l=[])=>{
  let o=[]
  for (let {href,title} of l){
      console.log(title)
      console.log(href)
      let r=await get(href)
      o.push(r)
  }
  console.log('done')
  return o
}

get_summery=(money=[])=>({
    name:"湖北省红十字基金会",
    url:"http://www.hbsrcf.org.cn/channels/24.html",
    update_time:now(),
    ...calc(money),
})

format_data=(d=[])=>{
      let d1=d.map(to_o).map(parse_detail).flat()

      let dd=d1.filter(x=>!Number(x["捐赠金额"]))
      console.log(dd)

      let money=d1
              .map(x=>x["捐赠金额"])
              .filter(x=>x)
      let summery=get_summery(money)
      console.log(summery)
      let d2={
          summery,
          data:d1
      }
      console.log('done')
      return d2
}

start=async (from=1,to=3)=>{
      let l=await get_list(from,to)
      let d=await get_detail(l)
      let r=format_data(d)
      return r
}
