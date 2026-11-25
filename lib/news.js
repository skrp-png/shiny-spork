const WORDS_PER_MINUTE = 200;

/** Estimated reading time in minutes (min 1). Safe on null/empty content. */
export function readingTimeMinutes(text) {
    const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
