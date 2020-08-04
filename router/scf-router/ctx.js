const statuses = require('statuses');
const {
    cors_headers,
}=require('./cors')

const {
    to_json,
    drop_keys,
}=require("../../fp")

const {
    set_cookie,
    res_json,
    res_html,
    res_img,
    res_error,
    redirect_req,
    reject_req,
    echo,
    redirect,
    create_body,

}=require('./res')

const { HTTP_GET_EVENT}=require("./event")
const EXTRA_KEYS=['token','sig']

const create_ctx=(a={})=>{

    let { prefix, event, context, callback, query,}=a

    if (!callback){
        callback=console.log
    }

    let {body,headers,httpMethod,queryString, path}=event||HTTP_GET_EVENT

    const params={
        ...to_json(body),
        ...queryString,
    }

    let req_query=drop_keys(EXTRA_KEYS)(params)

    //get无body
    let status=404
    let message=statuses[status]
    let body_404=create_body(404)

    let req=request={
        method: httpMethod,
        url: path,
        header: headers,
    }

    let res=response={
            type:"application/json",
            redirect:(u="/")=>callback(null,redirect(u)),
            message,
            body:body_404,
            header:{},
    }

    let o={
            ...a,
            headers,
            httpMethod,
            params,
            req_query,
            query:queryString,
            queryString,
            path,
            reject_req,
            redirect_req,
            token:{},
            cookies:{

            },
            type:"application/json",
            status,
            body:body_404,  //默认body
            message,
            response,
            res,
            req,
            request,
            json:(
                d={},
                ok=true,
                code=200,
                headers={},
                msg=o.message,
                errorCode=0,
            )=>{
                let h={
                        ...o.res.header,
                        ...headers,
                }
                let r=create_body(code,d,msg,errorCode,ok,h)
                o.status=code
                o.res.body=r
                return  callback(null, r)
            },
            str:(
                d="",
                ok=true,
                code=200,
                headers={},
                msg=o.message,
                errorCode=0,
            )=>{
                let h={
                    'Content-Type': 'text/html; charset=utf-8',
                    //'Content-Type':o.type,
                        ...o.res.header,
                        ...headers,
                }
                let r=create_body(code,d,msg,errorCode,ok,h)

                o.status=code
                o.res.body=r
                return  callback(null, r)
            },
    }

    statuses.codes.forEach(x=>{
        o['error_'+x]=(
            d={},
            msg=statuses[x],
            headers={},
            ok=true,
            errorCode=0,
        )=>{
            let h={
                'Content-Type':o.type,
                ...o.res.header,
                ...headers,
            }
            let r=create_body(x,d,msg,errorCode,ok,h)
            o.res.body=r
            return callback(null,r)
        }
    })

    o.append=(k,v)=>{
        if (!k || !v) throw "????"
        o.res.header[k]=v
        //console.log(o.res.header)
    }
    o.redirect=(u="/")=>callback(null,redirect(u))



    return o
}


module.exports={
    create_ctx,
}
