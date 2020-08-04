const {
    create_token,
    parse_token,
    refresh_token,
}=require('./index')

const test_token=()=>{

    let d={x:1,y:2}
    let t=3 // 3秒失效
    let key="ccc"
    let aud="*****"
    let sub="+++++"

    //t,key 不填则取默认值
    tk=create_token(d,t,key,aud,sub)
    r2=parse_token(tk,key)

    console.log(tk)
    console.log(r2)

    setTimeout(()=>{
        r3=parse_token(tk,key)
        console.log(1,"秒后",r3)
        r1=refresh_token(tk,5,key) //续5秒
        console.log(r1)
    },1000)


    setTimeout(()=>{
        r4=parse_token(tk,key)
        console.log(t,"秒后",r4)
    },(t+1)*1000)

    //{ ok: false, token: '' }
}

test_token()
