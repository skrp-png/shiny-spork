"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wind, Droplets, ArrowRight } from "lucide-react";
import { getCurrentWeather, getForecast } from "@/lib/weather";

export default function WeatherCard() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function loadWeather() {
            const current = await getCurrentWeather();
            setWeather(current);
        }
        loadWeather();
    }, []);

    const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

    return (
        <section>
            <Link
                href="/meteo"
                className="block bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-6 shadow-lg shadow-blue-500/20 cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                                Meteo
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            {weather?.weather?.[0] && (
                                <img
                                    src={getIconUrl(weather.weather[0].icon)}
                                    alt={weather.weather[0].description}
                                    className="w-20 h-20 -my-2 drop-shadow-lg"
                                />
                            )}
                            <div>
                                <h2 className="text-5xl font-black text-white tracking-tighter">
                                    {weather?.main?.temp ? Math.round(weather.main.temp) : "--"}°
                                </h2>
                                <p className="text-sm font-medium text-white/80 capitalize mt-1">
                                    {weather?.weather?.[0]?.description || "Caricamento..."}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <div className="flex items-center gap-2 text-white/80 text-xs">
                                <Droplets className="w-4 h-4" />
                                <span>{weather?.main?.humidity || "--"}%</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80 text-xs">
                                <Wind className="w-4 h-4" />
                                <span>{weather?.wind?.speed || "--"} m/s</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </div>
            </Link>
        </section>
    );
}
