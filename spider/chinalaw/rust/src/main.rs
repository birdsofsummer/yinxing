//https://github.com/http-rs/surf/blob/master/src/response.rs
//https://docs.rs/headers/0.3.2/headers/struct.Cookie.html
//https://github.com/http-rs/surf/blob/master/src/request.rs
//https://rust-lang.github.io/async-book/01_getting_started/04_async_await_primer.html
//https://docs.rs/cookie/0.13.3/cookie/struct.CookieJar.html
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
use std::{thread, time};
use std::str::FromStr;
use std::collections::HashMap;
use http::header::HeaderMap;
use http::{Request, Response};

use bytes::Bytes;
//extern crate url;
//use url::form_urlencoded;
extern crate chrono;
use chrono::prelude::*;

extern crate rand;
use rand::Rng;
use async_std::task;
use futures::future::BoxFuture;
//use surf::middleware::{HttpClient, Middleware, Next, Request, Response};
use surf::mime;
//use serde::{Deserialize, Serialize};
use serde_derive::{Serialize, Deserialize};
//use headers::{Cookie, HeaderMap, HeaderMapExt, HeaderValue};

extern crate ocr;
use ocr::baidu::reco;
//use constant::*;
//mod constant;
use cookie::{Cookie, CookieJar, SameSite};
use reqwest::{Client};



#[macro_use]
extern crate lazy_static;

lazy_static! {
         static ref SERVER:String="http://zqyj.chinalaw.gov.cn/ajax/invoke".to_owned();
         static ref PROVINCE:Vec<String> = {
            let a=vec![
            "北京市","天津市","重庆市","上海市","河北省","山西省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省","陕西省","甘肃省","青海省","台湾省","内蒙古自治区","广西壮族自治区","宁夏回族自治区","新疆维吾尔自治区","西藏自治区","香港特别行政区","澳门特别行政区"
            ];
            a.iter().map(|x|x.to_string()).collect()
         };
         static ref JOB:Vec<String>={
            let a=vec!["销售|客服|市场","财务|人力资源|行政","项目|质量|高级管理","IT|互联网|通信","房产|建筑|物业管理","金融","采购|贸易|交通|物流","生产|制造","传媒|印刷|艺术|设计","咨询|法律|教育|翻译","服务业","能源|环保|农业|科研","兼职|实习|社工|其他"];
            a.iter().map(|x|x.to_string()).collect()
         };
         static ref  USER_AGENT_LIST:Vec<String>= {
            let a=vec![
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
            "Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6",
            "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/19.77.34.5 Safari/537.1",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
            "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
            "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
            "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
            "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
            "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
            "Mozilla/5.0 (X11; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
        ];
            a.iter().map(|x|x.to_string()).collect()
         };
    }



fn timestamp()-> String{
    let t=Utc::now();
    let ms=t.timestamp_millis();
    let s=ms/1000;
    let s1=format!("{}",s);
    println!("{}",s1);
    s1
}

fn random(n:i32)-> String{
    let mut r=rand::thread_rng();
    let a=r.gen_range(0,n);
    format!("{}",a)
}

fn random1(n:i32)-> i32{
    let mut r=rand::thread_rng();
    let a=r.gen_range(0,n);
    a
}

fn pick(a:Vec<String>) -> String{
   let l=a.len();
   let i=random1(l as i32);
   let z=a[i as usize].to_owned();
   z
}

fn create_ip()->String{
    let mut a:Vec< String> = vec![];
    for i in 1..5{
        let t=random(255);
        a.push(t);
    }
    let s=a.join(".");
    println!("{}",s);
    s
}

fn create_header(){
       let ua=pick((&USER_AGENT_LIST).to_vec());
       let ip=create_ip();
       let h=vec![
	("Content-Type", "application/x-www-form-urlencoded"),
	("Accept", "application/json, text/plain, */*"),
	("Accept-Language", "en-US,en;q=0.5"),
	("DNT", "1"),
	("Pragma", "no-cache"),
	("Cache-Control", "no-cache"),
	("User-Agent",ua.as_str()),
	("X-Forwarded-For", ip.as_str()),
        ("x-real-ip", ip.as_str()),
       //("referrer","http://zqyj.chinalaw.gov.cn/index"),
      ];
      let a:Vec<(String,String)>=h.iter() .map(|(k,v)|(k.to_string(),v.to_string())) .collect();
      println!("{:?}",a);
}


#[derive(Serialize, Deserialize,Debug)]
pub struct PostData {
    #[serde(rename = "_ZVING_METHOD")]
    zving_method: String,

    #[serde(rename = "_ZVING_URL")]
    zving_url: String,

    #[serde(rename = "_ZVING_DATA")]
    zving_data: String,

    #[serde(rename = "_ZVING_DATA_FORMAT")]
    zving_data_format: String,
}

// {"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}
#[derive(Serialize, Deserialize,Debug)]
pub struct LoginOutput {
    #[serde(rename = "_ZVING_STATUS")]
    zving_status: i64,

    #[serde(rename = "_ZVING_MESSAGE")]
    zving_message: String,
}


//'{"userName":"","province":"北京市","job":"销售|客服|市场","email":"","mobile":"","address":"","verifyCode":"aaa"}'
#[derive(Serialize, Deserialize,Debug)]
pub struct User {
    #[serde(rename = "userName")]
    user_name: String,

    #[serde(rename = "province")]
    province: String,

    #[serde(rename = "job")]
    job: String,

    #[serde(rename = "email")]
    email: String,

    #[serde(rename = "mobile")]
    mobile: String,

    #[serde(rename = "address")]
    address: String,

    #[serde(rename = "verifyCode")]
    verify_code: String,
}


//'{"DraftID":3654,"ID":"0"}'
#[derive(Serialize, Deserialize,Debug)]
pub struct Draft {
    #[serde(rename = "DraftID")]
    draft_id: i64,

    #[serde(rename = "ID")]
    id: String,
}

//{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"您好，与您相同IP的用户已投票，请实名注册后投出您宝贵的一票，谢谢。"}
//{ "_ZVING_STATUS": 1, "_ZVING_MESSAGE": "感谢您的参与！" }
#[derive(Debug, Serialize, Deserialize)]
pub struct VoteOutput {
    #[serde(rename = "_ZVING_STATUS")]
    zving_status: i64,

    #[serde(rename = "_ZVING_MESSAGE")]
    zving_message: String,
}


//{"_ZVING_STATUS":1,"_ZVING_MESSAGE":"Common.Success"}
//{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}
async fn login(client: &Client,code:&str) ->  Result<(VoteOutput), Box<dyn std::error::Error + Send + Sync + 'static>>  {
    let job=pick((&JOB).to_vec());
    let province=pick((&PROVINCE).to_vec());
    let u=User{
        user_name: "".into(),
        province: province,
        job: job,
        email: "".into(),
        mobile: "".into(),
        address: "".into(),
        verify_code: code.into(),
    };
    let u1=serde_json::json!(u);
    let d=PostData{
        zving_method: "Register.doAnonymousLogin".into(),
        zving_url: "%2Findex".into(),
        zving_data: u1.to_string(),
        zving_data_format: "json".into(),
    };
    let uri=&*SERVER;
    //println!("[login]{}",uri);
    println!("[code]{}",code);
    println!("[data]{:#?}",d);
 //  let json = r#"{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}"#;
 //  json.to_string()

    let res =  client
            .post(uri)
            .form(&d) 
            .send()
            .await?;
    //      .json()
    //      .await?;
            //println!("{:?}",res);
            //println!("{:?}",res.status());
        let body: VoteOutput=res.json().await?;
        //println!("{:#?}",body);
        Ok(body)
}



//{"_ZVING_STATUS":1,"_ZVING_MESSAGE":"Common.Success"}
//{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}
async fn login1(client: &mut Client)-> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>>{
    let mut i:i32=0;
    loop{
        i+=1;
        if i>100 {
             panic!("sleeeeep...");
        }
        //download2(&client).await;
        let code=reco1(client).await?;
        let r=login(client,&code).await.unwrap();
        println!("[code]{}",code);
        println!("[login]{:#?}",r);
        //println!("{:#?}",client);

        let VoteOutput{zving_status,zving_message}=r;
        //serde_json::from_str(&r).unwrap();
        if zving_status == 1  {
            break Ok(());
        }
        //process::exit(1);
    }
}



/*
 * cookie
{

	"SERVERID": "a8675e45f86510287c911f354cf89f88|1584108398|1584108152",
	"_ZVING_AUTHCODE": "554831f6d6b1b192d8d108c07c3becee_1584108346782",
	"JSESSIONID": "0D2BB8F97E29C31F700D92631AECE455",
        "acw_tc" :"2760824815833338022516419efbf924e571adbcd0f9699059afb7094761a4",
	"14_vq": "4"
}
*/
//{ "_ZVING_STATUS": 1, "_ZVING_MESSAGE": "感谢您的参与！" }
async fn vote(client: &Client,draft:i64,id:i64,change:bool) ->  Result<(VoteOutput), Box<dyn std::error::Error + Send + Sync + 'static>> {
    let d0=Draft{
        draft_id:draft, //3654
        id:format!("{}",id),
    };
    let dd=serde_json::json!(d0);
    let d=PostData{
      zving_method: "SupportOppose.voteOppose".into(),
      zving_url: "%2FdraftDetail".into(),
      zving_data:dd.to_string(),  //'{"DraftID":3654,"ID":"9999"}',
      zving_data_format: "json".into(),
    };

    let uri=&*SERVER;
    //println!("[vote]{}",uri);
    println!("[vote]{}",id);
    //println!("[data]{:#?}",d);
    if change {
        let ip=create_ip();
        let res = client
                .post(uri)
                .header("X-Forwarded-For", &ip)
                .header("x-real-ip", &ip)
        //      .header("ccc", "ddd")
                .form(&d) 
                .send()
                .await?;
        //      .json()
        //      .await?;
                //println!("{:?}",res);
                //println!("{:?}",res.status());
            let body: VoteOutput=res.json().await?;
            println!("{:#?}",body);
            Ok(body)
    }else{
        let res = client
                .post(uri)
        //      .header("ccc", "ddd")
                .form(&d) 
                .send()
                .await?;
        //      .json()
        //      .await?;
                //println!("{:?}",res);
                //println!("{:?}",res.status());
            let body: VoteOutput=res.json().await?;
            println!("{:#?}",body);
            Ok(body)
    }
}


fn get_code_uri()->String{
    let s="http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&";
    let s1=s.to_string()+&timestamp();
    s1
}

async fn download(u:&str ,n:i32) -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {
    if n==10{
        //panic!("sleeeeep...");
        process::exit(1);
    }
    let path = Path::new("code.jpg");
    let display = path.display(); 

    let b=surf::get(u)
          .recv_bytes()
          .await?;
    let l=b.len();
    println!("#{},{}",n,l);
    if l< 400  && n <10 {
        println!("retry {}",n);
        download(u,n+1);
    } 
    let mut output: File = File::create(path)?;
    //write!(output, "123");
    output.write(&Bytes::from(b))?;
    Ok(())
}

fn test_pick(){

       let ua=pick((&USER_AGENT_LIST).to_vec());
       let job=pick((&JOB).to_vec());
       let province=pick((&PROVINCE).to_vec());
       let ip=create_ip();

       println!("{}",ip);
       println!("{}",ua);
       println!("{}",job);
       println!("{}",province);
}

fn  test_download()   {
    let u="https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/qrcode/zbios-09b6296ee6.png";
    task::block_on(download(u,0));
}

fn test_download_reco(){
    task::block_on(async {
       let u=&get_code_uri();
       download(u,0).await;
       let z=reco("code.jpg").await;
       println!("{}",z.unwrap());
    });
}


#[derive(Serialize, Deserialize,Debug)]
pub struct RecoResult {
    #[serde(rename = "log_id")]
    log_id: i64,

   // #[serde(rename = "direction")]
   // direction: i64,

    #[serde(rename = "words_result_num")]
    words_result_num: i64,

    #[serde(rename = "words_result")]
    words_result: Vec<WordsResult>,
}

#[derive(Serialize, Deserialize,Debug)]
pub struct WordsResult {
    #[serde(rename = "words")]
    words: String,

   // #[serde(rename = "probability")]
   // probability: Probability,
}

#[derive(Serialize, Deserialize,Debug)]
pub struct Probability {
    #[serde(rename = "variance")]
    variance: i64,

    #[serde(rename = "average")]
    average: i64,

    #[serde(rename = "min")]
    min: i64,
}


#[derive(Serialize, Deserialize,Debug)]
pub struct VoteConfig {
    #[serde(rename = "id")]
    id: i64,
    #[serde(rename = "from")]
    from: i64,
    #[serde(rename = "to")]
    to: i64,
}



//{"error_code":17,"error_msg":"Open api daily request limit reached"}
#[derive(Serialize, Deserialize)]
pub struct RecoResultFail {
    #[serde(rename = "error_code")]
    error_code: i64,

    #[serde(rename = "error_msg")]
    error_msg: String,
}

//{"log_id": 4881729982332469645, "words_result_num": 1, "words_result": [{"words": " 33hxf"}]}
async fn reco1(client: &mut Client) -> Result<String, Box<dyn std::error::Error + Send + Sync + 'static>>{
    let mut i=0;
    loop{
        println!("{}",i);
        if i > 10_000 {
             panic!("sleeeeep...");
        }
        i+=1;
        //let u=&get_code_uri();
        //download(u,0).await;
        download2(client).await?;
        let z=reco("code.jpg").await;
        let z1=z.unwrap();
        println!("{}",z1);


        let RecoResult{ 
            log_id,
            words_result_num,
            words_result,
            //direction,
        } =serde_json::from_str(&z1).unwrap();
        if words_result_num > 0  {
           let w1=&words_result[0].words;
           let w2 = String::from(w1);
           let w3=w2
               .trim()
               .replace("-", "")
               .replace("/", "");
           println!("[{}]",w3);
           if w3.len() == 5 {
               break Ok(w3.to_string());
           }           
        }
    }
}





#[tokio::main]
async fn vote1(vs:Vec<&VoteConfig>) -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>>{
        let mut ii:i32=0;
        loop{
            ii+=1;
            let mut client=create_client().await.unwrap();
            println!("#{}. start...",ii);
            login1(&mut client).await;

            let mut j:i32=0;
            let mut change:bool=false;
            for vv in &vs {
                //123166..123215
                for i in vv.from..vv.to{
                    println!("#{}/{} {} - {}",ii,j,vv.id,i);

                    let VoteOutput{zving_status,zving_message}=vote(&client,vv.id,i,change).await?;
                    if zving_status == 0  { 
                        println!("change ip");
                        change=true;
                     // break Ok(());
                    }else{
                        //change=false;
                    }
                    let tt=1000*1;
                    let t = time::Duration::from_millis(tt);
                    thread::sleep(t);
                    j+=1;
                }
            }
            println!("#{}. done!",ii);
            println!("sleep 1 min");
            let tt=1000*60;
            let t = time::Duration::from_millis(tt);
            thread::sleep(t);
        }
}


fn get_req_cookie(h:surf::headers::Headers) -> String{
    let mut jar = CookieJar::new();
    for (name, value) in h {
        match name {
            "cookie" =>{
                //println!("{} === {}",name,value);
                let s: Vec<&str>=value.split("; ").collect();
                for ss in s {
                   let c = Cookie::parse(ss).unwrap().into_owned();
                   jar.add(c);
                }
            }
            _=>{},
        }
    }
    let d:Vec<String>=jar.iter()
        .map(|x| x.name_value())
        .map(&|(k,v)|format!("{}={}",k,v))
        .collect();
    let d1=d.join("; ");
    println!("------->{:?} \n",d1);
    d1
}


fn get_res_cookie(h:surf::headers::Headers) -> String{
    let mut jar = CookieJar::new();
    for (name, value) in h {
        if name == "set-cookie" {
            //println!("{} === {}",name,value);
            let c = Cookie::parse(value).unwrap().into_owned();
            jar.add(c);
        }
    }
    let d:Vec<String>=jar.iter()
        .map(|x| x.name_value())
        .map(&|(k,v)|format!("{}={}",k,v))
        .collect();
    let d1=d.join("; ");
    println!("<---------{:?}\n",d1);
    d1
}


fn mix_cookie(h1: surf::headers::Headers,h2: surf::headers::Headers) -> String{
    let mut jar = CookieJar::new();
    for (name, value) in h1 {
        match name {
            "cookie" =>{
                //println!("{} === {}",name,value);
                let s: Vec<&str>=value.split("; ").collect();
                for ss in s {
                   let c = Cookie::parse(ss).unwrap().into_owned();
                   jar.add(c);
                }
            }
            _=>{},
        }
    }
    for (name, value) in h2 {
        match name {
            "set-cookie"=> {
                //println!("{} === {}",name,value);
                let c = Cookie::parse(value).unwrap().into_owned();
                jar.add(c);
            },
            _=>{},
        }
    }
    let d:Vec<String>=jar.iter()
        .map(|x| x.name_value())
        .map(&|(k,v)|format!("{}={}",k,v))
        .collect();
    let d1=d.join("; ");
    println!("{:?}",d1);
    d1
}

fn mix_cookie1(s1:&str,s2:&str) -> String{
   let mut jar = CookieJar::new();
   let a:Vec<String>=vec![s1,s2].iter().map(|x|x.to_string()).collect();
   for aa in a {
      let v: Vec<&str>=aa.split("; ").collect();
      for ss in v {
          let c = Cookie::parse(ss);
          match c {
              Ok(x) => jar.add(x.into_owned()),
              _=>{},
          }
       }
   }
   let d:Vec<String>=jar.iter()
        .map(|x| x.name_value())
        .map(&|(k,v)|format!("{}={}",k,v))
        .collect();
   let d1=d.join("; ");
   println!("{:?}",d1);
   d1
}



//https://docs.rs/cookie/0.13.3/cookie/index.html 
//"set-cookie": "BDORZ=27315; max-age=86400; domain=.baidu.com; path=/"
async fn download1(ip:&str,ua:&str) -> Result<String, Box<dyn std::error::Error + Send + Sync + 'static>> {
    //let uri="https://httpbin.org/get";
    let uri=&get_code_uri();
    let mut req = surf::get(uri)
	  .set_header("User-Agent",ua)
          .set_header("X-Forwarded-For", ip)
          .set_header("x-real-ip", ip)
          .set_header("cookie", "x=1; y=2; z=3");

    let h1=req.headers();
    let z1=get_req_cookie(h1);

    let mut res = req.await?;

    let h2=res.headers();
    let z2=get_res_cookie(h2);

    //let s=res.body_string().await?;
    //println!("{:?}",s);
    let z3=mix_cookie1(&z1,&z2);

    Ok(z3) 
}


async fn download2(client:&mut Client) -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {
     let path="code.jpg";
     let mut n:i32=0;
     loop{
         if n> 10 {
            break Ok(());
         }
         n+=1;
         let uri=&get_code_uri();
         let res= client.get(uri)
             .send()
             .await?;

        //https://github.com/seanmonstar/reqwest/blob/master/tests/cookie.rs
        // let cookies = res.cookies().collect::<Vec<_>>();
        // println!("cookie: {:#?}", cookies);

         let b=res
             .bytes()
             .await?;

        //println!("bytes: {:?}", b);

        let l=b.len();
        println!("#{},{}",n,l);
        if l > 400  {
            let mut output: File = File::create(path)?;
            //write!(output, "123");
            output.write(&Bytes::from(b))?;
            break Ok(());
        } 
        println!("retry {}",n);
     }
}



//https://docs.rs/http/0.2.0/http/header/struct.HeaderMap.html
//https://docs.rs/http/0.2.0/http/request/struct.Request.html
//https://github.com/seanmonstar/reqwest/tree/master/examples

async fn create_client()->Result<(Client), Box<dyn std::error::Error + Send + Sync + 'static>>  {
        let ua=pick((&USER_AGENT_LIST).to_vec());
        let ip=create_ip();
        let mut headers = HeaderMap::new();
        //headers: HeaderMap,
        headers.insert("User-Agent", ua.as_str().parse().unwrap());
        headers.insert("X-Forwarded-For", ip.as_str().parse().unwrap());
        headers.insert("x-real-ip", ip.as_str().parse().unwrap());
       // let cookie=download1(ip.as_str(),ua.as_str()).await;
       // headers.insert("Cookie", cookie.unwrap().as_str().parse().unwrap());
       // println!("{:?}",headers);
       // println!("{:?}",headers.get("Cookie").unwrap());
        let client = reqwest::Client::builder()
            .cookie_store(true)
            .default_headers(headers)
            .build()?;
        Ok(client)
}

#[tokio::main]
async fn test() ->  Result<(String), Box<dyn std::error::Error + Send + Sync + 'static>> {
        let uri="https://httpbin.org/post";
        let params = vec![("foo", "bar"), ("baz", "quux")];
        let mut client=create_client().await?;

   //     download2(&client).await?;

   //     let code="12345";
   //     let body=login(&client,code).await?;
   //     let VoteOutput{
   //         zving_status,
   //         zving_message,
   //     }=body;
   //    println!("{}",zving_status);
   //    println!("{:#?}",client);


       login1(&mut client).await?;

       let res =  client
            .post(uri)
            .form(&params) 
            .send()
            .await?;
            //println!("{:?}",res);
            //println!("{:?}",res.status());
        let body=res.text().await?;
        Ok(body)

        //println!("{:?}",body);
        //let a:&str=concat!("a","====",env!("baidu_ocr_APIKey"));
        //println!("{}",a);
}


fn main(){
    let s:Vec<&VoteConfig>=vec![
        &VoteConfig {
            id: 3654,
            from: 123166,
            to: 123215,
        },
       // &VoteConfig{
       //     id:3655,
       //     from:123215,
       //     to:123235, 
       // },
    ];
    vote1(s);
   // task::block_on( async { 
   //    let body =test().unwrap();
   //    println!("{:?}",body);
   // })

}
