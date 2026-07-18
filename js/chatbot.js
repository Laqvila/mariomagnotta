/* =========================================================
   CHATTA CON MARIO — motore dall'app ufficiale Magnotta.
   Risponde con le FRASI e l'AUDIO REALE di Mario (assets/audio/).
   Database frasi: js/chat-quotes.js (CHAT_QUOTES).
   Intenti/parole chiave: sotto (CHAT_INTENTS) — facili da estendere.
   ========================================================= */
(function () {
  "use strict";
  if (typeof CHAT_QUOTES === "undefined" || !Array.isArray(CHAT_QUOTES)) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const AUDIO_DIR = "assets/audio/";

  const lang = () => localStorage.getItem("mm-lang") || "it";
  const t = (k) => { const e = (typeof I18N !== "undefined") && I18N[k]; return (e && (e[lang()] || e.it)) || k; };

  /* ---------- MOTORE (portato dall'app) ---------- */
  const CHAT_WELCOME_ID = 2;
  const SUGGESTIONS = (typeof CHAT_SUGGESTIONS !== "undefined" && CHAT_SUGGESTIONS.length)
    ? CHAT_SUGGESTIONS
    : ["Ciao Mario!", "Come stai?", "E la lavatrice?", "Chi è Bruno?", "Quanto costa?", "Sei arrabbiato?", "Chi sei?", "Ti disturbo?"];

  // Parole chiave (con * = prefisso) → id delle frasi pertinenti.
  const CHAT_INTENTS = [
    { kw: ['ciao','salve','buongiorno','buonasera','buonanotte','pronto','ehi','hey'], ids: [2,17,45,151,101] },
    { kw: ['chi sei','come ti chiami','ti chiami','presentati','chi e lei','tuo nome','chi parla'], ids: [21,52,257] },
    { kw: ['come stai','come va','tutto bene','come ti senti','stai bene','come te la passi'], ids: [27,59,102,301] },
    { kw: ['lavatric*','bucato','panni','lavaggi*','lavare'], ids: [33,36,78,111,118,122,128,140,143] },
    { kw: ['san giorgio'], ids: [40,42,86,104,133] },
    { kw: ['frigo*','congelator*'], ids: [9,24,32,38] },
    { kw: ['lavastoviglie'], ids: [34] },
    { kw: ['asciugacapelli','bigodin*','phon'], ids: [5,7] },
    { kw: ['moglie','sposat*','matrimonio','signora'], ids: [159,165,185,193,299,306,307] },
    { kw: ['bruno','amante','tradiment*','tradit*','corna'], ids: [154,155,158,176,183,217] },
    { kw: ['sold*','pagar*','pagat*','cost*','prezzo','lire','euro','milion*','denaro','gratis'], ids: [64,77,97,113,120,162,177,178,258] },
    { kw: ['arrabbiat*','incazz*','calmat*','calma','nervos*','rilassat*'], ids: [41,89,117,127,136] },
    { kw: ['telefon*','chiamat*','chiamare','squill*','numero'], ids: [45,157,172,182,260] },
    { kw: ['milano'], ids: [2,11,31,60] },
    { kw: ['aquila'], ids: [13,257] },
    { kw: ['polizi*','carabinier*','denunc*','questura','113'], ids: [12,70,73,205] },
    { kw: ['avvocat*','giudic*','tribunal*','procura'], ids: [70,131,197,261] },
    { kw: ['stupid*','scem*','cretin*','idiot*','pirla','ignorant*','deficien*'], ids: [29,30,54,85,96,98] },
    { kw: ['romp*','disturb*','fastidi*','scocci*'], ids: [46,47,91,115,240] },
    { kw: ['grazie','gentil*','bravo','complimenti','simpatico'], ids: [60,65,95,263] },
    { kw: ['arrivederci','addio','a dopo','a presto','ci vediamo','vado via','me ne vado','devo andare'], ids: [240,282,228] },
    { kw: ['figli*','famiglia','bambin*'], ids: [248,275,299,308] },
    { kw: ['lavor*','scuol*','bidell*','pasticc*','cannol*','mestiere'], ids: [13,167,180,210] },
    { kw: ['direttor*','capo','ragionier*'], ids: [68,81,100,112] },
    { kw: ['contratt*','firmat*','firmare','firma'], ids: [18,36,174] },
    { kw: ['acqua','bere','sete'], ids: [224] },
    { kw: ['amor*','fidanzat*','innamorat*'], ids: [280,305,307,310] },
    { kw: ['truffa*','truffator*','imbrogl*','fregat*'], ids: [87,124] },
    { kw: ['radio','musica','canzone'], ids: [32] },
    { kw: ['tecnic*','riparar*','aggiustar*','furgone'], ids: [26,42,119] },
    { kw: ['comprar*','comprat*','negozio','bontempo','bontempi'], ids: [20,63,77,93,101] },
    { kw: ['va bene','ok','okay','certo','esatto','giusto','d accordo'], ids: [20,116,121], weak: true },
    { kw: ['si'], ids: [121,116], weak: true },
    { kw: ['no','mai','niente'], ids: [15,108,118,123], weak: true },
    { kw: ['perche','come mai'], ids: [24,109,136], weak: true },
  ];
  const CHAT_FALLBACK = [3,6,8,53,168,181,209];
  const CHAT_STOP = new Set(('che non per con una uno il lo la le gli di da in su mi ti si ci vi e o ma se io tu lui lei noi voi ' +
    'loro mo sta sto sono sei sia come cosa chi perche quando dove questo questa quello quella del della dei delle degli ' +
    'al alla ai alle un ho hai ha hanno essere ed anche piu gia mia mio tua tuo sua suo ne li stai stato molto poi qua qui ' +
    'eh oh ma pure cazzo porcoddi senti senta guarda guardi allora insomma vabbe').split(' '));

  const QMAP = new Map(CHAT_QUOTES.map(q => [q.id, q]));
  const findQuote = (id) => QMAP.get(Number(id));
  const chatNorm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

  let chatIndex = null, recent = [];
  function buildChatIndex() {
    chatIndex = new Map();
    for (const q of CHAT_QUOTES)
      chatIndex.set(q.id, new Set(chatNorm(q.text).split(' ').filter(w => w.length >= 3 && !CHAT_STOP.has(w))));
  }
  function pickFrom(ids) {
    let pool = ids.filter(id => !recent.includes(id));
    if (!pool.length) pool = ids;
    const id = pool[Math.floor(Math.random() * pool.length)];
    recent.push(id); if (recent.length > 8) recent.shift();
    return findQuote(id);
  }
  function textMatch(tokens) {
    if (!chatIndex) buildChatIndex();
    let best = 0; const scores = [];
    for (const [id, qTokens] of chatIndex) {
      let s = 0;
      for (const w of tokens) {
        if (w.length < 3 || CHAT_STOP.has(w)) continue;
        for (const qt of qTokens) {
          if (qt === w) { s += w.length; break; }
          if (w.length >= 5 && qt.length >= 5 && qt.slice(0, 5) === w.slice(0, 5)) { s += 3; break; }
        }
      }
      if (s > 0) { scores.push([id, s]); if (s > best) best = s; }
    }
    if (!best) return null;
    return scores.filter(([, s]) => s >= best * 0.75).map(([id]) => id);
  }
  function chatReply(userText) {
    const norm = chatNorm(userText), padded = ' ' + norm + ' ';
    const tokens = norm.split(' ').filter(Boolean);
    let bestScore = 0, bestIds = null;
    for (const intent of CHAT_INTENTS) {
      let hits = 0;
      for (const kw of intent.kw) {
        if (kw.includes(' ')) { if (padded.includes(' ' + kw + ' ')) hits += 2; }
        else if (kw.endsWith('*')) { const base = kw.slice(0, -1); if (tokens.some(w => w.startsWith(base))) hits++; }
        else if (tokens.includes(kw)) hits++;
      }
      if (!hits) continue;
      const s = (intent.weak ? 10 : 100) + hits;
      if (s > bestScore) { bestScore = s; bestIds = intent.ids; }
    }
    if (bestScore >= 100) return pickFrom(bestIds);
    const matched = textMatch(tokens);
    if (matched) return pickFrom(matched);
    if (bestIds) return pickFrom(bestIds);
    return pickFrom(CHAT_FALLBACK);
  }

  /* ---------- AUDIO ---------- */
  const audio = new Audio();
  audio.preload = "none";
  function playClip(q, bubbleEl) {
    if (!q || !q.audioFileName) return;
    $$(".chat-msg.speaking").forEach(b => b.classList.remove("speaking"));
    try { audio.pause(); } catch (e) {}
    audio.src = AUDIO_DIR + q.audioFileName;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    if (bubbleEl) bubbleEl.classList.add("speaking");
  }
  audio.addEventListener("ended", () => $$(".chat-msg.speaking").forEach(b => b.classList.remove("speaking")));

  /* ---------- UI ---------- */
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

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
       <button class="chat-trash" aria-label="${t("chat.clear")}" title="${t("chat.clear")}">🗑</button>
       <button class="chat-close" aria-label="Chiudi">✕</button>
     </div>
     <div class="chat-body" id="chat-log" aria-live="polite"></div>
     <div class="chat-suggest" id="chat-suggest"></div>
     <form class="chat-form">
       <input type="text" maxlength="200" autocomplete="off" enterkeyhint="send" placeholder="${t("chat.placeholder")}" aria-label="${t("chat.placeholder")}" />
       <button type="submit" class="btn btn-primary btn-xs" aria-label="${t("chat.send")}">➤</button>
     </form>`;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const logEl = $("#chat-log", panel), suggestEl = $("#chat-suggest", panel),
        form = $(".chat-form", panel), input = $("input", form),
        closeBtn = $(".chat-close", panel), trashBtn = $(".chat-trash", panel);

  const CHAT_KEY = "mm-chat-audio";
  let history = [];
  try { history = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]"); } catch (e) { history = []; }
  const save = () => localStorage.setItem(CHAT_KEY, JSON.stringify(history.slice(-60)));

  function bubbleHTML(m) {
    if (m.who === "me") return `<div class="chat-msg user">${esc(m.text)}</div>`;
    const replay = m.qid ? `<button class="msg-replay" data-qid="${m.qid}" aria-label="Riascolta">▶</button>` : "";
    return `<div class="chat-msg mario" data-qid="${m.qid || ""}">${replay}<span>${esc(m.text)}</span></div>`;
  }
  function renderLog() { logEl.innerHTML = history.map(bubbleHTML).join(""); scrollBottom(); }
  function scrollBottom() { requestAnimationFrame(() => { logEl.scrollTop = logEl.scrollHeight; }); }
  function addMsg(who, text, qid) {
    const m = { who, text, qid }; history.push(m); save();
    logEl.insertAdjacentHTML("beforeend", bubbleHTML(m)); scrollBottom();
    return logEl.lastElementChild;
  }

  let busy = false;
  function send(text) {
    const msg = (text || "").trim();
    if (!msg || busy) return;
    busy = true;
    addMsg("me", msg);
    const typing = document.createElement("div");
    typing.className = "chat-msg mario typing"; typing.innerHTML = "<i></i><i></i><i></i>";
    logEl.appendChild(typing); scrollBottom();
    setTimeout(() => {
      typing.remove();
      const q = chatReply(msg);
      const bubble = addMsg("mario", q.text, q.id);
      playClip(q, bubble);
      busy = false;
      fitViewport();
    }, 600 + Math.random() * 500);
  }

  function renderSuggest() {
    suggestEl.innerHTML = SUGGESTIONS.map(s => `<button class="suggest-chip" type="button">${esc(s)}</button>`).join("");
  }

  function enterChat() {
    renderLog();
    if (!history.length) { const q = findQuote(CHAT_WELCOME_ID); if (q) addMsg("mario", q.text, q.id); }
    scrollBottom();
  }

  /* eventi */
  form.addEventListener("submit", e => { e.preventDefault(); send(input.value); input.value = ""; input.focus(); });
  suggestEl.addEventListener("click", e => { const c = e.target.closest(".suggest-chip"); if (c) send(c.textContent); });
  logEl.addEventListener("click", e => {
    const b = e.target.closest(".msg-replay"); if (!b) return;
    playClip(findQuote(b.dataset.qid), b.closest(".chat-msg"));
  });
  trashBtn.addEventListener("click", () => { history = []; save(); renderLog(); enterChat(); });

  /* ---------- FIT tastiera mobile (VisualViewport) ---------- */
  const isMobile = () => matchMedia("(max-width:600px)").matches;
  const vv = window.visualViewport;
  function fitViewport() {
    if (panel.hidden || !isMobile() || !vv) return;
    panel.style.height = vv.height + "px";
    panel.style.top = vv.offsetTop + "px";
    scrollBottom();
  }
  function clearFit() { panel.style.height = ""; panel.style.top = ""; }
  if (vv) { vv.addEventListener("resize", fitViewport); vv.addEventListener("scroll", fitViewport); }

  let started = false;
  function openChat(open) {
    panel.hidden = !open;
    launcher.classList.toggle("hidden", open);
    document.body.classList.toggle("chat-open", open);
    if (open && !started) { started = true; renderSuggest(); enterChat(); }
    if (open) { fitViewport(); setTimeout(() => { input.focus(); fitViewport(); }, 130); }
    else { clearFit(); try { audio.pause(); } catch (e) {} }
  }
  launcher.addEventListener("click", () => openChat(true));
  closeBtn.addEventListener("click", () => openChat(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) openChat(false); });
  input.addEventListener("focus", () => setTimeout(fitViewport, 150));
  input.addEventListener("blur", () => setTimeout(fitViewport, 150));
})();
