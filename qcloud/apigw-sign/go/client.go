package main

import (
	"time"
	"fmt"
	"crypto/hmac"
	"crypto/sha1"
	"io"
	"io/ioutil"
	"encoding/base64"
	"net/http"
	"strings"
)

var (
	SERVER="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec"
	SECRETID = "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
	SECRETKEY = "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
	SOURCE="ccc"
	EXP=15 *60
)
// go run client.go

func gmt_now()(dateTime string){
	timeLocation, _ := time.LoadLocation("Etc/GMT")
	dateTime = time.Now().In(timeLocation).Format("Mon, 02 Jan 2006 15:04:05 GMT")
	return
}

func hmacsha1(secretKey string,sign string) (string){
	h := hmac.New(sha1.New, []byte(secretKey))
	io.WriteString(h, sign)
	sign = fmt.Sprintf("%x", h.Sum(nil))
	sign = string(h.Sum(nil))
	sign = base64.StdEncoding.EncodeToString([]byte(sign))
	return sign
}

func calcAuthorization(source string, secretId string, secretKey string) (sign string, dateTime string, err error) {
	dateTime=gmt_now()
	sign = fmt.Sprintf("x-date: %s\nsource: %s", dateTime, source)
	sign=hmacsha1(secretKey,sign)
	auth := fmt.Sprintf("hmac id=\"%s\", algorithm=\"hmac-sha1\", headers=\"x-date source\", signature=\"%s\"", 
		secretId, sign)
	fmt.Println("auth:", auth)
	return auth, dateTime, nil
}


func calc1(h map[string]string,secretId string, secretKey string) (map[string]string){
	var s []string
	var kk []string
	for k,v := range h{
		k1:=strings.ToLower(k)
		s=append(s,fmt.Sprintf("%s: %s", k1,v))
		kk=append(kk, k1)
	}
	s1:=strings.Join(s,"\n")
	auth:=map[string]string{
		"id" : secretId,
		"algorithm" : "hmac-sha1",
		"headers" : strings.Join(kk,` `),
		"signature" :hmacsha1(secretKey, s1),
	}
	k2:=[] string {"id","algorithm","headers","signature"} 
	var au []string
	for _,k:=range k2{
		au=append(au,fmt.Sprintf(`%s="%s"`, k, auth[k]))
	}
	Authorization:="hmac "+strings.Join(au,`, `)
	h["Authorization"]=Authorization
	return h 
}


func  get(u string,h map[string]string) string {
	b:=""
	client := &http.Client{
		Timeout: 7 * time.Second,
	}
	req, err := http.NewRequest("GET", u, nil) 
	if err != nil {
		fmt.Println(err)		
		return b
	}
	for k,v:=range h{
		req.Header.Set(k,v)
	}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)		
		return b
	}
	defer resp.Body.Close()

//	fmt.Println("status code:", resp.StatusCode)
//	var headerMsg string
//	for key, _ := range resp.Header {
//		headerMsg += fmt.Sprintf("\n%s:%s", key, resp.Header.Get(key))
//	}
//	fmt.Println(headerMsg)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)		
		return b
	}
	return string(body)
}


func test1(){
	sign, dateTime, _ := calcAuthorization(SOURCE, SECRETID, SECRETKEY)
	h:= map[string]string{
		//"Host": defaultDomain
		"Accept": "*/*",
		"Accept-Charset": "utf-8;",
		"Source": SOURCE,
		"X-Date": dateTime,
		"Authorization": sign,
		"user-agent":"ccc",
	}
	r:=get(SERVER,h)
	fmt.Println(r)
}


func test2(){
	h:= map[string]string{
      "X-ZZZ": "123",
      "X-Date": gmt_now(), // "Thu, 20 Feb 2020 15:06:15 GMT", 
      "Source": "ccc",
      "X-Token": "123",
	  "user-agent":"ccc",
    }
	h1:=calc1(h,SECRETID, SECRETKEY)
	r:=get(SERVER,h1)
	fmt.Println(r)
}

func main(){
   //test1()
   test2()
}
