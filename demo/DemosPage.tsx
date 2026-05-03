import React from 'react';
import { Nav, Footer, Header, Card, Button } from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, navigate, NavActions } from './nav';

export default function DemosPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--kiln-body-bg)',
        color: 'var(--kiln-gray-900)',
        fontFamily: 'var(--kiln-font-sans)',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      {/* ── Nav ─────────────────────────────────────────── */}
      <Nav
        logo={NAV_LOGO}
        items={NAV_ITEMS}
        isActive={isNavActive}
        onNavigate={(href) => { window.history.pushState(null, '', href); window.dispatchEvent(new Event('popstate')); }}
        actions={<NavActions />}
      />

      <main>
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="demos-hero-heading">
          <Header
            id="demos-hero-heading"
            variant="h1"
            tagline="Demos"
            description="Hands-on showcases of Kiln components working together in realistic UI patterns and complete application flows."
          >
            Interactive demos and real-world examples
          </Header>

          {/* Coming soon + CTAs — share the Header's max-width container */}
          <div
            style={{
              maxWidth: 1100,
              width: '100%',
              margin: '0 auto',
              boxSizing: 'border-box',
              padding: '0 clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8)) var(--kiln-space-16)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--kiln-space-8)',
            }}
          >
            <Card
              variant="coming-soon"
              description="Demo pages are on the way. Check back soon to explore real-world examples built with Kiln components."
            />

            <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="primary" asChild>
                <a href="/components" onClick={(e) => { e.preventDefault(); navigate('/components'); }}>
                  Browse components
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="https://github.com/Aldentec/kiln" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <Footer
        logo={NAV_LOGO}
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} Dorian Smith`}
        credit="Kiln v0.1.0 — MIT License"
      />
    </div>
  );
}
