"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare, MoreVertical, Download, Smartphone } from "lucide-react";

export default function InstallGuide({ forceOpen = false, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const [platform, setPlatform] = useState("other"); // 'ios', 'android', 'other'

    useEffect(() => {
        // Rilevamento piattaforma
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        if (isIOS) setPlatform("ios");
        else if (isAndroid) setPlatform("android");

        // Rileva se è già installata
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        // Apri automaticamente solo se non installata e non vista prima (o se forzato)
        if (forceOpen) {
            setIsOpen(true);
        } else if (!isStandalone) {
            const hasSeen = localStorage.getItem("pwa_guide_seen");
            if (!hasSeen) {
                const timer = setTimeout(() => setIsOpen(true), 2000); // Ritardo per non spaventare subito
                return () => clearTimeout(timer);
            }
        }
    }, [forceOpen]);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("pwa_guide_seen", "true");
        if (onClose) onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500"
                >
                    <X size={18} />
                </button>

                <div className="p-8">
                    <div className="w-16 h-16 bg-calitri-terra/10 rounded-2xl flex items-center justify-center text-calitri-terra mb-6 mx-auto">
                        <Smartphone size={32} />
                    </div>

                    <h3 className="text-2xl font-black text-center text-calitri-dark dark:text-white mb-2 leading-tight">
                        Installa Buongiorno Calitri
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 text-center mb-8 font-medium">
                        Usa l'app come una vera applicazione sul tuo telefono per un'esperienza più veloce e notifiche istantanee.
                    </p>

                    <div className="space-y-6">
                        {platform === 'ios' ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                                        <Share size={20} />
                                    </div>
                                    <p className="text-sm text-stone-700 dark:text-stone-200 font-bold">
                                        1. Clicca sul tasto <span className="text-blue-600 font-black">Condividi</span> in basso su Safari
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-600 shrink-0">
                                        <PlusSquare size={20} />
                                    </div>
                                    <p className="text-sm text-stone-700 dark:text-stone-200 font-bold">
                                        2. Seleziona <span className="font-black">Aggiungi alla schermata Home</span>
                                    </p>
                                </div>
                            </div>
                        ) : platform === 'android' ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-600 shrink-0">
                                        <MoreVertical size={20} />
                                    </div>
                                    <p className="text-sm text-stone-700 dark:text-stone-200 font-bold">
                                        1. Clicca sui <span className="font-black">tre puntini</span> in alto a destra su Chrome
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 shrink-0">
                                        <Download size={20} />
                                    </div>
                                    <p className="text-sm text-stone-700 dark:text-stone-200 font-bold">
                                        2. Seleziona <span className="font-black">Installa app</span> o "Aggiungi a Home"
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl text-center">
                                <p className="text-sm text-stone-500 font-bold italic">
                                    Dispositivo non riconosciuto. Cerca "Aggiungi a Home" nelle impostazioni del tuo browser.
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleClose}
                        className="w-full mt-10 py-4 bg-calitri-dark dark:bg-calitri-terra text-white rounded-2xl font-black shadow-lg shadow-calitri-terra/20 active:scale-95 transition-all"
                    >
                        HO CAPITO
                    </button>
                </div>
            </div>
        </div>
    );
}
