import { resolve } from "node:path";
import { defineConfig } from "vite";
import inlineCssModules from "vite-plugin-inline-css-modules";

export default defineConfig({
  plugins: [inlineCssModules()],
  resolve: {
    alias: {
      "@": "/src",
      // "@": resolve(__dirname, "/src"), // '@'를 'src' 디렉토리로 매핑
    },
  },
  base: "./",
  build: {
    outDir: "docs",
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
