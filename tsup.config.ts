import { defineConfig } from 'tsup';
import { readdirSync, existsSync } from 'fs';

// Discover generated icon files at build time
function iconEntries(): Record<string, string> {
  const tsxDir = 'src/icons/tsx';
  const entries: Record<string, string> = {};
  if (existsSync('src/icons/index.ts')) {
    entries['icons/index'] = 'src/icons/index.ts';
  }
  if (existsSync(tsxDir)) {
    for (const f of readdirSync(tsxDir).filter(f => f.endsWith('.tsx'))) {
      const name = f.replace(/\.tsx$/, '');
      entries[`icons/${name}`] = `${tsxDir}/${f}`;
    }
  }
  return entries;
}

export default defineConfig([
  // Main library — components + CSS bundle
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.bundle = true;
    },
  },
  // Icon library — one output file per icon for deep imports
  {
    entry: iconEntries(),
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: false,
    clean: false,
    external: ['react', 'react-dom'],
  },
]);
