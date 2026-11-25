import { describe, it, expect } from "vitest";
import { getHomeEvent, getUpcomingEvents, toLocalDateStr } from "@/lib/events";

const TODAY = new Date(2026, 5, 10, 15, 30); // 10 June 2026, 15:30 local

const ev = (id, date, time = null) => ({ id, date, time });

describe("toLocalDateStr", () => {
    it("formats the local calendar date, not the UTC one", () => {
        // 00:30 in Rome on 1 July = 22:30 UTC on 30 June
        expect(toLocalDateStr(new Date(2026, 6, 1, 0, 30))).toBe("2026-07-01");
    });
});

describe("getHomeEvent (home page widget)", () => {
    it("returns null when there are no events, so the widget can show an empty state", () => {
        expect(getHomeEvent([], TODAY)).toBeNull();
        expect(getHomeEvent(undefined, TODAY)).toBeNull();
    });

    it("returns null when all events are in the past", () => {
        expect(getHomeEvent([ev(1, "2026-06-01")], TODAY)).toBeNull();
    });

    it("prefers today's events, earliest time first", () => {
        const result = getHomeEvent(
            [ev(1, "2026-06-11", "09:00"), ev(2, "2026-06-10", "21:00:00"), ev(3, "2026-06-10", "18:00:00")],
            TODAY
        );
        expect(result).toEqual({ event: ev(3, "2026-06-10", "18:00:00"), isToday: true });
    });

    it("otherwise returns the next upcoming event", () => {
        const result = getHomeEvent([ev(1, "2026-07-01"), ev(2, "2026-06-12"), ev(3, "2026-05-01")], TODAY);
        expect(result).toEqual({ event: ev(2, "2026-06-12"), isToday: false });
    });
});

describe("getUpcomingEvents ('Prossimi eventi' list)", () => {
    it("never includes past events", () => {
        const list = getUpcomingEvents([ev(1, "2026-01-15"), ev(2, "2026-06-09"), ev(3, "2026-06-20")], "2026-06-10", TODAY);
        expect(list.map((e) => e.id)).toEqual([3]);
    });

    it("excludes the selected day (already shown above) and sorts by date then time", () => {
        const list = getUpcomingEvents(
            [ev(1, "2026-06-15", "21:00"), ev(2, "2026-06-10"), ev(3, "2026-06-12"), ev(4, "2026-06-15", "10:00")],
            "2026-06-10",
            TODAY
        );
        expect(list.map((e) => e.id)).toEqual([3, 4, 1]);
    });

    it("includes today's events when another day is selected", () => {
        const list = getUpcomingEvents([ev(1, "2026-06-10")], "2026-06-20", TODAY);
        expect(list.map((e) => e.id)).toEqual([1]);
    });

    it("only looks one year ahead, so daily recurring events don't flood the list", () => {
        const list = getUpcomingEvents([ev(1, "2026-12-31"), ev(2, "2027-06-10"), ev(3, "2027-06-11")], "2026-06-10", TODAY);
        expect(list.map((e) => e.id)).toEqual([1, 2]);
    });
});
