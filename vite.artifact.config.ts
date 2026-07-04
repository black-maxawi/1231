import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Produces one self-contained, offline HTML file (no fetch, no chunks, no
// external assets) — used to publish a live preview of the app, e.g. as a
// Claude Artifact. Run with: npm run build:artifact
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: {
    __ARTIFACT__: 'true',
  },
  build: {
    outDir: 'dist-artifact',
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
