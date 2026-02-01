"use client";

import { useEffect, useState } from "react";
import { Bell, X, ShieldCheck } from "lucide-react";
import { subscribeUser, saveSubscriptionToSupabase, checkNotificationPermission } from "@/lib/notifications";

export default function NotificationPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            const hasAsked = localStorage.getItem("notification_prompt_shown");
            const hasSeenGuide = localStorage.getItem("pwa_guide_seen");
            const permission = checkNotificationPermission();

            // Mostra il prompt solo se:
            // 1. Non l'abbiamo mai mostrato prima
            // 2. Il permesso è ancora 'default'
            // 3. L'utente ha già chiuso o confermato la guida all'installazione
            if (!hasAsked && permission === "default" && hasSeenGuide) {
                setShowPrompt(true);
            }
        };

        // Controlla ogni secondo se la guida è stata chiusa
        const interval = setInterval(checkVisibility, 2000);

        // Esegui anche un check immediato
        checkVisibility();

        return () => clearInterval(interval);
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-sm animate-in zoom-in-95 duration-300">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-[32px] shadow-2xl overflow-hidden relative border border-stone-100 dark:border-stone-800">
                    {/* Header con icona */}
                    <div className="bg-gradient-to-br from-calitri-azzurro to-blue-600 p-8 text-white relative">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 shadow-xl">
                                <Bell size={40} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black mb-1 leading-tight">Resta Aggiornato</h3>
                            <p className="text-sm text-white/80 font-medium">
                                Non perdere notizie e avvisi importanti
                            </p>
                        </div>
                    </div>

                    {/* Contenuto */}
                    <div className="p-8">
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-calitri-azzurro/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={14} className="text-calitri-azzurro" />
                                </div>
                                <p className="text-sm text-stone-600 dark:text-stone-300 font-medium">
                                    Riceverai solo comunicazioni utili e avvisi meteo urgenti.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-calitri-azzurro/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={14} className="text-calitri-azzurro" />
                                </div>
                                <p className="text-sm text-stone-600 dark:text-stone-300 font-medium">
                                    Puoi disattivarle in ogni momento dalle impostazioni.
                                </p>
                            </div>
                        </div>

                        {/* Pulsanti */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAllow}
                                disabled={isRequesting}
                                className="w-full py-4 rounded-2xl bg-calitri-azzurro text-white font-black shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isRequesting ? "ATTIVAZIONE..." : "ATTIVA ORA"}
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="w-full py-2 text-stone-400 dark:text-stone-500 text-xs font-bold uppercase tracking-widest hover:text-stone-600 transition-colors"
                            >
                                Forse più tardi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
