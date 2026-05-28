import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// base: './'  → build lokal (bisa dibuka langsung di browser)
// base: '/Tugas3-STSI4308/' → GitHub Pages (dipakai di package.json build:pages)
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/Tugas3-STSI4308/' : './',
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
}))

