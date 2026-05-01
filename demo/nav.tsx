// Shared nav constants — consumed by LandingPage, ComponentsPage, and AboutPage.
import { navigate } from './useRouter';

export const NAV_ITEMS = [
  { href: '/',          label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/about',     label: 'About' },
];

export const NAV_LOGO = (
  <img src="/logo.png" alt="Kiln" style={{ height: 36, width: 'auto' }} />
);

export const FOOTER_LINKS = [
  { href: 'https://github.com/Aldentec/kiln', label: 'GitHub', external: true as const },
  { href: 'https://www.npmjs.com/package/@doriansmith/kiln', label: 'npm', external: true as const },
  { href: '/components', label: 'Components' },
  { href: '/about',      label: 'About' },
];

export function isNavActive(href: string): boolean {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (href === '/') return path === '/';
  return path === href;
}
