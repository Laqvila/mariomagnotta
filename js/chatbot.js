/* =========================================================
   CHATTA CON MARIO — chatbot parodia 100% statico, 2 modalità
   Frasi autentiche dalle telefonate del 1987 (archivio magnotta.it).
   Dati (facilmente modificabili) in js/contenuti.js: CHAT_*.
   ========================================================= */
(function () {
  "use strict";
  if (typeof CHAT_MARIO === "undefined") return;
  const $ = (s, r = document) => r.querySelector(s);

  const lang = () => localStorage.getItem("mm-lang") || "it";
  const t = (k) => { const e = (typeof I18N !== "undefined") && I18N[k]; return (e && (e[lang()] || e.it)) || k; };

  const norm = (s) => (s || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s']/gi, " ").replace(/\s+/g, " ").trim();

  /* picker senza ripetizione immediata (memoria per singolo array) */
  const lastPick = new WeakMap();
  function pick(arr) {
    if (!arr || !arr.length) return "";
    if (arr.length === 1) return arr[0];
    let i, prev = lastPick.get(arr);
    do { i = Math.floor(Math.random() * arr.length); } while (i === prev);
    lastPick.set(arr, i);
    return arr[i];
  }
  /* match PIÙ PERTINENTE: sceglie la regola con più parole chiave trovate
     (a parità, quella con la keyword più lunga = più specifica) */
  function bestRule(rules, msg) {
    const m = " " + norm(msg) + " ";
    let best = null, bestScore = 0;
    for (const rule of rules) {
      let hits = 0, maxLen = 0;
      for (const k of rule.k) { const nk = norm(k); if (m.includes(nk)) { hits++; if (nk.length > maxLen) maxLen = nk.length; } }
      const score = hits * 100 + maxLen;
      if (hits > 0 && score > bestScore) { bestScore = score; best = rule; }
    }
    return best;
  }

  /* ---------- STATO ---------- */
  const state = { mode: "mario", pazienza: 0, dirStep: 0, started: false };

  function replyAsMario(msg) {
    const rule = bestRule(CHAT_MARIO, msg);
    const hot = /(lavatric|contratto|frigo|paga|soldi|bomba|terrorist|rotto|cojon|coglion|basta|truffa|appioppi|appoppi|obzional|morto|denunc)/.test(norm(msg));
    if (hot) state.pazienza = Math.min(3, state.pazienza + 1);
    else state.pazienza = Math.min(3, state.pazienza + (Math.random() < 0.35 ? 1 : 0));
    setMeter();
    if (rule) {
      if (state.pazienza >= 2 && Math.random() < 0.4) return pick(CHAT_MARIO_LIV[state.pazienza]);
      return pick(rule.r);
    }
    if (state.pazienza === 0 && Math.random() < 0.5) return pick(CHAT_MARIO_FALLBACK);
    return pick(CHAT_MARIO_LIV[state.pazienza]);
  }
  function replyAsDirettore(msg) {
    const rule = bestRule(CHAT_DIR, msg);
    if (rule && Math.random() < 0.7) return pick(rule.r);
    if (state.dirStep < CHAT_DIR_LADDER.length) return CHAT_DIR_LADDER[state.dirStep++];
    return pick(CHAT_DIR_FALLBACK);
  }

  /* ---------- UI ---------- */
  const launcher = document.createElement("button");
  launcher.className = "chat-launcher";
  launcher.setAttribute("aria-label", t("chat.open"));
  launcher.innerHTML = `<span class="cl-icon">☎️</span><span class="cl-txt">${t("chat.open")}</span>`;

  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.hidden = true;
  panel.innerHTML =
    `<div class="chat-head">
       <div class="chat-avatar"><img src="assets/img/magnotta-ritratto.jpg" alt="Mario Magnotta" /></div>
       <div class="chat-head-txt"><strong>${t("chat.title")}</strong><small>${t("chat.sub")}</small></div>
       <button class="chat-close" aria-label="Chiudi">✕</button>
     </div>
     <div class="chat-modes">
       <button class="cm-btn active" data-mode="mario">${t("chat.mode.mario")}</button>
       <button class="cm-btn" data-mode="dir">${t("chat.mode.dir")}</button>
     </div>
     <div class="chat-meter" aria-hidden="true">
       <span class="me-emoji">😐</span>
       <span class="me-label">${t("chat.anger")}</span>
       <span class="me-bar"><i></i></span>
     </div>
     <div class="chat-body" aria-live="polite"></div>
     <form class="chat-form">
       <input type="text" maxlength="200" autocomplete="off" enterkeyhint="send" placeholder="${t("chat.placeholder")}" aria-label="${t("chat.placeholder")}" />
       <button type="submit" class="btn btn-primary btn-xs">${t("chat.send")}</button>
     </form>`;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const body = $(".chat-body", panel), form = $(".chat-form", panel),
        input = $("input", form), closeBtn = $(".chat-close", panel),
        meter = $(".chat-meter", panel), meterBar = $(".me-bar i", panel), meterEmoji = $(".me-emoji", panel);

  const ANGER_EMOJI = ["😐", "😠", "😡", "🤬"];
  function setMeter() {
    if (state.mode !== "mario") { meter.style.display = "none"; return; }
    meter.style.display = "flex";
    meterBar.style.width = ((state.pazienza / 3) * 100) + "%";
    meter.dataset.lvl = state.pazienza;
    meterEmoji.textContent = ANGER_EMOJI[state.pazienza];
  }

  function bubble(text, who) {
    const b = document.createElement("div");
    b.className = "chat-msg " + who;
    b.textContent = text;
    body.appendChild(b); body.scrollTop = body.scrollHeight;
    return b;
  }
  function botSays(text) {
    const typing = bubble("…", "bot typing");
    setTimeout(() => {
      typing.classList.remove("typing");
      typing.textContent = text;
      body.scrollTop = body.scrollHeight;
    }, 420 + Math.min(text.length * 13, 1100));
  }

  function resetConversation() {
    body.innerHTML = "";
    state.pazienza = 0; state.dirStep = 0;
    setMeter();
    botSays(state.mode === "mario" ? pick(CHAT_MARIO_SALUTI) : pick(CHAT_DIR_SALUTI));
  }

  panel.querySelectorAll(".cm-btn").forEach(btn => btn.addEventListener("click", () => {
    if (btn.dataset.mode === state.mode) return;
    panel.querySelectorAll(".cm-btn").forEach(b => b.classList.toggle("active", b === btn));
    state.mode = btn.dataset.mode;
    input.placeholder = state.mode === "mario" ? t("chat.placeholder") : t("chat.placeholder.dir");
    resetConversation();
  }));

  /* ---------- FIT alla tastiera mobile (VisualViewport) ---------- */
  const isMobile = () => matchMedia("(max-width:600px)").matches;
  const vv = window.visualViewport;
  function fitViewport() {
    if (panel.hidden || !isMobile() || !vv) return;
    panel.style.height = vv.height + "px";
    panel.style.top = vv.offsetTop + "px";
    body.scrollTop = body.scrollHeight;
  }
  function clearFit() { panel.style.height = ""; panel.style.top = ""; }
  if (vv) { vv.addEventListener("resize", fitViewport); vv.addEventListener("scroll", fitViewport); }

  function openChat(open) {
    panel.hidden = !open;
    launcher.classList.toggle("hidden", open);
    document.body.classList.toggle("chat-open", open);
    if (open && !state.started) { state.started = true; resetConversation(); }
    if (open) { fitViewport(); setTimeout(() => { input.focus(); fitViewport(); }, 130); }
    else clearFit();
  }
  launcher.addEventListener("click", () => openChat(true));
  closeBtn.addEventListener("click", () => openChat(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) openChat(false); });
  // quando l'input prende/perde il focus (tastiera su/giù) riadatta
  input.addEventListener("focus", () => setTimeout(fitViewport, 150));
  input.addEventListener("blur", () => setTimeout(() => { fitViewport(); }, 150));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    bubble(msg, "user");
    input.value = "";
    botSays(state.mode === "mario" ? replyAsMario(msg) : replyAsDirettore(msg));
    fitViewport();
  });
})();
