"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleAnalytics({ gaId }) {
    const [consentGranted, setConsentGranted] = useState(false);

    useEffect(() => {
        // Funzione per controllare il consenso
        const checkConsent = () => {
            const consent = localStorage.getItem("cookie_consent");
            if (consent === "granted") {
                setConsentGranted(true);
            }
        };

        // Controllo iniziale
        checkConsent();

        // Ascolta l'evento nel caso l'utente accetti tramite il banner
        window.addEventListener("cookie_consent_updated", checkConsent);

        return () => {
            window.removeEventListener("cookie_consent_updated", checkConsent);
        };
    }, []);

    if (!gaId || !consentGranted) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gaId}', {
                            page_path: window.location.pathname,
                            anonymize_ip: true
                        });
                    `,
                }}
            />
        </>
    );
}
