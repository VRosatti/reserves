/* Fonctionnement hors ligne : les fichiers de l'app sont gardés en cache sur le téléphone.
   Après une mise à jour du dépôt, augmenter le numéro de version ci-dessous. */
const VERSION = 'reserves-v6';
const FILES = [
  './', './index.html', './manifest.webmanifest', './vendor/jspdf.umd.min.js',
  './fonts/Barlow-Regular.woff2', './fonts/Barlow-Medium.woff2', './fonts/Barlow-SemiBold.woff2',
  './fonts/BarlowSemiCondensed-SemiBold.woff2', './fonts/BarlowSemiCondensed-Bold.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
/* Réponse depuis le cache (rapide, hors ligne), puis mise à jour du cache en arrière-plan. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
                              .catch(() => cached);
    return cached || network;
  }));
});
