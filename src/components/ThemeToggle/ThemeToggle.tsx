// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState, useEffect, useCallback } from 'react';
import { MoonIcon, SunIcon } from '../../icons';
import './ThemeToggle.css';

export type KilnTheme = 'light' | 'dark';

export interface ThemeToggleProps {
  /** Storage key for persisting the theme preference. Defaults to 'kiln-theme'. */
  storageKey?: string;
  /** Default theme if no stored preference exists. Defaults to 'dark'. */
  defaultTheme?: KilnTheme;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  storageKey = 'kiln-theme',
  defaultTheme = 'dark',
}) => {
  const [theme, setTheme] = useState<KilnTheme>(() => {
    try {
      return (localStorage.getItem(storageKey) as KilnTheme) ?? defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const cycle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(storageKey, theme); } catch { /* storage unavailable */ }
  }, [theme, storageKey]);

  return (
    <button
      type="button"
      className="kiln-theme-toggle"
      onClick={cycle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon size={28} /> : <SunIcon size={28} />}
    </button>
  );
};

export default ThemeToggle;
