package ocr

import (
	"os"
	"encoding/json"
	//"encoding/base64"
    "fmt"
	"net/http"
	"net/url"
	"io/ioutil"
	"strings"
	. "../bs64"
)
//https://ai.baidu.com/ai-doc/OCR/1k3h7y3db
//
var(
	BAIDU_TK_SERVER="https://aip.baidubce.com/oauth/2.0/token"
	BAIDU_OCR_SERVER="https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic"
	client_id="1111"
	client_secret="2222"
)

type Token struct {
	RefreshToken  string `json:"refresh_token"` 
	ExpiresIn     int64  `json:"expires_in"`    
	Scope         string `json:"scope"`         
	SessionKey    string `json:"session_key"`   
	AccessToken   string `json:"access_token"`  
	SessionSecret string `json:"session_secret"`
}

type OcrResult struct {
	LogID          int64         `json:"log_id"`          
	Direction      int64         `json:"direction"`       
	WordsResultNum int64         `json:"words_result_num"`
	WordsResult    []WordsResult `json:"words_result"`    
}

type OcrFail struct {
	ErrorCode int64  `json:"error_code"`
	ErrorMsg  string `json:"error_msg"`
}

type WordsResult struct {
	Words       string      `json:"words"`      
	Probability Probability `json:"probability"`
}

type Probability struct {
	Variance int64 `json:"variance"`
	Average  int64 `json:"average"` 
	Min      int64 `json:"min"`     
}


func Env(a string, b string) (string){
	s:=os.Getenv(a) 
	if len(s)>0 {
		return s
	}else{
		return b
	}
}


func qs(u string,o map[string]string) string{
	 Url, _ := url.Parse(u)
	 p:=url.Values{}
	 for k, v := range o{
	 	p.Add(k,v)
	 }
	 Url.RawQuery = p.Encode()
	 return Url.String()
}

func qs1(o map[string]string) string{
	 p:=url.Values{}
	 for k, v := range o{
	 	p.Add(k,v)
	 }
	 return p.Encode()
}


func GetToken() (Token,error){
     var r Token
	 u:=BAIDU_TK_SERVER
	 o:=map[string]string{
	   "grant_type": "client_credentials",
	   "client_id": Env("baidu_ocr_APIKey",client_id),
	   "client_secret":Env("baidu_ocr_SecretKey", client_secret),
	 }
	 u1:=qs(u,o)

     resp,err := http.Get(u1)
	 if err!=nil{
		 return r,err
	 }
     defer resp.Body.Close()
     body, _ := ioutil.ReadAll(resp.Body)

	 err = json.Unmarshal(body, &r)

	 //fmt.Println("[token] ",r)
	 return r, err
	
}


func Ocr(tk string , s string) (OcrResult,error){
	u:=BAIDU_OCR_SERVER
	o:=map[string]string{
		"access_token":tk,
		"image":s,
	}
	//fmt.Println("[oo] ",o) 
	q:=qs1(o)
	req, err := http.NewRequest("POST", u,strings.NewReader(q))
	if err!=nil{
		fmt.Println("[网不行] ",err) 
	}
    client := http.Client{}
    response, e := client.Do(req)
	if e != nil {
		fmt.Println("[被封了] ",e) 
	}
	defer response.Body.Close()
	b, _ := ioutil.ReadAll(response.Body)
	fmt.Println("[ocr] ",string(b)) 
	var r OcrResult
	err = json.Unmarshal(b, &r)
	return r, err
}


func Reco() string{
	file:="code.jpg"
	s:=Read_base64(file)
	tk,_:=GetToken()
	r,e:=Ocr(tk.AccessToken,s)
	if e!=nil {
		fmt.Println("[超了。。] ",e) 
        panic(e)
	}
	fmt.Println(r) 
	w:=""
	if len(r.WordsResult)>0 {
		w1:=r.WordsResult[0].Words
		w2:=strings.Replace(w1, " ", "", -1)
		w3:=strings.Replace(w2, "-", "", -1)
		if len(w3) == 5{
			w=w3
		}else{
			fmt.Println("[不对]",w3) 
		}
	}
	fmt.Println("oooo",w) 
	return w
}
