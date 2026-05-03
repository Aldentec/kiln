import React, { useState } from 'react';
import { NavMenu, MobileNav, Card, SideNav } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const NAV_MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
];

const NavMenuPreview: React.FC = () => {
  const [active, setActive] = useState('/');
  const isActive = (href: string) => href === active;
  const onNavigate = (href: string, e: React.MouseEvent) => { e.preventDefault(); setActive(href); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', width: '100%' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>NavMenu — desktop links</p>
        <NavMenu
          items={NAV_MENU_ITEMS}
          isActive={isActive}
          onNavigate={onNavigate}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>MobileNav — hamburger + slide-out drawer (pre-opened)</p>
        <MobileNav
          items={NAV_MENU_ITEMS}
          logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
          isActive={isActive}
          onNavigate={onNavigate}
          defaultOpen
          forceVisible
        />
      </div>
    </div>
  );
};

export const navMenu: ComponentDoc = {
  id: 'nav-menu',
  name: 'NavMenu',
  description: 'Low-level navigation primitives for assembling a custom nav bar. NavMenu renders the desktop link strip; MobileNav provides a self-contained mobile hamburger and slide-out drawer. Use these together when you need full control over your nav bar layout. If you just want a drop-in nav bar with desktop links, mobile drawer, logo, and actions already wired up, use Nav instead.',
  preview: NavMenuPreview,
  code: `import { NavMenu, MobileNav } from '@doriansmith/kiln';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
];

const isActive = (href) => href === active;
const onNavigate = (href, e) => { e.preventDefault(); setActive(href); };

// Desktop — render inside your Nav bar
<NavMenu
  items={NAV_ITEMS}
  isActive={isActive}
  onNavigate={onNavigate}
/>

// Mobile — self-contained hamburger + slide-out drawer
<MobileNav
  items={NAV_ITEMS}
  logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
  isActive={isActive}
  onNavigate={onNavigate}
/>

// Force drawer open on mount (useful for demos and testing)
<MobileNav items={NAV_ITEMS} defaultOpen />`,
  props: [
    { name: 'NavMenu.items', type: 'NavItem[]', default: '—', required: true, description: 'Array of { href, label } navigation links' },
    { name: 'NavMenu.isActive', type: '(href: string) => boolean', default: 'pathname match', required: false, description: 'Returns true to mark a link as active (aria-current="page")' },
    { name: 'NavMenu.onNavigate', type: '(href, e) => void', default: '—', required: false, description: 'Called on link click — call e.preventDefault() to handle routing' },
    { name: 'NavMenu.ariaLabel', type: 'string', default: "'Main navigation'", required: false, description: 'Accessible label for the nav landmark' },
    { name: 'NavMenu.className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    { name: 'MobileNav.items', type: 'MobileNavItem[]', default: '—', required: true, description: 'Array of { href, label, icon? } — icon renders before label' },
    { name: 'MobileNav.logo', type: 'React.ReactNode', default: '—', required: false, description: 'Slot in the panel header' },
    { name: 'MobileNav.footer', type: 'React.ReactNode', default: '—', required: false, description: 'Slot at bottom of panel (user info, sign-out, etc.)' },
    { name: 'MobileNav.isActive', type: '(href: string) => boolean', default: 'pathname match', required: false, description: 'Returns true to mark a link as active' },
    { name: 'MobileNav.onNavigate', type: '(href, e) => void', default: '—', required: false, description: 'Called on link click inside the drawer' },
    { name: 'MobileNav.ariaLabel', type: 'string', default: "'Mobile navigation'", required: false, description: 'Accessible label for the nav landmark' },
    { name: 'MobileNav.defaultOpen', type: 'boolean', default: 'false', required: false, description: 'Open the drawer on first render — useful for demos and testing' },
    { name: 'MobileNav.forceVisible', type: 'boolean', default: 'false', required: false, description: 'Override desktop media-query hiding so the trigger and panel render at any viewport width' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { NavMenu, MobileNav } from '@doriansmith/kiln';

const items = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
];

// NavMenu tests
it('renders all nav links', () => {
  render(<NavMenu items={items} />);
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument();
});

it('marks active link with aria-current', () => {
  render(<NavMenu items={items} isActive={(href) => href === '/' } />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
});

// MobileNav tests
it('opens drawer on hamburger click', () => {
  render(<MobileNav items={items} />);
  fireEvent.click(screen.getByRole('button', { name: /open navigation/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('closes drawer on Escape', () => {
  render(<MobileNav items={items} />);
  fireEvent.click(screen.getByRole('button', { name: /open navigation/i }));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});`,
  usage: `// Custom nav bar built from primitives (use this when Nav's layout doesn't fit your design)
function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
  ];

  const isActive = (href: string) => location.pathname === href;
  const onNavigate = (href: string) => navigate(href);

  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '0 1.5rem', height: 56 }}>
      <strong>MyApp</strong>

      {/* Desktop — hidden on mobile via CSS */}
      <NavMenu
        items={NAV_ITEMS}
        isActive={isActive}
        onNavigate={onNavigate}
        className="desktop-only"
      />

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <ThemeToggle />
        {/* Mobile — hidden on desktop via CSS */}
        <MobileNav
          items={NAV_ITEMS}
          logo={<strong>MyApp</strong>}
          isActive={isActive}
          onNavigate={onNavigate}
          className="mobile-only"
        />
      </div>
    </header>
  );
}

// For most cases, just use Nav — it handles all of the above automatically:
// <Nav logo={logo} items={NAV_ITEMS} actions={<ThemeToggle />} isActive={isActive} onNavigate={onNavigate} />`,
};
