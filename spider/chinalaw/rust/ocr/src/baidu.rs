extern crate serde_json;
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

use std::string::*;
use std::collections::*;
use std::collections::HashMap;
//use std::io::{stdout, Write};
//use std::io::Read;

use bytes::Bytes;
//extern crate url;
//use url::form_urlencoded;
use std::path::PathBuf;

use async_std::task;
use futures::future::BoxFuture;
use surf::middleware::{HttpClient, Middleware, Next, Request, Response};
use surf::mime;
//use serde::{Deserialize, Serialize};
use serde_derive::{Serialize, Deserialize};
use headers::{Cookie, HeaderMap, HeaderMapExt, HeaderValue};




#[derive(Deserialize, Serialize)]
pub struct Config {
    grant_type: String,
    client_id: String,
    client_secret: String,
}

#[derive(Serialize, Deserialize)]
pub struct Token {
    #[serde(rename = "refresh_token")]
    refresh_token: String,

    #[serde(rename = "expires_in")]
    expires_in: i64,

    #[serde(rename = "scope")]
    scope: String,

    #[serde(rename = "session_key")]
    session_key: String,

    #[serde(rename = "access_token")]
    access_token: String,

    #[serde(rename = "session_secret")]
    session_secret: String,
}

#[derive(Serialize, Deserialize)]
pub struct TokenFail {
    #[serde(rename = "error_code")]
    error_code: i64,

    #[serde(rename = "error_msg")]
    error_msg: String,
}

//{"error_code":17,"error_msg":"Open api daily request limit reached"}
#[derive(Serialize, Deserialize)]
pub struct RecoResultFail {
    #[serde(rename = "error_code")]
    error_code: i64,

    #[serde(rename = "error_msg")]
    error_msg: String,
}


#[derive(Serialize, Deserialize)]
pub struct RecoResult {
    #[serde(rename = "log_id")]
    log_id: i64,

    #[serde(rename = "direction")]
    direction: i64,

    #[serde(rename = "words_result_num")]
    words_result_num: i64,

    #[serde(rename = "words_result")]
    words_result: Vec<WordsResult>,
}

#[derive(Serialize, Deserialize)]
pub struct WordsResult {
    #[serde(rename = "words")]
    words: String,

    #[serde(rename = "probability")]
    probability: Probability,
}

#[derive(Serialize, Deserialize)]
pub struct Probability {
    #[serde(rename = "variance")]
    variance: i64,

    #[serde(rename = "average")]
    average: i64,

    #[serde(rename = "min")]
    min: i64,
}

lazy_static! {

    static ref BAIDU_TK_SERVER:String="https://aip.baidubce.com/oauth/2.0/token".to_owned();
    static ref BAIDU_OCR_SERVER:String="https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic".to_owned();
 //   static ref CONFIG: Config= {
 //       let client_id=env::var("baidu_ocr_APIKey").unwrap();
 //       let client_secret=env::var("baidu_ocr_SecretKey").unwrap();
 //       let query= Config { 
 //           grant_type:"client_credentials".into(),
 //           client_id: client_id.into(),
 //           client_secret:client_secret.into(),
 //       };
 //       query
 //   };
}


pub fn get_config()->Config{
        let client_id=env::var("baidu_ocr_APIKey").unwrap();
        let client_secret=env::var("baidu_ocr_SecretKey").unwrap();
        let query=Config { 
            grant_type:"client_credentials".into(),
            client_id: client_id.into(),
            client_secret:client_secret.into(),
        };
        query
}


pub fn read_base64(file_name:&str) -> String{
   //println!("cccccccc{}" , env::current_dir().unwrap().display());
   //println!("curexe: {}" , env::current_exe().unwrap().display());
   let t=env::current_dir().unwrap().display().to_string();
   let p: PathBuf = [&t, file_name].iter().collect();
   let p1=p.to_str().unwrap();
   println!("ccccccccc{}" ,p1);
   let mut f = File::open(p1).unwrap();
   let mut buffer = Vec::new();
   f.read_to_end(&mut buffer);
   let c=Bytes::from(buffer);
   let d=base64::encode(&c);
   d
}

pub async fn get_token() -> Result<String, Box<dyn std::error::Error + Send + Sync + 'static>>{
    let u=&*BAIDU_TK_SERVER;
    let Token {
        access_token,
refresh_token, expires_in, scope, session_key, session_secret
    } = surf::get(u)
            .set_query(&get_config())?
            .recv_json()
            .await?;
     println!("{}", access_token);
     Ok(access_token)
}

pub async fn reco(file_name:&str) -> Result<String, Box<dyn std::error::Error + Send + Sync + 'static>>{
    #[derive(Deserialize, Serialize)]
    struct Img {
        access_token: String,
	image:String,
    }
    let s=read_base64(file_name);

    let tk=get_token().await?;
    let query= &Img { 
        access_token: tk.into(),
	image:s.into(),
    };
    let u=&*BAIDU_OCR_SERVER;
    let res=surf::post(u)
         .body_form(&query)?
         .recv_string()
         .await?;
     Ok(res) 
}




