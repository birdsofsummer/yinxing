const say=x=>y=>console.log(x,y)
const fireNotification=(event)=>{
      //let d=event.data.blob()
      //let d=event.data.arrayBuffer()
      //let d=event.data.text()
     let {action,title,message}=event.data.json()
     var notification = new Notification(title, {
            body: message,
            tag: 'zzz',
            icon: "images/new-notification.png",
      });
      notification.addEventListener('click', function() {
        if (clients.openWindow) {
          clients.openWindow('https://www.baidu.html');
        }
      });
    //port.postMessage(...)
}


//self.addEventListener('fetch', function(e){
//  console.log('SW fetch:', e.request.url)
//
//  e.respondWith(
//    caches.match(e.request)
//    .then(function(cache_response){
//      if(cache_response) return cache_response;
//
//      return fetch(e.request);
//    })
//    .catch(function(err){
//      console.log('Cache error', err)
//    })
//  );
//});



self.addEventListener('activate', function(event) {
  console.log('SW activate:', event);
});

self.addEventListener('install',async e=>{
    await self.skipWaiting()
    say('install')(e)
})

//self.addEventListener('fetch',say('fetch'))

self.addEventListener('fetch', event => {
  console.log('fffffffffff')

//  event.respondWith(caches.match(event.request));
//
//  fetch(event.request).then(response => response.json()).then(function (data) {
//    self.clients.match(event.clientId).then(client => client.postMessage(data));
//  });

  event.waitUntil(async function() {
    console.log("id",event.clientId)
    if (!event.clientId) return;
    const client = await clients.get(event.clientId);
    if (!client) return;
    client.postMessage({
      msg: "Hey I just got a fetch from you!",
      url: event.request.url
    });
  }());
});

const echo=async (event)=> {
    let d=event.data
    console.log('msg--->',d)
    event.ports[0].postMessage(d);
//  let c=await self.clients.matchAll()
//  console.log('cccc',c.length)
//  c.map(x=> x.postMessage(d))

}

self.addEventListener('message', echo);

self.addEventListener('pushsubscriptionchange', function() {

});

self.addEventListener('push', (event)=> {
      console.log(event.data.text())
      if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
      }
    //fireNotification(event)
});


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});

