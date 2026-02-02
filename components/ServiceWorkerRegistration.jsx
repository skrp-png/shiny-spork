"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .catch((error) => {
                    console.error("Registrazione Service Worker fallita:", error);
                });
        }
    }, []);

    return null;
}
