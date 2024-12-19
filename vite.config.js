import { resolve } from "node:path";
import { defineConfig } from "vite";
import inlineCssModules from "vite-plugin-inline-css-modules";

export default defineConfig({
  plugins: [inlineCssModules()],
  base: "./",
  resolve: {
    alias: {
      "@": "/src",
      // "@": resolve(__dirname, "/src"), // '@'를 'src' 디렉토리로 매핑
    },
  },
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/pages/login/index.html"),
        register: resolve(__dirname, "src/pages/register/index.html"),
        feed: resolve(__dirname, "src/pages/feed/index.html"),
        visitRecord: resolve(__dirname, "src/pages/visit-record/index.html"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
         @import "./src/assets/sass/variables.scss";
         @import "./src/assets/sass/mixins.scss";
        `,
      },
    },
  },
});
