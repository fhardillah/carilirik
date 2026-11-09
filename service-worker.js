const CACHE_VERSION = 'carilirik-v3';
const APP_CACHE = `${CACHE_VERSION}-app`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const APP_ASSETS = [
 './',
 './index.html',
 './manifest.webmanifest',
 './css/style.css',
 './script/app.js',
 './assets/icons/pulse.svg',
 './assets/icons/pulse-app.svg',
 './assets/icons/pulse-192.png',
 './assets/icons/pulse-512.png',
 './assets/icons/pulse-maskable-512.png',
 './assets/fonts/silka/Silka-Black-Italic.otf',
 './assets/fonts/silka/Silka-Black.otf',
 './assets/fonts/silka/Silka-Bold-Italic.otf',
 './assets/fonts/silka/Silka-Bold.otf',
 './assets/fonts/silka/Silka-Extra-Light-Italic.otf',
 './assets/fonts/silka/Silka-Extra-Light.otf',
 './assets/fonts/silka/Silka-Light-Italic.otf',
 './assets/fonts/silka/Silka-Light.otf',
 './assets/fonts/silka/Silka-Medium-Italic.otf',
 './assets/fonts/silka/Silka-Medium.otf',
 './assets/fonts/silka/Silka-Regular-Italic.otf',
 './assets/fonts/silka/Silka-Regular.otf',
 './assets/fonts/silka/Silka-SemiBold-Italic.otf',
 './assets/fonts/silka/Silka-SemiBold.otf',
 './assets/fonts/silka/Silka-Thin-Italic.otf',
 './assets/fonts/silka/Silka-Thin.otf'
];
const CDN_ASSETS = [
 'https://cdn.tailwindcss.com/3.4.17',
 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js',
 'https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.js',
 'https://cdn.jsdelivr.net/npm/kuroshiro@1.2.0/dist/kuroshiro.min.js',
 'https://cdn.jsdelivr.net/npm/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js'
];

self.addEventListener('install', event => {
 event.waitUntil((async () => {
  const cache = await caches.open(APP_CACHE);
  await cache.addAll(APP_ASSETS);

  const runtimeCache = await caches.open(RUNTIME_CACHE);
  await Promise.all(CDN_ASSETS.map(async url => {
   try {
    const request = new Request(url, {mode:'no-cors'});
    const response = await fetch(request);
    if (response.ok || response.type === 'opaque') {
     await runtimeCache.put(request, response);
    }
   } catch (error) {
    console.warn('PWA could not cache an optional CDN asset:', url, error);
   }
  }));
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

 if (url.protocol === 'https:' && url.hostname !== 'lrclib.net') {
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
