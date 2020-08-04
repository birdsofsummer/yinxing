//https://github.com/http-rs/surf/blob/master/src/response.rs
//https://docs.rs/headers/0.3.2/headers/struct.Cookie.html
//https://github.com/http-rs/surf/blob/master/src/request.rs
//https://rust-lang.github.io/async-book/01_getting_started/04_async_await_primer.html
//https://docs.rs/cookie/0.13.3/cookie/struct.CookieJar.html

use std::process;
use std::env;
use std::fs;
use std::fs::File;
use std::error::Error;
use std::io::prelude::*;
use std::path::Path;
use std::io;
use std::io::prelude::*;
use std::io::BufReader;
use bytes::Bytes;



//extern crate url;
//use url::form_urlencoded;
use async_std::task;
use futures::future::BoxFuture;
use surf::middleware::{HttpClient, Middleware, Next, Request, Response};
use surf::mime;
//use serde::{Deserialize, Serialize};
use serde_derive::{Serialize, Deserialize};
use headers::{Cookie, HeaderMap, HeaderMapExt, HeaderValue};

struct Printer;

impl<C: HttpClient> Middleware<C> for Printer {
    fn handle<'a>(
        &'a self,
        req: Request,
        client: C,
        next: Next<'a, C>,
    ) -> BoxFuture<'a, Result<Response, surf::Exception>> {
        Box::pin(async move {
            println!("sending a request!");
            let res = next.run(req, client).await?;
            println!("request completed!");
            Ok(res)
        })
    }
}


fn parse_cookie(){
    let s="x=1; y=2; z=3";
    let c1=HeaderValue::from_static(s);
    let mut h1= HeaderMap::new();
    h1.insert("cookie",c1);
    let c2=h1.typed_get::<Cookie>();
    let cc=c2.unwrap();
    println!("ssssss{:?}", cc.get("x").unwrap());
    println!("ssssss{:?}", cc.get("y").unwrap());
    println!("ssssss{:?}", cc.get("z").unwrap());
    for (k,v) in cc.iter() {
        println!("{}={}", k,v);
    }
}





fn main0() -> Result<(), surf::Exception> {
    femme::start(log::LevelFilter::Info).unwrap();
    task::block_on(async {
        let uri = "https://httpbin.org/post";
        let data = serde_json::json!({ "name": "chashu" });
        let res = surf::post(uri)
            .body_json(&data)
            .unwrap()
            .await?;
        println!("{}",res.status());
        Ok::<(), surf::Exception>(())
    })
}


fn main1() -> Result<(), surf::Exception> {
    femme::start(log::LevelFilter::Info)?;

    task::block_on(async {
       let uri = "https://httpbin.org/get";
       let string: String =  surf::get(uri)
            .middleware(Printer {})
            .recv_string()
            .await?;
        println!("{}", string);
        Ok::<(), surf::Exception>(())
    })
}


fn main3() -> Result<(), surf::Exception> {
    femme::start(log::LevelFilter::Info).unwrap();
    task::block_on(async {
        let client = surf::Client::new();
        let req1 = client.get("https://httpbin.org/get").recv_string();
        let req2 = client.get("https://httpbin.org/get").recv_string();
        let (a,b)=futures::future::try_join(req1, req2).await?;
        println!("{}{}", a,b);
        Ok::<(), surf::Exception>(())
    })
}

fn main4() -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {
    task::block_on(async {
        let uri = "https://httpbin.org/post";
        let u= "https://httpbin.org/get";
        //"https://img.fyi/q6YvNqP"
        let reader = surf::get(u).await?;
        //"https://box.rs/upload"
        let res = surf::post(uri)
            .body(reader)
            .recv_string()
            .await?;
        println!("{}", res);
        Ok(())
    })
}


/*
date: Thu, 12 Mar 2020 08:54:30 GMT
content-type: application/json
content-length: 498
server: gunicorn/19.9.0
access-control-allow-origin: *
access-control-allow-credentials: true
*/


fn main5() -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {

    #[derive(Deserialize, Serialize)]
    struct Ip {
        ip: String
    }
    //{"ip":"112.97.63.60"}

    task::block_on(async {
        let uri = "https://httpbin.org/post";
        let data = &Ip { ip: "129.0.0.1".into() };
        let mut res = surf::post(uri).body_json(data)?.await?;


        let h=res.headers();
        println!("{:?}", h);
        println!("ssssss{:?}", h.get("server").unwrap());
        for (name, value) in h {
             println!("{}: {}", name, value);
        }

        assert_eq!(res.mime(), Some(mime::APPLICATION_JSON));
        assert_eq!(res.status(), 200);

        let uri = "https://api.ipify.org?format=json";
        let Ip { ip }=surf::get(uri)
            .recv_json()
            .await?;
        println!("{}", ip);
        println!("{}", ip.len());


        Ok(())
    })
}




fn maind() -> Result<(), surf::Exception> {
    femme::start(log::LevelFilter::Info)?;
    task::block_on(async {
       let uri = "https://www.baidu.com";

       let mut res =  surf::get(uri)
            .middleware(Printer {})
            .await?;

        let h=res.headers();
        println!("{:?}", h);
        // "BDORZ=27315; max-age=86400; domain=.baidu.com; path=/"
        let cook=h.get("set-cookie").unwrap();
        println!("ssssss{:?}", cook);
        //parse_cookie();
        Ok::<(), surf::Exception>(())
    })
}


fn maain() -> Result<(), surf::Exception> {
    femme::start(log::LevelFilter::Info).unwrap();

    #[derive(Deserialize, Serialize)]
    struct Ip {
        x: String,
        y: String,
    }

    let query= &Ip { 
        x: "1".into() ,
        y: "2".into() ,
    };

    task::block_on(async {
        let uri = "https://httpbin.org/post";
        let data = serde_json::json!({ "name": "chashu" });
        let res = surf::post(uri)
            .set_header("X-Requested-With", "surf")
            .set_query(&query)?
            .body_json(&data)
            .unwrap()
            .await?;
        println!("{}",res.status());
        println!("{}",res.status());
        Ok::<(), surf::Exception>(())
    })
}

async fn post_form() -> Result<String, Box<dyn std::error::Error + Send + Sync + 'static>>{
     #[derive(Serialize, Deserialize)]
     struct Body {
         apples: u32
     }
     let query=serde_json::json!({ "name": "chashu" });
     let res =surf::post("https://httpbin.org/post")
         .set_header("x","1")
         .set_header("y","2")
         .set_query(&query)?
         .body_form(&Body { apples: 7 })?
         .recv_string()
         .await?;
     Ok(res) 
}

async fn post_form1(){
    let r=post_form().await;
    println!("{}",r.unwrap());
}

async fn add(x :u32) -> u32 { 
     x+12
}

async fn f1() -> u32{
    let a=add(100);
    let b : u32 = a.await;
    b
}

async fn f2(){
    let b=f1().await;
    println!("zzzzzzzzzzz{}",b);
}

fn maindd(){
    task::block_on(f2());
}


