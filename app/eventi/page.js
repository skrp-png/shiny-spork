"use client";

import { useState } from "react";
import SimpleHeader from '@/components/SimpleHeader';
import EventCalendar from '@/components/EventCalendar';
import EventsList from '@/components/EventsList';

export default function EventiPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Eventi" />
            <div className="mt-2 space-y-6">
                <EventCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div className="border-t-8 border-stone-100 dark:border-stone-800" />
                <EventsList selectedDate={selectedDate} />
            </div>
        </main>
    );
}
