-- FINAL SECURITY FIX FOR Supabase
-- Rimuove tutte le policy pubbliche residue per rendere la tabella sicura.
-- Assicurati di aver già creato e testato la Edge Function "save-subscription".

-- 1. Rimuovi le policy che permettono l'accesso non filtrato
DROP POLICY IF EXISTS "Permetti inserimento anonimo" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Permetti aggiornamento tramite token" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Permetti lettura tramite token" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Public Update" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Public Insert" ON public.notification_subscriptions;

-- 2. Assicurati che RLS sia abilitato
ALTER TABLE public.notification_subscriptions ENABLE ROW LEVEL SECURITY;

-- 3. (Opzionale) Se vuoi che l'admin possa ancora vedere i dati dalla dashboard, 
-- le policy per il service_role non sono necessarie perché lo bypassa già.

-- 4. Fix finale per le funzioni (search path) se non già fatto
ALTER FUNCTION public.notify_new_news() SET search_path = public, extensions;
ALTER FUNCTION public.notify_new_alert() SET search_path = public, extensions;
