"use client";

import Link from "next/link";
import { Map } from "lucide-react";

export default function MapPreview() {
    return (
        <Link
            href="/mappa"
            className="bg-calitri-green text-white rounded-3xl p-4 shadow-lg shadow-calitri-green/10 flex flex-col justify-between group active:scale-[0.98] transition-all relative overflow-hidden h-full"
        >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>

            <div className="bg-white/20 p-2 rounded-xl w-fit backdrop-blur-sm">
                <Map className="w-5 h-5" />
            </div>

            <div>
                <h3 className="text-sm font-black leading-tight">Mappa<br />Interattiva</h3>
            </div>
        </Link>
    );
}
