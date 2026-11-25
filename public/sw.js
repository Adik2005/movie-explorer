const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const MAX_CACHE_ITEMS = 50;

const APP_SHELL = [
  '/',
  '/index.html',
  '/offline',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Ограничение размера кэша
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    return trimCache(cacheName, maxItems);
  }
}

// 1. Install: предварительное кэширование App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
});

// 2. Activate: удаление старых версий кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, IMAGE_CACHE, API_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Сообщение от клиента для немедленного обновления версии
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 3. Fetch: стратегии кэширования
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Игнорируем авторизацию Firebase и приватные запросы
  if (url.hostname.includes('googleapis.com') || url.hostname.includes('firebase')) {
    return;
  }

  // Стратегия 1: Network-First для публичного API (TVMaze)
  if (url.hostname.includes('api.tvmaze.com')) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          const clone = response.clone();
          const cache = await caches.open(API_CACHE);
          // Добавляем заголовок, чтобы UI знал, что данные из кэша при офлайне
          const headers = new Headers(clone.headers);
          headers.set('X-From-Cache', 'true');
          const cachedResponse = new Response(await clone.blob(), {
            status: clone.status,
            statusText: clone.statusText,
            headers
          });
          await cache.put(request, cachedResponse);
          trimCache(API_CACHE, MAX_CACHE_ITEMS);
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(JSON.stringify({ error: 'Offline' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // Стратегия 2: Cache-First для изображений, шрифтов и статики
  if (request.destination === 'image' || request.destination === 'font' || request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            const clone = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => {
              cache.put(request, clone);
              trimCache(IMAGE_CACHE, MAX_CACHE_ITEMS);
            });
            return response;
          })
          .catch(() => new Response('', { status: 404 }));
      })
    );
    return;
  }

  // Навигация (HTML-страницы SPA)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          const cachedShell = await caches.match('/index.html');
          if (cachedShell) return cachedShell;
          return new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        })
    );
  }
});