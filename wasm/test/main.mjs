//https://dev.to/sendilkumarn/loading-wasm-as-esm-in-nodejs-2gdb
import assert from 'assert';
import {methodCalled, add} from './add.mjs';
import * as M from './add.wasm';
//import * as M from './hello.wasm';
console.log(M.add(10, 13)); // 23

//assert(methodCalled, 0); 
//assert(add(13, 31), 44);
//assert(methodCalled, 1);

console.log(add(1,20))
