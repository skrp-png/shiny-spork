# 🌅 Buongiorno Calitri

La community App per Calitri - Meteo, Avvisi, Mercatino ed Eventi

## 📱 Descrizione

Buongiorno Calitri è una Progressive Web App (PWA) che connette la comunità di Calitri con informazioni in tempo reale su:

- 🌤️ **Meteo**: Previsioni dettagliate per Calitri
- 📰 **News**: Notizie locali e aggiornamenti
- ⚠️ **Avvisi**: Comunicazioni importanti per la comunità
- 📅 **Eventi**: Calendario eventi locali
- 🛍️ **Mercatino**: Scambio e baratto tra cittadini
- 🍽️ **Dove Mangiare/Dormire**: Guida ai servizi locali
- 🗺️ **Mappa Interattiva**: Esplora Calitri
- 🔔 **Notifiche Push**: Resta aggiornato in tempo reale

## 🚀 Tecnologie

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **Maps**: Leaflet + React Leaflet
- **Analytics**: Google Analytics
- **Bot**: Telegram Bot per gestione contenuti

## 🛠️ Setup Locale

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone <repository-url>

# Installa le dipendenze
npm install

# Copia il file di esempio delle variabili d'ambiente
cp .env.example .env.local

# Configura le variabili d'ambiente in .env.local
# Vedi sezione "Variabili d'Ambiente" sotto

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 🔐 Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto con le seguenti variabili:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Push Notifications (VAPID Keys)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# Google Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📦 Deploy su Vercel

### 1. Configura Segreti in Supabase

Per far funzionare il bot e le notifiche push, devi impostare i segreti nel tuo progetto Supabase:

```bash
# Chiavi per le notifiche push
supabase secrets set VAPID_PUBLIC_KEY=your_vapid_public_key
supabase secrets set VAPID_PRIVATE_KEY=your_vapid_private_key

# Chiavi per il bot Telegram
supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
supabase secrets set ALLOWED_TELEGRAM_ID=your_telegram_id

# Segreto del webhook (stringa casuale, es. generata con: openssl rand -hex 32)
# Il bot rifiuta qualsiasi richiesta che non lo contenga.
supabase secrets set TELEGRAM_WEBHOOK_SECRET=your_random_secret
```

### 2. Imposta il webhook Telegram

```bash
# Sostituisci con i tuoi valori
TELEGRAM_BOT_TOKEN="il_tuo_token"
TELEGRAM_WEBHOOK_SECRET="lo_stesso_segreto_impostato_sopra"
SUPABASE_FUNCTION_URL="https://your_project.supabase.co/functions/v1/telegram-bot"

# Imposta il webhook (secret_token è obbligatorio: Telegram lo invia in ogni richiesta)
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"${SUPABASE_FUNCTION_URL}\", \"secret_token\": \"${TELEGRAM_WEBHOOK_SECRET}\"}"
```

### 3. Deploy delle Edge Functions

```bash
# Il bot riceve richieste da Telegram (senza JWT Supabase): la verifica è fatta dal secret_token
supabase functions deploy telegram-bot --no-verify-jwt
# send-push accetta solo la service role key (controllo nel codice)
supabase functions deploy send-push
supabase functions deploy save-subscription
```

### 4. Notifiche push

Le notifiche partono solo dal bot Telegram. Se nel database esistono ancora i vecchi trigger
(`on_news_inserted`, `on_alert_inserted`), eseguire `scripts/remove_push_triggers.sql`
nell'SQL editor di Supabase, altrimenti ogni notifica arriva due volte.

## 🧪 Test

```bash
npm test             # test unitari (Vitest)
npm run build        # build di produzione
npm run test:smoke   # avvia la build e verifica che tutte le pagine rispondano 200
```

## 🤖 Telegram Bot

Il bot Telegram permette di gestire contenuti (news, avvisi, eventi) direttamente da Telegram.

### Setup Bot

1. Crea un bot con [@BotFather](https://t.me/botfather)
2. Ottieni il token del bot
3. Configura le variabili d'ambiente in Supabase Edge Functions:
   - `TELEGRAM_BOT_TOKEN`
   - `ALLOWED_TELEGRAM_ID`
4. Deploy della Edge Function:
   ```bash
   supabase functions deploy telegram-bot
   ```
5. Configura il webhook Telegram

### Comandi Bot

- `/news Titolo | Excerpt | Contenuto | URL_Immagine | Data | Categoria | Autore`
- `/avviso Messaggio`
- `/evento Titolo | Data | Ora | Location | Descrizione | Categoria`

## 📱 PWA Features

- ✅ Installabile su iOS e Android
- ✅ Funziona offline
- ✅ Notifiche push
- ✅ Icone e splash screens ottimizzate

## 📄 Licenza

© 2026 Buongiorno Calitri - Tutti i diritti riservati

## 🤝 Contributi

Per segnalazioni o suggerimenti, contatta il team di sviluppo.

