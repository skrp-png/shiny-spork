"use client";

import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";
import { CalendarDays, MapPin, Clock, Repeat, ChevronDown, ChevronUp } from "lucide-react";

import EventModal from "@/components/EventModal";

export default function EventsList({ selectedDate }) {
    const [events, setEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleDateString('it-IT', { month: 'short' });
        return { day, month };
    };

    const targetDateStr = selectedDate ?
        `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
        : "";
    const isToday = new Date().toDateString() === selectedDate?.toDateString();

    console.log("DEBUG EventsList:", {
        selectedDate,
        targetDateStr,
        totalEvents: events.length,
        sampleEventDate: events[0]?.date
    });

    const dayEvents = events.filter(event => {
        const match = event.date === targetDateStr;
        if (match) console.log("MATCH FOUND:", event);
        return match;
    });
    const otherEvents = events
        .filter(event => {
            if (event.date === targetDateStr) return false;
            // Mostra solo eventi dell'anno corrente (o selezionato)
            const eventYear = new Date(event.date).getFullYear();
            const selectedYear = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
            return eventYear === selectedYear;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const EventCard = ({ event, index }) => {
        const { day, month } = formatDate(event.date);
        return (
            <div
                onClick={() => setSelectedEvent(event)}
                className="relative bg-white dark:bg-[#222222] rounded-2xl p-4 shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden group hover:shadow-md transition-all duration-300 animate-slideUp cursor-pointer active:scale-[0.98]"
                style={{ animationDelay: `${index * 50}ms` }}
            >
                {/* ... content same as before ... */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-calitri-dark"></div>
                <div className="flex items-center gap-5 pl-2">
                    <div className="text-center min-w-[3.5rem] flex flex-col justify-center items-center py-1">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{month}</span>
                        <span className="text-2xl font-black text-calitri-dark dark:text-stone-100 leading-none">{day}</span>
                    </div>
                    <div className="h-10 w-px bg-stone-100 dark:bg-stone-700"></div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3 className="text-base font-bold text-stone-800 dark:text-stone-100 leading-tight group-hover:text-calitri-dark dark:group-hover:text-calitri-terra transition-colors">
                                {event.title}
                            </h3>
                            {event.recurring && (
                                <Repeat className="w-4 h-4 text-calitri-green flex-shrink-0" />
                            )}
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mb-2 line-clamp-1">{event.description}</p>
                        <div className="flex items-center gap-3 text-xs text-stone-500 font-medium flex-wrap">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-calitri-green" />
                                {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-calitri-dark dark:text-calitri-terra" />
                                {event.location}
                            </span>
                            <span className="px-2 py-0.5 bg-calitri-dark/10 dark:bg-stone-700 text-calitri-dark dark:text-stone-200 rounded-full font-semibold text-[10px]">
                                {event.category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="px-5 pb-24 animate-fadeIn">
            {/* ... section content ... */}

            {/* Sezione Giorno Selezionato */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white text-heading">
                        {isToday ? "Eventi di Oggi" : `Eventi del ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}
                    </h2>
                    <span className="text-sm text-stone-500 font-medium">
                        {dayEvents.length} {dayEvents.length !== 1 ? 'eventi' : 'evento'}
                    </span>
                </div>

                <div className="space-y-4">
                    {dayEvents.length > 0 ? (
                        dayEvents.map((event, index) => (
                            <EventCard key={event.id} event={event} index={index} />
                        ))
                    ) : (
                        <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-8 text-center border-2 border-dashed border-stone-200 dark:border-stone-700 animate-scaleIn">
                            <CalendarDays className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                            <p className="text-stone-500 font-medium">Nessun evento in programma per questa data</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pulsante Toggle / Altri Eventi */}
            <div className="space-y-6">
                {!showAll && otherEvents.length > 0 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="w-full py-4 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group"
                    >
                        Mostra tutti i prossimi eventi ({otherEvents.length})
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                )}

                {showAll && (
                    <div className="animate-fadeIn">
                        <div className="flex justify-between items-end mb-4 pt-4 border-t border-stone-200">
                            <h2 className="text-xl font-bold text-calitri-dark dark:text-white text-heading">Prossimi Eventi</h2>
                            <button
                                onClick={() => setShowAll(false)}
                                className="text-xs font-bold text-stone-400 hover:text-calitri-dark flex items-center gap-1 transition-colors"
                            >
                                <ChevronUp className="w-3 h-3" /> Nascondi
                            </button>
                        </div>
                        <div className="space-y-4">
                            {otherEvents.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index + dayEvents.length} />
                            ))}
                        </div>
                        <button
                            onClick={() => setShowAll(false)}
                            className="w-full py-4 mt-6 border-2 border-stone-100 dark:border-stone-700 text-stone-500 dark:text-stone-400 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                            Mostra solo eventi selezionati
                            <ChevronUp className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </section>
    );
}
