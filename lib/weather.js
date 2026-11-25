import { APP_CONFIG } from "@/config/app";

const LAT = APP_CONFIG.coordinates.latitude;
const LON = APP_CONFIG.coordinates.longitude;

// WMO Weather interpretation codes (WW), complete list used by Open-Meteo.
// Icons are OpenWeatherMap icon ids without the day/night suffix.
const wmoCodes = {
    0: { description: "Cielo sereno", icon: "01" },
    1: { description: "Prevalentemente sereno", icon: "02" },
    2: { description: "Nuvolosità parziale", icon: "03" },
    3: { description: "Nuvoloso", icon: "04" },
    45: { description: "Nebbia", icon: "50" },
    48: { description: "Nebbia con brina", icon: "50" },
    51: { description: "Pioggerella leggera", icon: "09" },
    53: { description: "Pioggerella moderata", icon: "09" },
    55: { description: "Pioggerella densa", icon: "09" },
    56: { description: "Pioggerella gelata leggera", icon: "09" },
    57: { description: "Pioggerella gelata densa", icon: "09" },
    61: { description: "Pioggia leggera", icon: "10" },
    63: { description: "Pioggia moderata", icon: "10" },
    65: { description: "Pioggia forte", icon: "10" },
    66: { description: "Pioggia gelata leggera", icon: "13" },
    67: { description: "Pioggia gelata forte", icon: "13" },
    71: { description: "Neve leggera", icon: "13" },
    73: { description: "Neve moderata", icon: "13" },
    75: { description: "Neve forte", icon: "13" },
    77: { description: "Nevischio", icon: "13" },
    80: { description: "Rovesci leggeri", icon: "09" },
    81: { description: "Rovesci moderati", icon: "09" },
    82: { description: "Rovesci violenti", icon: "09" },
    85: { description: "Rovesci di neve leggeri", icon: "13" },
    86: { description: "Rovesci di neve forti", icon: "13" },
    95: { description: "Temporale", icon: "11" },
    96: { description: "Temporale con grandine", icon: "11" },
    99: { description: "Temporale forte con grandine", icon: "11" },
};

/** Description + icon for a WMO code. isDay comes from Open-Meteo's is_day (1/0). */
export function resolveWmo(code, isDay = true) {
    const entry = wmoCodes[code];
    if (!entry) return { description: "Variabile", icon: "02d" };
    return { description: entry.description, icon: `${entry.icon}${isDay ? "d" : "n"}` };
}

const isMissing = (value) => value === null || value === undefined || Number.isNaN(Number(value));

/** Rounded temperature for display. 0 °C is a real value, not "missing". */
export function formatTemperature(value) {
    if (isMissing(value)) return "--";
    const rounded = Math.round(Number(value));
    return String(rounded === 0 ? 0 : rounded); // avoid "-0"
}

/** Humidity / wind for display: 0 is shown as 0, missing as "--". */
export function formatMeasure(value) {
    if (isMissing(value)) return "--";
    return String(value);
}

export async function getCurrentWeather() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&timezone=auto&wind_speed_unit=ms`;
        const res = await fetch(url, { next: { revalidate: 900 } }); // Cache di 15 min
        if (!res.ok) throw new Error("Failed to fetch Open-Meteo");
        const data = await res.json();

        const current = data.current;
        const wmo = resolveWmo(current.weather_code, current.is_day !== 0);

        return {
            weather: [{ main: wmo.description, description: wmo.description, icon: wmo.icon }],
            main: { temp: current.temperature_2m, humidity: current.relative_humidity_2m },
            wind: { speed: current.wind_speed_10m },
            dt: Date.now() / 1000,
            name: "Calitri"
        };
    } catch (error) {
        console.error("Weather Error:", error);
        return null;
    }
}

export async function getForecast() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,relative_humidity_2m,precipitation,wind_speed_10m,is_day&timezone=auto&wind_speed_unit=ms`;
        const res = await fetch(url, { next: { revalidate: 1800 } }); // Cache di 30 min
        if (!res.ok) throw new Error("Failed to fetch Open-Meteo Forecast");
        const data = await res.json();

        // Map daily data
        const list = data.daily.time.map((time, index) => {
            const wmo = resolveWmo(data.daily.weather_code[index]);
            const tempAvg = (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2;

            return {
                dt: Math.floor(new Date(time).getTime() / 1000),
                dt_txt: `${time} 12:00:00`,
                main: { temp: tempAvg, temp_min: data.daily.temperature_2m_min[index], temp_max: data.daily.temperature_2m_max[index] },
                weather: [{ main: wmo.description, description: wmo.description, icon: wmo.icon }],
                dateStr: time // YYYY-MM-DD
            };
        });

        // Map hourly data grouped by date
        const hourlyByDate = {};
        data.hourly.time.forEach((t, i) => {
            const dateKey = t.split("T")[0]; // Extract YYYY-MM-DD
            if (!hourlyByDate[dateKey]) hourlyByDate[dateKey] = [];

            const wmo = resolveWmo(data.hourly.weather_code[i], data.hourly.is_day?.[i] !== 0);
            hourlyByDate[dateKey].push({
                time: t.split("T")[1].slice(0, 5), // HH:MM
                temp: data.hourly.temperature_2m[i] ?? 0,
                humidity: data.hourly.relative_humidity_2m[i] ?? 0,
                precipitation: data.hourly.precipitation[i] ?? 0,
                wind: data.hourly.wind_speed_10m[i] ?? 0,
                icon: wmo.icon,
                description: wmo.description
            });
        });

        return { list, hourly: hourlyByDate };
    } catch (error) {
        console.error("Forecast Error:", error);
        return null;
    }
}
