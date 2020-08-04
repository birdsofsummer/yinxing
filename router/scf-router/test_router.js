
// curl "https://service-9rx17sto-1252957949.ap-hongkong.apigateway.myqcloud.com/release/douban/proxy?url=http%3A%2F%2Fws.stream.qqmusic.qq.com%2FC400000z6RLz2OWlRY.m4a%3Ffromtag%3D0guid%3D126548448%26vkey%3D4336E3B49853B67BA80715F2B47B1797046C74C179D3E3AD2A743C05DA2C3F9F88D5963008BCBC8A7D146E19E9F39BA15DF7FCCD5726D7F4"
const TEST_MUSIC="http://ws.stream.qqmusic.qq.com/C400000z6RLz2OWlRY.m4a?fromtag=0&guid=126548448&vkey=4336E3B49853B67BA80715F2B47B1797046C74C179D3E3AD2A743C05DA2C3F9F88D5963008BCBC8A7D146E19E9F39BA15DF7FCCD5726D7F4"

const test=async (url=TEST_MUSIC)=>{
    let e={
	"headerParameters": {},
	"headers": {
		"accept": "*/*",
		"endpoint-timeout": "15",
		"host": "service-9rx17sto-1252957949.ap-hongkong.apigateway.myqcloud.com",
		"user-agent": "curl/7.61.1",
		"x-anonymous-consumer": "true",
		"x-qualifier": "$LATEST"
	},
	"httpMethod": "GET",
	"path": "/douban/proxy",
	"pathParameters": {},
	"queryString": {
		url
	},
	"queryStringParameters": {},
	"requestContext": {
		"httpMethod": "ANY",
		"identity": {},
		"path": "/douban",
		"serviceId": "service-9rx17sto",
		"sourceIp": "58.60.1.28",
		"stage": "release"
	}
}
   let r=new Router("/douban")
   d=await r.run(e)
   console.log(d)
    return d
}



const download=(url=TEST_MUSIC,file_name='./1.aac')=>{
    stream = fs.createWriteStream(file_name)
    ajax("get",url).pipe(stream)
}

module.exports = {Router,compose,test,download}


