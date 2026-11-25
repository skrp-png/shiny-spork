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
