"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { getPointsOfInterest, getRestaurants, getAccommodations, getServices } from "@/lib/api";
import { MapPin, Navigation, X, ExternalLink, Map as MapIcon, Maximize, Minimize } from "lucide-react";

// Import Map component dynamically to avoid SSR issues
const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="h-64 w-full bg-stone-100 animate-pulse flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-2">
                <MapIcon className="w-8 h-8 text-stone-400" />
                <span className="text-stone-500 text-sm font-medium">Caricamento mappa...</span>
            </div>
        </div>
    )
});

export default function InteractiveMap() {
    const [allPoints, setAllPoints] = useState([]);
    const [selectedPOI, setSelectedPOI] = useState(null);
    const [filter, setFilter] = useState("Tutti");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const [pois, rests, accs, servs] = await Promise.all([
                getPointsOfInterest(),
                getRestaurants(),
                getAccommodations(),
                getServices()
            ]);

            const combined = [
                ...pois.map(p => ({ ...p, category: p.category || "Monumenti" })),
                ...rests.map(r => ({
                    ...r,
                    category: "Ristorazione",
                    description: r.description || `${r.cuisine} - ${r.address}`
                })),
                ...accs.map(a => ({
                    ...a,
                    category: "Alloggi",
                    description: a.description || `${a.category} - ${a.address}`
                })),
                ...servs.map(s => ({
                    ...s,
                    category: "Servizi",
                    description: s.hours || s.address,
                    image: s.image || "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop"
                }))
            ];
            setAllPoints(combined);
        };
        fetchData();
    }, []);

    // Listen for fullscreen change events
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            const element = mapContainerRef.current;
            if (element?.requestFullscreen) {
                element.requestFullscreen();
            } else if (element?.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element?.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    const categories = ["Tutti", "Monumenti", "Chiese", "Parchi", "Panorami", "Ristorazione", "Alloggi", "Servizi"];

    const filteredPOIs = filter === "Tutti"
        ? allPoints
        : allPoints.filter(poi => poi.category === filter);

    const openInMaps = (poi) => {
        const query = encodeURIComponent(`${poi.name || 'Calitri'} Calitri`);
        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(url, '_blank');
    };

    const handlePointClick = (poi) => {
        setSelectedPOI(poi);
    };

    return (
        <>
            <section className="px-5 pb-6">
                {/* Header con Switch Vista */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-calitri-dark dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-calitri-green" />
                        Esplora Calitri
                    </h3>
                </div>

                {/* Filtri Categoria */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                                transition-all duration-300 active:scale-95
                                ${filter === cat
                                    ? 'bg-calitri-green text-white shadow-md'
                                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-calitri-green'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Mappa Reale - Sticky during scroll */}
                <div className="mb-6 sticky top-0 z-30 -mx-5 md:mx-0">
                    <div
                        ref={mapContainerRef}
                        className={`relative w-full overflow-hidden md:rounded-2xl border-b md:border border-stone-200 dark:border-stone-800 shadow-sm transition-all duration-500 ${isFullscreen ? 'h-screen' : 'h-[35vh] min-h-[250px]'}`}
                    >
                        <LeafletMap
                            points={filteredPOIs}
                            selectedPoint={selectedPOI}
                            onPointClick={handlePointClick}
                        />

                        {/* Pulsante Fullscreen */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFullscreen();
                            }}
                            className="absolute top-4 right-4 z-[400] w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-md border border-stone-200 text-calitri-dark active:scale-95"
                            title={isFullscreen ? "Esci dallo schermo intero" : "Schermo intero"}
                        >
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Lista Punti di Interesse (opzionale o sempre visibile) */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-stone-500 uppercase tracking-widest">
                            {filter} ({filteredPOIs.length})
                        </h4>
                    </div>

                    <div className="grid gap-3 grid-cols-1">
                        {filteredPOIs.map((poi, index) => (
                            <div
                                key={`${poi.category}-${poi.id}`}
                                onClick={() => setSelectedPOI(poi)}
                                className={`
                                    bg-white dark:bg-[#222222] rounded-xl overflow-hidden shadow-sm border transition-all duration-300 cursor-pointer group animate-slideUp
                                    ${(selectedPOI?.id === poi.id && selectedPOI?.category === poi.category) ? 'border-calitri-green ring-1 ring-calitri-green shadow-md scale-[1.02] z-10' : 'border-stone-100 dark:border-stone-800 hover:shadow-md'}
                                `}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex gap-3 p-3">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                                        <img
                                            src={poi.image}
                                            alt={poi.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-1 group-hover:text-calitri-green transition-colors truncate">
                                            {poi.name}
                                        </h4>
                                        <p className="text-xs text-stone-600 dark:text-stone-400 mb-2 line-clamp-2">
                                            {poi.description}
                                        </p>
                                        <span className="inline-block px-2 py-0.5 bg-calitri-green/10 text-calitri-green text-[10px] font-bold rounded-full">
                                            {poi.category}
                                        </span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openInMaps(poi);
                                        }}
                                        className="flex-shrink-0 w-10 h-10 rounded-full bg-calitri-green/10 flex items-center justify-center hover:bg-calitri-green hover:text-white text-calitri-green transition-all duration-300 active:scale-95"
                                    >
                                        <Navigation className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal Dettaglio POI */}
            {selectedPOI && (
                <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center bg-black/40 animate-fadeIn"
                    onClick={() => setSelectedPOI(null)}
                >
                    <div
                        className="bg-white dark:bg-[#222222] w-full md:max-w-lg md:rounded-2xl rounded-t-3xl overflow-hidden animate-slideUp shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Immagine */}
                        <div className="relative h-64 bg-stone-100 dark:bg-stone-800">
                            <img
                                src={selectedPOI.image}
                                alt={selectedPOI.name}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setSelectedPOI(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                            >
                                <X className="w-5 h-5 text-stone-700" />
                            </button>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-calitri-green text-white rounded-full text-xs font-bold shadow-md">
                                    {selectedPOI.category}
                                </span>
                            </div>
                        </div>

                        {/* Contenuto */}
                        <div className="p-6 pb-12">
                            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">
                                {selectedPOI.name}
                            </h2>
                            <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                                {selectedPOI.description}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => openInMaps(selectedPOI)}
                                    className="flex-1 bg-calitri-green text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-calitri-dark transition-all active:scale-95 shadow-lg shadow-calitri-green/20"
                                >
                                    <Navigation className="w-5 h-5" />
                                    Vai su Maps
                                </button>
                                <button
                                    onClick={() => setSelectedPOI(null)}
                                    className="px-6 py-3.5 rounded-xl font-semibold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all active:scale-95"
                                >
                                    Chiudi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
