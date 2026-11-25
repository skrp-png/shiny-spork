import { describe, it, expect } from "vitest";
import { expandRecurringEvents } from "@/lib/events";

const NOW = new Date(2026, 0, 1); // 1 Jan 2026, local time

const datesOf = (events, id) =>
    events.filter((e) => String(e.id).startsWith(String(id))).map((e) => e.date);

describe("expandRecurringEvents", () => {
    it("runs in the Italian timezone (precondition for the DST tests)", () => {
        expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe("Europe/Rome");
    });

    it("keeps non-recurring events unchanged", () => {
        const ev = { id: 1, date: "2026-03-10", recurring: false };
        expect(expandRecurringEvents([ev], NOW)).toEqual([ev]);
    });

    it("weekly event created in winter stays on the same weekday after summer time starts", () => {
        // Monday 5 Jan 2026, DST starts Sunday 29 Mar 2026
        const ev = { id: 7, date: "2026-01-05", recurring: true, recurring_pattern: "weekly" };
        const dates = datesOf(expandRecurringEvents([ev], NOW), 7);
        expect(dates).toContain("2026-03-30");
        expect(dates).toContain("2026-04-06");
        expect(dates).not.toContain("2026-04-05");
        // every generated date must be a Monday
        for (const d of dates) {
            expect(new Date(`${d}T12:00:00Z`).getUTCDay()).toBe(1);
        }
    });

    it("daily event has exactly one occurrence per day across DST", () => {
        const ev = { id: 9, date: "2026-03-27", recurring: true, recurring_pattern: "daily" };
        const dates = datesOf(expandRecurringEvents([ev], NOW), 9);
        expect(dates.slice(0, 5)).toEqual([
            "2026-03-27", "2026-03-28", "2026-03-29", "2026-03-30", "2026-03-31",
        ]);
    });

    it("monthly event on the 31st falls on the last day of shorter months, without drifting", () => {
        const ev = { id: 3, date: "2026-01-31", recurring: true, recurring_pattern: "monthly" };
        const dates = datesOf(expandRecurringEvents([ev], NOW), 3);
        expect(dates.slice(0, 4)).toEqual(["2026-01-31", "2026-02-28", "2026-03-31", "2026-04-30"]);
    });

    it("yearly event keeps its calendar date", () => {
        const ev = { id: 4, date: "2025-08-15", recurring: true, recurring_pattern: "yearly" };
        const dates = datesOf(expandRecurringEvents([ev], NOW), 4);
        expect(dates.slice(0, 3)).toEqual(["2025-08-15", "2026-08-15", "2027-08-15"]);
    });

    it("generated occurrences get unique ids and are flagged", () => {
        const ev = { id: 5, date: "2026-01-05", recurring: true, recurring_pattern: "weekly" };
        const out = expandRecurringEvents([ev], NOW);
        expect(out[1]).toMatchObject({ id: "5_2026-01-12", date: "2026-01-12", is_generated: true });
        expect(new Set(out.map((e) => e.id)).size).toBe(out.length);
    });

    it("stops 5 years after today and ignores unknown patterns or invalid dates", () => {
        const weekly = { id: 6, date: "2026-01-05", recurring: true, recurring_pattern: "weekly" };
        const last = datesOf(expandRecurringEvents([weekly], NOW), 6).at(-1);
        expect(last <= "2031-01-01").toBe(true);
        expect(last >= "2030-12-25").toBe(true);

        const odd = { id: 8, date: "2026-01-05", recurring: true, recurring_pattern: "biweekly" };
        const bad = { id: 10, date: "not-a-date", recurring: true, recurring_pattern: "weekly" };
        expect(expandRecurringEvents([odd, bad], NOW)).toEqual([odd, bad]);
    });
});
