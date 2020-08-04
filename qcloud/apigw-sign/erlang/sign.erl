-module(sign).
-export([
     sign/3,
     test/0,
     test1/0,
     test_sha/0,
     sha1/2
]).

%-import(rand,[normal/0]).
-import(rfc4627,[encode/1,decode/1]).
-import(base64,[encode_to_string/1]).
-import(day,[gmt_now1/0]).

%c(base64).


-define(CurlHeaders,[ {"user-agent", "curl/7.61.1"} ,{"accept", "*/*"} ]).
-define(Myheader, [
 %        { "connection","Keep-Alive"},
 %        { "pragma","no-cache"},
 %        { "Content-Type", "application/x-www-form-urlencoded" },
 %        { "Content-Type", "text/html"},         
 %        { "Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
 %        { "Accept-Language", "zh-CN,en-US;q=0.7,en;q=0.3" },
 %        { "Upgrade-Insecure-Requests", "1" },
 %        { "Pragma", "no-cache" },
 %        { "Cache-Control", "no-cache" }
          { "User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0" }
       ]).

-define(SERVER,"https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec").
-define(SECRETID , "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD").
-define(SECRETKEY , "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX").
-define(SOURCE,"ccc").
-define(EXP,900).

lower(H)->[{string:to_lower(A),B} || {A,B}<-H].
sha1(SecretKey,S)->
    crypto:start(),
    S1=binary:bin_to_list(crypto:hmac(sha, SecretKey, S)),
    base64:encode_to_string(S1).

join(S1,S2)->fun (H) -> lists:concat(lists:join(S2,[lists:concat([A,S1,B]) ||{A,B}<-H])) end.

join1(S1,S2)->fun(H) ->lists:concat(lists:join(S2,[lists:concat([A,S1,"\"",B,"\""]) ||{A,B}<-H])) end.

join_keys(H)->lists:concat(lists:join(" ",[A||{A,_}<-H])).

sign(H,SecretId, SecretKey)->
    Join_sign=join(": ","\n"), %待签名
    Join_auth=join1("=",", "), % authorization
    H1=lower(H),
    S=Join_sign(H1),
    io:format("~p~n",[S]),
    Au=[
        {"hmac id",SecretId},
        {"algorithm","hmac-sha1"},
        {"headers",join_keys(H1)},
        {"signature",sha1(SecretKey,S)}
       ],
    [{"Authorization",Join_auth(Au)}|H].

http_post(H,Url,PostBody)->
    ssl:start(),
    application:start(inets),
    httpc:request(post, {Url, H,"application/json", PostBody }, [], []).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

test_sha()->
    S1=sha1("x","y"),
    S2="LBxi4Eilgk37PtaY7475b1GFo2k=",
    io:format("~p~n",[S1]),
    io:format("~p~n",[S2]),
    io:format("~p~n",[S1==S2]).

test()->
    Join_sign=join(": ","\n"),
    H=[
      {"Source", "ccc"},
      {"X-Token", "123"},
      {"X-ZZZ", "123"},
      {"X-Date", "Thu, 20 Feb 2020 15:36:53 GMT"}
    % {"Authorization",'hmac id="AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD", algorithm="hmac-sha1", headers="source x-token x-zzz x-date", signature="6SFwUazVPxjw35Ecv8fGxew0rEc="'}
    ],
    S1="source: ccc\nx-token: 123\nx-zzz: 123\nx-date: Thu, 20 Feb 2020 15:36:53 GMT",
    S2=Join_sign(lower(H)),
    io:format("~p~n",[S1]),
    io:format("~p~n",[S2]),
    io:format("~p~n",[S1==S2]),
    sign(H,?SECRETID, ?SECRETKEY).

test1()->
    H=[
      {"Source", "ccc"},
      {"X-Token", "123"},
      {"X-ZZZ", "123"},
      {"X-Date", gmt_now1()}
    ],
    HH=lists:append(?Myheader,H),
    H1 = sign(HH,?SECRETID, ?SECRETKEY),
    D=encode({obj,[{x,1},{y,2}]}),
    http_post(H1,?SERVER,D)
    .


