-- TABELLA PER LE SOTTOSCRIZIONI ALLE NOTIFICHE (WEB PUSH)
CREATE TABLE IF NOT EXISTS notification_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token TEXT UNIQUE NOT NULL, -- Endpoint del browser
    auth_key TEXT NOT NULL,      -- Chiave di autenticazione browser
    p256dh_key TEXT NOT NULL,    -- Chiave pubblica browser
    preferences JSONB DEFAULT '{"weather": true, "alerts": true, "events": true, "news": true}',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abilitiamo RLS
ALTER TABLE notification_subscriptions ENABLE ROW LEVEL SECURITY;

-- Permettiamo agli utenti anonimi di inserire/aggiornare il proprio token
-- (Per un'app pubblica senza login, usiamo l'anon key per gestire i propri token)
CREATE POLICY "Permetti inserimento anonimo" ON notification_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Permetti aggiornamento tramite token" ON notification_subscriptions FOR UPDATE USING (true);
CREATE POLICY "Permetti lettura tramite token" ON notification_subscriptions FOR SELECT USING (true);
