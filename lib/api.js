import { supabase } from './supabase'

/**
 * Tutte le funzioni API per recuperare dati da Supabase.
 * Queste funzioni sostituiscono l'importazione diretta da mocks.js.
 */

export async function getAlerts() {
    const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('is_past', false)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching alerts:', error)
        return []
    }
    return data
}

export async function getPastAlerts() {
    const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('is_past', true)
        .order('date', { ascending: false })

    if (error) {
        console.error('Error fetching past alerts:', error)
        return []
    }
    return data
}

export async function getEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
    // Rimuoviamo il filtro order qui per farlo dopo l'espansione

    if (error) {
        console.error('Error fetching events:', error)
        return []
    }

    // Espandi gli eventi ricorrenti
    const allEvents = expandRecurringEvents(data);

    // Ordina per data
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(`DEBUG getEvents: Returning ${allEvents.length} total events after expansion.`);

    // Rimapaggio coordinate per compatibilità col frontend
    return allEvents.map(e => ({
        ...e,
        coordinates: { lat: e.coordinates_lat, lng: e.coordinates_lng }
    }))
}

// Funzione helper per generare le ricorrenze
function expandRecurringEvents(events) {
    const expandedEvents = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generiamo eventi fino a 5 anni nel futuro
    const limitDate = new Date();
    limitDate.setFullYear(today.getFullYear() + 5);

    console.log(`DEBUG expandRecurringEvents: Processing ${events.length} source events.`);

    events.forEach(event => {
        // Aggiungi sempre l'evento originale
        expandedEvents.push(event);

        if (event.recurring && event.recurring_pattern) {
            const eventDate = new Date(event.date);
            let nextDate = new Date(eventDate);

            // Evitiamo loop infiniti se la data è invalida
            if (isNaN(nextDate.getTime())) return;

            // Avanza fino a superare oggi (per trovare la PROSSIMA occorrenza utile)
            // O continua a generare finché non raggiungiamo il limite

            // Logica semplice: Genera tutte le occorrenze tra la data originale e limitDate
            // Se l'evento originale è nel 2023 e siamo nel 2025, genererà 2024 e 2025.

            while (true) {
                // Incrementa la data in base al pattern
                switch (event.recurring_pattern.toLowerCase()) {
                    case 'daily':
                        nextDate.setDate(nextDate.getDate() + 1);
                        break;
                    case 'weekly':
                        nextDate.setDate(nextDate.getDate() + 7);
                        break;
                    case 'monthly':
                        nextDate.setMonth(nextDate.getMonth() + 1);
                        break;
                    case 'yearly':
                        nextDate.setFullYear(nextDate.getFullYear() + 1);
                        break;
                    default:
                        return; // Pattern sconosciuto, esci dal while
                }

                // Se abbiamo superato il limite di tempo, fermati
                if (nextDate > limitDate) break;

                // Crea la nuova istanza
                // Generiamo un ID univoco basato sull'originale + data
                // Formato data YYYY-MM-DD per coerenza
                const dateStr = nextDate.toISOString().split('T')[0];

                expandedEvents.push({
                    ...event,
                    id: `${event.id}_${dateStr}`, // ID univoco per React key
                    date: dateStr,
                    is_generated: true // Flag utile per debugging o UI
                });
            }
        }
    });

    return expandedEvents;
}

export async function getNews() {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }
    return data
}

export async function getServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching services:', error)
        return []
    }

    return data.map(s => ({
        ...s,
        coordinates: { lat: s.coordinates_lat, lng: s.coordinates_lng }
    }))
}

export async function getPointsOfInterest() {
    const { data, error } = await supabase
        .from('points_of_interest')
        .select('*')

    if (error) {
        console.error('Error fetching POIs:', error)
        return []
    }

    return data.map(p => ({
        ...p,
        coordinates: { lat: p.coordinates_lat, lng: p.coordinates_lng }
    }))
}

export async function getRestaurants() {
    const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('rating', { ascending: false })

    if (error) {
        console.error('Error fetching restaurants:', error)
        return []
    }

    return data.map(r => ({
        ...r,
        priceRange: r.price_range,
        coordinates: { lat: r.coordinates_lat, lng: r.coordinates_lng }
    }))
}

export async function getAccommodations() {
    const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('rating', { ascending: false })

    if (error) {
        console.error('Error fetching accommodations:', error)
        return []
    }

    return data.map(a => ({
        ...a,
        priceRange: a.price_range,
        coordinates: { lat: a.coordinates_lat, lng: a.coordinates_lng }
    }))
}

export async function getMarketItems() {
    const { data, error } = await supabase
        .from('market_items')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching market items:', error)
        return []
    }
    return data
}
