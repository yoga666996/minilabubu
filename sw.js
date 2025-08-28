// Service Worker for MINI LABUBU Website
// Version 1.0

const CACHE_NAME = 'minilabubu-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/critical.js',
  '/critical.css',
  '/non-critical.js',
  '/minilabubu1.webp',
  '/minilabubu2.webp',
  '/minilabubu3.webp',
  '/labubumini1.webp',
  '/labubumini2.webp',
  '/labubumini3.webp',
  '/labubumini4.webp',
  '/labubumini.webp',
  '/minilabubu.webp'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - Cache First Strategy for static assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});