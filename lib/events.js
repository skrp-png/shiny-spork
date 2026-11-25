// Recurring events expansion.
// All arithmetic is done on calendar dates in UTC, so the result does not depend on the
// timezone the code runs in (server = UTC, browser = Europe/Rome) nor on DST changes.

const YEARS_AHEAD = 5;

function parseDateOnly(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value ?? ""));
    if (!match) return null;
    const [, y, m, d] = match.map(Number);
    return { y, m: m - 1, d };
}

const daysInMonth = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

const toDateStr = (ms) => new Date(ms).toISOString().slice(0, 10);

/** k-th occurrence after the base date (k >= 1), or null for unknown patterns. */
function occurrence(base, pattern, k) {
    switch (pattern) {
        case "daily":
            return Date.UTC(base.y, base.m, base.d + k);
        case "weekly":
            return Date.UTC(base.y, base.m, base.d + 7 * k);
        case "monthly": {
            // Always computed from the base date: an event on the 31st falls on the
            // last day of shorter months and returns to the 31st afterwards.
            const y = base.y + Math.floor((base.m + k) / 12);
            const m = (base.m + k) % 12;
            return Date.UTC(y, m, Math.min(base.d, daysInMonth(y, m)));
        }
        case "yearly": {
            const y = base.y + k;
            return Date.UTC(y, base.m, Math.min(base.d, daysInMonth(y, base.m)));
        }
        default:
            return null;
    }
}

/**
 * Returns the source events plus one generated copy per future occurrence of
 * recurring events, up to YEARS_AHEAD years after `now`.
 */
export function expandRecurringEvents(events, now = new Date()) {
    const limit = Date.UTC(now.getFullYear() + YEARS_AHEAD, now.getMonth(), now.getDate());
    const expanded = [];

    for (const event of events || []) {
        expanded.push(event);

        const pattern = String(event.recurring_pattern || "").toLowerCase();
        const base = event.recurring && parseDateOnly(event.date);
        if (!base || occurrence(base, pattern, 1) === null) continue;

        for (let k = 1; ; k++) {
            const ms = occurrence(base, pattern, k);
            if (ms > limit) break;
            const date = toDateStr(ms);
            expanded.push({ ...event, id: `${event.id}_${date}`, date, is_generated: true });
        }
    }

    return expanded;
}
