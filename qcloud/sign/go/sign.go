package main
//https://github.com/QcloudApi/qcloud_sign_golang/blob/master/QcloudApi.go
import (
	"crypto/hmac"
	"crypto/sha1"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"math/rand"
	"net/url"
	"sort"
	"strings"
	"time"
	"os"
	"io/ioutil"
	//"strconv"
	"log"
	"net/http"
)


func random() string{
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%v", rand.Int())
}

func now() string{
    return fmt.Sprintf("%v", time.Now().Unix())
}

func env(a string, b string) (string){
	s:=os.Getenv(a) 
	if len(s)>0 {
		return s
	}else{
		return b
	}
}

func sha1_(secretKey string, source string) (string){
	hmacObj := hmac.New(sha1.New, []byte(secretKey))
	hmacObj.Write([]byte(source))
	sign:=""
	sign = base64.StdEncoding.EncodeToString(hmacObj.Sum(nil))
	return sign
}

func sha256_(secretKey string, source string) string{
	hmacObj := hmac.New(sha256.New, []byte(secretKey))
	hmacObj.Write([]byte(source))
	sign:=""
	sign = base64.StdEncoding.EncodeToString(hmacObj.Sum(nil))
	return sign
}


func sign(d map[string]string ,config map[string]string) (url.Values){
	kk:=[]string{
        "Action",
        "Region",
        "SecretId",
        "SignatureMethod",
        "Nonce",
        "Timestamp",
	}
	params:=make(map[string]string)
	for _, k := range kk {
		params[k]=config[k]
	}
	for k, v := range d {
		params[k]=v
	}
	keys := make([]string, 0, len(params))
	for k, _ := range params {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	var qs string
	for i := range keys {
		k := keys[i]
		qs += "&" + fmt.Sprintf("%v", k) + "=" + fmt.Sprintf("%v", params[k])
	}
	log.Printf("qs[%s]\n", qs[1:])	
	s :=[] string {
		strings.ToUpper(config["http_method"]),
		config["module"],
		config["HOST"],
		config["path"],
		"?",
		qs[1:],
	}
	ss:=strings.Join(s , "")
	log.Printf(ss)

	Signature:=sha1_(config["SecretKey"],ss)
	params["Signature"]=Signature

    p:=url.Values{}
	for k, v := range params {
		p.Add(fmt.Sprintf("%v", k), fmt.Sprintf("%v", v))
	}
	return p
}

func sign1(d map[string]string ) (string,string,url.Values){
	config:=map[string]string{
		"SecretId" : env("SecretId", "xxx"),
		"SecretKey" : env("SecretKey", "xxx"),
		"Region" : env("Region", "ap-guangzhou"),
		"module" : env("module", "apigateway"),
		"SignatureMethod" : "HmacSHA1",
		//"SignatureMethod" : "HmacSHA256",
		"Nonce" : random(),
		"Timestamp" : now(),
		"Action" : "",
		"http_method" : "POST",
		"HOST" : ".api.qcloud.com",
		"version" : "v2",
		"path":"/v2/index.php",
		"prefix":"https://",
	}
    u:=config["prefix"] + config["module"] + config["HOST"]+config["path"]
	d1:=sign(d,config)
	return config["http_method"],u,d1
}



func post(u string, paramValues url.Values) (retData string, err error) {
	rsp, err := http.PostForm(u, paramValues)

	if err != nil {
		panic(err)
		log.Fatal("http post error.", err)
		return "", err
	}

	defer rsp.Body.Close()

	retData_, err := ioutil.ReadAll(rsp.Body)
	if err != err {
		panic(err)
		return "", err
	}

	log.Printf("rsp[%v]\n", string(retData_))

	return string(retData_), nil
}

func test(){
	d:= map[string]string{
		"Region":"ap-guangzhou",
		"Action":"describeapikeysstatus",
		"offset":"0",
		"limit":"2",
		"orderby":"createdtime",
		"order":"desc",
	}
	_,u,d1:=sign1(d)
	fmt.Println(u,d1)
	post(u,d1)
}

func main() {
	test()
}


