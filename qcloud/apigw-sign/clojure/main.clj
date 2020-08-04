(ns clojure.qcloud.apigw.sign
   (:gen-class))


; https://github.com/apigateway-demo/qcloud-apigateway-sign-demo-java
; hmac_sha1 -> base64
(defn sha1 [k,s] 
   "abc"
)

(defn gmt_now []
  ;(import java.util.Date)
   ;; (.format (java.text.SimpleDateFormat. "MM/dd/yyyy") (new java.util.Date))           
  ; "Thu, 20 Feb 2020 15:36:53 GMT" 
  (.toString (java.util.Date.))
)

( defn lower [h]
(map #( list (clojure.string/lower-case (first %1)) (second %1)) h))

( defn joink [h]
  (clojure.string/join " " (map first h)))

( defn join1 [h]
  (clojure.string/join "\n" (map #(clojure.string/join ": " %) h)))


(defn join2  [h]
(clojure.string/join ", " (map #(format "%s=\"%s\"" (first %1) (second %1)) h)))

(defn sign[h,{secretid :secretid, secretkey :secretkey}]
  (def h1 (lower h))
  (def au{
          "hmac id" , secretid,
          "algorithm", "hmac-sha1",
          "headers", (joink h),
          "signature",(sha1 secretkey (join1 h))
   })
  (join2 au)
)

(defn test [] 
  (def h {
         "Source" , "ccc",
         "X-Token" , "123",
         "X-ZZZ" , "123",
         "X-Date" , "Thu, 20 Feb 2020 15:36:53 GMT"
   })

  (def config {
    :server  "https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/sec"
    :server1  "https://service-hc5rz9qa-1252957949.gz.apigw.tencentcs.com/release/"
    :source "ccc"
    :secretid "AKIDEOJ44ea4y6afWpIrIzdcuYV52T81dHvqVKsD"
    :secretkey "k66d99m4gs9f05x6vqgp2yrkrvpdemhhpnhj68FX"
  })

  (conj h  {"Authorization" (sign h config )})
)


(test)
