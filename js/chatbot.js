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
    .replace(/[^a-z0-9\s']/gi, " ");

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
  function matchRule(rules, msg) {
    const m = norm(msg);
    for (const rule of rules) if (rule.k.some(k => m.includes(norm(k)))) return rule;
    return null;
  }

  /* ---------- STATO ---------- */
  const state = { mode: "mario", pazienza: 0, dirStep: 0, started: false };

  /* ---------- MOTORE RISPOSTE ---------- */
  function replyAsMario(msg) {
    const rule = matchRule(CHAT_MARIO, msg);
    // parole che fanno "salire il sangue": aumentano la pazienza persa
    const hot = /(lavatric|contratto|frigo|paga|soldi|bomba|terrorist|rotto|cojon|coglion|basta|truffa|appioppi|appoppi|obzional)/i.test(norm(msg));
    if (hot) state.pazienza = Math.min(3, state.pazienza + 1);
    else state.pazienza = Math.min(3, state.pazienza + (Math.random() < 0.4 ? 1 : 0));

    if (rule) {
      // ai livelli alti, ogni tanto rincara con uno sfogo del livello
      if (state.pazienza >= 2 && Math.random() < 0.45) return pick(CHAT_MARIO_LIV[state.pazienza]);
      return pick(rule.r);
    }
    // niente parola chiave: sfogo del livello attuale (o fallback se ancora calmo)
    if (state.pazienza === 0 && Math.random() < 0.5) return pick(CHAT_MARIO_FALLBACK);
    return pick(CHAT_MARIO_LIV[state.pazienza]);
  }
  function replyAsDirettore(msg) {
    const rule = matchRule(CHAT_DIR, msg);
    if (rule && Math.random() < 0.7) return pick(rule.r);
    // altrimenti sali di un gradino nella scala di clausole assurde
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
     <div class="chat-body" aria-live="polite"></div>
     <form class="chat-form">
       <input type="text" maxlength="200" autocomplete="off" placeholder="${t("chat.placeholder")}" aria-label="${t("chat.placeholder")}" />
       <button type="submit" class="btn btn-primary btn-xs">${t("chat.send")}</button>
     </form>`;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const body = $(".chat-body", panel), form = $(".chat-form", panel),
        input = $("input", form), closeBtn = $(".chat-close", panel);

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
    botSays(state.mode === "mario" ? pick(CHAT_MARIO_SALUTI) : pick(CHAT_DIR_SALUTI));
  }

  /* mode switch */
  panel.querySelectorAll(".cm-btn").forEach(btn => btn.addEventListener("click", () => {
    if (btn.dataset.mode === state.mode) return;
    panel.querySelectorAll(".cm-btn").forEach(b => b.classList.toggle("active", b === btn));
    state.mode = btn.dataset.mode;
    input.placeholder = state.mode === "mario" ? t("chat.placeholder") : t("chat.placeholder.dir");
    resetConversation();
  }));

  function openChat(open) {
    panel.hidden = !open;
    launcher.classList.toggle("hidden", open);
    if (open && !state.started) { state.started = true; resetConversation(); }
    if (open) setTimeout(() => input.focus(), 120);
  }
  launcher.addEventListener("click", () => openChat(true));
  closeBtn.addEventListener("click", () => openChat(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) openChat(false); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    bubble(msg, "user");
    input.value = "";
    botSays(state.mode === "mario" ? replyAsMario(msg) : replyAsDirettore(msg));
  });
})();
