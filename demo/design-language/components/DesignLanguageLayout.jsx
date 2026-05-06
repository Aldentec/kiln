import React from 'react';
import { Nav, Footer, Breadcrumbs } from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, NavActions, navigate } from '../../nav';
import { MDXProvider } from './MDXProvider';

export function DesignLanguageLayout({ children, section }) {
  const breadcrumbItems = section
    ? [
        {
          label: 'Design Language',
          href: '/design-language',
          onClick: (e) => { e.preventDefault(); navigate('/design-language'); },
        },
        { label: section },
      ]
    : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--kiln-body-bg)',
        color: 'var(--kiln-gray-900)',
        fontFamily: 'var(--kiln-font-sans)',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <Nav
        logo={NAV_LOGO}
        items={NAV_ITEMS}
        isActive={isNavActive}
        onNavigate={(href) => { window.history.pushState(null, '', href); window.dispatchEvent(new Event('popstate')); }}
        actions={<NavActions />}
      />
      {breadcrumbItems && (
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: 'var(--kiln-space-4) var(--kiln-space-6) 0',
            boxSizing: 'border-box',
          }}
        >
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}
      <main>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: 'var(--kiln-space-8) var(--kiln-space-6)',
            boxSizing: 'border-box',
          }}
        >
          <MDXProvider>
            {children}
          </MDXProvider>
        </div>
      </main>
      <Footer
        logo={NAV_LOGO}
        links={FOOTER_LINKS}
        copyright={<>© {new Date().getFullYear()} <a href="https://doriansmith.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Dorian Smith</a></>}
        credit="Kiln — MIT License"
      />
    </div>
  );
}
