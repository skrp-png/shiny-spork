"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { subscribeUser, saveSubscriptionToSupabase, checkNotificationPermission } from "@/lib/notifications";

export default function NotificationPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        // Controlla se abbiamo già chiesto il permesso
        const hasAsked = localStorage.getItem("notification_prompt_shown");
        const permission = checkNotificationPermission();

        // Mostra il prompt solo se:
        // 1. Non l'abbiamo mai mostrato prima
        // 2. Il permesso non è stato né concesso né negato
        // 3. Le notifiche sono supportate
        if (!hasAsked && permission === "default") {
            // Aspetta 3 secondi prima di mostrare il prompt (per non essere troppo invadenti)
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAllow = async () => {
        setIsRequesting(true);

        try {
            // Richiedi il permesso
            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                // Sottoscrivi l'utente alle notifiche
                const subscription = await subscribeUser();

                if (subscription) {
                    // Salva la sottoscrizione su Supabase con tutte le preferenze attive di default
                    const defaultPrefs = {
                        weather: true,
                        alerts: true,
                        events: true,
                        news: true
                    };

                    await saveSubscriptionToSupabase(subscription, defaultPrefs);

                    // Salva le preferenze in localStorage
                    localStorage.setItem("notification_prefs", JSON.stringify(defaultPrefs));
                }
            }

            // Segna che abbiamo chiesto il permesso
            localStorage.setItem("notification_prompt_shown", "true");
            setShowPrompt(false);
        } catch (error) {
            console.error("Errore durante la richiesta del permesso:", error);
            localStorage.setItem("notification_prompt_shown", "true");
            setShowPrompt(false);
        } finally {
            setIsRequesting(false);
        }
    };

    const handleDismiss = () => {
        localStorage.setItem("notification_prompt_shown", "true");
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
            <div className="w-full max-w-md pointer-events-auto animate-slideUp">
                <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                    {/* Header con icona */}
                    <div className="bg-gradient-to-br from-calitri-azzurro to-blue-600 p-6 text-white relative">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Bell size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Resta Aggiornato!</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Ricevi notifiche in tempo reale
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenuto */}
                    <div className="p-6">
                        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
                            Attiva le notifiche per ricevere:
                        </p>

                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-calitri-azzurro"></span>
                                <span>⚠️ <strong>Avvisi urgenti</strong> dalla community</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-calitri-green"></span>
                                <span>📅 <strong>Eventi</strong> e appuntamenti</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-calitri-terra"></span>
                                <span>📰 <strong>News</strong> e aggiornamenti</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-calitri-azzurro"></span>
                                <span>🌤️ <strong>Meteo</strong> di domani ogni sera</span>
                            </li>
                        </ul>

                        {/* Pulsanti */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleDismiss}
                                className="flex-1 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                            >
                                Non ora
                            </button>
                            <button
                                onClick={handleAllow}
                                disabled={isRequesting}
                                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-calitri-azzurro to-blue-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRequesting ? "Attivazione..." : "Attiva"}
                            </button>
                        </div>

                        <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center mt-3">
                            Puoi modificare le tue preferenze in qualsiasi momento dalle Impostazioni
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
