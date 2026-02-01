"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Check } from "lucide-react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: true
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

        if (!consent && !isBot) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const savePreferences = (authValues) => {
        let finalConsent = "denied";

        if (typeof authValues === "string") {
            finalConsent = authValues;
        } else {
            finalConsent = preferences.analytics ? "granted" : "denied";
        }

        localStorage.setItem("cookie_consent", finalConsent);
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie_consent_updated"));
    };

    const toggleAnalytics = () => {
        setPreferences(prev => ({ ...prev, analytics: !prev.analytics }));
    };

    if (!isVisible) return null;

    if (showCustomize) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-slideUp">
                <div className="max-w-xl mx-auto bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                            <Cookie size={20} className="text-calitri-terra" /> Personalizza Preferenze
                        </h3>
                        <button onClick={() => setShowCustomize(false)} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full">
                            <X size={20} className="text-stone-500" />
                        </button>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
                            <div>
                                <p className="font-bold text-sm text-stone-800 dark:text-stone-200">Necessari</p>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Fondamentali per il funzionamento dell'app.</p>
                            </div>
                            <div className="px-3 py-1 bg-stone-200 dark:bg-stone-700 rounded-full text-[10px] font-bold text-stone-500 dark:text-stone-400">
                                SEMPRE ATTIVI
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
                            <div>
                                <p className="font-bold text-sm text-stone-800 dark:text-stone-200">Analytics</p>
                                <p className="text-xs text-stone-500 dark:text-stone-400">Ci aiutano a migliorare l'esperienza (anonimi).</p>
                            </div>
                            <button
                                onClick={toggleAnalytics}
                                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${preferences.analytics ? 'bg-calitri-green' : 'bg-stone-300 dark:bg-stone-600'}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => savePreferences()}
                        className="w-full py-3 bg-calitri-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-calitri-dark/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Salva Preferenze
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-slideUp">
            <div className="max-w-xl mx-auto bg-white/90 dark:bg-[#1a1a1a]/95 backdrop-blur-md rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 md:p-6 flex flex-col md:flex-row gap-5 items-center">

                <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-calitri-terra/10 rounded-2xl flex-shrink-0 text-calitri-terra">
                        <Cookie size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-900 dark:text-white mb-1">
                            Scegli tu i biscotti 🍪
                        </h3>
                        <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                            Usiamo cookie analitici (anonimi) per migliorare l'app. Puoi accettarli tutti o personalizzare la scelta.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={() => setShowCustomize(true)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors underline decoration-stone-300 underline-offset-2"
                    >
                        Personalizza
                    </button>
                    <button
                        onClick={() => savePreferences("granted")}
                        className="flex-1 md:flex-none px-6 py-2.5 bg-calitri-dark text-white rounded-xl text-xs font-bold shadow-lg shadow-calitri-dark/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={14} />
                        Accetto Tutto
                    </button>
                </div>

            </div>
        </div>
    );
}
