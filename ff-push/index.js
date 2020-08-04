//https://www.npmjs.com/package/web-push
//https://developer.mozilla.org/en-US/docs/Web/API/Push_API
//


const webpush=require("web-push")


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const {
    WebPushError,
    supportedContentEncodings,
    encrypt,
    getVapidHeaders,
    generateVAPIDKeys,
    setGCMAPIKey,
    setVapidDetails,
    generateRequestDetails,
    sendNotification,
}=webpush

KEY0={"publicKey":"","privateKey":""}
PUB0={
  "endpoint": "",
  "keys": {
    "auth": "",
    "p256dh": ""
  }
}
EMAIL='mailto:1052334039@qq.com'

const {publicKey,privateKey} = webpush.generateVAPIDKeys()

key1=urlBase64ToUint8Array(publicKey)

//webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails( EMAIL, publicKey, privateKey,)

const format_options = ({publicKey,privateKey}=KEY0)=>({
     // gcmAPIKey: '< GCM API Key >',
      vapidDetails: {
            subject: EMAIL,
            publicKey,
            privateKey
      },
      TTL: 60,
      headers: {
        x:"123"
      },
     contentEncoding: 'aesgcm', //aes128gcm
     // proxy: '< proxy server options >'
})

get_head=(endpoint,email=EMAIL, publicKey, privateKey)=>{
    let {protocol,hostname}=url.parse(endpoint)
    const audience = protocol + '//' + hostname;
    return getVapidHeaders( audience, email, publicKey, privateKey, 'aes128gcm')
}



pub=async ({endpoint,p256dh,auth,publicKey,privateKey},payload="ttt")=>{
    let meta={
      endpoint,
      keys: {
        p256dh,
        auth,
      }
    }
    let o=format_options({publicKey,privateKey})



    r1=await webpush.sendNotification(meta, payload);
    r2=await webpush.sendNotification(meta, payload,o);
    console.log(r1,r2)
}


test_pub=()=>{
    const {publicKey,privateKey} = webpush.generateVAPIDKeys()
    key1=urlBase64ToUint8Array(publicKey)





    details = webpush.generateRequestDetails( meta, payload, o);
    head=get_head(endpoint,EMAIL,publicKey,privateKey,)
    console.log(detail)
    console.log(head)
}


