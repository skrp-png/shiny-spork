/* eslint-disable no-undef */
// Bump the version whenever the caching logic changes: old caches are deleted on activate.
const CACHE_NAME = 'buongiorno-calitri-v2';
const OFFLINE_URL = '/offline';
const ASSETS_TO_CACHE = [
    '/',
    OFFLINE_URL,
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

/**
 * Decides how a request is handled:
 * - "bypass": not handled by the SW (other origins, non-GET, Next.js RSC data requests)
 * - "cache-first": immutable assets (hashed /_next/static files, icons, images)
 * - "network-first": pages and everything else; the cache is only an offline fallback,
 *   so users always see the latest content and the latest deploy when online.
 */
function getCacheStrategy(request, origin) {
    if (request.method !== 'GET') return 'bypass';
    let url;
    try {
        url = new URL(request.url);
    } catch (e) {
        return 'bypass';
    }
    if (url.origin !== origin) return 'bypass';
    // React Server Components payloads: always fresh, never cached
    if (url.searchParams.has('_rsc') || request.headers.get('RSC') === '1') return 'bypass';
    if (url.pathname.startsWith('/_next/static/')) return 'cache-first';
    if (/\.(png|jpg|jpeg|svg|ico|webp|avif|woff2?)$/i.test(url.pathname)) return 'cache-first';
    return 'network-first';
}

function isPageRequest(request) {
    return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
}

async function putInCache(request, response) {
    if (response && response.status === 200 && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
    }
    return response;
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        await putInCache(request, response);
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (isPageRequest(request)) return caches.match(OFFLINE_URL);
        throw err;
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    return putInCache(request, response);
}

self.addEventListener('fetch', (event) => {
    const strategy = getCacheStrategy(event.request, self.location.origin);
    if (strategy === 'bypass') return;
    event.respondWith(strategy === 'cache-first' ? cacheFirst(event.request) : networkFirst(event.request));
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

    // Open only pages of this app, never external links received in a push
    let urlToOpen = new URL('/', self.location.origin).href;
    try {
        const target = new URL(event.notification.data?.url || '/', self.location.origin);
        if (target.origin === self.location.origin) urlToOpen = target.href;
    } catch (e) { /* invalid URL: keep home */ }

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
