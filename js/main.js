/* =========================================================
   MARIO MAGNOTTA v2 — i18n, cookie consent, render, audio
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };

  /* =========================================================
     LINGUA / i18n
     ========================================================= */
  const LANGS = ["it", "en", "es"];
  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.includes(q)) return q;
    const saved = localStorage.getItem("mm-lang");
    if (saved && LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "it").slice(0, 2);
    return LANGS.includes(nav) ? nav : "it";
  }
  let LANG = detectLang();
  const t = (key) => { const e = (typeof I18N !== "undefined") && I18N[key]; return (e && (e[LANG] || e.it)) || key; };
  const tr = (obj) => obj ? (typeof obj === "string" ? obj : (obj[LANG] || obj.it)) : "";

  function applyStatic() {
    document.documentElement.lang = LANG;
    $$("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    $$("[data-i18n-html]").forEach(n => { n.innerHTML = t(n.dataset.i18nHtml); });
    $$("#lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === LANG));
  }

  /* =========================================================
     COOKIE CONSENT
     ========================================================= */
  const CONSENT_KEY = "mm-consent";
  const hasYTConsent = () => localStorage.getItem(CONSENT_KEY) === "all";
  const banner = $("#cookie-banner");
  function showBanner() { if (banner && !localStorage.getItem(CONSENT_KEY)) banner.hidden = false; }
  function setConsent(v) {
    localStorage.setItem(CONSENT_KEY, v);
    if (banner) banner.hidden = true;
    if (v === "all") document.dispatchEvent(new Event("yt-consent-granted"));
  }
  $("#cookie-accept") && $("#cookie-accept").addEventListener("click", () => setConsent("all"));
  $("#cookie-reject") && $("#cookie-reject").addEventListener("click", () => setConsent("necessary"));

  /* privacy modal */
  const pModal = $("#privacy-modal");
  function openPrivacy(e) { if (e) e.preventDefault(); if (pModal) pModal.hidden = false; }
  function closePrivacy() { if (pModal) pModal.hidden = true; }
  $("#open-privacy") && $("#open-privacy").addEventListener("click", openPrivacy);
  $("#privacy-x") && $("#privacy-x").addEventListener("click", closePrivacy);
  $("#privacy-close") && $("#privacy-close").addEventListener("click", closePrivacy);
  pModal && pModal.addEventListener("click", e => { if (e.target === pModal) closePrivacy(); });

  /* =========================================================
     YOUTUBE IFRAME API (audio fallback)
     ========================================================= */
  let ytReadyResolve;
  const ytReady = new Promise(res => { ytReadyResolve = res; });
  window.onYouTubeIframeAPIReady = () => ytReadyResolve();
  function loadYTApi() {
    if (window.YT && window.YT.Player) { ytReadyResolve(); return; }
    if (document.getElementById("yt-iframe-api")) return;
    const s = document.createElement("script");
    s.id = "yt-iframe-api"; s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }

  /* =========================================================
     COMMON HELPERS
     ========================================================= */
  const YT_THUMB = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const YT_WATCH = id => `https://www.youtube.com/watch?v=${id}`;

  function embedFrame(thumb, id, title, start) {
    const s = start ? "&start=" + start : "";
    thumb.innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${s}"
        title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
  }
  /* video thumb behaviour with consent gate */
  function wireThumb(thumb, id, title, start) {
    thumb.addEventListener("click", () => {
      if (hasYTConsent()) { embedFrame(thumb, id, title, start); return; }
      showConsentOverlay(thumb, () => embedFrame(thumb, id, title, start), id);
    });
  }
  function showConsentOverlay(thumb, onAccept, id) {
    const ov = el("div", "consent-overlay",
      `<p>${t("consent.needed")}</p>
       <button class="btn btn-primary btn-sm cv-accept">${t("consent.btn")}</button>
       <a href="${YT_WATCH(id)}" target="_blank" rel="noopener" class="cv-yt">${t("consent.yt")}</a>`);
    $(".cv-accept", ov).addEventListener("click", (e) => { e.stopPropagation(); setConsent("all"); onAccept(); });
    thumb.appendChild(ov);
  }
  document.addEventListener("yt-consent-granted", () => { $$(".consent-overlay").forEach(o => o.remove()); });

  /* =========================================================
     AUDIO PLAYER (MP3 locale + fallback YouTube, consent-aware)
     ========================================================= */
  let activeBar = null;
  const host = $("#yt-audio-host");
  function fmtTime(s) { if (!isFinite(s) || s < 0) s = 0; const m = Math.floor(s / 60), ss = Math.floor(s % 60); return m + ":" + (ss < 10 ? "0" : "") + ss; }

  function buildAudioBar(v) {
    const bar = el("div", "audiobar");
    bar.innerHTML =
      `<button class="ab-play" aria-label="Audio">▶</button>
       <div class="ab-mid"><div class="ab-label">${t("audio.label")}</div>
         <div class="ab-track"><div class="ab-fill"></div></div></div>
       <div class="ab-time">0:00</div>`;
    const btn = $(".ab-play", bar), fill = $(".ab-fill", bar), time = $(".ab-time", bar), track = $(".ab-track", bar);
    const state = { mode: null, audio: null, yt: null, playing: false, raf: 0, dur: 0 };
    const api = { pause };
    function setBtn(p) { btn.textContent = p ? "❚❚" : "▶"; bar.classList.toggle("playing", p); state.playing = p; }
    function tick() {
      let cur = 0, dur = state.dur;
      if (state.mode === "local" && state.audio) { cur = state.audio.currentTime; dur = state.audio.duration || dur; }
      else if (state.mode === "yt" && state.yt && state.yt.getCurrentTime) { cur = state.yt.getCurrentTime(); dur = state.yt.getDuration() || dur; }
      state.dur = dur;
      fill.style.width = dur ? (cur / dur * 100) + "%" : "0%";
      time.textContent = fmtTime(cur) + (dur ? " / " + fmtTime(dur) : "");
      if (state.playing) state.raf = requestAnimationFrame(tick);
    }
    function startTick() { cancelAnimationFrame(state.raf); state.raf = requestAnimationFrame(tick); }
    function pause() {
      if (state.mode === "local" && state.audio) state.audio.pause();
      else if (state.mode === "yt" && state.yt) state.yt.pauseVideo();
      setBtn(false); cancelAnimationFrame(state.raf);
    }
    function reallyPlay() {
      if (activeBar && activeBar !== api) activeBar.pause();
      activeBar = api;
      if (state.mode === "local" && state.audio) { state.audio.play(); setBtn(true); startTick(); }
      else if (state.mode === "yt" && state.yt) { state.yt.playVideo(); setBtn(true); startTick(); }
    }
    function initYT() {
      bar.classList.add("loading");
      loadYTApi();
      ytReady.then(() => {
        const mount = el("div"); host.appendChild(mount);
        state.yt = new YT.Player(mount, {
          videoId: v.id, height: "1", width: "1",
          playerVars: { autoplay: 0, controls: 0, disablekb: 1, playsinline: 1 },
          events: {
            onReady: () => { state.mode = "yt"; bar.classList.remove("loading"); reallyPlay(); },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.ENDED) { setBtn(false); fill.style.width = "0%"; }
              else if (e.data === YT.PlayerState.PLAYING) setBtn(true);
              else if (e.data === YT.PlayerState.PAUSED) setBtn(false);
            }
          }
        });
      });
    }
    function needYT() {
      if (hasYTConsent()) { initYT(); return; }
      // ask consent inline
      bar.classList.add("need-consent");
      const ask = el("div", "ab-consent", `<span>${t("consent.needed")}</span><button class="btn btn-primary btn-xs">${t("consent.btn")}</button>`);
      $("button", ask).addEventListener("click", () => { setConsent("all"); ask.remove(); bar.classList.remove("need-consent"); initYT(); });
      bar.appendChild(ask);
    }
    function initLocal(onFail) {
      const a = new Audio(); a.preload = "metadata"; a.src = v.audio;
      a.addEventListener("error", onFail, { once: true });
      a.addEventListener("loadedmetadata", () => { state.mode = "local"; state.audio = a; state.dur = a.duration; reallyPlay(); }, { once: true });
      a.addEventListener("ended", () => { setBtn(false); fill.style.width = "0%"; });
    }
    btn.addEventListener("click", () => {
      if (state.playing) { pause(); return; }
      if (state.mode) { reallyPlay(); return; }
      if (v.audio) initLocal(() => needYT()); else needYT();
    });
    track.addEventListener("click", (e) => {
      const r = track.getBoundingClientRect(), ratio = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
      if (state.mode === "local" && state.audio && state.audio.duration) state.audio.currentTime = ratio * state.audio.duration;
      else if (state.mode === "yt" && state.yt && state.yt.getDuration) state.yt.seekTo(ratio * state.yt.getDuration(), true);
    });
    return bar;
  }

  /* =========================================================
     RENDER (richiamato a ogni cambio lingua)
     ========================================================= */
  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }

  function renderVideos() {
    const wrap = $("#gruppi"); if (!wrap || typeof GRUPPI === "undefined") return;
    clear(wrap);
    GRUPPI.forEach(g => {
      const block = el("div", "gruppo");
      block.appendChild(el("div", "gruppo-head reveal", `<h3>${tr(g.nome)}</h3><p>${tr(g.sotto)}</p>`));
      const grid = el("div", "video-grid");
      g.video.forEach(v => {
        const card = el("article", "vcard reveal");
        const thumb = el("div", "vthumb");
        thumb.innerHTML = `<img loading="lazy" src="${YT_THUMB(v.id)}" alt="${v.titolo}" /><span class="vbadge">${tr(v.badge)}</span><div class="vplay"><span>▶</span></div>`;
        wireThumb(thumb, v.id, v.titolo);
        card.appendChild(thumb);
        const body = el("div", "vbody", `<h3>${v.titolo}</h3><div class="vdate">📞 ${tr(v.data)}</div><p>${tr(v.desc)}</p>`);
        body.appendChild(buildAudioBar(v));
        card.appendChild(body);
        grid.appendChild(card);
      });
      block.appendChild(grid);
      wrap.appendChild(block);
    });
  }
  function renderSpeciali() {
    const sp = $("#speciali"); if (!sp || typeof SPECIALI === "undefined") return;
    clear(sp);
    SPECIALI.forEach(v => {
      const card = el("article", "scard reveal");
      const thumb = el("div", "vthumb");
      thumb.innerHTML = `<img loading="lazy" src="${YT_THUMB(v.id)}" alt="${tr(v.titolo)}" /><div class="vplay"><span>▶</span></div>`;
      wireThumb(thumb, v.id, tr(v.titolo));
      const txt = el("div", "scard-text", `<h3>⭐ ${tr(v.titolo)}</h3><p>${tr(v.desc)}</p>`);
      if (v.audio) txt.appendChild(buildAudioBar(v));
      card.appendChild(thumb); card.appendChild(txt);
      sp.appendChild(card);
    });
  }
  function renderGallery() {
    const gal = $("#gallery"); if (!gal || typeof GALLERIA === "undefined") return;
    clear(gal);
    GALLERIA.forEach((g, i) => {
      const fig = el("figure", "gal-item reveal");
      fig.style.setProperty("--d", (i * 0.06) + "s");
      fig.innerHTML = `<img loading="lazy" src="${g.src}" alt="${tr(g.cap)}" /><figcaption>${tr(g.cap)}</figcaption>`;
      fig.addEventListener("click", () => openLightbox(g.src, tr(g.cap)));
      gal.appendChild(fig);
    });
  }
  function renderTimeline() {
    const tl = $("#timeline-list"); if (!tl || typeof TIMELINE === "undefined") return;
    clear(tl);
    TIMELINE.forEach(x => tl.appendChild(el("div", "tl-item reveal", `<div class="tl-anno">${x.anno}</div><div><h4>${tr(x.t)}</h4><p>${tr(x.d)}</p></div>`)));
  }
  function renderFrasi() {
    const fg = $("#frasi-grid"); if (!fg || typeof FRASI === "undefined") return;
    clear(fg);
    FRASI.forEach(f => fg.appendChild(el("div", "frase", `<div class="q">«${f.t}»</div><div class="n">${tr(f.n)}</div>`)));
  }
  function renderChicche() {
    const cg = $("#chicche-grid"); if (!cg || typeof CHICCHE === "undefined") return;
    clear(cg);
    CHICCHE.forEach(c => cg.appendChild(el("article", "chicca reveal", `<div class="chicca-ico">${c.icona}</div><h3>${tr(c.t)}</h3><p>${tr(c.d)}</p>`)));
  }
  function renderEventi() {
    const eg = $("#eventi-grid"); if (!eg || typeof EVENTI === "undefined") return;
    clear(eg);
    EVENTI.forEach(e => {
      const card = el("article", "evento reveal",
        `<div class="ev-date"><span class="ev-badge">${tr(e.badge)}</span><span class="ev-day">${tr(e.data)}</span></div>
         <div class="ev-body"><h3>${tr(e.titolo)}</h3><div class="ev-meta">📍 ${tr(e.luogo)}</div><div class="ev-org">${tr(e.org)}</div><p>${tr(e.desc)}</p>
         ${e.url ? `<a class="ev-link" href="${e.url}" target="_blank" rel="noopener">${t("news.read")}</a>` : ""}</div>`);
      if (e.video) {
        const body = $(".ev-body", card);
        const vbox = el("div", "ev-video");
        const thumb = el("div", "vthumb");
        thumb.innerHTML = `<img loading="lazy" src="${YT_THUMB(e.video)}" alt="${tr(e.titolo)}" /><div class="vplay"><span>▶</span></div>`;
        wireThumb(thumb, e.video, tr(e.titolo), e.videoStart);
        vbox.appendChild(thumb);
        if (e.videoLabel) vbox.appendChild(el("a", "ev-vlabel", tr(e.videoLabel))).setAttribute("href", YT_WATCH(e.video));
        const lab = $(".ev-vlabel", vbox); if (lab) { lab.target = "_blank"; lab.rel = "noopener"; }
        body.appendChild(vbox);
      }
      eg.appendChild(card);
    });
  }
  function renderRassegna() {
    const pl = $("#press-list"); if (!pl || typeof RASSEGNA === "undefined") return;
    clear(pl);
    RASSEGNA.forEach(r => {
      const li = el("li", "press-item");
      li.innerHTML =
        `<a href="${r.url}" target="_blank" rel="noopener">
           <span class="press-date">${tr(r.data)}</span>
           <span class="press-main"><span class="press-outlet">${tr(r.testata)}</span><span class="press-title">${tr(r.titolo)}</span></span>
           <span class="press-open">${t("rassegna.open")}</span>
         </a>`;
      pl.appendChild(li);
    });
  }
  function renderNews() {
    const ng = $("#news-grid"); if (!ng || typeof NEWS === "undefined") return;
    clear(ng);
    NEWS.forEach(n => {
      const tag = el(n.url ? "a" : "article", "newscard reveal");
      if (n.url) { tag.href = n.url; tag.target = "_blank"; tag.rel = "noopener"; }
      tag.innerHTML =
        `<div class="news-top"><span class="news-tag">${tr(n.tag)}</span><span class="news-date">${tr(n.data)}</span></div>
         <h3>${tr(n.titolo)}</h3><p>${tr(n.testo)}</p>${n.url ? `<span class="news-link">${t("news.read")}</span>` : ""}`;
      ng.appendChild(tag);
    });
  }
  function renderShop() {
    const sm = $("#shop-mock"); if (!sm) return;
    clear(sm);
    const prods = [["👕", "prod.tshirt"], ["☕", "prod.mug"], ["🧲", "prod.magnet"], ["🧢", "prod.cap"]];
    prods.forEach(([ico, key]) => {
      const d = el("div", "prod soon");
      d.innerHTML = `<div class="prod-img">${ico}</div><span class="prod-name">${t(key)}</span><span class="prod-soon">${t("shop.soon")}</span>`;
      sm.appendChild(d);
    });
  }
  function renderEvidenza() {
    const eg = $("#evidenza-grid"); if (!eg || typeof EVIDENZA === "undefined") return;
    clear(eg);
    EVIDENZA.forEach(e => {
      const a = el("a", "evidenza-card reveal");
      a.href = e.url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = `<span class="evid-outlet">${tr(e.testata)}</span><h3>${tr(e.titolo)}</h3><p>${tr(e.estratto)}</p><span class="evid-open">${t("rassegna.open")}</span>`;
      eg.appendChild(a);
    });
  }

  function renderAll() {
    renderVideos(); renderSpeciali(); renderGallery(); renderTimeline();
    renderFrasi(); renderChicche(); renderEventi(); renderNews();
    renderEvidenza(); renderRassegna(); renderShop();
    observeReveals();
  }

  /* ---------- LIGHTBOX ---------- */
  let lb;
  function openLightbox(src, cap) {
    if (!lb) {
      lb = el("div", "lightbox", `<button class="lb-close" aria-label="X">✕</button><img alt="" /><div class="lb-cap"></div>`);
      lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-close")) lb.classList.remove("open"); });
      document.body.appendChild(lb);
      document.addEventListener("keydown", e => { if (e.key === "Escape" && lb) lb.classList.remove("open"); });
    }
    $("img", lb).src = src; $(".lb-cap", lb).textContent = cap; lb.classList.add("open");
  }

  /* ---------- REVEAL + COUNTERS ---------- */
  function animateCount(node) {
    const target = +node.dataset.count, suf = node.dataset.suffix || "";
    const dur = 1500, start = performance.now();
    const fmt = n => target >= 10000 ? Math.floor(n).toLocaleString(LANG === "it" ? "it-IT" : LANG) : Math.floor(n);
    (function step(now) { const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3); node.textContent = fmt(target * e) + suf; if (p < 1) requestAnimationFrame(step); })(start);
  }
  let io;
  function observeReveals() {
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in", "reveal-in");
        if (en.target.classList.contains("stat")) { const num = $(".stat-num", en.target); if (num && !num.dataset.done) { num.dataset.done = "1"; animateCount(num); } }
        io.unobserve(en.target);
      });
    }, { threshold: 0.14 });
    $$(".reveal:not(.in), .tl-item:not(.in), .vcard:not(.in), .chicca:not(.in), .newscard:not(.in), .scard:not(.in), .stat:not(.in), .gal-item:not(.in), .gruppo-head:not(.in)").forEach(n => io.observe(n));
  }

  /* =========================================================
     INIT
     ========================================================= */
  const yEl = $("#year"); if (yEl) yEl.textContent = new Date().getFullYear();

  // mobile menu
  const menuBtn = $("#menu-toggle"), navLinks = $("#nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => { navLinks.classList.toggle("open"); menuBtn.classList.toggle("open"); });
    $$("#nav-links a").forEach(a => a.addEventListener("click", () => { navLinks.classList.remove("open"); menuBtn.classList.remove("open"); }));
  }
  // scroll progress + to top
  const prog = $("#scroll-progress"), toTop = $("#to-top");
  window.addEventListener("scroll", () => { const h = document.documentElement; if (prog) prog.style.width = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100 + "%"; }, { passive: true });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // language switch
  $$("#lang-switch button").forEach(b => b.addEventListener("click", () => {
    LANG = b.dataset.lang; localStorage.setItem("mm-lang", LANG);
    applyStatic(); renderAll();
  }));

  // first paint
  applyStatic();
  renderAll();
  showBanner();

  // trailer (consent-gated)
  const trailerBtn = $("#trailer-btn"), trailerBox = $("#film-trailer");
  if (trailerBtn && trailerBox && typeof TRAILER_ID !== "undefined") {
    trailerBtn.addEventListener("click", () => {
      const show = () => {
        trailerBox.hidden = false;
        trailerBox.innerHTML =
          `<iframe src="https://www.youtube-nocookie.com/embed/${TRAILER_ID}?autoplay=1&rel=0" title="Semplice Cliente — Trailer ufficiale" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        trailerBtn.style.display = "none";
      };
      if (hasYTConsent()) show();
      else {
        trailerBox.hidden = false;
        trailerBox.innerHTML =
          `<div class="trailer-consent"><p>${t("consent.needed")}</p>
            <button class="btn btn-primary btn-sm tc-accept">${t("consent.btn")}</button>
            <a href="${YT_WATCH(TRAILER_ID)}" target="_blank" rel="noopener" class="cv-yt">${t("consent.yt")}</a></div>`;
        $(".tc-accept", trailerBox).addEventListener("click", () => { setConsent("all"); show(); });
      }
    });
  }

  // hero speech + parallax
  const speech = $("#speech");
  if (speech && typeof FRASI !== "undefined") {
    let i = 0;
    setInterval(() => { i = (i + 1) % FRASI.length; speech.style.opacity = "0"; setTimeout(() => { speech.textContent = "«" + FRASI[i].t + "»"; speech.style.opacity = "1"; }, 260); }, 3200);
  }
  const stage = $("#portrait-stage");
  if (stage && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", (e) => { const x = (e.clientX / innerWidth - 0.5), y = (e.clientY / innerHeight - 0.5); stage.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`; }, { passive: true });
  }

  // nav active state
  const navA = $$("#nav-links a");
  const secs = navA.map(a => $(a.getAttribute("href"))).filter(Boolean);
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) navA.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach(s => navIO.observe(s));
})();
