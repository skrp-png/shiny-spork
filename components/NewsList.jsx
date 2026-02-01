"use client";

import { useState, useEffect, useRef } from "react";
import { getNews } from "@/lib/api";
import { Calendar, User, ArrowRight, X, Clock } from "lucide-react";

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [filter, setFilter] = useState("Tutte");
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getNews();
            setNews(data);
        };
        fetchNews();
    }, []);
    const modalContentRef = useRef(null);

    const categories = ["Tutte", "Notizie", "Storia", "Tradizioni"];

    const filteredNews = filter === "Tutte"
        ? news
        : news.filter(item => item.category === filter);

    const heroItem = filteredNews[0];
    const otherNews = filteredNews.slice(1);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const calculateReadingTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    // Gestione scroll progress
    useEffect(() => {
        const handleScroll = () => {
            if (modalContentRef.current) {
                const element = modalContentRef.current;
                const totalHeight = element.scrollHeight - element.clientHeight;
                const windowScrollPercentage = (element.scrollTop / totalHeight) * 100;
                setScrollProgress(windowScrollPercentage);
            }
        };

        const currentRef = modalContentRef.current;
        if (selectedNews && currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, [selectedNews]);

    // Reset progress on modal open
    useEffect(() => {
        if (selectedNews) {
            setScrollProgress(0);
        }
    }, [selectedNews]);

    return (
        <>
            <section className="px-5 pb-6">
                {/* Filtri Categoria */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                                px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap
                                transition-all duration-300 active:scale-95
                                ${filter === cat
                                    ? 'bg-calitri-terra text-white shadow-lg scale-105'
                                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-calitri-terra/50'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Hero Card */}
                {heroItem && (
                    <div
                        onClick={() => setSelectedNews(heroItem)}
                        className="relative mb-8 rounded-3xl overflow-hidden shadow-premium group cursor-pointer animate-fadeIn"
                    >
                        <div className="relative h-[400px] w-full">
                            <img
                                src={heroItem.image}
                                alt={heroItem.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>

                            <div className="absolute top-4 left-4">
                                <span className="px-4 py-1.5 bg-calitri-terra text-white rounded-full text-[10px] uppercase tracking-wider font-black shadow-lg">
                                    IN EVIDENZA • {heroItem.category}
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight drop-shadow-md">
                                    {heroItem.title}
                                </h2>
                                <p className="text-stone-200 text-sm mb-4 line-clamp-2 md:line-clamp-none max-w-xl">
                                    {heroItem.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs font-bold text-white/80">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {calculateReadingTime(heroItem.content)} min lettura
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatDate(heroItem.date)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Lista Altre News */}
                <div className="space-y-5">
                    {otherNews.map((item, index) => (
                        <article
                            key={item.id}
                            onClick={() => setSelectedNews(item)}
                            className="bg-white dark:bg-[#222222] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-premium transition-all duration-300 cursor-pointer group animate-slideUp"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative h-48 sm:h-auto sm:w-40 overflow-hidden bg-stone-100 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-2 right-2 sm:hidden">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-calitri-terra uppercase">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow">
                                    <div className="hidden sm:flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black text-calitri-terra uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-stone-400">
                                            <Clock className="w-3 h-3" />
                                            {calculateReadingTime(item.content)} min
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100 mb-2 leading-snug group-hover:text-calitri-terra transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
                                        {item.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400">
                                                <Calendar className="w-3.5 h-3.5 text-stone-300" />
                                                {formatDate(item.date)}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400 border-l border-stone-100 pl-3">
                                                <User className="w-3.5 h-3.5 text-stone-300" />
                                                {item.author}
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center group-hover:bg-calitri-terra group-hover:text-white transition-all duration-300">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Modal Articolo Completo */}
            {selectedNews && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-0 md:p-4">
                    <div
                        ref={modalContentRef}
                        className="bg-stone-50 dark:bg-[#1a1a1a] w-full md:max-w-2xl md:rounded-3xl rounded-t-[32px] max-h-[95vh] md:max-h-[85vh] overflow-y-auto animate-slideUp relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Scroll Progress Bar */}
                        <div className="sticky top-0 left-0 right-0 z-50 h-1 bg-transparent overflow-hidden">
                            <div
                                className="h-full bg-calitri-terra transition-all duration-150 ease-out shadow-[0_0_10px_rgba(118,29,29,0.5)]"
                                style={{ width: `${scrollProgress}%` }}
                            ></div>
                        </div>

                        {/* Top Header Section */}
                        <div className="relative">
                            {/* Immagine con overlay */}
                            <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-t-[32px] md:rounded-t-3xl">
                                <img
                                    src={selectedNews.image}
                                    alt={selectedNews.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-50 dark:from-[#1a1a1a] via-stone-900/20 to-transparent"></div>

                                <div className="absolute bottom-8 left-6 right-6">
                                    <span className="inline-block px-3 py-1 bg-calitri-terra text-white rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                                        {selectedNews.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-md">
                                        {selectedNews.title}
                                    </h2>
                                </div>
                            </div>

                            {/* X Button - Absolute positioned over image */}
                            <button
                                onClick={() => setSelectedNews(null)}
                                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg active:scale-90"
                            >
                                <X className="w-5 h-5 text-stone-700" />
                            </button>
                        </div>

                        {/* Contenuto */}
                        <div className="px-6 pb-20 -mt-2 relative">
                            <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-stone-400 mb-8 pb-8 border-b border-stone-200/60">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span>di {selectedNews.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-calitri-terra/50" />
                                    <span>{formatDate(selectedNews.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-calitri-terra/50" />
                                    <span>{calculateReadingTime(selectedNews.content)} min lettura</span>
                                </div>
                            </div>

                            <div className="prose prose-stone max-w-none">
                                <p className="text-xl font-medium text-stone-700 mb-8 leading-relaxed italic border-l-4 border-calitri-terra/30 pl-5 py-1">
                                    {selectedNews.excerpt}
                                </p>
                                <div className="text-stone-600 dark:text-stone-300 text-lg leading-[1.8] whitespace-pre-line space-y-4 font-serif">
                                    {selectedNews.content}
                                </div>
                            </div>

                            {/* Decorative element at end */}
                            <div className="mt-16 flex flex-col items-center gap-4 text-stone-300">
                                <div className="w-16 h-px bg-stone-200"></div>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-calitri-terra/20"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-calitri-terra/40"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-calitri-terra/20"></div>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Fine della storia</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

