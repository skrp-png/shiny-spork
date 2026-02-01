"use client";

import { useState, useEffect } from "react";
import { getServices } from "@/lib/api";
import { wasteCollection } from "@/data/mocks";
import { Phone, MapPin, Clock, AlertCircle, Building2, Heart, Shield, Package, BookOpen, Trash2 } from "lucide-react";

export default function ServicesWidget() {
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tutti");

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getServices();
            setServices(data);
        };
        fetchServices();
    }, []);

    const categories = [
        { name: "Tutti", icon: Building2 },
        { name: "Emergenze", icon: AlertCircle },
        { name: "Salute", icon: Heart },
        { name: "Servizi", icon: Package },
        { name: "Cultura", icon: BookOpen }
    ];

    const filteredServices = selectedCategory === "Tutti"
        ? services
        : services.filter(service => service.category === selectedCategory);

    const weekDays = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    const [selectedWasteDay, setSelectedWasteDay] = useState(() => {
        const d = new Date().toLocaleDateString('it-IT', { weekday: 'long' });
        return d.charAt(0).toUpperCase() + d.slice(1);
    });

    const getCategoryIcon = (category) => {
        switch (category) {
            case "Emergenze": return Shield;
            case "Salute": return Heart;
            case "Servizi": return Package;
            case "Cultura": return BookOpen;
            default: return Building2;
        }
    };

    const getCurrentDay = () => {
        const d = new Date().toLocaleDateString('it-IT', { weekday: 'long' });
        return d.charAt(0).toUpperCase() + d.slice(1);
    };

    const selectedWaste = wasteCollection.find(w => w.day === selectedWasteDay);
    const isTodaySelected = selectedWasteDay === getCurrentDay();

    return (
        <section className="px-5 pb-6">
            {/* Widget Raccolta Differenziata */}
            <div className="bg-gradient-to-br from-calitri-green to-calitri-dark rounded-2xl p-5 mb-6 shadow-lg text-white animate-slideUp relative overflow-hidden group">
                {/* Background decorative trash icon */}
                <Trash2 className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 opacity-20 -rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110" />

                <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base leading-tight">Raccolta Differenziata</h3>
                            <p className="text-[10px] text-white/70 uppercase tracking-wider font-extrabold">
                                {isTodaySelected ? "Oggi • " : ""}{selectedWasteDay}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    {selectedWaste ? (
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: selectedWaste.color }}
                                    >
                                        <Trash2 className="w-5 h-5 text-white/90" />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-white/60 font-bold uppercase">Cosa buttare:</span>
                                        <span className="font-black text-xl tracking-tight">{selectedWaste.type}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedWaste.time && (
                                <div className="flex items-center gap-2 text-xs bg-black/20 self-start px-3 py-1.5 rounded-full font-bold">
                                    <Clock className="w-3.5 h-3.5 text-calitri-green" />
                                    <span>{selectedWaste.time}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-1">
                                <Trash2 className="w-6 h-6 opacity-20" />
                            </div>
                            <p className="text-white/60 text-sm font-medium">Nessuna raccolta prevista per {selectedWasteDay === getCurrentDay() ? "oggi" : selectedWasteDay.toLowerCase()}</p>
                        </div>
                    )}
                </div>

                {/* Calendario settimanale interattivo */}
                <div className="mt-6 flex justify-between gap-1 relative z-10">
                    {weekDays.map((day, index) => {
                        const waste = wasteCollection.find(w => w.day === day);
                        const isToday = day === getCurrentDay();
                        const isSelected = day === selectedWasteDay;

                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedWasteDay(day)}
                                className={`
                                    flex-1 flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300
                                    ${isSelected
                                        ? 'bg-white text-calitri-dark shadow-xl scale-110 -translate-y-1'
                                        : 'hover:bg-white/10'
                                    }
                                    ${isToday && !isSelected ? 'ring-1 ring-white/30' : ''}
                                `}
                            >
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-calitri-dark' : 'text-white/60'}`}>
                                    {day.substring(0, 3)}
                                </span>
                                <div
                                    className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'border-calitri-dark/10' : 'border-white/20'}`}
                                    style={{ backgroundColor: waste ? waste.color : 'transparent' }}
                                />
                                {isToday && (
                                    <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-calitri-terra' : 'bg-white'}`} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>


            {/* Filtri Categoria */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                                flex items-center gap-2 transition-all duration-300 active:scale-95
                                ${selectedCategory === cat.name
                                    ? 'bg-calitri-dark dark:bg-white text-white dark:text-calitri-dark shadow-md'
                                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-calitri-dark'
                                }
                            `}
                        >
                            <Icon className="w-4 h-4" />
                            {cat.name}
                        </button>
                    );
                })}
            </div>

            {/* Lista Servizi */}
            <div className="space-y-3">
                {filteredServices.map((service, index) => {
                    const CategoryIcon = getCategoryIcon(service.category);
                    return (
                        <div
                            key={service.id}
                            className="bg-white dark:bg-[#222222] rounded-xl p-4 shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-all duration-300 animate-slideUp"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                    ${service.emergency
                                        ? 'bg-red-500 text-white'
                                        : 'bg-calitri-dark/10 dark:bg-stone-700 text-calitri-dark dark:text-stone-200'
                                    }
                                `}>
                                    <CategoryIcon className="w-6 h-6" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="font-bold text-stone-800 dark:text-stone-100">
                                            {service.name}
                                        </h4>
                                        {service.emergency && (
                                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                                                EMERGENZA
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1.5 text-sm text-stone-600 dark:text-stone-400">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-calitri-terra flex-shrink-0 mt-0.5" />
                                            <span className="text-xs">{service.address}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-4 h-4 text-calitri-green flex-shrink-0 mt-0.5" />
                                            <span className="text-xs">{service.hours}</span>
                                        </div>
                                    </div>

                                    <a
                                        href={`tel:${service.phone}`}
                                        className={`
                                            mt-3 w-full py-2 rounded-lg font-semibold text-sm
                                            flex items-center justify-center gap-2
                                            transition-all duration-300 active:scale-95
                                            ${service.emergency
                                                ? 'bg-red-500 text-white hover:bg-red-600'
                                                : 'bg-calitri-dark dark:bg-stone-700 text-white hover:bg-calitri-terra'
                                            }
                                        `}
                                    >
                                        <Phone className="w-4 h-4" />
                                        {service.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Numeri di Emergenza Rapidi */}
            <div className="mt-6 bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-900/30 rounded-2xl p-4">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Numeri di Emergenza
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { number: "112", label: "Carabinieri" },
                        { number: "118", label: "Ambulanza" },
                        { number: "115", label: "Vigili del Fuoco" }
                    ].map(emergency => (
                        <a
                            key={emergency.number}
                            href={`tel:${emergency.number}`}
                            className="bg-white dark:bg-stone-800 border-2 border-red-300 dark:border-red-900/50 rounded-xl p-3 text-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 active:scale-95 group"
                        >
                            <div className="text-2xl font-black text-red-600 group-hover:text-white mb-1">
                                {emergency.number}
                            </div>
                            <div className="text-[10px] font-semibold text-stone-600 dark:text-stone-400 group-hover:text-white">
                                {emergency.label}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
