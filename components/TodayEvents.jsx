"use client";

import { useMemo, useState } from "react";
import { useEvents } from "@/lib/queries";
import Link from "next/link";
import { ArrowRight, MapPin, CalendarDays } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { getHomeEvent } from "@/lib/events";
import EventModal from "@/components/EventModal";

export default function TodayEvents({ initialEvents = [] }) {
    const { data: events = [] } = useEvents(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const active = useMemo(() => getHomeEvent(events), [events]);

    // No upcoming events: show an empty state instead of an endless loading skeleton
    if (!active) return (
        <Link href="/eventi" className="h-full min-h-[180px] rounded-3xl bg-calitri-dark/10 dark:bg-stone-800 p-5 flex flex-col justify-between active:scale-[0.98] transition-all">
            <CalendarDays className="w-6 h-6 text-calitri-dark dark:text-stone-300" />
            <div>
                <h3 className="text-sm font-bold text-calitri-dark dark:text-stone-100 leading-tight mb-1">Nessun evento in programma</h3>
                <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1">
                    Vedi calendario <ArrowRight className="w-2.5 h-2.5" />
                </p>
            </div>
        </Link>
    );

    const displayEvent = active.event;
    const isToday = active.isToday;
    const eventDate = new Date(`${displayEvent.date}T00:00:00`); // local midnight
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
                                <span className="text-lg font-black text-white leading-none">{formatTime(displayEvent.time)}</span>
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
