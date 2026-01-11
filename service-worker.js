const CACHE_NAME = 'incode-cache-v1';
const FILES_TO_CACHE = [
  '/Emoji/index.html',
  '/Emoji/1768153527598.png',
  '/Emoji/1768153462742.png',
  '/Emoji/manifest.json',
  '/Emoji/style.css', // include this if you have an external CSS file
  '/Emoji/script.js'  // include this if you have an external JS file
];

// Install SW and cache files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // Activate SW immediately
});

// Activate SW and remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch files from cache first
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

// Background sync (example)
self.addEventListener('sync', function(event) {
  if (event.tag === 'sendMessage') {
    event.waitUntil(
      // Example: handle queued messages here
      console.log('Background sync running...')
    );
  }
});
