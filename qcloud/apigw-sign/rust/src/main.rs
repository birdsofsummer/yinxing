// https://sign-1252957949.cos.ap-guangzhou.myqcloud.com/index.html
use std::string::*;
extern crate chrono;
use chrono::prelude::*;
use std::io::{stdout, Write};
use std::io::Read;
use curl::easy::{Easy, List};

fn utc_now() -> String{
    Utc::now().format("%a, %d %h %Y %H:%M:%S GMT").to_string()
}

fn sha1(a: &str, b: &str) -> std::string::String{
   let c=hmacsha1::hmac_sha1(a.as_bytes(),b.as_bytes());
   let d=base64::encode(&c);
   d
}

fn lower(a : &str)-> String{
    let mut s = String::from(a);
    s.make_ascii_lowercase();
    s
}
// https://doc.rust-lang.org/std/primitive.slice.html#method.join
fn  join(sep: &str,kk1:&std::vec::Vec<&str>)->String{
    let kk2=kk1.join(sep);
    kk2
}

fn sign <'a>(SECRETID: &str,SECRETKEY: &str,h :&Vec<(&str,&str)>) ->String{

    let h1:Vec<_>=h.iter()
            .map(|&(k,v)|{
                 (lower(k),v)
            })
            .collect();
    //println!("{:?}",h1);

    let h2:Vec<_> =h1.iter()
        .map(|(k,v)|{
            [k.to_string(),v.to_string()].join(": ")
        })
        .collect();

    let signstr=h2.join("\n");
    let signature=sha1(SECRETKEY,signstr.as_str());

    //println!("{:?}",signstr);
    //println!("{:?}",signature);

    let kk : Vec<&str>=h1
    .iter()
    .map(|(k,_v)|{
        k.as_str()
    })
    .collect();

    let kk1=join(" ",&kk);
    //println!("{:?}",kk1);

    let au=vec![
           ("hmac id" , SECRETID),
           ("algorithm" , "hmac-sha1"),
           ("headers"  , kk1.as_str()),
           ("signature" ,signature.as_str()),
    ];
    //println!("{:?}",&au);
    let au1:Vec<_>=au.iter()
        .map(|&(k,v)|{
            let s="\"".to_string();
            let s1="\"".to_string();
            let v1=[s,v.to_string(),s1].join("");
            [k.to_string(),v1].join("=")
        })
        .collect();
    au1.join(", ")
}


fn post(h :&Vec<(&str,&str)>,u: &str,d: &str) {
   // println!("{:?}",u);
   // println!("{:?}",h);
   // println!("{:?}",d);
    let mut data = d.as_bytes();
    let mut easy = Easy::new();
    easy.url(u).unwrap();

    let mut list = List::new();
    for (k,v) in h{
        let kk=[k.to_string(),v.to_string()];
        let z=kk.join(": ");
        list.append(&z); //.unwrap();
    }
    easy.http_headers(list).unwrap();

    easy.post(true).unwrap();
    easy.post_field_size(data.len() as u64).unwrap();

    let mut transfer = easy.transfer();

    transfer.read_function(|buf| {
        //stdout().write_all(buf).unwrap();
        Ok(data.read(buf).unwrap_or(0))
    }).unwrap();

    transfer.write_function(|b| {
        stdout().write_all(b).unwrap();
        Ok(b.len())
    }).unwrap();

    transfer.perform().unwrap();

//    match r {
//        Ok(x) => println!("{:?}", x),
//        Err(_x)=> println!("..."),
//    }        
}

fn get(h :&Vec<(&str,&str)>,u: &str,d: &str) {
   // println!("{:?}",u);
   // println!("{:?}",h);
   // println!("{:?}",d);
    let mut data = d.as_bytes();
    let mut easy = Easy::new();
    easy.url(u).unwrap();
    let mut list = List::new();
    for (k,v) in h{
        let kk=[k.to_string(),v.to_string()];
        let z=kk.join(": ");
        list.append(&z); //.unwrap();
    }
    easy.http_headers(list).unwrap();
    easy.write_function(|data| {
        stdout().write_all(data).unwrap();
        Ok(data.len())
    }).unwrap();
    easy.perform().unwrap();
    println!("{}", easy.response_code().unwrap());
}




fn test(){
    let SERVER="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec";
    let SERVER1="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/";
    let SOURCE="ccc";
    let SECRETID="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD";
    let SECRETKEY="k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX";
    //let EXP=15 *60;
    let t=utc_now();
    let mut h=vec![
        ("Source" , "ccc"),
        ("X-Token" , "123"),
        ("X-ZZZ" , "123"),
        ("X-Date" , &t), //"Thu, 20 Feb 2020 15:36:53 GMT"
    ];
    let a=sign(SECRETID,SECRETKEY,&h);
    h.push(("Authorization",&a));
    let d="ccc";
    //get(&h,SERVER,d);
    post(&h,SERVER,d);
}

fn main(){
   test();
}
