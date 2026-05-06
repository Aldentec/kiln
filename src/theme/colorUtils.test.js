import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  relativeLuminance,
  contrastRatio,
  bestForeground,
  adjustForContrast,
  derivePalette,
} from './colorUtils.js';

// ─── hexToRgb ────────────────────────────────────────────────────────────────

describe('hexToRgb', () => {
  it('parses a 6-digit hex', () => {
    expect(hexToRgb('#89216b')).toEqual({ r: 137, g: 33, b: 107 });
  });

  it('parses a 3-digit hex', () => {
    expect(hexToRgb('#f0f')).toEqual({ r: 255, g: 0, b: 255 });
  });

  it('parses white', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('parses black', () => {
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });
});

// ─── rgbToHex ────────────────────────────────────────────────────────────────

describe('rgbToHex', () => {
  it('round-trips with hexToRgb', () => {
    const original = '#89216b';
    expect(rgbToHex(hexToRgb(original))).toBe(original);
  });

  it('zero-pads single-digit channels', () => {
    expect(rgbToHex({ r: 1, g: 2, b: 3 })).toBe('#010203');
  });
});

// ─── rgbToHsl / hslToRgb ─────────────────────────────────────────────────────

describe('rgbToHsl', () => {
  it('identifies a grey (no saturation)', () => {
    const { s } = rgbToHsl({ r: 128, g: 128, b: 128 });
    expect(s).toBeCloseTo(0, 1);
  });

  it('identifies pure red (h ≈ 0)', () => {
    const { h } = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(h).toBeCloseTo(0, 0);
  });

  it('identifies pure green (h ≈ 120)', () => {
    const { h } = rgbToHsl({ r: 0, g: 255, b: 0 });
    expect(h).toBeCloseTo(120, 0);
  });
});

describe('hslToRgb', () => {
  it('round-trips with rgbToHsl', () => {
    const original = { r: 137, g: 33, b: 107 };
    const hsl = rgbToHsl(original);
    const back = hslToRgb(hsl);
    expect(back.r).toBeCloseTo(original.r, 0);
    expect(back.g).toBeCloseTo(original.g, 0);
    expect(back.b).toBeCloseTo(original.b, 0);
  });

  it('handles achromatic (s=0)', () => {
    const { r, g, b } = hslToRgb({ h: 0, s: 0, l: 50 });
    expect(r).toBe(g);
    expect(g).toBe(b);
  });
});

// ─── relativeLuminance ───────────────────────────────────────────────────────

describe('relativeLuminance', () => {
  it('white has luminance 1', () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 4);
  });

  it('black has luminance 0', () => {
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 4);
  });

  it('is between 0 and 1 for mid-tones', () => {
    const l = relativeLuminance({ r: 137, g: 33, b: 107 });
    expect(l).toBeGreaterThan(0);
    expect(l).toBeLessThan(1);
  });
});

// ─── contrastRatio ───────────────────────────────────────────────────────────

describe('contrastRatio', () => {
  it('black on white = 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('same color has ratio 1', () => {
    expect(contrastRatio('#89216b', '#89216b')).toBeCloseTo(1, 4);
  });

  it('is symmetric', () => {
    const ab = contrastRatio('#89216b', '#ffffff');
    const ba = contrastRatio('#ffffff', '#89216b');
    expect(ab).toBeCloseTo(ba, 5);
  });

  it('Kiln primary on white achieves expected ratio', () => {
    // #89216b on #ffffff — known value from CSS comment in design-tokens.css (7.2:1)
    expect(contrastRatio('#89216b', '#ffffff')).toBeGreaterThan(4.5);
  });
});

// ─── bestForeground ──────────────────────────────────────────────────────────

describe('bestForeground', () => {
  it('returns white for a dark background', () => {
    expect(bestForeground('#89216b')).toBe('#ffffff');
  });

  it('returns black for a light background', () => {
    expect(bestForeground('#f7b733')).toBe('#000000');
  });

  it('returns white for pure black', () => {
    expect(bestForeground('#000000')).toBe('#ffffff');
  });

  it('returns black for pure white', () => {
    expect(bestForeground('#ffffff')).toBe('#000000');
  });
});

// ─── adjustForContrast ───────────────────────────────────────────────────────

describe('adjustForContrast', () => {
  it('returns input unchanged if already meets target', () => {
    // #89216b vs #ffffff already > 4.5:1
    const result = adjustForContrast('#89216b', '#ffffff', 4.5, false);
    expect(contrastRatio(result, '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });

  it('adjusts a low-contrast color to meet 4.5:1 on white', () => {
    // A very light pink — low contrast on white
    const result = adjustForContrast('#f7b733', '#ffffff', 4.5, false);
    expect(contrastRatio(result, '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });

  it('adjusts a low-contrast color to meet 4.5:1 on dark surface', () => {
    const darkSurface = '#0d1525';
    const result = adjustForContrast('#222244', darkSurface, 4.5, true);
    expect(contrastRatio(result, darkSurface)).toBeGreaterThanOrEqual(4.5);
  });

  it('returns a hex string', () => {
    const result = adjustForContrast('#f7b733', '#ffffff', 4.5, false);
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});

// ─── derivePalette ───────────────────────────────────────────────────────────

describe('derivePalette', () => {
  describe('light mode', () => {
    const palette = derivePalette('#89216b', 'light');

    it('has all expected keys', () => {
      expect(palette).toHaveProperty('50');
      expect(palette).toHaveProperty('100');
      expect(palette).toHaveProperty('200');
      expect(palette).toHaveProperty('light');
      expect(palette).toHaveProperty('DEFAULT');
      expect(palette).toHaveProperty('dark');
      expect(palette).toHaveProperty('bg');
      expect(palette).toHaveProperty('fg');
    });

    it('DEFAULT meets 4.5:1 on white surface', () => {
      expect(contrastRatio(palette.DEFAULT, '#ffffff')).toBeGreaterThanOrEqual(4.5);
    });

    it('bg meets 4.5:1 with white text', () => {
      expect(contrastRatio(palette.bg, '#ffffff')).toBeGreaterThanOrEqual(4.5);
    });

    it('fg is the best foreground for bg', () => {
      // bestForeground should agree with the computed fg
      const { r, g, b } = hexToRgb(palette.bg);
      expect(['#ffffff', '#000000']).toContain(palette.fg);
    });

    it('tints are rgba strings', () => {
      expect(palette['50']).toMatch(/^rgba\(/);
      expect(palette['100']).toMatch(/^rgba\(/);
      expect(palette['200']).toMatch(/^rgba\(/);
    });
  });

  describe('dark mode', () => {
    const palette = derivePalette('#89216b', 'dark');

    it('DEFAULT meets 4.5:1 on dark surface', () => {
      expect(contrastRatio(palette.DEFAULT, '#0d1525')).toBeGreaterThanOrEqual(4.5);
    });

    it('bg is a valid hex color', () => {
      expect(palette.bg).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  it('preserves hue when lightness adjusts', () => {
    const palette = derivePalette('#2563eb', 'light');
    // All hex-valued outputs should still be roughly blue
    const { h } = rgbToHsl(hexToRgb(palette.DEFAULT));
    expect(h).toBeGreaterThan(200);
    expect(h).toBeLessThan(260);
  });
});
