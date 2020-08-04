//https://www.npmjs.com/package/ylru
//
const LRU = require('ylru');

test=()=>{
    const lru = new LRU(100);
    k="kk"
    v="vv"
    lru.set(k,v);
    lru.get(k);
    lru.keys()
    lru.set(k, v, { maxAge: 2000 });
    lru.get(k, { maxAge: 2000 });
    lru.keys()
}

