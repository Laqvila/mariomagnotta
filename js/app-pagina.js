/* =========================================================
   Pagina dell'app ufficiale (/app/): lingua, menu, barra di
   avanzamento e comparsa dei blocchi.
   Le scritte comuni (menu, piè di pagina, «In arrivo su») stanno
   in js/data.js, quelle di questa pagina in APP_I18N qui sotto.
   La lingua scelta è la stessa della home (mm-lang).
   ========================================================= */
(function () {
  "use strict";
  if (location.protocol === "http:" && /\.(com|it)$/.test(location.hostname)) {
    location.replace("https://" + location.host + location.pathname + location.search + location.hash);
    return;
  }
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const APP_I18N = {
    "ap.metaTitle": { it:"App ufficiale Magnotta · Frasi, chat, scherzi e giochi | mariomagnotta.com", en:"Official Magnotta app · Quotes, chat, prank calls and games | mariomagnotta.com", es:"App oficial de Magnotta · Frases, chat, bromas y juegos | mariomagnotta.com" },
    "ap.crumbHome": { it:"Home", en:"Home", es:"Inicio" },
    "ap.crumbApp":  { it:"L'app", en:"The app", es:"La app" },
    "ap.kicker":    { it:"★ L'unica app ufficiale ★", en:"★ The one and only official app ★", es:"★ La única app oficial ★" },
    "ap.lead":      { it:"L'app ufficiale di Mario Magnotta, approvata dalla figlia Romina. Dentro ci sono le 323 frasi originali, la chat che ti risponde con la sua voce, gli scherzi completi, quattro giochi e il negozio ufficiale.",
                      en:"The official Mario Magnotta app, endorsed by his daughter Romina. Inside you'll find the 323 original quotes, a chat that answers in his own voice, the full prank calls, four games and the official shop.",
                      es:"La app oficial de Mario Magnotta, aprobada por su hija Romina. Dentro están las 323 frases originales, el chat que te responde con su voz, las bromas completas, cuatro juegos y la tienda oficial." },
    "ap.chip1":     { it:"✓ Gratis e senza pubblicità", en:"✓ Free and ad-free", es:"✓ Gratis y sin publicidad" },
    "ap.chip2":     { it:"📱 iPhone e Android", en:"📱 iPhone and Android", es:"📱 iPhone y Android" },
    "ap.chip3":     { it:"🔞 Per maggiorenni", en:"🔞 Adults only", es:"🔞 Para mayores de edad" },
    "ap.chip4":     { it:"🗣️ In italiano", en:"🗣️ In Italian", es:"🗣️ En italiano" },
    "ap.note":      { it:"Sta per arrivare su App Store e Google Play. Appena è pubblicata, qui trovi i link per scaricarla.",
                      en:"It's on its way to the App Store and Google Play. As soon as it's out, the download links will appear here.",
                      es:"Está a punto de llegar a App Store y Google Play. En cuanto se publique, aquí encontrarás los enlaces para descargarla." },
    "ap.f1":        { it:"📞 Squilla! È per te", en:"📞 Ring ring! It's for you", es:"📞 ¡Suena! Es para ti" },
    "ap.f2":        { it:"323 frasi originali", en:"323 original quotes", es:"323 frases originales" },
    "ap.f3":        { it:"✓ Approvata da Romina Magnotta", en:"✓ Endorsed by Romina Magnotta", es:"✓ Aprobada por Romina Magnotta" },

    "ap.feat.eyebrow": { it:"★ Cosa trovi nell'app ★", en:"★ What's inside ★", es:"★ Qué hay en la app ★" },
    "ap.feat.intro":   { it:"Le registrazioni del 1986-87 messe in ordine e pronte da ascoltare, insieme a tutto quello che è nato dopo.",
                         en:"The 1986-87 recordings, sorted and ready to play, together with everything that came after.",
                         es:"Las grabaciones de 1986-87, ordenadas y listas para escuchar, junto con todo lo que vino después." },
    "ap.k1t": { it:"La telefonata di oggi", en:"Today's call", es:"La llamada de hoy" },
    "ap.k1d": { it:"Ogni giorno Mario ti chiama con una frase scelta per te. Tocca Rispondi e ascolta.",
                en:"Every day Mario calls you with a quote picked just for you. Tap Answer and listen.",
                es:"Cada día Mario te llama con una frase elegida para ti. Toca Responder y escucha." },
    "ap.k2t": { it:"323 frasi originali", en:"323 original quotes", es:"323 frases originales" },
    "ap.k2d": { it:"Tre volumi (Lavatrice, Moglie e Telefono Azzurro) con la ricerca, le preferite e la condivisione come file audio.",
                en:"Three volumes (Washing Machine, Wife and Telefono Azzurro) with search, favourites and sharing as audio files.",
                es:"Tres volúmenes (Lavadora, Esposa y Telefono Azzurro) con búsqueda, favoritas y para compartir como archivo de audio." },
    "ap.k3t": { it:"Chatta con Mario", en:"Chat with Mario", es:"Chatea con Mario" },
    "ap.k3d": { it:"Gli scrivi quello che vuoi e lui ti risponde con una delle sue frasi, con la sua voce vera.",
                en:"Write him whatever you like and he answers with one of his quotes, in his real voice.",
                es:"Escríbele lo que quieras y te responde con una de sus frases, con su voz de verdad." },
    "ap.k4t": { it:"Gli scherzi completi", en:"The full prank calls", es:"Las bromas completas" },
    "ap.k4d": { it:"Le telefonate intere e rimasterizzate dal canale YouTube ufficiale, dalla Lavatrice al Telefono Azzurro.",
                en:"The complete, remastered calls from the official YouTube channel, from the Washing Machine saga to Telefono Azzurro.",
                es:"Las llamadas enteras y remasterizadas del canal oficial de YouTube, de la Lavadora al Telefono Azzurro." },
    "ap.k5t": { it:"Quattro giochi", en:"Four games", es:"Cuatro juegos" },
    "ap.k5d": { it:"Indovina la telefonata, completa la frase, vero o falso e il quiz. Dieci domande a partita e le medaglie da collezionare.",
                en:"Guess the call, finish the quote, true or false and the quiz. Ten questions per round and medals to collect.",
                es:"Adivina la llamada, completa la frase, verdadero o falso y el quiz. Diez preguntas por partida y medallas para coleccionar." },
    "ap.k6t": { it:"Curiosità e figurine", en:"Trivia and stickers", es:"Curiosidades y cromos" },
    "ap.k6d": { it:"La banconota da 480.000 lire, l'album delle figurine, la cronologia, il glossario aquilano e i luoghi di Mario.",
                en:"The 480,000-lire banknote, the sticker album, the timeline, the L'Aquila dialect glossary and Mario's places.",
                es:"El billete de 480.000 liras, el álbum de cromos, la cronología, el glosario aquilano y los lugares de Mario." },
    "ap.k7t": { it:"News ogni giorno", en:"Daily news", es:"Noticias cada día" },
    "ap.k7d": { it:"Le novità del sito ufficiale, dagli eventi al docufilm «Semplice Cliente».",
                en:"The latest from the official website, from events to the documentary «Semplice Cliente».",
                es:"Las novedades del sitio oficial, de los eventos al documental «Semplice Cliente»." },
    "ap.k8t": { it:"Negozio ufficiale", en:"Official shop", es:"Tienda oficial" },
    "ap.k8d": { it:"Il catalogo di magnottaofficial.com. Si compra sul sito, che si apre nel browser.",
                en:"The magnottaofficial.com catalogue. You buy on the website, which opens in your browser.",
                es:"El catálogo de magnottaofficial.com. Se compra en la web, que se abre en el navegador." },

    "ap.shots.eyebrow": { it:"★ Uno sguardo all'app ★", en:"★ A look inside ★", es:"★ Un vistazo a la app ★" },
    "ap.s1": { it:"Le frasi", en:"Quotes", es:"Frases" },
    "ap.s2": { it:"La chat", en:"Chat", es:"Chat" },
    "ap.s3": { it:"Gli scherzi", en:"Prank calls", es:"Bromas" },
    "ap.s4": { it:"Le curiosità", en:"Trivia", es:"Curiosidades" },

    "ap.steps.eyebrow": { it:"★ Appena la apri ★", en:"★ As soon as you open it ★", es:"★ Nada más abrirla ★" },
    "ap.steps.title":   { it:"Tre cose da <span class='hl'>fare subito</span>", en:"Three things <span class='hl'>to do first</span>", es:"Tres cosas para <span class='hl'>hacer enseguida</span>" },
    "ap.st1t": { it:"Rispondi a Mario", en:"Answer Mario", es:"Responde a Mario" },
    "ap.st1d": { it:"In Home c'è la telefonata del giorno. Tocca Rispondi e senti cosa ha da dirti.",
                 en:"The call of the day is waiting on the Home screen. Tap Answer and hear what he has to say.",
                 es:"En la pantalla de inicio está la llamada del día. Toca Responder y escucha lo que tiene que decirte." },
    "ap.st2t": { it:"Passala agli amici", en:"Pass it on", es:"Pásasela a tus amigos" },
    "ap.st2d": { it:"Cerca la frase giusta e mandala come audio su WhatsApp, pronta per ogni discussione di gruppo.",
                 en:"Find the right quote and send it as audio on WhatsApp, ready for any group chat.",
                 es:"Busca la frase justa y mándala como audio por WhatsApp, lista para cualquier discusión de grupo." },
    "ap.st3t": { it:"Sfida chi ne sa di più", en:"Challenge the experts", es:"Reta a quien más sabe" },
    "ap.st3d": { it:"Quattro giochi che funzionano anche senza internet. Dieci domande, un minuto scarso, e le medaglie restano tue.",
                 en:"Four games that work even offline. Ten questions, barely a minute, and the medals are yours to keep.",
                 es:"Cuatro juegos que funcionan incluso sin internet. Diez preguntas, apenas un minuto, y las medallas son tuyas." },

    "ap.off.eyebrow": { it:"★ Ufficiale ★", en:"★ Official ★", es:"★ Oficial ★" },
    "ap.off.title":   { it:"Approvata dalla <span class='hl'>famiglia</span>", en:"Endorsed by <span class='hl'>the family</span>", es:"Aprobada por <span class='hl'>la familia</span>" },
    "ap.off.text":    { it:"È l'unica app ufficiale di Mario Magnotta, approvata dalla figlia Romina Magnotta. L'ha ideata e prodotta <a class='inline-link' href='https://mirkorocci.it' target='_blank' rel='noopener'>Mirko Rocci</a>, che con la famiglia cura anche questo sito e il canale YouTube ufficiale.",
                        en:"It is the only official Mario Magnotta app, endorsed by his daughter Romina Magnotta. It was created and produced by <a class='inline-link' href='https://mirkorocci.it' target='_blank' rel='noopener'>Mirko Rocci</a>, who also looks after this website and the official YouTube channel together with the family.",
                        es:"Es la única app oficial de Mario Magnotta, aprobada por su hija Romina Magnotta. La ideó y produjo <a class='inline-link' href='https://mirkorocci.it' target='_blank' rel='noopener'>Mirko Rocci</a>, que junto con la familia cuida también este sitio y el canal oficial de YouTube." },
    "ap.o1t": { it:"Per maggiorenni", en:"Adults only", es:"Para mayores de edad" },
    "ap.o1d": { it:"Le registrazioni originali sono piene di parolacce. Il filtro «Per famiglie» nasconde le frasi più colorite.",
                en:"The original recordings are full of swearing. The «Per famiglie» (family) filter hides the most colourful quotes.",
                es:"Las grabaciones originales están llenas de palabrotas. El filtro «Per famiglie» (para familias) oculta las frases más subidas de tono." },
    "ap.o2t": { it:"Anche senza rete", en:"Works offline", es:"También sin conexión" },
    "ap.o2d": { it:"Frasi, chat e giochi funzionano ovunque. Internet serve solo per news, video e negozio.",
                en:"Quotes, chat and games work anywhere. You only need internet for news, videos and the shop.",
                es:"Frases, chat y juegos funcionan en cualquier sitio. Internet solo hace falta para noticias, vídeos y la tienda." },
    "ap.o3t": { it:"Niente pubblicità", en:"No ads", es:"Sin publicidad" },
    "ap.o3d": { it:"Nessun acquisto nell'app. L'account è facoltativo e serve solo a ritrovare preferite e medaglie su un altro telefono.",
                en:"No in-app purchases. An account is optional and only keeps your favourites and medals across phones.",
                es:"Sin compras dentro de la app. La cuenta es opcional y solo sirve para recuperar favoritas y medallas en otro teléfono." },

    "ap.cta.title": { it:"Scarica <span class='hl'>Magnotta</span>", en:"Get <span class='hl'>Magnotta</span>", es:"Descarga <span class='hl'>Magnotta</span>" },
    "ap.cta.text":  { it:"Gratis e senza pubblicità, per iPhone e Android.", en:"Free and ad-free, for iPhone and Android.", es:"Gratis y sin publicidad, para iPhone y Android." },
    "ap.l1": { it:"Privacy dell'app", en:"App privacy", es:"Privacidad de la app" },
    "ap.l2": { it:"Termini d'uso", en:"Terms of use", es:"Términos de uso" },
    "ap.l3": { it:"Eliminare l'account", en:"Delete your account", es:"Eliminar la cuenta" }
  };
  const DICT = Object.assign({}, typeof I18N !== "undefined" ? I18N : {}, APP_I18N);

  /* ---------- lingua, come in main.js ---------- */
  const LANGS = ["it", "en", "es"];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.includes(q)) return q;
    const saved = store.get("mm-lang");
    return saved && LANGS.includes(saved) ? saved : "it";
  }
  let LANG = detectLang();
  // una scritta che manca resta quella italiana già nella pagina
  const t = (key) => { const e = DICT[key]; return e ? (e[LANG] || e.it) : null; };
  function syncLangUrl() {
    try {
      const q = new URLSearchParams(location.search);
      if (LANG === "it") q.delete("lang"); else q.set("lang", LANG);
      const qs = q.toString();
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    } catch (e) {}
  }
  function applyLang() {
    document.documentElement.lang = LANG;
    syncLangUrl();
    $$("[data-i18n]").forEach(n => { const v = t(n.dataset.i18n); if (v != null) n.textContent = v; });
    $$("[data-i18n-html]").forEach(n => { const v = t(n.dataset.i18nHtml); if (v != null) n.innerHTML = v; });
    $$("#lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === LANG));
    const title = t("ap.metaTitle"); if (title) document.title = title;
  }
  $$("#lang-switch button").forEach(b => b.addEventListener("click", () => {
    LANG = b.dataset.lang; store.set("mm-lang", LANG); applyLang();
  }));
  applyLang();

  /* ---------- menu sul telefono ---------- */
  const menuBtn = $("#menu-toggle"), navLinks = $("#nav-links"), backdrop = $("#nav-backdrop");
  function setMenu(open) {
    if (!navLinks) return;
    navLinks.classList.toggle("open", open);
    if (menuBtn) { menuBtn.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open ? "true" : "false"); }
    document.body.classList.toggle("menu-open", open);
  }
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
    $$("#nav-links a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    if (backdrop) backdrop.addEventListener("click", () => setMenu(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- anno, barra di avanzamento, torna su ---------- */
  const yEl = $("#year"); if (yEl) yEl.textContent = new Date().getFullYear();
  const prog = $("#scroll-progress");
  if (prog) {
    let raf = 0;
    window.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
        prog.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
      });
    }, { passive: true });
  }
  const toTop = $("#to-top");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- i blocchi compaiono mentre si scorre (solo con JavaScript e senza «riduci movimento») ---------- */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add("reveal-in");
        en.target.classList.remove("reveal-init");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    $$(".feat, .shot, .app-steps li, .app-facts li, .app-cta").forEach(n => {
      // quello che è già sullo schermo all'apertura non sparisce e ricompare
      if (n.getBoundingClientRect().top < innerHeight) return;
      n.classList.add("reveal-init");
      io.observe(n);
    });
  }
})();
