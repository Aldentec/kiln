import pkg from '../package.json';

export const KILN_STATS = {
  version: `v${pkg.version}`,
  npmDownloads: '2,500+',
  componentCount: '42',
  iconCount: '158',
  axeIssues: '0',
  bundleSizeGzipped: '<26 KB',
  bundleSizeGzippedFull: 'under 26 KB',
  bundleCssGzipped: '10 KB',
  bundleJsGzipped: '13 KB',
  installTimeMinutes: '2',
  lighthousePerf: '99',
  lighthouseA11y: '100',
  lighthouseSeo: '100',
} as const;
 