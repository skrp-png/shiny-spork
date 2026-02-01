-- FIX 1: Imposta il search_path per le funzioni (Risolve "mutable search_path" warning)
-- È una best practice di sicurezza per evitare che le funzioni cerchino tabelle/estensioni in schemi non sicuri.

ALTER FUNCTION public.notify_new_news() SET search_path = public, extensions;
ALTER FUNCTION public.notify_new_alert() SET search_path = public, extensions;

-- FIX 2: Restringi le policy RLS per notification_subscriptions
-- Rimuoviamo la policy di SELECT pubblica (non necessaria per il funzionamento dell'app client-side che fa solo upsert).
-- Questo risolve il warning più grave riguardante la lettura pubblica dei dati.

DROP POLICY IF EXISTS "Permetti lettura tramite token" ON notification_subscriptions;

-- NOTA: Le policy di INSERT e UPDATE ("Permetti inserimento anonimo" e "Permetti aggiornamento tramite token")
-- devono rimanere attive "con true" perché l'app permette iscrizioni anonime senza login.
-- Senza autenticazione utente, non è possibile restringere ulteriormente queste operazioni al "proprietario" del dato
-- se non affidandosi alla conoscenza del token stesso (che funge da chiave segreta).
-- Il warning "Public Update" rimarrà, ma è accettabile in questo contesto specifico (Anonymous Web Push).

-- Opzionale: Se vuoi ricreare la policy di Insert/Update per essere sicuro che sia pulita:
-- DROP POLICY IF EXISTS "Permetti inserimento anonimo" ON notification_subscriptions;
-- DROP POLICY IF EXISTS "Permetti aggiornamento tramite token" ON notification_subscriptions;
-- CREATE POLICY "Permetti inserimento anonimo" ON notification_subscriptions FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Permetti aggiornamento tramite token" ON notification_subscriptions FOR UPDATE USING (true);
