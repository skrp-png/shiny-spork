import { describe, it, expect } from "vitest";
import { readingTimeMinutes } from "@/lib/news";

describe("readingTimeMinutes", () => {
    it("counts about 200 words per minute, rounded up", () => {
        expect(readingTimeMinutes("parola ".repeat(200).trim())).toBe(1);
        expect(readingTimeMinutes("parola ".repeat(201).trim())).toBe(2);
    });

    it("does not crash on empty content (DB column is nullable)", () => {
        expect(readingTimeMinutes(null)).toBe(1);
        expect(readingTimeMinutes(undefined)).toBe(1);
        expect(readingTimeMinutes("")).toBe(1);
    });
});

import { getNewsCategories } from "@/lib/news";

describe("getNewsCategories", () => {
    it("always starts with 'Tutte'", () => {
        expect(getNewsCategories([])).toEqual(["Tutte"]);
    });

    it("includes categories sent by the Telegram bot that are not in the fixed list", () => {
        const news = [{ category: "Notizie" }, { category: "Eventi" }];
        expect(getNewsCategories(news)).toContain("Eventi");
    });

    it("lists the standard categories first, then others alphabetically, without duplicates or empty values", () => {
        const news = [
            { category: "Sport" }, { category: "Storia" }, { category: "Eventi" },
            { category: "Notizie" }, { category: "Storia" }, { category: "" }, { category: null },
        ];
        expect(getNewsCategories(news)).toEqual(["Tutte", "Notizie", "Storia", "Eventi", "Sport"]);
    });

    it("hides standard categories that have no articles", () => {
        expect(getNewsCategories([{ category: "Storia" }])).toEqual(["Tutte", "Storia"]);
    });
});
