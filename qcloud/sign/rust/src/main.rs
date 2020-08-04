//extern crate js_sys;
extern crate url;
use url::form_urlencoded;

extern crate chrono;
use chrono::prelude::*;

extern crate rand;
use rand::Rng;

use curl::easy::{Easy, List};

use std::string::*;
use std::collections::*;
use std::collections::HashMap;
use std::io::{stdout, Write};
use std::io::Read;
use std::env;
//use std::ffi::OsStr;

//https://doc.rust-lang.org/std/vec/struct.Vec.html


fn lower(a : &str)-> String{
    let mut s = String::from(a);
    s.make_ascii_lowercase();
    s
}

fn upper(a : &str)-> String{
    let mut s = String::from(a);
    s.make_ascii_uppercase();
    s
}

fn sha1(a: &str, b: &str) -> std::string::String{
   let c=hmacsha1::hmac_sha1(a.as_bytes(),b.as_bytes());
   let d=base64::encode(&c);
   d
}


fn random()-> String{
    let mut r=rand::thread_rng();
    let a=r.gen_range(10_000,100_000);
    format!("{}",a)
}

fn utc_now() -> String{
    Utc::now().format("%a, %d %h %Y %H:%M:%S GMT").to_string()
}

fn timestamp()-> String{

    let t=Utc::now();
    let ms=t.timestamp_millis();
    let s=ms/1000;
    let s1=format!("{}",s);
   //println!("{:?}", chrono::offset::Local::now());
   //println!("{:?}", chrono::offset::Utc::now());
   //println!("{:?}", t.timestamp_nanos());
   //println!("{:?}", t.timestamp_subsec_millis());
   //println!("{:?}", t.timestamp_subsec_micros());
   //println!("{:?}", t.timestamp_subsec_nanos());
   //Utc::now().format("%a, %d %h %Y %H:%M:%S GMT").to_string()
    s1
}


fn sign <'a> (params: Vec<(&str, &str)>,config :&HashMap<&str,&str>) ->  String{
    let protocol="https:";

    let secret_id=config["secret_id"];
    let secret_key=config["secret_key"];
    let region=config["region"]; //"ap-guangzhou";
    let module=config["module"];

    let http_method="GET"; //"POST"
    let host=".api.qcloud.com/v2/index.php";
    //let sign_method="HmacSHA256";
    let sign_method="HmacSHA1";
    let version="v2";

    let r=random();
    let t=timestamp();

    let d=vec![
               ("Action",""),
               ("Region", region),
               ("SecretId", secret_id),
               ("SignatureMethod", sign_method),
               ("Nonce", &r ),
               ("Timestamp",&t),
              //("Token",""),
    ];

    let mut ad:Vec<(&str,&str)> =Vec::new();
    for (k,v) in d{
        let z=(k,v);
        ad.push(z); 
    }
    for (k,v) in params{
        let z=(k,v);
        ad.push(z); 
    }

    let mut mix:HashMap<&str,&str> = HashMap::new();

    for (k,v) in &ad{
        mix.insert(k,v);
    }

    let mut mix1: Vec<(&str, &str)> = mix
        .into_iter()
        .collect();
    mix1.sort();

    let mix1_s:Vec<_>=mix1.iter()
        .map(|&(k,v)|{
            [k.to_string(),v.to_string()].join("=")
        })
        .collect();

    let s=mix1_s.join("&");

    let s1=vec![ 
        http_method,
        module,
        host,
        "?",
        s.as_str(),
    ];
    let s2=s1.join("");

    let signature=sha1(secret_key,&s2);

    //println!("{:?}",s2);
    //println!("{:?}",signature);

    mix1.push(("Signature",&signature));
    //println!("{:?}",mix1);

    let mut qs=form_urlencoded::Serializer::new(String::new());
    for (k,v) in mix1{
        qs.append_pair(k,v);
    }
    let qs1=qs.finish();

    let u=vec![
        protocol,
        "//",
        module,
        host,
        "?",
        &qs1,
    ].join("");
   // println!("{:?}",js_sys::encode_uri(&u));
    u
}

fn get(h :&Vec<(&str,&str)>,u: &str) {
   // println!("{:?}",u);
   // println!("{:?}",h);
   // println!("{:?}",d);
 //   let mut data = d.as_bytes();
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
    //println!("{}", easy.response_code().unwrap());
}


fn test(){

    let t=utc_now();
    let mut h=vec![
        ("Source" , "ccc"),
        ("X-Token" , "123"),
        ("X-ZZZ" , "123"),
        ("X-Date" , &t), //"Thu, 20 Feb 2020 15:36:53 GMT"
    ];

    let a=vec![
        ("Region","ap-guangzhou"),
        ("Action","describeapikeysstatus"),
        ("offset","0"),
        ("limit","2"),
        ("orderby","createdtime"),
        ("order","desc"),
     ];
    let b=vec![
        ("Action","DescribeApiKeysStatus"),
    ];

    let mut config:HashMap<&str,&str> = HashMap::new();
    let sid=env::var("SecretId").unwrap();
    let skey=env::var("SecretKey").unwrap();
    let region=env::var("Region").unwrap();
    let module="apigateway";
    config.insert("secret_id",&sid);
    config.insert("secret_key",&skey);
    config.insert("region",&region);
    config.insert("module",module);


    let u1=sign(a,&config);
    let u2=sign(b,&config);
    //println!("{:?}",u);

    get(&h,&u1);

    get(&h,&u2);
}


fn main(){
    test();
}
