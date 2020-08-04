//https://openresearch-repository.anu.edu.au/handle/1885/7575
//https://openresearch-repository.anu.edu.au/handle/1885/43932
//https://openresearch-repository.anu.edu.au/handle/1885/43932?mode=full
//https://openresearch-repository.anu.edu.au/bitstream/1885/43932/4/4474542272002_1775011.pdf



const R=require("ramda")
const superagent=require("superagent")
const cheerio=require("cheerio")
const utility=require("utility/")

const H={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0",
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "referrer": "https://openresearch-repository.anu.edu.au/handle/1885/43932",
}

let HOST="https://openresearch-repository.anu.edu.au"

const parse_table=(t)=>{
    let r={}
    let tr=t.find("tr")
    for (i=0;i<tr.length;i++){
        let tt=tr.eq(i)
        let k=tt.find("th").text().trim()
        let v=tt.find('td').text().trim()
        r[k]=v
    }
    return r
}

const parse_table1=(t)=>{
    let r={}
    let tr=t.find("tr")
    let t0=tr.eq(0).find("th")
    for (i=1;i<tr.length;i++){
        let tt=tr.eq(i)
        let tds=tt.find("td")
        for (j=0;j<tds.length;j++){
                let k=t0.eq(j).text().trim()
                let v=tds.eq(j).text().trim()
                r[k]=v
        }
    }
    let file=t.find('td a').attr("href") || ""
    r["pdf"]=HOST+file
    return r
}

const parse_detail=(t)=>{
    let $=cheerio.load(t)
    let d1=parse_table($('table').eq(0))
    let d2=parse_table1($('table').eq(1))
  return {...d1,...d2}
}

//43707 - 44473 / 8171-8175
const get_detail=async (id="43932")=>{
    let u = "https://openresearch-repository.anu.edu.au/handle/1885/" + id +"?mode=full"
    let r=await superagent.get(u).set(H)
    let t=r.text
    let d=parse_detail(t)
    console.log(id,"done!")
    return d
}


//43707 - 44473 / 8171-8175
const get_detail1=async (u="")=>{
    let r=await superagent.get(u).set(H)
    let t=r.text
    let d=parse_detail(t)
    console.log(u,"done!")
    return d
}



/*
{
  url: '/handle/1885/8175',
  title: '1958 年北戴河会议',
  'Author(s)': '韩钢',
  Type: 'Manuscript',
  'Date Published': '29-Jul-2011',
  'Date Created': '1956-19599?'
}
*/

const parse_list=(t="")=>{
    let $=cheerio.load(t)
    let c1=$("div.container:nth-child(2) > div")
    let r1=[]
    for (let i=0;i<c1.length;i++){
        let o=c1.eq(i).find("h3.nopadtop a.nounderline")
        if (o && o.attr("href")){
            let r={}
            r["url"]=o.attr("href")
            r["title"]=o.text().trim()
            let tr=c1.eq(i).find("table.fullwidth tr")
            //console.log(i,tr.length)
             if (tr.length){
                 for (let j=0;j<tr.length;j++){
                     let row=tr.eq(j)
                     let k=row.find("th").text()
                     let v=row.find("td").text()
                     r[k]=v
                 }
             }
            r1.push(r)
        }
    }
    return r1
}


// 0 - 454 step 20
//https://openresearch-repository.anu.edu.au/handle/1885/7575??offset=20
const start=async (from=0,to=454,id1=7575)=>{
    list=[]
    for (let i=from;i<=to;i+=20){
       let u="https://openresearch-repository.anu.edu.au/handle/1885/"+id1+"?offset=" + i //...
       console.log(i,u)
       let t=await superagent.get(u).set(H)
       let r=await parse_list(t.text)
       list.push(...r)
    }
    console.log("list done")
    let l=R.uniqBy(x=>x.url,list)
    await utility.writeJSON("json/list.json",l)
    return l
    //let r1=await get_details(list)
    //return r1
}

const get_details=async (list=[])=>{
    for (let j=0;j<list.length;j++){
        let z=list[j]
        let {url,title}=z
        let u1=HOST+url+"?mode=full"
        console.log(j,list.length,u1,title)
        try{
            let detail=await get_detail1(u1)
            list1.push({...z,detail})
            console.log(title,"done")
        }catch(e){
            fail.push(j)
            console.log(e)
            console.log(j,title,"fail")
        }
    }
    await utility.writeJSON("json/list1.json",list1)
    console.log(list.length,'detail done')
    return list1
}

const start1=async ()=>{
   globalThis.fail=[]
   globalThis.list1=[]
   list=await utility.readJSON('./json/list.json')
   await get_details(list)
   console.log("ok")
}

const to_csv=async (name="dao")=>{
   file='./json/'+name+'.json'
   list=await utility.readJSON(file)
   let l=R.map(({detail,...a})=>({...a,...detail}))(list)
   let title=R.keys(l[0])
   let h=title.map(x=>`"${x}"`).join(",")
   let t=R.pipe(R.map(R.pipe(
       //R.values,
       R.props(title),
       R.map(x=>`"${x}"`),
       R.join(","))),R.join("\n"))(l)
   let c=[h,t].join("\n")
   fs.writeFileSync("./json/"+name+".csv",c)
}

/*
https://openresearch-repository.anu.edu.au/handle/1885/18
Communities & Collections
index=()=>{
    let f=x=>[x.querySelector('a').href,x.querySelector('a').innerText,+[...x.childNodes].slice(-1)[0].nodeValue.match(/.*\[(\d+)\].*/)[1]]
    let d=[...document.querySelector("ul.linklist").querySelectorAll('li')].map(f)
    return d
}

*/



get_all=async()=>{
    let todo=[
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/10436",
		"Aboriginal Linguistics 1 / edited by Nicholas Evans & Steve Johnson. Armidale, NSW : University of New England, Dept. of Linguistics, 1988.",
		9
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/170588",
		"A Voz de Timor",
		13
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/7575",
		"Chinese Digital Archive 1966-1976",
		454
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/9199",
		"Chinese Rare Books",
		446
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/109780",
		"Colour a collection",
		5
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/104830",
		"Digitised publications",
		43
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/9179",
		"Drawings of Bun Heang Ung",
		92
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/145340",
		"George E. Morrison Lectures in Ethnology",
		70
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/20",
		"Giles Family Albums",
		445
	],
	[
		"https://openresearch-repository.anu.edu.au/handle/1885/155474",
		"Niugini Caver: Newsletter of the Papua New Guinea Cave Exploration Group (1973-1982)",
		28
	]
]




//...

}


