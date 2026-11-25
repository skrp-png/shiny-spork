import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// The app is served over HTTPS: http:// resources are mixed content (blocked or
// auto-upgraded by browsers). XML namespaces are identifiers, not requests.
describe("app source", () => {
    it("loads no resources over plain http://", () => {
        const files = execSync("git ls-files --cached --others --exclude-standard app components lib public", { encoding: "utf8" })
            .split("\n")
            .filter((f) => /\.(js|jsx|mjs|ts|tsx|css|json)$/.test(f));
        const hits = [];
        for (const f of files) {
            readFileSync(f, "utf8").split("\n").forEach((line, i) => {
                if (/http:\/\//.test(line) && !/www\.w3\.org|xmlns/.test(line)) hits.push(`${f}:${i + 1}`);
            });
        }
        expect(hits).toEqual([]);
    });
});
