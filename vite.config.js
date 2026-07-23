import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Do not publish source maps with the production bundle.
    sourcemap: false,
  },
  server: {
    // Keep the development server off the local network by default.
    host: '127.0.0.1',
  },
  preview: {
    host: '127.0.0.1',
  },
})
