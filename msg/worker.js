var sendmessage = require('sendmessage');
superagent=require('superagent')

add=async (x,y)=>x+y
sendmessage(process, {
      from: 'child',
      hi: 'cccc'
});

process.on('message', async function (message) {
    console.log("<----",process.pid,message)
    let {action,data,from}=message
    switch(action){
        case "add":
            sendmessage(process, {
                from: 'child',
                action,
                data: await add(...data),
            });
            break;
        case "get":
            sendmessage(process, {
                from: 'child',
                action,
                data: (await superagent.get(data)).text,
            });
            //process.disconnect();
            break;
        case "bye":
            process.disconnect();
            break;
        default:
            sendmessage(process, {
                    action,
                    from: 'child',
                    got: message
            });
    }
});

