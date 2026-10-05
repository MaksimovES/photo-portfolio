import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    // nginx serves photos straight from public/ (deploy/nginx-portfolio.conf),
    // so dist/ holds only index.html + assets instead of a ~1 GB copy.
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
