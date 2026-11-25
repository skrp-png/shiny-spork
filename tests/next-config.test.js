import { describe, it, expect } from "vitest";
import nextConfig from "../next.config.mjs";

describe("next.config images", () => {
    it("does not turn the image optimizer into an open proxy for any host", () => {
        const patterns = nextConfig.images?.remotePatterns ?? [];
        const wildcard = patterns.filter((p) => !p.hostname || p.hostname === "**" || p.hostname === "*");
        expect(wildcard).toEqual([]);
    });
});
