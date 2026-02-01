import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

import BottomNav from "@/components/BottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import InstallGuide from "@/components/InstallGuide";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F1DE' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
  ],
};

export const metadata = {
  metadataBase: new URL('https://b-calitri.vercel.app/'),
  title: "Buongiorno Calitri",
  description: "La community App per Calitri - Meteo, Avvisi, Mercatino ed Eventi",
  manifest: "/manifest.json",

  // Meta tags base
  keywords: ['Calitri', 'Avellino', 'Irpinia', 'meteo', 'eventi', 'news', 'mercatino', 'community'],
  authors: [{ name: 'Buongiorno Calitri' }],
  creator: 'Buongiorno Calitri',
  publisher: 'Buongiorno Calitri',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://b-calitri.vercel.app/',
    siteName: 'Buongiorno Calitri',
    title: 'Buongiorno Calitri - La community App per Calitri',
    description: 'La community App per Calitri - Meteo, Avvisi, Mercatino ed Eventi',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Buongiorno Calitri Logo',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Buongiorno Calitri',
    description: 'La community App per Calitri - Meteo, Avvisi, Mercatino ed Eventi',
    images: ['/icon-512.png'],
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // App-specific
  applicationName: 'Buongiorno Calitri',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Buongiorno Calitri',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased font-sans bg-stone-50 md:bg-stone-100`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ServiceWorkerRegistration />
          <InstallGuide />
          <CookieBanner />
          {children}
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
