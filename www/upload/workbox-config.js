module.exports = {
  cacheId: 'my-app',
  importScripts: [],
  "globDirectory": "./",
  "globPatterns": [
    "**/*.{html,json,css,ico,woff,ttf,eot,woff2,jpg,jpeg,gif,png,js}"
  ],
  "swDest": "sw.js",
  "importWorkboxFrom":"local",
  "cleanupOutdatedCaches": true,
   navigationPreload: true,
   //ignoreURLParametersMatching: [/./],
   runtimeCaching: [
    {
      urlPattern: ({event}) => event.request.mode === 'navigate',
      handler: 'NetworkOnly',
    },
    {urlPattern: /\.(?:create|list|delete|upload)/,
    handler: 'NetworkFirst',
    options: {
      networkTimeoutSeconds: 10,
      cacheName: 'my-api-cache',
      expiration: {
        maxEntries: 5,
        maxAgeSeconds: 60,
      },
      backgroundSync: {
        name: 'my-queue-name',
        options: {
          maxRetentionTime: 60 * 60,
        },
      },
      cacheableResponse: {
        statuses: [0, 200],
        headers: {'x-test': 'true'},
      },
      broadcastUpdate: {
        channelName: 'my-update-channel',
      },
      plugins: [
          {cacheDidUpdate: () => {console.log('zzzzzzzzz'); }},
      ],
      fetchOptions: {
      //  mode: 'no-cors',
      },
      matchOptions: {
        ignoreSearch: true,
      },
    },
  },
  {
    urlPattern: /.*(png|jpg|jpeg|svg|gif).*/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'images',
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
      backgroundSync: {
        name: 'img-queue',
        options: {
          maxRetentionTime: 60 * 60,
        },
      },
    },
  },
  {
    urlPattern: /.*js$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'js',
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
      backgroundSync: {
        name: 'js-queue',
        options: {
          maxRetentionTime: 60 * 60,
        },
      },
      cacheableResponse: {
        statuses: [0, 200],
      },

    },
  },
  {
    urlPattern: /.*(css|font).*/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'css',
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
      backgroundSync: {
        name: 'css-queue',
        options: {
          maxRetentionTime: 60 * 60,
        },
      },

    },
  },
   ],
};

