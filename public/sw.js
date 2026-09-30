// Kill-switch service worker.
// A previous version cached the site with a "cache-first" strategy under a
// fixed cache name, which permanently served stale content after every deploy.
// This version caches nothing, deletes any old caches, and unregisters itself
// so every browser (returning visitors included) always gets the live version.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    } catch (e) {
      // no-op: best effort cleanup
    }
  })());
});

// No fetch handler on purpose: all requests go straight to the network.
