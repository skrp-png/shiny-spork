import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Every file tracked by git (or staged/untracked but not ignored) must not contain
// a Supabase *service_role* JWT. The anon key is public by design and is allowed.
const files = execSync("git ls-files --cached --others --exclude-standard", { encoding: "utf8" })
    .split("\n")
    .filter((f) => f && !f.endsWith("package-lock.json") && !/\.(png|jpg|jpeg|ico|gif|webp)$/i.test(f));

const JWT_RE = /eyJ[A-Za-z0-9_-]+\.(eyJ[A-Za-z0-9_-]+)\.[A-Za-z0-9_-]+/g;

function serviceRoleTokensIn(text) {
    const found = [];
    for (const match of text.matchAll(JWT_RE)) {
        try {
            const payload = JSON.parse(Buffer.from(match[1], "base64url").toString("utf8"));
            if (payload.role === "service_role") found.push(match[0].slice(0, 20) + "…");
        } catch {
            /* not a JWT payload */
        }
    }
    return found;
}

describe("repository secrets", () => {
    it("contains no Supabase service_role keys", () => {
        const leaks = [];
        for (const file of files) {
            let text;
            try {
                text = readFileSync(file, "utf8");
            } catch {
                continue; // deleted in working tree
            }
            for (const token of serviceRoleTokensIn(text)) leaks.push(`${file}: ${token}`);
        }
        expect(leaks).toEqual([]);
    });
});
