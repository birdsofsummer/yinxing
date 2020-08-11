const repeat1=(fn,x,n=1)=> n==0 ? x : repeat1(fn,fn(x),n-1)
const drop=(t=[],s)=>[...t.slice(0,s),...t.slice(s+1,t.length)]

const select=([h,...t])=> {
    if (h == undefined) return []
    let small=t.findIndex(x=>x<h)
    if (small==-1) {
        return [h,...select(t)]
    }else{
        let s=t[small]
        let rest=[h,...t.filter((x,i)=>i!=small)]
        //let rest=[h,...t.filter(x=>x!=s)]
        //let rest=[h,...drop(t,small)]
        return [s,...select(rest)]
    }
}
const select_sort=(d=[])=>repeat1(select,d,d.length)

const test=()=>{
    a=[5,4,3,2,2,1]
    select_sort(a)
}

module.exports={
    select_sort,
}
