// https://service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/release/bmap?action=search&wd=%E9%95%BF%E6%B2%99%20%E5%8C%BB%E9%99%A2&pn=2



superagent=require('superagent')
test=async ()=>{
    u="https://service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/release/bmap?action=batch"
//        d=[
//                {api:"geocoding",query:{address:"株洲"}},
//                {api:"geocoding",query:{address:"长沙"}},
//                {api:"geocoding",query:{address:"岳阳"}},
//        ]
    d=["株洲","长沙","岳阳"].map(x=>({api:"geocoding",query:{address:x}}))
    r=await superagent
            .post(u)
            .send(d)
            .type('json')
    console.log(r.body)

    u1="https://service-qf7o2c4u-1252957949.gz.apigw.tencentcs.com/release/bmap"
    r1=await superagent
            .get(u1)
            .query({
                address:"华中科技大学",
                city:"武汉",
            })
            .type('json')
    console.log(r1.body)

    let q1={ action: "search", wd: "长沙 医院", pn: "2" }
    let q2={ action: "search", wd: "武汉 火车站"}
    r2=await superagent
            .get(u1)
            .query(q1)
            .type('json')
    console.log(r2.body)

    return r.body
}

test()
