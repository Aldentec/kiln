import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  injectStyle: false,
  // Bundle all component CSS into a single dist/kiln.css
  // Each component CSS is imported in src/styles/index.css
  // tsup copies that as the CSS output
  esbuildOptions(options) {
    options.bundle = true;
  },
});
