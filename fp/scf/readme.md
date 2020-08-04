### event example

```json
{
"timer": {
  "Type": "Timer",
  "Properties": {
    "CronExpression": "*/5 * * * *",
    "Enable": true
  }
},
"cli-appid.cos.ap-beijing.myqcloud.com": {
  "Type": "COS",
  "Properties": {
    "Bucket": "cli-appid.cos.ap-beijing.myqcloud.com",
    "Filter": {
      "Prefix": "filterdir/",
      "Suffix": ".jpg"
    },
    "Events": "cos:ObjectCreated:*",
    "Enable": true
  }
},
"topic": {
  "Type": "CMQ",
  "Properties": {
    "Name": "qname"
  }
},
"pan-php_apigw": {
  "Type": "APIGW",
  "Properties": {
    "StageName": "release",
    "ServiceId": null,
    "HttpMethod": "ANY"
  }
}
}


```

### types

+ APIGW
+ TIMER
+ COS
+ CMQ
+ CKAFKA


```javascript

const Constants = {
      ScfTriggerTypeTimer: 'timer',
      ScfTriggerTypeCos: 'cos',
      ScfTriggerTypeCmq: 'cmq',
      ScfTriggerTypeCkafka: 'ckafka'
}

```

### trigger

del

```json
{
    "FunctionName": null,
    "Namespace": null,
    "TriggerName": null,
    "Type": null,
    "TriggerDesc": null,
    "Qualifier": null
}

```

create

```json
{
    "FunctionName": "hello",
    "Namespace": null,
    "TriggerName": null,
    "Type": null,
    "TriggerDesc": null,
    "Qualifier": null,
    "Enable": null
}

```

### event

timer

```json
{
  "Type": "Timer",
  "Properties": {
    "CronExpression": "*/5 * * * *",
    "Enable": true
  }
}

```
```javascript



    a={
      "Type": "Timer",
      "Properties": {
        "CronExpression": "*/5 * * * *",
        "Enable": true
      }
    }

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

    create_trigger=async (a={},o={})=>{
       const f=create_formator(a)
       let r=await CreateTrigger(f(o))
       console.log(r.TriggerInfo)
       return r
    }



```



apigw

```json
{
  "Type": "APIGW",
  "Properties": {
    "StageName": "release",
    "ServiceId": null,
    "HttpMethod": "ANY"
  }
}

```
cmq

```json
{
  "Type": "CMQ",
  "Properties": {
    "Name": "qname"
  }
}

```

cos

```json
{
  "Type": "COS",
  "Properties": {
    "Bucket": "cli-appid.cos.ap-beijing.myqcloud.com",
    "Filter": {
      "Prefix": "filterdir/",
      "Suffix": ".jpg"
    },
    "Events": "cos:ObjectCreated:*",
    "Enable": true
  }
}

```

+ delete old apigw 
+ create new apigw

```javascript

    a={
          Type: "",
          TriggerName: "",
          Region: "",
          Namespace: ns,
          FunctionName: "",
          TriggerDesc: "",
    }
    b={
        Type: "",
        TriggerName: "", // Name+"-"+"Topic"
        Region: "",
        Namespace: "",
        FunctionName: "",
        TriggerDesc:"", // JSON.stringify({maxMsgNum,offset})
        Enable : 'OPEN', // "CLOSE"|"OPEN"
    }
    DeleteTrigger(a)

```

+ create CKafka trigger

```javascript

    a={
          "Type": "CMQ",
          "Properties": {
            "Name": "qname",
            "Topic":"xxx",
          }
    }

    const {Name,Topic}=a.Properties

    b={
        Type: "CMQ",
        TriggerName: Name+"-"+"Topic",
        Region: "",
        Namespace: "",
        FunctionName: "",
        TriggerDesc:JSON.stringify({maxMsgNum,offset})
        Enable : 'OPEN', // "CLOSE"|"OPEN"
    }


```
