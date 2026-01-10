const cacheName = 'ghost-ak-invisible-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(filesToCache))
    );
});

// Activate service worker
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== cacheName) return caches.delete(key);
            })
        ))
    );
});

// Fetch cached files
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
