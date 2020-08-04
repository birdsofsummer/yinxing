const js = import("./pkg/hello_wasm.js");
js.then(js => {
    console.log(js)
    js.greet("WebAssembly");
});

