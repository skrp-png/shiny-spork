"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("🔔 [sw-reg] Service Worker registrato:", registration.scope);
                })
                .catch((error) => {
                    console.error("🔔 [sw-reg] Registrazione fallita:", error);
                });
        }
    }, []);

    return null;
}
