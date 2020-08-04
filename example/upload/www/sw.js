/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.0"});

importScripts(
  
);

workbox.navigationPreload.enable();

workbox.core.setCacheNameDetails({prefix: "my-app"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "942bc9b2e93a2e2e5d4029cc8eb022fa"
  },
  {
    "url": "js/cos_upload.js",
    "revision": "47c1d058964edd27e345e39e97aca06d"
  },
  {
    "url": "js/cos-js-sdk-v5.min.js",
    "revision": "2a9be276f29f3d04732e5a7529ac6869"
  },
  {
    "url": "js/fp.js",
    "revision": "29a8d8c08b645bbdb6807f16ab6d5b4f"
  },
  {
    "url": "js/index.js",
    "revision": "af55055db3db46de75ebbf229242985f"
  },
  {
    "url": "js/upload.js",
    "revision": "b96d255b5254e5c2a46b03cdf20b49dc"
  },
  {
    "url": "workbox-config.js",
    "revision": "25e470a8aace24566375aec282801890"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(({event}) => event.request.mode === 'navigate', new workbox.strategies.NetworkOnly(), 'GET');
workbox.routing.registerRoute(/\.(?:create|list|delete|upload)/, new workbox.strategies.NetworkFirst({ "cacheName":"my-api-cache","networkTimeoutSeconds":10,"fetchOptions":{},"matchOptions":{"ignoreSearch":true}, plugins: [{ cacheDidUpdate: () => {console.log('zzzzzzzzz'); } }, new workbox.expiration.Plugin({ maxEntries: 5, maxAgeSeconds: 60, purgeOnQuotaError: false }), new workbox.backgroundSync.Plugin("my-queue-name", { maxRetentionTime: 3600 }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ], headers: { 'x-test': 'true' } }), new workbox.broadcastUpdate.Plugin({ channelName: 'my-update-channel' })] }), 'GET');
workbox.routing.registerRoute(/.*(png|jpg|jpeg|svg|gif).*/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({ maxEntries: 20, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.backgroundSync.Plugin("img-queue", { maxRetentionTime: 3600 })] }), 'GET');
workbox.routing.registerRoute(/.*js$/, new workbox.strategies.CacheFirst({ "cacheName":"js", plugins: [new workbox.expiration.Plugin({ maxEntries: 20, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.backgroundSync.Plugin("js-queue", { maxRetentionTime: 3600 }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
workbox.routing.registerRoute(/.*(css|font).*/, new workbox.strategies.CacheFirst({ "cacheName":"css", plugins: [new workbox.expiration.Plugin({ maxEntries: 20, maxAgeSeconds: 604800, purgeOnQuotaError: false }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.backgroundSync.Plugin("css-queue", { maxRetentionTime: 3600 })] }), 'GET');
