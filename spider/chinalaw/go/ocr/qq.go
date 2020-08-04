package ocr
//package main

import (
	"encoding/json"
	"fmt"
	"os"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/errors"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/regions"
	ocr "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/ocr/v20181119"
	. "../bs64"
)
//https://cloud.tencent.com/document/product/866/17600



var (
		SECRETID=os.Getenv("SecretId")
		SECRETKEY=os.Getenv("SecretKey")
)

type Img struct {
	Action      string `json:"Action"`
	Version     string `json:"Version"`
	Region      string `json:"Region"`
	ImageBase64 string `json:"ImageBase64"`
}
/*
{
  "Action": "GeneralAccurateOCR",
  "Version": "2018-11-19",
  "Region": "ap-guangzhou",
  "ImageBase64": "ddd"
}
*/

func Ocr1(s string) (response *ocr.GeneralAccurateOCRResponse, err error){
	var d=&Img{
		  Action: "GeneralAccurateOCR",
		  Version: "2018-11-19",
		  Region: "ap-guangzhou",
		  ImageBase64: s,
	}
	//fmt.Print(d,"\n")
	j,err:=json.Marshal(d)
	
	if err!=nil{
        fmt.Printf("0000: %s", err)
        return nil,err
	}
	credential := common.NewCredential( SECRETID, SECRETKEY)	
	cpf := profile.NewClientProfile()
	client, _ := ocr.NewClient(credential, regions.Guangzhou, cpf)

	request := ocr.NewGeneralAccurateOCRRequest()
    // `{"Filters":[{"Name":"zone","Values":["ap-guangzhou-2"]}]}`
    err = request.FromJsonString(string(j))
    if err != nil {
            fmt.Printf("1111: %s", err)
			return
    }
    response, err = client.GeneralAccurateOCR(request)
    if _, ok := err.(*errors.TencentCloudSDKError); ok {
    //[TencentCloudSDKError] Code=FailedOperation.UnOpenError, Message=服务未开通，请前往控制台开通相应服务, RequestId=1ed1265e-d8a8-4c86-8192-3afcbed1d1c1
            fmt.Printf("2222: %s", err)
            return
    }
    if err != nil {
            fmt.Printf("3333: %s", err)
	   	    return
    }
    //fmt.Printf("%s", response.ToJsonString())
	return response,err
}

func Reco2(file string) (t string){
	t=""
	s:=Read_base64(file)
	r,err:=Ocr1(s)
	if err!=nil{
		return t
	}
	if len(r.Response.TextDetections) >0 {
		t:=*r.Response.TextDetections[0].DetectedText
		//fmt.Print(t)
		return t
	}else{
		fmt.Printf("%s\n", r.ToJsonString())
		fmt.Print("没找到")
	}
	return t
}

func test_qq(){
	file:="../code.jpg"
	z:=Reco2(file)
    fmt.Print(z)
}
