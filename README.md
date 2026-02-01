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

### 1. Prepara il progetto
```bash
# Testa la build production
npm run build
npm run start
```

### 2. Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com) e importa il repository
2. Configura le variabili d'ambiente (vedi sopra)
3. Deploy!

### 3. Configurazione Post-Deploy

- Aggiorna l'URL nel file `sitemap.js` con il dominio finale
- Configura il webhook Telegram per il bot
- Verifica che le notifiche push funzionino

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

