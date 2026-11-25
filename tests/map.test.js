import { describe, it, expect } from "vitest";
import { withValidCoordinates } from "@/lib/map";

describe("withValidCoordinates", () => {
    it("keeps points with numeric lat/lng", () => {
        const p = { id: 1, coordinates: { lat: 40.9, lng: 15.43 } };
        expect(withValidCoordinates([p])).toEqual([p]);
    });

    it("drops points with null, missing or non-numeric coordinates (would crash Leaflet)", () => {
        const points = [
            { id: 1, coordinates: { lat: null, lng: null } },
            { id: 2, coordinates: { lat: 40.9, lng: undefined } },
            { id: 3 },
            { id: 4, coordinates: { lat: "abc", lng: 15 } },
            { id: 5, coordinates: { lat: 40.9, lng: 15.43 } },
        ];
        expect(withValidCoordinates(points).map((p) => p.id)).toEqual([5]);
    });

    it("keeps coordinate 0 (valid number)", () => {
        expect(withValidCoordinates([{ id: 1, coordinates: { lat: 0, lng: 0 } }])).toHaveLength(1);
    });

    it("handles a missing list", () => {
        expect(withValidCoordinates(undefined)).toEqual([]);
    });
});
