const {
    sign,
    check_sign,
    now,
}=require('./index')

const test_sign=()=>{
    let random="xyz"
    let t=now()
    let d={
        "appkey":"xxx" ,
        "random":"ddd",
        "time":t,
        "token":"xxxxx",
        "x":1,
        "y":2,
    }
    {

        let sig=sign(d)
        let d1={
            sig,
            ...d,
        }
        //post(u,d1)
        let a=check_sign(d1)
        console.log(d1,a)

    }

    {
        let d2={...d,"random":"ccc"}
        let sig1=sign(d2)
        let r2={sig:sig1,...d2}
        console.log(r2,check_sign(r2))
    }

    {

        let d3={...d,time:t+1000}
        delete d3['random']

        let sig2=sign(d3)
        let r3={sig:sig2,...d3}
        console.log(r3,check_sign(r3))
    }

}

test_sign()
