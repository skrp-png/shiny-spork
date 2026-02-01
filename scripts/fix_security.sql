-- ATTIVAZIONE SICUREZZA (RLS) PER TUTTE LE TABELLE
-- Esegui questo script nel SQL Editor di Supabase

-- 1. Tabella alerts
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON alerts;
CREATE POLICY "Permetti lettura pubblica" ON alerts FOR SELECT USING (true);

-- 2. Tabella events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON events;
CREATE POLICY "Permetti lettura pubblica" ON events FOR SELECT USING (true);

-- 3. Tabella news
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON news;
CREATE POLICY "Permetti lettura pubblica" ON news FOR SELECT USING (true);

-- 4. Tabella services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON services;
CREATE POLICY "Permetti lettura pubblica" ON services FOR SELECT USING (true);

-- 5. Tabella points_of_interest
ALTER TABLE points_of_interest ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON points_of_interest;
CREATE POLICY "Permetti lettura pubblica" ON points_of_interest FOR SELECT USING (true);

-- 6. Tabella restaurants
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON restaurants;
CREATE POLICY "Permetti lettura pubblica" ON restaurants FOR SELECT USING (true);

-- 7. Tabella accommodations
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON accommodations;
CREATE POLICY "Permetti lettura pubblica" ON accommodations FOR SELECT USING (true);

-- 8. Tabella market_items
ALTER TABLE market_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permetti lettura pubblica" ON market_items;
CREATE POLICY "Permetti lettura pubblica" ON market_items FOR SELECT USING (true);

-- NOTA: Queste politiche permettono a chiunque di LEGGERE i dati (SELECT).
-- Le operazioni di INSERT, UPDATE e DELETE rimangono bloccate per l'accesso anonimo
-- e saranno possibili solo tramite la dashboard di Supabase.
