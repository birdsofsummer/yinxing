// https://github.com/pantsman0/rust-hmac-sha1
// https://stackoverflow.com/questions/54619582/hmac-sha1-in-rust
//extern crate base64;


fn sha1(a: &str, b: &str) -> std::string::String{
   let c=hmacsha1::hmac_sha1(a.as_bytes(),b.as_bytes());
   let d=base64::encode(&c);
   d
}

fn test(){
   let r="LBxi4Eilgk37PtaY7475b1GFo2k=".to_string();
   let a="x";
   let b="y";
   let d=sha1(a,b);
   println!("{}",d);
   assert_eq!(d,r);
}


