const {conn}=require('../../qcloud/v3')
// @serverless/tencent-scf/library


const TYPES=[
    'timer',
    'cos',
    'cmq',
    'ckafka',
    'apigw',
]

const create_fomator=(a={},{Region}=process.env)=>{

    const {
        Type = "APIGW",
        Properties:{

            //CKafka
            Name="",   // CKafka ID
            Topic="hello",     // ${Name}-${Topic}
            MaxMsgNum=1, // 1..1000
            Offset="latest",

            //timer
            Enable=true,
            CronExpression="*/5 * * * *",

            //cos
            Bucket="ttt",
            Filter={ Prefix:"", Suffix:"", },
            Events="cos:ObjectCreated:*",

            //apigw
            ServiceId,
            StageName="release",
            HttpMethod="ANY",
        },
    }=a

    if ( MaxMsgNum<1 || MaxMsgNum>1000 ){
        throw "MaxMsgNum <- [1..1000]"
    }

    const timer=({
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    }={})=>({
        "FunctionName": FunctionName,
        "Namespace": Namespace,
        "TriggerName": Name,
        "Type": Type,
        "TriggerDesc": CronExpression,
        "Qualifier": Qualifier,
        "Enable": Enable ? 1 : 0 , //"TRUE" :"FALSE"
    })

    const ckafka=({
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    }={})=>({
        "FunctionName": FunctionName,
        "Namespace": Namespace,
        "Type": Type,
        "TriggerName": Name + "-" + Topic,
        "TriggerDesc": JSON.stringify({maxMsgNum:MaxMsgNum,offset:Offset}),
        "Qualifier": Qualifier,
        "Enable": Enable ? "OPEN" : "CLOSE" ,
    })

    const cmq=({
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    }={})=>({
        "FunctionName": FunctionName,
        "Namespace": Namespace,
        "Type": Type,
        "TriggerName": Name + "-" + Topic,
        "TriggerDesc": JSON.stringify({maxMsgNum:MaxMsgNum,offset:Offset}),
        "Qualifier": Qualifier,
        "Enable": Enable ? "OPEN" : "CLOSE" ,
    })

    const cos=({
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    }={})=>({
        "FunctionName": FunctionName,
        "Namespace": Namespace,
        "TriggerName": Bucket,
        // Bucket + ".cos." + Region + ".myqcloud.com",
        // ttt-1252957949.cos.ap-hongkong.myqcloud.com
        // <BucketName-APPID>.cos.<Region>.myqcloud.com)
        "Type": Type,
        "TriggerDesc": JSON.stringify({event:Events,filter:Filter}),
        "Qualifier": Qualifier,
        "Enable": Enable ? "TRUE" :"FALSE" ,
    })
    const apigw=({
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    }={})=>({
        "FunctionName": FunctionName,
        "Namespace": Namespace,
        "TriggerName": FunctionName+"_apigw",
        "Type": Type,
        "TriggerDesc": FunctionName,
        "Qualifier": Qualifier,
        "Enable": "TRUE",
    })

    const common=({
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    }={})=>({
        "FunctionName": FunctionName,
        "Namespace": Namespace,
        "Type": Type,
        "TriggerName": Name,
        "TriggerDesc": FunctionName,
        "Qualifier": Qualifier,
        "Enable": Enable ? "TRUE" :"FALSE" ,
    })


     let f={
         common,
         timer,
         cos,
         cmq,
         apigw,
     }
     let t=Type.toLowerCase()
     return R.propOr(common,t)(f)
}


const create_trigger=async (
    o={
        FunctionName="hello",
        Namespace="",
        Qualifier="",
    },
    a={
      "Type": "APIGW",
      "Properties": {
        "StageName": "release",
        "ServiceId": null,
        "HttpMethod": "ANY"
      }
    },
)=>{
   const c=conn()
   const f=create_formator(a)
   let d=f(o)
   console.log(d)
   let r=await c._CreateTrigger(d)
   console.log(r.TriggerInfo)
   return r
}

module.exports={
    create_trigger,
}
