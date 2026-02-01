-- FIX SECURITY: Rimuovi le policy pubbliche per notification_subscriptions
-- Ora che l'inserimento avviene tramite Edge Function (lato server), non abbiamo più bisogno
-- di permettere INSERT e UPDATE dal client pubblico (browser).

DROP POLICY IF EXISTS "Permetti inserimento anonimo" ON notification_subscriptions;
DROP POLICY IF EXISTS "Permetti aggiornamento tramite token" ON notification_subscriptions;

-- Assicuriamoci che RLS sia attivo (dovrebbe già esserlo)
ALTER TABLE notification_subscriptions ENABLE ROW LEVEL SECURITY;

-- Note:
-- Con queste modifiche, solo il "Service Role" (usato dalle Edge Functions e dal backend)
-- potrà scrivere su questa tabella. Nessun utente anonimo o autenticato potrà farlo direttamente.
