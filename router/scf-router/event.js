const HTTP_GET_EVENT={
    //"body":"",
	"headerParameters": {},
	"headers": {
		"accept": "*/*",
		"endpoint-timeout": "15",
		"host": "service-xxxx-xxxx.ap-hongkong.apigateway.myqcloud.com",
		"user-agent": "curl/7.61.1",
		"x-anonymous-consumer": "true",
		"x-qualifier": "$LATEST"
	},
	"httpMethod": "GET",
	"path": "/ccc/echo",
	"pathParameters": {},
	"queryString": {
        "x":"1",
        "y":"2",
	},
	"queryStringParameters": {},
	"requestContext": {
		"httpMethod": "ANY",
		"identity": {},
		"path": "/ccc",
		"serviceId": "service-9rx17sto",
		"sourceIp": "5.6.1.2",
		"stage": "release"
    }
}





module.exports={
    HTTP_GET_EVENT,
}
