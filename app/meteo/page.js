"use client";

import { useState, useEffect } from "react";
import SimpleHeader from "@/components/SimpleHeader";
import WeatherDetail from "@/components/WeatherDetail";
import { getCurrentWeather, getForecast } from "@/lib/weather";

export default function MeteoPage() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [current, fore] = await Promise.all([
                    getCurrentWeather(),
                    getForecast()
                ]);
                setWeather(current);
                setForecast(fore);
            } catch (error) {
                console.error("Failed to load weather data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Meteo" />

            {loading ? (
                <div className="flex flex-col items-center justify-center pt-24 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-stone-400 animate-pulse uppercase tracking-[0.2em]">Caricamento meteo...</p>
                </div>
            ) : (
                <WeatherDetail current={weather} forecast={forecast} />
            )}
        </main>
    );
}
