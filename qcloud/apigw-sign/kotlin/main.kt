package  com.qclode.sign                

fun gmt_now():String{
      return "Thu, 20 Feb 2020 15:36:53 GMT"
}

fun sha1(k:String,s:String) :String{
      val r="zzzzzzzzzz"
      return r
}

fun sign(h : Array<Pair<String,String>>,secretid:String,secretkey :String) : String{
    val kk=h.map{it.first}.joinToString(" ")
    val s=h.map{it.first+": "+it.second}.joinToString("\n")
    val b=arrayOf(
          Pair("hmac id" , secretid),
          Pair("algorithm" , "hmac-sha1"),
          Pair("headers"  , kk),
          Pair("signature" ,sha1(secretkey,s))
    )
    val s1=b.map{"${it.first}=\"${it.second}\""}.joinToString(", ")
    return s1
}



fun test(){
    var h=arrayOf(
       Pair("Source" , "ccc"),
       Pair("X-Token" , "123"),
       Pair("X-ZZZ" , "123"),
       Pair("X-Date" , "Thu, 20 Feb 2020 15:36:53 GMT")
     )
    val SERVER="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec";
    val SERVER1="https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/";
    val SOURCE="ccc";
    val SECRETID="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD";
    val SECRETKEY="k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX";
    val Authorization=sign(h,SECRETID,SECRETKEY)
    h+=Pair("Authorization",Authorization)
    h.map{println(it.first+":"+it.second)}
}


fun main(args: Array<String>){
    test()
}
