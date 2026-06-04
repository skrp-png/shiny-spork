"use client";

import { useState } from "react";
import { X, Calendar, MapPin, Mail, FileText, Send, CalendarPlus } from "lucide-react";

export default function SuggestEventModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        contact: "",
        description: ""
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validate = () => {
        const tempErrors = {};
        if (!formData.title.trim()) tempErrors.title = "Il titolo è obbligatorio";
        if (!formData.date) tempErrors.date = "La data è obbligatoria";
        if (!formData.location.trim()) tempErrors.location = "Il luogo è obbligatorio";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const subject = encodeURIComponent("Segnalazione Nuovo Evento - Buongiorno Calitri");
        const body = encodeURIComponent(
            `Ciao redazione di Buongiorno Calitri,\n\n` +
            `Vorrei segnalare il seguente evento da aggiungere in app:\n\n` +
            `- Titolo: ${formData.title}\n` +
            `- Data: ${formData.date}\n` +
            `- Luogo: ${formData.location}\n` +
            `- Contatto di riferimento: ${formData.contact || 'Non specificato'}\n\n` +
            `Descrizione:\n${formData.description || 'Nessuna descrizione aggiuntiva.'}\n\n` +
            `Grazie!`
        );

        window.location.href = `mailto:info@buongiornocalitri.it?subject=${subject}&body=${body}`;
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1b1b1b] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-stone-150 dark:border-stone-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <CalendarPlus className="text-calitri-terra w-5 h-5" />
                        <h3 className="text-lg font-black text-calitri-dark dark:text-white uppercase tracking-wider">
                            Segnala Evento
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-750 rounded-full text-stone-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
                        Inserisci i dettagli dell'evento. Cliccando su "Invia Segnalazione" si aprirà il tuo client email per confermare l'invio della proposta a info@buongiornocalitri.it.
                    </p>

                    {/* Titolo */}
                    <div>
                        <label className="block text-xs font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                            Titolo Evento *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 dark:text-stone-500">
                                <FileText size={16} />
                            </span>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Esempio: Concerto in Piazza"
                                className={`w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-900 border ${
                                    errors.title ? "border-red-500" : "border-stone-205 dark:border-stone-800"
                                } rounded-2xl text-sm focus:outline-none focus:border-calitri-terra focus:ring-2 focus:ring-calitri-terra/10 dark:text-white transition-all`}
                            />
                        </div>
                        {errors.title && (
                            <span className="text-xs text-red-500 font-bold mt-1 block">{errors.title}</span>
                        )}
                    </div>

                    {/* Data */}
                    <div>
                        <label className="block text-xs font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                            Data Evento *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 dark:text-stone-500">
                                <Calendar size={16} />
                            </span>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-900 border ${
                                    errors.date ? "border-red-500" : "border-stone-205 dark:border-stone-800"
                                } rounded-2xl text-sm focus:outline-none focus:border-calitri-terra focus:ring-2 focus:ring-calitri-terra/10 dark:text-white transition-all`}
                            />
                        </div>
                        {errors.date && (
                            <span className="text-xs text-red-500 font-bold mt-1 block">{errors.date}</span>
                        )}
                    </div>

                    {/* Luogo */}
                    <div>
                        <label className="block text-xs font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                            Luogo *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 dark:text-stone-500">
                                <MapPin size={16} />
                            </span>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Esempio: Centro Storico, Calitri"
                                className={`w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-900 border ${
                                    errors.location ? "border-red-500" : "border-stone-205 dark:border-stone-800"
                                } rounded-2xl text-sm focus:outline-none focus:border-calitri-terra focus:ring-2 focus:ring-calitri-terra/10 dark:text-white transition-all`}
                            />
                        </div>
                        {errors.location && (
                            <span className="text-xs text-red-500 font-bold mt-1 block">{errors.location}</span>
                        )}
                    </div>

                    {/* Contatto */}
                    <div>
                        <label className="block text-xs font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                            Tuo Contatto (Email / Telefono)
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 dark:text-stone-500">
                                <Mail size={16} />
                            </span>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Esempio: nome@email.it o 333123456"
                                className="w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-205 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:border-calitri-terra focus:ring-2 focus:ring-calitri-terra/10 dark:text-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Descrizione */}
                    <div>
                        <label className="block text-xs font-black text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                            Descrizione Evento
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Inserisci dettagli utili (orario, link, organizzatori...)"
                            rows={3}
                            className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-205 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:border-calitri-terra focus:ring-2 focus:ring-calitri-terra/10 dark:text-white transition-all resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 py-4 bg-calitri-terra hover:bg-calitri-terra/90 text-white rounded-2xl font-black shadow-lg shadow-calitri-terra/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Send size={18} />
                        INVIA SEGNALAZIONE
                    </button>
                </form>
            </div>
        </div>
    );
}
