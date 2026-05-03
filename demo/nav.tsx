// Shared nav constants — consumed by LandingPage, ComponentsPage, and AboutPage.
import React from 'react';
import { ThemeToggle, Badge } from '@doriansmith/kiln';
import { navigate } from './useRouter';

export { navigate };

export const NAV_ITEMS = [
  { href: '/components',      label: 'Components' },
  { href: '/design-language', label: 'Design Language' },
  { href: '/demos',           label: 'Demos' },
  { href: '/about',           label: 'About' },
];

export const NAV_LOGO = (
  <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
    <picture>
      <source type="image/webp" srcSet="/logo.webp" />
      <img src="/logo.png" alt="Kiln" width={36} height={36} fetchPriority="high" style={{ height: 36, width: 36 }} />
    </picture>
  </a>
);

export const NavActions: React.FC = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <Badge variant="pending" size="sm">Beta</Badge>
    <ThemeToggle />
  </div>
);

export const FOOTER_LINKS = [
  { href: 'https://github.com/Aldentec/kiln', label: 'GitHub', external: true as const },
  { href: 'https://www.npmjs.com/package/@doriansmith/kiln', label: 'npm', external: true as const },
  { href: '/components',      label: 'Components' },
  { href: '/design-language', label: 'Design Language' },
  { href: '/demos',           label: 'Demos' },
  { href: '/about',           label: 'About' },
];

export function isNavActive(href: string): boolean {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (href === '/') return path === '/';
  // Match /components and /components/badge etc.
  return path === href || path.startsWith(href + '/');
}
