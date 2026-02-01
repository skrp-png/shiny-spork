"use client";

import { useState, useEffect } from "react";
import { Sun, MapPin, Maximize2, X, CloudSun } from "lucide-react";
import Link from "next/link";
import { saints } from "@/data/mocks";
import { getCurrentWeather, getForecast } from "@/lib/weather";
import { getSaintOfTheDay } from "@/lib/saints";
import { getGreeting } from "@/lib/timeUtils";

export default function Header() {
    const [dateStr, setDateStr] = useState("");
    const [saint, setSaint] = useState("");
    const [greeting, setGreeting] = useState("Buongiorno");
    const [webcamUrl, setWebcamUrl] = useState("http://www.calitri.org/webcam.jpg");

    // Webcam state
    const [isWebcamExpanded, setIsWebcamExpanded] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("");

    // Weather state
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString("it-IT", { hour: '2-digit', minute: '2-digit' });
            setLastUpdated(timeStr);
        };

        const now = new Date();
        const options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
        setDateStr(now.toLocaleDateString("it-IT", options));
        updateTime();

        // Dynamic Greeting
        setGreeting(getGreeting());

        // Webcam Auto-Refresh
        const interval = setInterval(() => {
            const timestamp = new Date().getTime();
            setWebcamUrl(`http://www.calitri.org/webcam.jpg?t=${timestamp}`);
            updateTime();
        }, 60000);

        // Fetch Saint
        getSaintOfTheDay().then(name => setSaint(name));

        // Fetch Weather
        async function loadWeather() {
            const current = await getCurrentWeather();
            const fore = await getForecast();
            setWeather(current);
            setForecast(fore);
        }
        loadWeather();

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
                {/* Background Webcam Hero */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={webcamUrl}
                        key={webcamUrl}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?q=80&w=800&auto=format&fit=crop";
                        }}
                        alt="Vista Calitri Live"
                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-50 dark:to-[#1a1a1a]"></div>
                </div>

                {/* Top Bar: Weather Pill */}
                <div className="absolute top-safe-top left-0 right-0 z-20 px-5 pt-4 flex justify-end">
                    <Link
                        href="/meteo"
                        className="cursor-pointer active:scale-95 transition-transform"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-sm hover:bg-white/30 transition-colors">
                            {weather?.weather?.[0] ? (
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                    alt="Weather"
                                    className="w-6 h-6 -my-1"
                                />
                            ) : (
                                <Sun className="w-5 h-5 text-white fill-white" />
                            )}
                            <span className="text-lg font-bold text-white leading-none">
                                {weather?.main?.temp ? Math.round(weather.main.temp) : "--"}°
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-4 pt-20 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent dark:from-[#1a1a1a] dark:via-[#1a1a1a]/80">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-calitri-terra font-bold text-[10px] tracking-[0.2em] uppercase">{greeting}</p>
                        <div className="flex items-end justify-between">
                            <h1 className="text-5xl font-black text-calitri-dark dark:text-stone-100 tracking-tighter leading-[0.85]">Calitri</h1>
                            <div
                                className="mb-1 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm animate-pulse cursor-pointer"
                                onClick={() => setIsWebcamExpanded(true)}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                                LIVE
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-col">
                                <p className="text-sm text-stone-500 dark:text-stone-400 font-bold capitalize">{dateStr}</p>
                                <p className="text-[10px] text-calitri-terra font-medium italic">✝ {saint}</p>
                            </div>
                            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium self-end mb-0.5">Aggiornato {lastUpdated}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Webcam Fullscreen Modal */}
            {
                isWebcamExpanded && (
                    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsWebcamExpanded(false)}>
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors"
                            onClick={() => setIsWebcamExpanded(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={webcamUrl}
                                className="w-full h-full object-contain bg-black"
                                alt="Vista Calitri Fullscreen"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <span className="text-white font-bold tracking-wider text-sm">LIVE</span>
                                </div>
                                <h2 className="text-white text-2xl font-bold">Vista Panoramica Calitri</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
