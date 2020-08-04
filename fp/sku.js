const cross_join=(arr=[])=>{
//    let f=(a,b)=>a.map(aa=>(b.map(bb=>[aa,bb].flat()))).flat()
    let f1=(acc=[[]],b)=>(acc.map(aa=>b.map(bb=>[...aa,bb]))).flat()
    let ff=(a=[])=>a.reduce(f1,[[]])
    return ff(arr)
}

const cross_join1=(arr=[])=>{
    let f1=(acc=[["",]],b)=>(acc.map(([first,...rest],i)=>b.map((bb,j)=>[ first ? first+"_"+j : `${j}`,...rest,bb]))).flat()
    let ff=(a=[])=>a.reduce(f1,[["",]])
    return ff(arr)
}
const addkeys=arr=>kk=>arr.reduce((acc,v,i)=>(acc[kk[i]]=v,acc),{})
const addkeys1=arr=>kk=>arr.reduce((acc,v,i)=>(acc[i]={ ...addkeys(v)(kk),i},acc),{})

test=()=>{
    a=[1,2,3]
    b=[-1,-2,-3]
    c=[1,2,3]
    d=[a,b,c]
    let e=cross_join1(d)
    kk=['id',"color","size","cc"]
    z=addkeys1(e)(kk)
    console.log(z)
}

//test();


module.exports={
    cross_join,
    cross_join1,
}

const cs=(n=1)=>(a=[])=>(b=[])=>Array(n).fill(0).map((v)=>a.map((k,i)=>b.map((bb,j)=>[i,j,0])).flat())
const cs1=(n=1)=>(a=[])=>(b=[])=>Array(n).fill(0).map((v,nn)=>a.map((k,i)=>b.map((bb,j)=>[nn,i,j,0])).flat()).flat()

const cross_join2=(n=1)=>(a=[])=>(b=[])=>Array(n).fill(0).map((nn)=>a.map((k,i)=>b.map((bb,j)=>[[nn,i,j].join('_'),k,bb,false])).flat().reduce((acc,[index,color,size,checked])=>({...acc,[index]:{color,size,checked,index}}),{}))

const cross_join2_d=(pack=[])=>pack.map(x=>Object.entries(x).filter(([k,v])=>v.checked==true)).flat().map(x=>x[1])
const reset_pack_row=(x,i)=>Object.entries(x).forEach(([k,v])=>x[k].checked=k=="0_0_0"?true:false)
const reset_pack=(pack=[])=>pack.forEach(reset_pack_row)
const init_pack_row=x=>Object.entries(x).forEach(([k,v])=>x[k].checked=false)
const init_pack=(pack=[])=>(row=0)=>init_pack_row(pack[row])

const set_pack=(pack=[])=>(n,...i)=>{
    init_pack(pack)(n)
    pack[n][i.join("_")].checked = true
}



/*
py

from functools import reduce
cross_join=lambda z:reduce(lambda x,y: [ a+[b] for a in x for b in y],z,[[]])


hs
cross_join=foldr (\x y->[a:b|a<-x,b<-y])  [[]]

*/


