u=require("utility")
R=require('ramda')
Mustache=require("mustache")
ejs = require('ejs')

read = require('fs').readFileSync
write = require('fs').writeFileSync


join = require('path').join;
str = (name="./weibo.ejs")=>read(name, 'utf8');




format=(d=[])=>(d.map(x=>x.data.cards)
       .flat()
       .filter(x=>x.mblog)
       .map(x=>x.mblog.text)
       .join("\n\n"))

format1=(d=[])=>(d.map(x=>x.data.cards)
       .flat()
       .filter(x=>x.mblog)
       .map(x=>[x.mblog["created_at"]||"",x.mblog.text ].join("   "))
       .join("\n\n"))

init=async (file1,file2)=>{
    d=await u.readJSON(file1)
    t=format(d)
    fs.writeFileSync(file2,t)
}

//init()

//--------------------------------------------------------------------------------
/*
  card_type:31|itemid|scheme|desc

  card_type:9|card_type_name|itemid|scheme|mblog|show_type|title

  card_type:11|show_type|card_group
  { card_type: 11, show_type: 0, card_group: [] }

  藏起来了
  card_type:58|itemid|name|scheme
  { card_type: 58, itemid: '', name: '暂无微博', scheme: '' }

*/

json2txt=(d=[])=>d.filter(x=>x.mblog).map(x=>[,  x.mblog?.created_at ?? "", "https://m.weibo.cn/detail/"+x.mblog?.idstr, x.mblog?.text ?? "", x.mblog?.pic_num ? x.mblog.pics.map(x=>x.url).join('\n') :"" ,x.mblog?.retweeted_status?.text ?? "", ].join("\n")).join("\n\n")


filter_txt=(d=[],list=[])=>{
    let z=d
         .filter(x=>x.mblog)
         .filter(x=>list.includes(x.mblog.idstr))
    let t=json2txt(z)
    return t
}


/*
mkdir -p /tmp/c
wget -i pics.txt -P /tmp/c/
*/

json2pic=(d=[])=>{
    let pics=d.filter(x=>x.mblog)
        .map(x=>x.mblog.pic_num ? x.mblog.pics:[]).flat()
        .map(x=>x.large.url).join('\n')
    fs.writeFileSync("pics.txt",pics)
    return pics
}


/*
l=[
  "5282882479",
]
 */

convert_json=(d=[],l=[],file_name="xxx")=>{
    let t=json2txt(d)
    let t1=filter_txt(d,l)

    let n1=file_name+".txt"
    let n2=file_name+"-1.txt"

    fs.writeFileSync(n1,t)
    fs.writeFileSync(n2,t1)

    console.log(n1)
    console.log(n2)
}


show_invalid=(blog=[])=>{
    re=/此微博已不可见|此微博已被作者删除|该账号因被投诉违反/
    del=blog.filter(x=>re.test(x.mblog?.retweeted_status?.text))
        //.map(x=>x.mblog?.retweeted_status?.text)
    a=del.length
    b=blog.length
    percent=(100*a/b).toFixed(2)
    console.log("%d/%d,%d\%",a,b,percent)
    return del
}


render=(d=[],n1="/tmp/1.txt",t="./weibo.mustache")=>{
    blog=d.filter(x=>x.mblog)
    pics=blog.map(x=>x.mblog.pic_num ? x.mblog.pics:[]).flat().map(x=>x.large.url)
    d1={
        data:blog,
        photo:pics,
    }
    template=fs.readFileSync(t).toString()
    t1 = Mustache.render(template, d1);
    fs.writeFileSync(n1,t1)
    console.log(n1)
}




render1=()=>{
        var f=ejs.compile(str())
        d={
          names: ['foo', 'bar', 'baz'],
          data:{ddd:"<>123"},
        }
        t=f(d)
        n="/tmp/1.txt"
        write(n,t)
        console.log(n,t)
}
