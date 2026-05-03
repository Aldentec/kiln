import React, { useState } from 'react';
import { Nav, ThemeToggle, Badge } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/about', label: 'About' },
];

const NavPreview: React.FC = () => {
  const [active, setActive] = useState('/components');

  return (
    <div style={{ width: '100%', border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-lg)', overflow: 'hidden' }}>
      <Nav
        logo={<strong style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>MyApp</strong>}
        items={NAV_ITEMS}
        sticky={false}
        isActive={(href) => href === active}
        onNavigate={(href, e) => { e.preventDefault(); setActive(href); }}
        actions={
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Badge variant="pending" size="sm">Live</Badge>
            <ThemeToggle />
          </div>
        }
      />
    </div>
  );
};

export const nav: ComponentDoc = {
  id: 'nav',
  name: 'Nav',
  description: 'A complete, drop-in navigation bar. Renders a sticky header with a logo slot, desktop link strip (NavMenu), a right-side actions slot, and a built-in mobile hamburger with a focus-trapped slide-out drawer. This is the component used on every page of this site. For full control over layout, use the lower-level NavMenu and MobileNav primitives instead.',
  preview: NavPreview,
  code: `import { Nav, ThemeToggle, Badge } from '@doriansmith/kiln';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/about', label: 'About' },
];

const [active, setActive] = useState('/components');

<Nav
  logo={<strong style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>MyApp</strong>}
  items={NAV_ITEMS}
  sticky={false}
  isActive={(href) => href === active}
  onNavigate={(href, e) => { e.preventDefault(); setActive(href); }}
  actions={
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="pending" size="sm">Live</Badge>
      <ThemeToggle />
    </div>
  }
/>`,
  props: [
    { name: 'logo', type: 'React.ReactNode', default: '—', required: false, description: 'Left-side brand slot — logo image, wordmark, or any element' },
    { name: 'items', type: 'NavItem[]', default: '[]', required: false, description: 'Array of { href, label, icon? } navigation links rendered on desktop and in the mobile drawer' },
    { name: 'actions', type: 'React.ReactNode', default: '—', required: false, description: 'Right-side slot — ThemeToggle, avatar, CTA buttons, etc.' },
    { name: 'sticky', type: 'boolean', default: 'true', required: false, description: 'Sticks the bar to the top of the viewport with position: sticky' },
    { name: 'isActive', type: '(href: string) => boolean', default: 'pathname match', required: false, description: 'Returns true to mark a link active (aria-current="page"). Defaults to comparing window.location.pathname.' },
    { name: 'onNavigate', type: '(href: string, e: MouseEvent) => void', default: '—', required: false, description: 'Called on any link click — call e.preventDefault() inside to handle client-side routing' },
    { name: 'ariaLabel', type: 'string', default: "'Main navigation'", required: false, description: 'Accessible label applied to the nav landmark and mobile dialog' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the outer <header> element' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from '@doriansmith/kiln';

const ITEMS = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
];

it('renders desktop nav links', () => {
  render(<Nav items={ITEMS} />);
  expect(screen.getAllByRole('link', { name: 'Home' })[0]).toBeInTheDocument();
});

it('marks the active link via isActive', () => {
  render(<Nav items={ITEMS} isActive={(h) => h === '/about'} />);
  const links = screen.getAllByRole('link', { name: 'About' });
  const active = links.find((el) => el.classList.contains('kiln-nav-menu__link--active'));
  expect(active).toBeTruthy();
  expect(active).toHaveAttribute('aria-current', 'page');
});

it('opens the mobile drawer on hamburger click', () => {
  render(<Nav items={ITEMS} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('closes the mobile drawer on Escape', () => {
  render(<Nav items={ITEMS} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).toBeNull();
});`,
  usage: `// Minimal — just a sticky bar with links
<Nav
  logo={<img src="/logo.png" alt="Kiln" style={{ height: 32 }} />}
  items={NAV_ITEMS}
/>

// Full — with active state, router integration, and actions
<Nav
  logo={<img src="/logo.png" alt="Kiln" style={{ height: 32 }} />}
  items={NAV_ITEMS}
  isActive={(href) => location.pathname === href}
  onNavigate={(href) => navigate(href)}
  actions={
    <>
      <Button variant="ghost" asChild>
        <a href="https://github.com/org/repo" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Button>
      <ThemeToggle />
    </>
  }
/>

// Non-sticky (e.g. inside a scrollable preview pane)
<Nav logo={logo} items={NAV_ITEMS} sticky={false} />`,
};
