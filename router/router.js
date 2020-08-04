class Router{
    constructor(){
        this.plugins=[]
        this.router={
            "PUT":{},
            "GET":{},
            "POST":{},
            "DELETE":{},
        }
    }
    use(f){
        this.plugins.push(f)
    }
    post(path,cb){
        this.router.POST[path]=cb
    }
    put(path,cb){
        this.router.PUT[path]=cb
    }
    get(path,cb){
        this.router.GET[path]=cb
    }
    delete(path,cb){
        this.router.DELETE[path]=cb
    }
}

//f=(context,next)=>{...;next()}
const compose=([h,...t])=>ctx=>{
    if (!h) { return ; }
    h(ctx,()=>compose(t)(ctx))
}
module.exports = {Router,compose}

