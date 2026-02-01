import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
const ALLOWED_TELEGRAM_ID = Deno.env.get('ALLOWED_TELEGRAM_ID')

serve(async (req) => {
    try {
        console.log("Richiesta ricevuta dal bot...");

        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !TELEGRAM_BOT_TOKEN || !ALLOWED_TELEGRAM_ID) {
            console.error("ERRORE: Variabili d'ambiente mancanti!");
            return new Response('config error', { status: 500 })
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        const payload = await req.json()
        console.log("Payload ricevuto:", JSON.stringify(payload));

        // Verifica che sia un messaggio di testo
        const message = payload.message
        if (!message || !message.text) {
            return new Response('ok', { status: 200 })
        }

        const chatId = message.chat.id
        const fromId = message.from.id.toString()
        const text = message.text

        // 1. Sicurezza: Verifica ID mittente
        if (fromId !== ALLOWED_TELEGRAM_ID) {
            console.warn(`Accesso negato per ID Telegram: ${fromId}`)
            await sendTelegramMessage(chatId, "⚠️ Non sei autorizzato a usare questo bot.")
            return new Response('unauthorized', { status: 200 })
        }

        // 2. Parsing Comandi
        if (text.startsWith('/news')) {
            await handleNews(supabase, chatId, text)
        } else if (text.startsWith('/avviso')) {
            await handleAlert(supabase, chatId, text)
        } else if (text.startsWith('/evento')) {
            await handleEvent(supabase, chatId, text)
        } else if (text === '/start') {
            await sendTelegramMessage(chatId, "👋 Ciao! Sono il bot di Buongiorno Calitri.\n\nComandi disponibili:\n\n📰 /news Titolo | Excerpt | Contenuto | URL_Immagine | Data | Categoria | Autore\n\n⚠️ /avviso Messaggio\n\n📅 /evento Titolo | Data | Ora | Location | Descrizione | Categoria")
        } else {
            await sendTelegramMessage(chatId, "❓ Comando non riconosciuto. Usa /start per aiuto.")
        }

        return new Response('ok', { status: 200 })

    } catch (error) {
        console.error('Error:', error.message)
        return new Response('error', { status: 200 })
    }
})

async function handleNews(supabase, chatId, text) {
    const content = text.replace('/news', '').trim()
    const parts = content.split('|').map(p => p.trim())

    if (parts.length < 7) {
        return sendTelegramMessage(chatId, "❌ Formato errato.\n\nUsa:\n/news Titolo | Excerpt | Contenuto | URL_Immagine | Data (yyyy-mm-dd) | Categoria | Autore\n\nEsempio:\n/news Festa Patronale | Breve descrizione | Testo completo della news | https://... | 2026-08-15 | Eventi | Mario Rossi")
    }

    const { error } = await supabase.from('news').insert({
        id: Date.now(),
        title: parts[0],
        excerpt: parts[1],
        content: parts[2],
        image: parts[3],
        date: parts[4],
        category: parts[5],
        author: parts[6],
        created_at: new Date().toISOString()
    })

    if (error) {
        console.error('News insert error:', error)
        return sendTelegramMessage(chatId, `❌ Errore: ${error.message}`)
    }

    // Invia notifica push
    await invokeSendPush(supabase, 'news', parts[0], parts[1])

    await sendTelegramMessage(chatId, "✅ News inserita con successo!")
}

async function handleAlert(supabase, chatId, text) {
    const message = text.replace('/avviso', '').trim()

    if (!message) {
        return sendTelegramMessage(chatId, "❌ Messaggio mancante. Usa: /avviso Testo")
    }

    const { error } = await supabase.from('alerts').insert({
        id: Date.now(),
        message: message,
        level: 'info',
        date: new Date().toISOString().split('T')[0],
        is_past: false
    })

    if (error) {
        console.error('Alert insert error:', error)
        return sendTelegramMessage(chatId, `❌ Errore: ${error.message}`)
    }

    // Invia notifica push
    await invokeSendPush(supabase, 'alerts', "⚠️ NUOVO AVVISO", message)

    await sendTelegramMessage(chatId, "✅ Avviso inserito con successo!")
}

async function handleEvent(supabase, chatId, text) {
    const content = text.replace('/evento', '').trim()
    const parts = content.split('|').map(p => p.trim())

    if (parts.length < 6) {
        return sendTelegramMessage(chatId, "❌ Formato errato.\n\nUsa:\n/evento Titolo | Data (yyyy-mm-dd) | Ora (HH:MM) | Location | Descrizione | Categoria\n\nEsempio:\n/evento Concerto | 2026-08-15 | 21:00 | Piazza Umberto I | Serata musicale | Musica")
    }

    const { error } = await supabase.from('events').insert({
        id: Date.now(),
        title: parts[0],
        date: parts[1],
        time: parts[2],
        location: parts[3],
        description: parts[4],
        category: parts[5],
        recurring: false
    })

    if (error) {
        console.error('Event insert error:', error)
        return sendTelegramMessage(chatId, `❌ Errore: ${error.message}`)
    }

    // Invia notifica push
    await invokeSendPush(supabase, 'events', `📅 ${parts[0]}`, `${parts[1]} alle ore ${parts[2]} @ ${parts[3]}`)

    await sendTelegramMessage(chatId, "✅ Evento inserito con successo!")
}

async function sendTelegramMessage(chatId, text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text })
    })
}

async function invokeSendPush(supabase, type, title, body) {
    try {
        await supabase.functions.invoke('send-push', {
            body: { type, title, body, url: '/' }
        })
    } catch (err) {
        console.error('Error invoking send-push:', err)
    }
}
