"use client";

import { useEffect, useState } from "react";
import { WifiOff, Phone, RefreshCw, AlertTriangle } from "lucide-react";

export default function OfflinePage() {
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = () => {
        setIsRetrying(true);
        // Riprova a ricaricare la pagina originaria o la home
        if (navigator.onLine) {
            window.location.reload();
        } else {
            // Piccolo timeout per simulare il controllo prima di disattivare il caricamento
            setTimeout(() => {
                setIsRetrying(false);
            }, 1000);
        }
    };

    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300 flex flex-col justify-between p-6">
            {/* Header */}
            <div className="flex items-center justify-between py-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="text-calitri-terra w-6 h-6" />
                    <span className="font-black text-lg text-calitri-dark dark:text-white uppercase tracking-wider">
                        Buongiorno Calitri
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center my-8">
                <div className="w-24 h-24 bg-calitri-terra/10 rounded-full flex items-center justify-center text-calitri-terra mb-6 animate-pulse">
                    <WifiOff size={48} />
                </div>
                <h1 className="text-2xl font-black text-calitri-dark dark:text-white mb-3">
                    Sei offline
                </h1>
                <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs mb-8 leading-relaxed">
                    Sembra che tu non sia connesso a Internet. Controlla la tua connessione o riprova tra poco.
                </p>

                <button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-calitri-terra hover:bg-calitri-terra/90 text-white rounded-full font-bold shadow-lg shadow-calitri-terra/20 active:scale-95 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={18} className={isRetrying ? "animate-spin" : ""} />
                    {isRetrying ? "Verifica in corso..." : "Riprova"}
                </button>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-100 dark:border-stone-800 shadow-premium">
                <h2 className="text-sm font-black text-calitri-dark dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Phone size={16} className="text-calitri-terra" />
                    Numeri Utili ed Emergenze
                </h2>
                <div className="space-y-3">
                    <a
                        href="tel:112"
                        className="flex items-center justify-between p-3 rounded-2xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold active:scale-98 transition-all"
                    >
                        <span>Emergenze (NUE)</span>
                        <span className="text-lg">112</span>
                    </a>
                    <a
                        href="tel:+39082730101"
                        className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 text-stone-700 dark:text-stone-300 font-bold active:scale-98 transition-all"
                    >
                        <span>Comune di Calitri</span>
                        <span className="text-sm">+39 0827 30101</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
