import { resolve } from "node:path";
import { defineConfig } from "vite";
import inlineCssModules from "vite-plugin-inline-css-modules";

export default defineConfig({
  plugins: [inlineCssModules()],
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/pages/login/index.html"),
        register: resolve(__dirname, "src/pages/register/index.html"),
        feed: resolve(__dirname, "src/pages/feed/index.html"),
      },
    },
  },
});
