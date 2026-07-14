# 📘 Guida rapida — come aggiornare il sito di Mario Magnotta

Per aggiungere **notizie, foto, frasi o articoli** ti basta modificare **UN SOLO file**:

```
js/contenuti.js
```

Aprilo con un editor di testo (Blocco note, VS Code, ecc.), modifica, salva e ricarica la pagina.
Non serve toccare nient'altro. Il testo che scrivi appare uguale in italiano, inglese e spagnolo.

> 💡 Regola d'oro: ogni voce sta tra graffe `{ ... }` e finisce con una **virgola**.
> Scrivi il testo tra `"virgolette doppie"`. Se ti serve una virgoletta dentro al testo, usa `«...»` o `'...'`.

---

## 1) Aggiungere una FRASE di Magnotta
Cerca la sezione `const FRASI = [` e aggiungi una riga:

```js
{ t:"La nuova frase!", n:"piccola nota sotto la frase" },
```

## 2) Aggiungere una FOTO alla galleria
1. Copia il file immagine nella cartella `assets/img/` (es. `mario-giovane.jpg`).
2. Nella sezione `const GALLERIA = [` aggiungi:

```js
{ src:"assets/img/mario-giovane.jpg", cap:"Mario da giovane" },
```

## 3) Aggiungere una NOTIZIA (riquadri in evidenza)
Nella sezione `const NEWS = [`, metti la più recente **in alto**:

```js
{ data:"Gen 2026", tag:"Cinema", titolo:"Titolo della notizia",
  testo:"Una frase di riassunto.", url:"https://link-articolo.it" },
```
- `tag` è l'etichetta colorata (es. Cinema, Evento, Città…).
- `url` è il link; se non c'è, scrivi `url:""`.

## 4) Aggiungere un ARTICOLO alla Rassegna stampa
Nella sezione `const RASSEGNA = [`, aggiungi **in alto** (dal più nuovo al più vecchio):

```js
{ data:"Gen 2026", testata:"Nome Giornale", titolo:"Titolo dell'articolo", url:"https://link.it" },
```

## 5) Cambiare gli ARTICOLI IN EVIDENZA (i 3 riquadri grandi)
Nella sezione `const EVIDENZA = [` (massimo 3 voci consigliato):

```js
{ testata:"Nome Giornale", titolo:"Titolo", estratto:"Una frase dell'articolo.", url:"https://link.it" },
```

## 6) Pubblicare le modifiche online
Se il sito è su GitHub collegato ad Aruba: dopo aver salvato `js/contenuti.js`,
fai commit e push (o ricarica il file via FTP sul server Aruba). La pagina si aggiorna da sola.

---

## ➕ Aggiungere una TELEFONATA (video YouTube)
Questo sta in `js/data.js`, sezione `GRUPPI`. Copia un blocco video e cambia l'`id`
(l'`id` è la parte dopo `watch?v=` nel link di YouTube). Esempio:
```js
{ id:"XXXXXXXXXXX", titolo:"Lavatrice 5", badge:L("📞 Nuova","📞 New","📞 Nueva"),
  data:"1987", audio:"", desc:L("Descrizione it","Description en","Descripción es") },
```

## ❓ Domande frequenti
- **Ho sbagliato e la pagina è vuota** → di solito manca una virgola o una virgoletta.
  Controlla l'ultima voce che hai aggiunto. Premi F12 nel browser → scheda "Console" per vedere l'errore.
- **Le foto non si vedono** → controlla che il nome del file in `src:"..."` sia identico
  (maiuscole/minuscole comprese) a quello dentro `assets/img/`.
- **I video non partono** → al primo accesso bisogna accettare i cookie di YouTube
  (banner in basso): è richiesto dalla legge sulla privacy.

Buon lavoro! 🧺📞

---

## 🤖 Aggiornare il sito tramite Claude (automatico)
Da Claude Code, nella cartella di lavoro, scrivi:

```
/aggiorna-sito aggiungi alla rassegna stampa questo articolo: https://...
/aggiorna-sito aggiungi questa notizia: <testo o link>
/aggiorna-sito aggiungi questa foto: <percorso o URL> con didascalia "..."
```

Claude modifica i file giusti, verifica l'anteprima e fa **commit + push su GitHub da solo**.
Se la GitHub Action FTP è attiva (vedi `.github/workflows/deploy-aruba.yml.example`),
il push pubblica anche sul sito live Aruba automaticamente.

## 💬 Modificare il CHATBOT «Chatta con Mario»
Le risposte sono in `js/contenuti.js`, sezione `CHAT_REGOLE`:
ogni blocco ha `k:` (parole chiave da cercare nel messaggio) e `r:` (risposte possibili, scelte a caso).
`CHAT_BENVENUTO` = saluti iniziali; `CHAT_FALLBACK` = risposte quando nessuna parola corrisponde.
