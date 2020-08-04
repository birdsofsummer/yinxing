// https://www.mongodb.com/blog/post/the-new-mongodb-rust-driver
// https://github.com/mongodb/mongo-rust-driver
// https://github.com/mongodb/mongo-rust-driver/blob/master/src/test/coll.rs

#[macro_use(bson, doc)]
extern crate bson;
extern crate mongodb;

extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;


#[derive(Serialize, Deserialize,Debug)]
pub struct  Book{
    // #[serde(rename = "_id")]
    // _id: String,
    #[serde(rename = "title")]
    title: String,

    #[serde(rename = "author")]
    author: String,
}

pub type Books = Vec<Book>;
impl Book { 
   fn of(a:&str,b:&str)->Book{
        Book{
            title:a.to_string(),
            author:b.to_string(),
        }
   }
   fn to_doc(&self) ->  bson::ordered::OrderedDocument { 
       doc!{ 
           "title": self.title.to_string(), 
           "author":self.author.to_string(),
       }
   }
   fn to_docs(b:Books) -> Vec<bson::ordered::OrderedDocument>{
         b.iter()
        .map({|i|i.to_doc()})
        .collect()
   }
  // fn from_doc()->Book{

  // }
   fn display(&self){
      println!("title = {} author={}",self.title,self.author);
   }
   fn fake()->Vec<bson::ordered::OrderedDocument>{
                (1..10)
                .map({|i|Book::of(format!("aaa{}",i).as_str(),"a") })
                .map({|i|i.to_doc()})
                .collect()
   }
}


use log::info;
use mongodb::{Client, options::ClientOptions,options::FindOptions};
use bson::{doc, bson, Bson};

fn init_logger() {
    use chrono::Local;
    use std::io::Write;

    let env = env_logger::Env::default()
        .filter_or(env_logger::DEFAULT_FILTER_ENV, "info");
    // 设置日志打印格式
    env_logger::Builder::from_env(env)
        .format(|buf, record| {
            writeln!(
                buf,
                "{} {} [{}] {}",
                Local::now().format("%Y-%m-%d %H:%M:%S"),
                record.level(),
                record.module_path().unwrap_or("<unnamed>"),
                &record.args()
            )
        })
        .init();
    info!("env_logger initialized.");
}


// Box<dyn std::convert::From<mongodb::error::Error> + Send + Sync + 'static>
// std::result::Result<(),Box<std::convert::From<mongodb::error::Error>> >


fn conn(u:&str,app_name:&str)->Client{
    let n=app_name.to_string();
    let mut client_options = ClientOptions::parse(u).unwrap();
    client_options.app_name = Some(n);
    let client = Client::with_options(client_options).unwrap();
    return client
}



// bson::ordered::OrderedDocument
fn test() {
    init_logger();
    info!("ccc");

    let u="mongodb://localhost:27017";
    let client=conn(u,"My App");
    let table="books";

    for db_name in client.list_database_names(None).unwrap() {
        println!("{}", db_name);
    }

    let db = client.database("test");

    for collection_name in db.list_collection_names(None).unwrap() {
        println!("{}", collection_name);
    }

    let collection = db.collection(table);

    //insert one
    let json = r#"{"title": "ddd", "author": "George Orwell"}"#;
    let d: Book = serde_json::from_str(&json).unwrap();
    let r0=collection.insert_one(d.to_doc(),None).unwrap();
    println!("insert_one {:?}",r0);

    let d1=doc!{"title": "ccc", "author": "George Orwell"};
    let r1=collection.insert_one(d1,None).unwrap();
    println!("insert_one {:?}",r1);
    //InsertOneResult { inserted_id: ObjectId(ObjectId(5e859aaf0079dbb100a707b8)) }

    let d2=Book::of("xxx","yyy");
    d2.display();
    let r3=collection.insert_one(d2.to_doc(),None).unwrap();
    println!("insert_one {:?}",r3);


   //insert many
    let bb=vec![10,20,30]
       .iter()
       .map({|i|Book::of(format!("aaa{}",i).as_str(),"a") })
       .collect();
    let bb1=Book::to_docs(bb);
    let r5=collection.insert_many(bb1, None).unwrap();
    println!("insert_may docs {:?}",r5);

    let books=Book::fake();
    let r4=collection.insert_many(books, None).unwrap();
    println!("insert_may docs {:?}",r4);


    let docs = vec![
        doc! { "title": "1984", "author": "George Orwell" },
        doc! { "title": "Animal Farm", "author": "George Orwell" },
        doc! { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
    ];

    let r2=collection.insert_many(docs, None).unwrap();
    println!("insert_may {:?}",r2);
    //InsertManyResult { inserted_ids: {2: ObjectId(ObjectId(5e859af20073dda900712c80)), 0: ObjectId(ObjectId(5e859af2008b86c200712c7e)), 1: ObjectId(ObjectId(5e859af20071f62400712c7f))} }


    //list

    //let filter = doc! { "author": "George Orwell" };
    let filter = doc!{};
    let find_options = FindOptions::builder()
        .sort(doc! { "title": 1 })
        .build();

    let cursor = collection.find(filter, find_options).unwrap();
    let result1 :Vec<bson::ordered::OrderedDocument>=cursor.map(|doc| doc.unwrap()).collect();
    println!("zzzzzzzzz {:?}",&result1[1..2]);



    // update
    let z2= doc!{};
    //let z1=result1[0].clone();
    let z1=doc!{"$set":{
        "author"=>"111",
        "title"=>"222",
        }
    };
    let zz1=collection
        .update_one(z2, z1, None)
        .ok()
        .expect("Failed to update document.");
    println!("update:{:?}",zz1);


    let z2=doc! {"$set": { "title": "zzzzzzz"}};
    let zz2=collection
        .update_many(doc!{}, z2, None)
        .ok()
        .expect("Failed to update many document.");
    println!("update many :{:?}",zz2);


    let cursor1 = collection.find(doc!{}, None).unwrap();
    let result2 :Vec<bson::ordered::OrderedDocument>=cursor1
        .map(|doc| doc.unwrap())
        .collect();
    println!("22222222 {:?}",result2);



  //  for result in cursor {
  //      match result {
  //          Ok(document) => {
  //              println!("doc: {}", document);
  //            //  if let Some(title) = document.get("title").and_then(Bson::as_str) {
  //            //      println!("title: {}", title);
  //            //  }  else {
  //            //      println!("no title found");
  //            //  }
  //          }
  //          Err(e) => {
  //              println!("eeee");
  //               //return Err(e.into())
  //          },
  //      }
  //  }


    //delete
    let ra=collection.delete_one(doc!{"x": 3}, None).unwrap();
    let rb=collection.delete_many(doc!{},None).unwrap();

    println!("{:?}",ra);
    println!("{:?}",rb);
   //DeleteResult { deleted_count: 38 }
   // Ok(())


}


fn test1(){
//    let client = Client::with_uri("mongodb://localhost:27017,localhost:27018")
//        .ok().expect("Failed to initialize client.");
//
//    let db = client.db("movies");
//
//    let collections = db.list_collections(None)
//    .ok().expect("???");
//
//    //let options = CreateCollectionOptions::new();
//    //options.capped = true;
//    //options.size = Some(100000)
//    //db.create_collection("comedies", Some(options))
//    //.ok().expect("Failed to create 'comedies' collection!");
//    println!("collections:{}",collections);

//    let coll = db.collection("comedies");
//
//    let film_a = doc!{ "title" => "Ferris Bueller’s Day Off" };
//    let film_b = doc!{ "title" => "Airplane!" };
//
//    coll.insert_many(vec![film_a, film_b], None).ok().expect("Failed to insert documents.");
//
//    let filter = film_a.clone();
//    let update = doc!{ "director" => "John Hughes" };
//    coll.update_one(filter, update, None).ok().expect("Failed to update document.");
//    coll.delete_many(doc!{}, None).ok().expect("Failed to delete documents.");
//
//    let models = (1..5).map(|i| WriteModel::InsertOne { document: doc! {
//        "_id" => (i),
//        "x" => (i * 11)
//    }}).collect();
//    let new_coll = db.collection("example");
//    new_coll.bulk_write(models, true);
//
//    let cursor = match coll.find(doc! { age: { $gte: 18 } } , None) {
//        Ok(cursor) => cursor,
//        Err(error) => println!("The following error occured: {}", error)
//    };
//
//    for doc in cursor {
//        println!("{}", doc.unwrap());       
//    }

    //let docs : Vec<_> = cursor.map(|doc| doc.unwrap()).collect();

}

fn main() {
   test();
}

