http://lbs.baidu.com/index.php?title=webapi/appendix


https://service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/release/bmap?address=华中科技大学





```json
{
	"地点检索": "/place/v2/search",
	"地点检索V2.0": "webapi/guide/webservice-placeapi",
	"境外地点检索V1.0": "webapi/guide/webservice-placeapi-abroad",
	"地点输入提示": "/place/v2/suggestion",
	"地点输入提示V2.0": "webapi/place-suggestion-api",
	"境外地点输入提示V1.0": "webapi/place-suggestion-api-abroad",
	"正/逆地理编码": "",
	"地理编码": "webapi/guide/webservice-geocoding",
	"全球逆地理编码": "webapi/guide/webservice-geocoding-abroad",
	"轻量级轨迹服务": "",
	"轨迹纠偏API": "webapi/guide/trackrectify",
	"轨迹重合率分析API": "webapi/guide/trackmatch",
	"路线规划": "webapi/direction-api-v2",
	"轻量级路线规划": "webapi/directionlite-v1",
	"境外路线规划 V1.0": "webapi/direction-api-abroad",
	"货车路线规划": "webapi/direction-api-truck",
	"批量算路": "webapi/route-matrix-api-v2",
	"货车批量算路": "webapi/route-matrix-truck",
	"普通IP定位": "webapi/ip-api",
	"智能硬件定位": "webapi/intel-hardware-api",
	"鹰眼轨迹": "yingyan/api/v3/all",
	"实时路况查询": "webapi/traffic",
	"时区": "webapi/guide/timezone",
	"批量服务": "webapi/guide/batch",
	"推荐上车点": "webapi/parking-api",
	"坐标转换": "webapi/guide/changeposition",
	"地图调起": "uri",
	"静态图": "static",
	"全景静态图": "viewstatic",
	"附录": "webapi/appendix"
}

```

http://api.map.baidu.com/place/v2/search?query=ATM机&tag=银行&region=北京&output=json&ak=您的ak
http://api.map.baidu.com/place_abroad/v1/search?query=东京塔&page_size=10&page_num=0&scope=1&region=东京&output=json&ak=您的ak
http://api.map.baidu.com/place/v2/suggestion?query=天安门&region=北京&city_limit=true&output=json&ak=你的ak
http://api.map.baidu.com/place_abroad/v1/suggestion?query=东京&region=东京&output=json&ak=你的ak
http://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=您的ak&callback=showLocation
http://api.map.baidu.com/reverse_geocoding/v3/?ak=您的ak&output=json&coordtype=wgs84ll&location=31.225696563611,121.49884033194
http://api.map.baidu.com/directionlite/v1/driving?origin=40.01116,116.339303&destination=39.936404,116.452562&ak=您的AK
http://api.map.baidu.com/direction/v2/transit?origin=40.056878,116.30815&destination=31.222965,121.505821&ak=您的AK
http://api.map.baidu.com/direction_abroad/v1/driving?origin=40.702963,-73.907852&destination=40.625416,-73.960852&ak=您的AK
http://api.map.baidu.com/logistics_direction/v1/truck?origin=40.702963,-73.907852&destination=40.625416,-73.960852&ak=您的AK
http://api.map.baidu.com/routematrix/v2/driving?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK
https://api.map.baidu.com/routematrix/v2/driving?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK 
http://api.map.baidu.com/routematrix/v2/walking?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK
https://api.map.baidu.com/routematrix/v2/walking?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK
http://api.map.baidu.com/routematrix/v2/riding?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK
https://api.map.baidu.com/routematrix/v2/riding?output=json&origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK
http://api.map.baidu.com/logistics_routematrix/v1/truck?origins=40.45,116.34|40.54,116.35&destinations=40.34,116.45|40.35,116.46&ak=您的AK
http://api.map.baidu.com/location/ip?ak=您的AK&ip=您的IP&coor=bd09ll
https://api.map.baidu.com/location/ip?ak=您的AK&ip=您的IP&coor=bd09ll
http://api.map.baidu.com/traffic/v1/road?road_name=东二环&city=北京市&ak=你的AK
http://api.map.baidu.com/timezone/v1?coord_type=wgs84ll&location=-36.52,174.46&timestamp=1473130354&ak=你的ak
http://api.map.baidu.com/parking/search?location=116.313064,40.048541&coordtype=bd09ll&ak=你的ak
http://api.map.baidu.com/geoconv/v1/?coords=114.21892734521,29.575429778924&from=1&to=5&ak=你的密钥
http://api.map.baidu.com/staticimage/v2?ak=E4805d16520de693a3fe707cdc962045&width=280&height=140&zoom=1
http://api.map.baidu.com/panorama/v2?ak=你的ak&location=116.313393,40.047783&poiid=123&panoid=123



post

http://api.map.baidu.com/batch


```json
{
    "reqs":[
        {
            "method":"get",
            "url":"/geocoding/v3/?address=重庆市沙坪坝区学城大道62号&ak=你的ak&output=json"
        },
        {
            "method":"get",
            "url":"/reverse_geocoding/v3/?location=35.658651,119.745415&output=json&entensions_poi=0&ak=你的ak"
        }
    ]
}

```


http://api.map.baidu.com/rectify/v1/track?


https://api.map.baidu.com/locapi/v2 
```json
{
	"ver": "1.0",
	"trace": false,
	"prod": "test_loc_api",
	"src": "baidu_loc_api",
    "key": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"body": [{
			"bts": "460,0,4189,8869,-63",
			"output": "JSON",
			"accesstype": 0,			           

"macs":"70:ba:ef:d0:87:91,-42,|70:ba:ef:d1:0e:01,-45,|70:ba:ef:cc:98:11,-56,|dc:fe:18:c9:94:ce,-87,|58:60:5f:68:d8:30,-89,|94:d9:b3:cf:a2:db,-91,|30:fc:68:ac:c6:ae,-91,|c8:3a:35:32:48:c8,-94,",
			"imei": "xxxxxxxxxxxxxxx",
			"ctime": "1551178833",			
"nearbts":"460,0,4189,33989,-81|460,0,4189,8868,-83|460,0,4189,33988,-84|460,0,4189,239,-86|460,0,4189,32659,-98|460,0,4189,8867,-99",
			"cdma": 0,
			"need_rgc": "Y",
			"network": "GPRS"
		},
		{
			"accesstype": 0,
			"imei": "xxxxxxxxxxxxxxx",
			"clientip": "232.111.11.240",
			"cdma": 0,
			"imsi": "xxxxxxxxxxxxxxx",
			"network": "GPRS",
			"bts": "510,11,25182,40081,-83",
			"macs": "e0:36:76:e8:11:78,-18,1",
			"coor": "bd09ll",
			"output": "JSON",
			"ctime": "1551178833",
			"need_rgc": "Y"
		},
		{
			"accesstype": 0,
			"imei": "xxxxxxxxxxxxxxx",
			"cdma": 0,
			"imsi": "xxxxxxxxxxxxxxx",
			"network": "GSM",
			"bts": "460,0,4163,21297934,-124",
			"nearbts": "460,0,-1,-1,13|460,0,-1,-1,29",

"macs":"C8:E7:D8:33:B4:7C,-52,73cun|8C:A6:DF:DF:4B:14,-54,nolimit|E4:6F:13:CC:15:41,-57,weizhiweikeyong|E4:6F:13:CC:15:40,-64,WZWIT|66:14:4B:55:C8:48,-69,CMCC|54:B1:21:A6:81:D5,-73,HUAWEI-E5573-81D5|02:6B:E7:92:B1:73,-76,VANS|20:F4:1B:B6:9F:46,-78,ydnc",
			"coor": "GCJ02",
			"output": "JSON",
			"ctime": "1551178833",
			"need_rgc": "Y"
		}
	]
}


```
