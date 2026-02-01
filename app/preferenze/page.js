"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import SimpleHeader from "@/components/SimpleHeader";
import { Moon, Sun, Smartphone, Bell, Trash2, Info, ChevronRight, Shield, FileText, CalendarDays, Newspaper, AlertCircle, Mail, MessageSquare, Heart } from "lucide-react";
import { subscribeUser, saveSubscriptionToSupabase, checkNotificationPermission } from "@/lib/notifications";
import InstallGuide from "@/components/InstallGuide";

export default function PreferenzePage() {
    const { theme, setTheme, mounted } = useTheme();
    // Ensure we are mounted so we can access theme safely without hydration mismatch
    const [isMounted, setIsMounted] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState("default");
    const [isStandalone, setIsStandalone] = useState(false);
    const [prefs, setPrefs] = useState({
        weather: true,
        alerts: true,
        events: true,
        news: true
    });

    useEffect(() => {
        setIsMounted(true);
        setPermissionStatus(checkNotificationPermission());

        // Rileva se l'app è in modalità standalone (PWA installata)
        const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        setIsStandalone(isPWA);

        const savedPrefs = localStorage.getItem("notification_prefs");
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }
    }, []);

    const togglePref = async (key) => {
        const newPrefs = { ...prefs, [key]: !prefs[key] };
        setPrefs(newPrefs);
        localStorage.setItem("notification_prefs", JSON.stringify(newPrefs));

        // Se attiviamo una notifica e non abbiamo ancora il token, iscriviamoci
        try {
            const subscription = await subscribeUser();
            if (subscription) {
                await saveSubscriptionToSupabase(subscription, newPrefs);
                setPermissionStatus("granted");
            } else {
                setPermissionStatus(checkNotificationPermission());
            }
        } catch (err) {
            console.error("Errore durante la sincronizzazione notifiche:", err);
            setPermissionStatus(checkNotificationPermission());
        }
    };

    const clearCache = () => {
        if (confirm("Sei sicuro di voler svuotare la cache e i dati locali?")) {
            localStorage.clear();
            alert("Cache svuotata con successo.");
            window.location.reload();
        }
    };

    const [showInstallGuide, setShowInstallGuide] = useState(false);

    if (!isMounted) return null;

    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:md:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Impostazioni" />

            <InstallGuide forceOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} />

            <div className="p-5 space-y-6">

                {/* Aspetto */}
                <section>
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 ml-1">Aspetto</h2>
                    <div className="bg-white dark:bg-[#222222] rounded-2xl p-4 shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-calitri-azzurro/10 flex items-center justify-center text-calitri-azzurro">
                                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Tema dell'app</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Scegli la modalità che preferisci</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 bg-stone-100 dark:bg-[#333333] p-1 rounded-xl">
                            <button
                                onClick={() => setTheme('light')}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${theme === 'light'
                                    ? 'bg-white dark:bg-[#444444] text-calitri-dark shadow-sm'
                                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                                    }`}
                            >
                                Chiaro
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${theme === 'dark'
                                    ? 'bg-white dark:bg-[#444444] text-calitri-dark dark:text-white shadow-sm'
                                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                                    }`}
                            >
                                Scuro
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${theme === 'system'
                                    ? 'bg-white dark:bg-[#444444] text-calitri-dark dark:text-white shadow-sm'
                                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                                    }`}
                            >
                                <Smartphone size={14} />
                                Auto
                            </button>
                        </div>
                    </div>
                </section>

                {/* Notifiche */}
                <section>
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 ml-1">Notifiche Personalizzate</h2>
                    <div className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">

                        {/* Meteo */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-calitri-azzurro/10 flex items-center justify-center text-calitri-azzurro">
                                    <Sun size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Meteo domani</h3>
                                    <p className="text-[10px] text-stone-500 dark:text-stone-400">Previsioni ogni sera per il giorno dopo</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePref('weather')}
                                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${prefs.weather ? 'bg-calitri-green' : 'bg-stone-200 dark:bg-stone-600'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.weather ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Avvisi */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                    <Bell size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Nuovi Avvisi</h3>
                                    <p className="text-[10px] text-stone-500 dark:text-stone-400">Allerta meteo e comunicazioni urgenti</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePref('alerts')}
                                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${prefs.alerts ? 'bg-calitri-green' : 'bg-stone-200 dark:bg-stone-600'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.alerts ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Eventi */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-calitri-green/10 flex items-center justify-center text-calitri-green">
                                    <CalendarDays size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Eventi del giorno</h3>
                                    <p className="text-[10px] text-stone-500 dark:text-stone-400">Ricevi il programma ogni mattina</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePref('events')}
                                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${prefs.events ? 'bg-calitri-green' : 'bg-stone-200 dark:bg-stone-600'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.events ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* News */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-calitri-terra/10 flex items-center justify-center text-calitri-terra">
                                    <Newspaper size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">News & Storie</h3>
                                    <p className="text-[10px] text-stone-500 dark:text-stone-400">Notifiche per nuovi articoli pubblicati</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePref('news')}
                                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${prefs.news ? 'bg-calitri-green' : 'bg-stone-200 dark:bg-stone-600'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.news ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                    </div>

                    {permissionStatus === 'denied' && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-red-800 dark:text-red-400">Notifiche Disattivate</h4>
                                    <p className="text-xs text-red-700 dark:text-red-500/90 mt-1 leading-relaxed">
                                        {isStandalone ? (
                                            <>
                                                Per riattivare le notifiche, vai nelle <strong>Impostazioni</strong> del tuo telefono, cerca <strong>"Buongiorno Calitri"</strong> nella lista delle App e attiva i permessi per le notifiche.
                                            </>
                                        ) : (
                                            <>
                                                Hai bloccato le notifiche. Per riceverle, clicca sull'icona delle <strong>impostazioni del sito</strong> (accanto all'indirizzo URL) e riattiva i permessi.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <p className="mt-3 px-1 text-[10px] text-stone-400 dark:text-stone-500 italic">
                        Le notifiche vengono inviate direttamente sul tuo dispositivo. Assicurati di aver dato il permesso al browser.
                    </p>
                </section>

                {/* Dati */}
                <section>
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 ml-1">Dati e Privacy</h2>
                    <div className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
                        <button
                            onClick={clearCache}
                            className="w-full p-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left"
                        >
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                <Trash2 size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Svuota Cache</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Elimina i dati salvati in locale</p>
                            </div>
                            <ChevronRight size={18} className="text-stone-400" />
                        </button>

                        <Link href="/privacy" className="p-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-stone-500/10 flex items-center justify-center text-stone-600 dark:text-stone-400">
                                <Shield size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Privacy Policy</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Leggi l'informativa</p>
                            </div>
                            <ChevronRight size={18} className="text-stone-400" />
                        </Link>

                        <Link href="/termini" className="p-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-stone-500/10 flex items-center justify-center text-stone-600 dark:text-stone-400">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Termini di Servizio</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Condizioni d'uso</p>
                            </div>
                            <ChevronRight size={18} className="text-stone-400" />
                        </Link>
                    </div>
                </section>

                {/* Supporto */}
                <section>
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 ml-1">Supporto</h2>
                    <div className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
                        <a
                            href="mailto:info@buongiornocalitri.it?subject=Feedback App Buongiorno Calitri"
                            className="w-full p-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <MessageSquare size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Invia Feedback</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Segnala bug o suggerimenti</p>
                            </div>
                            <ChevronRight size={18} className="text-stone-400" />
                        </a>
                    </div>
                </section>

                {/* Info App */}
                <section>
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 ml-1">Info App</h2>
                    <div className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
                        <button
                            onClick={() => setShowInstallGuide(true)}
                            className="w-full p-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left"
                        >
                            <div className="w-10 h-10 rounded-full bg-calitri-terra/10 flex items-center justify-center text-calitri-terra">
                                <Smartphone size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Installa l'App</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Aggiungi Buongiorno Calitri alla Home</p>
                            </div>
                            <ChevronRight size={18} className="text-stone-400" />
                        </button>

                        <Link href="/crediti" className="w-full p-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer border-t border-stone-100 dark:border-stone-800">
                            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                                <Heart size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-stone-800 dark:text-stone-100">Crediti</h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Riconoscimenti e Open Source</p>
                            </div>
                            <ChevronRight size={18} className="text-stone-400" />
                        </Link>
                    </div>
                </section>

                <div className="pt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-xs font-medium">
                        <Info size={12} />
                        <span>Versione 0.1.0 (Beta)</span>
                    </div>
                    <p className="mt-2 text-[10px] text-stone-400">Made with ❤️ for Calitri</p>
                </div>

            </div>
        </main>
    );
}
