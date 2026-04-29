import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('renders a button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has accessible aria-label', () => {
    render(<ThemeToggle defaultTheme="light" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
  });

  it('toggles data-theme on click', () => {
    render(<ThemeToggle defaultTheme="light" />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists theme to localStorage', () => {
    render(<ThemeToggle defaultTheme="light" storageKey="test-theme" />);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('test-theme')).toBe('dark');
  });
});
