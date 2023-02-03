// Establish a cache name
const cacheName = 'Finance_Ledger_cache_v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName));
});

// Stale-while-revalidate
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(cacheName).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });
        return cachedResponse || fetchedResponse;
      })
    );
  } else {
    return;
  }
});
