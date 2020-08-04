const js = import("./node_modules/@birdsofsummer/hello-wasm/hello_wasm.js");
//  const js = import("./pkg/hello_wasm.js");
js.then(js => {
        js.greet("WebAssembly");
});

