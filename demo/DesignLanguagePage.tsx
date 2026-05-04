import React from 'react';
import { Nav, Footer, Hero, Header, Button, Card, Grid } from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, navigate, NavActions } from './nav';

// ─── Topic preview data ───────────────────────────────────
const UPCOMING_TOPICS = [
  {
    title: 'Color',
    description:
      'Palette, semantic roles, accessible contrast ratios, and dark-mode token mappings.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="var(--kiln-primary)" opacity="0.1" />
        <circle cx="14" cy="17" r="6" fill="var(--kiln-primary)" opacity="0.7" />
        <circle cx="26" cy="17" r="6" fill="var(--kiln-accent)" opacity="0.7" />
        <circle cx="20" cy="26" r="6" fill="#22c55e" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: 'Typography',
    description:
      'Type scale, font weights, line-height, and letter-spacing used across every component.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="var(--kiln-accent)" opacity="0.1" />
        <text x="8" y="27" fontFamily="serif" fontSize="22" fontWeight="700" fill="var(--kiln-accent)" opacity="0.85">Aa</text>
      </svg>
    ),
  },
  {
    title: 'Spacing',
    description:
      'The 4-point spacing scale that drives padding, margin, and gap decisions throughout the system.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="var(--kiln-primary)" opacity="0.1" />
        <rect x="10" y="19" width="20" height="2" rx="1" fill="var(--kiln-primary)" opacity="0.8" />
        <line x1="10" y1="13" x2="10" y2="27" stroke="var(--kiln-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <line x1="30" y1="13" x2="30" y2="27" stroke="var(--kiln-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      </svg>
    ),
  },
  {
    title: 'Design Tokens',
    description:
      'Every CSS custom property in the system: names, values, and when to use each one.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="var(--kiln-primary)" opacity="0.1" />
        <rect x="9" y="13" width="22" height="5" rx="2" fill="var(--kiln-primary)" opacity="0.25" />
        <rect x="9" y="21" width="16" height="5" rx="2" fill="var(--kiln-primary)" opacity="0.5" />
        <circle cx="34" cy="15.5" r="3" fill="var(--kiln-primary)" />
        <circle cx="28" cy="23.5" r="3" fill="var(--kiln-accent)" />
      </svg>
    ),
  },
  {
    title: 'Iconography',
    description:
      'Guidelines for icon size, stroke weight, optical alignment, and accessibility labelling.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="var(--kiln-accent)" opacity="0.1" />
        <path d="M13 20l4 4 10-9" stroke="var(--kiln-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    title: 'Motion',
    description:
      'Easing curves, duration values, and the GPU-accelerated animation principles behind every transition.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="var(--kiln-primary)" opacity="0.1" />
        <path d="M10 28 Q20 10 30 28" stroke="var(--kiln-primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
        <circle cx="30" cy="28" r="3" fill="var(--kiln-primary)" opacity="0.8" />
      </svg>
    ),
  },
];

const SECTION_CONTAINER: React.CSSProperties = {
  maxWidth: 1100,
  width: '100%',
  margin: '0 auto',
  boxSizing: 'border-box',
  padding: '0 clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
};

export default function DesignLanguagePage() {
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
        <Hero
          id="dl-hero-heading"
          size="md"
          eyebrow="Design Language"
          title="The visual and systemic building blocks behind every Kiln component"
          description="Color, typography, spacing, tokens, iconography, and motion, documented so you can extend the system consistently."
        />

        {/* ══════════════════════════════════════════════
            COMING SOON + TOPIC GRID
        ══════════════════════════════════════════════ */}
        {/* Coming soon card — centred in its own section */}
        <section
          aria-label="Documentation status"
          style={{
            background: 'var(--kiln-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--kiln-space-16) clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
            minHeight: 280,
          }}
        >
          <Card
            variant="coming-soon"
            description="The design language documentation is in progress. Here's a preview of what's on the way."
          />
        </section>

        <section
          aria-labelledby="dl-browse-heading"
          style={{ background: 'var(--kiln-surface)', paddingBottom: 'var(--kiln-space-16)' }}
        >
          <div style={SECTION_CONTAINER}>
            <Header id="dl-browse-heading" variant="h2" divider>
              What's coming
            </Header>

            <div style={{ marginTop: 'var(--kiln-space-8)' }}>
              <Grid cols={3} gap="md">
                {UPCOMING_TOPICS.map(({ title, description, icon }) => (
                  <Card
                    key={title}
                    variant="default"
                    style={{
                      '--kiln-card-padding': 'var(--kiln-space-6)',
                    } as React.CSSProperties}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
                      {/* Dim only the decorative icon, not the text, which would break contrast */}
                      <div style={{ opacity: 0.72 }}>{icon}</div>
                      <div>
                        <p
                          style={{
                            fontSize: 'var(--kiln-text-base)',
                            fontWeight: 700,
                            color: 'var(--kiln-gray-900)',
                            margin: '0 0 var(--kiln-space-1)',
                            fontFamily: 'var(--kiln-font-sans)',
                          }}
                        >
                          {title}
                        </p>
                        <p
                          style={{
                            fontSize: 'var(--kiln-text-sm)',
                            color: 'var(--kiln-gray-600)',
                            margin: 0,
                            lineHeight: 'var(--kiln-leading-relaxed)',
                            fontFamily: 'var(--kiln-font-sans)',
                          }}
                        >
                          {description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="dl-cta-heading">
          <Header
            id="dl-cta-heading"
            variant="h2"
            description="The components are available today. Browse the full component library while the design language docs are being written."
            actions={
              <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', flexWrap: 'wrap' }}>
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
            }
            divider
          >
            Ready to build now?
          </Header>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <Footer
        logo={NAV_LOGO}
        links={FOOTER_LINKS}
        copyright={<>© {new Date().getFullYear()} <a href="https://doriansmith.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Dorian Smith</a></>}
        credit="Kiln v0.3.0 - MIT License"
      />
    </div>
  );
}
