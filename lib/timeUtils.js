/**
 * Restituisce il saluto corretto in base all'ora del giorno
 * @returns {string} "Buongiorno", "Buon pomeriggio", "Buonasera" o "Buonanotte"
 */
export function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Buongiorno";
    } else if (hour >= 12 && hour < 18) {
        return "Buon pomeriggio";
    } else if (hour >= 18 && hour < 22) {
        return "Buonasera";
    } else {
        return "Buonanotte";
    }
}
