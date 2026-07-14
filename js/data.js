/* =========================================================
   MARIO MAGNOTTA — sito ufficiale v2 (mariomagnotta.com)
   Dati multilingua (IT / EN / ES). I video provengono dal
   canale YouTube ufficiale @MarioMagnotta-aq.
   ========================================================= */

const CHANNEL_URL = "https://www.youtube.com/@MarioMagnotta-aq";
const SHOP_URL = "https://semplicecliente.com";
const FILM_URL = "https://semplicecliente.com";
const MIRKO_URL = "https://mirkorocci.it";
const ASSOC_URL = "https://3e33.it";
const TRAILER_ID = "pN8wtj-oQdA";
const EVENTI_EMAIL = "magnotta@mirkorocci.com";

/* ---------- UI STRINGS (statici) ---------- */
const I18N = {
  "nav.storia":   { it:"La Storia", en:"The Story", es:"La Historia" },
  "nav.telefonate":{ it:"Telefonate", en:"Prank Calls", es:"Llamadas" },
  "nav.foto":     { it:"Foto", en:"Photos", es:"Fotos" },
  "nav.chicche":  { it:"Chicche", en:"Trivia", es:"Curiosidades" },
  "nav.eventi":   { it:"Eventi", en:"Events", es:"Eventos" },
  "nav.film":     { it:"Il Film", en:"The Film", es:"La Película" },
  "nav.news":     { it:"News", en:"News", es:"Noticias" },
  "nav.shop":     { it:"Shop", en:"Shop", es:"Tienda" },

  "official.bar": { it:"L'<strong>unico</strong> sito ufficiale di Mario Magnotta — approvato dalla figlia <strong>Romina Magnotta</strong>", en:"The <strong>one and only</strong> official website of Mario Magnotta — endorsed by his daughter <strong>Romina Magnotta</strong>", es:"El <strong>único</strong> sitio oficial de Mario Magnotta — aprobado por su hija <strong>Romina Magnotta</strong>" },
  "official.badge":{ it:"UFFICIALE", en:"OFFICIAL", es:"OFICIAL" },
  "official.endorse":{ it:"Approvato da Romina Magnotta", en:"Endorsed by Romina Magnotta", es:"Aprobado por Romina Magnotta" },
  "foot.official":{ it:"Questo è l'<strong>unico sito ufficiale</strong> di Mario Magnotta, realizzato con l'<strong>approvazione di Romina Magnotta</strong>, figlia di Mario e titolare dei diritti. Ogni altro sito non è autorizzato: diffida delle imitazioni.", en:"This is the <strong>only official website</strong> of Mario Magnotta, made with the <strong>approval of Romina Magnotta</strong>, Mario's daughter and rights holder. Any other site is unauthorised: beware of imitations.", es:"Este es el <strong>único sitio oficial</strong> de Mario Magnotta, realizado con la <strong>aprobación de Romina Magnotta</strong>, hija de Mario y titular de los derechos. Cualquier otro sitio no está autorizado: desconfía de las imitaciones." },

  "chat.title":   { it:"📞 Chatta con Mario", en:"📞 Chat with Mario", es:"📞 Chatea con Mario" },
  "chat.sub":     { it:"Frasi autentiche delle telefonate del 1987 · parodia · linguaggio d'epoca", en:"Authentic quotes from the 1987 calls · parody · period language", es:"Frases auténticas de las llamadas de 1987 · parodia · lenguaje de época" },
  "chat.placeholder":{ it:"Fai lo scherzo a Mario…", en:"Prank Mario…", es:"Gástale la broma a Mario…" },
  "chat.placeholder.dir":{ it:"Rispondi al Direttore…", en:"Reply to the Manager…", es:"Responde al Director…" },
  "chat.send":    { it:"Invia", en:"Send", es:"Enviar" },
  "chat.open":    { it:"Chatta con Mario", en:"Chat with Mario", es:"Chatea con Mario" },
  "chat.mode.mario":{ it:"📞 Chiama Mario", en:"📞 Call Mario", es:"📞 Llama a Mario" },
  "chat.mode.dir":{ it:"🎭 Sei tu Mario", en:"🎭 You're Mario", es:"🎭 Eres Mario" },

  "hero.kicker":  { it:"★ L'unico sito ufficiale · mariomagnotta.com ★", en:"★ The only official website · mariomagnotta.com ★", es:"★ El único sitio oficial · mariomagnotta.com ★" },
  "hero.sub":     {
    it:"Il bidello dell'Aquila che, senza volerlo, ha fatto ridere tutta Italia. Lo scherzo della lavatrice del 1987: <strong>il primo meme italiano della storia.</strong>",
    en:"The school janitor from L'Aquila who, without meaning to, made all of Italy laugh. The 1987 washing-machine prank: <strong>the first Italian meme in history.</strong>",
    es:"El conserje de L'Aquila que, sin quererlo, hizo reír a toda Italia. La broma de la lavadora de 1987: <strong>el primer meme italiano de la historia.</strong>" },
  "hero.cta.audio":{ it:"📞 Ascolta le telefonate", en:"📞 Listen to the prank calls", es:"📞 Escucha las llamadas" },
  "hero.cta.yt":  { it:"▶ Canale YouTube", en:"▶ YouTube channel", es:"▶ Canal de YouTube" },
  "hero.cta.shop":{ it:"🛒 Shop", en:"🛒 Shop", es:"🛒 Tienda" },
  "hero.scroll":  { it:"Scorri giù ⬇", en:"Scroll down ⬇", es:"Desplázate ⬇" },

  "stats.year":   { it:"l'anno dello scherzo", en:"the year of the prank", es:"el año de la broma" },
  "stats.lire":   { it:"«uno, nessuno, 480.000»", en:"\"one, none, 480,000\"", es:"«uno, ninguno, 480.000»" },
  "stats.meme":   { it:"meme italiano della storia", en:"Italian meme in history", es:"meme italiano de la historia" },
  "stats.aq":     { it:"aquilano, verace", en:"true son of L'Aquila", es:"de L'Aquila, auténtico" },

  "storia.eyebrow":{ it:"★ La Storia ★", en:"★ The Story ★", es:"★ La Historia ★" },
  "storia.title": { it:"Un uomo vero, un <span class='hl'>semplice cliente</span>", en:"A real man, a <span class='hl'>simple customer</span>", es:"Un hombre de verdad, un <span class='hl'>simple cliente</span>" },
  "storia.p1":    {
    it:"<strong>Mario Magnotta</strong> (1942–2009) era il bidello dell'Istituto Tecnico «Luigi Rendina» dell'Aquila. Un uomo gentile, generoso, dalla parlata schietta e inconfondibilmente abruzzese.",
    en:"<strong>Mario Magnotta</strong> (1942–2009) was the janitor of the «Luigi Rendina» technical institute in L'Aquila. A kind, generous man with a blunt, unmistakably Abruzzese way of speaking.",
    es:"<strong>Mario Magnotta</strong> (1942–2009) era el conserje del instituto técnico «Luigi Rendina» de L'Aquila. Un hombre amable, generoso, de hablar directo e inconfundiblemente abrucés." },
  "storia.p2":    {
    it:"Nel 1986 e 1987 due ex allievi della scuola, <strong>Antonello De Dominicis</strong> e <strong>Maurizio Videtta</strong>, lo chiamarono al telefono fingendosi dirigenti della ditta <strong>San Giorgio</strong>, coinvolgendolo in un contratto fantasma per una lavatrice mai ordinata.",
    en:"In 1986 and 1987 two former students, <strong>Antonello De Dominicis</strong> and <strong>Maurizio Videtta</strong>, phoned him pretending to be managers of the <strong>San Giorgio</strong> company, dragging him into a phantom contract for a washing machine he never ordered.",
    es:"En 1986 y 1987 dos exalumnos, <strong>Antonello De Dominicis</strong> y <strong>Maurizio Videtta</strong>, lo llamaron haciéndose pasar por directivos de la empresa <strong>San Giorgio</strong>, metiéndolo en un contrato fantasma por una lavadora que nunca pidió." },
  "storia.p3":    {
    it:"Le telefonate, registrate su musicassetta, si diffusero in tutta Italia <em>decenni prima di internet</em>: la prima vera \"influencer story\" italiana. Mario è diventato un mito pop, ancora oggi amatissimo.",
    en:"The calls, recorded on cassette tapes, spread across Italy <em>decades before the internet</em>: the first true Italian \"influencer story\". Mario became a pop legend, still beloved today.",
    es:"Las llamadas, grabadas en casete, se difundieron por toda Italia <em>décadas antes de internet</em>: la primera verdadera \"influencer story\" italiana. Mario se convirtió en un mito pop, todavía hoy muy querido." },
  "storia.facts": { it:"Vedi la cronologia ⬇", en:"See the timeline ⬇", es:"Ver la cronología ⬇" },
  "facts.nome":   { it:"Nome", en:"Name", es:"Nombre" },
  "facts.nato":   { it:"Nato", en:"Born", es:"Nacido" },
  "facts.natoV":  { it:"14 ottobre 1942, Pieve di Teco (IM)", en:"14 October 1942, Pieve di Teco (Italy)", es:"14 de octubre de 1942, Pieve di Teco (Italia)" },
  "facts.citta":  { it:"Città", en:"City", es:"Ciudad" },
  "facts.mestiere":{ it:"Mestiere", en:"Job", es:"Oficio" },
  "facts.mestiereV":{ it:"Bidello — ITC «L. Rendina»", en:"Janitor — «L. Rendina» institute", es:"Conserje — instituto «L. Rendina»" },
  "facts.famoso": { it:"Famoso per", en:"Famous for", es:"Famoso por" },
  "facts.famosoV":{ it:"Lo scherzo della lavatrice (1987)", en:"The washing-machine prank (1987)", es:"La broma de la lavadora (1987)" },
  "facts.eredita":{ it:"Eredità", en:"Legacy", es:"Legado" },
  "facts.eereditaV":{ it:"Il primo meme italiano", en:"The first Italian meme", es:"El primer meme italiano" },
  "timeline.title":{ it:"🧺 Lo scherzo della lavatrice, passo per passo", en:"🧺 The washing-machine prank, step by step", es:"🧺 La broma de la lavadora, paso a paso" },

  "tel.eyebrow":  { it:"★ Dal canale YouTube ufficiale · audio rimasterizzato ★", en:"★ From the official YouTube channel · remastered audio ★", es:"★ Del canal oficial de YouTube · audio remasterizado ★" },
  "tel.title":    { it:"Le <span class='hl-y'>Telefonate</span>", en:"The <span class='hl-y'>Prank Calls</span>", es:"Las <span class='hl-y'>Llamadas</span>" },
  "tel.intro":    {
    it:"Tutti i video provengono dalla pagina YouTube ufficiale. Sotto ogni video trovi anche il <strong>lettore audio</strong> dell'incisione rimasterizzata.",
    en:"All videos come from the official YouTube page. Under each video you'll also find the <strong>audio player</strong> of the remastered recording.",
    es:"Todos los vídeos provienen de la página oficial de YouTube. Bajo cada vídeo encontrarás también el <strong>reproductor de audio</strong> de la grabación remasterizada." },
  "tel.allyt":    { it:"▶ Tutti i video sul canale YouTube", en:"▶ All videos on the YouTube channel", es:"▶ Todos los vídeos en el canal de YouTube" },
  "tel.speciali": { it:"⭐ Interviste & speciali", en:"⭐ Interviews & specials", es:"⭐ Entrevistas y especiales" },
  "audio.label":  { it:"🎧 Audio rimasterizzato", en:"🎧 Remastered audio", es:"🎧 Audio remasterizado" },

  "gal.eyebrow":  { it:"★ Foto reali ★", en:"★ Real photos ★", es:"★ Fotos reales ★" },
  "gal.title":    { it:"La <span class='hl'>galleria</span> di Mario", en:"Mario's <span class='hl'>gallery</span>", es:"La <span class='hl'>galería</span> de Mario" },
  "gal.credit":   { it:"Foto: Wikimedia Commons (CC). Mario Magnotta — diritti dell'avente diritto.", en:"Photos: Wikimedia Commons (CC). Mario Magnotta — rights of the rights holder.", es:"Fotos: Wikimedia Commons (CC). Mario Magnotta — derechos del titular." },

  "frasi.eyebrow":{ it:"★ Il Magnotta-pensiero ★", en:"★ The Magnotta wisdom ★", es:"★ El pensamiento Magnotta ★" },
  "frasi.title":  { it:"Frasi che hanno fatto <span class='hl'>la storia</span>", en:"Quotes that made <span class='hl'>history</span>", es:"Frases que hicieron <span class='hl'>historia</span>" },
  "frasi.note":   { it:"Citazioni autentiche dalle telefonate, in dialetto aquilano. Niente censure: è il bello di Mario.", en:"Authentic quotes from the calls, in L'Aquila dialect. No censorship: that's the beauty of Mario.", es:"Citas auténticas de las llamadas, en dialecto de L'Aquila. Sin censura: esa es la gracia de Mario." },

  "chicche.eyebrow":{ it:"★ Lo sapevi che… ★", en:"★ Did you know… ★", es:"★ ¿Sabías que…? ★" },
  "chicche.title":{ it:"Chicche & <span class='hl'>curiosità</span>", en:"Trivia & <span class='hl'>curiosities</span>", es:"Curiosidades & <span class='hl'>anécdotas</span>" },

  "eventi.eyebrow":{ it:"★ Eventi ★", en:"★ Events ★", es:"★ Eventos ★" },
  "eventi.title": { it:"Magnotta <span class='hl'>dal vivo</span>", en:"Magnotta <span class='hl'>live</span>", es:"Magnotta <span class='hl'>en vivo</span>" },

  "film.eyebrow": { it:"★ Al cinema ★", en:"★ In cinemas ★", es:"★ En cines ★" },
  "film.p1":      {
    it:"Il docufilm diretto da <strong>Alessio De Leonardis</strong> e prodotto da <strong>Duende Film</strong> porta sul grande schermo la storia più umana e fragile dietro il mito. 59 minuti tra materiali d'archivio, registrazioni originali e le testimonianze dei protagonisti.",
    en:"The documentary directed by <strong>Alessio De Leonardis</strong> and produced by <strong>Duende Film</strong> brings to the big screen the most human and fragile story behind the legend. 59 minutes of archival material, original recordings and testimonies from the protagonists.",
    es:"El docufilm dirigido por <strong>Alessio De Leonardis</strong> y producido por <strong>Duende Film</strong> lleva a la gran pantalla la historia más humana y frágil tras el mito. 59 minutos de material de archivo, grabaciones originales y testimonios de los protagonistas." },
  "film.p2":      {
    it:"Per la prima volta parla anche <strong>Romina</strong>, la figlia di Mario, che rompe il silenzio dopo anni: il racconto inedito di cosa significhi crescere all'ombra di una leggenda.",
    en:"For the first time <strong>Romina</strong>, Mario's daughter, also speaks, breaking her silence after years: the untold story of growing up in the shadow of a legend.",
    es:"Por primera vez habla también <strong>Romina</strong>, la hija de Mario, que rompe el silencio tras años: el relato inédito de lo que significa crecer a la sombra de una leyenda." },
  "film.f1":      { it:"🎬 Regia: Alessio De Leonardis", en:"🎬 Director: Alessio De Leonardis", es:"🎬 Dirección: Alessio De Leonardis" },
  "film.f2":      { it:"🏛️ Produzione: Duende Film", en:"🏛️ Production: Duende Film", es:"🏛️ Producción: Duende Film" },
  "film.f3":      { it:"⏱️ Durata: 59 minuti", en:"⏱️ Runtime: 59 minutes", es:"⏱️ Duración: 59 minutos" },
  "film.f4":      { it:"🎟️ Nelle sale dal novembre 2025", en:"🎟️ In cinemas from November 2025", es:"🎟️ En cines desde noviembre de 2025" },
  "film.cta":     { it:"🎬 Scopri di più su semplicecliente.com", en:"🎬 Find out more at semplicecliente.com", es:"🎬 Descubre más en semplicecliente.com" },
  "film.posterCta":{ it:"🎬 semplicecliente.com", en:"🎬 semplicecliente.com", es:"🎬 semplicecliente.com" },

  "news.eyebrow": { it:"★ News ★", en:"★ News ★", es:"★ Noticias ★" },
  "news.title":   { it:"Ultime <span class='hl'>dal mondo Magnotta</span>", en:"Latest <span class='hl'>from the Magnotta world</span>", es:"Lo último <span class='hl'>del mundo Magnotta</span>" },
  "news.read":    { it:"Leggi la notizia →", en:"Read the article →", es:"Leer la noticia →" },

  "nav.rassegna": { it:"Rassegna stampa", en:"Press", es:"Prensa" },
  "rassegna.eyebrow":{ it:"★ Rassegna stampa ★", en:"★ Press review ★", es:"★ Reseña de prensa ★" },
  "rassegna.title":{ it:"Hanno parlato di <span class='hl'>Magnotta</span>", en:"They wrote about <span class='hl'>Magnotta</span>", es:"Han hablado de <span class='hl'>Magnotta</span>" },
  "rassegna.intro":{ it:"Tutti gli articoli su Mario, il murale, l'evento e il docufilm «Semplice Cliente» — dal più recente al più datato.", en:"Every article about Mario, the mural, the event and the documentary «Semplice Cliente» — newest to oldest.", es:"Todos los artículos sobre Mario, el mural, el evento y el docufilm «Semplice Cliente» — del más reciente al más antiguo." },
  "rassegna.open": { it:"Apri ↗", en:"Open ↗", es:"Abrir ↗" },
  "rassegna.evidenza":{ it:"In evidenza", en:"Featured", es:"Destacados" },

  "nav.murale":   { it:"Murale", en:"Mural", es:"Mural" },
  "murale.eyebrow":{ it:"★ Street art ★", en:"★ Street art ★", es:"★ Street art ★" },
  "murale.title": { it:"Il <span class='hl'>murale</span> all'Aquila", en:"The <span class='hl'>mural</span> in L'Aquila", es:"El <span class='hl'>mural</span> en L'Aquila" },
  "murale.p1":    { it:"Un'opera di <strong>4,3×8 metri</strong> firmata dall'artista aquilano <strong>Daniele Gottastia</strong> celebra Mario nella sua città. Raffigura una gigantesca banconota da <strong>480.000 lire</strong> con il suo volto e la scritta «<em>Dedicato a tutti i semplici cittadini</em>».", en:"A <strong>4.3×8 metre</strong> work by L'Aquila artist <strong>Daniele Gottastia</strong> celebrates Mario in his city. It depicts a giant <strong>480,000-lire</strong> banknote with his face and the words «<em>Dedicated to all simple citizens</em>».", es:"Una obra de <strong>4,3×8 metros</strong> del artista aquilano <strong>Daniele Gottastia</strong> celebra a Mario en su ciudad. Representa un billete gigante de <strong>480.000 liras</strong> con su rostro y la frase «<em>Dedicado a todos los simples ciudadanos</em>»." },
  "murale.p2":    { it:"Si trova sul muro dell'ex Istituto «Luigi Rendina» a Colle Sapone, dove Mario ha lavorato per anni come bidello. È stato inaugurato il <strong>16 settembre</strong>, il «Magnotta Day».", en:"It is on the wall of the former «Luigi Rendina» institute in Colle Sapone, where Mario worked for years as a janitor. It was unveiled on <strong>16 September</strong>, the «Magnotta Day».", es:"Está en el muro del antiguo instituto «Luigi Rendina» en Colle Sapone, donde Mario trabajó años como conserje. Se inauguró el <strong>16 de septiembre</strong>, el «Magnotta Day»." },
  "murale.credit":{ it:"Foto del murale: Abruzzo Speciale · opera di Daniele Gottastia", en:"Mural photo: Abruzzo Speciale · artwork by Daniele Gottastia", es:"Foto del mural: Abruzzo Speciale · obra de Daniele Gottastia" },
  "murale.read":  { it:"Leggi su Abruzzo Speciale →", en:"Read on Abruzzo Speciale →", es:"Leer en Abruzzo Speciale →" },

  "film.trailer": { it:"▶ Guarda il trailer ufficiale", en:"▶ Watch the official trailer", es:"▶ Ver el tráiler oficial" },

  "shop.soon":    { it:"Presto disponibile", en:"Coming soon", es:"Próximamente" },
  "shop.introSoon":{ it:"Lo shop ufficiale con magliette, tazze e gadget da collezione dedicati a Mario è <strong>in arrivo</strong>. Torna presto!", en:"The official shop with t-shirts, mugs and collector's gadgets dedicated to Mario is <strong>coming soon</strong>. Check back soon!", es:"La tienda oficial con camisetas, tazas y gadgets de colección dedicados a Mario está <strong>en camino</strong>. ¡Vuelve pronto!" },
  "shop.ctaSoon": { it:"🛒 Shop in arrivo — presto disponibile", en:"🛒 Shop coming soon", es:"🛒 Tienda próximamente" },

  "romina.eyebrow":{ it:"★ Eventi esclusivi ★", en:"★ Exclusive events ★", es:"★ Eventos exclusivos ★" },
  "romina.title": { it:"Vuoi organizzare un evento con <span class='hl'>Romina Magnotta</span>?", en:"Want to host an event with <span class='hl'>Romina Magnotta</span>?", es:"¿Quieres organizar un evento con <span class='hl'>Romina Magnotta</span>?" },
  "romina.text":  { it:"Porta la presenza <strong>esclusiva di Romina Magnotta</strong>, la figlia di Mario, al tuo evento in <strong>centro Italia</strong>: presentazioni, serate-evento, proiezioni del docufilm e incontri col pubblico. Scrivici per disponibilità e dettagli.", en:"Bring the <strong>exclusive presence of Romina Magnotta</strong>, Mario's daughter, to your event in <strong>central Italy</strong>: presentations, special evenings, documentary screenings and meet-the-public events. Write to us for availability and details.", es:"Lleva la <strong>presencia exclusiva de Romina Magnotta</strong>, la hija de Mario, a tu evento en el <strong>centro de Italia</strong>: presentaciones, veladas-evento, proyecciones del docufilm y encuentros con el público. Escríbenos para disponibilidad y detalles." },
  "romina.cta":   { it:"✉️ Scrivi a magnotta@mirkorocci.com", en:"✉️ Write to magnotta@mirkorocci.com", es:"✉️ Escribe a magnotta@mirkorocci.com" },

  "shop.eyebrow": { it:"★ Shop ufficiale ★", en:"★ Official shop ★", es:"★ Tienda oficial ★" },
  "shop.title":   { it:"Il <span class='hl'>merchandising</span> ufficiale", en:"The official <span class='hl'>merchandise</span>", es:"El <span class='hl'>merchandising</span> oficial" },
  "shop.intro":   {
    it:"Magliette, tazze, gadget e chicche da collezione dedicate al mito di Mario. Lo store ufficiale è su <strong>semplicecliente.com</strong>.",
    en:"T-shirts, mugs, gadgets and collector's items dedicated to the Mario legend. The official store is at <strong>semplicecliente.com</strong>.",
    es:"Camisetas, tazas, gadgets y piezas de colección dedicadas al mito de Mario. La tienda oficial está en <strong>semplicecliente.com</strong>." },
  "shop.buy":     { it:"Acquista →", en:"Buy →", es:"Comprar →" },
  "shop.cta":     { it:"🛒 Entra nello shop · semplicecliente.com", en:"🛒 Enter the shop · semplicecliente.com", es:"🛒 Entra en la tienda · semplicecliente.com" },
  "prod.tshirt":  { it:"T-shirt «M'iscrivo ai terroristi»", en:"T-shirt «M'iscrivo ai terroristi»", es:"Camiseta «M'iscrivo ai terroristi»" },
  "prod.mug":     { it:"Tazza «No so Magnotta»", en:"Mug «No so Magnotta»", es:"Taza «No so Magnotta»" },
  "prod.magnet":  { it:"Calamita Lavatrice San Giorgio", en:"San Giorgio washing-machine magnet", es:"Imán lavadora San Giorgio" },
  "prod.cap":     { it:"Cappellino «Semplice Cliente»", en:"Cap «Semplice Cliente»", es:"Gorra «Semplice Cliente»" },

  "foot.tag":     { it:"Il sito ufficiale del primo meme italiano.<br>mariomagnotta.com", en:"The official website of the first Italian meme.<br>mariomagnotta.com", es:"El sitio oficial del primer meme italiano.<br>mariomagnotta.com" },
  "foot.naviga":  { it:"Naviga", en:"Browse", es:"Navega" },
  "foot.link":    { it:"Link ufficiali", en:"Official links", es:"Enlaces oficiales" },
  "foot.progetto":{ it:"Progetto", en:"Project", es:"Proyecto" },
  "foot.progettoT":{
    it:"Evento all'Emiciclo a cura dell'Associazione Culturale 3:33 e di <a href='"+MIRKO_URL+"' target='_blank' rel='noopener'>Mirko Rocci</a>. Docufilm «<a href='"+FILM_URL+"' target='_blank' rel='noopener'>Semplice Cliente</a>» di Alessio De Leonardis — Duende Film.",
    en:"Event at the Emiciclo curated by the 3:33 Cultural Association and <a href='"+MIRKO_URL+"' target='_blank' rel='noopener'>Mirko Rocci</a>. Documentary «<a href='"+FILM_URL+"' target='_blank' rel='noopener'>Semplice Cliente</a>» by Alessio De Leonardis — Duende Film.",
    es:"Evento en el Emiciclo a cargo de la Asociación Cultural 3:33 y de <a href='"+MIRKO_URL+"' target='_blank' rel='noopener'>Mirko Rocci</a>. Docufilm «<a href='"+FILM_URL+"' target='_blank' rel='noopener'>Semplice Cliente</a>» de Alessio De Leonardis — Duende Film." },
  "foot.rights":  { it:"Tutti i diritti riservati.", en:"All rights reserved.", es:"Todos los derechos reservados." },
  "foot.privacy": { it:"Privacy & Cookie", en:"Privacy & Cookies", es:"Privacidad & Cookies" },

  "cookie.text":  {
    it:"Usiamo solo cookie tecnici necessari. I contenuti di YouTube (video e audio) sono di terze parti e possono installare cookie: si caricano <strong>solo dopo il tuo consenso</strong>.",
    en:"We only use necessary technical cookies. YouTube content (videos and audio) is third-party and may set cookies: it loads <strong>only after your consent</strong>.",
    es:"Solo usamos cookies técnicas necesarias. El contenido de YouTube (vídeos y audio) es de terceros y puede instalar cookies: se carga <strong>solo tras tu consentimiento</strong>." },
  "cookie.accept":{ it:"Accetta tutto", en:"Accept all", es:"Aceptar todo" },
  "cookie.reject":{ it:"Solo necessari", en:"Necessary only", es:"Solo necesarios" },
  "cookie.title": { it:"🍪 Cookie", en:"🍪 Cookies", es:"🍪 Cookies" },
  "consent.needed":{ it:"Per guardare il video accetta i cookie di YouTube.", en:"To watch the video, accept YouTube cookies.", es:"Para ver el vídeo, acepta las cookies de YouTube." },
  "consent.btn":  { it:"Accetta e guarda", en:"Accept & watch", es:"Aceptar y ver" },
  "consent.yt":   { it:"oppure apri su YouTube ↗", en:"or open on YouTube ↗", es:"o abrir en YouTube ↗" },

  "privacy.title":{ it:"Privacy & Cookie Policy", en:"Privacy & Cookie Policy", es:"Política de Privacidad y Cookies" },
  "privacy.body": {
    it:"<p>Questo sito non raccoglie dati personali a fini di marketing e non usa cookie di profilazione. Vengono utilizzati esclusivamente <strong>cookie tecnici</strong> necessari al funzionamento e, se acconsenti, il <code>localStorage</code> per ricordare la lingua e la tua scelta sui cookie.</p><p>I <strong>video e gli audio</strong> sono incorporati da <strong>YouTube</strong> (Google Ireland Ltd.) in modalità privacy avanzata e vengono caricati <strong>solo dopo il tuo consenso esplicito</strong>. Quando li carichi, YouTube può installare propri cookie secondo la <a href='https://policies.google.com/privacy' target='_blank' rel='noopener'>privacy policy di Google</a>.</p><p>Puoi revocare il consenso in qualsiasi momento cancellando i dati del sito dal tuo browser. Titolare: mariomagnotta.com — contatto: info@mariomagnotta.com.</p>",
    en:"<p>This website does not collect personal data for marketing and uses no profiling cookies. Only <strong>technical cookies</strong> necessary for operation are used and, with your consent, <code>localStorage</code> to remember your language and cookie choice.</p><p><strong>Videos and audio</strong> are embedded from <strong>YouTube</strong> (Google Ireland Ltd.) in privacy-enhanced mode and load <strong>only after your explicit consent</strong>. Once loaded, YouTube may set its own cookies under <a href='https://policies.google.com/privacy' target='_blank' rel='noopener'>Google's privacy policy</a>.</p><p>You can withdraw consent at any time by clearing the site data from your browser. Controller: mariomagnotta.com — contact: info@mariomagnotta.com.</p>",
    es:"<p>Este sitio no recoge datos personales con fines de marketing y no usa cookies de perfilado. Solo se utilizan <strong>cookies técnicas</strong> necesarias para el funcionamiento y, con tu consentimiento, <code>localStorage</code> para recordar el idioma y tu elección sobre las cookies.</p><p>Los <strong>vídeos y audios</strong> están incrustados desde <strong>YouTube</strong> (Google Ireland Ltd.) en modo de privacidad mejorada y se cargan <strong>solo tras tu consentimiento explícito</strong>. Al cargarlos, YouTube puede instalar sus propias cookies según la <a href='https://policies.google.com/privacy' target='_blank' rel='noopener'>política de privacidad de Google</a>.</p><p>Puedes retirar el consentimiento en cualquier momento borrando los datos del sitio en tu navegador. Responsable: mariomagnotta.com — contacto: info@mariomagnotta.com.</p>" },
  "privacy.close":{ it:"Ho capito", en:"Got it", es:"Entendido" }
};

/* ---------- TELEFONATE (raggruppate) ---------- */
function L(it, en, es){ return { it, en, es }; }
const GRUPPI = [
  {
    nome: L("🧺 Saga della Lavatrice","🧺 The Washing-Machine Saga","🧺 La Saga de la Lavadora"),
    sotto: L("Lo scherzo che ha fatto la storia: il contratto fantasma della San Giorgio.","The prank that made history: the San Giorgio phantom contract.","La broma que hizo historia: el contrato fantasma de San Giorgio."),
    video: [
      { id:"sYP8UNLM4KM", titolo:"Lavatrice 1", badge:L("📞 L'inizio","📞 The start","📞 El inicio"), data:"1987 · HQ 2025", audio:"assets/audio/lavatrice-1.mp3",
        desc:L("La prima telefonata: comincia l'incubo del contratto mai firmato. Audio rimasterizzato, versione integrale.","The first call: the nightmare of the never-signed contract begins. Remastered audio, full version.","La primera llamada: empieza la pesadilla del contrato nunca firmado. Audio remasterizado, versión íntegra.") },
      { id:"5Psrny-010I", titolo:"Lavatrice 2", badge:L("📞 Sale la tensione","📞 Tension rises","📞 Sube la tensión"), data:"1987 · HQ 2025", audio:"assets/audio/lavatrice-2.mp3",
        desc:L("Barzetti e Marzandelli rincarano la dose. Mario inizia a spazientirsi sul serio.","Barzetti and Marzandelli pile it on. Mario starts to really lose his patience.","Barzetti y Marzandelli aprietan más. Mario empieza a perder la paciencia de verdad.") },
      { id:"pWy6QmBMrJk", titolo:"Lavatrice 3", badge:L("📞 Verso il culmine","📞 Toward the peak","📞 Hacia el clímax"), data:"1987 · HQ 2025", audio:"assets/audio/lavatrice-3.mp3",
        desc:L("L'assurdo tocca vette nuove. Una delle puntate più amate dell'intera saga.","Absurdity reaches new heights. One of the most loved episodes of the whole saga.","Lo absurdo alcanza nuevas cotas. Uno de los episodios más queridos de toda la saga.") },
      { id:"jcPB62tMOIU", titolo:"Lavatrice 4", badge:L("🏆 La leggenda","🏆 The legend","🏆 La leyenda"), data:"16 set 1987 · HQ 2025", audio:"assets/audio/lavatrice-4.mp3",
        desc:L("Il capolavoro. «Veramente io m'iscrivo ai terroristi!»: nasce il primo meme italiano della storia.","The masterpiece. \"I'm literally signing up with the terrorists!\": the first Italian meme in history is born.","La obra maestra. «¡De verdad me apunto a los terroristas!»: nace el primer meme italiano de la historia.") }
    ]
  },
  {
    nome: L("💍 Saga della Moglie","💍 The Wife Saga","💍 La Saga de la Esposa"),
    sotto: L("L'altra trilogia leggendaria, tutta tempi comici involontari.","The other legendary trilogy, all involuntary comic timing.","La otra trilogía legendaria, puro tempo cómico involuntario."),
    video: [
      { id:"8R8BG3F0Cj0", titolo:"Moglie 1", badge:L("📞 Prima telefonata","📞 First call","📞 Primera llamada"), data:"1986–87 · HQ 2025", audio:"assets/audio/moglie-1.mp3",
        desc:L("Parte la saga della moglie: malinteso su malinteso, in puro stile aquilano.","The wife saga begins: misunderstanding after misunderstanding, pure L'Aquila style.","Empieza la saga de la esposa: malentendido tras malentendido, puro estilo de L'Aquila.") },
      { id:"TeKj0NcL6pg", titolo:"Moglie 2", badge:L("📞 Si continua","📞 It continues","📞 Continúa"), data:"1986–87 · HQ 2025", audio:"assets/audio/moglie-2.mp3",
        desc:L("La seconda puntata alza ancora l'asticella della comicità spontanea.","The second episode raises the bar of spontaneous comedy even higher.","El segundo episodio sube aún más el listón de la comedia espontánea.") },
      { id:"ExshdLmDMAk", titolo:"Moglie 3", badge:L("📞 Epilogo","📞 Epilogue","📞 Epílogo"), data:"1986–87 · HQ 2025", audio:"assets/audio/moglie-3.mp3",
        desc:L("Il gran finale (terza telefonata, epilogo): un classico assoluto.","The grand finale (third call, epilogue): an absolute classic.","El gran final (tercera llamada, epílogo): un clásico absoluto.") }
    ]
  },
  {
    nome: L("☎️ Telefono Azzurro","☎️ Telefono Azzurro","☎️ Telefono Azzurro"),
    sotto: L("Altre perle dall'archivio storico delle telefonate.","More gems from the historic archive of the calls.","Más perlas del archivo histórico de las llamadas."),
    video: [
      { id:"leIC9q-nrBU", titolo:"Telefono Azzurro 1", badge:L("📞 Rarità","📞 Rarity","📞 Rareza"), data:L("Archivio","Archive","Archivo"), audio:"assets/audio/telefono-azzurro-1.mp3",
        desc:L("Un'altra gemma dall'archivio delle telefonate di Mario.","Another gem from the archive of Mario's calls.","Otra joya del archivo de las llamadas de Mario.") },
      { id:"QytQv58ht_A", titolo:"Telefono Azzurro 2", badge:L("📞 Rarità","📞 Rarity","📞 Rareza"), data:L("Archivio","Archive","Archivo"), audio:"assets/audio/telefono-azzurro-2.mp3",
        desc:L("Il seguito: ancora comicità involontaria d'autore.","The sequel: more involuntary comic genius.","La secuela: más comicidad involuntaria de autor.") }
    ]
  }
];

const SPECIALI = [
  { id:"a6QC_zW3GOU", titolo:L("Intervista a Radio Rock (1991)","Radio Rock interview (1991)","Entrevista en Radio Rock (1991)"), audio:"assets/audio/intervista-radiorock.mp3",
    desc:L("INEDITO · L'intervista storica di Giampiero Vigorito a Mario Magnotta su Radio Rock, 1991. Audio integrale in qualità digitale HD.","UNRELEASED · Giampiero Vigorito's historic interview with Mario Magnotta on Radio Rock, 1991. Full audio in HD digital quality.","INÉDITO · La entrevista histórica de Giampiero Vigorito a Mario Magnotta en Radio Rock, 1991. Audio íntegro en calidad digital HD.") },
  { id:"68eTG7Ke9us", titolo:L("Parla Romina, la figlia di Mario","Romina speaks, Mario's daughter","Habla Romina, la hija de Mario"), audio:"",
    desc:L("L'intervista esclusiva: «Ho smesso di soffrire grazie al film». La voce più autentica dietro il mito.","The exclusive interview: \"I stopped suffering thanks to the film\". The most authentic voice behind the legend.","La entrevista exclusiva: «Dejé de sufrir gracias a la película». La voz más auténtica tras el mito.") }
];

/* FRASI ora sono in js/contenuti.js (modificabili facilmente) */

/* ---------- CHICCHE ---------- */
const CHICCHE = [
  { icona:"📼", t:L("Virale prima di internet","Viral before the internet","Viral antes de internet"), d:L("Le telefonate si diffusero in tutta Italia copiate di musicassetta in musicassetta. La prima \"influencer story\" italiana.","The calls spread across Italy, copied from cassette to cassette. The first Italian \"influencer story\".","Las llamadas se difundieron por Italia copiadas de casete en casete. La primera \"influencer story\" italiana.") },
  { icona:"🎵", t:L("Citato a Sanremo","Quoted at Sanremo","Citado en Sanremo"), d:L("Simone Cristicchi, vincitore di Sanremo 2007, gli dedica un verso nella canzone «L'Italia di Piero».","Simone Cristicchi, winner of Sanremo 2007, dedicates a verse to him in the song «L'Italia di Piero».","Simone Cristicchi, ganador de Sanremo 2007, le dedica un verso en la canción «L'Italia di Piero».") },
  { icona:"📺", t:L("Ospite in TV","TV guest","Invitado en TV"), d:L("Mario fu ospite di trasmissioni cult come il Maurizio Costanzo Show e I Fatti Vostri.","Mario was a guest on cult shows like the Maurizio Costanzo Show and I Fatti Vostri.","Mario fue invitado en programas de culto como el Maurizio Costanzo Show e I Fatti Vostri.") },
  { icona:"🎨", t:L("Murale gigante all'Aquila","Giant mural in L'Aquila","Mural gigante en L'Aquila"), d:L("Un murale di 4,3×8 metri dell'artista Daniele Gottastia celebra il «bidello più famoso d'Italia», con una banconota da 480.000 lire.","A 4.3×8 m mural by artist Daniele Gottastia celebrates the «most famous janitor in Italy», featuring a 480,000-lire banknote.","Un mural de 4,3×8 m del artista Daniele Gottastia celebra al «conserje más famoso de Italia», con un billete de 480.000 liras.") },
  { icona:"📍", t:L("Luogo di culto su Maps","A cult spot on Maps","Lugar de culto en Maps"), d:L("La sua casa è segnalata online dai fan come vero e proprio luogo di culto pop.","His home is marked online by fans as a genuine pop pilgrimage site.","Su casa está señalada online por los fans como un verdadero lugar de culto pop.") },
  { icona:"📖", t:L("Anche a fumetti","Even a comic book","Hasta en cómic"), d:L("La sua epopea è diventata persino un fumetto, «Magnotta Wars».","His epic even became a comic book, «Magnotta Wars».","Su epopeya se convirtió incluso en un cómic, «Magnotta Wars».") },
  { icona:"💸", t:L("La banconota da 480.000 lire","The 480,000-lire banknote","El billete de 480.000 liras"), d:L("Il murale lo ritrae su una gigantesca banconota da «quattrocentoottantamila» lire: «pagabili a vista al portatore».","The mural depicts him on a giant «four-hundred-eighty-thousand» lire banknote: «payable on demand to the bearer».","El mural lo retrata en un billete gigante de «cuatrocientos ochenta mil» liras: «pagaderas a la vista al portador».") },
  { icona:"📅", t:L("Il «Magnotta Day»","The «Magnotta Day»","El «Magnotta Day»"), d:L("Per L'Aquila il 16 settembre è il «Magnotta Day», la data simbolica dello scherzo della lavatrice del 1987.","For L'Aquila, 16 September is «Magnotta Day», the symbolic date of the 1987 washing-machine prank.","Para L'Aquila, el 16 de septiembre es el «Magnotta Day», la fecha simbólica de la broma de la lavadora de 1987.") },
  { icona:"🧺", t:L("Tutto per una San Giorgio","All for a San Giorgio","Todo por una San Giorgio"), d:L("All'origine di tutto: una lavatrice San Giorgio comprata nel 1981 e portata via dalla moglie nella separazione.","At the root of it all: a San Giorgio washing machine bought in 1981 and taken away by his wife in their separation.","En el origen de todo: una lavadora San Giorgio comprada en 1981 y llevada por su esposa en la separación.") },
  { icona:"🌍", t:L("Milioni di visualizzazioni","Millions of views","Millones de visitas"), d:L("Dalle musicassette a YouTube: le telefonate hanno accumulato milioni di visualizzazioni online.","From cassette tapes to YouTube: the calls have racked up millions of views online.","De los casetes a YouTube: las llamadas han acumulado millones de visitas online.") },
  { icona:"🎬", t:L("Ora è un docufilm","Now it's a documentary","Ahora es un docufilm"), d:L("«Semplice Cliente» (2025) di Alessio De Leonardis, prodotto da Duende Film, porta la sua storia al cinema.","«Semplice Cliente» (2025) by Alessio De Leonardis, produced by Duende Film, brings his story to cinemas.","«Semplice Cliente» (2025) de Alessio De Leonardis, producido por Duende Film, lleva su historia al cine.") }
];

/* ---------- TIMELINE ---------- */
const TIMELINE = [
  { anno:"1942", t:L("Nasce Mario","Mario is born","Nace Mario"), d:L("Mario Magnotta nasce il 14 ottobre a Pieve di Teco (Imperia). Da bambino si trasferisce all'Aquila.","Mario Magnotta is born on 14 October in Pieve di Teco (Imperia). As a child he moves to L'Aquila.","Mario Magnotta nace el 14 de octubre en Pieve di Teco (Imperia). De niño se traslada a L'Aquila.") },
  { anno:"1960", t:L("Il bidello del Rendina","The Rendina janitor","El conserje del Rendina"), d:L("A 18 anni viene assunto come bidello all'Istituto Tecnico «Luigi Rendina». Un uomo comune, gentile e generoso.","At 18 he is hired as janitor at the «Luigi Rendina» technical institute. An ordinary, kind and generous man.","A los 18 años es contratado como conserje en el instituto técnico «Luigi Rendina». Un hombre común, amable y generoso.") },
  { anno:"1981", t:L("La lavatrice San Giorgio","The San Giorgio washing machine","La lavadora San Giorgio"), d:L("Mario acquista una lavatrice San Giorgio: l'elettrodomestico che, senza saperlo, lo renderà immortale.","Mario buys a San Giorgio washing machine: the appliance that, unknowingly, will make him immortal.","Mario compra una lavadora San Giorgio: el electrodoméstico que, sin saberlo, lo hará inmortal.") },
  { anno:"1986–87", t:L("Gli scherzi","The pranks","Las bromas"), d:L("De Dominicis e Videtta lo chiamano fingendosi dirigenti della San Giorgio, inventando un contratto mai firmato.","De Dominicis and Videtta call him pretending to be San Giorgio managers, inventing a contract he never signed.","De Dominicis y Videtta lo llaman fingiendo ser directivos de San Giorgio, inventando un contrato nunca firmado.") },
  { anno:"16/09/1987", t:L("«Lavatrice 4»","«Lavatrice 4»","«Lavatrice 4»"), d:L("La telefonata leggendaria. «M'iscrivo ai terroristi»: nasce il primo meme italiano.","The legendary call. \"I'm signing up with the terrorists\": the first Italian meme is born.","La llamada legendaria. «Me apunto a los terroristas»: nace el primer meme italiano.") },
  { anno:"2009", t:L("L'addio","Farewell","El adiós"), d:L("Mario ci lascia il 4 gennaio. La sua voce e la sua ironia non smettono mai di far ridere l'Italia.","Mario passes away on 4 January. His voice and his irony never stop making Italy laugh.","Mario fallece el 4 de enero. Su voz y su ironía nunca dejan de hacer reír a Italia.") }
];

/* ---------- EVENTI ---------- */
const EVENTI = [
  {
    badge: L("Evento celebrativo","Celebration event","Evento conmemorativo"),
    data: L("25 giugno 2025","25 June 2025","25 de junio de 2025"),
    titolo: L("Magnotta: viralità spontanea che anticipa l'era degli influencer","Magnotta: spontaneous virality that anticipated the influencer era","Magnotta: viralidad espontánea que anticipó la era de los influencers"),
    luogo: L("Sala Ipogea — Palazzo dell'Emiciclo, L'Aquila · ore 17:00 · ingresso libero","Sala Ipogea — Palazzo dell'Emiciclo, L'Aquila · 5:00 PM · free entry","Sala Ipogea — Palazzo dell'Emiciclo, L'Aquila · 17:00 · entrada libre"),
    org: L("<a href='"+ASSOC_URL+"' target='_blank' rel='noopener' class='inline-link'>Associazione Culturale 3:33</a> · a cura di <a href='"+MIRKO_URL+"' target='_blank' rel='noopener' class='inline-link'>Mirko Rocci</a>","<a href='"+ASSOC_URL+"' target='_blank' rel='noopener' class='inline-link'>3:33 Cultural Association</a> · curated by <a href='"+MIRKO_URL+"' target='_blank' rel='noopener' class='inline-link'>Mirko Rocci</a>","<a href='"+ASSOC_URL+"' target='_blank' rel='noopener' class='inline-link'>Asociación Cultural 3:33</a> · a cargo de <a href='"+MIRKO_URL+"' target='_blank' rel='noopener' class='inline-link'>Mirko Rocci</a>"),
    desc: L(
      "Un incontro che unisce rigore accademico, testimonianze dirette ed emozione popolare. Sul palco gli autori dello scherzo, la figlia Romina, esperti di psicologia e data science e l'influencer Zio Command. Modera Alberto Orsini, con la partecipazione del Sindaco dell'Aquila, dell'Assessore alla Cultura della Regione Abruzzo e del Direttore della Casa delle Tecnologie Emergenti.",
      "A meeting blending academic rigour, first-hand testimonies and popular emotion. On stage: the prank's authors, daughter Romina, psychology and data-science experts and influencer Zio Command. Hosted by Alberto Orsini, with the Mayor of L'Aquila, the Abruzzo Region's Culture Councillor and the Director of the House of Emerging Technologies.",
      "Un encuentro que une rigor académico, testimonios directos y emoción popular. En el escenario: los autores de la broma, la hija Romina, expertos en psicología y data science y el influencer Zio Command. Modera Alberto Orsini, con el Alcalde de L'Aquila, la Consejera de Cultura de la Región Abruzzo y el Director de la Casa de las Tecnologías Emergentes."),
    url: "https://www.ilcapoluogo.it/2025/06/25/mario-magnotta-superstar-laquila-celebra-il-bidello-che-ha-fatto-ridere-tutta-italia-senza-volerlo/",
    video: "hQIC4tNF3qo",
    videoStart: 7078,
    videoLabel: L("▶ Guarda il video integrale dell'evento","▶ Watch the full event video","▶ Mira el vídeo completo del evento")
  }
];

/* NEWS, GALLERIA e RASSEGNA STAMPA sono in js/contenuti.js (modificabili) */
