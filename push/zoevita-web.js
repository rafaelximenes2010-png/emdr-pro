/* =====================================================================
   ZOEVITA · endereços próprios (Cloudflare Worker "zoevita-web")
   zoevita.net.br      → site público   (GitHub Pages: /emdr-pro/site/)
   www.zoevita.net.br  → redireciona para zoevita.net.br
   app.zoevita.net.br  → aplicativo      (GitHub Pages: /emdr-pro/)
   Separado do SOLA: zona e Worker próprios na mesma conta Cloudflare.
   ===================================================================== */
const ORIGIN = "https://rafaelximenes2010-png.github.io/emdr-pro";
const APEX = "zoevita.net.br", APP = "app.zoevita.net.br";

const SECURITY = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(self), microphone=(self), display-capture=(self), geolocation=(), payment=()"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;
    if (host === "www." + APEX) return Response.redirect(`https://${APEX}${url.pathname}${url.search}`, 301);
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Método não permitido", { status: 405 });

    const isApp = host === APP;
    const base = isApp ? ORIGIN : ORIGIN + "/site";
    let path = url.pathname;
    if (!isApp && (path === "/app" || path === "/app/")) return Response.redirect(`https://${APP}/`, 302);
    if (/^\/(android|apk|baixar)\/?$/i.test(path)) return Response.redirect("https://github.com/rafaelximenes2010-png/emdr-pro/releases/download/android-latest/EMDR-PRO.apk", 302);

    const upstream = base + path + url.search;
    const r = await fetch(upstream, { method: request.method, redirect: "manual", cf: { cacheTtl: 60, cacheEverything: true } });

    const h = new Headers(r.headers);
    ["x-github-request-id", "x-fastly-request-id", "x-served-by", "x-cache", "x-cache-hits", "x-timer", "via", "access-control-allow-origin"].forEach(k => h.delete(k));
    for (const [k, v] of Object.entries(SECURITY)) h.set(k, v);

    if (r.status >= 300 && r.status < 400 && h.get("location")) {
      const loc = new URL(h.get("location"), upstream);
      if (loc.href.startsWith(base)) h.set("location", `https://${host}${loc.href.slice(base.length) || "/"}`);
      return new Response(null, { status: r.status, headers: h });
    }
    if (r.status === 404 && !isApp) {
      const page = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Página não encontrada · ZOEVITA</title><body style="font-family:system-ui,sans-serif;background:#F6EEE3;color:#22281D;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:16px"><div><h1 style="font-family:Georgia,serif;font-weight:500">Página não encontrada</h1><p>O endereço pode ter mudado.</p><p><a href="/" style="color:#3D4E30;font-weight:600">Ir para o início da ZOEVITA</a></p></div></body></html>`;
      return new Response(page, { status: 404, headers: { ...SECURITY, "content-type": "text/html; charset=utf-8" } });
    }
    return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
  }
};
