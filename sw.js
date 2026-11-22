/* Service worker do EMDR PRO: guarda o app para funcionar offline.
   Ao publicar uma nova versão, altere CACHE (ex.: emdrpro-v2) para forçar a atualização. */
const CACHE = "emdrpro-v25";
const RUNTIME = "emdrpro-externos-v1";
const INBOX = "emdr-inbox"; // fontes e bibliotecas de PDF/Excel
const FILES = ["./", "./index.html",
  "./legal/conteudo.js", "./manifest.webmanifest",
  "./icons/favicon-64.png", "./icons/favicon-32.png", "./icons/icon-180.png",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon-180-v3.png", "./icons/apple-touch-icon-167-v3.png", "./icons/apple-touch-icon-152-v3.png", "./icons/apple-touch-icon-120-v3.png", "./icons/logo-app-v3.png",
  "./fonts/eb-garamond-latin-400-italic.woff2", "./fonts/eb-garamond-latin-400-normal.woff2", "./fonts/eb-garamond-latin-500-italic.woff2", "./fonts/eb-garamond-latin-500-normal.woff2", "./fonts/eb-garamond-latin-600-normal.woff2", "./fonts/eb-garamond-latin-ext-400-italic.woff2", "./fonts/eb-garamond-latin-ext-400-normal.woff2", "./fonts/eb-garamond-latin-ext-500-italic.woff2", "./fonts/eb-garamond-latin-ext-500-normal.woff2", "./fonts/eb-garamond-latin-ext-600-normal.woff2", "./fonts/figtree-latin-400-normal.woff2", "./fonts/figtree-latin-500-normal.woff2", "./fonts/figtree-latin-600-normal.woff2", "./fonts/figtree-latin-700-normal.woff2", "./fonts/figtree-latin-ext-400-normal.woff2", "./fonts/figtree-latin-ext-500-normal.woff2", "./fonts/figtree-latin-ext-600-normal.woff2", "./fonts/figtree-latin-ext-700-normal.woff2", "./fonts/fonts.css", "./fonts/ibm-plex-mono-latin-400-normal.woff2", "./fonts/ibm-plex-mono-latin-500-normal.woff2", "./fonts/ibm-plex-mono-latin-ext-400-normal.woff2", "./fonts/ibm-plex-mono-latin-ext-500-normal.woff2",
  "./lib/jspdf.umd.min.js", "./lib/xlsx.full.min.js", "./lib/peerjs.min.js"];
const EXTERNOS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"];

self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== RUNTIME && k !== INBOX).map(k => caches.delete(k)))));
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
  if (url.pathname.includes("/site/")) return; // site público: fica fora do cache do aplicativo
  // Páginas: tenta a rede primeiro (pega a versão nova) e cai para a cópia offline
  if (e.request.mode === "navigate") {
    const isApp = /\/(index\.html)?$/.test(url.pathname);
    e.respondWith(fetch(e.request).then(res => { if (isApp && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)); } return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});

/* Notificações (tela bloqueada): chegam pelo servidor do EMDR PRO, mesmo com o app fechado.
   O servidor nunca recebe nomes de pacientes; os textos já chegam genéricos. */
self.addEventListener("push", e => {
  let m = {}; try { m = e.data ? e.data.json() : {}; } catch (err) { m = { body: e.data ? e.data.text() : "" }; }
  const title = m.title || "ZOEVITA";
  const item = { id: m.tag || ("p" + Date.now()), kind: m.kind || "aviso", title, body: m.body || "", url: m.url || "./#painel", date: new Date().toISOString() };
  e.waitUntil((async () => {
    await self.registration.showNotification(title, { body: item.body, icon: "icons/apple-touch-icon-180-v3.png", badge: "icons/favicon-64.png",
      tag: item.id, renotify: item.kind === "sala", requireInteraction: item.kind === "sala", data: { url: item.url } });
    const c = await caches.open(INBOX); const r = await c.match("inbox"); const list = r ? await r.json() : [];
    if (!list.some(x => x.id === item.id)) list.unshift(item);
    await c.put("inbox", new Response(JSON.stringify(list.slice(0, 40))));
    try { if (self.navigator.setAppBadge) await self.navigator.setAppBadge(Math.min(list.length, 9)); } catch (err) {}
    (await self.clients.matchAll({ type: "window" })).forEach(w => w.postMessage({ type: "push", item }));
  })());
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./#painel", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if ("focus" in c) { c.postMessage({ type: "open", url }); return c.focus(); } }
    return self.clients.openWindow(url);
  }));
});
