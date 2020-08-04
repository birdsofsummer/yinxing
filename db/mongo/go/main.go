package main

import (
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
//	"go.mongodb.org/mongo-driver/internal/testutil/helpers"
//	"go.mongodb.org/mongo-driver/mongo/readconcern"
//	"go.mongodb.org/mongo-driver/mongo/writeconcern"
//	"go.mongodb.org/mongo-driver/x/bsonx"

//	"bytes"
//	"encoding/json"
//	"math"
//	"strings"
	"fmt"
	"time"
	"context"
	"log"
)

var (



)

type mConfig struct {
	url string
	db string
	table string
}

type mClient struct {
	client *mongo.Client
	collection *mongo.Collection
	ctx context.Context
	config mConfig
}




func conn(m mConfig) (mClient){
	client, err := mongo.NewClient(options.Client().ApplyURI(m.url))

	if err!=nil{
		fmt.Println("1111")
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err!=nil{
		fmt.Println("2222")
	}

	err = client.Ping(ctx, readpref.Primary())
	fmt.Println(err)
	collection:=client.Database(m.db).Collection(m.table)
	c:=mClient{
		collection:collection,
		client:client,
		ctx:ctx,
		config:m,
	}
    return c
}

func (c mClient) insert(d bson.M) (*mongo.InsertOneResult){
	res, err := c.collection.InsertOne(c.ctx, d)

	if err!=nil{
		fmt.Println("ccccc")
	}

	id := res.InsertedID
	fmt.Println(res) //&{ObjectID("5e82cf27f6e293d888a41bb0")}
	fmt.Println(id)  //ObjectID("5e82cf27f6e293d888a41bb0")

	return res
}


func (c mClient) inserts(docs []interface{}) (*mongo.InsertManyResult){
	res, err := c.collection.InsertMany(c.ctx, docs)
	if err!=nil{
		//...
	}
	fmt.Println(res)
	return res
}



func (c mClient) list(){
	cur, err := c.collection.Find(c.ctx, bson.D{})
	if err != nil { log.Fatal(err) }
	defer cur.Close(c.ctx)
    
	fmt.Println("----------\n") 

	for cur.Next(c.ctx) {
	   var result bson.M
	   err := cur.Decode(&result)
	   if err != nil { log.Fatal(err) }
		fmt.Println(result)  
		//fmt.Println(result["name"])  
		//fmt.Println(result["value"])  
		//fmt.Println(result["_id"])  
		//map[name:pi value:3.14159 _id:ObjectID("5e82d00b763eefc4519edec9")]
	}
	if err := cur.Err(); err != nil {
	  log.Fatal(err)
	}
}




func crud(){
	var MONGO_CONFIG=mConfig{
		url: "mongodb://localhost:27017",
		db : "testing",
		table:"numbers",
	}
	d:=bson.M{"name": "pi", "value": 3.14159}

	docs := make([]interface{}, 0)
	for i:=0;i<10;i++{
		dd:=bson.M{"name": "pi", "value": i}
		docs = append(docs, dd)
	}

	c:= conn(MONGO_CONFIG)
	c.insert(d)
	c.inserts(docs)

//	coll:=c.collection
//  ctx: =c.ctx
//	opts := options.FindOneAndDelete()
//	var filter map[string]interface{}
//	r,_:=coll.FindOneAndDelete(c.ctx,filter,opts)
//	fmt.Println(r)  

//  opts: = options.Delete()
//  r,_: = coll.DeleteMany(c.ctx, filter, opts)

//  opts := options.Replace()
//  coll.ReplaceOne(ctx, filter, replacement, opts)

// opts := options.Update()
// coll.UpdateOne(ctx, filter, update, opts)


// opts := options.Update()
// coll.UpdateMany(ctx, filter, update, opts)


// coll.Aggregate(ctx, pipeline, opts)
// db.RunCommand(ctx, cmd, opts)

    c.list()
}

func main() {
	crud()
}




