const utility=require("utility")

const {
    HttpClient,
    bodyanalysis,
    contentCensor,
    easydl,
    face,
    imageClassify,
    imageProcess,
    imageSearch,
    kg,
    nlp,
    ocr,
    speech
}=require("baidu-aip-sdk")


const {
    baidu_speech_AppID:AppID,
    baidu_speech_APIKey:APIKey,
    baidu_speech_SecretKey:SecretKey,
}=process.env


const fs=require('mz/fs')
const read=(i="img/yzm.jpg")=>fs.readFile(i).then(x=>x.toString("utf-8"))
const conn=()=>new speech(AppID,APIKey,SecretKey)

const audio2text=async (file_name='test.pcm')=>{
    let c=conn()
    let voice =await fs.readFile(file_name);
    let voiceBuffer = new Buffer(voice);
    o={dev_pid: '1536', cuid: Math.random()}
    r1=await c.recognize(voiceBuffer, 'pcm', 16000)
  //  r2=await c.recognize(voiceBuffer, 'pcm', 16000，o )
    console.log(r1)
  //  console.log(r2)
}

const txt2audio=async (file_name="t.txt",file_name1='t.mp3')=>{
      let c=new speech(AppID,APIKey,SecretKey)
      let o={ }
     //let o= {spd: 0, per: 4}
      let t = await read(file_name)
      r=await c.text2audio(t,o)
      console.log(r)
      fs.createWriteStream(file_name1).write(r.data)
}


test=async ()=>{
    const {sleep}=require('../../fp/index')
    let c=new speech(AppID,APIKey,SecretKey)
    // https://ai.baidu.com/ai-doc/SPEECH/Rk38y8jax
    let o={
        spd: 3,
        per: 103,
        pit: 6,
        vol: 5,
    }
    let z=await utility.readJSON('voice.json')
    let z1=z.slice(0,1)
    for (let i of z1){
        let n="mp3/" + i + ".mp3"
        r=await c.text2audio(i,o)
        fs.createWriteStream(n).write(r.data)
        console.log(i)
        await sleep(1)
    }
    console.log('done')
}

test()

//txt2audio()
