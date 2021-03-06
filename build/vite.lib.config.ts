import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // svgLoader(),
    dts({
        include: [
        'src/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.tsx',
        'src/**/*.vue',
        'index.ts',
        'package/**/*.ts',
        'package/**/*.d.ts',
        'package/**/*.tsx',
        'package/**/*.vue'
        ],
    }),
        
       
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, '../index.ts'),
      name: 'scene-ui',
      fileName: (format: string) => `scene-ui.${format}.js`,
    },
    cssCodeSplit: true,
    outDir: "dist",
    rollupOptions: {
      // 在编译时候必须要引入的库 就算在包内没有显示的声明 peerDependency
      external: [ ...Object.keys((require(__dirname + '/../package.json' )).peerDependencies || {}), "vue"],
      output: {
        
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
