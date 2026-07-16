const CACHE_NAME = 'eu-que-me-vejo-v20';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './splash/splash-750x1334.png',
  './splash/splash-1170x2532.png',
  './splash/splash-1179x2556.png',
  './splash/splash-1284x2778.png',
  './splash/splash-1290x2796.png',
  './photos/press-feature.jpg',
  './photos/perfil-hero.jpg',
  './photos/premio-ser-humano.jpg',
  './photos/retrato-g4.jpg',
  './photos/palestra-vermelho.jpg',
  './photos/fortes-tecnologia.jpg',
  './photos/rh-com-feijao.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first strategy — the app works fully offline once installed.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
