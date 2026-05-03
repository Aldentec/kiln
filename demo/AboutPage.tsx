import React from 'react';
import { Nav, Footer, Header, Card, Badge, Button } from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, navigate, NavActions } from './nav';

// ─── Shared layout styles ────────────────────────────────
const sectionBase: React.CSSProperties = {
  padding: 'var(--kiln-space-16) clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
  maxWidth: 1100,
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 auto',
};

// ─── The 4 Pillars ───────────────────────────────────────
const PILLARS = [
  {
    number: '01',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-primary)" opacity="0.12" />
        <circle cx="18" cy="18" r="15" stroke="var(--kiln-primary)" strokeWidth="2" fill="none" />
        <path d="M11 18l3 3 8-8" stroke="var(--kiln-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Accessibility-first',
    problem: 'Most component libraries treat accessibility as an afterthought. ARIA attributes get bolted on later, keyboard navigation is spotty, and focus management breaks in production. The result? Technical debt that locks out users and invites legal risk.',
    solution: 'Every Kiln component ships WCAG AA-compliant from day one. Keyboard navigation, focus rings, focus traps, and correct ARIA roles are built in — not bolted on. Tested with axe DevTools and manual screen-reader verification.',
    benefit: 'Ship inclusive products without retrofitting. Your users get equal access, your codebase stays clean, and you avoid the cost of accessibility remediation after launch.',
  },
  {
    number: '02',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-accent)" opacity="0.12" />
        <path d="M20 5L9 20h9l-2 11L28 16h-9l2-11z" fill="var(--kiln-accent)" stroke="var(--kiln-accent-dark)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Performance-first',
    problem: 'Heavy component libraries silently tank your Lighthouse scores. JavaScript animation overhead, layout thrashing, and Cumulative Layout Shift creep in as you add features — and your users pay for it with slow load times.',
    solution: 'Zero layout shift on every interaction. All animations use `transform` and `opacity` — GPU-accelerated, no layout thrashing, no JavaScript animation overhead. The entire CSS bundle is ~10 KB gzipped. Total gzipped footprint is under 25 KB.',
    benefit: 'Your Lighthouse scores stay green as you scale. Pages load fast, interactions feel instant, and you never have to choose between polish and performance.',
  },
  {
    number: '03',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-primary)" opacity="0.12" />
        <rect x="6" y="8" width="24" height="20" rx="3" stroke="var(--kiln-primary)" strokeWidth="2" fill="none" />
        <path d="M12 15l5 3.5L12 22" stroke="var(--kiln-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 22h4" stroke="var(--kiln-primary)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Solo-dev friendly',
    problem: 'Most UI libraries demand hours of setup: config files, theme providers, context wrappers, and peer dependency wrangling. For a solo developer or small team, that is time stolen from building the product that matters.',
    solution: 'From `npm install` to rendering a Kiln component in under 2 minutes. No config files. No setup wizards. No theme provider components. No required context wrappers. One CSS import, then import and use. Every code example is copy-paste ready with full TypeScript inference.',
    benefit: 'Stop rebuilding the same buttons, inputs, and modals every project. Install, import, and ship — so you can focus on your product, not your component library.',
  },
  {
    number: '04',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="var(--kiln-primary)" opacity="0.12" />
        <rect x="10" y="10" width="16" height="20" rx="2" stroke="var(--kiln-primary)" strokeWidth="2" fill="none" />
        <circle cx="18" cy="25" r="1.5" fill="var(--kiln-primary)" />
        <path d="M14 15h8M14 18h8M14 21h4" stroke="var(--kiln-primary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Mobile-first — mandatory',
    problem: 'Many libraries claim mobile support but treat it as a responsive resize. Touch targets shrink below 44px, text becomes unreadable, modals overflow viewports, and iOS Safari zooms unpredictably on input focus.',
    solution: 'Every component is designed and tested at 375px first. All interactive elements meet the 44x44px WCAG touch target. Inputs use font-size 16px on mobile to prevent iOS zoom. Overlays are viewport-constrained. Modals become bottom-sheets on mobile. No text below 14px on small screens. This is not optional.',
    benefit: 'Your app works beautifully on real devices — not just in a resized browser. Half your users are on mobile; Kiln ensures they get the same quality experience as desktop users.',
  },
];

// ─── Tech specs ──────────────────────────────────────────
const TECH_SPECS = [
  { label: 'Total gzipped', value: '< 25 KB' },
  { label: 'CSS bundle', value: '~10 KB' },
  { label: 'JS bundle (ESM)', value: '~13 KB' },
  { label: 'Dependencies', value: 'Zero' },
  { label: 'Components', value: '14 primitives' },
  { label: 'WCAG level', value: 'AA' },
];

export default function AboutPage() {
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
        <section aria-labelledby="about-hero-heading">
          <Header
            id="about-hero-heading"
            variant="h1"
            tagline="Why Kiln"
            description="Kiln is an accessible, performant React component library built for indie developers and small teams who refuse to choose between shipping fast and doing it right. WCAG AA compliant, under 25 KB gzipped, zero dependencies."
            actions={
              <div
                style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}
                aria-label="Key differentiators"
              >
                <Badge variant="success">WCAG AA</Badge>
                <Badge variant="info">&lt; 25 KB gzipped</Badge>
                <Badge variant="running">Zero dependencies</Badge>
                <Badge variant="pending">v0.1.0</Badge>
              </div>
            }
          >
            Why Kiln — Accessible React Components for Indie Developers
          </Header>
        </section>

        {/* ══════════════════════════════════════════════
            THE PROBLEM
        ══════════════════════════════════════════════ */}
        <section
          aria-labelledby="problem-heading"
          style={{ background: 'var(--kiln-surface)', paddingBottom: 'var(--kiln-space-16)' }}
        >
          <div style={{ ...sectionBase, maxWidth: 800 }}>
            <Header
              id="problem-heading"
              variant="h2"
              description="The problem"
              divider
            >
              You shouldn&apos;t have to rebuild UI primitives every project.
            </Header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
              <p style={{ margin: 0 }}>
                Every new project starts the same way: you need a button that looks good, an input
                with proper labels, a modal that traps focus, tabs that work with arrow keys. So you
                build them — again. And again. And again.
              </p>
              <p style={{ margin: 0 }}>
                Then you reach for a component library and discover it needs a theme provider,
                three context wrappers, a config file, and still doesn&apos;t handle keyboard
                navigation properly. Now you&apos;re spending hours wiring up infrastructure
                instead of building your product.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: 'var(--kiln-gray-700)' }}>Kiln exists because this cycle is broken.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            THE 4 PILLARS
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="pillars-heading" style={{ paddingBottom: 'var(--kiln-space-16)' }}>
          <div style={sectionBase}>
            <Header
              id="pillars-heading"
              variant="h2"
              description="Every Kiln component is evaluated against four criteria. If it fails any one of them, it doesn't ship."
              divider
              style={{ '--kiln-header-max-width': '100%' } as React.CSSProperties}
            >
              Non-negotiables, not nice-to-haves.
            </Header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-10)' }}>
              {PILLARS.map(({ number, icon, title, problem, solution, benefit }, index) => (
                <div key={title} style={{ position: 'relative', margin: '16px 0' }}>
                  {/* Pillar number badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: 'var(--kiln-space-6)',
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        background: 'var(--kiln-primary-bg)',
                        color: 'var(--kiln-primary-fg)',
                        fontSize: 'var(--kiln-text-xs)',
                        fontWeight: 700,
                        padding: '3px 12px',
                        borderRadius: 'var(--kiln-radius-full)',
                        letterSpacing: '0.08em',
                        lineHeight: 1.4,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                      }}
                    >
                      {number}
                    </div>
                  </div>

                  <Card variant="raised" style={{ '--kiln-card-padding': 'var(--kiln-space-8)' } as React.CSSProperties}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--kiln-space-5)', flexWrap: 'wrap' }}>
                      <div style={{ flexShrink: 0, marginTop: 'var(--kiln-space-1)' }}>{icon}</div>
                      <div style={{ flex: 1, minWidth: 240 }}>
                        <h3 style={{ fontSize: 'var(--kiln-text-xl)', fontWeight: 700, margin: '0 0 var(--kiln-space-5)', color: 'var(--kiln-gray-900)' }}>
                          {title}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)' }}>
                          <div>
                            <span style={{ fontSize: 'var(--kiln-text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--kiln-critical)' }}>
                              The problem
                            </span>
                            <p style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', margin: 'var(--kiln-space-2) 0 0', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                              {problem}
                            </p>
                          </div>

                          <div>
                            <span style={{ fontSize: 'var(--kiln-text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--kiln-primary)' }}>
                              The Kiln approach
                            </span>
                            <p style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', margin: 'var(--kiln-space-2) 0 0', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                              {solution}
                            </p>
                          </div>

                          <div style={{ padding: 'var(--kiln-space-3) var(--kiln-space-4)', background: 'var(--kiln-primary-50)', borderLeft: '3px solid var(--kiln-primary)', borderRadius: 'var(--kiln-radius-sm)' }}>
                            <span style={{ fontSize: 'var(--kiln-text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--kiln-primary)' }}>
                              The benefit
                            </span>
                            <p style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', margin: 'var(--kiln-space-2) 0 0', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                              {benefit}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            BY THE NUMBERS
        ══════════════════════════════════════════════ */}
        <section
          aria-labelledby="stats-heading"
          style={{ background: 'var(--kiln-surface)', paddingBottom: 'var(--kiln-space-16)' }}
        >
          <div style={sectionBase}>
            <Header
              id="stats-heading"
              variant="h2"
              description="By the numbers"
              divider
              style={{ '--kiln-header-max-width': '100%' } as React.CSSProperties}
            >
              Small bundle. Zero compromises.
            </Header>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 'var(--kiln-space-4)',
                maxWidth: 700,
                margin: '0 auto',
              }}
            >
              {TECH_SPECS.map(({ label, value }) => (
                <Card
                  key={label}
                  variant="default"
                  style={{
                    '--kiln-card-padding': 'var(--kiln-space-5)',
                    textAlign: 'center',
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.25rem, 3vw, var(--kiln-text-2xl))',
                      fontWeight: 700,
                      color: 'var(--kiln-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {value}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--kiln-text-xs)',
                      color: 'var(--kiln-gray-600)',
                      margin: 'var(--kiln-space-2) 0 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {label}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WHY IT MATTERS
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="why-heading" style={{ paddingBottom: 'var(--kiln-space-16)' }}>
          <div style={{ ...sectionBase, maxWidth: 800 }}>
            <Header
              id="why-heading"
              variant="h2"
              description="Why it matters"
              divider
            >
              Your users don&apos;t care about your tech stack.
            </Header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
              <p style={{ margin: 0 }}>
                They care that your app loads fast, works on their phone, and lets them navigate
                with a keyboard if they need to. They care that forms are clear, buttons are
                discoverable, and errors make sense.
              </p>
              <p style={{ margin: 0 }}>
                Kiln bakes all of that into every component so you don&apos;t have to think about it.
                You focus on your product logic — the part that makes your app unique. We handle
                the primitives that every app needs.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="cta-heading" style={{ background: 'var(--kiln-surface)', paddingBottom: 'var(--kiln-space-16)' }}>
          <div style={{ ...sectionBase, maxWidth: 800 }}>
            <Card variant="gradient-border" style={{ '--kiln-card-padding': 'var(--kiln-space-10)', textAlign: 'center' } as React.CSSProperties}>
              <Header
                id="cta-heading"
                variant="h2"
                description="Install Kiln, import the CSS once, and start building your product — not your infrastructure."
                actions={
                  <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button variant="primary" asChild>
                      <a href="/components" onClick={(e) => { e.preventDefault(); navigate('/components'); }}>
                        View all components
                      </a>
                    </Button>
                    <Button variant="secondary" asChild>
                      <a href="https://github.com/Aldentec/kiln" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                }
                style={{ '--kiln-header-max-width': '100%', paddingTop: 0 } as React.CSSProperties}
              >
                Ready to stop rebuilding the same components?
              </Header>
            </Card>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CREDIT
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="credit-heading" style={{ padding: 'var(--kiln-space-12) 0' }}>
          <div style={{ ...sectionBase, textAlign: 'center', maxWidth: 600 }}>
            <p
              id="credit-heading"
              style={{
                fontSize: 'var(--kiln-text-sm)',
                color: 'var(--kiln-gray-600)',
                margin: 0,
                lineHeight: 'var(--kiln-leading-relaxed)',
              }}
            >
              Built by{' '}
              <a
                href="https://doriansmith.dev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--kiln-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Dorian Smith
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────── */}
      <Footer
        logo={NAV_LOGO}
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} Dorian Smith`}
        credit="Kiln v0.1.0 — MIT License"
      />
    </div>
  );
}
