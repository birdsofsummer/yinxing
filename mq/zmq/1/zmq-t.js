const zmq=require('zmq')
const v_stream=require('variations-stream')
const R=require('ramda')


const json2str=(x={})=>JSON.stringify(x)
const str2json=(x="")=>JSON.parse(x)


const seed=R.range(97,97+26).map(String.fromCharCode).map(x=>x.substr(0,1)).join('')

const batchSize=10000
const src=zmq.socket('push')
const [,,,Maxlength,searchHash]=process.argv
const q=[]

msg_gen=()=>(str2json({searchHash,q}))


src.bindSync("tcp://*:5000")
v_stream(seed,maxLength)
    .on( 'data',t=>{
        q.push(t);
        if (R.equals(Maxlength,q.length)){
            src.send(msg_gen())
            q.length=0
        }
    }
)
.on('end',()=>src.send(msg_gen()))


