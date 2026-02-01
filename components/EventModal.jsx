"use client";

import { X, Calendar, Clock, MapPin, Repeat, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function EventModal({ event, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Blocca lo scroll del body quando il modal è aperto
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Aspetta l'animazione di uscita
    };

    if (!event) return null;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handleShare = async () => {
        const shareData = {
            title: event.title,
            text: `Partecipa a "${event.title}" a Calitri!`,
            url: window.location.href, // Or construct a specific event URL if available
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
                alert("Link copiato negli appunti!");
            } catch (err) {
                console.error('Failed to copy code: ', err);
            }
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'}`}
            onClick={handleClose}
        >
            <div
                className={`
                    bg-white dark:bg-[#1a1a1a] w-full md:max-w-lg rounded-3xl overflow-hidden shadow-2xl 
                    transform transition-all duration-300 relative max-h-[85vh] flex flex-col
                    ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full md:translate-y-10 opacity-0 scale-95'}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Actions */}
                <div className="flex justify-between items-center p-6 pb-2">
                    <span className="px-3 py-1 bg-calitri-dark/10 dark:bg-stone-800 text-calitri-dark dark:text-stone-300 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {event.category}
                    </span>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-stone-500" />
                    </button>
                </div>

                {/* Content Scrollable */}
                <div className="p-6 pt-2 overflow-y-auto">
                    <h2 className="text-2xl md:text-3xl font-black text-calitri-dark dark:text-white leading-tight mb-6">
                        {event.title}
                    </h2>

                    {/* Info Grid */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                            <div className="p-2 bg-white dark:bg-stone-800 rounded-xl shadow-sm">
                                <Calendar className="w-5 h-5 text-calitri-terra" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">Data</p>
                                <p className="text-stone-800 dark:text-stone-200 font-bold capitalize">{formatDate(event.date)}</p>
                                {event.recurring && (
                                    <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-calitri-green">
                                        <Repeat className="w-3 h-3" />
                                        <span>Evento ricorrente ({event.recurring_pattern || 'annuale'})</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                            <div className="p-2 bg-white dark:bg-stone-800 rounded-xl shadow-sm">
                                <Clock className="w-5 h-5 text-calitri-terra" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">Orario</p>
                                <p className="text-stone-800 dark:text-stone-200 font-bold">{event.time}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                            <div className="p-2 bg-white dark:bg-stone-800 rounded-xl shadow-sm">
                                <MapPin className="w-5 h-5 text-calitri-terra" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0.5">Luogo</p>
                                <p className="text-stone-800 dark:text-stone-200 font-bold">{event.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-3">Dettagli Evento</h3>
                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm whitespace-pre-line">
                            {event.description || "Nessuna descrizione disponibile."}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-[#1a1a1a]">
                    <button
                        onClick={handleShare}
                        className="w-full py-3.5 bg-calitri-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-calitri-dark/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Share2 className="w-4 h-4" />
                        Condividi Evento
                    </button>
                </div>
            </div>
        </div>
    );
}
