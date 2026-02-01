"use client";

import { useState, useEffect } from "react";
import { getRestaurants, getAccommodations } from "@/lib/api";
import { Phone, MapPin, Clock, Star, Utensils, Bed, Navigation, ExternalLink, X, Wifi, Coffee, PawPrint, Waves } from "lucide-react";

export default function WhereToStay() {
    const [restaurants, setRestaurants] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [activeTab, setActiveTab] = useState("mangiare");
    const [selectedCategory, setSelectedCategory] = useState("Tutti");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [resData, accData] = await Promise.all([
                getRestaurants(),
                getAccommodations()
            ]);
            setRestaurants(resData);
            setAccommodations(accData);
        };
        fetchData();
    }, []);

    const restaurantCategories = ["Tutti", "Ristorante", "Pizzeria", "Bar/Caffè", "Agriturismo"];
    const accommodationCategories = ["Tutti", "Hotel", "B&B", "Agriturismo", "Affittacamere"];

    const categories = activeTab === "mangiare" ? restaurantCategories : accommodationCategories;
    const items = activeTab === "mangiare" ? restaurants : accommodations;

    const filteredItems = selectedCategory === "Tutti"
        ? items
        : items.filter(item => item.category === selectedCategory);

    const openInMaps = (item) => {
        const query = encodeURIComponent(`${item.name} ${item.address} Calitri`);
        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(url, '_blank');
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`}
                    />
                ))}
                <span className="text-xs font-semibold text-stone-600 ml-1">{rating}</span>
            </div>
        );
    };

    const getAmenityIcon = (amenity) => {
        if (amenity.toLowerCase().includes('wifi')) return <Wifi className="w-3 h-3" />;
        if (amenity.toLowerCase().includes('colazione')) return <Coffee className="w-3 h-3" />;
        if (amenity.toLowerCase().includes('animali')) return <PawPrint className="w-3 h-3" />;
        if (amenity.toLowerCase().includes('piscina')) return <Waves className="w-3 h-3" />;
        return null;
    };

    return (
        <>
            <section className="px-5 pb-6">
                {/* Tabs Mangiare/Dormire */}
                <div className="flex gap-2 mb-4 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                    <button
                        onClick={() => {
                            setActiveTab("mangiare");
                            setSelectedCategory("Tutti");
                        }}
                        className={`
                            flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-300
                            flex items-center justify-center gap-2
                            ${activeTab === "mangiare"
                                ? 'bg-white dark:bg-stone-700 text-calitri-terra shadow-sm'
                                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                            }
                        `}
                    >
                        <Utensils className="w-4 h-4" />
                        Dove Mangiare
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("dormire");
                            setSelectedCategory("Tutti");
                        }}
                        className={`
                            flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-300
                            flex items-center justify-center gap-2
                            ${activeTab === "dormire"
                                ? 'bg-white dark:bg-stone-700 text-calitri-green shadow-sm'
                                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                            }
                        `}
                    >
                        <Bed className="w-4 h-4" />
                        Dove Dormire
                    </button>
                </div>

                {/* Filtri Categoria */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                                transition-all duration-300 active:scale-95
                                ${selectedCategory === cat
                                    ? `${activeTab === "mangiare" ? 'bg-calitri-terra' : 'bg-calitri-green'} text-white shadow-md`
                                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-calitri-terra'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Lista Items */}
                <div className="space-y-4">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-premium transition-all duration-300 cursor-pointer animate-slideUp"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex gap-3 p-3">
                                {/* Immagine */}
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-1 truncate">
                                        {item.name}
                                    </h3>

                                    {renderStars(item.rating)}

                                    <p className="text-xs text-stone-600 dark:text-stone-400 mb-2 line-clamp-1">
                                        {activeTab === "mangiare" ? item.cuisine : item.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-[10px] text-stone-500">
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate">{item.address}</span>
                                    </div>

                                    {activeTab === "dormire" && item.pricePerNight && (
                                        <div className="mt-1 text-xs font-bold text-calitri-green">
                                            {item.pricePerNight}
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.location.href = `tel:${item.phone}`;
                                        }}
                                        className={`w-9 h-9 rounded-full ${activeTab === "mangiare" ? 'bg-calitri-terra/10 text-calitri-terra hover:bg-calitri-terra' : 'bg-calitri-green/10 text-calitri-green hover:bg-calitri-green'} flex items-center justify-center hover:text-white transition-all duration-300 active:scale-95`}
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openInMaps(item);
                                        }}
                                        className="w-9 h-9 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-800 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95"
                                    >
                                        <Navigation className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal Dettaglio */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white dark:bg-[#1a1a1a] w-full md:max-w-lg md:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header con immagine */}
                        <div className="relative h-56 bg-stone-100">
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                            >
                                <X className="w-5 h-5 text-stone-700" />
                            </button>
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <span className={`px-3 py-1 ${activeTab === "mangiare" ? 'bg-calitri-terra' : 'bg-calitri-green'} text-white rounded-full text-xs font-bold`}>
                                    {selectedItem.category}
                                </span>
                            </div>
                        </div>

                        {/* Contenuto */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">
                                        {selectedItem.name}
                                    </h2>
                                    {renderStars(selectedItem.rating)}
                                </div>
                                {selectedItem.stars && (
                                    <div className="flex gap-0.5">
                                        {[...Array(selectedItem.stars)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                                {selectedItem.description}
                            </p>

                            {/* Info dettagliate */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-start gap-3 text-sm">
                                    <MapPin className="w-5 h-5 text-calitri-terra flex-shrink-0 mt-0.5" />
                                    <span className="text-stone-700 dark:text-stone-300">{selectedItem.address}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <Phone className="w-5 h-5 text-calitri-green flex-shrink-0 mt-0.5" />
                                    <a href={`tel:${selectedItem.phone}`} className="text-stone-700 dark:text-stone-300 hover:text-calitri-green">
                                        {selectedItem.phone}
                                    </a>
                                </div>
                                {selectedItem.hours && (
                                    <div className="flex items-start gap-3 text-sm">
                                        <Clock className="w-5 h-5 text-calitri-ocra flex-shrink-0 mt-0.5" />
                                        <span className="text-stone-700 dark:text-stone-300">{selectedItem.hours}</span>
                                    </div>
                                )}
                                {selectedItem.pricePerNight && (
                                    <div className="flex items-start gap-3 text-sm">
                                        <Bed className="w-5 h-5 text-calitri-green flex-shrink-0 mt-0.5" />
                                        <span className="text-stone-700 dark:text-stone-300 font-semibold">{selectedItem.pricePerNight} a notte • {selectedItem.rooms} camere</span>
                                    </div>
                                )}
                            </div>

                            {/* Specialità o Servizi */}
                            {selectedItem.specialties && (
                                <div className="mb-6">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-2 flex items-center gap-2">
                                        <Utensils className="w-4 h-4 text-calitri-terra" />
                                        Specialità
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.specialties.map((specialty, i) => (
                                            <span key={i} className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-full text-xs">
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedItem.amenities && (
                                <div className="mb-6">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-2">Servizi</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selectedItem.amenities.map((amenity, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                                                {getAmenityIcon(amenity) || <span className="w-3 h-3 rounded-full bg-calitri-green" />}
                                                <span>{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={`tel:${selectedItem.phone}`}
                                    className={`py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${activeTab === "mangiare" ? 'bg-calitri-terra' : 'bg-calitri-green'} text-white hover:opacity-90 transition-opacity active:scale-98`}
                                >
                                    <Phone className="w-4 h-4" />
                                    Chiama
                                </a>
                                <button
                                    onClick={() => openInMaps(selectedItem)}
                                    className="py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-stone-800 text-white hover:bg-stone-700 transition-colors active:scale-98"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Naviga
                                </button>
                            </div>

                            {selectedItem.website && (
                                <a
                                    href={`https://${selectedItem.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border-2 border-stone-200 text-stone-700 hover:border-stone-300 transition-colors active:scale-98"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Visita Sito Web
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
