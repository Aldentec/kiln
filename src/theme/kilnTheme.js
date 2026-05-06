/**
 * Kiln runtime theme engine — zero dependencies.
 *
 * Public API:
 *   compileTheme(input)           — pure function, no DOM
 *   registerTheme(name, input)    — store a named theme
 *   applyTheme(name)              — apply a registered theme to document
 *   applyKilnTheme(input)         — compile + apply in one call
 *   getActiveTheme()              — name of the currently applied theme (or null)
 *   getRegisteredThemes()         — array of registered theme names
 *   getThemeTokens(name)          — inspect resolved tokens for a registered theme
 *   resetTheme()                  — remove all custom tokens, restore CSS defaults
 */

import { derivePalette, contrastRatio, adjustForContrast, bestForeground, hexToRgb } from './colorUtils.js';

// ─── Internal registry ───────────────────────────────────────────────────────

/** @type {Map<string, Record<string, string>>} name → compiled token map */
const _registry = new Map();

/** @type {string|null} */
let _activeTheme = null;

// ─── Compile (pure) ──────────────────────────────────────────────────────────

/**
 * Compile a theme input into a flat map of CSS custom property names → values.
 * Pure function — no DOM reads or writes, no module-level state mutations.
 *
 * @param {{ primary: string, accent?: string, mode?: 'light'|'dark' }} input
 * @returns {Record<string, string>}
 */
export function compileTheme({ primary, accent, mode = 'light' }) {
  const primaryPalette = derivePalette(primary, mode);

  // Accent falls back to the Kiln default if not supplied
  const accentBase = accent || '#f7b733';
  const accentPalette = derivePalette(accentBase, mode);

  const tokens = {
    // ── Primary palette ───────────────────────────────────────────────────
    '--kiln-primary':       primaryPalette.DEFAULT,
    '--kiln-primary-light': primaryPalette.light,
    '--kiln-primary-dark':  primaryPalette.dark,
    '--kiln-primary-50':    primaryPalette['50'],
    '--kiln-primary-100':   primaryPalette['100'],
    '--kiln-primary-200':   primaryPalette['200'],
    '--kiln-primary-bg':    primaryPalette.bg,
    '--kiln-primary-fg':    primaryPalette.fg,

    // ── Accent palette ────────────────────────────────────────────────────
    '--kiln-accent':        accentPalette.DEFAULT,
    '--kiln-accent-light':  accentPalette.light,
    '--kiln-accent-dark':   accentPalette.dark,

    // ── Gradient: brand ───────────────────────────────────────────────────
    // Reconstruct brand gradient from the compiled primary/accent
    '--kiln-gradient-brand':
      mode === 'dark'
        ? `linear-gradient(135deg, #c084fc 0%, ${primaryPalette.DEFAULT} 50%, ${accentPalette.DEFAULT} 100%)`
        : `linear-gradient(135deg, #0f2027 0%, ${primaryPalette.bg} 50%, ${accentPalette.DEFAULT} 100%)`,

    '--kiln-gradient-brand-hover':
      mode === 'dark'
        ? `linear-gradient(135deg, #c084fc 0%, ${primaryPalette.DEFAULT} 50%, ${accentPalette.DEFAULT} 100%)`
        : `linear-gradient(135deg, #0f2027 0%, ${primaryPalette.bg} 50%, ${accentPalette.DEFAULT} 100%)`,

    '--kiln-gradient-warm':
      mode === 'dark'
        ? `linear-gradient(135deg, #c084fc 0%, ${primaryPalette.DEFAULT} 50%, ${accentPalette.DEFAULT} 100%)`
        : `linear-gradient(135deg, #0f2027 0%, ${primaryPalette.bg} 50%, ${accentPalette.DEFAULT} 100%)`,

    '--kiln-gradient-danger':
      mode === 'dark'
        ? `linear-gradient(135deg, #c084fc 0%, ${primaryPalette.DEFAULT} 50%, ${accentPalette.DEFAULT} 100%)`
        : `linear-gradient(135deg, #0f2027 0%, ${primaryPalette.bg} 50%, ${accentPalette.DEFAULT} 100%)`,

    '--kiln-gradient-card-hover':
      mode === 'dark'
        ? `linear-gradient(135deg, ${primaryPalette['50']} 0%, ${accentPalette['50']} 100%)`
        : `linear-gradient(135deg, ${primaryPalette['50']} 0%, ${accentPalette['50']} 100%)`,

    // ── Glow shadows ──────────────────────────────────────────────────────
    '--kiln-shadow-glow':
      `0 0 20px ${primaryPalette['100']}`,
    '--kiln-shadow-glow-accent':
      `0 0 20px ${accentPalette['100']}`,
  };

  // Dark-mode-only overrides
  if (mode === 'dark') {
    tokens['--kiln-gradient-text-shadow'] =
      `0 0 20px ${accentPalette['100']}, 0 0 40px ${primaryPalette['100']}`;
  }

  return tokens;
}

// ─── Registry API ─────────────────────────────────────────────────────────────

/**
 * Register a named theme. Compiles the theme eagerly and stores the token map.
 *
 * @param {string} name
 * @param {{ primary: string, accent?: string, mode?: 'light'|'dark' }} input
 */
export function registerTheme(name, input) {
  _registry.set(name, compileTheme(input));
}

/**
 * Apply a previously registered theme to the document root.
 * Sets `data-kiln-theme` attribute on `<html>` to track which theme is active.
 *
 * @param {string} name
 */
export function applyTheme(name) {
  if (typeof document === 'undefined') return;

  const tokens = _registry.get(name);
  if (!tokens) {
    console.warn(`[kiln] Theme "${name}" is not registered. Call registerTheme() first.`);
    return;
  }

  const root = document.documentElement;
  clearThemeTokens(root);

  for (const [prop, value] of Object.entries(tokens)) {
    root.style.setProperty(prop, value);
  }

  root.setAttribute('data-kiln-theme', name);
  _activeTheme = name;
}

/**
 * Compile and immediately apply a theme without registering it.
 * Useful for one-off or ephemeral themes.
 *
 * @param {{ primary: string, accent?: string, mode?: 'light'|'dark' }} input
 */
export function applyKilnTheme(input) {
  if (typeof document === 'undefined') return;

  const tokens = compileTheme(input);
  const root = document.documentElement;
  clearThemeTokens(root);

  for (const [prop, value] of Object.entries(tokens)) {
    root.style.setProperty(prop, value);
  }

  root.setAttribute('data-kiln-theme', '__inline__');
  _activeTheme = '__inline__';
}

/**
 * Return the name of the currently applied theme, or null if none.
 * @returns {string|null}
 */
export function getActiveTheme() {
  return _activeTheme;
}

/**
 * Return an array of all registered theme names.
 * @returns {string[]}
 */
export function getRegisteredThemes() {
  return Array.from(_registry.keys());
}

/**
 * Return the compiled token map for a registered theme without applying it.
 * Useful for inspecting resolved values before committing to a switch.
 *
 * @param {string} name
 * @returns {Record<string, string>|undefined}
 */
export function getThemeTokens(name) {
  return _registry.get(name);
}

/**
 * Remove all theme-managed CSS custom properties from the given element
 * (defaults to document.documentElement) and clear the active theme state.
 *
 * Also removes the `data-kiln-theme` attribute.
 *
 * @param {HTMLElement} [el]
 */
export function resetTheme(el) {
  if (typeof document === 'undefined') return;
  const root = el || document.documentElement;
  clearThemeTokens(root);
  root.removeAttribute('data-kiln-theme');
  _activeTheme = null;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Remove every CSS custom property that compileTheme() can produce.
 * This list MUST stay in sync with the keys returned by compileTheme().
 *
 * @param {HTMLElement} el
 */
function clearThemeTokens(el) {
  const props = [
    '--kiln-primary',
    '--kiln-primary-light',
    '--kiln-primary-dark',
    '--kiln-primary-50',
    '--kiln-primary-100',
    '--kiln-primary-200',
    '--kiln-primary-bg',
    '--kiln-primary-fg',
    '--kiln-accent',
    '--kiln-accent-light',
    '--kiln-accent-dark',
    '--kiln-gradient-brand',
    '--kiln-gradient-brand-hover',
    '--kiln-gradient-warm',
    '--kiln-gradient-danger',
    '--kiln-gradient-card-hover',
    '--kiln-shadow-glow',
    '--kiln-shadow-glow-accent',
    '--kiln-gradient-text-shadow',
  ];
  for (const prop of props) {
    el.style.removeProperty(prop);
  }
}

// ─── Auto-init from HTML attributes ──────────────────────────────────────────
// Wrapped in typeof document guard so this module is safe to import in SSR/Node.

if (typeof document !== 'undefined') {
  const html = document.documentElement;
  const attrPrimary = html.getAttribute('data-kiln-primary');
  const attrAccent = html.getAttribute('data-kiln-accent');
  const attrMode = html.getAttribute('data-kiln-mode');

  if (attrPrimary) {
    applyKilnTheme({
      primary: attrPrimary,
      ...(attrAccent ? { accent: attrAccent } : {}),
      ...(attrMode === 'dark' || attrMode === 'light' ? { mode: attrMode } : {}),
    });
  }
}
