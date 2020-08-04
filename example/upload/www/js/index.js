//云函数接收body最大6m
//sdk直传cos无限制
// path ="img/2019/12/01/"
const check_file=({
    name,
    lastModified,
    webkitRelativePath,
    size,
    type},limit=6)=>{
      let max=limit*Math.pow(1024,2)
      if  (!name) {
          return 0
      }
      if (size > max){
          return 0
      }
      if (!/image/.test(type)){
          return 0
      }
      return 1
}

const today=(prefix="img")=>prefix+moment().format('/YYYY/MM/DD/')

const key2url=(Key,Name,Region)=>Name+'.cos.'+ Region +'.myqcloud.com/'+Key
const url2key=(u)=>u.replace(/.*myqcloud\.com\//,'')

const cos2url=(Region='ap-hongkong',data={})=>{
   let {CommonPrefixes,Contents,IsTruncated,Marker,MaxKeys,Name,Prefix,headers,statusCode}=data
   let d=Contents
       .filter(x=>x.Size>0)
       .map(x=>key2url(x.Key,Name,Region))
    return d || []
}

const add_url=(Region,r)=>{
       r.urls=[]
       if (r.statusCode == 200){
            let {CommonPrefixes,Contents,IsTruncated,Marker,MaxKeys,Name,Prefix,headers,statusCode}=r
            r.Contents.forEach(x=>x.url=key2url(x.Key,Name,Region))
            r.urls=cos2url(Region,r)
       }
       return r
}

//jssdk
const list1=async (Region)=>{
       let cos=await get_cos1()
       let data = await cos.list()
       add_url(Region,data)
       return data
}

//api
const list2=async (Region)=>{
       let {ok,data}=await get_json('/api/list')
       add_url(Region,data)
       return data
}


reg_sw('/sw.js')

const loading=init_loading()

var app = new Vue({
     el: '#app',
     vuetify: new Vuetify(),
     data: ()=>({
            rules: [
                value => !value || value.size < 60*Math.pow(1024,2) || 'Avatar size should be less than 6 MB!',
            ],
            SDK_CONFIG:{
                Prefix : "/music/",
                Bucket : 'ttt-1252957949',
                Region : 'ap-hongkong',
            },
            Bucket : 'ttt-1252957949',
            Region : 'ap-hongkong',
            dialog: false,
            current_img:"",
            img:[],
            files:[],
       }),
       filters:{ },
       computed: { },
       watch:{ },
       methods:{
          url2key,
          async init(){
              let Region=this.Region
              loading()
              r2=await list2(Region)
              this.init_img(r2)
              loading("stop")
           },
           init_img(z){
               this.img.push(...z.urls)
               this.files.push(z)
           },
           add({Location}){
                 Location && this.img.push(Location)
           },
           async api_upload(file){
              if (!check_file(file)) {
                   return swal.fire('文件不行')
              }
              let path=today()
              let {ok,data}= await upload2(SERVER,file,path)
              if (ok){
                  //let s="ttt-1252957949.cos.ap-hongkong.myqcloud.com/"
                  //this.img.push(s+data)
                  this.add(data)
              }else{
                   swal.fire('fail')
              }
          },
          async sdk_upload(file){
              if (!check_file(file,20)) {
                   return swal.fire('文件不行')
              }
              path=""
              let r = await upload_cos(file,path)
              // {Location,Bucket,Key,ETag,statusCode,headers}
              console.log(r)
              if (r.statusCode == 200){
                  this.add(r)
              }else{
                   swal.fire('fail')
              }
           },
           async upload(files=[]){
               loading()
               await para(this.api_upload,files)
               loading("stop")
           },
           async upload1(files=[]){
               loading()
               try{
                   await para(this.sdk_upload,files)
               }catch(e){
                   console.log(e)
                   swal.fire('fail')
               }finally{
                   loading("stop")
               }
           },
           async api_del(Key){
               return superagent.post("/api/delete",params={Key})
           },
           async sdk_del(Key="music/20161106130420_PvXLN.jpeg"){
                   let  CONFIG=this.SDK_CONFIG
                   let {cos}=await get_cos1(CONFIG)
                   return cos._deleteObject({...CONFIG,Key})
           },
           async remove(u){
               const {api_del, sdk_del}=this
               const fn=/ttt/.test(u) ? api_del : sdk_del
               let Key=url2key(u)
               let r=await fn(Key)
               if (r.ok || r.statusCode==204){
                       swal.fire('done')
                       let img=this.img
                       this.img=img.filter(x=>x!=u)
               }else{
                       swal.fire('fail')
               }
               this.dialog=false
           },
       },
       created () { },
       async mounted () {
           this.init();
       },
})

