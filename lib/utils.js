/**
 * Formats a time string (HH:mm:ss or HH:mm) to HH:mm
 * @param {string} timeStr - The time string to format
 * @returns {string} - Formatted time string
 */
export function formatTime(timeStr) {
    if (!timeStr) return "";
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
}
