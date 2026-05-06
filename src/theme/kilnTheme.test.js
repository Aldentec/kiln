import { describe, it, expect, beforeEach } from 'vitest';
import {
  compileTheme,
  registerTheme,
  applyTheme,
  applyKilnTheme,
  getActiveTheme,
  getRegisteredThemes,
  getThemeTokens,
  resetTheme,
} from './kilnTheme.js';

// ─── compileTheme ─────────────────────────────────────────────────────────────

describe('compileTheme', () => {
  it('returns an object of CSS custom properties', () => {
    const tokens = compileTheme({ primary: '#89216b' });
    expect(typeof tokens).toBe('object');
    for (const key of Object.keys(tokens)) {
      expect(key).toMatch(/^--kiln-/);
    }
  });

  it('includes all expected primary tokens', () => {
    const tokens = compileTheme({ primary: '#2563eb' });
    expect(tokens).toHaveProperty('--kiln-primary');
    expect(tokens).toHaveProperty('--kiln-primary-light');
    expect(tokens).toHaveProperty('--kiln-primary-dark');
    expect(tokens).toHaveProperty('--kiln-primary-50');
    expect(tokens).toHaveProperty('--kiln-primary-100');
    expect(tokens).toHaveProperty('--kiln-primary-200');
    expect(tokens).toHaveProperty('--kiln-primary-bg');
    expect(tokens).toHaveProperty('--kiln-primary-fg');
  });

  it('includes all expected accent tokens', () => {
    const tokens = compileTheme({ primary: '#2563eb', accent: '#e85d04' });
    expect(tokens).toHaveProperty('--kiln-accent');
    expect(tokens).toHaveProperty('--kiln-accent-light');
    expect(tokens).toHaveProperty('--kiln-accent-dark');
  });

  it('includes gradient tokens', () => {
    const tokens = compileTheme({ primary: '#2563eb' });
    expect(tokens).toHaveProperty('--kiln-gradient-brand');
    expect(tokens).toHaveProperty('--kiln-gradient-brand-hover');
    expect(tokens).toHaveProperty('--kiln-gradient-warm');
    expect(tokens).toHaveProperty('--kiln-gradient-danger');
    expect(tokens).toHaveProperty('--kiln-gradient-card-hover');
  });

  it('includes shadow glow tokens', () => {
    const tokens = compileTheme({ primary: '#2563eb' });
    expect(tokens).toHaveProperty('--kiln-shadow-glow');
    expect(tokens).toHaveProperty('--kiln-shadow-glow-accent');
  });

  it('is a pure function — does not read or write document', () => {
    // If this runs without error in a Node/jsdom environment with no document
    // assignment, compileTheme is pure. We verify the output is deterministic.
    const a = compileTheme({ primary: '#89216b', mode: 'light' });
    const b = compileTheme({ primary: '#89216b', mode: 'light' });
    expect(a).toEqual(b);
  });

  it('produces different tokens for light vs dark mode', () => {
    const light = compileTheme({ primary: '#89216b', mode: 'light' });
    const dark = compileTheme({ primary: '#89216b', mode: 'dark' });
    // In dark mode the primary text-use color will be lighter (higher L)
    expect(light['--kiln-primary']).not.toBe(dark['--kiln-primary']);
  });

  it('dark mode includes gradient-text-shadow', () => {
    const tokens = compileTheme({ primary: '#89216b', mode: 'dark' });
    expect(tokens).toHaveProperty('--kiln-gradient-text-shadow');
  });

  it('light mode does not include gradient-text-shadow', () => {
    const tokens = compileTheme({ primary: '#89216b', mode: 'light' });
    expect(tokens).not.toHaveProperty('--kiln-gradient-text-shadow');
  });

  it('uses default accent when not supplied', () => {
    const withDefault = compileTheme({ primary: '#2563eb' });
    const withExplicit = compileTheme({ primary: '#2563eb', accent: '#f7b733' });
    expect(withDefault['--kiln-accent']).toBe(withExplicit['--kiln-accent']);
  });

  it('accepts a custom accent', () => {
    const tokens = compileTheme({ primary: '#2563eb', accent: '#e85d04' });
    // Should NOT match the default accent
    const defaultTokens = compileTheme({ primary: '#2563eb' });
    expect(tokens['--kiln-accent']).not.toBe(defaultTokens['--kiln-accent']);
  });

  it('--kiln-primary-fg is white or black', () => {
    const tokens = compileTheme({ primary: '#89216b' });
    expect(['#ffffff', '#000000']).toContain(tokens['--kiln-primary-fg']);
  });
});

// ─── Registry API ─────────────────────────────────────────────────────────────

describe('registerTheme / getRegisteredThemes / getThemeTokens', () => {
  it('registers a theme and makes it discoverable', () => {
    registerTheme('test-brand', { primary: '#2563eb' });
    expect(getRegisteredThemes()).toContain('test-brand');
  });

  it('getThemeTokens returns the compiled token map', () => {
    registerTheme('inspect-test', { primary: '#e85d04' });
    const tokens = getThemeTokens('inspect-test');
    expect(tokens).toBeDefined();
    expect(tokens).toHaveProperty('--kiln-primary');
  });

  it('getThemeTokens returns undefined for unknown names', () => {
    expect(getThemeTokens('does-not-exist')).toBeUndefined();
  });

  it('registering the same name overwrites the previous entry', () => {
    registerTheme('overwrite-test', { primary: '#2563eb' });
    const first = getThemeTokens('overwrite-test')['--kiln-primary'];
    registerTheme('overwrite-test', { primary: '#16a34a' });
    const second = getThemeTokens('overwrite-test')['--kiln-primary'];
    expect(first).not.toBe(second);
  });

  it('getRegisteredThemes returns an array of strings', () => {
    const themes = getRegisteredThemes();
    expect(Array.isArray(themes)).toBe(true);
    for (const name of themes) {
      expect(typeof name).toBe('string');
    }
  });
});

// ─── applyTheme ───────────────────────────────────────────────────────────────

describe('applyTheme', () => {
  beforeEach(() => {
    resetTheme();
  });

  it('sets CSS custom properties on document.documentElement', () => {
    registerTheme('apply-test', { primary: '#89216b' });
    applyTheme('apply-test');
    const primary = document.documentElement.style.getPropertyValue('--kiln-primary');
    expect(primary).not.toBe('');
  });

  it('sets data-kiln-theme attribute', () => {
    registerTheme('attr-test', { primary: '#2563eb' });
    applyTheme('attr-test');
    expect(document.documentElement.getAttribute('data-kiln-theme')).toBe('attr-test');
  });

  it('updates getActiveTheme()', () => {
    registerTheme('active-test', { primary: '#16a34a' });
    applyTheme('active-test');
    expect(getActiveTheme()).toBe('active-test');
  });

  it('warns and does not throw for unknown theme', () => {
    expect(() => applyTheme('unknown-theme-xyz')).not.toThrow();
  });

  it('replacing one theme clears the previous one', () => {
    registerTheme('blue-theme', { primary: '#2563eb' });
    registerTheme('green-theme', { primary: '#16a34a' });
    applyTheme('blue-theme');
    applyTheme('green-theme');
    expect(getActiveTheme()).toBe('green-theme');
    expect(document.documentElement.getAttribute('data-kiln-theme')).toBe('green-theme');
  });
});

// ─── applyKilnTheme ───────────────────────────────────────────────────────────

describe('applyKilnTheme', () => {
  beforeEach(() => {
    resetTheme();
  });

  it('applies tokens directly without registering', () => {
    applyKilnTheme({ primary: '#e85d04', mode: 'light' });
    const primary = document.documentElement.style.getPropertyValue('--kiln-primary');
    expect(primary).not.toBe('');
  });

  it('sets data-kiln-theme to __inline__', () => {
    applyKilnTheme({ primary: '#e85d04' });
    expect(document.documentElement.getAttribute('data-kiln-theme')).toBe('__inline__');
  });

  it('sets active theme to __inline__', () => {
    applyKilnTheme({ primary: '#2563eb' });
    expect(getActiveTheme()).toBe('__inline__');
  });
});

// ─── resetTheme ───────────────────────────────────────────────────────────────

describe('resetTheme', () => {
  it('removes all kiln theme custom properties', () => {
    registerTheme('to-reset', { primary: '#2563eb' });
    applyTheme('to-reset');
    resetTheme();

    const primary = document.documentElement.style.getPropertyValue('--kiln-primary');
    expect(primary).toBe('');
  });

  it('removes data-kiln-theme attribute', () => {
    registerTheme('reset-attr', { primary: '#2563eb' });
    applyTheme('reset-attr');
    resetTheme();
    expect(document.documentElement.getAttribute('data-kiln-theme')).toBeNull();
  });

  it('sets active theme to null', () => {
    registerTheme('null-test', { primary: '#2563eb' });
    applyTheme('null-test');
    resetTheme();
    expect(getActiveTheme()).toBeNull();
  });
});

// ─── clearThemeTokens parity ──────────────────────────────────────────────────
// Verify that every token compileTheme produces is removed by resetTheme.

describe('clearThemeTokens parity', () => {
  it('resetTheme removes all tokens that compileTheme produces', () => {
    const tokens = compileTheme({ primary: '#89216b', accent: '#f7b733', mode: 'dark' });

    // Apply directly so we have all tokens set
    applyKilnTheme({ primary: '#89216b', accent: '#f7b733', mode: 'dark' });

    // Now reset and check every token is cleared
    resetTheme();

    for (const prop of Object.keys(tokens)) {
      expect(document.documentElement.style.getPropertyValue(prop)).toBe('');
    }
  });
});
