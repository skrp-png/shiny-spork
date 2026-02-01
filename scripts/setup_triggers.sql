-- 1. ABILITA LE ESTENSIONI NECESSARIE
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. TRIGGER PER NUOVE NEWS
CREATE OR REPLACE FUNCTION public.notify_new_news()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://vucbzkfpvemrstvakqzn.supabase.co/functions/v1/send-push',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1Y2J6a2ZwdmVtcnN0dmFrcXpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTQ0NjkzMywiZXhwIjoyMDg1MDIyOTMzfQ.DyvMLpQVcQEriwQdnvu-2AH7hsEREbgYMtT0qjpvR6M'
      ),
      body := jsonb_build_object(
        'type', 'news',
        'title', 'Nuova Notizia 🗞️',
        'body', NEW.title,
        'url', '/news/' || NEW.id
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_news_inserted ON news;
CREATE TRIGGER on_news_inserted
  AFTER INSERT ON news
  FOR EACH ROW EXECUTE FUNCTION notify_new_news();

-- 3. TRIGGER PER NUOVI AVVISI
CREATE OR REPLACE FUNCTION public.notify_new_alert()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://vucbzkfpvemrstvakqzn.supabase.co/functions/v1/send-push',
      headers := jsonb_build_object(
        'Content-Type', 'application/json', 
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1Y2J6a2ZwdmVtcnN0dmFrcXpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTQ0NjkzMywiZXhwIjoyMDg1MDIyOTMzfQ.DyvMLpQVcQEriwQdnvu-2AH7hsEREbgYMtT0qjpvR6M'
      ),
      body := jsonb_build_object(
        'type', 'alerts',
        'title', '⚠️ AVVISO IMPORTANTE',
        'body', NEW.message,
        'url', '/alerts'
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_alert_inserted ON alerts;
CREATE TRIGGER on_alert_inserted
  AFTER INSERT ON alerts
  FOR EACH ROW EXECUTE FUNCTION notify_new_alert();
