import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'https://authentic-energy-production.up.railway.app',
      'https://hrms-lite-production-0a5b.up.railway.app/'
    ],
  },
})
