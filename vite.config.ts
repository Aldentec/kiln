import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'demo'),
  plugins: [
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react(),
  ],
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
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          // highlight.js is lazy-loaded by CodeBlock — keep it in its own chunk
          // so it never lands on the initial critical path.
          hljs: ['highlight.js/lib/core'],
        },
      },
    },
  },
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
