"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            // Non registrare il Service Worker in sviluppo locale per evitare problemi con la cache dei fogli di stile
            if (
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1" ||
                window.location.hostname.startsWith("192.168.")
            ) {
                // Rimuovi eventuali service worker registrati in precedenza su localhost
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                    for (let registration of registrations) {
                        registration.unregister();
                    }
                });
                return;
            }

            navigator.serviceWorker
                .register("/sw.js")
                .catch((error) => {
                    console.error("Registrazione Service Worker fallita:", error);
                });
        }
    }, []);

    return null;
}
