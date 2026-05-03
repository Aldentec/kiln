// Shared nav constants — consumed by LandingPage, ComponentsPage, and AboutPage.
import { navigate } from './useRouter';

export const NAV_ITEMS = [
  { href: '/components', label: 'Components' },
  { href: '/about',      label: 'About' },
];

export const NAV_LOGO = (
  <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
    <img src="/logo.png" alt="Kiln" style={{ height: 36, width: 'auto' }} />
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 7px',
      borderRadius: '999px',
      background: 'var(--kiln-primary)',
      color: '#fff',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.04em',
      lineHeight: 1.4,
      verticalAlign: 'middle',
    }}>Beta</span>
  </a>
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
