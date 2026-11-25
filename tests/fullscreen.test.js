import { describe, it, expect } from "vitest";
import { supportsNativeFullscreen } from "@/lib/fullscreen";

describe("supportsNativeFullscreen", () => {
    it("is true on browsers with the standard Fullscreen API", () => {
        expect(supportsNativeFullscreen({ fullscreenEnabled: true })).toBe(true);
    });

    it("is true on older Safari (iPad / macOS) with the webkit prefix", () => {
        expect(supportsNativeFullscreen({ webkitFullscreenEnabled: true })).toBe(true);
    });

    it("is false on iPhone Safari, where elements can't go fullscreen", () => {
        expect(supportsNativeFullscreen({ fullscreenEnabled: false })).toBe(false);
        expect(supportsNativeFullscreen({})).toBe(false);
    });

    it("is false without a document (server rendering)", () => {
        expect(supportsNativeFullscreen(undefined)).toBe(false);
    });
});
