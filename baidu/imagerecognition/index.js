const superagent=require('superagent')
const fs=require('mz/fs')

const {
    base64_clean,
    img2base64,
    img2base641,
    base642img,
}=require('../../fp')

const {
    baidu_imagerecognition_AppID="********",
    baidu_imagerecognition_APIKey="************************",
    baidu_imagerecognition_SecretKey="********************************"
}=process.env

const api={
	"通用物体和场景识别高级版": "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
	"图像主体检测": "https://aip.baidubce.com/rest/2.0/image-classify/v1/object_detect",
	"植物识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant",
	"果蔬识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/classify/ingredient",
	"菜品识别": "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish",
	"红酒识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine",
	"动物识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/animal",
	"地标识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/landmark",
	"货币识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/currency",
	"车型识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/car",
	"车辆检测": "https://aip.baidubce.com/rest/2.0/image-classify/v1/vehicle_detect",
	"车辆外观损伤识别": "https://aip.baidubce.com/rest/2.0/image-classify/v1/vehicle_damage",
	"logo 商标识别-入库": "https://aip.baidubce.com/rest/2.0/realtime_search/v1/logo/add",
	"logo 商标识别-检索": "https://aip.baidubce.com/rest/2.0/image-classify/v2/logo",
	"logo 商标识别-删除": "https://aip.baidubce.com/rest/2.0/realtime_search/v1/logo/delete",
	"自定义菜品识别-入库": "https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/dish/add",
	"自定义菜品识别-删除": "https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/dish/delete",
	"自定义菜品识别-检索": "https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/dish/search",
}

//https://ai.baidu.com/ai-doc/IMAGERECOGNITION/7k3bcxdn8
const get_token=async ()=>{
    const u="https://aip.baidubce.com/oauth/2.0/token"
    const d={
      grant_type: 'client_credentials',
      client_id: baidu_imagerecognition_APIKey,
      client_secret: baidu_imagerecognition_SecretKey,
    }
    let r=await superagent.get(u,d)
    return r.body
}

/*
{
        refresh_token,
        expires_in,
        session_key,
        access_token,
        scope,
        session_secret
}
*/


const post=(url,image,access_token,o={})=>superagent
    .post(url)
    .query({access_token,})
    .send({image,...o})
    .type('form')

const read=(i="img/1.jpg")=>fs.readFile(i).then(x=>x.toString("base64"))
module.exports={
    api,
    post,
}

