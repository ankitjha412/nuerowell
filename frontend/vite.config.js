import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/report': {
        target: 'http://10.1.73.168:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
