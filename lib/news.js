const WORDS_PER_MINUTE = 200;

/** Estimated reading time in minutes (min 1). Safe on null/empty content. */
export function readingTimeMinutes(text) {
    const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

const STANDARD_CATEGORIES = ["Notizie", "Storia", "Tradizioni"];

/**
 * Filter buttons for the news page, built from the categories actually used.
 * Standard ones first (in their usual order), then any other category (e.g. from the
 * Telegram bot) alphabetically. Categories with no articles are not shown.
 */
export function getNewsCategories(news) {
    const used = new Set((news || []).map((n) => n?.category).filter(Boolean));
    const standard = STANDARD_CATEGORIES.filter((c) => used.has(c));
    const others = [...used].filter((c) => !STANDARD_CATEGORIES.includes(c)).sort((a, b) => a.localeCompare(b, "it"));
    return ["Tutte", ...standard, ...others];
}
