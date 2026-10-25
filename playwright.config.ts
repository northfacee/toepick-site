import { defineConfig } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT || "4173";
const baseURL = `http://127.0.0.1:${port}/`;

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL,
    browserName: "chromium",
  },
  webServer: {
    command: `npm run preview -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_PORT,
  },
  reporter: "list",
});
