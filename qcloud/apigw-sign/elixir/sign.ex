defmodule Sign do

  @moduledoc """
     apigateway
     fail -> "{\"message\":\"HMAC signature cannot be verified, the x-date header is out of date for HMAC Authentication\"}\n"
  """
   @server 'https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec'
   @secretid  "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
   @secretkey "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
   @source "ccc"
   @exp 15 *60
   @h1 [
        {"Source" , "ccc"},
        {"X-Token" , "123"},
        {"X-ZZZ" , "123"},
        {"X-Date" , "Thu, 20 Feb 2020 15:36:53 GMT"},
    ]

   def gmt_now do
        #import Utc
        import_file("./utc.ex")
        Utc.now 
   end

   @doc """
     apigateway
   """
   def sign(
            h0 \\ @h1, 
            secretid\\@secretid , 
            secretkey\\@secretkey
        ) do
        join=fn (s1,s2) ->fn h-> h
                    |> Enum.map(fn {k,v}->k<>s1<>v end)
                    |> Enum.join(s2) 
                    end 
        end
        join1=fn (s1,s2) ->fn h-> h
                    |> Enum.map(fn {k,v}->k<>s1<>"\""<>v<>"\"" end)
                    |> Enum.join(s2) 
                    end 
        end
        join_keys=&(Enum.join(Map.keys(&1)," "))
        join_keys1=fn x ->x|> Enum.map(fn {k,_}->k end) |> Enum.join(" ") end
        join_s=join.(": ","\n")
        join_h=join1.("=",", ")
        sha1=fn key,s->:crypto.hmac(:sha, key,s) |> Base.encode64 end
 
        z=for {k,v}<- h0 do
            case k do
            "X-Date"  -> {k,gmt_now()}
            "Date"    -> {k,gmt_now()}
            _         -> {k,v}
            end
        end

        h1= z |> Enum.map(fn{k,v}->{ String.downcase(k),v}end)
            
        signstr=join_s.(h1)
        #IO.puts signstr
        au=[
           {"hmac id" , secretid},
           {"algorithm" , "hmac-sha1"},
           {"headers"  , join_keys1.(h1)},
           {"signature" , sha1.(secretkey,signstr)},
        ]
        [{"Authorization",join_h.(au)}|z]
        |> Enum.map(fn {k,v}-> {String.to_charlist(k),String.to_charlist(v)} end)
    end

    def post(h1,u,b) do
        :application.start(:inets)
        profile = :crypto.strong_rand_bytes(4) 
        |> Base.encode16 
        |> String.to_atom
        {:ok, pid} = :inets.start(:httpc, profile: profile)
        :ssl.start()
        r=:httpc.request(:post, {u, h1,'application/json', b }, [], [],pid)
        |> elem(1) 
        |> elem(2) 
        |> IO.iodata_to_binary 
        |> to_string
        :ssl.stop()
        :inets.stop(:httpc, pid)        
        r
    end

    def test() do
       h1=sign()
       u=@server
       b='{}'
       post(h1,u,b)
    end

    def test_post() do
        post([],'http://www.baidu.com','')  
    end

end

