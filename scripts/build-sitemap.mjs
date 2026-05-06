/**
 * build-sitemap.mjs
 * Generates demo/public/sitemap.xml from the ROUTES array below.
 * Run directly: node scripts/build-sitemap.mjs
 * Hooked into: npm run build:site (via package.json)
 *
 * To add a new route: append an entry to ROUTES. That's it.
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../demo/public/sitemap.xml');
const BASE = 'https://kiln-ui.com';
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

/**
 * changefreq values: always | hourly | daily | weekly | monthly | yearly | never
 * priority: 0.0 – 1.0 (default 0.5 if omitted; 1.0 = most important)
 */
const ROUTES = [
  // ── Top-level pages ──────────────────────────────────────────────────────
  { path: '/',                        priority: '1.0', changefreq: 'weekly'  },
  { path: '/get-started',             priority: '0.9', changefreq: 'monthly' },
  { path: '/components',              priority: '0.9', changefreq: 'weekly'  },
  { path: '/icon-library',            priority: '0.8', changefreq: 'weekly'  },
  { path: '/design-language',         priority: '0.8', changefreq: 'monthly' },
  { path: '/demos',                   priority: '0.7', changefreq: 'monthly' },
  { path: '/about',                   priority: '0.6', changefreq: 'monthly' },

  // ── Design language sections ──────────────────────────────────────────────
  { path: '/design-language/color',         priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/typography',    priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/spacing',       priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/elevation',     priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/motion',        priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/border-radius', priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/theming',       priority: '0.7', changefreq: 'monthly' },
  { path: '/design-language/iconography',   priority: '0.7', changefreq: 'monthly' },
];

function buildSitemap(routes) {
  const urls = routes
    .map(({ path, priority, changefreq }) =>
      [
        '  <url>',
        `    <loc>${BASE}${path}</loc>`,
        `    <lastmod>${TODAY}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n')
    )
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '', // trailing newline
  ].join('\n');
}

const xml = buildSitemap(ROUTES);
writeFileSync(OUT, xml, 'utf8');
console.log(`sitemap: wrote ${ROUTES.length} URLs → ${OUT}`);
