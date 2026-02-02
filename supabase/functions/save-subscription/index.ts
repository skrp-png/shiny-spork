import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

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
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // Get the request body
        const body = await req.json()
        const { token, auth_key, p256dh_key, preferences } = body

        console.log('--- NUOVA SOTTOSCRIZIONE RICEVUTA ---');
        console.log('Payload:', JSON.stringify(body));

        // Validate required fields
        if (!token || !auth_key || !p256dh_key) {
            console.error('Campi mancanti:', { token: !!token, auth: !!auth_key, p256: !!p256dh_key });
            throw new Error('Missing required fields')
        }

        // Upsert subscription using Service Role (bypasses RLS)
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
            console.error('Errore Database:', error);
            throw error
        }

        console.log('Salvataggio riuscito per endpoint:', token.substring(0, 30) + '...');

        return new Response(
            JSON.stringify(data),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
