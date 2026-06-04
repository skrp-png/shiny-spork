"use client";

import { useState } from "react";
import SimpleHeader from '@/components/SimpleHeader';
import EventCalendar from '@/components/EventCalendar';
import EventsList from '@/components/EventsList';
import SuggestEventModal from '@/components/SuggestEventModal';
import { CalendarPlus } from "lucide-react";

export default function EventiPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showSuggest, setShowSuggest] = useState(false);

    return (
        <main className="relative min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Eventi" />
            <div className="mt-2 space-y-6">
                <EventCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div className="border-t-8 border-stone-100 dark:border-stone-800" />
                <EventsList selectedDate={selectedDate} />
            </div>

            {/* Floating Action Button "Segnala Evento" */}
            <button
                onClick={() => setShowSuggest(true)}
                className="fixed bottom-24 right-6 z-40 md:absolute md:bottom-28 md:right-8 bg-calitri-terra hover:bg-calitri-terra/90 text-white px-4 py-3.5 rounded-full shadow-lg shadow-calitri-terra/30 active:scale-95 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-wider cursor-pointer"
            >
                <CalendarPlus size={16} />
                <span>Segnala</span>
            </button>

            {/* Form Modal */}
            <SuggestEventModal isOpen={showSuggest} onClose={() => setShowSuggest(false)} />
        </main>
    );
}
