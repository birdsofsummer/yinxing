create_e=(body="")=>({
                "body": body,
                "headerParameters": {},
                "headers": {
                    "accept": "*/*",
                    "content-length": "7",
                    "content-type": "application/x-www-form-urlencoded",
                    "endpoint-timeout": "15",
                    "host": "service-9rx17sto-1252957949.ap-hongkong.apigateway.myqcloud.com",
                    "user-agent": "curl/7.61.1",
                    "x-anonymous-consumer": "true",
                    "x-api-requestid": "08467aa6cc3ea52069d0c806675fc410",
                    "x-b3-traceid": "08467aa6cc3ea52069d0c806675fc410",
                    "x-qualifier": "$LATEST"
                },
                "httpMethod": "POST",
                "path": "/echo",
                "pathParameters": {},
                "queryString": {
                    "x": "1",
                    "y": "2"
                },
                "queryStringParameters": {},
                "requestContext": {
                    "httpMethod": "ANY",
                    "identity": {},
                    "path": "/douban",
                    "serviceId": "service-9rx17sto",
                    "sourceIp": "112.97.38.11",
                    "stage": "release"
                }
            })



module.exports={
    create_e,
}
