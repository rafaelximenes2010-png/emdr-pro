/* =====================================================================
   EMDR PRO · Notificações na tela do celular (Web Push)
   ---------------------------------------------------------------------
   Roda grátis no Cloudflare Workers, separado do SOLA. Envia para os
   aparelhos da Dra. Karina, mesmo com o app fechado:
     · lembrete de sessão (X minutos antes)
     · resumo da agenda do dia
     · paciente na sala de espera da teleconsulta
     · versão nova do EMDR PRO
   PRIVACIDADE: o app nunca manda nomes de pacientes nem dados clínicos para
   cá. Os lembretes chegam prontos e genéricos ("Sessão às 14:00 · em 15 min").

   Configuração (painel do Cloudflare):
     KV namespace ligado como  EMDR_PUSH   (Settings › Bindings › KV namespace)
     Cron Trigger: a cada 5 minutos  (Settings › Triggers: 0/5 * * * *  ou o modelo "Every 5 minutes")
     ALLOWED (Text, opcional)  origens permitidas, separadas por vírgula
   As chaves VAPID são criadas sozinhas na primeira vez e guardadas no KV.

   Rotas:  GET  /push/key          chave pública para o app se inscrever
           GET  /push/ping         confere se o servidor está no ar
           POST /push/subscribe    { sub, topics, rem:[{id,at,title,body,url,kind}], rooms:[{r,exp,t}] }
           POST /push/unsubscribe  { endpoint }
           POST /push/test         { endpoint }
           POST /push/knock        { room }   (página do paciente: "estou na sala de espera")
   ===================================================================== */

const SITE = "https://rafaelximenes2010-png.github.io/emdr-pro/";
const DEFAULT_ALLOWED = [
  "https://rafaelximenes2010-png.github.io",
  "https://karinaximenespsi.github.io",
  "https://zoevita.net.br",
  "https://www.zoevita.net.br",
  "https://app.zoevita.net.br",
  "capacitor://localhost",
  "https://localhost",
  "http://localhost:8772"
];
const MAX_SUBS = 12;          // aparelhos da psicóloga (celular, computador, tablet…)
const MAX_REM = 90;
const MAX_ROOMS = 80;
const LATE = 25 * 60e3;       // lembrete atrasado mais que isso não é mais enviado

function cors(origin, env) {
  const list = env.ALLOWED ? env.ALLOWED.split(",").map(s => s.trim()) : DEFAULT_ALLOWED;
  let host = ""; try { host = new URL(origin || "http://x").hostname; } catch {}
  const ok = list.includes(origin) || /\.claudeusercontent\.com$|\.claude\.ai$/.test(host);
  return { "Access-Control-Allow-Origin": ok ? origin : list[0], "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
           "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", "Vary": "Origin" };
}
const json = (obj, status, headers) =>
  new Response(JSON.stringify(obj), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" } });
async function sha(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}
const clip = (s, n) => String(s == null ? "" : s).replace(/\s+/g, " ").trim().slice(0, n);
const safeUrl = u => /^\.\/(index\.html)?(#[a-z0-9-]*)?$/i.test(u || "") ? u : "./#painel";

/* ---------- Web Push (VAPID + RFC 8291 aes128gcm) ---------- */
const B64 = {
  enc(buf){ const b = new Uint8Array(buf); let s = ""; for (const x of b) s += String.fromCharCode(x);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); },
  dec(str){ const s = atob(String(str).replace(/-/g, "+").replace(/_/g, "/") + "===".slice((String(str).length + 3) % 4));
    return Uint8Array.from(s, c => c.charCodeAt(0)); }
};
const te = new TextEncoder();
const cat = (...a) => { const out = new Uint8Array(a.reduce((n, x) => n + x.length, 0)); let o = 0; for (const x of a) { out.set(x, o); o += x.length; } return out; };
async function hmac(key, data){ const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, data)); }

let VAPID = null;
async function vapid(env){
  if (VAPID) return VAPID;
  let v = await env.EMDR_PUSH.get("vapid", "json");
  if (!v) {
    const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
    v = { jwk: await crypto.subtle.exportKey("jwk", kp.privateKey), pub: B64.enc(await crypto.subtle.exportKey("raw", kp.publicKey)) };
    await env.EMDR_PUSH.put("vapid", JSON.stringify(v));
  }
  v.key = await crypto.subtle.importKey("jwk", v.jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  return VAPID = v;
}
async function vapidAuth(endpoint, env){
  const v = await vapid(env), aud = new URL(endpoint).origin;
  const head = B64.enc(te.encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const body = B64.enc(te.encode(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: env.PUSH_CONTACT || SITE })));
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, v.key, te.encode(head + "." + body));
  return `vapid t=${head}.${body}.${B64.enc(sig)}, k=${v.pub}`;
}
async function encrypt(payload, p256dh, auth){
  const ua = B64.dec(p256dh), secret = B64.dec(auth);
  const eph = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
  const asPub = new Uint8Array(await crypto.subtle.exportKey("raw", eph.publicKey));
  const uaKey = await crypto.subtle.importKey("raw", ua, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const shared = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, eph.privateKey, 256));
  const prkKey = await hmac(secret, shared);
  const ikm = await hmac(prkKey, cat(te.encode("WebPush: info\0"), ua, asPub, new Uint8Array([1])));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prk = await hmac(salt, ikm);
  const cek = (await hmac(prk, cat(te.encode("Content-Encoding: aes128gcm\0"), new Uint8Array([1])))).slice(0, 16);
  const nonce = (await hmac(prk, cat(te.encode("Content-Encoding: nonce\0"), new Uint8Array([1])))).slice(0, 12);
  const key = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, key, cat(te.encode(payload), new Uint8Array([2]))));
  const header = new Uint8Array(21); header.set(salt, 0); new DataView(header.buffer).setUint32(16, 4096); header[20] = 65;
  return cat(header, asPub, ct);
}
async function sendPush(s, msg, env){
  const r = await fetch(s.e, { method: "POST", headers: {
      "Authorization": await vapidAuth(s.e, env), "Content-Encoding": "aes128gcm", "Content-Type": "application/octet-stream",
      "TTL": String(msg.ttl || 3600), "Urgency": msg.urgency || "high",
      ...(msg.tag ? { "Topic": msg.tag.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 32) } : {}) },
    body: await encrypt(JSON.stringify(msg), s.p, s.a) });
  return r.status;
}

/* ---------- Inscrições: um único registro no KV (poucos aparelhos) ---------- */
async function loadSubs(env){ return (await env.EMDR_PUSH.get("subs", "json")) || {}; }
async function saveSubs(env, subs){ await env.EMDR_PUSH.put("subs", JSON.stringify(subs)); }
async function idOf(endpoint){ return (await sha(endpoint)).slice(0, 24); }

/* Envia e limpa aparelhos que não existem mais (404/410) */
async function deliver(env, subs, ids, msg){
  let sent = 0, gone = false;
  for (const id of ids) {
    const s = subs[id]; if (!s) continue;
    try { const st = await sendPush(s, msg, env);
      if (st === 404 || st === 410) { delete subs[id]; gone = true; } else if (st < 300) sent++; }
    catch (e) { console.log("push", e.message); }
  }
  return { sent, gone };
}

/* Lembretes que chegaram na hora */
async function remindersTick(env, subs){
  const now = Date.now(); let dirty = false;
  for (const [id, s] of Object.entries(subs)) {
    const due = (s.rem || []).filter(r => r.at <= now && r.at > now - LATE && !(s.sent || []).includes(r.id));
    for (const r of due) {
      const topic = r.kind === "resumo" ? "resumo" : "lembrete";
      if (s.t && s.t[topic] === false) continue;
      const msg = { kind: topic, title: r.title, body: r.body, url: r.url, tag: r.id, ttl: 1800 };
      const res = await deliver(env, subs, [id], msg); if (res.gone) { dirty = true; break; }
      s.sent = [...(s.sent || []), r.id].slice(-200); dirty = true;
    }
    if (subs[id]) { const keep = (s.rem || []).filter(r => r.at > now - LATE); if (keep.length !== (s.rem || []).length) { s.rem = keep; dirty = true; } }
  }
  return dirty;
}

/* Versão nova: compara o sw.js publicado e lê a novidade no index.html */
async function checkVersion(env, subs){
  const sw = await fetch(SITE + "sw.js?t=" + Date.now()).then(r => r.ok ? r.text() : "").catch(() => "");
  const cache = (sw.match(/const CACHE = "([^"]+)"/) || [])[1]; if (!cache) return false;
  if (await env.EMDR_PUSH.get("swcache") === cache) return false;
  await env.EMDR_PUSH.put("swcache", cache);
  const html = await fetch(SITE + "index.html?t=" + Date.now()).then(r => r.ok ? r.text() : "").catch(() => "");
  const ver = (html.match(/const APP_VERSION='([^']+)'/) || [])[1]; if (!ver) return false;
  const last = await env.EMDR_PUSH.get("version");
  await env.EMDR_PUSH.put("version", ver);
  if (!last || last === ver) return false;                 // primeira vez: só registra
  const esc = ver.replace(/\./g, "\\.");
  const title = (html.match(new RegExp(`\\{v:'${esc}',date:'[^']*',title:'((?:[^'\\\\]|\\\\.)*)'`)) || [])[1] || "Melhorias e correções";
  const ids = Object.keys(subs).filter(id => !subs[id].t || subs[id].t.versao !== false);
  const r = await deliver(env, subs, ids, { kind: "versao", title: `ZOEVITA ${ver} chegou`, body: clip(title, 170), url: "./#atualizacoes", tag: "versao", ttl: 7 * 86400, urgency: "normal" });
  return r.gone;
}

async function tick(env){
  const subs = await loadSubs(env);
  let dirty = await remindersTick(env, subs);
  if (await checkVersion(env, subs)) dirty = true;
  if (dirty) await saveSubs(env, subs);
}

async function route(request, env, h){
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
  if (!env.EMDR_PUSH) return json({ error: "config", message: "Ligue o KV EMDR_PUSH no Worker." }, 500, h);
  const path = new URL(request.url).pathname;
  if (path === "/push/key") return json({ key: (await vapid(env)).pub }, 200, { ...h, "Cache-Control": "public, max-age=3600" });
  if (path === "/push/ping") return json({ ok: true, service: "emdr-pro-push" }, 200, h);
  if (request.method !== "POST") return json({ error: "method" }, 405, h);
  let b; try { b = await request.json(); } catch { return json({ error: "json" }, 400, h); }

  if (path === "/push/subscribe") {
    const s = b.sub || {}, e = String(s.endpoint || ""), p = s.keys && s.keys.p256dh, a = s.keys && s.keys.auth;
    if (!/^https:\/\//.test(e) || !p || !a || e.length > 800) return json({ error: "sub" }, 400, h);
    const tp = b.topics || {};
    const t = { lembrete: tp.lembrete !== false, resumo: tp.resumo !== false, sala: tp.sala !== false, versao: tp.versao !== false };
    const now = Date.now();
    const rem = (Array.isArray(b.rem) ? b.rem : []).filter(r => r && +r.at > now - LATE && +r.at < now + 40 * 86400e3).slice(0, MAX_REM)
      .map(r => ({ id: clip(r.id, 60), at: +r.at, kind: r.kind === "resumo" ? "resumo" : "lembrete", title: clip(r.title, 80), body: clip(r.body, 180), url: safeUrl(r.url) }));
    const rooms = (Array.isArray(b.rooms) ? b.rooms : []).filter(r => r && /^[a-z0-9-]{6,40}$/i.test(r.r || "") && +r.exp > now).slice(0, MAX_ROOMS)
      .map(r => ({ r: String(r.r).toLowerCase(), exp: +r.exp, t: clip(r.t, 5) }));
    const subs = await loadSubs(env), id = await idOf(e), old = subs[id] || {};
    subs[id] = { e, p, a, t, rem, rooms, sent: (old.sent || []).slice(-200), ts: now };
    const ids = Object.keys(subs).sort((x, y) => subs[y].ts - subs[x].ts);
    ids.slice(MAX_SUBS).forEach(x => delete subs[x]);
    await saveSubs(env, subs);
    return json({ ok: true, lembretes: rem.length, salas: rooms.length }, 200, h);
  }
  if (path === "/push/unsubscribe") {
    const subs = await loadSubs(env), id = await idOf(String(b.endpoint || ""));
    if (subs[id]) { delete subs[id]; await saveSubs(env, subs); }
    return json({ ok: true }, 200, h);
  }
  if (path === "/push/test") {
    const subs = await loadSubs(env), id = await idOf(String(b.endpoint || ""));
    if (!subs[id]) return json({ error: "nao-inscrito" }, 404, h);
    const r = await deliver(env, subs, [id], { kind: "teste", title: "ZOEVITA", body: "Pronto! As notificações estão chegando neste aparelho, mesmo com o app fechado.", url: "./#painel", tag: "teste" });
    if (r.gone) await saveSubs(env, subs);
    return json({ ok: r.sent > 0 }, 200, h);
  }
  if (path === "/push/knock") {
    const room = String(b.room || "").toLowerCase();
    if (!/^[a-z0-9-]{6,40}$/.test(room)) return json({ error: "sala" }, 400, h);
    const flag = "knock:" + room;
    if (await env.EMDR_PUSH.get(flag)) return json({ ok: true, repetido: true }, 200, h);   // no máximo 1 aviso a cada 2 min por sala
    const subs = await loadSubs(env), now = Date.now();
    const hits = Object.keys(subs).filter(id => (!subs[id].t || subs[id].t.sala !== false) && (subs[id].rooms || []).some(r => r.r === room && r.exp > now));
    if (!hits.length) return json({ ok: true, avisado: false }, 200, h);
    await env.EMDR_PUSH.put(flag, "1", { expirationTtl: 120 });
    const info = subs[hits[0]].rooms.find(r => r.r === room);
    const msg = { kind: "sala", title: "Paciente na sala de espera", body: info && info.t ? `Seu atendimento das ${info.t} está aguardando você. Toque para abrir a teleconsulta.` : "Há alguém aguardando na teleconsulta. Toque para abrir.",
                  url: "./#teleconsulta", tag: "sala-" + room.slice(0, 20), ttl: 900 };
    const r = await deliver(env, subs, hits, msg);
    if (r.gone) await saveSubs(env, subs);
    return json({ ok: true, avisado: r.sent > 0 }, 200, h);
  }
  return json({ error: "rota" }, 404, h);
}

export default {
  async scheduled(event, env, ctx) { if (env.EMDR_PUSH) ctx.waitUntil(tick(env).catch(e => console.log("tick", e.message))); },
  async fetch(request, env) {
    const h = cors(request.headers.get("Origin") || "", env);
    const path = new URL(request.url).pathname;
    if (path.startsWith("/push/")) return route(request, env, h);
    return json({ ok: true, service: "emdr-pro-push", info: "Notificações do EMDR PRO" }, 200, h);
  }
};
