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
   ============================================================ */
const NEWS = [
  { data:"22 Dic 2025", tag:"Stampa",
    titolo:"Il Foglio: «Eroe per caso, il mito pop di Mario Magnotta»",
    testo:"Francesco Palmieri racconta su Il Foglio la parabola di Magnotta, da bidello a icona pop.",
    url:"https://www.ilfoglio.it/cultura/2025/12/22/news/eroe-per-caso-il-mito-pop-di-mario-magnotta--118901" },
  { data:"Nov 2025", tag:"Cinema",
    titolo:"«Semplice Cliente» nelle sale",
    testo:"Il docufilm di Alessio De Leonardis (Duende Film) arriva al cinema dal 22 novembre 2025.",
    url:"https://cinecittanews.it/semplice-cliente-in-sala-la-leggenda-di-mario-magnotta/" },
  { data:"Dic 2025", tag:"Eventi",
    titolo:"Proiezioni-evento con gadget a Roma",
    testo:"«Semplice Cliente» a Roma con proiezioni-evento e gadget dal 4 al 16 dicembre 2025.",
    url:"https://www.romatoday.it/eventi/semplice-cliente-leggenda-mario-magnotta-cinema-4-16-dicembre-2025.html" },
  { data:"16 Set 2025", tag:"Città",
    titolo:"Murale gigante all'Aquila",
    testo:"Svelato il murale di 4,3×8 m dedicato al «bidello più famoso d'Italia» nel campus di Colle Sapone.",
    url:"https://www.abruzzospeciale.it/2025/09/16/murales-mario-magnotta-laquila/" },
  { data:"17 Set 2025", tag:"Magnotta Day",
    titolo:"Magnotta Day: L'Aquila festeggia il suo mito",
    testo:"Il 16 settembre, anniversario di «Lavatrice 4», la città celebra il Magnotta Day tra murale e proiezioni.",
    url:"https://magnotta.it/magnotta-news/" },
  { data:"15 Lug 2025", tag:"TV",
    titolo:"Magnotta citato in uno sketch su TV8",
    testo:"Il mito di Mario continua in TV: uno sketch su TV8 omaggia le telefonate più famose d'Italia.",
    url:"https://magnotta.it/magnotta-news/" },
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
  { data:"Archivio", testata:"magnotta.it", titolo:"L'archivio storico: telefonate, remix, video, foto e tutte le news su Mario", url:"https://magnotta.it/" },
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
