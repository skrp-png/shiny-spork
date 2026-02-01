"use client";

import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import EventModal from "@/components/EventModal";

export default function TodayEvents() {
    const [displayEvent, setDisplayEvent] = useState(null);
    const [isToday, setIsToday] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            if (!data || data.length === 0) return;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Trova eventi di oggi
            const todayEventsList = data.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate.getTime() === today.getTime();
            });

            if (todayEventsList.length > 0) {
                setDisplayEvent(todayEventsList[0]);
                setIsToday(true);
            } else {
                // Altrimenti il prossimo evento futuro
                const upcoming = data
                    .filter(event => new Date(event.date) >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                if (upcoming.length > 0) {
                    setDisplayEvent(upcoming[0]);
                    setIsToday(false);
                }
            }
        };
        fetchEvents();
    }, []);

    if (!displayEvent) return (
        <div className="h-full min-h-[180px] rounded-3xl bg-calitri-dark/10 animate-pulse"></div>
    );
    const eventDate = new Date(displayEvent.date);
    const dayLabel = isToday ? "OGGI" : eventDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });

    return (
        <section className="h-full">
            <div
                className="block h-full cursor-pointer"
                onClick={() => setSelectedEvent(displayEvent)}
            >
                <div className="bg-calitri-dark dark:bg-stone-800 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all h-full flex flex-col justify-center active:scale-[0.98] border border-transparent dark:border-stone-700">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                    <div className="relative z-10 flex flex-col gap-4 h-full">
                        <div className="flex justify-between items-start">
                            <div className="bg-white/10 p-2.5 rounded-xl text-center min-w-[3rem] backdrop-blur-sm">
                                <span className="text-[10px] font-bold text-white/60 uppercase block">{dayLabel}</span>
                                <span className="text-lg font-black text-white leading-none">{displayEvent.time}</span>
                            </div>
                            <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-bold text-white/80">
                                {displayEvent.category}
                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-base font-bold leading-tight mb-2 line-clamp-2">{displayEvent.title}</h3>
                            <div className="flex items-center gap-1.5 text-[10px] text-white/70 font-medium">
                                <MapPin className="w-3 h-3" />
                                <span className="truncate">{displayEvent.location}</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-2">
                            <div className="text-[10px] text-white/60 font-bold group-hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider">
                                Maggiori Info <ArrowRight className="w-2.5 h-2.5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </section>
    );
}
