/**
 * Color math utilities — zero dependencies.
 * WCAG 2.1 relative luminance and contrast ratio.
 * HSL interpolation for theme compilation.
 */

/**
 * Parse a CSS hex color (#rgb, #rrggbb) into { r, g, b } (0–255).
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number }}
 */
export function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

/**
 * Convert { r, g, b } (0–255) to a lowercase #rrggbb hex string.
 * @param {{ r: number, g: number, b: number }} rgb
 * @returns {string}
 */
export function rgbToHex({ r, g, b }) {
  return (
    '#' +
    Math.round(r).toString(16).padStart(2, '0') +
    Math.round(g).toString(16).padStart(2, '0') +
    Math.round(b).toString(16).padStart(2, '0')
  );
}

/**
 * Convert { r, g, b } (0–255) to { h, s, l } (h: 0–360, s/l: 0–100).
 * @param {{ r: number, g: number, b: number }} rgb
 * @returns {{ h: number, s: number, l: number }}
 */
export function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / delta + 2) / 6;
    else h = ((rn - gn) / delta + 4) / 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert { h, s, l } (h: 0–360, s/l: 0–100) to { r, g, b } (0–255).
 * @param {{ h: number, s: number, l: number }} hsl
 * @returns {{ r: number, g: number, b: number }}
 */
export function hslToRgb({ h, s, l }) {
  const hn = h / 360;
  const sn = s / 100;
  const ln = l / 100;

  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;

  function hue2rgb(t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  return {
    r: Math.round(hue2rgb(hn + 1 / 3) * 255),
    g: Math.round(hue2rgb(hn) * 255),
    b: Math.round(hue2rgb(hn - 1 / 3) * 255),
  };
}

/**
 * WCAG 2.1 relative luminance of an sRGB channel value (0–255).
 * @param {number} channel
 * @returns {number}
 */
function linearize(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * WCAG 2.1 relative luminance of an { r, g, b } color (0–255).
 * @param {{ r: number, g: number, b: number }} rgb
 * @returns {number} luminance in [0, 1]
 */
export function relativeLuminance({ r, g, b }) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * WCAG 2.1 contrast ratio between two hex colors.
 * @param {string} hexA
 * @param {string} hexB
 * @returns {number} contrast ratio (1–21)
 */
export function contrastRatio(hexA, hexB) {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Return the hex color (#ffffff or #000000) that achieves the highest
 * contrast ratio against the given background hex color.
 * @param {string} bgHex
 * @returns {string}
 */
export function bestForeground(bgHex) {
  return contrastRatio(bgHex, '#ffffff') >= contrastRatio(bgHex, '#000000')
    ? '#ffffff'
    : '#000000';
}

/**
 * Adjust the lightness of a hex color (HSL) until it meets the target
 * contrast ratio against the given surface hex color.
 *
 * Searches toward lighter values if lightening=true, darker if false.
 * Returns the adjusted hex or the best candidate found if the target
 * cannot be fully achieved.
 *
 * @param {string} colorHex   Input color to adjust
 * @param {string} surfaceHex Background surface to check against
 * @param {number} targetRatio Minimum contrast ratio (e.g. 4.5)
 * @param {boolean} [lighten=true] Direction to move lightness
 * @returns {string}
 */
export function adjustForContrast(colorHex, surfaceHex, targetRatio, lighten = true) {
  const rgb = hexToRgb(colorHex);
  const hsl = rgbToHsl(rgb);

  const step = lighten ? 1 : -1;
  let best = colorHex;
  let bestRatio = contrastRatio(colorHex, surfaceHex);

  for (let i = 0; i < 100; i++) {
    const newL = hsl.l + step * i;
    if (newL < 0 || newL > 100) break;
    const candidate = rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: newL }));
    const ratio = contrastRatio(candidate, surfaceHex);
    if (ratio > bestRatio) {
      best = candidate;
      bestRatio = ratio;
    }
    if (ratio >= targetRatio) return candidate;
  }

  return best;
}

/**
 * Derive a full palette of tints and shades from a base hex color.
 * Returns an object with keys: 50, 100, 200, light, DEFAULT, dark, bg, fg.
 *
 * - bg: the color adjusted so that white fg (--kiln-primary-fg) is ≥ 4.5:1
 * - fg: '#ffffff' or '#000000' — whichever contrasts better with bg
 * - light / dark: lightened / darkened by ~15 L points in HSL
 * - 50 / 100 / 200: low-opacity background tints (returned as rgba strings)
 *
 * @param {string} baseHex
 * @param {'light'|'dark'} mode
 * @returns {Record<string, string>}
 */
export function derivePalette(baseHex, mode) {
  const surfaceHex = mode === 'dark' ? '#0d1525' : '#ffffff';
  const hsl = rgbToHsl(hexToRgb(baseHex));

  // Text-use color: ensure ≥ 4.5:1 against the surface
  const textColor =
    contrastRatio(baseHex, surfaceHex) >= 4.5
      ? baseHex
      : adjustForContrast(baseHex, surfaceHex, 4.5, mode === 'dark');

  // Background-use color: ensure white text ≥ 4.5:1 on it
  const bgColor =
    contrastRatio(baseHex, '#ffffff') >= 4.5
      ? baseHex
      : adjustForContrast(baseHex, '#ffffff', 4.5, false);

  const fg = bestForeground(bgColor);

  // Light/dark variants: ±15 L
  const lightL = Math.min(hsl.l + 15, 95);
  const darkL = Math.max(hsl.l - 15, 5);

  const light = rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: lightL }));
  const dark = rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: darkL }));

  // Tint opacities — expressed as rgba so they work on any surface
  const { r, g, b } = hexToRgb(bgColor);
  const tint50 = `rgba(${r},${g},${b},0.05)`;
  const tint100 = `rgba(${r},${g},${b},0.12)`;
  const tint200 = `rgba(${r},${g},${b},0.20)`;

  return {
    50: tint50,
    100: tint100,
    200: tint200,
    light,
    DEFAULT: textColor,
    dark,
    bg: bgColor,
    fg,
  };
}
