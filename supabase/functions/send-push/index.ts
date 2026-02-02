import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import webpush from "https://esm.sh/web-push@3.6.7?target=deno"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!

webpush.setVapidDetails(
    'mailto:info@buongiornocalitri.it',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
)

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

serve(async (req) => {
    try {
        const { type, title, body, url } = await req.json()
        console.log(`Richiesta di invio push: tipo=${type}, titolo=${title}`);

        if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
            console.error("ERRORE: Chiavi VAPID mancanti nei segreti Supabase!");
            return new Response(JSON.stringify({ error: 'VAPID keys not configured' }), { status: 500 })
        }

        // 1. Recupera tutte le sottoscrizioni
        const { data: subs, error } = await supabase
            .from('notification_subscriptions')
            .select('*')

        if (error) {
            console.error("Errore recupero sottoscrizioni:", error);
            throw error
        }

        console.log(`Trovate ${subs?.length || 0} sottoscrizioni totali.`);

        // Filtra in base alle preferenze
        const filteredSubs = (subs || []).filter(sub => {
            const hasPref = sub.preferences && sub.preferences[type] === true;
            return hasPref;
        });

        console.log(`Sottoscrizioni filtrate per tipo "${type}": ${filteredSubs.length}`);

        const notifications = filteredSubs.map(sub => {
            const pushSubscription = {
                endpoint: sub.token,
                keys: {
                    auth: sub.auth_key,
                    p256dh: sub.p256dh_key
                }
            }

            return webpush.sendNotification(
                pushSubscription,
                JSON.stringify({ title, body, url: url || '/' })
            ).then(() => {
                console.log(`Notifica inviata con successo a endpoint: ${sub.token.substring(0, 30)}...`);
            }).catch(async (err) => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    console.log(`Sottoscrizione scaduta/disattivata (410/404), rimozione: ${sub.token.substring(0, 30)}...`);
                    await supabase.from('notification_subscriptions').delete().match({ token: sub.token })
                } else {
                    console.error('Errore invio push:', err);
                }
            })
        })

        await Promise.all(notifications)

        return new Response(JSON.stringify({ success: true, count: filteredSubs.length }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        console.error("Errore nella funzione send-push:", err.message);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }
})
