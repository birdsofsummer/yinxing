// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor

const {
    assign,
    entries,
    keys,
    values,
    fromEntries,
    defineProperty,
    getOwnPropertyDescriptor,
}=Object

const R=require('ramda')

const  verify=(validators={})=>(k="",v="")=>{
    if (!k) return false
    let p=validators[k] || [];
    return R.allPass(p)(v)
}

const ValidateFactory=(i={},u={},validators={})=>{
    let z="test1"
    let s=Symbol.for('test2')
    const is_ok=verify(validators)
    const set_key=(o={},k,v)=>{
            if (is_ok(k,v)){
                o[k]=v
                return true;
            }else{
                throw [k,v]
                return false
            }
    }
    const set_keys=(o={},d={})=>entries(d).forEach(([k,v])=>set_key(o,k,v))
    let x0={...u}
    let x=new Proxy(x0,{
        get:(o,k)=>{
            return o[k]||""
        },
        set:(o,k,v)=>{
            return set_key(o,k,v)
        }
    })
    set_keys(x,i)
    return {
        data:x,
        get(k="name"){
            let o=Object.getOwnPropertyDescriptor(x,k)
            return o ? o.value : ""
        },
        remove(k="name"){
           Object.defineProperty(x, k, {
                  value: "",
                  writable: true, //...
                  enumerable: false,
            });
            return x
        },
        of(d={}){
             set_keys(x,d)
        },
        update(k="name",v="vv"){
            return set_key(x,k,v)
           // Object.defineProperty(x, k, {
           //       value: v,
           //       writable: true, //...
           //       enumerable: true,
           // });
        },
        *[Symbol.iterator]() {
             for (let k of Object.keys(x)){
                 yield [k,x[k]];
             }
        },
        get keys(){return Object.keys(x)},
        get length(){return Object.keys(x).length},
        has(k){return (new Set(Object.keys(x))).has(k)},
        map(f){
           return entries(x).map(f)
        },
        clone(){
            return fromEntries(entries(x))
        },
        serial(){
            return entries(x).map(([k,v])=>[k,v].join("=")).join('&')
        },
        unserial(d=""){
            return d=="" ? {} :fromEntries(d.split('&').map(x=>x.split('=')))
        },
        toString(){
            return this.serial()
        },
        json(){
            return {...x}
        },
        json_s(){
            return JSON.stringify(x)
        },
        [z]:1,
        [s]: 73,
    }
}

module.exports={
    ValidateFactory,
}


