"use client";

import { useState, useEffect } from "react";
import { getMarketItems } from "@/lib/api";
import { MessageCircle, Heart, Plus, Search } from "lucide-react";
import AddItemModal from "./AddItemModal";

export default function MarketGrid() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tutti");

    const categories = ["Tutti", "Cibo", "Mobili", "Altro"]; // Categorie fisse per semplicità o caricate dinamicamente

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getMarketItems();

            // Uniamo i dati da Supabase con quelli locali (se presenti nell'AddItemModal che usa localStorage)
            const stored = localStorage.getItem("marketItems");
            if (stored) {
                const storedItems = JSON.parse(stored);
                // Evitiamo duplicati se l'utente ha salvato cose in locale che sono ora su Supabase
                const merged = [...storedItems, ...data.filter(di => !storedItems.find(si => si.id === di.id))];
                setItems(merged);
            } else {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Tutti" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddItem = (newItem) => {
        const updatedItems = [newItem, ...items];
        setItems(updatedItems);
        localStorage.setItem("marketItems", JSON.stringify(updatedItems));
    };

    return (
        <>
            <section className="px-5 py-4">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white text-heading">Annunci</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 text-sm text-white bg-calitri-terra px-3 py-1.5 rounded-full font-semibold hover:bg-calitri-dark transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Aggiungi
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Cerca annunci..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-[#222222] border border-stone-200 dark:border-stone-800 rounded-xl py-2.5 pl-10 pr-4 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-calitri-terra/20 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                                    px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border
                                    ${selectedCategory === cat
                                        ? 'bg-calitri-terra text-white border-calitri-terra shadow-sm'
                                        : 'bg-white dark:bg-[#222222] text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-300'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 flex flex-col h-full active:scale-[0.98] transition-all duration-300 hover:shadow-premium group">
                            <div className="relative aspect-square bg-stone-100 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2">
                                    <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-stone-400 hover:text-red-500 transition-colors">
                                        <Heart className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                {item.price === "GRATIS" ? (
                                    <span className="absolute bottom-2 left-2 bg-calitri-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        REGALO
                                    </span>
                                ) : item.price === "BARATTO" && (
                                    <span className="absolute bottom-2 left-2 bg-calitri-terra text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        SCAMBIO
                                    </span>
                                )}
                            </div>

                            <div className="p-3 flex flex-col flex-grow">
                                <p className="text-[10px] text-calitri-terra uppercase font-bold tracking-wider mb-0.5">{item.category}</p>
                                <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-100 leading-tight mb-1 line-clamp-2 min-h-[2.5em]">{item.title}</h3>
                                {item.seller_name && (
                                    <p className="text-[10px] text-stone-400 mb-1">da {item.seller_name}</p>
                                )}
                                <p className="text-lg font-bold text-calitri-dark dark:text-calitri-terra mb-3">{item.price}</p>

                                <div className="mt-auto">
                                    <a
                                        href={`https://wa.me/${item.seller_phone}?text=Ciao, sono interessato a ${item.title}`}
                                        className="w-full bg-stone-900 dark:bg-stone-700 text-white py-2 rounded-xl flex items-center justify-center gap-1.5 hover:bg-calitri-terra transition-colors group/btn"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                        <span className="text-[11px] font-bold">Contatta</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddItem}
            />
        </>
    );
}
