"use client";

import { useState, useEffect } from "react";
import { Smartphone, Monitor, ChevronRight, X } from "lucide-react";

export default function DesktopRedirect() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if we are on desktop and not already dismissed in this session
        const checkDevice = () => {
            const isDesktop = window.innerWidth >= 768;
            const dismissed = sessionStorage.getItem("desktop_redirect_dismissed");
            setIsVisible(isDesktop && !dismissed);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem("desktop_redirect_dismissed", "true");
        setTimeout(() => setIsVisible(false), 300);
    };

    if (!isVisible) return null;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin)}`;

    return (
        <div
            className={`fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-stone-100/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl transition-all duration-500 ${isDismissed ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
            <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white dark:bg-[#222222] rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-stone-800 overflow-hidden relative">

                {/* Close button for "Continue on Desktop" */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-400 z-10"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Content */}
                <div className="p-10 md:p-16 flex flex-col justify-center order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-calitri-green/10 text-calitri-green text-xs font-bold uppercase tracking-wider mb-6">
                        <Smartphone size={14} />
                        Esperienza Mobile First
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-calitri-dark dark:text-white leading-[1.1] mb-6">
                        Buongiorno <br />
                        <span className="text-calitri-green">Calitri</span> è migliore <br />
                        su smartphone.
                    </h1>

                    <p className="text-lg text-stone-500 dark:text-stone-400 mb-8 leading-relaxed max-w-sm">
                        Scansiona il codice QR per aprire l'app sul tuo telefono e godere di tutte le funzioni mobile, come le notifiche push.
                    </p>

                    <button
                        onClick={handleDismiss}
                        className="group flex items-center gap-2 text-sm font-bold text-stone-400 hover:text-calitri-dark dark:hover:text-white transition-colors"
                    >
                        Continua sul computer
                        <Monitor size={16} />
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Side: QR Code Area */}
                <div className="bg-stone-50 dark:bg-stone-800/50 p-10 md:p-16 flex items-center justify-center order-1 md:order-2 border-b md:border-b-0 md:border-l border-stone-100 dark:border-stone-800">
                    <div className="relative group">
                        {/* Decorative background for QR */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-calitri-green to-blue-500 rounded-[2rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>

                        <div className="relative bg-white p-6 rounded-[2rem] shadow-xl border border-stone-100 scale-100 group-hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src={qrUrl}
                                alt="Scansionami"
                                className="w-48 h-48 md:w-56 md:h-56"
                            />
                            <div className="mt-4 text-center">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-2">
                                    Inquadra con la fotocamera
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
