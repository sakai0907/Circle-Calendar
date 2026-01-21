const CACHE_NAME = 'musical-archive-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// インストール時にキャッシュする
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時にキャッシュがあればそれを返す
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response ? response : fetch(event.request);
      })
  );
});