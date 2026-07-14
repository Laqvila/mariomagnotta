/* =========================================================
   CHATTA CON MARIO — chatbot parodia 100% statico
   Le frasi si modificano in js/contenuti.js (CHAT_*).
   ========================================================= */
(function () {
  "use strict";
  if (typeof CHAT_REGOLE === "undefined") return;
  const $ = (s, r = document) => r.querySelector(s);

  /* i18n helper (usa I18N/LANG del sito se presenti) */
  const lang = () => localStorage.getItem("mm-lang") || "it";
  const t = (k) => { const e = (typeof I18N !== "undefined") && I18N[k]; return (e && (e[lang()] || e.it)) || k; };

  const norm = (s) => s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9à-ù\s]/gi, " ");
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function reply(msg) {
    const m = norm(msg);
    for (const rule of CHAT_REGOLE) {
      if (rule.k.some(k => m.includes(norm(k)))) return pick(rule.r);
    }
    return pick(CHAT_FALLBACK);
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
       <div class="chat-head-txt">
         <strong>${t("chat.title")}</strong>
         <small>${t("chat.sub")}</small>
       </div>
       <button class="chat-close" aria-label="✕">✕</button>
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
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
    return b;
  }
  function botSays(text) {
    const typing = bubble("…", "bot typing");
    setTimeout(() => {
      typing.classList.remove("typing");
      typing.textContent = text;
      body.scrollTop = body.scrollHeight;
    }, 450 + Math.min(text.length * 14, 1100));
  }

  let opened = false;
  function openChat(open) {
    panel.hidden = !open;
    launcher.classList.toggle("hidden", open);
    if (open && !opened) { opened = true; botSays(pick(CHAT_BENVENUTO)); }
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
    botSays(reply(msg));
  });
})();
