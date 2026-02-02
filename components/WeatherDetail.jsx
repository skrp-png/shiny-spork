"use client";

import { useState, useEffect } from "react";
import { Wind, Droplets, Calendar, Clock, CloudRain } from "lucide-react";
import { formatTime } from "@/lib/utils";

const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

export default function WeatherDetail({ current, forecast }) {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (forecast?.list?.length > 0 && !selectedDate) {
            setSelectedDate(forecast.list[0].dateStr);
        }
    }, [forecast, selectedDate]);

    if (!forecast || !selectedDate) return null;

    // Find the selected day's summary
    const selectedDaySummary = forecast?.list?.find(d => d.dateStr === selectedDate);

    // Get hourly data for the selected day and filter if it's today
    const rawHourlyData = forecast?.hourly?.[selectedDate] || [];
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const currentHour = now.getHours();

    const hourlyData = selectedDate === todayStr
        ? rawHourlyData.filter(h => parseInt(h.time.split(':')[0]) >= currentHour)
        : rawHourlyData;

    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] bg-white dark:bg-[#1a1a1a]">
            <div className="flex-1 px-6 pb-6">
                {/* Current / Selected Day Summary Header */}
                <div className="text-center mb-8 pt-6">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">
                        {selectedDate === todayStr ? "Meteo Adesso" : `Previsioni ${new Date(selectedDate).toLocaleDateString("it-IT", { weekday: 'long', day: 'numeric', month: 'short' })}`}
                    </p>
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={getIconUrl(selectedDate === todayStr ? current?.weather[0]?.icon : selectedDaySummary?.weather[0]?.icon)}
                                alt=""
                                className="w-32 h-32 -my-2 drop-shadow-2xl"
                            />
                        </div>
                        <h2 className="text-7xl font-black text-calitri-dark dark:text-white tracking-tighter leading-none mb-1">
                            {Math.round(selectedDate === todayStr ? current?.main?.temp : selectedDaySummary?.main?.temp)}°
                        </h2>
                        <p className="text-xl font-medium text-stone-400 capitalize">
                            {selectedDate === todayStr ? current?.weather[0]?.description : selectedDaySummary?.weather[0]?.description}
                        </p>
                    </div>
                    {selectedDate !== todayStr && (
                        <div className="flex justify-center gap-4 text-sm font-bold mt-4">
                            <span className="text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-1.5 rounded-full border border-red-100/50 dark:border-red-900/30 text-xs">Max {Math.round(selectedDaySummary?.main?.temp_max || 0)}°</span>
                        </div>
                    )}
                </div>

                {/* Hourly List */}
                <div className="mb-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase mb-4 flex items-center gap-2 tracking-wider px-1">
                        <Clock className="w-4 h-4" /> Orario {new Date(selectedDate).toLocaleDateString("it-IT", { weekday: 'short' })}
                    </h3>

                    <div className="space-y-2.5">
                        {hourlyData.map((hour, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-100 dark:border-stone-700 hover:border-blue-200 transition-all group">
                                <div className="flex items-center gap-4 w-24">
                                    <span className="text-sm font-bold text-stone-500 dark:text-stone-300">{formatTime(hour.time)}</span>
                                    <img src={getIconUrl(hour.icon)} className="w-10 h-10 -my-2" alt="" />
                                </div>

                                <div className="flex-1 flex justify-center">
                                    <span className="text-xl font-black text-calitri-dark dark:text-white group-hover:text-blue-600 transition-colors">{Math.round(hour.temp)}°</span>
                                </div>

                                <div className="flex items-center gap-4 text-[10px] font-bold text-stone-400 uppercase">
                                    <div className="flex flex-col items-center gap-0.5 min-w-[38px]">
                                        <Droplets className="w-4 h-4 text-blue-400" />
                                        <span>{hour.humidity || 0}%</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5 min-w-[38px]">
                                        <CloudRain className="w-4 h-4 text-blue-500" />
                                        <span>{(hour.precipitation || 0).toFixed(1)}mm</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5 min-w-[38px]">
                                        <Wind className="w-4 h-4 text-stone-400" />
                                        <span>{Math.round(hour.wind || 0)}<span className="lowercase ml-0.5">m/s</span></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {hourlyData.length === 0 && (
                            <div className="text-center py-10 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-dashed border-stone-200 dark:border-stone-700">
                                <p className="text-sm text-stone-400 italic">Dati orari non disponibili per questa fascia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Selection Bar Placeholder/Spacing */}
            <div className="h-40"></div>

            {/* Future Days Horizontal List (Sticky Footer) sitting above BottomNav */}
            <div className="fixed bottom-[84px] left-0 right-0 z-20 md:max-w-md md:mx-auto bg-white dark:bg-[#222222] border-t border-stone-100 dark:border-stone-800 px-6 py-6 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] rounded-t-[2.5rem]">
                <h3 className="text-xs font-bold text-stone-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                    <Calendar className="w-4 h-4" /> Prossimi Giorni
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {forecast?.list?.map((day, idx) => {
                        const date = new Date(day.dt * 1000);
                        const dayShort = date.toLocaleDateString("it-IT", { weekday: "short" });
                        const dayDate = date.toLocaleDateString("it-IT", { day: "numeric" });
                        const isSelected = selectedDate === day.dateStr;

                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedDate(day.dateStr)}
                                className={`flex-shrink-0 flex flex-col items-center p-4 rounded-3xl min-w-[85px] transition-all cursor-pointer snap-start border ${isSelected
                                    ? 'bg-blue-500 text-white border-blue-500 shadow-xl shadow-blue-400/20 scale-105'
                                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-100 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700/50 active:scale-95'
                                    }`}
                            >
                                <span className={`text-[10px] font-bold uppercase tracking-tight ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>{dayShort}</span>
                                <span className={`text-xl font-black my-1 ${isSelected ? 'text-white' : 'text-calitri-dark dark:text-white'}`}>{dayDate}</span>
                                <img
                                    src={getIconUrl(day.weather[0].icon)}
                                    alt=""
                                    className="w-8 h-8 my-1"
                                />
                                <div className="flex gap-1.5 mt-1">
                                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-200'}`}>{Math.round(day.main.temp_max)}°</span>
                                    <span className={`text-xs font-medium ${isSelected ? 'text-white/60' : 'text-stone-400'}`}>{Math.round(day.main.temp_min)}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Solid Safety Cover for bottom area (covers the BottomNav space) */}
            <div className="fixed bottom-0 left-0 right-0 h-[84px] bg-white dark:bg-[#222222] z-20 md:max-w-md md:mx-auto"></div>
        </div>
    );
}
