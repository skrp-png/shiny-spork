import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ORIGIN = "https://b-calitri.vercel.app";
const swSource = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");

// Minimal fake of the Service Worker environment: the real sw.js runs inside it.
function loadServiceWorker({ online = true, networkBody = "fresh" } = {}) {
    const handlers = {};
    const store = new Map(); // url -> Response body
    const cache = {
        put: async (req, res) => store.set(typeof req === "string" ? req : req.url, await res.clone().text()),
        addAll: async (urls) => urls.forEach((u) => store.set(new URL(u, ORIGIN).href, `precached ${u}`)),
    };
    const match = async (req) => {
        const url = new URL(typeof req === "string" ? req : req.url, ORIGIN).href;
        return store.has(url) ? new Response(store.get(url)) : undefined;
    };
    const fetchCalls = [];
    const context = {
        self: {
            location: { origin: ORIGIN },
            addEventListener: (type, fn) => (handlers[type] = fn),
            skipWaiting: () => {},
            clients: { claim: () => {} },
            registration: {},
        },
        caches: { open: async () => ({ ...cache, match }), match, keys: async () => [], delete: async () => true },
        fetch: async (req) => {
            fetchCalls.push(typeof req === "string" ? req : req.url);
            if (!online) throw new TypeError("Failed to fetch");
            const res = new Response(networkBody, { status: 200 });
            Object.defineProperty(res, "type", { value: "basic" });
            return res;
        },
        URL, Response, Request, Headers, console,
    };
    vm.createContext(context);
    vm.runInContext(swSource, context);
    return { context, handlers, store, fetchCalls };
}

function request(path, { mode = "no-cors", method = "GET", headers = {} } = {}) {
    const url = path.startsWith("http") ? path : ORIGIN + path;
    return { url, method, mode, headers: new Headers(headers) };
}

// Runs the fetch handler; returns the Response body, or null if the SW let the browser handle it
async function dispatchFetch(sw, req) {
    let responsePromise = null;
    sw.handlers.fetch({ request: req, respondWith: (p) => (responsePromise = p) });
    if (!responsePromise) return null;
    const res = await responsePromise;
    return res ? await res.text() : undefined;
}

describe("service worker caching strategy", () => {
    let sw;
    beforeEach(() => {
        sw = loadServiceWorker();
    });

    it("uses a new cache name so old v1 caches (with stale pages) are deleted on activate", () => {
        expect(vm.runInContext("CACHE_NAME", sw.context)).not.toBe("buongiorno-calitri-v1");
    });

    it("pages are network-first", () => {
        expect(sw.context.getCacheStrategy(request("/eventi", { mode: "navigate" }), ORIGIN)).toBe("network-first");
    });

    it("hashed Next.js static assets and icons are cache-first", () => {
        expect(sw.context.getCacheStrategy(request("/_next/static/chunks/app.js"), ORIGIN)).toBe("cache-first");
        expect(sw.context.getCacheStrategy(request("/icon-192.png"), ORIGIN)).toBe("cache-first");
    });

    it("does not touch RSC data requests, other origins, POST and Edge Functions", () => {
        const { getCacheStrategy } = sw.context;
        expect(getCacheStrategy(request("/eventi?_rsc=abc"), ORIGIN)).toBe("bypass");
        expect(getCacheStrategy(request("/eventi", { headers: { RSC: "1" } }), ORIGIN)).toBe("bypass");
        expect(getCacheStrategy(request("https://xyz.supabase.co/rest/v1/news"), ORIGIN)).toBe("bypass");
        expect(getCacheStrategy(request("/", { method: "POST" }), ORIGIN)).toBe("bypass");
    });
});

describe("service worker behaviour", () => {
    it("online: a page comes from the network even if an old copy is cached", async () => {
        const sw = loadServiceWorker({ online: true, networkBody: "new version" });
        sw.store.set(ORIGIN + "/news", "old version");
        expect(await dispatchFetch(sw, request("/news", { mode: "navigate" }))).toBe("new version");
    });

    it("offline: a previously visited page is served from cache", async () => {
        const sw = loadServiceWorker({ online: false });
        sw.store.set(ORIGIN + "/news", "cached news page");
        expect(await dispatchFetch(sw, request("/news", { mode: "navigate" }))).toBe("cached news page");
    });

    it("offline: an unknown page falls back to /offline", async () => {
        const sw = loadServiceWorker({ online: false });
        sw.store.set(ORIGIN + "/offline", "offline page");
        expect(await dispatchFetch(sw, request("/mai-visitata", { mode: "navigate" }))).toBe("offline page");
    });

    it("bypassed requests are left to the browser", async () => {
        const sw = loadServiceWorker();
        expect(await dispatchFetch(sw, request("https://xyz.supabase.co/rest/v1/news"))).toBeNull();
    });
});
