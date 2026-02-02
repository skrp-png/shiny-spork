import { supabase } from './supabase';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// Funzione per convertire la chiave VAPID in Uint8Array (richiesto dal browser)
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function subscribeUser() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return null;
    }

    if (!VAPID_PUBLIC_KEY) {
        console.error('Chiave VAPID pubblica mancante.');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready;

        // Verifica se esiste già una sottoscrizione
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
        }

        return subscription.toJSON();
    } catch (err) {
        console.error('Errore sottoscrizione:', err);
        return null;
    }
}

export function checkNotificationPermission() {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
}

export async function saveSubscriptionToSupabase(subscription, preferences) {
    const { data, error } = await supabase.functions.invoke('save-subscription', {
        body: {
            token: subscription.endpoint,
            auth_key: subscription.keys.auth,
            p256dh_key: subscription.keys.p256dh,
            preferences: preferences
        }
    });

    if (error) {
        console.error('Errore salvataggio sottoscrizione:', error);
        throw error;
    }

    return data;
}
