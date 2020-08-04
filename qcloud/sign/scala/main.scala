import java.util.Date

object Sign {

    def sha1(a :String,b :String): String={
      "11111"+a+b
    }
    def sha256(a :String,b :String):String={
      "22222"+a+b
    }

    def now():String={
      (new Date().getTime/1000).toString
    }
    def random():String={
       scala.util.Random.nextInt(100_100).toString
    }
    def sign ( x: List[(String,String)] ,config:Map[String,String]): Map[String,String] ={
      val kk=List(
        "Action",
        "Region",
        "SecretId",
        "SignatureMethod",
        "Nonce",
        "Timestamp",
       )

       val config1=config.filter{
           case (k,v) => kk.contains(k)
       }

       val z1=config1 ++ x.toMap  

       val qs=z1.toList.sorted.map{case(k,v)=>k+"="+v}.mkString("&")

       val ss=List(
            config("http_method").toUpperCase,
            config("module"),
            config("HOST"),
            config("path"),
            "?",
            qs,
       ).mkString("")
       val f=if (z1("SignatureMethod")== "HmacSHA1") sha1(_,_) else sha256(_,_)
       val z2=z1+("Signature" -> f(config("SecretKey"),ss))

        z2
    }
    def sign1(d: List[(String,String)] ): Map[String,String]={
        val env=scala.util.Properties.envOrElse(_,_)
        val config=Map(
            "SecretId" -> env("SecretId", "xxx"),
            "SecretKey" -> env("SecretKey", "xxx"),
            "Region" -> env("Region", "ap-guangzhou"),
            "module" -> env("module", "apigateway"),
            //"SignatureMethod" -> "HmacSHA1",
            "SignatureMethod" -> "HmacSHA256",
            "Nonce" -> random(),
            "Timestamp" -> now(),
            "Action" -> "",
            "http_method" -> "GET",
            "HOST" -> ".api.qcloud.com",
            "path" -> "/v2/index.php",
            "version" -> "v2"
        )
        sign(d,config)
    }


    def test():Unit={
        val d = List(
            ("Region","ap-guangzhou"),
            ("Action","describeapikeysstatus"),
            ("offset","0"),
            ("limit","2"),
            ("orderby","createdtime"),
            ("order","desc"),
        )
        val d1=d.map{case (k,v)=>(k,v.toString)}
        val c=sign1(d1)
        println(c)
    }

    def main(args: Array[String]): Unit = {
      test()
    }
}

