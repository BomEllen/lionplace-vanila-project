import { resolve } from 'node:path'
import { defineConfig } from 'vite'





export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // '@'를 'src' 디렉토리로 매핑
    },
  },
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        navitems: resolve(__dirname, "src/layout/navitems/index.html"),
      },
    },
  },
});