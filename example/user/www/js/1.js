const get_token=()=> new Date().getTime()

const get=(u="/",d={})=>superagent
    .get("/api/"+u,d)
    .set("Content-type","application/json")
    .set("token",get_token())
    .type('json')
    .then(x=>x.body)

const post=(u="/",d={})=>superagent
    .post("/api/"+u,d)
 //   .set("Content-type","application/json")
    .set("token",get_token())
    .type('json')
    .then(x=>x.body)

class API{
    constructor(prefix="/api/",other=[],){
        this.create=(d)=>post(prefix+"create",d)
        this.delete=(d)=>post(prefix+"delete",d)
        this.update=(d)=>post(prefix+"update",d)
        this.list=()=>get(prefix+"list")
        this.find=(d={})=>get(prefix+"find",d)
        for (let  i of other){
            this[i]=(d={})=>post(prefix+i,d)
        }
    }
}
const say=(d="",ok=true)=>ok ? Swal.fire( `${d}`, "",'success') : Swal.fire({text:`${d}`, icon: 'error',})

const ask=(text="")=>Swal.fire({
      title: 'Are you sure?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
})



crud1=async()=>{
   d={name:"cccc",password:"123456"}
   other=["login","logout","reset"]
   user=new API("",other)
   r=await user.create(d)
   r=await user.update(d)
   r=await user.delete(d)
   r=await user.list()
   r=await user.find(d)
   r=await user.login(d)
   r=await user.logout(d)
   r=await user.reset(d)
}

crud=async ()=>{
     d={name:"cccc",password:"123456"}
     z=await get('list')
     z=await get('find',d)
     z=await post('update',d)
     z=await post('reset',d)
     z=await post('create',d)
     z=await post('delete',d)
     z=await post('login',d)
     z=await post('logout',d)
     z=await post('login',d)
}

init=async ()=>{
    r=await get('list')
    console.log(r)
    if (r.ok){
        user=r.data
        t= document.querySelector('#test')
        t.innerHTML=user.join('<br>')
        console.log(user)
    }
}


test=async()=>{
    await init()
    await crud()
    await crud1()
    r=await superagent.get('list') //没token 401
    console.log(r)
}

//test()
var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
    data: ()=>({
        dialog: false,
        editedIndex: -1,
        editedItem: {
            _id:0,
            username:'xxx',
            password:"123456",
            phone:"15012341234",
            name: '',
            age: 0,
            qq:"",
            email:"",
            grade: 0,
        },
        editedItem1:{
           _id:0,
           password1:"",
           password2:"",
        },
        defaultItem: {
            password:"123456",
            name: '',
            age: 0,
            qq:"",
            phone:"",
            email:"",
            grade: 0,
        },
        user:[ ],
        selected_user:[],
        search:"",
        headers: [
                  { text: 'ID', value: '_id' },
                  { text: '登录名', value: 'username' },
                  {
                    text: '姓名',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                  },
                  { text: '年龄', value: 'age' },
                  { text: '年级', value: 'grade' },
                  { text: 'email', value: 'email' },
                  { text: '手机', value: 'phone' },
                  { text: 'QQ', value: 'qq' },
                  { text: '余额/元', value: 'balance' },
                  { text: '金币', value: 'gold' },
                  { text: 'Actions', value: 'action', sortable: false },
            ],
      }),
    filters:{
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch:{
      dialog (val) {
        val || this.close()
      },
    },
    methods:{
        async list_user(){
            let r=await get('list')
            console.log(r)
            if (r.ok){
               this.user=r.data
            }else{
               say('fail',1)
            }
        },
      editItem (item) {
        this.editedIndex = this.user.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },


      async deleteItem (item) {
        console.log('delete',item)
        const index = this.user.indexOf(item)
        let d=confirm('sure to delete?')
          if (d){
            let {ok,data}=await post("delete",item)
              if(ok){
                this.user.splice(index, 1)
                say("done")
              }else{
                say('fail',1)
              }
          }
      },


      async show_dels(){
            let s=this.selected_user
            console.log('deletes',s)

            if (s.length==0) {
                return say("select sth")
            }
            let user=this.user
            let u=s.map(x=>x.name)
            let ids=s.map(x=>x._id)
            answer=await ask("del!"+u.join(',') )
            if (answer.value){
               let {ok,data}=await post("deletes",{ids})
               if (ok){
                  this.user=user.filter(x=>!ids.includes(x._id))
                  say('done!')
                  this.selected_user=[]
               }else{
                  say("fail",1)
               }
            }
      },

      async resetItem(item){
            let d=this.editedItem1
            console.log(d)
            //重置密码弹窗
            //let {ok,data}=await post("reset",d)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

     async save () {

        if (this.editedIndex > -1) {
            let {ok,data}=await post("update",this.editedItem)
            if (ok){
              say("done")
              Object.assign(this.user[this.editedIndex], this.editedItem)
            }else{
              say("fail",1)
            }
        } else {
            let d=this.editedItem
            let {ok,data}=await post("create",d)
            if (ok){
               let _id=data.insertedId
               this.user.push({...d,_id})
               say("done")
            }else{
               say("fail",1)
            }
        }
        this.close()
      },

    },
    created () {
     // this.initialize()
    },
    mounted () {
        this.list_user()
    },
})



