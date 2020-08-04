const text2dom=d=>{
        let div=document.createElement('div')
        div.innerHTML=d
        return div
    }
const find=(o)=>(x)=>o.querySelector(x)
const find_cb=(o)=>([x,cb])=>o.querySelector(x) ? cb(o.querySelector(x)) :null
const find_all=(o)=>(x)=>[...o.querySelectorAll(x)]
const finds_cb=(o)=>([x,cb])=>find_all(o)(x) ? map(cb)(find_all(o)(x)) :null
const find1=(d="")=>q=>{
        let dom=text2dom(d)
        return find(dom)(q)
    }
const find2=(d="")=>q=>{
        let dom=text2dom(d)
        return find_all(dom)(q)
    }
const html2text=(t)=>text2dom(t).innerText.trim()
const text=x=>x.innerText ? x.innerText.trim(): ""
const html=x=>x.innerHTML? x.innerHTML :""
const //attr=k=>x=>x.attributes[k]
const attr=k=>x=>x[k]
const dataset1=x=>m2o(x.dataset)
const dataset2=k=>x=>x.dataset[k]
const child=c=>[...c.childNodes].map(x=>x.data).filter(x=>x)
const child1=c=>[...c.childNodes].map(text).filter(x=>x)
const link=attr('href')
const src=attr('src')



export {
    attr,
    //attr,
    child,
    child1,
    dataset1,
    dataset2,
    find,
    find1,
    find2,
    find_all,
    find_cb,
    finds_cb,
    html,
    html2text,
    link,
    src,
    text,
    text2dom,
}
