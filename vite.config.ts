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
  },
  build: {
    outDir: resolve(__dirname, 'demo/dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // During dev, resolve the library source directly so HMR works
      '@doriansmith/kiln': resolve(__dirname, 'src/index.ts'),
    },
  },
});
