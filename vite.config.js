import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dragonball": {
        target: "https://web.dragonball-api.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
