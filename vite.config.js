import { resolve } from "node:path";
import { defineConfig } from "vite";
import inlineCssModules from "vite-plugin-inline-css-modules";

export default defineConfig({
  plugins: [inlineCssModules()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"), // '@'를 'src' 디렉토리로 매핑
    },
  },
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        profileAll: resolve(__dirname, "src/components/profile-all/index.html"),
      },
    },
  },
});
