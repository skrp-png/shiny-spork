import { describe, it, expect } from "vitest";
import { shouldAutoOpenInstallGuide } from "@/lib/pwa";

const base = { isStandalone: false, hasSeen: false, autoOpen: true };

describe("shouldAutoOpenInstallGuide", () => {
    it("opens on the first visit in the browser", () => {
        expect(shouldAutoOpenInstallGuide(base)).toBe(true);
    });

    it("does not nag again once the user has seen/closed it (also when Android offers native install)", () => {
        expect(shouldAutoOpenInstallGuide({ ...base, hasSeen: true })).toBe(false);
    });

    it("never opens when the app is already installed", () => {
        expect(shouldAutoOpenInstallGuide({ ...base, isStandalone: true })).toBe(false);
    });

    it("a copy that is only opened on demand (settings page) never opens by itself", () => {
        expect(shouldAutoOpenInstallGuide({ ...base, autoOpen: false })).toBe(false);
    });
});
