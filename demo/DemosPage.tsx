import React, { useState, lazy, Suspense } from 'react';
import { Nav, Footer, Hero, Card, Badge, Button, Grid, Chip, LoadingIndicator } from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, navigate, NavActions } from './nav';

// Lazy-load each demo so highlight.js / heavy content stays off the critical path.
const DemoEcommerce = lazy(() => import('./DemoEcommerce'));
const DemoSettings  = lazy(() => import('./DemoSettings'));
const DemoSupport   = lazy(() => import('./DemoSupport'));

// ─── Demo metadata ────────────────────────────────────────────────────────────

type DemoId = 'ecommerce' | 'settings' | 'support';

interface DemoMeta {
  id: DemoId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  components: string[];
}

const DEMOS: DemoMeta[] = [
  {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    eyebrow: '🛒 Demo 1',
    title: 'Product Store',
    description: 'A fully interactive product catalog with real-time search, category filters, product detail tabs, spec badges, star ratings, and a shopping cart — all in one cohesive UI.',
    tags: ['Grid', 'Card', 'Badge', 'Button', 'Chip', 'Input', 'Tabs', 'Modal', 'Accordion', 'Tooltip'],
    components: ['Grid', 'Card', 'Badge', 'Button', 'Chip', 'Input', 'Tabs', 'Modal', 'Accordion', 'Tooltip', 'Toast'],
  },
  {
    id: 'settings',
    label: 'Account Settings',
    eyebrow: '⚙️ Demo 2',
    title: 'Settings Dashboard',
    description: 'A complete account settings experience with profile editing, granular notification toggles, billing plan selection with RadioButtons, and a secure account deletion flow.',
    tags: ['Tabs', 'Input', 'Textarea', 'Toggle', 'RadioButton', 'Modal', 'Badge', 'Tooltip'],
    components: ['Tabs', 'Input', 'Textarea', 'Toggle', 'RadioButton', 'Modal', 'Badge', 'Card', 'Tooltip', 'Toast'],
  },
  {
    id: 'support',
    label: 'Support Center',
    eyebrow: '🎫 Demo 3',
    title: 'Ticket Manager',
    description: 'A help-desk interface for tracking support tickets: live search, status filters, action dropdowns, a new-ticket form with priority RadioButtons, and an FAQ accordion.',
    tags: ['Card', 'Badge', 'Chip', 'Input', 'Textarea', 'DropdownMenu', 'Modal', 'Accordion', 'Tooltip'],
    components: ['Card', 'Badge', 'Chip', 'Input', 'Textarea', 'RadioButton', 'DropdownMenu', 'Modal', 'Accordion', 'Tooltip', 'Toast'],
  },
];

// ─── Shared layout constants ──────────────────────────────────────────────────

const sectionBase: React.CSSProperties = {
  maxWidth: 1100,
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '0 clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
};

const sectionLabel: React.CSSProperties = {
  fontSize: 'var(--kiln-text-xs)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--kiln-primary)',
  marginBottom: 'var(--kiln-space-3)',
  marginTop: 0,
};

// ─── Demo loading fallback ────────────────────────────────────────────────────

function DemoSkeleton() {
  return (
    <Card variant="default" style={{ '--kiln-card-padding': 'var(--kiln-space-12)', textAlign: 'center' } as React.CSSProperties}>
      <LoadingIndicator size="lg" />
    </Card>
  );
}

// ─── DemosPage ────────────────────────────────────────────────────────────────

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState<DemoId>('ecommerce');

  const active = DEMOS.find(d => d.id === activeDemo)!;

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
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <Nav
        logo={NAV_LOGO}
        items={NAV_ITEMS}
        isActive={isNavActive}
        onNavigate={(href) => { window.history.pushState(null, '', href); window.dispatchEvent(new Event('popstate')); }}
        actions={<NavActions />}
      />

      <main style={{ flex: 1 }}>
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <Hero
          id="demos-hero-heading"
          size="md"
          eyebrow="Demos"
          title="Interactive demos and real-world examples"
          description="Hands-on showcases of Kiln components working together in realistic UI patterns. Every demo is fully interactive — click, type, and explore."
        />

        {/* ══════════════════════════════════════════════
            DEMO GALLERY — three preview cards
        ══════════════════════════════════════════════ */}
        <section
          aria-labelledby="gallery-heading"
          style={{ padding: 'var(--kiln-space-12) 0 var(--kiln-space-6)' }}
        >
          <div style={sectionBase}>
            <p style={sectionLabel}>Choose a demo</p>
            <Grid cols={3} gap="md">
              {DEMOS.map(demo => (
                <Card
                  key={demo.id}
                  variant={activeDemo === demo.id ? 'gradient-border' : 'default'}
                  hoverLift
                  onClick={() => setActiveDemo(demo.id)}
                  style={{ '--kiln-card-padding': 'var(--kiln-space-6)' } as React.CSSProperties}
                >
                  <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-2)' }}>
                    {demo.eyebrow}
                  </p>
                  <h3 style={{
                    margin: '0 0 var(--kiln-space-2)',
                    fontSize: 'var(--kiln-text-lg)',
                    fontWeight: 700,
                    color: 'var(--kiln-gray-900)',
                    lineHeight: 'var(--kiln-leading-tight)',
                  }}>
                    {demo.title}
                  </h3>
                  <p style={{
                    margin: '0 0 var(--kiln-space-4)',
                    fontSize: 'var(--kiln-text-sm)',
                    color: 'var(--kiln-gray-600)',
                    lineHeight: 'var(--kiln-leading-relaxed)',
                  }}>
                    {demo.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-1)', marginBottom: 'var(--kiln-space-4)' }}>
                    {demo.tags.slice(0, 5).map(tag => (
                      <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                    ))}
                    {demo.tags.length > 5 && (
                      <Badge variant="neutral" size="sm">+{demo.tags.length - 5}</Badge>
                    )}
                  </div>
                  <Button
                    variant={activeDemo === demo.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); setActiveDemo(demo.id); }}
                  >
                    {activeDemo === demo.id ? 'Viewing' : 'View demo →'}
                  </Button>
                </Card>
              ))}
            </Grid>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            ACTIVE DEMO AREA
        ══════════════════════════════════════════════ */}
        <section
          aria-label={`${active.label} demo`}
          style={{ paddingBottom: 'var(--kiln-space-16)' }}
        >
          <div style={sectionBase}>
            {/* Demo header */}
            <div style={{ marginBottom: 'var(--kiln-space-5)', paddingBottom: 'var(--kiln-space-5)', borderBottom: '1px solid var(--kiln-gray-200)' }}>
              <p style={sectionLabel}>{active.eyebrow}</p>
              <h2 style={{ margin: '0 0 var(--kiln-space-2)', fontSize: 'var(--kiln-text-2xl)', fontWeight: 700, color: 'var(--kiln-gray-900)', letterSpacing: 'var(--kiln-tracking-tight)' }}>
                {active.label}
              </h2>
              <p style={{ margin: '0 0 var(--kiln-space-4)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', maxWidth: 640 }}>
                {active.description}
              </p>
              <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-2)' }}>Components used</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-1)' }}>
                {active.components.map(c => (
                  <Chip key={c} selected={false} onToggle={() => { navigate(`/components/${c.toLowerCase()}`); }}>
                    {c}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Demo switcher (chips) */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--kiln-space-2)',
                marginBottom: 'var(--kiln-space-5)',
                flexWrap: 'wrap',
              }}
              role="group"
              aria-label="Select demo"
            >
              {DEMOS.map(d => (
                <Chip
                  key={d.id}
                  selected={activeDemo === d.id}
                  onToggle={() => setActiveDemo(d.id)}
                >
                  {d.label}
                </Chip>
              ))}
            </div>

            {/* The demo itself */}
            <Suspense fallback={<DemoSkeleton />}>
              {activeDemo === 'ecommerce' && <DemoEcommerce />}
              {activeDemo === 'settings'  && <DemoSettings  />}
              {activeDemo === 'support'   && <DemoSupport   />}
            </Suspense>
          </div>
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
