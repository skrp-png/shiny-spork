import { describe, it, expect } from "vitest";
import { resolveWmo, formatTemperature, formatMeasure } from "@/lib/weather";

// Every WMO code Open-Meteo can return
// https://open-meteo.com/en/docs (Weather variable documentation, WMO Weather interpretation codes)
const ALL_OPEN_METEO_CODES = [
    0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67,
    71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99,
];

describe("resolveWmo", () => {
    it.each(ALL_OPEN_METEO_CODES)("has a real description for code %i", (code) => {
        expect(resolveWmo(code).description).not.toBe("Variabile");
    });

    it("describes rain showers (80-82), very common in Open-Meteo data", () => {
        expect(resolveWmo(80).description.toLowerCase()).toContain("rovesci");
        expect(resolveWmo(80).icon).toBe("09d");
    });

    it("uses night icons when it is night", () => {
        expect(resolveWmo(0, false).icon).toBe("01n");
        expect(resolveWmo(61, false).icon).toBe("10n");
    });

    it("uses day icons by default and for unknown codes keeps a fallback", () => {
        expect(resolveWmo(0).icon).toBe("01d");
        expect(resolveWmo(12345)).toEqual({ description: "Variabile", icon: "02d" });
    });
});

describe("formatTemperature", () => {
    it("shows 0 °C as 0, not as missing", () => {
        expect(formatTemperature(0)).toBe("0");
    });

    it("rounds and avoids a '-0' display", () => {
        expect(formatTemperature(12.6)).toBe("13");
        expect(formatTemperature(-0.4)).toBe("0");
        expect(formatTemperature(-3.5)).toBe("-3");
    });

    it("shows -- only when the value is really missing", () => {
        expect(formatTemperature(null)).toBe("--");
        expect(formatTemperature(undefined)).toBe("--");
        expect(formatTemperature(NaN)).toBe("--");
    });
});

describe("formatMeasure", () => {
    it("shows 0 (no wind, 0% humidity) as 0", () => {
        expect(formatMeasure(0)).toBe("0");
    });

    it("keeps the value and uses -- when missing", () => {
        expect(formatMeasure(3.4)).toBe("3.4");
        expect(formatMeasure(undefined)).toBe("--");
    });
});
