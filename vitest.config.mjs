import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Run tests in the users' timezone: several date bugs only show up with Italian DST.
process.env.TZ = "Europe/Rome";

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./", import.meta.url)),
        },
    },
    test: {
        environment: "node",
        include: ["tests/**/*.test.{js,mjs,ts}"],
    },
});
