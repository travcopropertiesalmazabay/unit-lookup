const CACHE_NAME = 'almaza-bay-v1';
const urlsToCache = [
  '/unit-lookup/',
  '/unit-lookup/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Always fetch from network for API calls
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
