import React, { useState, lazy, Suspense } from 'react';
import {
  Nav, Button, Card, Badge, Chip, Tabs, Input,
  Footer, Grid, Hero, Accordion,
} from '@doriansmith/kiln';

// Lazy-load CodeBlock so highlight.js never lands on the critical path.
// The install snippets are below the fold; a brief unstyled flash is acceptable.
const CodeBlock = lazy(() =>
  import('@doriansmith/kiln').then((m) => ({ default: m.CodeBlock }))
);

import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, NavActions } from './nav';
import { KILN_STATS } from './constants';

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

// ─── Live demo ────────────────────────────────────────────
type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';
interface DemoIssue { id: string; title: string; severity: IssueSeverity; status: 'open' | 'resolved'; time: string; }

const INITIAL_ISSUES: DemoIssue[] = [
  { id: 'i1', title: 'Auth service timeout in EU-West', severity: 'critical', status: 'open', time: '2m ago' },
  { id: 'i2', title: 'Rate limiter threshold exceeded', severity: 'high', status: 'open', time: '14m ago' },
  { id: 'i3', title: 'Cache miss rate elevated to 72%', severity: 'medium', status: 'open', time: '1h ago' },
  { id: 'i4', title: 'CDN edge latency +40ms spike', severity: 'low', status: 'open', time: '3h ago' },
];

const SEVERITY_BADGE: Record<IssueSeverity, 'critical' | 'warning' | 'running' | 'info'> = {
  critical: 'critical', high: 'warning', medium: 'running', low: 'info',
};

const DEMO_NAV_TABS = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'issues', label: 'Issues' },
  { value: 'settings', label: 'Settings' },
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

// ─── LiveDemo ─────────────────────────────────────────────
function LiveDemo() {
  const [tab, setTab] = useState('dashboard');
  const [issues, setIssues] = useState<DemoIssue[]>(INITIAL_ISSUES);
  const [filters, setFilters] = useState<Set<string>>(new Set());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [notifyVia, setNotifyVia] = useState<Set<string>>(new Set(['Email']));

  const resolve = (id: string) =>
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status: 'resolved' } : i));

  const filteredIssues = filters.size === 0 ? issues : issues.filter(i => filters.has(i.severity));
  const openCount = issues.filter(i => i.status === 'open').length;
  const criticalCount = issues.filter(i => i.severity === 'critical' && i.status === 'open').length;

  return (
    <Card variant="default" style={{ '--kiln-card-padding': '0', overflow: 'hidden' } as React.CSSProperties}>
      {/* Mock browser chrome */}
      <div style={{
        padding: 'var(--kiln-space-3) var(--kiln-space-5)',
        background: 'var(--kiln-gray-100)',
        borderBottom: '1px solid var(--kiln-gray-200)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--kiln-space-2)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} aria-hidden="true" />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} aria-hidden="true" />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} aria-hidden="true" />
        <span style={{
          flex: 1, maxWidth: 260, margin: '0 auto',
          background: 'var(--kiln-surface-raised)',
          borderRadius: 'var(--kiln-radius-sm)',
          padding: '3px var(--kiln-space-3)',
          fontSize: 'var(--kiln-text-xs)',
          color: 'var(--kiln-gray-500)',
          fontFamily: 'var(--kiln-font-mono)',
          textAlign: 'center',
        }}>
          kiln-demo.app/dashboard
        </span>
      </div>

      <div style={{ padding: 'var(--kiln-space-6)' }}>
        <Tabs items={DEMO_NAV_TABS} value={tab} onChange={setTab} ariaLabel="Demo app navigation" />

        {/* ── Dashboard ── */}
        {tab === 'dashboard' && (
          <div style={{ marginTop: 'var(--kiln-space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--kiln-space-4)', marginBottom: 'var(--kiln-space-6)' }}>
              {([
                { value: openCount, label: 'Open issues', badge: <Badge variant={openCount > 0 ? 'warning' : 'success'}>{openCount > 0 ? 'Needs attention' : 'All clear'}</Badge> },
                { value: criticalCount, label: 'Critical', badge: criticalCount > 0 ? <Badge variant="critical">P0</Badge> : <Badge variant="success">None</Badge> },
                { value: '98', label: 'Lighthouse', badge: <Badge variant="success">Healthy</Badge> },
              ] as const).map(({ value, label, badge }) => (
                <Card key={label} variant="default" style={{ '--kiln-card-padding': 'var(--kiln-space-5)' } as React.CSSProperties}>
                  <div style={{ fontSize: 'var(--kiln-text-3xl)', fontWeight: 700, lineHeight: 1, color: 'var(--kiln-gray-900)' }}>{value}</div>
                  <div style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', margin: 'var(--kiln-space-1) 0 var(--kiln-space-2)' }}>{label}</div>
                  {badge}
                </Card>
              ))}
            </div>

            <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Recent alerts</p>
            <Accordion
              items={issues.map(issue => ({
                id: issue.id,
                title: (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
                    <Badge variant={SEVERITY_BADGE[issue.severity]}>{issue.severity}</Badge>
                    <span style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 500 }}>{issue.title}</span>
                  </span>
                ),
                content: (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--kiln-space-3)', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>Detected {issue.time}</span>
                    {issue.status === 'open'
                      ? <Button variant="primary" size="sm" onClick={() => resolve(issue.id)}>Resolve</Button>
                      : <Badge variant="success">Resolved</Badge>}
                  </div>
                ),
              }))}
            />
          </div>
        )}

        {/* ── Issues ── */}
        {tab === 'issues' && (
          <div style={{ marginTop: 'var(--kiln-space-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap', marginBottom: 'var(--kiln-space-4)' }}>
              {(['critical', 'high', 'medium', 'low'] as IssueSeverity[]).map(sev => (
                <Chip key={sev} selected={filters.has(sev)} onToggle={sel => {
                  const next = new Set(filters);
                  sel ? next.add(sev) : next.delete(sev);
                  setFilters(next);
                }}>{sev}</Chip>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
              {filteredIssues.length === 0 && (
                <p style={{ textAlign: 'center', padding: 'var(--kiln-space-8)', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
                  No issues match your filter.
                </p>
              )}
              {filteredIssues.map(issue => (
                <Card key={issue.id} variant="default" style={{ '--kiln-card-padding': 'var(--kiln-space-4)' } as React.CSSProperties}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--kiln-space-3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', minWidth: 0 }}>
                      <Badge variant={SEVERITY_BADGE[issue.severity]}>{issue.severity}</Badge>
                      <span style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 500, color: 'var(--kiln-gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', flexShrink: 0 }}>
                      <span style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>{issue.time}</span>
                      {issue.status === 'open'
                        ? <Button variant="secondary" size="sm" onClick={() => resolve(issue.id)}>Resolve</Button>
                        : <Badge variant="success">Resolved</Badge>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ── Settings ── */}
        {tab === 'settings' && (
          <div style={{ marginTop: 'var(--kiln-space-6)', maxWidth: 420 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-5)' }}>
              <Input label="Display name" placeholder="Dorian Smith" value={name}
                onChange={e => { setName(e.target.value); setSaved(false); }} />
              <Input label="Email" type="email" placeholder="you@example.com" value={email}
                onChange={e => { setEmail(e.target.value); setSaved(false); }}
                helperText="Used for alert notifications." />
              <div>
                <p style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)', marginBottom: 'var(--kiln-space-2)', marginTop: 0 }}>
                  Notify via
                </p>
                <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap' }}>
                  {['Email', 'Slack', 'SMS'].map(ch => (
                    <Chip key={ch} selected={notifyVia.has(ch)} onToggle={sel => {
                      const next = new Set(notifyVia);
                      sel ? next.add(ch) : next.delete(ch);
                      setNotifyVia(next);
                    }}>{ch}</Chip>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)' }}>
                <Button variant="primary" size="sm" disabled={!name.trim() || !email.trim()} onClick={() => setSaved(true)}>
                  Save changes
                </Button>
                {saved && <Badge variant="success">Saved</Badge>}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

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
        <Hero
          id="landing-hero-heading"
          style={{ '--kiln-hero-title-size': 'clamp(1.75rem, 4vw, var(--kiln-text-4xl))' } as React.CSSProperties}
          eyebrow={
            <div
              aria-hidden="true"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                fontWeight: 700,
                letterSpacing: 'var(--kiln-tracking-tight)',
                lineHeight: 1,
                textTransform: 'none',
                background: 'var(--kiln-gradient-brand)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'var(--kiln-gradient-text-shadow, none)',
              }}
            >
              Kiln
            </div>
          }
          title="Accessible React Component Library: Ship Fast Without Compromise"
          description={`Kiln is a lightweight React component library with ${KILN_STATS.componentCount} WCAG AA-compliant components. Zero config, zero dependencies, ${KILN_STATS.bundleSizeGzippedFull} gzipped. Install and ship accessible UIs in under ${KILN_STATS.installTimeMinutes} minutes.`}
          actions={
            <>
              <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button variant="primary" href="/components">View Components</Button>
                <Button variant="secondary" href="#install">Get Started</Button>
              </div>
              <div
                style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--kiln-space-4)' }}
                aria-label="Key features"
              >
                <Badge variant="success">WCAG AA</Badge>
                <Badge variant="info">TypeScript</Badge>
                <Badge variant="running">{KILN_STATS.componentCount} Primitives</Badge>
                <Badge variant="pending">v0.3.0</Badge>
              </div>
            </>
          }
        />

        {/* ══════════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════════ */}
        <section
          aria-label="Key metrics"
          style={{
            borderTop: '1px solid var(--kiln-gray-200)',
            borderBottom: '1px solid var(--kiln-gray-200)',
            background: 'var(--kiln-surface)',
          }}
        >
          <div
            style={{
              ...sectionBase,
              padding: 'var(--kiln-space-8) clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--kiln-space-8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {([
              { value: KILN_STATS.npmDownloads, label: 'npm downloads' },
              { value: KILN_STATS.componentCount, label: 'components' },
              { value: KILN_STATS.axeIssues, label: 'axe issues' },
              { value: KILN_STATS.bundleSizeGzipped, label: 'gzipped total' },
            ] as const).map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: 'var(--kiln-primary)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', marginTop: 'var(--kiln-space-1)' }}>{label}</div>
              </div>
            ))}
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
                  From install to render in under {KILN_STATS.installTimeMinutes} minutes.
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

              {/* Right: code blocks. Suspense keeps CodeBlock/hljs off the critical path */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)' }}>
                <Suspense fallback={null}>
                  <CodeBlock code={INSTALL_CODE} language="bash" />
                  <CodeBlock code={USAGE_CODE} language="tsx" />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            LIVE DEMO
        ══════════════════════════════════════════════ */}
        <section
          aria-labelledby="demo-heading"
          style={{ background: 'var(--kiln-surface)', padding: 'var(--kiln-space-16) 0' }}
        >
          <div style={sectionBase}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--kiln-space-10)' }}>
              <p style={sectionLabel}>Interactive demo</p>
              <h2 id="demo-heading" style={sectionHeading}>
                See it working. Click around.
              </h2>
              <p style={{ color: 'var(--kiln-gray-600)', maxWidth: 480, margin: '0 auto', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                Not screenshots. Actual rendered Kiln components: Tabs, Accordion, Badge, Button, Chip, Input, Card, all live below.
              </p>
            </div>

            <LiveDemo />

            <div style={{ textAlign: 'center', marginTop: 'var(--kiln-space-10)' }}>
              <Button variant="ghost" href="/components" size="lg">
                View all {KILN_STATS.componentCount} components →
              </Button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PROOF: screenshots + bundle size
        ══════════════════════════════════════════════ */}
        <section aria-labelledby="proof-heading" style={{ padding: 'var(--kiln-space-16) 0' }}>
          <div style={sectionBase}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--kiln-space-12)' }}>
              <p style={sectionLabel}>Evidence</p>
              <h2 id="proof-heading" style={sectionHeading}>Measured. Not claimed.</h2>
              <p style={{ color: 'var(--kiln-gray-600)', maxWidth: 560, margin: '0 auto', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                Real screenshots from real tools. Not badges. Not self-reported numbers.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
                gap: 'var(--kiln-space-6)',
                marginBottom: 'var(--kiln-space-8)',
              }}
            >
              <Card variant="default" style={{ '--kiln-card-padding': '0', overflow: 'hidden' } as React.CSSProperties}>
                <img
                  src="/lighthouse-screenshot-1.png"
                  alt={`Google Lighthouse report: ${KILN_STATS.lighthousePerf} Performance, ${KILN_STATS.lighthouseA11y} Accessibility, 96 Best Practices, ${KILN_STATS.lighthouseSeo} SEO`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                  decoding="async"
                />
                <div style={{ padding: 'var(--kiln-space-4) var(--kiln-space-5)' }}>
                  <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)' }}>
                    Google Lighthouse, production build (<code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)' }}>localhost:4173</code>)
                  </p>
                </div>
              </Card>

              <Card variant="default" style={{ '--kiln-card-padding': '0', overflow: 'hidden' } as React.CSSProperties}>
                <img
                  src="/axe-screenshot-1.png"
                  alt="axe DevTools report: 0 automatic issues, 0 guided issues, 0 manual issues. WCAG 2.1 AA"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                  decoding="async"
                />
                <div style={{ padding: 'var(--kiln-space-4) var(--kiln-space-5)' }}>
                  <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)' }}>
                    axe DevTools · WCAG 2.1 AA · {KILN_STATS.axeIssues} issues across all categories
                  </p>
                </div>
              </Card>
            </div>

            {/* Bundle size table */}
            <Card variant="default" style={{ '--kiln-card-padding': 'var(--kiln-space-8)', maxWidth: 520, margin: '0 auto' } as React.CSSProperties}>
              <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-4)' }}>Bundle size, gzipped</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--kiln-text-sm)' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--kiln-gray-200)' }}>
                    <th style={{ textAlign: 'left', padding: 'var(--kiln-space-2) var(--kiln-space-3)', color: 'var(--kiln-gray-500)', fontWeight: 600, fontSize: 'var(--kiln-text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Asset</th>
                    <th style={{ textAlign: 'right', padding: 'var(--kiln-space-2) var(--kiln-space-3)', color: 'var(--kiln-gray-500)', fontWeight: 600, fontSize: 'var(--kiln-text-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gzipped</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--kiln-gray-200)' }}>
                    <td style={{ padding: 'var(--kiln-space-3)', fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-700)' }}>kiln.css</td>
                    <td style={{ padding: 'var(--kiln-space-3)', textAlign: 'right', color: 'var(--kiln-gray-900)', fontWeight: 600 }}>{KILN_STATS.bundleCssGzipped}</td>
                  </tr>
                  <tr style={{ borderBottom: '2px solid var(--kiln-gray-200)' }}>
                    <td style={{ padding: 'var(--kiln-space-3)', fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-700)' }}>index.js (ESM)</td>
                    <td style={{ padding: 'var(--kiln-space-3)', textAlign: 'right', color: 'var(--kiln-gray-900)', fontWeight: 600 }}>{KILN_STATS.bundleJsGzipped}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--kiln-space-3)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>Total</td>
                    <td style={{ padding: 'var(--kiln-space-3)', textAlign: 'right', fontWeight: 700, color: 'var(--kiln-primary)', fontSize: 'var(--kiln-text-base)' }}>{KILN_STATS.bundleSizeGzipped}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
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
        {/* ══════════════════════════════════════════════
            BUILT WITH KILN
        ══════════════════════════════════════════════ */}
        <section
          aria-labelledby="dogfood-heading"
          style={{ background: 'var(--kiln-surface)', borderTop: '1px solid var(--kiln-gray-200)', padding: 'var(--kiln-space-12) 0' }}
        >
          <div style={{ ...sectionBase, maxWidth: 680, textAlign: 'center' }}>
            <p style={sectionLabel}>Eating our own dog food</p>
            <h2 id="dogfood-heading" style={{ ...sectionHeading, fontSize: 'var(--kiln-text-2xl)', margin: '0 0 var(--kiln-space-4)' }}>
              This site is built entirely with Kiln.
            </h2>
            <p style={{ color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', marginBottom: 'var(--kiln-space-6)' }}>
              Every element you see (Nav, Hero, Button, Badge, Card, Chip, Tabs, Input, Grid, Footer) is a Kiln primitive.
              No custom UI code. No wrappers. Just the library.
            </p>
            <Button variant="ghost" href="/components" size="sm">Browse all components →</Button>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────── */}
      <Footer
        logo={<img src="/logo.png" alt="Kiln" width={36} height={36} style={{ height: 36, width: 36 }} />}
        links={FOOTER_LINKS}
        copyright={<>© {new Date().getFullYear()} <a href="https://doriansmith.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Dorian Smith</a></>}
        credit="Kiln v0.1.0, MIT License"
      />
    </div>
  );
}

