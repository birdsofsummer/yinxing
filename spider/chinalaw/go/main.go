package main

import (

	//"crypto/hmac"
	//"crypto/sha1"
	//"crypto/sha256"
	//"strconv"
	//"encoding/base64"
	//"sort"
	"math/rand"
	"strings"
	"time"
	"os"
	"encoding/json"
	//"log"
	"net/url"
	"fmt"
	"bufio"
	"io"
	"io/ioutil"
	"net/http"
	. "./ocr"
	. "./consts"
)

type Draft struct {
	DraftID int64  `json:"DraftID"`
	ID      string `json:"ID"`     
}

// {"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}
type LoginResult struct {
	ZvingStatus  int64  `json:"_ZVING_STATUS"` 
	ZvingMessage string `json:"_ZVING_MESSAGE"`
}


var(

    Q=0

)



func random() string{
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%v", rand.Intn(254))
}

func pick(s []string) string{
	rand.Seed(time.Now().UnixNano())
	l:=len(s)
	n:=rand.Intn(l)
	return s[n]
}

func ip() string{
	z:=[]string{}
	for i:=0;i<4;i++{
		t:=random()
		z=append(z,t)
	}
	return strings.Join(z , ".")
}


func now() string{
    return fmt.Sprintf("%v", time.Now().UnixNano()/1e6)
}

func to_json(d map[string]string) string{
	m,_:=json.Marshal(d)
    return string(m)
}

func get_headers() map[string]string{
	//res.Header["Set-Cookie"]
	//z:=[]string{}
    //cookie:=strings.Join(z , "; ")
	headers:=map[string]string{
		"User-Agent": pick(USER_AGENT_LIST),//"Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0",
		"Content-Type": "application/x-www-form-urlencoded",
		"X-Forwarded-For": ip(),
		"Accept": "application/json, text/plain, */*",
		"Accept-Language": "en-US,en;q=0.5",
		"DNT": "1",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache",
		//"Connection": "keep-alive",
		//"Host": u,
		//"Cookie": cookie,
	}
	return headers
}

func img_url(t string) string{
	s:="http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&"
	return s+t
}

//------------------------------------------------------------------------------------------------
/*
[
	"acw_tc=2760823b15831638867537356e75f701c32f431bbfd3bf5ca6d6301121ce4b;path=/;HttpOnly;Max-Age=2678401",
	"ZVING_AUTHCODE=dc4b204c2eb025ed047792cc36e00829_1583163886756",
	"SERVERID=6969a26b2e45bf0898988f5416076a17|1583163886|1583163886;Path=/"
]
*/
func get(u string) (*http.Response,error){
     client := http.Client{}
     req, _ := http.NewRequest("GET", u,nil)
     h:=get_headers()
     for k,v := range h{
 	    req.Header.Add(k, v)
     }
	 return client.Do(req)
}

func post(last *http.Response,u string, d map[string]string) (*http.Response,error) {
	 //fmt.Println("[last] ",last.Header)
	 p:=url.Values{}
	 for k, v := range d{
	 	p.Add(fmt.Sprintf("%v", k), fmt.Sprintf("%v", v))
	 }
     client := &http.Client{}
	 qs:=p.Encode()
     req, err := http.NewRequest("POST", u,strings.NewReader(qs))
     h:=get_headers()
     for k,v := range h{
 	    req.Header.Add(k, v)
     }
	 //fmt.Println("[req] ",req.Header)
	 //last.Header
     cookies:=last.Cookies()
	 for _,v := range cookies{
         req.AddCookie(v)
	 }
     if err != nil {
		
		fmt.Println("[被封了] ",err)
 		//os.Exit(0)
        //panic(err)
     }   
     response, e := client.Do(req)
	 if e != nil {
		fmt.Println("[被封了] ",e) 
		//Post http://zqyj.chinalaw.gov.cn/ajax/invoke: EOF
	 }
	 return response,e
//     defer response.Body.Close()	
//     b, _ := ioutil.ReadAll(response.Body)
// 	 return string(b),nil
// 
// 
//	rsp, err := http.PostForm(u, paramValues)
//
//	if err != nil {
//		panic(err)
//		log.Fatal("http post error.", err)
//		return "", err
//	}
//
//	defer rsp.Body.Close()
//
//	retData_, err := ioutil.ReadAll(rsp.Body)
//	if err != err {
//		panic(err)
//		return "", err
//	}
//
//	log.Printf("rsp[%v]\n", string(retData_))
//
//	return string(retData_), nil
}

func download(u string) *http.Response{
	fmt.Println("[download] ",u)
	//res,err:=http.Get(u)
	res,err:=get(u)
	if err!=nil {
		fmt.Println("[被封了]",err)
		u1:=img_url(now())
		return download(u1)
	}
	fmt.Println("[download] ",res.StatusCode)
	if res.StatusCode != 200{
		return download(u)
	}
	defer res.Body.Close()

	file,_:=os.Create("code.jpg")
	defer file.Close()

	w,_:=io.Copy(file,res.Body)
	fmt.Println("[download] ",w)

	if w<400 {
		fmt.Println("[download] <400")
		u1:=img_url(now())
		return download(u1)
	}
	fmt.Println("[验证码来了,快去看看code.jpg。。]:")
	return res
}


func login(last *http.Response,s string) (*http.Response,error){
	d1:=map[string]string{
        "userName": "",
        "province": pick(PROVINCE), //"北京市"
        "job": pick(JOB), //"销售|客服|市场"
        "email": "",
        "mobile": "",
        "address": "",
        "verifyCode": s,
    }
	d:=map[string]string{
        "_ZVING_METHOD": "Register.doAnonymousLogin",
        "_ZVING_URL": "%2Findex",
        "_ZVING_DATA": to_json(d1),
        "_ZVING_DATA_FORMAT": "json",
    }
	fmt.Println("[login]",d)
	return post(last,SERVER,d)
}

func vote(last *http.Response,i int) (*http.Response,error){
	    var dd Draft
        dd.DraftID=3654
		dd.ID=fmt.Sprintf("%v", i)
		j,_:=json.Marshal(dd)
		d:=map[string]string{
              "_ZVING_METHOD" : "SupportOppose.voteOppose",
              "_ZVING_URL" : "%2FdraftDetail",
              "_ZVING_DATA" : string(j),
              "_ZVING_DATA_FORMAT" : "json",
        }
		//fmt.Println("[vote]",i)
		return post(last,SERVER,d)
}

//------------------------------------------------------------------------------------------------

func get_code() *http.Response{
	img:=img_url(now())
	return download(img)
}



func vote0(r1 *http.Response,code string) (bool){
		r2,e:=login(r1,code)
		if e!=nil {
			fmt.Println("[被封了]:重启一下猫或飞行模式换个ip")
			vote1()
			return false
		}
		defer r2.Body.Close()

		b, _ := ioutil.ReadAll(r2.Body)
		fmt.Println("[login]:",r2.Status,string(b))

		var lr LoginResult
		err := json.Unmarshal(b, &lr)
		if err!=nil {
			fmt.Println("验证码错误")
		}
		if lr.ZvingStatus == 0 {
			fmt.Println("验证码错误")
			return false
		}
		if r2.StatusCode!=200 {
			

		}else{
			for i:=123166;i<123215;i++{
				r3,e:=vote(r2,i)
				if e!=nil {
					fmt.Println("[被封了]:重启一下猫或飞行模式换个ip")
					vote1()
					break
				}else{
					if r3.StatusCode == 200 {
						defer r3.Body.Close()	
						b, _ := ioutil.ReadAll(r3.Body)
						bb:=string(b)
						fmt.Println("[vote]:",i,r3.Status,bb)
					}else{
						fmt.Println("[vote]:",i,r3.Status)
					}
				}
				time.Sleep(time.Second*2)
			}
			return true
		}
		return false
}


func vote1(){
	r1:=get_code()
    input:=bufio.NewScanner(os.Stdin)
	for input.Scan(){
		code:=input.Text()
		fmt.Println("[code]:",code)
		vote0(r1,code)
		r1=get_code()
	}
}


//ocr
func vote2(){
	for {
		fmt.Println("iii",Q) 
		r1:=get_code()
		code:=Reco()
		if len(code) !=5 {
			vote2() 
			return 
		}
		fmt.Println("sss",code) 
		ok:=vote0(r1,code)
		if ok {
			Q++
			fmt.Println("休息一分钟") 
			time.Sleep(time.Second*60)
		}
	}

}

func main() {
	//vote1()
	vote2()
}

