import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve("index.html"),
        privacy: resolve("privacy/index.html"),
        homeEn: resolve("en/index.html"),
        privacyEn: resolve("en/privacy/index.html"),
        homeJa: resolve("ja/index.html"),
        privacyJa: resolve("ja/privacy/index.html"),
      },
    },
  },
});
