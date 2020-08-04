//https://developer.mozilla.org/en-US/docs/WebAssembly/rust_to_wasm
//https://github.com/rustwasm/wasm-bindgen

extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}


#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}


#[wasm_bindgen]
pub fn add(x:i32,y:i32) -> i32{
    console_log!("aaaaaaaaaaaa");
    x+y
}



/*
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
*/
