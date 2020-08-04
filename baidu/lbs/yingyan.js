//http://lbsyun.baidu.com/index.php?title=yingyan/api/all

const {
    baidu_yingyan_ak="****",
    baidu_yingyan_service_id="*****",
}
const config={
    "ak":baidu_yingyan_ak,
    "service_id":baidu_yingyan_service_id,
}

const api=[
	{
		"res": "entity",
		"api": "add",
		"desc": "创建entity，并赋属性信息"
	},
	{
		"res": "entity",
		"api": "delete",
		"desc": "删除entity"
	},
	{
		"res": "entity",
		"api": "update",
		"desc": "更新entity属性信息"
	},
	{
		"res": "entity",
		"api": "list",
		"desc": "检索符合条件的entity，返回entity属性信息和最新位置。可用于列出entity，也可用于批量查询多个entitiy的位置"
	},
	{
		"res": "entity",
		"api": "addcolumn",
		"desc": "为entity创建一个自定义属性字段，并设置是否为检索字段"
	},
	{
		"res": "entity",
		"api": "deletecolumn",
		"desc": "删除entity的一个自定义属性字段"
	},
	{
		"res": "entity",
		"api": "listcolumn",
		"desc": "列出entity的自定义属性字段"
	},
	{
		"res": "track",
		"api": "addpoint",
		"desc": "为track添加一个最新的轨迹点",
        "data":{
                "ak": "",
                "service_id": 123,
                "entity_name": "",
                "latitude": "",
                "longitude": "",
                "loc_time": 123,
                "coord_type_input": "wgs84",
//                "speed": 1,
//                "direction": "",
//                "height": "",
//                "radius": "",
//                "object_name": "",
//                "column-key": "",
//                "sn": ""
        }

	},
	{
		"res": "track",
		"api": "addpoints",
		"desc": "为track添加多个轨迹点",
        "data":{
                "ak": "",
                "service_id": 123,
                "point_list":  [
                        {
                            "entity_name": "京Q8374W",
                            "loc_time": 1525232703,
                            "latitude": 39.989715,
                            "longitude": 116.437039,
                            "coord_type_input": "wgs84",
                           // "speed":27.23,
                           // "direction":178,
                           // "height":173.3,
                           // "radius":32,
                           // "object_name":"12836",
                           // "city": "beijing",
                           // "province": "beijing",
                        },
                ],
           //     "sn": ""
        }
	},
	{
		"res": "track",
		"api": "getlatestpoint",
		"desc": "查询某 entity 的实时位置，支持纠偏"
        "method":"get",
        "data":{
                "ak": "",
                "service_id": 123,
                "entity_name": "京Q8374W",
                //"process_option": "",
                //"coord_type_output": "",
                //"sn": ""
        }
	},
	{
		"res": "track",
		"api": "getdistance",
		"desc": "查询轨迹里程",
        "method":"get",
        "data":{
                "ak": "",
                "service_id": 123,
                "entity_name": "京Q8374W",
                "start_time": 123,
                "end_time": 567,
            //    "is_processed": "",
            //    "process_option": "",
            //    "supplement_mode": "",
            //    "low_speed_threshold": "",
            //   "sn": ""
        }
	},
	{
		"res": "track",
		"api": "gettrack",
        "method":"get",
		"desc": "轨迹查询与纠偏",
        "data":{
                "ak": "",
                "service_id": "",
                "entity_name": "",
                "start_time": 123,
                "end_time": 456,
           //     "is_processed": "",
           //     "process_option": "",
           //     "supplement_mode": "",
           //     "low_speed_threshold": "",
           //     "coord_type_output": "",
           //     "sort_type": "",
           //     "page_index": "",
           //     "page_size": "",
           //     "sn": ""
        }
	},

	{
		"res": "track",
		"api": "gethistory",
		"desc": "查询某时间段的历史轨迹，支持返回轨迹去噪纠偏后的轨迹点以及里程。"
	},
	{
		"res": "track",
		"api": "addcolumn",
		"desc": "为track增加一个自定义属性字段"
	},
	{
		"res": "track",
		"api": "deletecolumn",
		"desc": "删除track的一个自定义属性字段"
	},
	{
		"res": "track",
		"api": "listcolumn",
		"desc": "列出track的自定义属性字段"
	},
	{
		"res": "fence",
		"api": "create",
		"desc": "创建一个围栏"
	},
	{
		"res": "fence",
		"api": "delete",
		"desc": "删除一个围栏"
	},
	{
		"res": "fence",
		"api": "update",
		"desc": "更新一个围栏"
	},
	{
		"res": "fence",
		"api": "list",
		"desc": "查询围栏列表"
	},
	{
		"res": "fence",
		"api": "querystatus",
		"desc": "查询围栏内被追踪对象的状态"
	},
	{
		"res": "fence",
		"api": "historyalarm",
		"desc": "查询围栏内被追踪对象的历史报警信息"
	},
	{
		"res": "conf",
		"api": "set",
		"desc": "设置配置信息（仅配合MTK2502芯片时使用）"
	},
	{
		"res": "conf",
		"api": "get",
		"desc": "获取配置信息"
	}
]


module.exports={api}
