// n=2
// fn(fn(x))
const repeat=(fn,x,n=1)=>{
    let r=x
    for (let i=0;i<n;i++){
        r=fn(r)
    }
    return r
}
const repeat1=(fn,x,n=1)=> n==0 ? x : repeat1(fn,fn(x),n-1)



//一轮冒泡
const sort=(d=[])=>{
    if (d.length<2) {
        return d
    }
    if (d.length>=2) {
        let [h1,h2,...t]=d
        if (h1>h2) {
            return [h2,...sort([h1,...t])]
        }
        return [h1,...sort([h2,...t])]
    }
}
const sort1=(d=[])=>repeat(sort,d,d.length)

const test=()=>{
    a=[5,4,3,2,1]
    sort1(a)
    sort1([])
    sort1([1,2])
    sort1([2,1])

    b=[...Math.random().toString().slice(2)].map(x=>+x)
    sort1(b)
}


module.export={
    sort,
    sort1,
    repeat1,
    repeat,
}
