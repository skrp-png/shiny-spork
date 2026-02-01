import { createClient } from '@supabase/supabase-js';
import { alerts, pastAlerts } from '../data/alerts.js';

const supabaseUrl = 'https://vucbzkfpvemrstvakqzn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1Y2J6a2ZwdmVtcnN0dmFrcXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDY5MzMsImV4cCI6MjA4NTAyMjkzM30.yDP5bSN0BWZFkoegKZWNuKsm1zNIBk5EG8YJ_LAy_EA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
import {
    marketItems,
    events,
    news,
    services,
    pointsOfInterest,
    restaurants,
    accommodations,
    wasteCollection
} from '../data/mocks.js';

async function migrate() {
    console.log('--- Inizio Migrazione ---');

    // 1. Alerts
    console.log('Migrazione alerts...');
    const allAlerts = [...alerts, ...pastAlerts];
    if (allAlerts.length > 0) {
        const { error } = await supabase.from('alerts').upsert(
            allAlerts.map(a => ({
                id: a.id,
                message: a.message,
                level: a.level,
                date: a.date || new Date().toISOString().split('T')[0],
                is_past: pastAlerts.some(p => p.id === a.id)
            }))
        );
        if (error) console.error('Errore alerts:', error);
    }

    // 2. Events
    console.log('Migrazione events...');
    if (events.length > 0) {
        const { error } = await supabase.from('events').upsert(
            events.map(e => ({
                id: e.id,
                title: e.title,
                date: e.date,
                time: e.time,
                location: e.location,
                description: e.description,
                category: e.category,
                recurring: e.recurring,
                recurring_pattern: e.recurringPattern,
                coordinates_lat: e.coordinates?.lat,
                coordinates_lng: e.coordinates?.lng
            }))
        );
        if (error) console.error('Errore events:', error);
    }

    // 3. News
    console.log('Migrazione news...');
    if (news.length > 0) {
        const { error } = await supabase.from('news').upsert(
            news.map(n => ({
                id: n.id,
                title: n.title,
                excerpt: n.excerpt,
                content: n.content,
                image: n.image,
                date: n.date,
                category: n.category,
                author: n.author
            }))
        );
        if (error) console.error('Errore news:', error);
    }

    // 4. Services
    console.log('Migrazione services...');
    if (services.length > 0) {
        const { error } = await supabase.from('services').upsert(
            services.map(s => ({
                id: s.id,
                name: s.name,
                category: s.category,
                address: s.address,
                phone: s.phone,
                hours: s.hours,
                emergency: s.emergency || false,
                coordinates_lat: s.coordinates?.lat,
                coordinates_lng: s.coordinates?.lng
            }))
        );
        if (error) console.error('Errore services:', error);
    }

    // 5. Points of Interest
    console.log('Migrazione points_of_interest...');
    if (pointsOfInterest.length > 0) {
        const { error } = await supabase.from('points_of_interest').upsert(
            pointsOfInterest.map(p => ({
                id: p.id,
                name: p.name,
                category: p.category,
                description: p.description,
                image: p.image,
                coordinates_lat: p.coordinates?.lat,
                coordinates_lng: p.coordinates?.lng
            }))
        );
        if (error) console.error('Errore points_of_interest:', error);
    }

    // 6. Restaurants
    console.log('Migrazione restaurants...');
    if (restaurants.length > 0) {
        const { error } = await supabase.from('restaurants').upsert(
            restaurants.map(r => ({
                id: r.id,
                name: r.name,
                category: r.category,
                cuisine: r.cuisine,
                description: r.description,
                image: r.image,
                address: r.address,
                phone: r.phone,
                price_range: r.priceRange,
                hours: r.hours,
                specialties: r.specialties,
                rating: r.rating,
                website: r.website,
                coordinates_lat: r.coordinates?.lat,
                coordinates_lng: r.coordinates?.lng
            }))
        );
        if (error) console.error('Errore restaurants:', error);
    }

    // 7. Accommodations
    console.log('Migrazione accommodations...');
    if (accommodations.length > 0) {
        const { error } = await supabase.from('accommodations').upsert(
            accommodations.map(a => ({
                id: a.id,
                name: a.name,
                category: a.category,
                stars: a.stars,
                description: a.description,
                image: a.image,
                address: a.address,
                phone: a.phone,
                price_range: a.priceRange,
                amenities: a.amenities,
                rating: a.rating,
                website: a.website,
                coordinates_lat: a.coordinates?.lat,
                coordinates_lng: a.coordinates?.lng
            }))
        );
        if (error) console.error('Errore accommodations:', error);
    }

    // 8. Market Items
    console.log('Migrazione market_items...');
    if (marketItems.length > 0) {
        const { error } = await supabase.from('market_items').upsert(
            marketItems.map(m => ({
                id: m.id,
                title: m.title,
                price: m.price,
                category: m.category,
                image: m.image,
                seller_phone: m.seller_phone
            }))
        );
        if (error) console.error('Errore market_items:', error);
    }

    console.log('--- Migrazione Completata ---');
}

migrate();
