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

        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            throw new Error('Supabase project configuration is missing.')
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // Parsing body
        const body = await req.json()
        const { token, auth_key, p256dh_key, preferences } = body

        // Validate required fields
        if (!token || !auth_key || !p256dh_key) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        // Upsert subscription
        const { error } = await supabase
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

        return new Response(
            JSON.stringify({ success: true, message: 'Subscription saved' }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error) {
        console.error('ERRORE SAVE-SUBSCRIPTION:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            }
        )
    }
})
