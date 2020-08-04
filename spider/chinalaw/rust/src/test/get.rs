 extern crate serde;
 #[macro_use]
 extern crate serde_derive;
 extern crate serde_json;

 use generated_module::[object Object];

 fn main() {
     let json = r#"{"answer": 42}"#;
     let model: [object Object] = serde_json::from_str(&json).unwrap();
 }

extern crate serde_json;

#[derive(Serialize, Deserialize)]
pub struct GetBody {
    #[serde(rename = "args")]
    args: Args,

    #[serde(rename = "headers")]
    headers: Headers,

    #[serde(rename = "origin")]
    origin: String,

    #[serde(rename = "url")]
    url: String,
}

#[derive(Serialize, Deserialize)]
pub struct Args {
}

#[derive(Serialize, Deserialize)]
pub struct Headers {
    #[serde(rename = "Accept")]
    accept: String,

    #[serde(rename = "Accept-Encoding")]
    accept_encoding: String,

    #[serde(rename = "Host")]
    host: String,

    #[serde(rename = "Transfer-Encoding")]
    transfer_encoding: String,

    #[serde(rename = "User-Agent")]
    user_agent: String,

    #[serde(rename = "X-Amzn-Trace-Id")]
    x_amzn_trace_id: String,
}




