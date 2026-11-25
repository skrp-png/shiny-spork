// Smoke test: starts the production build (`next start`) and checks that every page
// answers 200 without a Next.js error page. Run `npm run build` first.
// Usage: npm run test:smoke
import { spawn } from "node:child_process";
import { readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const PORT = process.env.SMOKE_PORT || "3123";
const BASE = `http://127.0.0.1:${PORT}`;

// Every folder under app/ with a page.js is a route
function findRoutes(dir = "app", prefix = "") {
    const routes = [];
    if (existsSync(join(dir, "page.js"))) routes.push(prefix || "/");
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory() && !entry.startsWith("_") && !entry.startsWith("[")) {
            routes.push(...findRoutes(full, `${prefix}/${entry}`));
        }
    }
    return routes;
}

const routes = [...findRoutes(), "/sitemap.xml", "/manifest.json", "/sw.js", "/robots.txt"];

const server = spawn("npx", ["next", "start", "-p", PORT], { stdio: ["ignore", "pipe", "pipe"] });
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

async function waitForServer(timeoutMs = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            await fetch(BASE);
            return;
        } catch {
            await new Promise((r) => setTimeout(r, 300));
        }
    }
    throw new Error("Server did not start in time:\n" + serverLog);
}

let failures = 0;
try {
    await waitForServer();
    for (const route of routes) {
        const res = await fetch(BASE + route);
        const body = await res.text();
        const crashed = /Application error|Internal Server Error/i.test(body);
        const ok = res.status === 200 && !crashed;
        if (!ok) failures++;
        console.log(`${ok ? "✓" : "✗"} ${res.status} ${route}${crashed ? "  (error page in body)" : ""}`);
    }
} catch (err) {
    console.error(err.message);
    failures++;
} finally {
    server.kill();
}

if (failures) {
    console.error(`\nSmoke test FAILED: ${failures} problem(s)`);
    process.exit(1);
}
console.log(`\nSmoke test passed: ${routes.length} routes OK`);
