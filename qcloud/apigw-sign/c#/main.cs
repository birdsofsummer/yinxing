using System;
using System.Security.Cryptography;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
//using System.IO;
using static System.Console;  


namespace SignApplication
{
    class Sign
    {
        static gmt_now(){
            return DateTime.UtcNow.ToString("r");
        }

        static string sha1(string a,string b){
             HMACSHA1 myHMACSHA1 = new HMACSHA1(Encoding.UTF8.GetBytes(a));
             byte[] byteText = myHMACSHA1.ComputeHash(Encoding.UTF8.GetBytes(b));
             return System.Convert.ToBase64String(byteText);
        }

        static string sign(List<Tuple<string, string>> h ,string SecretId ,string SecretKey){
             Func<string,string, string> join1 =(x,y)=> string.Format("{0}=\"{1}\"",x,y);
             Func<string,string[], string> join2 =(x,y)=> string.Join(x,y);

             h1=h.Select( x=> (x.Item1.ToLower(),x.Item2)).ToList<string>();

             k1=h1.Select( x=> x.Item1).ToList<string>();
             string kk=join2(" ",k1);
             
             ss=h1.Select( x=> x.Item1 + ": " + x.Item2).ToList<string>();
             string signStr=join2("\n",ss)

             List<Tuple<string, string>> au=new List<Tuple<string, string>>(){
                 ("hmac id",SecretId),
                 ("algorithm","hmac-sha1"),
                 ("headers", kk),
                 ("signature",sha1(SecretKey,signStr)
             };
             au1=au.Select( x => join1(x.Item1,x.Item2)).ToList<string>();
             string au2=join2(", ",au1);
             return au2;
       }

       static void Main(string[] args)
       {
            //Console.ReadKey();
       }

       static void test_sha1(){
           string a=sha1("x","y");
           string b="LBxi4Eilgk37PtaY7475b1GFo2k=";
           Console.WriteLine(a==b);
       }

       static void  test(){
           string SERVER = "https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec";
           string SECRETID = "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD";
           string SECRETKEY = "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX";
           string SOURCE="ccc";
           string EXP = 15 *60;

           // Tuple<string, string>[] h={ Tuple.Create("x","y"),... }
           List<Tuple<string, string>> h=new List<Tuple<string, string>>(){
                   ("Source" , "ccc")
                   ("X-Token", "123"),
                   ("X-ZZZ", "123"),
                   ("X-Date", gmt_now()),
           };
           string au=sign(h,SECRETID,SECRETKEY);
           Console.WriteLine(au);

           au1=("Authorization",au);
           h.add(au1);

           foreach (var x in  h)
           { 
               string t=x.Item1+":"+x.Item2;
               Console.WriteLine(t);
           }           
       }
    }
}

/*
{
  'Source': 'ccc',
  'X-Token': '123',
  'X-ZZZ': '123',
  'X-Date': 'Thu, 20 Feb 2020 15:36:53 GMT',
  Authorization: 'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="source x-token x-zzz x-date", signature="6SFwUazVPxjw35Ecv8fGxew0rEc="'
}
*/

