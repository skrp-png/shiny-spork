"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from "lucide-react";
import { getEvents } from "@/lib/api";

export default function EventCalendar({ selectedDate, setSelectedDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    const dayNames = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const getEventsForDate = (date) => {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return events.filter(event => event.date === dateStr);
    };

    const hasEventsOnDate = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return getEventsForDate(date).length > 0;
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDayClick = (day) => {
        const clickedDate = new Date(year, month, day);
        setSelectedDate(clickedDate);
    };

    return (
        <div className="px-5 pb-2 animate-slideUp">
            {/* Header Calendario */}
            <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
                <div className="bg-calitri-dark dark:bg-stone-800 p-4 flex items-center justify-between">
                    <button
                        onClick={previousMonth}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-white">
                            {monthNames[month]} {year}
                        </h2>
                    </div>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Giorni della settimana */}
                <div className="grid grid-cols-7 gap-1 p-2 bg-stone-50 dark:bg-stone-900/50">
                    {dayNames.map(day => (
                        <div key={day} className="text-center text-xs font-bold text-stone-500 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Griglia giorni */}
                <div className="grid grid-cols-7 gap-1 p-2">
                    {[...Array(startingDayOfWeek)].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const date = new Date(year, month, day);
                        const isToday = new Date().toDateString() === date.toDateString();
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const hasEvents = hasEventsOnDate(day);

                        return (
                            <button
                                key={day}
                                onClick={() => handleDayClick(day)}
                                className={`
                                    aspect-square rounded-lg flex flex-col items-center justify-center
                                    text-sm font-semibold transition-all duration-200 relative
                                    ${isSelected ? 'bg-calitri-dark text-white scale-105 shadow-lg' :
                                        isToday ? 'bg-calitri-dark/10 dark:bg-white/10 text-calitri-dark dark:text-white border border-calitri-dark/20 dark:border-white/20' :
                                            'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'}
                                    active:scale-95
                                `}
                            >
                                {day}
                                {hasEvents && (
                                    <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-calitri-dark'}`} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
