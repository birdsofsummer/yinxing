package  com.chinalaw.vote

//import android.support.v7.app.AppCompatActivity

//import kotlinx.coroutines.GlobalScope
//import kotlinx.coroutines.launch


import com.beust.klaxon.Json
import com.beust.klaxon.Klaxon
import io.reactivex.Observable
import io.reactivex.rxkotlin.subscribeBy
import io.reactivex.rxkotlin.toObservable
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.Headers.Companion.toHeaders
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.util.*
import java.util.concurrent.TimeUnit


//import io.reactivex.rxjava3.kotlin.*
//import io.reactivex.rxjava3.core.Observable
//import io.reactivex.rxjava3.disposables.CompositeDisposable

//https://github.com/cbeust/klaxon
//https://square.github.io/okhttp/



val klaxon = Klaxon()



//{
//    "grant_type":"a",
//    "client_id":"b",
//    "client_secret":"c"
//}
data class GetTK (
    @Json(name = "grant_type")
    val grantType: String,

    @Json(name = "client_id")
    val clientID: String,

    @Json(name = "client_secret")
    val clientSecret: String
) {
    public fun toJson() = klaxon.toJsonString(this)

    companion object {
        public fun fromJson(json: String) = klaxon.parse<GetTK>(json)
    }
}


//{
//    "refresh_token": "25.b55fe1d287227ca97aab219bb249b8ab.315360000.1798284651.282335-8574074",
//    "expires_in": 2592000,
//    "scope": "public wise_adapt",
//    "session_key": "9mzdDZXu3dENdFZQurfg0Vz8slgSgvvOAUebNFzyzcpQ5EnbxbF+hfG9DQkpUVQdh4p6HbQcAiz5RmuBAja1JJGgIdJI",
//    "access_token": "24.6c5e1ff107f0e8bcef8c46d3424a0e78.2592000.1485516651.282335-8574074",
//    "session_secret": "dfac94a3489fe9fca7c3221cbf7525ff"
//}
data class BaiduToken (
    @Json(name = "refresh_token")
    val refreshToken: String,

    @Json(name = "expires_in")
    val expiresIn: Long,

    val scope: String,

    @Json(name = "session_key")
    val sessionKey: String,

    @Json(name = "access_token")
    val accessToken: String,

    @Json(name = "session_secret")
    val sessionSecret: String
) {
    public fun toJson() = klaxon.toJsonString(this)

    companion object {
        public fun fromJson(json: String) = klaxon.parse<BaiduToken>(json)
    }
}


//{
//    "error_code": 17,
//    "error_msg": "Open api daily request limit reached"
//}

data class OcrFail (
    @Json(name = "error_code")
    val errorCode: Long,

    @Json(name = "error_msg")
    val errorMsg: String
) {
    public fun toJson() = klaxon.toJsonString(this)

    companion object {
        public fun fromJson(json: String) = klaxon.parse<OcrFail>(json)
    }
}


//{"log_id": 4351925948354165243, "words_result_num": 0, "words_result": []}
//{"log_id": 8629435548689304443, "words_result_num": 1, "words_result": [{"words": " he5a"}]}


data class OcrOk (
    @Json(name = "log_id")
    val logID: Long,

    @Json(name = "words_result_num")
    val wordsResultNum: Long,

    @Json(name = "words_result")
    val wordsResult: List<WordsResult>
) {
    public fun toJson() = klaxon.toJsonString(this)

    companion object {
        public fun fromJson(json: String) = klaxon.parse<OcrOk>(json)
    }
}

data class WordsResult (
    val words: String
)


data class PostData (
    val _ZVING_METHOD  : String,
    val _ZVING_URL :  String,
    val _ZVING_DATA :  String,
    val _ZVING_DATA_FORMAT :  String

) {
    public fun toJson() = klaxon.toJsonString(this)
    public fun toForm() :FormBody {
        val d=this
        val b=FormBody
            .Builder()
            .add("_ZVING_METHOD",d._ZVING_METHOD)
            .add("_ZVING_URL",d._ZVING_URL)
            .add("_ZVING_DATA",d._ZVING_DATA)
            .add("_ZVING_DATA_FORMAT",d._ZVING_DATA_FORMAT)
            .build();
        return b
    }

    companion object {
        public fun fromJson(json: String) = klaxon.parse<PostData>(json)
    }
}

//{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}
data class PostResult (
    @Json(name = "_ZVING_STATUS")
    val zvingStatus: Long,

    @Json(name = "_ZVING_MESSAGE")
    val zvingMessage: String
) {
    public fun toJson() = klaxon.toJsonString(this)

    companion object {
        public fun fromJson(json: String) = klaxon.parse<PostResult>(json)
    }
}

//http://zqyj.chinalaw.gov.cn/index
data class VoteConfig (
   val id:Int,
   val from:Int,
   val to:Int
) {
    public fun toJson() = klaxon.toJsonString(this)
    companion object {

        public fun fromJson(json: String) = klaxon.parse<VoteConfig>(json)

        public fun gen() :List<VoteConfig> =listOf(VoteConfig(
            id=3654,
            from=123166,
            to=123214
          )
        )
    }
}



// val u=User.fromJson("""{"userName":"cc"}""")
// val j=u?.job
data class User (
    // @Json(userName = "user_name")
    val userName : String,
    val province : String,
    val job : String,
    val email : String,
    val mobile : String,
    val address : String,
    val verifyCode : String
) {
    public fun toJson() = klaxon.toJsonString(this)
    companion object {
        public fun fromJson(json: String) = klaxon.parse<User>(json)
    }
}


data class Draft (
    val DraftID : String,
    val ID : String
) {
    public fun toJson() = klaxon.toJsonString(this)
    companion object {
        public fun fromJson(json: String) = klaxon.parse<Draft>(json)
    }
}

val env=fun (a:String,b:String)=System.getenv(a) ?: b

class Consts {   companion object Obj {
    val SERVER="http://zqyj.chinalaw.gov.cn/ajax/invoke"
    val PROVINCE=listOf<String>(
        "北京市","天津市","重庆市","上海市","河北省","山西省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省","陕西省","甘肃省","青海省","台湾省","内蒙古自治区","广西壮族自治区","宁夏回族自治区","新疆维吾尔自治区","西藏自治区","香港特别行政区","澳门特别行政区")

    val JOB=listOf<String>(
        "销售|客服|市场","财务|人力资源|行政","项目|质量|高级管理","IT|互联网|通信","房产|建筑|物业管理","金融","采购|贸易|交通|物流","生产|制造","传媒|印刷|艺术|设计","咨询|法律|教育|翻译","服务业","能源|环保|农业|科研","兼职|实习|社工|其他")

    val USER_AGENT_LIST=listOf<String>(
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
        "Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/19.77.34.5 Safari/537.1",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
        "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
        "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
        "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
        "Mozilla/5.0 (X11; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0"
    )

    val H = mapOf<String,String>(
        "User-Agent" to "Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0",
        "Accept" to  "*/*",
        "Accept-Language" to  "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
        "X-Requested-With" to  "XMLHttpRequest",
        "Pragma" to  "no-cache",
        "Cache-Control" to  "no-cache",
        "Content-Type" to "application/x-www-form-urlencoded; charset=UTF-8",
        "referrer" to "http://zqyj.chinalaw.gov.cn/index"
    )

    val BAIDU_TK_SERVER:String="https://aip.baidubce.com/oauth/2.0/token"
    val BAIDU_OCR_SERVER:String="https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic"
    val BAIDU_OCR_CONFIG=mapOf(
        "grant_type" to "client_credentials",
        "client_id" to env("baidu_ocr_APIKey","111"),
        "client_secret" to env("baidu_ocr_SecretKey", "111")
    )


}}







data class ReqConfig (
    var cookie:MutableMap<String,String>,
    var ip : String,
    var headers:MutableMap<String,String>
) {
    public fun toJson() = klaxon.toJsonString(this)
    public fun hasCookie()=this.cookie.size>0
    public fun to_s()=this.cookie.map{it.key+"="+it.value}.joinToString("; ")
    public fun add(c:MutableMap<String,String>){
        this.cookie.putAll(c)
    }
    fun merge(response: Response) : ReqConfig{
        val hs=response.headers

        //val c=hs.get("Date")
        //val c=hs.get("Set-Cookie")
        val c=hs.filter{
            it.first=="Set-Cookie"
        }
            .toString()
        val u1=response.request.url
        val cc=Cookie.parseAll(u1,hs)
        val c1: Map<String, String> =cc.map{Pair(it.name,it.value)}.toMap()
//        println(c1)
//        println("ccccccccccccc"+cc.toString())
//        println("dddddddddd<<<<:"+c)
//        println(hs.toString())
//        val jj:String?=response.request.header("X-Forwarded-For")
//        println("ip:"+jj)

        //val z=cc.map{it.name +"="+it.value}.joinToString("; ")
        //println("zzzzzzzzzz"+z)

        this.add(c1.toMutableMap())
        return this
    }
    public fun get_ip():String{
        return when(this.ip){
            null ->{
                val a=ip()
                this.ip=a
                return a
            }
            else->this.ip
        }
    }
    public fun insert(k:String,v:String){
        this.cookie.put(k,v)
    }
    public fun remove(k:String):ReqConfig{
        this.cookie.remove(k)
        return this
    }
    public fun clear():ReqConfig{
        this.cookie.clear()
        return this
    }
    public fun get_headers():Headers{
        var h1=this.headers
        if (this.cookie.size>0){
            h1.put("Cookie",this.to_s())
        }
        return h1.toHeaders()

    }
    public fun change_ua():ReqConfig{
        this.headers.put("User-Agent",pick(Consts.USER_AGENT_LIST))
        return this
    }
    public fun change_ip():ReqConfig{
        val addr=ip()
        println(addr)
        this.ip=addr
        this.headers.put("X-Forwarded-For",addr)
        this.headers.put("X-Real-Ip",addr)
        return this
    }
    companion object {
        public fun fromJson(json: String) = klaxon.parse<Draft>(json)
        public fun rand() : ReqConfig{
            val ip1=ip()
            var h= mutableMapOf(
                "User-Agent" to pick(Consts.USER_AGENT_LIST),
                "X-Forwarded-For" to ip1,
                "X-Real-Ip" to ip1
            )
            var c=mutableMapOf("14_vq" to "19")
            c.clear()
            return ReqConfig(
                cookie=c,
                ip=ip1,
                headers=h
            )
        }

    }
}




fun base64(x:String):String{
    return Base64.getEncoder().encodeToString(x.toByteArray())
}

fun file2base64(file_path:String="code.jpg"):String{
    val bytes = File(file_path).readBytes()
    return Base64.getEncoder().encodeToString(bytes)
}
fun now():String{
   // if (android.os.Build.VERSION.SDK_INT >= 24){
   //     return SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(Date())
   // }else{
   //     var tms = Calendar.getInstance()
   //     return tms.get(Calendar.YEAR).toString() + "-" + tms.get(Calendar.MONTH).toString() + "-" + tms.get(Calendar.DAY_OF_MONTH).toString() + " " + tms.get(Calendar.HOUR_OF_DAY).toString() + ":" + tms.get(Calendar.MINUTE).toString() +":" + tms.get(Calendar.SECOND).toString() +"." + tms.get(Calendar.MILLISECOND).toString()
   // }
    val t=System.currentTimeMillis()/1000;
    return t.toString()
}

//(0..10).random()
//(0 until 11).random()
fun random(n:Int) : Int{
    //return Random().nextInt(n)
    return (0..n).random()//.toString()
}

fun ip() : String{
    val s=mutableListOf<Int>()
    for (i in 1..4){
        s.add(random(254))
    }
    return s.joinToString(".")
}

fun pick(a:List<String>) : String{
    val n=a.size-1
    val i=random(n)
    return a[i]
}

fun get_headers(
    i:ReqConfig=ReqConfig.rand()
) :Map<String,String>{
        val ip1=i.get_ip()
        val h=mapOf<String,String>(
            "User-Agent" to pick(Consts.USER_AGENT_LIST),
            "X-Forwarded-For" to ip1,
            "X-Real-Ip" to ip1
        )
       val cc =mapOf<String,String>(
           "Cookie" to i.to_s()
        )
        val h1=Consts.H+h
        val h2=when(i.hasCookie()){
            true-> h1+ cc
            else -> h1
        }
     return h2
}


fun headers2cookie(response: Response,hh:ReqConfig=ReqConfig.rand()) : ReqConfig{
    val hs=response.headers

    //val c=hs.get("Date")
    //val c=hs.get("Set-Cookie")
    val c=hs.filter{
            it.first=="Set-Cookie"
        }
        .toString()
    val u1=response.request.url
    val cc=Cookie.parseAll(u1,hs)
    val c1: Map<String, String> =cc.map{Pair(it.name,it.value)}.toMap()
    println(c1)
    println("ccccccccccccc"+cc.toString())
    println("dddddddddd<<<<:"+c)
    println(hs.toString())
    val jj:String?=response.request.header("X-Forwarded-For")
    println("ip:"+jj)

    val z=cc.map{it.name +"="+it.value}.joinToString("; ")
    println("zzzzzzzzzz"+z)
    //todo
    hh.add(c1.toMutableMap())
    return hh
}



fun img_url(t :String): String {
    val prefix="http://zqyj.chinalaw.gov.cn/authCode.zhtml?Height=21&Width=50&"
    return prefix+t
}

fun save(name:String,response:Response) :Boolean{
    val file=File(name)
    var s2:FileOutputStream=FileOutputStream(file)
    val s1=response.body!!.byteStream()
    val total=response.body!!.contentLength()
    val buf=ByteArray(1024*4)
   // println(total)
    var len=0
    var sum:Long=0
    var off=0

    try{
        while(s1.read(buf).apply{len=this}>0){
            s2?.write(buf,off,len)
            sum+=len.toLong()
            val progress=(sum*1.0f/total*100).toInt()
            println(progress)
        }
        s2?.flush()
        s2?.close()
        println("done!:"+sum.toString())

        return when(sum){
            in 0..400 -> false
            else -> true
        }

    }catch(e:IOException){
        println("eeeeeeeeeee")
        return false
    }
}



fun get(u :String) {
    //val cookie="x=1; y=2;";
    val client:OkHttpClient = OkHttpClient();

    //val h=get_headers().toHeaders()
    val h=ReqConfig.rand()
    val h1=h.get_headers()

    val request=Request
        .Builder()
        .url(u)
        .headers(h1)
        //.header("cookie",cookie)
        .get()
        .build()
    client.newCall(request).enqueue(object :Callback{
        override fun onFailure(call: Call, e: IOException) {
        }
        override fun onResponse(call: Call, response: Response) {
            val name="/tmp/code.jpg"
            val code=response.code
            //println(response.body?.string())
            when (code){
              in  200..300 -> {
                        println("ok code:"+code)
                        //println(save(name,response))
                        //val r=save(name,response)
                        //println("save result:"+r.toString())
                        // val s= file2base64(name)

                          //code=ocr(name)
                          //code=show img.....
                          //val tk = get_token()
                          val tk= "24.a1895ecaada4d656a33922e84fdcb90f.2592000.1587889700.282335-18091168"
                          val b=response.body!!.bytes()
                          val s=Base64.getEncoder().encodeToString(b)
                          val code1=ocr(tk,s)
                          println("[code:]"+code1)
                          when(code1){
                               ""->{
                                   println("ocr fail, retry")
                                   return get(u)
                               }
                              else->{
                                   println("ocr maybe ok,try login")
                                   val h2=h.merge(response)
                                   login(h2,code1)
                              }
                          }
                  }
                  else -> println("eeeeee code:"+code)
            }
        }
    })
}

fun get1(u:String,q:Map<String,String>):Call{
    val uu=u+"?" + qs(q)
    println(uu)
    val client:OkHttpClient = OkHttpClient();
    val request=Request
        .Builder()
        .url(uu)
        .build()
    return client.newCall(request)
}

fun post_form(u:String,q:Map<String,String>):Call{
    val b=FormBody
        .Builder()
    q.forEach{b.add(it.key,it.value)}
    val requestBody=b.build();
    val client:OkHttpClient = OkHttpClient();
    val request=Request
        .Builder()
        .url(u)
        .post(requestBody)
        .build()
    return client.newCall(request)
}


fun parse_post_result(str:String):Boolean{
    //val str="""{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}"""
    val r=PostResult.fromJson(str)
    val ok_status:Long=1
    val ok=when(r?.zvingStatus){
        ok_status  -> true
        else  -> false
    }
    return ok
}


fun download(u :String){


}

//https://square.github.io/okhttp/4.x/okhttp/okhttp3/

//headersOf
//  val h1= mapOf (
//      Pair("x","1"),
//      Pair("y", "2")
//  ).toHeaders()

//val requestBody="w=kotlin&b=2"
//    .toString()
//    .toRequestBody(
//        "application/json; charset=utf-8".toMediaType()
//    )


fun post(
    u :String,
    d : PostData,
    config:ReqConfig=ReqConfig.rand()
):Call{
    //println("last:"+config.cookie)
    //println("last:"+config.ip)

    val client:OkHttpClient = OkHttpClient();
    val i=config.ip
    //val h=get_headers(config).toHeaders()
    val h=config.get_headers()
    val requestBody=d.toForm()

    // println(u)
    //  println(requestBody)

    val request=Request
        .Builder()
        .url(u)
        .headers(h)
       //.header("cookie",config.cookie)
        .post(requestBody)
        .build()

    return client.newCall(request)
}


fun get_code(){
    val t=now()
    val img=img_url(t)
    download(img)
}


//{"_ZVING_STATUS":1,"_ZVING_MESSAGE":"Common.Success"}
fun login (
    last:ReqConfig,
    code : String
   ){

//    val z=headers2cookie(last)
//    println("last:"+z.cookie)
//    println("last:"+z.ip)

    val u=User(
        userName =  "",
        province =  pick(Consts.PROVINCE),
        job =  pick(Consts.JOB),
        email =  "",
        mobile =  "",
        address =  "",
        verifyCode = code.toString()
     )
     val d=PostData(
         _ZVING_METHOD =  "Register.doAnonymousLogin",
         _ZVING_URL =  "%2Findex",
         _ZVING_DATA =  u.toJson(),
         _ZVING_DATA_FORMAT =  "json"
     )
     post(Consts.SERVER,d,last)
         .enqueue(object :Callback{
             override fun onFailure(call: Call, e: IOException) {

             }
             override fun onResponse(call: Call, response: Response) {
                 val h0=response.request.headers.toString()
                 println("---->\n"+h0)
                 val sep:()->Unit={println("\n"+"-".repeat(100)+"\n")}
                 sep()
                 val hs=response.headers
                 val c=hs.get("Date")
                 println("dddddddddd<<<<:"+c)
                 println("<----"+hs.toString())
                 sep()

                 val s=response.body!!.string()
                 println(s)
                 val r=PostResult.fromJson(s)
                 when(r?.zvingStatus?.toInt()){
                     1->{
                         println("ok")
                         println("vote...")
                         //cb(response)
                         val cfg=last.merge(response)
                         //vote(cfg,123168)
                         vote1(cfg)
                     }
                     else->{
                         println("login fail")
                         //main()
                         test_get()

                     }
                 }
             }
         })
}


//{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"已过期"}

fun vote(
    last:ReqConfig,
    i : Int,
    draft_id:Int=3654
){
    val dd=Draft(
        DraftID=draft_id.toString(),
        ID =i.toString()
    )
    val d=PostData(
        _ZVING_METHOD = "SupportOppose.voteOppose",
        _ZVING_URL = "%2FdraftDetail",
        _ZVING_DATA = dd.toJson(),
        _ZVING_DATA_FORMAT = "json"
    )

    println("vote %d".format(i))

    //todo
    //val z=headers2cookie(last)
    //val z=ReqConfig.rand()
    //z.merge(last)
    //println(z)

    post(Consts.SERVER,d,last)

    .enqueue(object :Callback{
            override fun onFailure(call: Call, e: IOException) {

            }
            override fun onResponse(call: Call, response: Response) {
                val h0=response.request.headers.toString()
                println("---->\n"+h0)
                val sep:()->Unit={println("\n"+"-".repeat(100)+"\n")}
                sep()

                val s=response.body!!.string()
                println(s)

                try{
                    val r=PostResult.fromJson(s)
                    when(r?.zvingStatus?.toInt()){
                        1->{
                            println("vote ok")
                        }
                        else->{
                            println("vote fail")
                        }
                    }
                }catch(e:Exception){
                    println("vote fail")
                }finally{
                    println("done")
                }
            }
        })

}

//1.get_img
//2.login
//3.vote

fun vote1(
    last:ReqConfig,
    drafts:List<VoteConfig> = VoteConfig.gen()
){
    GlobalScope.launch {
        for (draft in drafts){
            for (i in draft.from..draft.to) {
                println(i)
                vote(last,i)
                delay(1000)
            }
        }
    }
}


fun test_post(){
    val u="https://httpbin.org/post"

    val i=123
    val dd=Draft(
        DraftID=3654.toString(),
        ID =i.toString()
    )
    val d=PostData(
        _ZVING_METHOD = "Suppor=ppose.voteOppose",
        _ZVING_URL = "%2FdraftDetail",
        _ZVING_DATA = dd.toJson(),
        _ZVING_DATA_FORMAT = "json"
    )
    //val d="w=kotlin&b=2"
    //post(u,d);
}

fun test_get(){
    //val u1="https://www.baidu.com"
    //val u2="https://httpbin.org/get"

    GlobalScope.launch{
        for (i in 0..10){
            val u3=img_url(now())
            get(u3)
            delay(60*1000)
        }
    }
}


fun test_parse(){
    val s1="""{"_ZVING_STATUS":0,"_ZVING_MESSAGE":"验证码错误"}"""
    val s2="""{"_ZVING_STATUS":1,"_ZVING_MESSAGE":"验证码错误"}"""
    val a=parse_post_result(s1)
    val b=parse_post_result(s2)
    println(a)
    println(b)
}

fun qs(o:Map<String,String>) :String{
    return o.map{it.key+"="+it.value}.joinToString("&")
}



//{"error_description":"unknown client id","error":"invalid_client"}
fun get_token():String{

    //val uu= "https://httpbin.org/get"
    val res= get1(Consts.BAIDU_TK_SERVER,Consts.BAIDU_OCR_CONFIG).execute();
    when(res.code) {
        200 -> {
            val r:String=res.body!!.string()
            println(r)
            val tk=BaiduToken.fromJson(r)
            println(tk!!.accessToken)
            return tk!!.accessToken
        }
        else->{
            println("eeee:"+res.code)
            return ""
      }
    }

//    get1(u).enqueue(object :Callback{
//            override fun onFailure(call: Call, e: IOException) {
//                println("eeee")
//                println(e)
//            }
//            override fun onResponse(call: Call, response: Response) {
//                val b=response.body.toString()
//                println(b)
//            }
//    })
}



//val tk= "24.b37dd4f158f80ff6d075bdb86835bac6.2592000.1587873263.282335-18091168"
//{"log_id": 6268872972534500219, "error_code": 216101, "error_msg": "param image not exist"}
fun ocr(tk:String,s:String) : String{
    val u=Consts.BAIDU_OCR_SERVER
    val q=mapOf(
        "access_token" to tk,
        "image" to s
    )
    val res=post_form(u,q).execute();
    println(res.code)
    when(res.code) {
        200 -> {
            val r:String=res.body!!.string()
            println(r)
            val  s=OcrOk.fromJson(r)
            val n:Long=s!!.wordsResultNum
            println(n)
            when (n){
                0.toLong() ->{
                    println("nothing")
                    return ""
                }
                else ->{
                    val w=s.wordsResult[0]
                    val w1=w
                        .words
                        .trim()
                        .replace("-","")
                        .replace(".","")
                        .replace(" ","")
                    println("[ocr]:"+w1)
                    val w2=when(w1.length.toInt()){
                        5->w1
                        else ->""
                    }
                    return w2
                }
            }
        }
        else->{
            println("eeee:"+res.code)
            return ""
        }
    }
    return ""
}

fun test_h(){
    var a=ReqConfig.rand()
    println(a)
    var c= mutableMapOf<String,String>("k1" to "v1")
    var c1= mutableMapOf<String,String>("k2" to "v2")
    println(a)
    a.add(c)
    println(a.get_headers())
    a.add(c1)
    println(a.get_headers())
    a.change_ip()
    println(a.get_headers())

    var b=ReqConfig.rand()
    println(b.get_headers())

}

fun tests(){

    val list = listOf("Alpha", "Beta", "Gamma", "Delta", "Epsilon")
    val f={println("zzz")}

    GlobalScope.launch {

        for (i in 10 downTo 1) { // countdown from 10 to 1
            println(i)
            //delay(500)
        }
    }


    val say={x:String->println(x)}
    list.toObservable() // extension function for Iterables
        .filter { it.length >= 5 }
        .subscribeBy(  // named arguments for lambda Subscribers
            onNext = say,
            onError =  { it.printStackTrace() },
            onComplete = {
                println("aaa")
            }
        )
}

fun start(){

    fun vv()=GlobalScope.async{
        for (i in  1..10 ){
            val u3=img_url(now())
            get(u3)
            println(i)
            println(u3)
            print("sleep 1 min\n")
            delay(60_000L)
        }
    }
    val vv1=vv()
    runBlocking{
        vv1.await()
    }
    Thread.sleep(12_000_000L)
}



fun ttt(){
    println("111111")
}



fun echo1(): String{
    val client: OkHttpClient = OkHttpClient();
    val u="https://httpbin.org/get"
    val request= Request
        .Builder()
        .url(u)
        //.headers(h1)
        //.header("cookie",cookie)
        .get()
        .build()
    val res=client.newCall(request).execute()
    val code=res.code
    val body=res.body!!.string()
    println(code)
    println(body)
    return body
    //return "ddd".repeat(100)

}


fun main(){
    //test_parse()
    //test_post()
    //test_h()
    //start()
}
