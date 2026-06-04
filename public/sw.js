/* eslint-disable no-undef */
const CACHE_NAME = 'buongiorno-calitri-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/offline',
    '/manifest.json',
    '/favicon.ico',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-icon.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Intercetta solo richieste GET HTTP/S ed escludi le chiamate alle Edge Functions di Supabase
    if (
        event.request.method !== 'GET' ||
        !event.request.url.startsWith('http') ||
        event.request.url.includes('/functions/v1/')
    ) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Strategia Stale-While-Revalidate per caricamento istantaneo
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse);
                        });
                    }
                }).catch(() => { });
                return cachedResponse;
            }

            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // Offline fallback per pagine HTML
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    return caches.match('/offline');
                }
            });
        })
    );
});

self.addEventListener('push', (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            data: {
                url: data.url || '/'
            },
            vibrate: [100, 50, 100],
            actions: [
                { action: 'open', title: 'Apri' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } catch (err) {
        console.error('Errore ricezione push:', err);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const urlToOpen = new URL(event.notification.data.url || '/', self.location.origin).href;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
