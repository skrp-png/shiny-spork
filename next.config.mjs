/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ottimizzazione immagini
  // Nessun host remoto consentito: l'app usa <img> semplici. Un wildcard ('**') renderebbe
  // /_next/image un proxy aperto per qualsiasi immagine, a spese del nostro account Vercel.
  // Se in futuro si usa next/image con immagini esterne, aggiungere qui gli host specifici.
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },

  // Headers di sicurezza
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          }
        ],
      },
      // Headers specifici per Service Worker
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      // Headers per manifest
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },

  // Configurazione PWA
  reactStrictMode: true,
};

export default nextConfig;
