import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/*
  Vercel build: plain static SPA in dist/vercel plus the api/ Functions.
  The Cloudflare build (vite.config.ts + @cloudflare/vite-plugin) is unchanged.
*/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist/vercel', emptyOutDir: true },
})
