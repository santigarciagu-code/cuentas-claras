// Red primero: siempre intenta la última versión y, sin conexión, usa la guardada.
var CACHE='cuentas-claras';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(CACHE).then(function(ca){ca.put(r,c)});return res})
    .catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match('./index.html')})}));
});
