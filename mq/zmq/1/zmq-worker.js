const zmq=require('zmq')
const crypto=require('crypto')
const R=require('ramda')

const json2str=(x={})=>JSON.stringify(x)
const str2json=(x="")=>JSON.parse(x)

const add_prefix=R.pipe(String,R.concat('tcp://localhost:'))
const HOSTS=R.map(add_prefix,[5016,5017])

const t_server=zmq.socket('pull')
const r_server=zmq.socket('push')

t_server.connect(HOSTS[0])
r_server.connect(HOSTS[1])

const parse_msg=(msg)=>{
    const {searchHash,q}=json2str(msg)
    const ok=R.equals(searchHash)
    const parse=(x)=>{
         const s=crypto.createHash('sha1')
          s.update(x)
          const r=s.digest('hex')
          if (ok(s)){
             const d=R.join(':')([s,x])
             r_server.send(d)
          }
    }
    q.forEach(parse)
}
t_server.on('message',parse_msg)
