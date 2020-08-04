const zmq=require('zmq')
const R=require('ramda')

const say=R.curryN(2,console.log)
const sink=zmq.socket('pull')
sink.bindSync("tcp://*:5017")
sink.on('message',say('find'))
