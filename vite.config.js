import { resolve } from 'node:path'
import { defineConfig } from 'vite'





export default defineConfig({
  build: {
    outDir:'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        
      },
    },
    
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
        $foundation-primary-color: #FF7710;   
        $foundation-secondary-color: #19172E; 
        $foundation-accent-color: #FFFFFF;    
        $content-primary-color: #19172E;      
        $content-secondary-color: #6B6B6B;  
        $content-tertiary-color: #A6A6A6;
      `,  
      },
    },
  },
})