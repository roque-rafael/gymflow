const CACHE_NAME = 'gymflow-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala e salva os arquivos no celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Faz o app funcionar sem internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Puxa do celular se tiver sem net
        }
        return fetch(event.request); // Se não, busca da internet normal
      })
  );
});