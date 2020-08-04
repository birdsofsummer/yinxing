defmodule Sign do

   env? = fn (x,y) -> if (System.get_env x) == nil, do: y,  else:  (System.get_env x) end
   @secret_id   env?.("SecretId","")
   @secret_key  env?.("SecretKey","")
   @region      env?.("Region","ap-guangzhou")

   @sign_method "HmacSHA256"
   @module      "apigateway"
   #@method      "POST"
   @method      "GET"
   @prefix      "https://"
   @version      "v2"
   @host         ".api.qcloud.com/v2/index.php"
   @headers [
        {"Content-type","application/json"}
   ]
   @testd [{"Action","DescribeApiKeysStatus"}]
   @testd1 [
       # {"Region","ap-guangzhou"},
        {"Action","describeapikeysstatus"},
        {"offset",0},
        {"limit",2},
        {"orderby","createdtime"},
        {"order","desc"},
  ]
  @echo "https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/"



  def sep (s \\ "-") do
      IO.puts 1..80 |> Enum.map(fn _->s end) |> List.to_string
  end

   @doc """
        z=[{"x", 1}, {"y", 2},{"y",2222}]
        Map.new z 
        %{"x" => 1, "y" => 2222}
        list2map z
        %{"x" => 1, "y" => 2}
   """
   def list2map (z) do
        for {k,v} <- z ,reduce: %{} do 
               acc->Map.put_new(acc,k,v) 
        end 
   end

   def timestamp() do
       DateTime.utc_now
       |>DateTime.to_unix
       |>to_string
   end


   @doc"""
       0000111
       这种不行!!!
   """
   def random1(n \\ 4) do 
        :random.uniform
        |>:erlang.abs
        |>to_string 
        |>fn x->"1"<> String.slice(x,3,3+n) end .()
   end

   def random() do
        :rand.normal()*100000 
        |>:erlang.trunc
        |>:erlang.abs 
        |>to_string 
       # |>Integer.parse 
       # |>elem(0)   
   end

   def encode(
       s\\"",
       sign_method \\@sign_method, 
       secret_key \\ @secret_key
   ) do
        sha1=fn key,s->:crypto.hmac(:sha, key,s) |> Base.encode64 end
        sha256=fn key,s->:crypto.hmac(:sha256, key,s) |> Base.encode64 end
        
        f=case sign_method do
            "HmacSHA1"-> sha1
            "HmacSHA256"->sha256
            _-> sha1
        end
        f.(secret_key,s)
   end

   def qs(a \\ []) do
         a
         |>fn x-> :lists.sort(x) end.()
         |>Enum.map(fn {x,y}->:lists.join('=',[x,y])  end)
         |>Enum.map(fn x->:lists.concat(x) end) 
         |>fn x-> :lists.join('&',x) end .() 
         |>fn x-> :lists.concat(x) end.()
         |>to_string
   end

   def qs1(a \\ []) do
       a 
       |>fn x->:lists.sort x end.() 
       |>Enum.map(fn {x,y}->(x|>to_string)<>"="<>(y|>to_string) end) 
       |>Enum.reduce("",fn y,x->x<>"&"<>y end) 
       |>String.trim("&")
    end

   def escape (s \\ "") do
        s
        |>String.to_charlist
        |>:edoc_lib.escape_uri
        |>to_string   
   end

   def qs2 (m \\ %{}) do
         m
         |>Map.to_list
         |>Enum.map(fn {k,v}-> [Sign.escape(k),Sign.escape(v)] end)
         |>Enum.reduce("",fn  [k,v],acc ->k<>"="<> v<>"&"<>acc end) 
         |>String.trim("&")     
   end

   def sign(
              a \\ @testd, 
              module \\ @module,
              m \\ @method
        ) do
        d=[
              #{"Action",""},
               {"Nonce", random()},
               {"Region", @region},
               {"SecretId", @secret_id},
               {"SignatureMethod", @sign_method},
               {"Timestamp",timestamp()},
              #{"Token",""},
        ]
        #a优先
        d1=d ++ a 
        |>Map.new 
        mm=d1["SignatureMethod"]

        d2=d1|>Map.to_list
         
        s=String.upcase(m) <>  module<>@host <> "?" <> qs1(d2)
        signature = encode(s,mm,@secret_key)

        sep
        IO.puts s
        IO.puts mm
        IO.puts signature
        sep

        Map.new [{"Signature",signature} | d2 ]
   end

   def gen_url(
       a \\ [],
       module \\ @module,
       m \\ @method
   ) do
         b=sign a,module,m
         c=b |> qs2
         @prefix<>module<>@host<>"?"<>c
   end

   def gen_url1( module \\ @module)do
       @prefix<>module<>@host
   end

   def post( 
       h1 \\ [],
       u \\ "https://www.baidu.com",
       b \\ ""
   ) do
        u1=u|>String.to_charlist
        b1=b|>String.to_charlist
        :application.start(:inets)
        profile = :crypto.strong_rand_bytes(4) 
        |> Base.encode16 
        |> String.to_atom
        {:ok, pid} = :inets.start(:httpc, profile: profile)
        :ssl.start()
        r=:httpc.request(:post, {u1, h1,'application/json', b1 }, [], [],pid)
        |> elem(1) 
        |> elem(2) 
        |> IO.iodata_to_binary 
        |> to_string
        :ssl.stop()
        :inets.stop(:httpc, pid)        
        r
    end

    def get(
            h1 \\ [],
            u \\ "https://www.baidu.com"
        ) do

        u1=u |> String.to_charlist
        :application.start(:inets)
        h2= @headers ++ h1
        |>Map.new
        |>Map.to_list
        |>Enum.map(fn {k,v}-> {String.to_charlist(k),String.to_charlist(v)} end)
        profile = :crypto.strong_rand_bytes(4) 
        |> Base.encode16 
        |> String.to_atom
        {:ok, pid} = :inets.start(:httpc, profile: profile)
        :ssl.start()
        r=:httpc.request(:get, {u1, h2}, [], [],pid)
        |> elem(1) 
        |> elem(2) 
        |> IO.iodata_to_binary 
        |> to_string
        :ssl.stop()
        :inets.stop(:httpc, pid)        
        r
    end

   def test_qs do
     a=[
        {'Action','DescribeApiKeysStatus'},
        {'offset',0},
        {'limit',2},
        {'orderby','createdTime'},
        {'order','desc'},
     ]
     qs a
   end

   def test1 do
         IO.puts gen_url @testd,@module
         #sign @testd,@module
   end

   def test2 do
      h=[]
      u1=gen_url @testd,@module
      IO.puts u1
      get h,u1
   end

   def test3 do
     d=sign @testd,@module,"POST"
     u=gen_url1 @module
     h=[]
     post h,u,d
   end

   def echo do
        h=[{"token","123"}]
        get h,@echo
   end

   def test_encode do
       s="POSTapigateway.api.qcloud.com/v2/index.php?Action=describeapikeysstatus&Nonce=5582558083&Region=ap-guangzhou&SecretId=AKIDlQ2ZnrCd2iI1bx5F9i9dtSn374tsacZc&SignatureMethod=HmacSHA256&Timestamp=1582522636&limit=2&offset=0&order=desc&orderby=createdtime"
       s1=encode s
       s2="QRpGOOl79gqwYhI6TXdoO960v3DBM5nYBp4sijd22TA="
       IO.puts s1==s2
   end

end


