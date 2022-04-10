import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".vue"]
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    // 是否开启 https
    https: false,
  }
})



