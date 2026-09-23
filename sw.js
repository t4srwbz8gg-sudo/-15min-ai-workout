const C='ai15workout-v7',A=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(/\.(mp4|mov|webm)$/i.test(u.pathname)){e.respondWith(fetch(e.request));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(s=>{let x=s.clone();caches.open(C).then(c=>c.put(e.request,x));return s}).catch(()=>caches.match('./index.html'))))
});