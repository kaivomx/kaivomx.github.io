// SW minimo — NO cachea HTML ni JS, solo permite PWA install
const CACHE='kaivo-v12';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))));
  self.clients.claim();
});
// HTML y JS siempre de red — nunca de caché
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('.html')||url.pathname.endsWith('.js')||url.pathname==='/'){
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(fetch(e.request));
});
