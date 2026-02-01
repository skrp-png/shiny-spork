"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getGreeting } from "@/lib/timeUtils";

export default function SimpleHeader({ title }) {
    const [greeting, setGreeting] = useState("Buongiorno");
    const router = useRouter();

    useEffect(() => {
        setGreeting(getGreeting());
    }, []);

    return (
        <header className="sticky top-0 z-40 glass pb-4 pt-safe-top">
            <div className="px-5 pt-4 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors active:scale-90"
                >
                    <ChevronLeft className="w-6 h-6 text-calitri-dark" />
                </button>
                <div>
                    <p className="text-calitri-dark font-bold text-[10px] tracking-widest uppercase -mb-0.5">
                        {greeting} Calitri
                    </p>
                    <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 text-heading tracking-tight leading-none">{title || "Calitri"}</h1>
                </div>
            </div>
        </header>
    );
}
