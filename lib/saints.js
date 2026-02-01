export async function getSaintOfTheDay() {
    try {
        const res = await fetch("https://www.santodelgiorno.it/santi.json");
        if (!res.ok) throw new Error("Failed to fetch saint");
        const data = await res.json();

        // The API returns an array of saints for the day.
        // Example: [{ name: "San Gabriele", ... }, { name: "San Michele", ... }]
        // We'll take the first one as the primary saint.

        if (data && data.length > 0) {
            return data[0].nome;
        }

        return "Tutti i Santi";
    } catch (error) {
        console.error("Saint Fetch Error:", error);
        // Fallback to a generic message or a mock if completely offline
        return "Santo del Giorno";
    }
}
