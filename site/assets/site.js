(function () {
  var KEY = "zv.site";
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function set(u) { try { localStorage.setItem(KEY, JSON.stringify(u)); } catch (e) {} apply(u); }
  function apply(u) {
    var r = document.documentElement;
    if (u.theme && u.theme !== "auto") r.setAttribute("data-theme", u.theme); else r.removeAttribute("data-theme");
    r.style.fontSize = u.text && +u.text !== 100 ? (u.text / 100 * 16) + "px" : "";
    r.classList.toggle("calm", !!u.motion);
    document.querySelectorAll(".cfg .seg").forEach(function (g) {
      var k = g.dataset.k, v = k === "theme" ? (u.theme || "auto") : k === "text" ? String(u.text || 100) : (u.motion ? "1" : "");
      g.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === v)); });
    });
  }
  var cfg = document.getElementById("cfg"), btn = document.getElementById("cfg-btn");
  function open(o) { cfg.hidden = !o; btn.setAttribute("aria-expanded", String(o)); if (o) cfg.querySelector("button").focus(); else btn.focus(); }
  btn.addEventListener("click", function () { open(cfg.hidden); });
  document.getElementById("cfg-x").addEventListener("click", function () { open(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !cfg.hidden) open(false); });
  document.addEventListener("click", function (e) { if (!cfg.hidden && !cfg.contains(e.target) && !btn.contains(e.target)) open(false); });
  cfg.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () { var u = get(), k = b.parentNode.dataset.k; u[k] = k === "text" ? +b.dataset.v : b.dataset.v; set(u); });
  });
  apply(get());

  var pb = document.getElementById("pdf-btn");
  if (pb) pb.addEventListener("click", function () {
    var box = document.getElementById("pdf"), f = box.querySelector("iframe"), o = box.hidden;
    if (o && !f.src) f.src = f.dataset.src;
    box.hidden = !o; pb.setAttribute("aria-expanded", String(o)); pb.textContent = o ? "Fechar visualizador" : "Ver o PDF aqui";
  });

  var f = document.getElementById("canal");
  if (f) {
    var RX = /diagn[oó]stic|\bcid\b|\bf\d{2}|transtorno|depress|ansiedade|medica[cç]|rem[eé]dio|suic|abuso|trauma|relato/i, m = document.getElementById("cn-msg");
    m.addEventListener("input", function () { document.getElementById("cn-warn").textContent = RX.test(m.value) ? "Atenção: parece haver dado clínico na mensagem. Ele não é necessário para atender o pedido; considere retirar." : ""; });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("cn-nome").value.trim(), email = document.getElementById("cn-email").value.trim(), msg = m.value.trim(), sel = document.getElementById("cn-tipo"), tl = sel.options[sel.selectedIndex].text, rel = document.getElementById("cn-rel").value;
      if (!nome || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || msg.length < 5) { document.getElementById("cn-warn").textContent = "Preencha nome, e-mail válido e mensagem."; return; }
      var A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", r = new Uint8Array(5); crypto.getRandomValues(r);
      var d = new Date(), p2 = function (n) { return String(n).padStart(2, "0"); };
      var proto = "ZV-" + d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + "-" + Array.prototype.map.call(r, function (x) { return A[x % A.length]; }).join("");
      var body = "Protocolo: " + proto + "\nTipo: " + tl + "\nNome: " + nome + "\nE-mail para resposta: " + email + "\nVínculo: " + rel + "\nData: " + d.toLocaleString("pt-BR") + "\n\n" + msg + "\n\n— Enviado pelo Canal de Privacidade e Segurança da ZOEVITA";
      var done = document.getElementById("cn-done");
      done.innerHTML = "<p>Seu protocolo é</p><p class=\"proto\">" + proto + "</p><p>Abrimos o seu aplicativo de e-mail com a mensagem pronta. Confira e envie. Se nada abrir, escreva para <a href=\"mailto:atendimento@zoevita.net.br\">atendimento@zoevita.net.br</a> informando o protocolo.</p>";
      done.hidden = false; f.hidden = true; done.scrollIntoView({ behavior: "smooth", block: "center" });
      location.href = "mailto:atendimento@zoevita.net.br?subject=" + encodeURIComponent("[ZOEVITA] " + proto + " · " + tl) + "&body=" + encodeURIComponent(body);
    });
  }
})();
