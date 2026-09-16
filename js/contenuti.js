/* ============================================================
   ███  CONTENUTI MODIFICABILI — MARIO MAGNOTTA  ███
   ============================================================
   QUESTO È L'UNICO FILE CHE DEVI TOCCARE per aggiornare il sito.
   Puoi modificare: FRASI · FOTO · NEWS · RASSEGNA STAMPA · ARTICOLI IN EVIDENZA.

   REGOLE SEMPLICI:
   • Ogni voce sta tra parentesi graffe { ... } e finisce con una virgola.
   • Scrivi il testo tra "virgolette doppie".
   • Se nel testo usi le virgolette, usa quelle «basse» oppure 'singole'.
   • Per aggiungere una voce: copia una riga esistente e incollala.
   • Per togliere una voce: cancella la sua riga (tutta, da { a },).
   • Salva il file e ricarica la pagina nel browser. Fatto!
   ============================================================ */


/* ============================================================
   1) FRASI CELEBRI DI MAGNOTTA
   Formato:  { t:"la frase", n:"piccola nota sotto" },
   ============================================================ */
const FRASI = [
  { t:"M'iscrivo ai terroristi!", n:"la frase-meme entrata nella storia" },
  { t:"Io vi metto una bomba se mi chiamate ancora!", n:"l'avvertimento prima della frase leggendaria" },
  { t:"No, so' Magnotta…", n:"l'understatement aquilano per eccellenza" },
  { t:"Mo m'hai rotto proprio i coglioni!", n:"quando l'esasperazione tocca il fondo" },
  { t:"I' steng'a fa' ju strunzu, sci!", n:"«sto facendo lo stronzo, sì»: capolavoro dialettale" },
  { t:"Ma chi te la paga, la lavatrice?!", n:"la difesa contro il contratto fantasma" },
  { t:"Perché sei un truffatore tu!", n:"la diagnosi, secca e definitiva" },
  { t:"Per voi Magnotta è morto!", n:"l'addio teatrale ai suoi persecutori" },
  { t:"O freghète! Quella lavatrice dell'81 io te la so' pagata!", n:"lo sdegno per un debito mai esistito" },
  { t:"La presi e te la pagai!", n:"la verità di Mario sulla San Giorgio" },
  { t:"Io non la voglio la lavatrice, va bene?!", n:"il rifiuto, ripetuto allo sfinimento" },
  { t:"E portamela… ma chi, e chi te la paga?", n:"la logica ferrea di Mario" },
  { t:"Non pago perché io… senti!", n:"l'inizio di ogni controreplica" },
  { t:"Nooo… io non me piglio niente, pijolo te!", n:"il ribaltamento della frittata" },
  { t:"Se, mo vengo esso…", n:"il sarcasmo aquilano allo stato puro" },
  { t:"Ma quale contratto, io non ho firmato niente!", n:"la lotta contro la burocrazia inventata" },
  { t:"Tu sei pazzo, completamente pazzo!", n:"la sentenza sui suoi persecutori" },
  { t:"Embè? E che vò da me?", n:"la domanda delle domande" },
  { t:"Io non ci sto a 'sto gioco!", n:"l'orgoglio del semplice cittadino" },
  { t:"M'avete fatto diventà matto!", n:"il bilancio dopo un mese di telefonate" },
  { t:"Vattene, vattene proprio!", n:"il congedo definitivo" },
  { t:"Semplice cliente.", n:"due parole, una leggenda (e un docufilm)" }
];


/* ============================================================
   2) GALLERIA FOTO
   Per aggiungere una TUA foto:
   1. Metti il file in  assets/img/
   2. Aggiungi una riga: { src:"assets/img/NOME.jpg", cap:"didascalia" },
   ============================================================ */
const GALLERIA = [
  { src:"assets/img/magnotta-ritratto.jpg",         cap:"Mario al telefono — il ritratto iconico" },
  { src:"assets/img/mario-02f.jpg",                 cap:"Mario in posa da culturista — l'ironia prima di tutto (archivio magnotta.it)" },
  { src:"assets/img/mario-13.jpg",                  cap:"Mario al basso sul palco, 1969 (archivio magnotta.it)" },
  { src:"assets/img/mario-17.jpg",                  cap:"Mario con un amico, 1969 (archivio magnotta.it)" },
  { src:"assets/img/mario-11.jpg",                  cap:"Mario da giovane tra i bambini della scuola (archivio magnotta.it)" },
  { src:"assets/img/magnotta-03.jpg",               cap:"Mario col suo gatto, a casa" },
  { src:"assets/img/magnotta-02.jpg",               cap:"Ritratto in giacca e cravatta" },
  { src:"assets/img/autografo.jpg",                 cap:"Autografo originale: «…la lavatrice l'ho pagata 400.000… oh freghète!» (archivio magnotta.it)" },
  { src:"assets/img/murale-magnotta.webp",          cap:"Il murale all'Aquila: la banconota da 480.000 lire (foto: Abruzzo Speciale)" },
  { src:"assets/img/evento-sala-ipogea.jpg",        cap:"L'evento alla Sala Ipogea dell'Emiciclo, 25 giugno 2025 (archivio magnotta.it)" },
  { src:"assets/img/magnotta-james-bond.png",       cap:"«Magnotta 007» — illustrazione dal sito magnotta.it" },
  { src:"assets/img/locandina-semplice-cliente.jpg",cap:"La locandina ufficiale di «Semplice Cliente»" }
];


/* ============================================================
   3) NEWS (riquadri in evidenza). Metti la più recente IN ALTO.
   { data:"Mese Anno", tag:"Etichetta", titolo:"…", testo:"…", url:"https://…" },
   Le prime notizie scorrono anche nel nastro FLASH NEWS in cima al sito:
   FLASH_NEWS_MAX dice quante (0 = nastro nascosto).
   ============================================================ */
const FLASH_NEWS_MAX = 6;
const NEWS = [
  { data:"13 Set 2026", tag:"Eventi",
    titolo:"«Semplice Cliente» al Pescara Comix & Games",
    testo:"Il docufilm su Mario Magnotta proiettato nel pomeriggio di domenica 13 settembre al Pala Dean Martin di Montesilvano, presentato dal regista Alessio De Leonardis e dal produttore Stefano Bacchiocchi (Duende Film).",
    url:"https://nerdando.com/2026/09/16/pescara-comix-2026-semplice-cliente-una-storia-iconica-ed-emozionante/" },
  { data:"7 Lug 2026", tag:"Cinema",
    titolo:"«Semplice Cliente» alle Notti di Cinema di Piazza Vittorio (Roma)",
    testo:"Proiezione all'aperto martedì 7 luglio alle 21:15, con incontro con il regista Alessio De Leonardis e il produttore Stefano Bacchiocchi.",
    url:"https://cinevillageroma.it/notti-di-cinema-a-piazza-vittorio/" },
  { data:"Gen 2026", tag:"Cinema",
    titolo:"«Semplice Cliente» torna nelle sale d'Abruzzo",
    testo:"Dal 12 gennaio: L'Aquila (Movieplex, 12/1), Chieti (UCI Luxe Megalò, 12–13/1), Spoltore (Multicinema Arca, 26/1) e Avezzano (Multicinema Astra, 28/1).",
    url:"https://www.laquilablog.it/semplice-cliente-torna-al-cinema-il-film-su-magnotta/" },
  { data:"22 Dic 2025", tag:"Stampa",
    titolo:"Il Foglio: «Eroe per caso, il mito pop di Mario Magnotta»",
    testo:"Francesco Palmieri racconta su Il Foglio la parabola di Magnotta, da bidello a icona pop.",
    url:"https://www.ilfoglio.it/cultura/2025/12/22/news/eroe-per-caso-il-mito-pop-di-mario-magnotta--118901" },
  { data:"8 Dic 2025", tag:"Cinema",
    titolo:"Incontro con il regista al Nuovo Cinema Aquila (Roma)",
    testo:"Al Pigneto, dopo la proiezione delle 20:00, incontro con Alessio De Leonardis e Stefano Bacchiocchi; nel foyer uno spazio espositivo dedicato a Mario.",
    url:"https://cinemaaquila.it/evento/incontro-con-il-regista-alessio-de-leonardis-per-semplice-cliente/" },
  { data:"Dic 2025", tag:"Eventi",
    titolo:"Proiezioni-evento con gadget a Roma",
    testo:"«Semplice Cliente» a Roma con proiezioni-evento e gadget dal 4 al 16 dicembre 2025.",
    url:"https://www.romatoday.it/eventi/semplice-cliente-leggenda-mario-magnotta-cinema-4-16-dicembre-2025.html" },
  { data:"Nov 2025", tag:"Cinema",
    titolo:"«Semplice Cliente» nelle sale",
    testo:"Il docufilm di Alessio De Leonardis (Duende Film) arriva al cinema dal 22 novembre 2025.",
    url:"https://cinecittanews.it/semplice-cliente-in-sala-la-leggenda-di-mario-magnotta/" },
  { data:"17 Set 2025", tag:"Magnotta Day",
    titolo:"Magnotta Day: L'Aquila festeggia il suo mito",
    testo:"Il 16 settembre, anniversario di «Lavatrice 4», la città celebra il Magnotta Day tra murale e proiezioni.",
    url:"https://www.laquilablog.it/magnotta-day-una-maxi-banconota-ricorda-il-bidello-leggenda/" },
  { data:"16 Set 2025", tag:"Città",
    titolo:"Murale gigante all'Aquila",
    testo:"Svelato il murale di 4,3×8 m dedicato al «bidello più famoso d'Italia» nel campus di Colle Sapone.",
    url:"https://www.abruzzospeciale.it/2025/09/16/murales-mario-magnotta-laquila/" },
  { data:"15 Lug 2025", tag:"TV",
    titolo:"Magnotta in uno sketch di Edoardo Ferrario su TV8",
    testo:"Nello sketch true-crime «In & Out» su TV8, Edoardo Ferrario indaga su Mario Magnotta: il mito continua in TV.",
    url:"https://www.youtube.com/watch?v=Agg90ZHiJ3o" },
  { data:"Giu 2025", tag:"Evento",
    titolo:"L'Aquila celebra Magnotta all'Emiciclo",
    testo:"Il 25 giugno l'Associazione 3:33 e Mirko Rocci portano Mario all'Emiciclo: scienza, ironia e memoria.",
    url:"https://www.ilcapoluogo.it/2025/06/25/mario-magnotta-superstar-laquila-celebra-il-bidello-che-ha-fatto-ridere-tutta-italia-senza-volerlo/" }
];


/* ============================================================
   4) ARTICOLI NAZIONALI IN EVIDENZA (i 3 più importanti, riquadri grandi)
   { testata:"…", titolo:"…", estratto:"…", url:"https://…" },
   ============================================================ */
const EVIDENZA = [
  { testata:"Il Giornale", titolo:"Lo scherzo telefonico più famoso di sempre",
    estratto:"«Quando gli rivelano che è tutta una burla, Magnotta è già il bidello più famoso d'Italia.»",
    url:"https://www.ilgiornale.it/news/attualit/bidello-magnotta-e-lavatrice-scherzo-telefonico-pi-famoso-2237189.html" },
  { testata:"Il Post", titolo:"Il più celebre scherzo telefonico italiano di sempre",
    estratto:"La storia completa dello scherzo della lavatrice e di come è diventato un fenomeno nazionale.",
    url:"https://www.ilpost.it/2023/11/02/mario-magnotta-lavatrice/" },
  { testata:"Il Foglio", titolo:"Eroe per caso. Il mito pop di Mario Magnotta",
    estratto:"Francesco Palmieri: da bidello a icona pop, «un'epoca di maggiore libertà».",
    url:"https://www.ilfoglio.it/cultura/2025/12/22/news/eroe-per-caso-il-mito-pop-di-mario-magnotta--118901" }
];


/* ============================================================
   5) RASSEGNA STAMPA (tutti gli articoli, dal più NUOVO al più VECCHIO)
   { data:"GG Mese Anno", testata:"…", titolo:"…", url:"https://…" },
   ============================================================ */
const RASSEGNA = [
  { data:"16 Set 2026", testata:"Nerdando", titolo:"Pescara Comix 2026 – «Semplice Cliente», una storia iconica ed emozionante", url:"https://nerdando.com/2026/09/16/pescara-comix-2026-semplice-cliente-una-storia-iconica-ed-emozionante/" },
  { data:"8 Gen 2026", testata:"Leggo", titolo:"Mario Magnotta, chi era il bidello diventato leggenda: lo scherzo della lavatrice che oggi è un film", url:"https://www.leggo.it/spettacoli/cinema/08_gennaio_2026_mario_magnotta_chi_e_bidello_scherzo_telefonico_lavatrice_film-9285547.html" },
  { data:"Gen 2026", testata:"ChietiToday", titolo:"All'UCI Cinemas Luxe di Megalò «Semplice Cliente», il film sulla storia di Mario Magnotta", url:"https://www.chietitoday.it/eventi/cinema/semplice-cliente-film-mario-magnotta-chieti-12-13-gennaio-2026.html" },
  { data:"5 Gen 2026", testata:"L'Aquila Blog", titolo:"«Semplice Cliente», torna al cinema il film su Magnotta", url:"https://www.laquilablog.it/semplice-cliente-torna-al-cinema-il-film-su-magnotta/" },
  { data:"22 Dic 2025", testata:"Il Foglio", titolo:"Eroe per caso. Il mito pop di Mario Magnotta (di Francesco Palmieri)", url:"https://www.ilfoglio.it/cultura/2025/12/22/news/eroe-per-caso-il-mito-pop-di-mario-magnotta--118901" },
  { data:"Dic 2025", testata:"RomaToday", titolo:"«Semplice Cliente»: proiezioni-evento con gadget a Roma (4–16 dicembre)", url:"https://www.romatoday.it/eventi/semplice-cliente-leggenda-mario-magnotta-cinema-4-16-dicembre-2025.html" },
  { data:"Nov 2025", testata:"Il Messaggero", titolo:"Al cinema la storia dello scherzo più famoso d'Italia. Intervista al regista", url:"https://www.ilmessaggero.it/video/spettacoli/mario_magnotta_al_cinema_la_storia_dello_scherzo_piu_famoso_d_italia-9220177.html" },
  { data:"Nov 2025", testata:"Cinecittà News", titolo:"«Semplice Cliente», in sala la leggenda di Mario Magnotta", url:"https://cinecittanews.it/semplice-cliente-in-sala-la-leggenda-di-mario-magnotta/" },
  { data:"Nov 2025", testata:"HotCorn", titolo:"«Un semplice cliente»: intervista ad Alessio De Leonardis", url:"https://hotcorn.com/it/film/news/un-semplice-cliente-intervista-ad-alessio-de-leonardis/" },
  { data:"Nov 2025", testata:"MarsicaLive", titolo:"«La presi e te la pagai»: il film sul bidello più famoso d'Italia", url:"https://marsicalive.it/la-presi-e-te-la-pagai-mario-magnotta-e-lo-scherzo-della-lavatrice-il-film-sul-bidello-piu-famoso-ditalia/" },
  { data:"Nov 2025", testata:"AbruzzoWeb", titolo:"«Semplice Cliente», la storia di Mario Magnotta al cinema", url:"https://www.abruzzoweb.it/semplice-cliente-la-storia-di-mario-magnotta-al-cinema-con-il-film-di-alessio-de-leonardis/" },
  { data:"16 Set 2025", testata:"ANSA", titolo:"Mito dopo scherzo telefonico, ecco il murale di Mario Magnotta", url:"https://www.ansa.it/abruzzo/notizie/2025/09/16/mito-dopo-scherzo-telefonico-ecco-il-murale-di-mario-magnotta_700637c2-8a66-4702-936c-3fc80725abe4.html" },
  { data:"16 Set 2025", testata:"Abruzzo Speciale", titolo:"L'Aquila celebra Mario Magnotta: murales gigante per il «bidello più famoso d'Italia»", url:"https://www.abruzzospeciale.it/2025/09/16/murales-mario-magnotta-laquila/" },
  { data:"25 Giu 2025", testata:"Il Capoluogo", titolo:"Mario Magnotta superstar, L'Aquila celebra il bidello che ha fatto ridere tutta Italia", url:"https://www.ilcapoluogo.it/2025/06/25/mario-magnotta-superstar-laquila-celebra-il-bidello-che-ha-fatto-ridere-tutta-italia-senza-volerlo/" },
  { data:"24 Giu 2025", testata:"News-Town", titolo:"«Magnotta: viralità spontanea che anticipa l'era degli influencer»: l'evento all'Emiciclo", url:"https://news-town.it/2025/06/24/eventi/magnotta-viralita-spontanea-che-anticipa-lera-degli-influencer-levento-allemiciclo/" },
  { data:"Giu 2025", testata:"OndaTv", titolo:"Magnotta, Memoria Virale: la prima influencer story d'Italia", url:"https://www.ondatv.tv/cultura/magnotta-memoria-virale-allaquila-un-evento-che-racconta-la-prima-influencer-story-ditalia/" },
  { data:"Nov 2023", testata:"Il Post", titolo:"Il più celebre scherzo telefonico italiano di sempre", url:"https://www.ilpost.it/2023/11/02/mario-magnotta-lavatrice/" },
  { data:"Il Giornale", testata:"Il Giornale", titolo:"Il bidello Magnotta e la lavatrice: lo scherzo telefonico più famoso di sempre", url:"https://www.ilgiornale.it/news/attualit/bidello-magnotta-e-lavatrice-scherzo-telefonico-pi-famoso-2237189.html" },
  { data:"Nov 2017", testata:"Leggo", titolo:"«Magnotta Wars», il bidello dello scherzo della lavatrice diventa un fumetto", url:"https://www.leggo.it/italia/cronache/magnotta_wars_lavatrice_moglie_bidello_scherzo_30_novembre_2017-3399146.html" },
  { data:"Archivio", testata:"Wikipedia", titolo:"Mario Magnotta — la voce sull'enciclopedia libera", url:"https://it.wikipedia.org/wiki/Mario_Magnotta" }
];


/* ============================================================
   6) CHATBOT «Chatta con Mario» — suggerimenti
   La chat risponde con le FRASI e l'AUDIO REALE di Mario.
   • Il database frasi+audio è in  js/chat-quotes.js  (generato dall'app, non modificarlo a mano)
   • Gli argomenti riconosciuti (parole chiave → frasi) sono in  js/chatbot.js  (CHAT_INTENTS)
   • Qui puoi solo cambiare i "suggerimenti" cliccabili sotto la chat:
   ============================================================ */
const CHAT_SUGGESTIONS = [
  "Ciao Mario!",
  "Come stai?",
  "E la lavatrice?",
  "Chi è Bruno?",
  "Quanto costa?",
  "Sei arrabbiato?",
  "Chi sei?",
  "Ti disturbo?"
];

/* =========================================================
   DOMANDE FREQUENTI (sezione #faq) — q = domanda, a = risposta, in it/en/es.
   Testi brevi e fattuali: sono quelli che motori e AI citano.
   Dopo ogni modifica: node tools/prerender.js
   ========================================================= */
const FAQ = [
  { q:{"it": "Chi era Mario Magnotta?", "en": "Who was Mario Magnotta?", "es": "¿Quién era Mario Magnotta?"},
    a:{"it": "Mario Magnotta era un bidello dell'Istituto Tecnico «Luigi Rendina» all'Aquila, nato il 14 ottobre 1942 a Pieve di Teco (Imperia) e morto il 4 gennaio 2009 a L'Aquila, diventato celebre per lo scherzo telefonico della lavatrice del 1987, considerato il primo meme italiano.", "en": "Mario Magnotta was a janitor at the Istituto Tecnico «Luigi Rendina» in L'Aquila, born on 14 October 1942 in Pieve di Teco (Imperia) and died on 4 January 2009 in L'Aquila, becoming famous for the 1987 washing machine prank call, considered the first Italian meme.", "es": "Mario Magnotta era un conserje del Istituto Tecnico «Luigi Rendina» en L'Aquila, nacido el 14 de octubre de 1942 en Pieve di Teco (Imperia) y muerto el 4 de enero de 2009 en L'Aquila, se hizo célebre por la broma telefónica de la lavadora de 1987, considerada el primer meme italiano."} },
  { q:{"it": "Che cos'è lo scherzo della lavatrice?", "en": "What is the washing machine prank?", "es": "¿Qué es la broma de la lavadora?"},
    a:{"it": "Lo scherzo della lavatrice è una serie di telefonate del 1986-87 in cui De Dominicis e Videtta, fingendosi dirigenti della San Giorgio, inventarono un contratto inesistente per la lavatrice che Mario aveva comprato nel 1981, culminando nella leggendaria «Lavatrice 4» del 16 settembre 1987.", "en": "The washing machine prank is a series of phone calls from 1986-87 in which De Dominicis and Videtta, posing as San Giorgio executives, invented a non‑existent contract for the washing machine that Mario had bought in 1981, culminating in the legendary «Lavatrice 4» of 16 September 1987.", "es": "La broma de la lavadora es una serie de llamadas telefónicas de 1986-87 en las que De Dominicis y Videtta, haciéndose pasar por directivos de la San Giorgio, inventaron un contrato inexistente para la lavadora que Mario había comprado en 1981, culminando en la legendaria «Lavatrice 4» del 16 de septiembre de 1987."} },
  { q:{"it": "Chi fece le telefonate e quando?", "en": "Who made the calls and when?", "es": "¿Quién hizo las llamadas y cuándo?"},
    a:{"it": "Le telefonate furono fatte da De Dominicis e Videtta tra il 1986 e il 1987, spacciandosi per dirigenti della San Giorgio e inventando un contratto mai firmato. La chiamata decisiva è «Lavatrice 4», del 16 settembre 1987, diffusa poi in tutta Italia di musicassetta in musicassetta.", "en": "The calls were made by De Dominicis and Videtta between 1986 and 1987, posing as San Giorgio executives and inventing a never‑signed contract. The decisive call is «Lavatrice 4», of 16 September 1987, subsequently spread throughout Italy from cassette to cassette.", "es": "Las llamadas fueron hechas por De Dominicis y Videtta entre 1986 y 1987, haciéndose pasar por directivos de la San Giorgio e inventando un contrato nunca firmado. La llamada decisiva es «Lavatrice 4», del 16 de septiembre de 1987, difundida luego en toda Italia de casete en casete."} },
  { q:{"it": "Che cosa significa «M'iscrivo ai terroristi» e da quale telefonata viene?", "en": "What does «M'iscrivo ai terroristi» mean and from which call does it come?", "es": "¿Qué significa «M'iscrivo ai terroristi» y de qué llamada proviene?"},
    a:{"it": "«M'iscrivo ai terroristi!» è l'esclamazione con cui Mario Magnotta, esasperato dalle finte richieste contrattuali, chiude la telefonata «Lavatrice 4» del 16 settembre 1987, diventando la frase simbolo del primo meme italiano e dell'intera saga.", "en": "«M'iscrivo ai terroristi!» (\"I'm joining the terrorists!\") is the exclamation with which Mario Magnotta, exasperated by the fake contractual demands, ends the «Lavatrice 4» call of 16 September 1987, becoming the symbolic phrase of the first Italian meme and of the entire saga.", "es": "«M'iscrivo ai terroristi!» (\"¡Me inscribo a los terroristas!\") es la exclamación con la que Mario Magnotta, exasperado por las falsas solicitudes contractuales, cierra la llamada «Lavatrice 4» del 16 de septiembre de 1987, convirtiéndose en la frase símbolo del primer meme italiano y de toda la saga."} },
  { q:{"it": "Perché è considerato il primo meme italiano?", "en": "Why is it considered the first Italian meme?", "es": "¿Por qué se considera el primer meme italiano?"},
    a:{"it": "È considerato il primo meme italiano perché le registrazioni si diffusero capillarmente in Italia copiate di musicassetta in musicassetta ben prima di internet, definita la prima «influencer story» italiana, accumulando poi milioni di visualizzazioni su YouTube e ispirando murales, fumetti e un docufilm.", "en": "It is considered the first Italian meme because the recordings spread capillary throughout Italy copied from cassette to cassette well before the internet, defined as the first Italian «influencer story», later accumulating millions of views on YouTube and inspiring murals, comics, and a docufilm.", "es": "Se considera el primer meme italiano porque las grabaciones se difundieron capilarmente en Italia copiadas de casete en casete mucho antes de internet, definida la primera «influencer story» italiana, acumulando luego millones de visualizaciones en YouTube e inspirando murales, cómics y un documental."} },
  { q:{"it": "Che cos'è il docufilm «Semplice Cliente»?", "en": "What is the docufilm «Semplice Cliente»?", "es": "¿Qué es el docufilm «Semplice Cliente»?"},
    a:{"it": "«Semplice Cliente» è un docufilm del 2025 diretto da Alessio De Leonardis, prodotto da Duende Film, della durata di 59 minuti, uscito nelle sale dal 22 novembre 2025, che racconta la vicenda umana e mediatica di Mario Magnotta.", "en": "«Semplice Cliente» is a 2025 docufilm directed by Alessio De Leonardis, produced by Duende Film, 59 minutes long, released in theaters from 22 November 2025, recounting the human and media story of Mario Magnotta.", "es": "«Semplice Cliente» es un docufilm de 2025 dirigido por Alessio De Leonardis, producido por Duende Film, de una duración de 59 minutos, estrenado en salas el 22 de noviembre de 2025, que cuenta la historia humana y mediática de Mario Magnotta."} },
  { q:{"it": "Dove si ascoltano le telefonate originali?", "en": "Where can the original calls be listened to?", "es": "¿Dónde se escuchan las llamadas originales?"},
    a:{"it": "Le telefonate originali rimasterizzate in HQ 2025 si ascoltano sul canale YouTube ufficiale https://www.youtube.com/@MarioMagnotta-aq, che include l'intera saga «Lavatrice 1-4», la saga «Moglie 1-3», «Telefono Azzurro 1-2» e l'intervista a Radio Rock del 1991.", "en": "The original calls remastered in HQ 2025 can be listened to on the official YouTube channel https://www.youtube.com/@MarioMagnotta-aq, which includes the entire «Lavatrice 1-4» saga, the «Moglie 1-3» saga, «Telefono Azzurro 1-2», and the 1991 Radio Rock interview.", "es": "Las llamadas telefónicas originales remasterizadas en HQ 2025 se escuchan en el canal de YouTube oficial https://www.youtube.com/@MarioMagnotta-aq, que incluye toda la saga «Lavatrice 1-4», la saga «Moglie 1-3», «Telefono Azzurro 1-2» y la entrevista a Radio Rock de 1991."} },
  { q:{"it": "Perché questo è il sito ufficiale e chi lo ha approvato?", "en": "Why is this the official site and who approved it?", "es": "¿Por qué este es el sitio oficial y quién lo ha aprobado?"},
    a:{"it": "Questo è l'unico sito ufficiale perché reca la dicitura «L'UNICO SITO UFFICIALE · APPROVATO DA ROMINA MAGNOTTA», figlia di Mario, e ospita i contenuti autorizzati: audio rimasterizzati, foto d'archivio, eventi, news e il link al docufilm «Semplice Cliente».", "en": "This is the only official site because it bears the wording «L'UNICO SITO UFFICIALE · APPROVATO DA ROMINA MAGNOTTA», Mario's daughter, and hosts authorized content: remastered audio, archive photos, events, news, and the link to the docufilm «Semplice Cliente».", "es": "Este es el único sitio oficial porque lleva la dicitura «L'UNICO SITO UFFICIALE · APPROVATO DA ROMINA MAGNOTTA», hija de Mario, y alberga los contenidos autorizados: audio remasterizados, fotos de archivo, eventos, noticias y el enlace al docufilm «Semplice Cliente»."} },
];
