-- Rimuove i trigger che inviavano notifiche push direttamente dal database.
--
-- Perché:
--  1. Il vecchio script (setup_triggers.sql) conteneva la service_role key in chiaro.
--  2. Le notifiche venivano inviate DUE volte: dal trigger e dal bot Telegram.
--  3. I link delle notifiche (/news/<id>, /alerts) portavano a pagine inesistenti.
--
-- Ora le notifiche partono solo dalla Edge Function "telegram-bot", che chiama
-- "send-push" con la service role key presa dalle variabili d'ambiente di Supabase.
-- Nota: i contenuti inseriti a mano dalla dashboard Supabase NON inviano notifiche.

DROP TRIGGER IF EXISTS on_news_inserted ON public.news;
DROP TRIGGER IF EXISTS on_alert_inserted ON public.alerts;

DROP FUNCTION IF EXISTS public.notify_new_news();
DROP FUNCTION IF EXISTS public.notify_new_alert();
