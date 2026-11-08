/* Service worker do EMDR PRO: guarda o app para funcionar offline.
   Ao publicar uma nova versão, altere CACHE (ex.: emdrpro-v2) para forçar a atualização. */
const CACHE = "emdrpro-v2";
const RUNTIME = "emdrpro-externos-v1"; // fontes e bibliotecas de PDF/Excel
const FILES = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon.svg", "./icons/favicon.svg", "./icons/favicon-64.png", "./icons/icon-180.png",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon-180-v2.png", "./icons/apple-touch-icon-167-v2.png", "./icons/apple-touch-icon-152-v2.png", "./icons/apple-touch-icon-120-v2.png", "./icons/logo-app-v2.png"];
const EXTERNOS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"];

self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== RUNTIME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Fontes e bibliotecas: usa a cópia guardada e atualiza em segundo plano
  if (EXTERNOS.includes(url.hostname)) {
    e.respondWith(caches.open(RUNTIME).then(c => c.match(e.request).then(hit => {
      const net = fetch(e.request).then(res => { if (res.ok || res.type === "opaque") c.put(e.request, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  if (url.origin !== location.origin) return; // sala de vídeo e links externos passam direto
  // Páginas: tenta a rede primeiro (pega a versão nova) e cai para a cópia offline
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
