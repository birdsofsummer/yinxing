## doc

[mdn](https://developer.mozilla.org/en-US/docs/WebAssembly/rust_to_wasm "")
[wasm-bindgen](https://github.com/rustwasm/wasm-bindgen "")


## compile

```bash

cargo install wasm-pack
cargo new --lib hello-wasm

build_pub(){
    name=birdsofsummer
    npm adduser $name
    wasm-pack build --scope $name
    cd pkg
    npm publish --access=public
}

build_local(){
    wasm-pack build 
}

```


## package.json

+ remote

    
```json
{
  "dependencies": {
    "@birdsofsummer/hello-wasm": "^0.1.0"
  }
}

```


+ local

```json
{
  "dependencies": {
      "hello-wasm":"file:./pkg/hello_wasm"
  }
}

```

## run
```bash

npm install
npm run serve

```



## mime

/etc/nginx/mime.types
```
application/wasm                      wasm;
```
```bash
nginx -s reload
```
