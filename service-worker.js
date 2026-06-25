const CACHE_NAME = 'lapps-v2';
const STATIC_FILES = [
  '/',
  '/lapps/',
  '/lapps/index.html',
  '/lapps/offline.html',
  '/lapps/manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  const isNavigation = event.request.mode === 'navigate';
  const isHtmlShell = requestUrl.pathname === '/lapps/' || requestUrl.pathname === '/lapps/index.html';
  const isStaticFile = STATIC_FILES.includes(requestUrl.pathname);

  if (isNavigation || isHtmlShell) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cached => cached || caches.match('/lapps/offline.html'));
        })
    );
    return;
  }

  if (isStaticFile) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});
