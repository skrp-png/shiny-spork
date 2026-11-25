// Security helpers shared by the Edge Functions.
// Pure TypeScript with no imports so it runs both in Deno (Supabase) and in Vitest.

/** Constant-time string comparison, to avoid leaking secrets through timing. */
function safeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

/**
 * True only if the request carries the service role key as bearer token.
 * The public anon key (shipped to every browser) must NOT be able to send pushes.
 */
export function isServiceRoleRequest(
    authHeader: string | null | undefined,
    serviceRoleKey: string | null | undefined,
): boolean {
    if (!serviceRoleKey || !authHeader) return false;
    const prefix = "Bearer ";
    if (!authHeader.startsWith(prefix)) return false;
    return safeEqual(authHeader.slice(prefix.length), serviceRoleKey);
}

/**
 * Checks the X-Telegram-Bot-Api-Secret-Token header sent by Telegram
 * (configured with setWebhook's secret_token). Fails closed if not configured.
 */
export function isValidTelegramSecret(
    headerValue: string | null | undefined,
    expectedSecret: string | null | undefined,
): boolean {
    if (!expectedSecret || !headerValue) return false;
    return safeEqual(headerValue, expectedSecret);
}

/** Only allow internal paths ("/something") as notification targets. */
export function sanitizePushUrl(url: string | null | undefined): string {
    if (!url || typeof url !== "string") return "/";
    if (!url.startsWith("/")) return "/";
    // "//host" and "/\host" are treated by browsers as protocol-relative external URLs
    if (url.startsWith("//") || url.startsWith("/\\")) return "/";
    return url;
}
