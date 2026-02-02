import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        console.log('--- EDGE FUNCTION START: save-subscription ---');

        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            console.error('ERRORE: Variabili Supabase mancanti!');
            throw new Error('Supabase project configuration is missing.')
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // Parsing body
        const body = await req.json()
        const { token, auth_key, p256dh_key, preferences } = body

        console.log('Payload ricevuto:', JSON.stringify({
            token: token ? token.substring(0, 30) + '...' : 'NULL',
            auth: !!auth_key,
            p256: !!p256dh_key,
            prefs: preferences
        }));

        // Validate required fields
        if (!token || !auth_key || !p256dh_key) {
            console.error('ERRORE: Campi obbligatori mancanti!');
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        // Upsert subscription
        const { data, error } = await supabase
            .from('notification_subscriptions')
            .upsert({
                token,
                auth_key,
                p256dh_key,
                preferences,
                last_updated: new Date().toISOString()
            }, { onConflict: 'token' })

        if (error) {
            console.error('ERRORE DATABASE:', error.message);
            throw error
        }

        console.log('Salvataggio riuscito!');

        return new Response(
            JSON.stringify({ success: true, message: 'Subscription saved' }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error) {
        console.error('ERRORE CRITICO:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            }
        )
    }
})
