package bs64

import (
	"io/ioutil"
	"encoding/base64"
	"fmt"
)

func Read_base64(file string) (string){
    data, err := ioutil.ReadFile(file)
	s:=""
    if err != nil {
        fmt.Println("File reading error", err)
        return s
    }
	s=base64.StdEncoding.EncodeToString(data)
	return s
}

