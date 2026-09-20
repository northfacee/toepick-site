import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig({
  base: "/toepick-site/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve("index.html"),
        privacy: resolve("privacy/index.html"),
      },
    },
  },
});
