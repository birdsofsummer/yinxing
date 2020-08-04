now=()=>Math.floor(new Date().getTime()/1e3)
range=(a=0,b=0)=>Array(b-a).fill(0).map((x,i)=>a+i+1)
sleep = (time = 1500) => new Promise(x => setTimeout(x, time))
qs=(x={})=>new URLSearchParams(x)
qs1=(u="",...a)=>{
   let u1=new URL(u.toString())
    for (d of a){
        for (k in d){
            u1.searchParams.append(k,d[k])
        }
    }
    return u1
}

run=(f)=>async (d1=[])=>{
    let r=await Promise.allSettled(d1.map((x,i)=>f(x))) //...
    return r
        .filter(x=>x.status=="fulfilled")
        .map(x=>x.value ?? [] )
        .flat()
}

run1=(f)=>async (d1=[],size=10,t=5000)=>{
    let n=Math.ceil(d1.length/size)
    console.log("size:",size)
    console.log("round:",n)
    let z=[]
        for (let i=0;i<=n;i++){
            console.log(i,n,size)
            let d2=d1.slice(i*size,(i+1)*size)
            try{
                let r=await run(f)(d2)

                //夹了
                if (r.length == 1 && (r[0].card_type==58)) {
                    console.log("藏起来了")
                    break
                }

                z.push(...r)
                await sleep(t)
            }catch(e){
                console.log(e)
                throw "稍候重试...."
                break
            }
        }

    console.log("all done")
    return z
}


ajax=(u="/",q={})=>fetch(qs1(u,q), {
        "credentials": "include",
        "headers": {
            "User-Agent":"UCWEB/2.0 (MIDP-2.0; U; Adr 9.0.0) UCBrowser U2/1.0.0 Gecko/63.0 Firefox/63.0 iPhone/7.1 SearchCraft/2.8.2 baiduboxapp/3.2.5.10 BingWeb/9.1 ALiSearchApp/2.4",
            //"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "X-Requested-With": "XMLHttpRequest",
            "MWeibo-Pwa": "1",
            "X-XSRF-TOKEN": window.config.st, //
        },
        "referrer": qs1(u,q),//"https://m.weibo.cn/p/index?containerid=230413"+uid+"_-_WEIBO_SECOND_PROFILE_WEIBO&luicode=10000011&lfid=230283"+uid,
        "method": "GET",
        "mode": "cors"
    })
    .then(x=>x.json())
    .then(x=>{

        ok.push(x) //
        console.log("ok",q.page||0)
        return x
    })
    .catch(e=>{
        console.log(e)
        console.log("fail",q.page||0)
        fail.push(q.page||0) //

/*
        let o={
            "ok": 0,
            "data": {
                "cardlistInfo": {
                    "containerid": "1076031222425514",
                    "v_p": 42,
                    "show_style": 1,
                    "total": 7233,
                    "since_id": 4529146702858452
                },
                "cards": []
             }
          }
          return o
*/

        throw e
      })

//page=Math.ceil(res.data.cardlistInfo.total/10)
search=(uid="",word="",page=1)=>{
    let u="https://m.weibo.cn/api/container/getIndex"
    let q={
            "profile_containerid" : "231802_7076832004",
            "profile_uid" : uid,
            "disable_sug" : "1",
            "diabled_eject_animation" : "1",
            "disable_hot" : "0",
            "trans_bg" : "0",
            "disable_history" : "1",
            "hint" : "搜他的微博",
            "luicode" : "10000011",
            "lfid" : "230413" + uid + "_-_WEIBO_SECOND_PROFILE_WEIBO",
            "container_ext" : "profile_uid:" + uid + "|hint=搜他的微博|nettype:|gps_timestamp:"+now(),
            "containerid" : "100103type=401&t=10&q="+word,
            "page_type" : "searchall",
            "page" : page,
    }
    return  ajax(u,q)
}

get=(uid="")=>(page=1)=>{
    console.log("begin",page)
    let u="https://m.weibo.cn/api/container/getIndex"
    let q={
        'containerid' : '230413'+uid+'_-_WEIBO_SECOND_PROFILE_WEIBO',
        'luicode' : '10000011',
        'lfid' : '230283'+uid,
        'page_type' : '03',
        'page' : page,
    }
    return  ajax(u,q)
}



/*
{ "ok": 0, "msg": "还没有人赞过" }
page=.data.max
d=.data.data
size=41

{
  "ok": 1,
  "msg": "数据获取成功",
  "data": {
    "max": 2,
    "total_number": 58,
    "data": []
  }
}

*/

get_zan=(id="4530182154625636",page=1)=>{
    u="https://m.weibo.cn/api/attitudes/show"
    q={
        id,
        page,
    }
    return ajax(u,q)
}


/*

{"ok":0}

{
  "ok": 1,
  "data": {
    "data": [],
    "total_number": 50,
    "status": {
      "comment_manage_info": {
        "comment_permission_type": -1,
        "approval_comment_type": 0
      }
    },
    "max_id": 109983044374075,
    "max": 3,
    "max_id_type": 0
  }
}
size=20
.data.total_number
.data.data
.data.max_id  0 ? exit : loop(max_id,...)
.data.max



https://m.weibo.cn/detail/4530182154625636#comment
*/
get_comment=(id="4530182154625636",max_id=0)=>{
    u="https://m.weibo.cn/comments/hotflow?"
    q0={
        id,
        mid:id,
        max_id_type:0,
    }
    q1={
        id,
        mid:id,
        max_id,
    }
    return max_id ? ajax(u,q1) :ajax(u,q0)
}


/*
{
  "ok": 0,
  "msg": "还没有人转发过"
}

{
	"ok": 1,
	"msg": "数据获取成功",
	"data": {
		"data": [],
		"total_number": 13,
		"hot_total_number": 0,
		"max": 2
	}
}

size=10
.data.data

.data.total_number
.data.hot_total_number
.data.max  [1..max]

*/
get_repost=(id="4530182154625636",page=1)=>{
    u="https://m.weibo.cn/api/statuses/repostTimeline"
    q={
        id,
        page,
    }
    return ajax(u,q)
}



// https://m.weibo.cn/u/1222425514
// 粉丝群
// 3842913648195853
// https://weibo.com/p/2304913842913648195853
start=(UID="1222425514")=>{
    ok=[]
    fail=[]
    //"statuses_count": 6894/10=690页
    todo=range(0,690)
    let f=get(UID)
    return run1(f)(todo,5,1e4)
}



//https://m.weibo.cn/u/1638965542
start1=async (UID="1638965542",from=0,to=Infinity)=>{
    let uu="https://m.weibo.cn/u/"+UID
    console.log(uu)
    //location.href=uu

    ok=[]
    fail=[]

    let size=5
    let sleep_time=3*1e3     // 5/10s

    let f=get(UID)
    let r=await f(1)
    let total0=Math.ceil(r.data.cardlistInfo.total/10)
    let total=Math.min(to,total0)

    let n=Math.ceil(total/size)
    let total_time=n*sleep_time/(60*1e3)

    console.log("total %d/%d = %d ,may take %d min",total,size,n,total_time)
    let todo=range(from,total)
    return run1(f)(todo,size,sleep_time)
}

download=(d=[],name)=>{
    var blob = new Blob([JSON.stringify(d, null, 2)], {type : 'application/json'});
    var url = URL.createObjectURL(blob);
    a=document.createElement('a')
    a.href=url
    a.download= name  +".json"
    document.body.appendChild(a)
    a.click()

}

save=()=>{
    text=ok
        .flatMap(x=>x.data.cards)
        .filter(x=>x.card_type!=58)

    text1=ok
        .flatMap(x=>x.data.cards)
        .filter(x=>x.card_type==9)
        .filter(x=>/美国/.test(x?.mblog?.text))



    user=text
        .filter(x=>x.card_type==9)?.[0]?.mblog?.user?.screen_name ?? new Date().getTime()


    download(text,user)
    download(text1,user+"_usa")
}

