const LAT = process.env.NEXT_PUBLIC_LATITUDE || 40.9015;
const LON = process.env.NEXT_PUBLIC_LONGITUDE || 15.4287;

// WMO Weather interpretation codes (WW)
const wmoCodes = {
    0: { description: "Cielo sereno", icon: "01d" },
    1: { description: "Prevalentemente sereno", icon: "02d" },
    2: { description: "Nuvolosità parziale", icon: "03d" },
    3: { description: "Nuvoloso", icon: "04d" },
    45: { description: "Nebbia", icon: "50d" },
    48: { description: "Nebbia con brina", icon: "50d" },
    51: { description: "Pioggerella leggera", icon: "09d" },
    53: { description: "Pioggerella moderata", icon: "09d" },
    55: { description: "Pioggerella densa", icon: "09d" },
    61: { description: "Pioggia leggera", icon: "10d" },
    63: { description: "Pioggia moderata", icon: "10d" },
    65: { description: "Pioggia forte", icon: "10d" },
    71: { description: "Neve leggera", icon: "13d" },
    73: { description: "Neve moderata", icon: "13d" },
    75: { description: "Neve forte", icon: "13d" },
    95: { description: "Temporale", icon: "11d" },
    96: { description: "Temporale con grandine", icon: "11d" },
    99: { description: "Temporale forte", icon: "11d" },
};

function resolveWmo(code) {
    return wmoCodes[code] || { description: "Variabile", icon: "02d" };
}

export async function getCurrentWeather() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&wind_speed_unit=ms`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch Open-Meteo");
        const data = await res.json();

        const current = data.current;
        const wmo = resolveWmo(current.weather_code);

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
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto&wind_speed_unit=ms`;
        const res = await fetch(url);
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

            const wmo = resolveWmo(data.hourly.weather_code[i]);
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
