// Gera o site público da ZOEVITA a partir de legal/conteudo.js (a mesma fonte do aplicativo).
// Uso:  node site/build.mjs        (rodar a cada alteração dos textos)
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url)), root = path.join(here, "..");
globalThis.window = globalThis; await import(path.join(root, "legal", "conteudo.js"));
const L = globalThis.ZV_LEGAL;
const APP_URL = "https://rafaelximenes2010-png.github.io/emdr-pro/";   // trocar por https://app.zoevita.net.br quando o domínio estiver ligado
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mark = s => esc(s).replace(/\[(A PREENCHER|REVISÃO JURÍDICA)([^\]]*)\]/g, (m, k, r) => `<mark class="todo">[${k}${r}]</mark>`);
const doc = id => L.docs.find(d => d.id === id);

fs.mkdirSync(path.join(here, "assets", "fonts"), { recursive: true });
fs.copyFileSync(path.join(root, "icons", "logo-app-v3.png"), path.join(here, "assets", "logo.png"));
fs.copyFileSync(path.join(root, "icons", "favicon-64.png"), path.join(here, "assets", "favicon.png"));
for (const f of ["eb-garamond-latin-500-normal.woff2", "eb-garamond-latin-500-italic.woff2", "figtree-latin-400-normal.woff2", "figtree-latin-600-normal.woff2", "figtree-latin-700-normal.woff2"])
  fs.copyFileSync(path.join(root, "fonts", f), path.join(here, "assets", "fonts", f));

const FOOT = [["", "ZOEVITA"], ["privacidade/", "Privacidade"], ["seguranca/", "Segurança"], ["etica-profissional/", "Ética Profissional"], ["termos/", "Termos de Uso"], ["contato/", "Contato"]];
const ALL = [["privacidade/", doc("privacidade").title], ["seguranca/", doc("seguranca").title], ["termos/", doc("termos").title], ["etica-profissional/", "Código de Ética Profissional do Psicólogo"], ["sigilo/", doc("sigilo").title], ["direitos-lgpd/", doc("direitos").title], ["cookies/", doc("cookies").title], ["consentimentos/", doc("consentimentos").title], ["contato/", doc("canal").title]];

function page({ slug, title, desc, body }) {
  const up = slug ? "../" : "";
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} · ZOEVITA</title><meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website"><meta property="og:site_name" content="ZOEVITA"><meta property="og:title" content="${esc(title)} · ZOEVITA"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="https://zoevita.net.br/assets/logo.png"><meta property="og:url" content="https://zoevita.net.br/${slug}"><meta name="twitter:card" content="summary">
<link rel="icon" href="${up}assets/favicon.png"><link rel="stylesheet" href="${up}assets/site.css">
<script>try{var u=JSON.parse(localStorage.getItem('zv.site')||'{}');if(u.theme&&u.theme!=='auto')document.documentElement.setAttribute('data-theme',u.theme);if(u.text)document.documentElement.style.fontSize=(u.text/100*16)+'px';if(u.motion)document.documentElement.classList.add('calm')}catch(e){}</script>
</head><body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="top"><a class="brand" href="${up}"><img src="${up}assets/logo.png" alt="" width="40" height="40"><span><b>ZOEVITA</b><small>Gestão clínica &amp; terapia</small></span></a>
 <nav class="topnav" aria-label="Principal"><a href="${up}central/">Privacidade e Ética</a><a href="${up}etica-profissional/">Ética Profissional</a><a href="${up}contato/">Contato</a><a class="cta" href="${APP_URL}">Abrir o app</a></nav>
 <button class="gear" id="cfg-btn" aria-haspopup="dialog" aria-controls="cfg" aria-label="Configurações do site"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg></button></header>
<div class="cfg" id="cfg" role="dialog" aria-modal="false" aria-labelledby="cfg-t" hidden><div class="cfg-box"><div class="cfg-head"><h2 id="cfg-t">Configurações</h2><button class="x" id="cfg-x" aria-label="Fechar">×</button></div>
 <div class="cfg-row"><b>Tema</b><div class="seg" data-k="theme"><button data-v="auto">Automático</button><button data-v="light">Claro</button><button data-v="dark">Escuro</button></div></div>
 <div class="cfg-row"><b>Tamanho do texto</b><div class="seg" data-k="text"><button data-v="90">A−</button><button data-v="100">A</button><button data-v="112">A+</button><button data-v="125">A++</button></div></div>
 <div class="cfg-row"><b>Reduzir animações</b><div class="seg" data-k="motion"><button data-v="">Não</button><button data-v="1">Sim</button></div></div>
 <p class="small">Estas escolhas ficam só neste navegador. O site não usa cookies de rastreamento.</p></div></div>
<main id="conteudo">${body}</main>
<footer class="foot"><nav aria-label="Rodapé">${FOOT.map(([h, t]) => `<a href="${up}${h}">${t}</a>`).join('<span aria-hidden="true">|</span>')}</nav>
 <p>${esc(L.ORG.email)} · Documentos versão ${esc(L.version)} (${esc(L.date)}) · ${esc(L.status)}</p>
 <p class="small">A ZOEVITA não possui homologação, chancela ou aprovação do Conselho Federal de Psicologia.</p></footer>
<script src="${up}assets/site.js"></script></body></html>`;
}
const sec = s => `<section><h2>${esc(s.h)}</h2>${(s.p || []).map(x => `<p>${mark(x)}</p>`).join("")}${s.table ? `<div class="tw"><table><thead><tr>${s.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${s.table.rows.map(r => `<tr>${r.map(c => `<td>${mark(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}${s.ul ? `<ul>${s.ul.map(x => `<li>${mark(x)}</li>`).join("")}</ul>` : ""}${s.ol ? `<ol>${s.ol.map(x => `<li>${mark(x)}</li>`).join("")}</ol>` : ""}</section>`;
const crumbs = t => `<nav class="crumbs" aria-label="Caminho"><a href="../">Início</a> › <a href="../central/">Privacidade, Segurança e Ética</a> › <span>${esc(t)}</span></nav>`;
const docBody = d => `<article class="doc">${crumbs(d.title)}<h1>${esc(d.title)}</h1><p class="meta"><span class="pill">Versão ${esc(d.version)}</span> ${esc(d.date)} · <span class="warn">${esc(d.status)}</span></p><p class="lead">${mark(d.intro)}</p>${d.sections.map(sec).join("")}
 <section class="hist"><h2>Histórico de versões</h2><ul>${L.changes.map(c => `<li><b>v${esc(c.v)}</b> · ${esc(c.date)} · ${esc(c.text)}</li>`).join("")}</ul></section></article>`;

const out = (slug, html) => { const dir = path.join(here, slug); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, "index.html"), html); };
const MAP = { privacidade: "privacidade", seguranca: "seguranca", termos: "termos", sigilo: "sigilo", direitos: "direitos-lgpd", cookies: "cookies", consentimentos: "consentimentos" };
for (const [id, slug] of Object.entries(MAP)) { const d = doc(id); out(slug, page({ slug, title: d.title, desc: d.intro, body: docBody(d) })); }

const C = doc("canal");
out("contato", page({ slug: "contato", title: C.title, desc: C.intro, body: `<article class="doc">${crumbs(C.title)}<h1>${esc(C.title)}</h1><p class="lead">${mark(C.intro)}</p>${C.sections.map(sec).join("")}
 <form id="canal" class="form" novalidate><div class="g2"><label>Tipo de solicitação<select id="cn-tipo">${[["acesso", "Acesso aos meus dados"], ["correcao", "Correção de informações"], ["eliminacao", "Eliminação de dados (quando cabível)"], ["incidente", "Comunicação de incidente de segurança"], ["duvida", "Dúvida sobre privacidade"], ["contato", "Contato institucional"]].map(([k, t]) => `<option value="${k}">${t}</option>`).join("")}</select></label>
 <label>Você é<select id="cn-rel"><option>Paciente</option><option>Profissional usuária(o) da plataforma</option><option>Outra pessoa</option></select></label></div>
 <div class="g2"><label>Seu nome<input id="cn-nome" autocomplete="name" required></label><label>Seu e-mail para resposta<input id="cn-email" type="email" autocomplete="email" required></label></div>
 <label>Mensagem<textarea id="cn-msg" maxlength="1500" rows="6" required placeholder="Descreva o pedido. Não inclua diagnósticos, relatos de sessão ou outros dados clínicos."></textarea></label><p class="small warn" id="cn-warn" role="status"></p>
 <button class="btn">Gerar protocolo e enviar</button><p class="small">Ao enviar, abrimos o seu e-mail com a mensagem pronta para ${esc(L.ORG.email)}, com o número de protocolo.</p></form>
 <div class="done" id="cn-done" hidden role="status"></div></article>` }));

const E = L.ethics;
out("etica-profissional", page({ slug: "etica-profissional", title: E.title, desc: "Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005): acesso ao documento oficial do CFP e resumo educativo.", body: `<article class="doc">${crumbs(E.title)}<h1>${esc(E.title)}</h1>
 <p class="meta">Código de Ética Profissional do Psicólogo · ${esc(E.resolucao)} · Fonte: ${esc(E.fonte)} · link conferido em ${esc(E.conferido)}</p>
 <div class="acts"><a class="btn" href="${esc(L.CFP.pdf)}" target="_blank" rel="noopener">Consultar Código de Ética</a><a class="btn ghost" href="${esc(L.CFP.pagina)}" target="_blank" rel="noopener">Página oficial no CFP</a><button class="btn ghost" id="pdf-btn" aria-expanded="false" aria-controls="pdf">Ver o PDF aqui</button></div>
 <div id="pdf" hidden><iframe data-src="${esc(L.CFP.pdf)}" title="Código de Ética Profissional do Psicólogo (PDF oficial do CFP)"></iframe><p class="small">Se o PDF não aparecer, use “Consultar Código de Ética”.</p></div>
 <section><h2>Princípios fundamentais <span class="badge">Resumo educativo</span></h2><p class="notice">${esc(E.aviso)}</p><ol>${E.principios.map(p => `<li>${esc(p)}</li>`).join("")}</ol></section>
 <section><h2>Sigilo e responsabilidade profissional</h2><ul>${E.sigilo.map(p => `<li>${esc(p)}</li>`).join("")}</ul><p><b>${esc(E.responsabilidade)}</b></p></section>
 <section><h2>Normas de referência</h2><div class="tw"><table><thead><tr><th>Norma</th><th>Assunto</th></tr></thead><tbody>${E.normas.map(([a, b]) => `<tr><td><b>${esc(a)}</b></td><td>${esc(b)}</td></tr>`).join("")}</tbody></table></div><p class="small">Confira sempre a vigência em <a href="${esc(L.CFP.legislacao)}" target="_blank" rel="noopener">Legislação do CFP</a>.</p></section></article>` }));

out("central", page({ slug: "central", title: "Central de Privacidade, Segurança e Ética", desc: "Políticas, termos, ética profissional e canal de privacidade da ZOEVITA.", body: `<article class="doc"><nav class="crumbs" aria-label="Caminho"><a href="../">Início</a> › <span>Privacidade, Segurança e Ética</span></nav>
 <h1>Central de Privacidade, Segurança e Ética</h1><p class="lead">Como a ZOEVITA trata dados, protege o sigilo clínico e apoia a ética profissional. Documentos na versão ${esc(L.version)} · ${esc(L.status)}.</p>
 <div class="cards">${ALL.map(([h, t], i) => `<a class="card" href="../${h}"><small>${i + 1}</small><b>${esc(t)}</b></a>`).join("")}</div></article>` }));

fs.writeFileSync(path.join(here, "index.html"), page({ slug: "", title: "Gestão clínica para psicólogas", desc: "ZOEVITA: agenda, prontuário, estimulação bilateral, teleconsulta e financeiro, com privacidade e ética no centro.", body: `
 <section class="hero"><img src="assets/logo.png" alt="" width="96" height="96"><p class="eyebrow">Pessoas • Histórias • Recomeços</p><h1>ZOEVITA</h1><p class="lead">Gestão clínica para psicólogas e psicólogos: agenda, prontuário eletrônico, estimulação bilateral, teleconsulta e financeiro, com o sigilo no centro.</p>
 <div class="acts"><a class="btn" href="${APP_URL}">Abrir o aplicativo</a><a class="btn ghost" href="central/">Privacidade, Segurança e Ética</a></div></section>
 <section class="pillars"><div><h2>Sigilo por desenho</h2><p>Prontuários ficam no aparelho do profissional, com bloqueio por PIN, registro de acessos e notificações sem dados clínicos.</p></div>
 <div><h2>Ética em primeiro lugar</h2><p>Acesso direto ao Código de Ética do CFP. A ferramenta apoia; a responsabilidade técnica e ética é do profissional.</p></div>
 <div><h2>Transparência</h2><p>Políticas com versão e data, o que está implementado e o que ainda está planejado, e um canal com protocolo.</p></div></section>` }));
console.log("Site gerado em", here);
