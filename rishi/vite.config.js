import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index-prod.html',
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  // Mobile-specific optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'suncalc']
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg']
})