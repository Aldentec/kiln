import React from 'react';
import { ThemeToggle } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ThemeTogglePreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    <ThemeToggle />
    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>
      Persists preference to localStorage
    </p>
  </div>
);

export const themeToggle: ComponentDoc = {
  id: 'theme-toggle',
  name: 'ThemeToggle',
  description: 'Light/dark mode switch that sets data-theme on <html> and persists to localStorage.',
  preview: ThemeTogglePreview,
  code: `import { ThemeToggle } from '@doriansmith/kiln';

// Standalone — persists preference to localStorage
<ThemeToggle />

// In your Nav actions slot
<Nav logo={logo} items={navItems} actions={<ThemeToggle />} />`,
  props: [
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@doriansmith/kiln';

it('renders toggle button', () => {
  render(<ThemeToggle />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('toggles data-theme on html element', () => {
  render(<ThemeToggle />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.documentElement.dataset.theme).toBe('dark');
});`,
  usage: `// Place in Nav actions
<Nav
  logo={<strong>MyApp</strong>}
  items={navItems}
  actions={<ThemeToggle />}
/>

// ThemeToggle reads and writes to localStorage('kiln-theme')
// and sets/removes data-theme="dark" on document.documentElement`,
};
