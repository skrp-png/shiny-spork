import { describe, it, expect } from "vitest";
import {
    isServiceRoleRequest,
    isValidTelegramSecret,
    sanitizePushUrl,
} from "../supabase/functions/_shared/security.ts";

const SERVICE_KEY = "service-role-key-123";

describe("isServiceRoleRequest (send-push caller check)", () => {
    it("accepts the service role key as bearer token", () => {
        expect(isServiceRoleRequest(`Bearer ${SERVICE_KEY}`, SERVICE_KEY)).toBe(true);
    });

    it("rejects the public anon key", () => {
        expect(isServiceRoleRequest("Bearer public-anon-key", SERVICE_KEY)).toBe(false);
    });

    it("rejects a missing Authorization header", () => {
        expect(isServiceRoleRequest(null, SERVICE_KEY)).toBe(false);
    });

    it("rejects everything when the service key is not configured", () => {
        expect(isServiceRoleRequest("Bearer ", "")).toBe(false);
        expect(isServiceRoleRequest("Bearer undefined", undefined)).toBe(false);
    });
});

describe("isValidTelegramSecret (webhook origin check)", () => {
    it("accepts the configured secret token", () => {
        expect(isValidTelegramSecret("s3cret", "s3cret")).toBe(true);
    });

    it("rejects a wrong or missing header", () => {
        expect(isValidTelegramSecret("wrong", "s3cret")).toBe(false);
        expect(isValidTelegramSecret(null, "s3cret")).toBe(false);
    });

    it("fails closed when no secret is configured", () => {
        expect(isValidTelegramSecret(null, undefined)).toBe(false);
        expect(isValidTelegramSecret("", "")).toBe(false);
    });
});

describe("sanitizePushUrl (no external links in notifications)", () => {
    it("keeps internal paths", () => {
        expect(sanitizePushUrl("/eventi")).toBe("/eventi");
        expect(sanitizePushUrl("/news?id=3")).toBe("/news?id=3");
    });

    it("replaces external and protocol-relative URLs with home", () => {
        expect(sanitizePushUrl("https://evil.example/login")).toBe("/");
        expect(sanitizePushUrl("//evil.example")).toBe("/");
        expect(sanitizePushUrl("javascript:alert(1)")).toBe("/");
        expect(sanitizePushUrl("/\\evil.example")).toBe("/");
    });

    it("defaults to home for empty values", () => {
        expect(sanitizePushUrl(undefined)).toBe("/");
        expect(sanitizePushUrl("")).toBe("/");
    });
});
