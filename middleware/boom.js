//https://github.com/hapijs/boom

const boom = require('@hapi/boom')
const {
    Boom,
    badData,
    badGateway,
    badImplementation,
    badRequest,
    boomify,
    clientTimeout,
    conflict,
    entityTooLarge,
    expectationFailed,
    failedDependency,
    forbidden,
    gatewayTimeout,
    illegal,
    internal,
    isBoom,
    lengthRequired,
    locked,
    methodNotAllowed,
    notAcceptable,
    notFound,
    notImplemented,
    paymentRequired,
    preconditionFailed,
    preconditionRequired,
    proxyAuthRequired,
    rangeNotSatisfiable,
    resourceGone,
    serverUnavailable,
    teapot,
    tooEarly,
    tooManyRequests,
    unauthorized,
    unsupportedMediaType,
    uriTooLong,
}=boom


module.exports=async (ctx,next)=>{
    ctx.boom=boom
    await next()
}


/*
    test=()=>{
        r=forbidden()
        r=forbidden("zzzz")
        r=forbidden("zzzz",{x:1,y:2})
    }

{
	"data": {
		"x": 1,
		"y": 2
	},
	"isBoom": true,
	"isServer": false,
	"output": {
		"statusCode": 403,
		"payload": {
			"statusCode": 403,
			"error": "Forbidden",
			"message": "zzzz"
		},
		"headers": {}
	}
}


*/

