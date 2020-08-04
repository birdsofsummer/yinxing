//https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


// const statuses = require('statuses');

let CODE_LIST= {
	"100": "100 Continue",
	"101": "101 Switching Protocol",
	"103": "103 Early Hints",
//	"200": "200 OK",
//	"201": "201 Created",
//	"202": "202 Accepted",
//	"203": "203 Non-Authoritative Information",
//	"204": "204 No Content",
//	"205": "205 Reset Content",
//	"206": "206 Partial Content",
	"300": "300 Multiple Choices",
	"301": "301 Moved Permanently",
//	"302": "302 Found",
//	"303": "303 See Other",
//	"304": "304 Not Modified",
	"307": "307 Temporary Redirect",
	"308": "308 Permanent Redirect",
	"400": "400 Bad Request",
	"401": "401 Unauthorized",
	"402": "402 Payment Required",
	"403": "403 Forbidden",
	"404": "404 Not Found",
	"405": "405 Method Not Allowed",
	"406": "406 Not Acceptable",
	"407": "407 Proxy Authentication Required",
	"408": "408 Request Timeout",
	"409": "409 Conflict",
	"410": "410 Gone",
	"411": "411 Length Required",
	"412": "412 Precondition Failed",
	"413": "413 Payload Too Large",
	"414": "414 URI Too Long",
	"415": "415 Unsupported Media Type",
	"416": "416 Range Not Satisfiable",
	"417": "417 Expectation Failed",
	"418": "418 I'm a teapot",
	"422": "422 Unprocessable Entity",
	"425": "425 Too Early",
	"426": "426 Upgrade Required",
	"428": "428 Precondition Required",
	"429": "429 Too Many Requests",
	"431": "431 Request Header Fields Too Large",
	"451": "451 Unavailable For Legal Reasons",
	"500": "500 Internal Server Error",
	"501": "501 Not Implemented",
	"502": "502 Bad Gateway",
	"503": "503 Service Unavailable",
	"504": "504 Gateway Timeout",
	"505": "505 HTTP Version Not Supported",
	"506": "506 Variant Also Negotiates",
	"507": "507 Insufficient Storage",
	"508": "508 Loop Detected",
	"511": "511 Network Authentication Required",
}

const err=async (ctx, next) => {
    for (let k in CODE_LIST){
        let v=CODE_LIST[k]
        ctx["error_" + k ]=(
            msg=v,
            d={},
            code=parseInt(k),
            ok=false,
        )=>{
            ctx.type = 'application/json'
            ctx.response.type = 'application/json'
            ctx.status = code;
            let body1={
                "errorCode":0,
                "errorMessage":msg,
                message:msg,
                code,
                ok,
                data:d, // JSON.stringify
            }
            ctx.body =body1
            //ctx.response.set('token', token);
            //ctx.append('resultCode', code);
            //ctx.append('resultMessage', msg);
        }

    }
    //ctx.redirct
    ctx["go"]=(u="/",s="...",next)=>{
        //ctx.response.redirect(u)
        ctx.status = 302;
        ctx.redirect(u);
        ctx.body =s;
    }
    await next();
}


module.exports=err
