import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import webpush from "https://esm.sh/web-push@3.4.5"

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

        // 1. Recupera tutte le sottoscrizioni che hanno attivato quel tipo di notifica
        const { data: subs, error } = await supabase
            .from('notification_subscriptions')
            .select('*')

        if (error) throw error

        // Filtra in base alle preferenze (assumendo che preferences sia un JSONB)
        const filteredSubs = subs.filter(sub => sub.preferences[type] === true)

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
                JSON.stringify({ title, body, url })
            ).catch(err => {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    // Rimuovi sottoscrizione scaduta
                    return supabase.from('notification_subscriptions').delete().match({ token: sub.token })
                }
                console.error('Errore invio a', sub.token, err)
            })
        })

        await Promise.all(notifications)

        return new Response(JSON.stringify({ success: true, count: filteredSubs.length }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }
})
