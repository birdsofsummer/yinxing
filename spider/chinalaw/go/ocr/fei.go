package ocr

/**
 * 印刷文字识别WebAPI接口调用示例接口文档(必看)：https://doc.xfyun.cn/rest_api/%E5%8D%B0%E5%88%B7%E6%96%87%E5%AD%97%E8%AF%86%E5%88%AB.html
 * 上传图片base64编码后进行urlencode要求base64编码和urlencode后大小不超过4M最短边至少15px，最长边最大4096px支持jpg/png/bmp格式
 * (Very Important)创建完webapi应用添加合成服务之后一定要设置ip白名单，找到控制台--我的应用--设置ip白名单，如何设置参考：http://bbs.xfyun.cn/forum.php?mod=viewthread&tid=41891
 * 错误码链接：https://www.xfyun.cn/document/error-code (code返回错误码时必看)
 * @author iflytek
 */
import (
	"encoding/json"
	"encoding/base64"
	"crypto/md5"
	"io/ioutil"
	"io"
	"strconv"
	"time"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"os"
)

var (
    XF_SERVER = "http://webapi.xfyun.cn/v1/service/v1/ocr/general"
	APPID = os.Getenv("XUNFEI_OCR_APPID")
	APIKEY = os.Getenv("XUNFEI_OCR_APIKEY")
)


/*
{
  "code": "40202",
  "desc": "illegal access|illegal client_ip: access forbidden",
  "data": "",
  "sid": "wcr0040d2f5@gz560711bea62b460e00"
}
*/

type IpFail struct {
	Code string `json:"code"`
	Desc string `json:"desc"`
	Data string `json:"data"`
	Sid  string `json:"sid"` 
}


/*
{"code":"0","data":{"block":[{"type":"text","line":[]}]},"desc":"success","sid":"wcr0040d974@gz560711bea960460e00"}
{"code":"0","data":{"block":[{"type":"text","line":[{"confidence":1,"location":{"top_left":{"x":15,"y":2},"right_bottom":{"x":49,"y":21}},"word":[{"location":{"top_left":{"x":5,"y":2},"right_bottom":{"x":5,"y":22}},"content":"KC"}]}]}]},"desc":"success","sid":"wcr0040d550@gz560711bea760460e00"}
*/

type OcrOk struct {
	Code string `json:"code"`
	Data Data   `json:"data"`
	Desc string `json:"desc"`
	Sid  string `json:"sid"` 
}

type Data struct {
	Block []Block `json:"block"`
}

type Block struct {
	Type string `json:"type"`
	Line []Line `json:"line"`
}

type Line struct {
	Confidence int64    `json:"confidence"`
	Location   Location `json:"location"`  
	Word       []Word   `json:"word"`      
}

type Location struct {
	TopLeft     RightBottom `json:"top_left"`    
	RightBottom RightBottom `json:"right_bottom"`
}

type RightBottom struct {
	X int64 `json:"x"`
	Y int64 `json:"y"`
}

type Word struct {
	Location Location `json:"location"`
	Content  string   `json:"content"` 
}


func ocr_general(file_name string) (OcrOk,error) {

	curtime := strconv.FormatInt(time.Now().Unix(), 10)
	param := make(map[string]string)
	param["language"] = "en"
	param["location"] = "true"
	tmp, _ := json.Marshal(param)
	base64_param := base64.StdEncoding.EncodeToString(tmp)

	w := md5.New()
	io.WriteString(w, APIKEY+curtime+base64_param)
	checksum := fmt.Sprintf("%x", w.Sum(nil))
	f, _ := ioutil.ReadFile(file_name)
	f_base64 := base64.StdEncoding.EncodeToString(f)
	data := url.Values{}
	data.Add("image", f_base64)
	body := data.Encode()

	client := &http.Client{}
	req, _ := http.NewRequest("POST", XF_SERVER, strings.NewReader(body))
	req.Header.Set("X-Appid", APPID)
	req.Header.Set("X-CurTime", curtime)
	req.Header.Set("X-Param", base64_param)
	req.Header.Set("X-CheckSum", checksum)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	res, _ := client.Do(req)
	defer res.Body.Close()
	res_body, _ := ioutil.ReadAll(res.Body)
	fmt.Print(string(res_body),"\n")
	var r OcrOk
	e:=json.Unmarshal(res_body, &r)
	return r,e
}

func test_xunfei() {
	r,_:=ocr_general("../code.jpg")
	if len(r.Data.Block[0].Line)>0{
		fmt.Print("zzzzzzzzz",r.Data.Block[0].Line[0].Word[0].Content)
	}else{
		fmt.Print("认不出。。。")
	}
}
