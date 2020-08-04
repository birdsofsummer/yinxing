const CONFIG= {
      appLogLevel: 'debug',
      dir: '/tmp',
      env: 'dev',
      app_name: 'ccc',
      server_ip: '0.0.0.0'
}

const REQ={
    request:{
        method:"",
        url:"",
        host:"",
        headers:{
            'referer':"",
            'user-agent':"",
            'x-forwarded-for':"",
        }
    }
}


const access= (
    {request:{ method, url, host, headers }}=REQ,
    o={})=> (message="")=> ({
    ...CONFIG,
    ...o,
    method,
    url,
    host,
    message,
    ...headers,
})

module.exports=access

