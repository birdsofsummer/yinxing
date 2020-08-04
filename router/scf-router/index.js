const R=require("ramda")
const {URL} = require('url');
const path = require('path')

const {
    to_json,
    compose1,
    is_img,
}=require("../../fp")

const {
    getFileList,
    getFileLists,
}=require("../../io/walk_dir")

const {
    cors_headers,
}=require('./cors')

const {proxy}=require('./proxy')

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
}=require('./res')

const {
    create_ctx,
}=require("./ctx")


const {keys,values}=Object
const {BASE_DIR}=process.env

class Router{
    constructor({prefix,event,context, callback}){
        console.log(event)

        let {body,headers,httpMethod,queryString, path}=event
        let query={...queryString,...to_json(body)}
        this.query=query

        this.ctx=create_ctx({ prefix, event, context, callback, query,})

        this.json=res_json
        this.redirect=redirect
        this.error=res_error
        this.html=res_html
        this.echo=echo
        this.cors_headers=cors_headers
        this.prefix=prefix||""
        this.plugins=[]
        this.static_dir=[]
        this.static_file=[]
        this.router={
            "PUT":{
                "/proxy":proxy,
                "/echo":echo,
            },
            "GET":{
                "/proxy":proxy,
                "/echo":echo,
            },
            "POST":{
                "/proxy":proxy,
                "/echo":echo,
            },
            "DELETE":{
                "/proxy":proxy,
                "/echo":echo,
            },
        }
    }
    prefix(x){
        this.prefix=x
        return this
    }
    use(f){
        this.plugins.push(f)
        return this
    }
    post(path,cb){
        this.router.POST[path]=cb
        return this
    }
    put(path,cb){
        this.router.PUT[path]=cb
        return this
    }
    get(path,cb){
        this.router.GET[path]=cb
        return this
    }
    del(path,cb){
        this.router.DELETE[path]=cb
        return this
    }
    StaticFile(f){
        this.static_file.push(f)
        return this
    }
    StaticFS(...dir){
        let s=this.static_dir
        this.static_dir=[...s,...dir]
        return this
    }
    find_route({event,context, callback,prefix}){
       let {body,headers,httpMethod,queryString, path:p}=event
       let router=this.router;
       let mm=router[httpMethod]
       let pset= new Set(keys(mm))
       let p0=p.replace(prefix,"") || "/"
       let p1=pset.has(p0) ?  p0 : "/" //403?
       let fn=mm[p1] || echo
       return fn
    }
    async run(){

        let {ctx,plugins}=this
        let {event:e,context, callback}=ctx
        let event= e.Message ? to_json(e.Message) : e //定时器

        let {body,headers,httpMethod,queryString, path:p}=event
        let prefix=this.prefix
        let router=this.router;
        //console.log({router,prefix,httpMethod})
        // 静态文件
        let real_path=p.replace(prefix+"/","")
        if (real_path){
            let s=this.static_dir.map(x=>path.resolve(BASE_DIR,x))
            let files=await getFileLists(s)
            let f0=this.static_file
            let f1=[...f0,...R.flatten(files.map(x=>x.files))]
            let p0=path.resolve(BASE_DIR,real_path)
            if (f1.includes(p0)){
                console.log('exist',p0)
                return is_img(p0) ? callback(null,res_img(p0)) : callback(null,res_html(p0))
            }
        }
       //中间件
        if (plugins.length > 0){
            let mid=compose1(plugins);
            try{
                await mid(ctx)
            }catch(e){
                console.log(e)
            }
        }
       //api
       const  fn=this.find_route(ctx)
       await fn(ctx)
       //403
       callback(ctx.res.body)
    }
}

module.exports={
    Router,
}
