extern crate chrono;
use chrono::prelude::*;
//use chrono::offset::LocalResult;
use std::string::*;

//https://docs.rs/chrono/0.4.10/chrono/
//这几种都可
//Sat, 22 Feb 2020 09:06:12 GMT
//Sat, 22 Feb 2020 09:06:12 UTC
//Sat, 22 Feb 2020 09:06:12 +0000
//Sat, 22 Feb 2020 09:06:12
fn utc_now() -> String{
    //"%Y-%m-%d %H:%M:%S"
    //"%a %b %e %T %Y"
    //Utc::now().to_rfc2822()
    //Utc::now().format("%c").to_string()
    Utc::now().format("%a, %d %h %Y %H:%M:%S GMT").to_string()
}

