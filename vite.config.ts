import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'demo'),
  plugins: [react()],
  server: {
    watch: {
      // Never watch the reference folder — it's not part of the build
      ignored: ['**/clickstorm-frontend/**', '**/node_modules/**'],
    },
    historyApiFallback: true,
  },
  build: {
    outDir: resolve(__dirname, 'demo/dist'),
    emptyOutDir: true,
    // Split vendor and kiln into separate chunks to avoid critical request chaining
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  // Pre-bundle kiln source in dev so the browser gets one request instead of
  // a deep chain of individual module files (fixes Lighthouse critical request chain)
  optimizeDeps: {
    include: ['react', 'react-dom', 'highlight.js'],
  },
  resolve: {
    alias: {
      // During dev, resolve the library source directly so HMR works
      '@doriansmith/kiln': resolve(__dirname, 'src/index.ts'),
    },
  },
  preview: {
    historyApiFallback: true,
  },
});
