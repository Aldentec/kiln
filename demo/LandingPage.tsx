import React, { useState } from 'react';
import {
  Nav, Button, Card, Badge, Chip, Tabs, Input,
  Footer, CodeBlock, Grid,
} from '@doriansmith/kiln';

import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, NavActions } from './nav';

// ─── Code snippets ────────────────────────────────────────
const INSTALL_CODE = `npm install @doriansmith/kiln`;

const USAGE_CODE = `import '@doriansmith/kiln/kiln.css';
import { Button } from '@doriansmith/kiln';

export default function App() {
  return <Button variant="primary">Ship it</Button>;
}`;

// ─── Pillar data ──────────────────────────────────────────
const PILLARS = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-primary)" opacity="0.12" />
        <path
          d="M18 6L7 11v9c0 7.2 5 12.9 11 14.5C24 32.9 29 27.2 29 20V11L18 6z"
          stroke="var(--kiln-primary)"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M13 18l3.5 3.5L23 14"
          stroke="var(--kiln-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Accessible by default',
    description:
      'Every component meets WCAG AA out of the box. Keyboard navigation, focus management, focus rings, and correct ARIA are built in, not bolted on. Accessibility debt costs more to fix later than to build correctly now.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-accent)" opacity="0.12" />
        <path
          d="M20 5L9 20h9l-2 11L28 16h-9l2-11z"
          fill="var(--kiln-accent)"
          stroke="var(--kiln-accent-dark)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Performance-first',
    description:
      "Kiln components don't tank your Lighthouse score. Zero layout shift on every interaction. All animations use transform and opacity: GPU-accelerated, no layout thrashing. Bundle size is measured and budgeted.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-accent)" opacity="0.12" />
        <rect x="13" y="4" width="10" height="28" rx="2" stroke="var(--kiln-accent)" strokeWidth="2" fill="none" />
        <circle cx="18" cy="28" r="1.2" fill="var(--kiln-accent)" />
        <line x1="14" y1="8" x2="22" y2="8" stroke="var(--kiln-accent)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Genuinely mobile-ready',
    description:
      'Every component works on real devices at 375px. All interactive elements meet the 44x44px touch target requirement. No text below 14px on small screens. Positioned overlays are viewport-constrained. Mobile is not optional.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-primary)" opacity="0.12" />
        <rect x="6" y="8" width="24" height="20" rx="3" stroke="var(--kiln-primary)" strokeWidth="2" fill="none" />
        <path
          d="M12 15l5 3.5L12 22"
          stroke="var(--kiln-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 22h4"
          stroke="var(--kiln-primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Built for solo devs',
    description:
      'From npm install to a rendered Kiln page in under 2 minutes. No config files, no setup wizards, no theme providers, no context wrappers. Every example is copy-paste ready. TypeScript is fully inferred.',
  },
];

// ─── Preview tab items ────────────────────────────────────
const PREVIEW_TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'api', label: 'API' },
  { value: 'examples', label: 'Examples' },
];

// ─── Shared layout helpers ────────────────────────────────
const sectionBase: React.CSSProperties = {
  padding: 'var(--kiln-space-16) clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
  maxWidth: 1100,
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 auto',
};

const sectionLabel: React.CSSProperties = {
  fontSize: 'var(--kiln-text-xs)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--kiln-primary)',
  marginBottom: 'var(--kiln-space-3)',
};

const sectionHeading: React.CSSProperties = {
  fontSize: 'clamp(1.5rem, 3vw, var(--kiln-text-3xl))',
  fontWeight: 700,
  letterSpacing: 'var(--kiln-tracking-tight)',
  lineHeight: 'var(--kiln-leading-tight)',
  color: 'var(--kiln-gray-900)',
  margin: '0 0 var(--kiln-space-4)',
};

const previewLabel: React.CSSProperties = {
  fontSize: 'var(--kiln-text-xs)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--kiln-gray-500)', /* was opacity:0.4 which blends to ~2:1 in both modes ❌ */
  marginBottom: 'var(--kiln-space-4)',
};

// ─── Component ────────────────────────────────────────────
export default function LandingPage() {

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
      {/* ── Nav ────────────────────────────────────────── */}
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
        <section
          aria-label="Kiln introduction"
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'var(--kiln-space-16) clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
            flexDirection: 'column',
            gap: 'var(--kiln-space-6)',
          }}
        >
          {/* Wordmark */}
          <div
            aria-hidden="true"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 6rem)',
              fontWeight: 700,
              letterSpacing: 'var(--kiln-tracking-tight)',
              lineHeight: 1,
              background: 'var(--kiln-gradient-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'var(--kiln-gradient-text-shadow, none)',
            }}
          >
            Kiln
          </div>

          {/* Visually-hidden accessible heading */}
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, var(--kiln-text-4xl))',
              fontWeight: 700,
              letterSpacing: 'var(--kiln-tracking-tight)',
              lineHeight: 'var(--kiln-leading-tight)',
              margin: 0,
              color: 'var(--kiln-gray-900)',
              maxWidth: 680,
            }}
          >
            Accessible React Component Library: Ship Fast Without Compromise
          </h1>

          <p
            style={{
              fontSize: 'clamp(var(--kiln-text-base), 2vw, var(--kiln-text-lg))',
              color: 'var(--kiln-gray-600)',
              maxWidth: 560,
              margin: 0,
              lineHeight: 'var(--kiln-leading-relaxed)',
            }}
          >
            Kiln is a lightweight React component library with 20+ WCAG AA-compliant
            components. Zero config, zero dependencies, under 25 KB gzipped.
            Install and ship accessible UIs in under 2 minutes.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--kiln-space-4)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 'var(--kiln-space-2)',
            }}
          >
            <Button variant="primary" href="/components" size="lg">
              View Components
            </Button>
            <Button variant="secondary" href="#install" size="lg">
              Get Started
            </Button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--kiln-space-3)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 'var(--kiln-space-4)',
            }}
            aria-label="Key features"
          >
            <Badge variant="success">WCAG AA</Badge>
            <Badge variant="info">TypeScript</Badge>
            <Badge variant="running">20+ Primitives</Badge>
            <Badge variant="pending">v0.1.0</Badge>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            THREE PILLARS
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="pillars-heading" style={{ background: 'var(--kiln-surface)', padding: 'var(--kiln-space-16) 0' }}>
          <div style={sectionBase}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--kiln-space-12)' }}>
              <p style={sectionLabel}>Why Kiln</p>
              <h2 id="pillars-heading" style={sectionHeading}>
                Built on four non-negotiables.
              </h2>
              <p style={{ color: 'var(--kiln-gray-600)', maxWidth: 540, margin: '0 auto', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                Every decision in this codebase is evaluated against one question:
                "Does this help an indie dev ship a real product faster?"
              </p>
            </div>

            <Grid cols={4} gap="md">
              {PILLARS.map(({ icon, title, description }) => (
                <Card
                  key={title}
                  variant="default"
                  style={{ '--kiln-card-padding': 'var(--kiln-space-8)' } as React.CSSProperties}
                >
                  <div style={{ marginBottom: 'var(--kiln-space-5)' }}>{icon}</div>
                  <h3
                    style={{
                      fontSize: 'var(--kiln-text-lg)',
                      fontWeight: 700,
                      margin: '0 0 var(--kiln-space-3)',
                      color: 'var(--kiln-gray-900)',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--kiln-text-sm)',
                      color: 'var(--kiln-gray-600)',
                      margin: 0,
                      lineHeight: 'var(--kiln-leading-relaxed)',
                    }}
                  >
                    {description}
                  </p>
                </Card>
              ))}
            </Grid>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            QUICK INSTALL  (#install anchor target)
        ══════════════════════════════════════════════ */}
        <section
          id="install"
          aria-labelledby="install-heading"
          style={{ padding: 'var(--kiln-space-16) 0' }}
        >
          <div style={sectionBase}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                gap: 'var(--kiln-space-12)',
                alignItems: 'start',
              }}
            >
              {/* Left: copy */}
              <div>
                <p style={sectionLabel}>Get started</p>
                <h2 id="install-heading" style={sectionHeading}>
                  From install to render in under 2 minutes.
                </h2>
                <p
                  style={{
                    color: 'var(--kiln-gray-600)',
                    lineHeight: 'var(--kiln-leading-relaxed)',
                    marginBottom: 'var(--kiln-space-6)',
                  }}
                >
                  No config files. No setup wizards. No theme providers. Import the
                  CSS once, drop in a component, and ship.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)' }}>
                    <Badge variant="info">1</Badge>
                    <span style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)' }}>Install the package</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)' }}>
                    <Badge variant="info">2</Badge>
                    <span style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)' }}>Import the CSS once at your app root</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)' }}>
                    <Badge variant="info">3</Badge>
                    <span style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)' }}>Use components. That's it.</span>
                  </div>
                </div>
                <p
                  style={{
                    marginTop: 'var(--kiln-space-6)',
                    fontSize: 'var(--kiln-text-sm)',
                    color: 'var(--kiln-gray-600)',
                    padding: 'var(--kiln-space-3) var(--kiln-space-4)',
                    background: 'var(--kiln-primary-50)',
                    borderRadius: 'var(--kiln-radius-md)',
                    borderLeft: '3px solid var(--kiln-primary)',
                  }}
                >
                  Dark mode: set{' '}
                  <code
                    style={{
                      fontFamily: 'var(--kiln-font-mono)',
                      fontSize: 'var(--kiln-text-xs)',
                      background: 'var(--kiln-primary-100)',
                      padding: '1px 5px',
                      borderRadius: 'var(--kiln-radius-sm)',
                    }}
                  >
                    data-theme="dark"
                  </code>{' '}
                  on <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)' }}>&lt;html&gt;</code>.
                  Use the built-in <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)' }}>ThemeToggle</code> for automatic persistence.
                </p>
              </div>

              {/* Right: code blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)' }}>
                <CodeBlock code={INSTALL_CODE} language="bash" />
                <CodeBlock code={USAGE_CODE} language="tsx" />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            COMPONENT PREVIEW
        ══════════════════════════════════════════════ */}
        <section
          aria-labelledby="preview-heading"
          style={{ background: 'var(--kiln-surface)', padding: 'var(--kiln-space-16) 0' }}
        >
          <div style={sectionBase}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--kiln-space-12)' }}>
              <p style={sectionLabel}>Components</p>
              <h2 id="preview-heading" style={sectionHeading}>
                20+ primitives, ready to ship.
              </h2>
              <p style={{ color: 'var(--kiln-gray-600)', maxWidth: 480, margin: '0 auto', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                Everything you need for a polished app. Nothing you don't.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--kiln-space-5)',
              }}
            >
              {/* Buttons */}
              <PreviewCard label="Button">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
                  <Button size="sm" variant="primary">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                  <Button size="sm" variant="danger">Danger</Button>
                </div>
              </PreviewCard>

              {/* Badges */}
              <PreviewCard label="Badge">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="critical">Critical</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="pending">Pending</Badge>
                  <Badge variant="running">Running</Badge>
                </div>
              </PreviewCard>

              {/* Input */}
              <PreviewCard label="Input">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
                  <Input placeholder="Default input" />
                  <Input errorText="Something went wrong" placeholder="Error state" />
                </div>
              </PreviewCard>

              {/* Chips */}
              <PreviewCard label="Chip">
                <ChipPreview />
              </PreviewCard>

              {/* Tabs */}
              <PreviewCard label="Tabs">
                <Tabs items={PREVIEW_TABS} defaultValue="overview" />
              </PreviewCard>

              {/* Cards */}
              <PreviewCard label="Card">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--kiln-space-2)',
                  }}
                >
                  {(['default', 'raised', 'glass', 'gradient-border'] as const).map((v) => (
                    <Card
                      key={v}
                      variant={v}
                      style={{ '--kiln-card-padding': 'var(--kiln-space-3)' } as React.CSSProperties}
                    >
                      <span
                        style={{
                          fontSize: 'var(--kiln-text-xs)',
                          color: 'var(--kiln-gray-600)',
                          textTransform: 'capitalize',
                        }}
                      >
                        {v}
                      </span>
                    </Card>
                  ))}
                </div>
              </PreviewCard>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--kiln-space-10)' }}>
              <Button variant="ghost" href="/components" size="lg">
                View all 20+ components →
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ACCESSIBILITY STATEMENT
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="a11y-heading" style={{ padding: 'var(--kiln-space-16) 0' }}>
          <div style={{ ...sectionBase, maxWidth: 800, textAlign: 'center' }}>
            <Card variant="gradient-border" style={{ '--kiln-card-padding': 'var(--kiln-space-10)' } as React.CSSProperties}>
              <p style={sectionLabel}>Accessibility</p>
              <h2
                id="a11y-heading"
                style={{
                  ...sectionHeading,
                  fontSize: 'var(--kiln-text-2xl)',
                  margin: '0 0 var(--kiln-space-4)',
                }}
              >
                Every component meets WCAG AA.
              </h2>
              <p style={{ color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', maxWidth: 540, margin: '0 auto var(--kiln-space-6)' }}>
                Keyboard navigable end-to-end. Proper focus management and ARIA on every primitive.
                Tested with axe DevTools and manual keyboard navigation. Accessibility isn't
                an add-on. It's how Kiln ships.
              </p>
              <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Badge variant="success">Keyboard navigation</Badge>
                <Badge variant="success">ARIA attributes</Badge>
                <Badge variant="success">Focus management</Badge>
                <Badge variant="success">Screen reader tested</Badge>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────── */}
      <Footer
        logo={<img src="/logo.png" alt="Kiln" style={{ height: 36, width: 'auto' }} />}
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} Dorian Smith`}
        credit="Kiln v0.1.0, MIT License"
      />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────

function PreviewCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Card variant="default">
      <p style={previewLabel}>{label}</p>
      {children}
    </Card>
  );
}

function ChipPreview() {
  const chips = ['React', 'TypeScript', 'CSS', 'Node.js'];
  const [selected, setSelected] = useState<Set<string>>(new Set(['React', 'TypeScript']));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
      {chips.map((chip) => (
        <Chip
          key={chip}
          selected={selected.has(chip)}
          onToggle={(sel) => {
            const next = new Set(selected);
            sel ? next.add(chip) : next.delete(chip);
            setSelected(next);
          }}
        >
          {chip}
        </Chip>
      ))}
    </div>
  );
}
