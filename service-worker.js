const CACHE_VERSION = 'carilirik-v18';
const APP_CACHE = `${CACHE_VERSION}-app`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const APP_ASSETS = [
 './index.html',
 './manifest.webmanifest',
 './css/tailwind.min.css',
 './css/style.css',
 './script/app.js',
 './assets/icons/pulse.svg',
 './assets/images/app-background.png',
 './assets/images/carilirik-logo.png',
 './assets/icons/navigation/home.svg',
 './assets/icons/navigation/koleksi.svg',
 './assets/icons/navigation/search.svg',
 './assets/icons/navigation/venue.svg',
 './assets/icons/navigation/profile.svg',
 './assets/icons/navigation/setting.svg',
 './assets/icons/navigation/heart-filled.svg',
 './assets/icons/navigation/heart-outline.svg',
];
const CORE_CDN_ASSETS = [
 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js'
];

self.addEventListener('install', event => {
 event.waitUntil((async () => {
  const cache = await caches.open(APP_CACHE);
  await cache.addAll(APP_ASSETS);
  const runtimeCache = await caches.open(RUNTIME_CACHE);
  await Promise.all(CORE_CDN_ASSETS.map(async url => {
   const request = new Request(url, {mode:'no-cors'});
   try {
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
     await runtimeCache.put(request, response);
    }
   } catch (error) {
    console.warn('PWA could not cache a required runtime asset:', url, error);
   }
  }));
  await self.skipWaiting();
 })());
});

self.addEventListener('activate', event => {
 event.waitUntil((async () => {
  const keep = [APP_CACHE, RUNTIME_CACHE];
  const names = await caches.keys();
  await Promise.all(names.filter(name => /^(pulse-|carilirik-)/.test(name) && !keep.includes(name))
   .map(name => caches.delete(name)));
  await self.clients.claim();
 })());
});

self.addEventListener('fetch', event => {
 const request = event.request;
 if (request.method !== 'GET') return;

 const url = new URL(request.url);
 if (url.origin === self.location.origin) {
  if (request.mode === 'navigate') {
   event.respondWith((async () => {
    try {
     const response = await fetch(request);
     const cache = await caches.open(APP_CACHE);
     await cache.put('./index.html', response.clone());
     return response;
    } catch {
     const cached = await caches.match('./index.html');
     if (cached) return cached;
     throw new Error('The app shell is not available offline.');
    }
   })());
   return;
  }

  event.respondWith((async () => {
   const cached = await caches.match(request);
   if (cached) return cached;
   const response = await fetch(request);
   if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
   }
   return response;
  })());
  return;
 }

 const cacheableCdnScript = url.hostname === 'cdn.jsdelivr.net'
  && /^\/npm\/(?:alpinejs|pinyin-pro|kuroshiro|kuroshiro-analyzer-kuromoji)@/.test(url.pathname)
  && !url.pathname.includes('/dict/');
 if (cacheableCdnScript) {
  event.respondWith((async () => {
   const cached = await caches.match(request);
   if (cached) return cached;
   const response = await fetch(request);
   if (response.ok || response.type === 'opaque') {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
   }
   return response;
  })());
 }
});
