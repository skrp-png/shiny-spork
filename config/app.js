// Configurazione globale dell'applicazione Buongiorno Calitri

export const APP_CONFIG = {
    // Coordinate di Calitri (AV)
    coordinates: {
        latitude: parseFloat(process.env.NEXT_PUBLIC_LATITUDE) || 40.9015,
        longitude: parseFloat(process.env.NEXT_PUBLIC_LONGITUDE) || 15.4287,
    },
    // Altre costanti e configurazioni dell'applicazione
    brandName: "Buongiorno Calitri",
    defaultTheme: "system",
};
