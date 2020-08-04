const js = import("./pkg/rust_wasm");
js.then(js => {
    console.log(js)
    globalThis.a=js
    //js.greet("WebAssembly");
});

