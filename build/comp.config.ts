const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
        entry: path.resolve(__dirname, '../index.ts'),
        name: 'scene-ui',
        formats: ['es', 'umd', 'cjs', 'iife'],
        fileName: (format) => `scene-ui.${format}.ts`
    },
    
    minify: "terser",
    cssCodeSplit: true,
    outDir: "comp-dist",
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".vue"]
  },
  plugins: [vue()],
})