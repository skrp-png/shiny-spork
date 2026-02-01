"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNews } from "@/lib/api";
import { Newspaper, ArrowRight } from "lucide-react";

export default function NewsPreview() {
    const [latestNews, setLatestNews] = useState(null);

    useEffect(() => {
        const fetchLatest = async () => {
            const data = await getNews();
            if (data && data.length > 0) {
                setLatestNews(data[0]);
            }
        };
        fetchLatest();
    }, []);

    if (!latestNews) return (
        <div className="h-full min-h-[180px] rounded-2xl bg-stone-100 animate-pulse"></div>
    );

    return (
        <Link href="/news">
            <div className="relative h-full min-h-[180px] rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-premium transition-all duration-300 cursor-pointer group">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={latestNews.image}
                        alt={latestNews.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-calitri-terra/90 via-calitri-dark/80 to-stone-900/90 dark:from-stone-800/90 dark:via-stone-900/90 dark:to-black/90"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-4 text-white">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Newspaper className="w-5 h-5" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-black text-base mb-1 leading-tight">News & Storie</h3>
                        <p className="text-xs text-white/80 font-medium line-clamp-2 leading-relaxed">
                            {latestNews.title}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
