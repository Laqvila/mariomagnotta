# 🔒 Check di sicurezza — mariomagnotta.com (v5)

Sito **statico** (solo HTML/CSS/JS): nessun backend, nessun database, nessun form che invia dati a server. Superficie d'attacco minima.

**Scenario di deploy:** repository **pubblica su GitHub** → hosting **Aruba** → DNS gestito da **Cloudflare** sul dominio **mariomagnotta.com**.

## ✅ Già a posto nel codice
- **Nessun segreto**: niente API key, password, token o `.env` (scansione effettuata). ✔
- **Link esterni sicuri**: tutti i `target="_blank"` hanno `rel="noopener"`. ✔
- **Cookie/GDPR**: contenuti YouTube caricati **solo dopo consenso**; banner + privacy policy in 3 lingue. ✔
- **CSP** via `<meta>`: `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, sorgenti limitate a YouTube/Google Fonts. ✔
- **Referrer-Policy**: `strict-origin-when-cross-origin`. ✔
- **Nessun input utente** finisce nel DOM (i contenuti arrivano solo dai file che modifichi tu): rischio XSS nullo. ✔
- L'unico contatto è un **`mailto:` (magnotta@mirkorocci.com)**: nessun dato transita dal sito. ✔

## ☁️ Configurazione Cloudflare (consigliata)
Nel pannello Cloudflare del dominio **mariomagnotta.com**:
1. **SSL/TLS → modalità "Full (strict)"** (mai "Flexible": causa redirect loop e traffico in chiaro verso Aruba). Richiede certificato attivo su Aruba.
2. **Edge Certificates**: attiva **Always Use HTTPS** e **HSTS** (max-age 12 mesi, includeSubdomains; "preload" solo quando sei sicuro).
3. **Attiva il proxy (nuvoletta arancione)** sui record DNS: nasconde l'IP di Aruba e aggiunge protezione DDoS/WAF gratuita.
4. (Facoltativo) **Bot Fight Mode** e **Scrape Shield**: gratuiti.
5. (Facoltativo) Regola di cache "Cache Everything": sito statico = più veloce e meno carico su Aruba.

## 🖥️ Configurazione Aruba (hosting Linux/Apache)
Carica un file **`.htaccess`** nella cartella del sito:

```apache
# Forza HTTPS (se non già gestito da Cloudflare)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Header di sicurezza
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "DENY"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# Niente listing delle directory
Options -Indexes
```
- Attiva il **certificato SSL** dal pannello Aruba (necessario per Cloudflare "Full strict").

## 📦 GitHub (repo pubblica)
- Incluso **`.gitignore`** (esclude file di sistema e il server di anteprima locale).
- HTML/CSS/JS sono pensati per essere pubblici: nessun contenuto riservato.
- **Mai** committare in futuro chiavi di servizi (newsletter, analytics, ecc.).
- Suggerito: branch `main` protetto; deploy via FTP Aruba o GitHub Actions.

## 🖼️ Nota legale per la repo pubblica
- Foto: Wikimedia Commons (CC) + **archivio magnotta.it** (diritti dell'avente diritto) + locandina e materiali ufficiali.
- Foto del **murale**: scatto di *Abruzzo Speciale* (accreditato in pagina) — per l'uso definitivo, ok della testata o sostituiscila con una tua foto. Opera di Daniele Gottastia.
- I link agli articoli puntano alle testate originali (lecito).

## 🔁 Manutenzione
- Contenuti: modifica solo `js/contenuti.js` (vedi `GUIDA.md`).
- Nessuna dipendenza npm; gli unici esterni sono Google Fonts e YouTube (CDN ufficiali).

_Ultimo controllo: build v5._
