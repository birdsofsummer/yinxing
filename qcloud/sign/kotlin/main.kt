package  com.qclode.sign                

fun now():String{
      return  "1582787491"
}

fun random():String{
      return "12345"
}

fun sha1(k:String,s:String) :String{
      val r="zzzzzzzzzz"
      return r
}

fun sha256(k:String,s:String) :String{
      val r="zzzzzzzzzz"
      return r
}

fun sign(h : Array<Pair<String,String>> ,  config : Array<Pair<String,String>>) : String{
    val kk=arrayOf<String>(
          "Action",
          "Region",
          "SecretId",
          "SignatureMethod",
          "Nonce",
          "Timestamp"
     )
    val config1=config.filter{kk.contains(it.key)}
    val h1=config1.toList() + h
    val h2=h1.toMap().toList().toMutableList()
    h2.sortBy({it.first})
    val qs=h2.map{it.first+"="+it.second}.joinToString("&")

    val b=arrayOf(
         config["http_method"],
         config["module"],
         config["HOST"],
         config["path"],
         "?",
         qs
    ).joinToString("")

    val fn= if(config["SignatureMethod"]== "HmacSHA1"){sha1} else {sha256}
    val ss=fn(b,config["SecretKey"])
    return ss
}

fun sign1(d : Array<Pair<String,String>>){
    val env=fun (a:String,b:String)=System.getenv(a) ?: b

    val config=mapOf<String ,String>(
        "SecretId" to env("SecretId", "xxx"),
        "SecretKey" to env("SecretKey", "xxx"),
        "Region" to env("Region", "ap-guangzhou"),
        "module" to env("module", "apigateway"),
        //"SignatureMethod" to "HmacSHA1",
        "SignatureMethod" to "HmacSHA256",
        "Nonce" to random(),
        "Timestamp" to now(),
        "Action" to "",
        "http_method" to "GET",
        "HOST" to ".api.qcloud.com",
        "path" to "/v2/index.php",
        "version" to "v2"
    )

    val Authorization=sign(d,config)
    d+=Pair<String ,String>("Authorization",Authorization)
    d.map{println(it.first+":"+it.second)}
}

fun test(){
    var d =arrayOf<Pair<String,String>>(
           Pair("Region","ap-guangzhou"),
           Pair("Action","describeapikeysstatus"),
           Pair("offset","0"),
           Pair("limit","2"),
           Pair("orderby","createdtime"),
           Pair("order","desc")
     )
     val a=sign1(d)
     println(a)
}


fun main(args: Array<String>){
    test()
}
