import { supabase } from './supabase'
import { cache } from 'react'
import { expandRecurringEvents } from './events'

/**
 * Tutte le funzioni API per recuperare dati da Supabase.
 * Queste funzioni sostituiscono l'importazione diretta da mocks.js.
 */

export const getAlerts = cache(async () => {
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
})

export const getPastAlerts = cache(async () => {
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
})

export const getEvents = cache(async () => {
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

    // Rimapaggio coordinate per compatibilità col frontend
    return allEvents.map(e => ({
        ...e,
        coordinates: { lat: e.coordinates_lat, lng: e.coordinates_lng }
    }))
})

export const getNews = cache(async () => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })

    if (error) {
        console.error('Error fetching news:', error)
        return []
    }
    return data
})

export const getServices = cache(async () => {
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
})

export const getPointsOfInterest = cache(async () => {
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
})

export const getRestaurants = cache(async () => {
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
})

export const getAccommodations = cache(async () => {
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
})

export const getMarketItems = cache(async () => {
    const { data, error } = await supabase
        .from('market_items')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching market items:', error)
        return []
    }
    return data
})
