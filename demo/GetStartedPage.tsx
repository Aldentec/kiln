import React, { useState, lazy, Suspense, useEffect } from 'react';
import {
  Nav, Footer, Hero, Card, Badge, Button, Grid,
  Accordion, Tabs, Input, Toggle, Chip,
  toast, ToastContainer,
} from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, navigate, NavActions } from './nav';
import { KILN_STATS } from './constants';

// Keep highlight.js off the critical path — code blocks are below the fold
const CodeBlock = lazy(() =>
  import('@doriansmith/kiln').then(m => ({ default: m.CodeBlock }))
);

// ─── Code snippets ────────────────────────────────────────────────────────────

const SNIPPET_INSTALL = `npm install @doriansmith/kiln`;

const SNIPPET_IMPORT_CSS = `// main.tsx  (or wherever your app entry is)
import '@doriansmith/kiln/kiln.css';`;

const SNIPPET_FIRST_COMPONENT = `import { Button, Badge, Card } from '@doriansmith/kiln';

export default function App() {
  return (
    <Card>
      <Badge variant="success">Live</Badge>
      <Button variant="primary" onClick={() => alert('It works!')}>
        Ship it
      </Button>
    </Card>
  );
}`;

const SNIPPET_DARK_MODE = `// Set the attribute on <html> to switch themes
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme'); // back to light

// Or use the built-in ThemeToggle — persists to localStorage automatically
import { ThemeToggle } from '@doriansmith/kiln';

<ThemeToggle />`;

const SNIPPET_TOKENS = `/* Override any design token globally in your own CSS */
:root {
  --kiln-primary:      #0066cc;   /* swap brand colour */
  --kiln-radius-2xl:   4px;       /* flatten card corners */
  --kiln-font-sans:    'Inter', sans-serif;
}`;

const SNIPPET_TYPESCRIPT = `import { Button } from '@doriansmith/kiln';
import type { ButtonProps, ButtonVariant } from '@doriansmith/kiln';

// All props are fully typed — no any, no casting needed
function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />;
}`;

// ─── Page-level JSON-LD ───────────────────────────────────────────────────────
// Injected on mount, removed on unmount so other pages are never polluted.

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to install and use the Kiln React component library',
  description: 'Install Kiln, import the CSS once, and render your first accessible React component in under 2 minutes — no config, no providers, no boilerplate.',
  totalTime: 'PT2M',
  tool: { '@type': 'HowToTool', name: 'Node.js and npm' },
  supply: { '@type': 'HowToSupply', name: 'React 18 or 19 project' },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Install the package',
      text: 'Run npm install @doriansmith/kiln to add Kiln to your project.',
      url: 'https://kiln-ui.com/get-started#install',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Import the CSS once',
      text: "Add import '@doriansmith/kiln/kiln.css' at your application entry point (main.tsx or App.tsx). This single import loads all component styles and design tokens.",
      url: 'https://kiln-ui.com/get-started#install',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Use a component',
      text: "Import named components such as Button, Card, or Badge from '@doriansmith/kiln' and use them directly in your JSX. All props are fully TypeScript-typed.",
      url: 'https://kiln-ui.com/get-started#install',
    },
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does dark mode work in Kiln?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Set the data-theme=\"dark\" attribute on the <html> element to activate dark mode globally. Use the built-in ThemeToggle component to let users switch and persist their preference to localStorage automatically — no context provider or setup needed.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customise Kiln design tokens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every visual decision in Kiln is a CSS custom property (design token). Override any token in your own stylesheet and every component that references it updates automatically — no Sass, no JS theme objects required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Kiln WCAG accessible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every Kiln component ships WCAG 2.1 AA-compliant. Keyboard navigation, focus trapping in modals, correct ARIA roles, screen-reader-only text, and minimum 44×44px touch targets are built in and tested with axe DevTools — 0 issues across all categories.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Kiln support TypeScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every component ships with full TypeScript type definitions. Props are narrowly typed — no any types, no casting. Variant unions, size literals, and event handlers are all correctly inferred in your IDE.',
      },
    },
  ],
};

function usePageSchemas(schemas: object[]) {
  useEffect(() => {
    const tags = schemas.map(schema => {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.textContent = JSON.stringify(schema);
      tag.dataset.kilnPage = 'get-started';
      document.head.appendChild(tag);
      return tag;
    });
    return () => tags.forEach(t => t.remove());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

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

const sectionHeading: React.CSSProperties = {
  fontSize: 'clamp(1.4rem, 3vw, var(--kiln-text-3xl))',
  fontWeight: 700,
  letterSpacing: 'var(--kiln-tracking-tight)',
  lineHeight: 'var(--kiln-leading-tight)',
  color: 'var(--kiln-gray-900)',
  margin: '0 0 var(--kiln-space-4)',
};

// ─── Step badge ───────────────────────────────────────────────────────────────

function StepNumber({ n }: { n: number }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'var(--kiln-gradient-brand)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 'var(--kiln-text-sm)', fontWeight: 700, color: '#fff',
      flexShrink: 0,
    }} aria-hidden="true">
      {n}
    </div>
  );
}

// ─── Interactive component showcase ──────────────────────────────────────────

const SHOWCASE_TABS = [
  { value: 'buttons',  label: 'Buttons & Actions' },
  { value: 'forms',    label: 'Forms & Inputs'    },
  { value: 'feedback', label: 'Feedback & Status' },
];

const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const BADGE_VARIANTS  = [
  { variant: 'success'  as const, label: 'Deployed'    },
  { variant: 'warning'  as const, label: 'Degraded'    },
  { variant: 'error'    as const, label: 'Failed'      },
  { variant: 'info'     as const, label: 'Queued'      },
  { variant: 'pending'  as const, label: 'Pending'     },
  { variant: 'running'  as const, label: 'Running'     },
  { variant: 'critical' as const, label: 'Critical'    },
  { variant: 'neutral'  as const, label: 'Neutral'     },
];

function ComponentShowcase() {
  const [showcaseTab, setShowcaseTab] = useState('buttons');

  // Forms state
  const [inputVal, setInputVal]   = useState('');
  const [toggleA,  setToggleA]    = useState(true);
  const [toggleB,  setToggleB]    = useState(false);
  const [toggleC,  setToggleC]    = useState(true);
  const [chips,    setChips]      = useState<Set<string>>(new Set(['React']));
  const CHIP_OPTIONS = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Next.js'];

  return (
    <Card variant="default" style={{ '--kiln-card-padding': '0', overflow: 'hidden' } as React.CSSProperties}>
      {/* Mock browser chrome */}
      <div style={{
        padding: 'var(--kiln-space-3) var(--kiln-space-4)',
        background: 'var(--kiln-gray-100)',
        borderBottom: '1px solid var(--kiln-gray-200)',
        display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} aria-hidden="true" />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', flexShrink: 0 }} aria-hidden="true" />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} aria-hidden="true" />
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
          kiln-demo.app/playground
        </span>
      </div>

      <div style={{ padding: 'var(--kiln-space-5)' }}>
        <Tabs items={SHOWCASE_TABS} value={showcaseTab} onChange={setShowcaseTab} ariaLabel="Component showcase" />

        <div style={{ marginTop: 'var(--kiln-space-6)' }}>

          {/* ── Buttons & Actions ── */}
          {showcaseTab === 'buttons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-6)' }}>
              <div>
                <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Button variants</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-3)' }}>
                  {BUTTON_VARIANTS.map(v => (
                    <Button
                      key={v}
                      variant={v}
                      onClick={() => toast.info(`${v} button clicked`)}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Button sizes</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--kiln-space-3)' }}>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Filter chips</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
                  {CHIP_OPTIONS.map(opt => (
                    <Chip
                      key={opt}
                      selected={chips.has(opt)}
                      onToggle={sel => {
                        const next = new Set(chips);
                        sel ? next.add(opt) : next.delete(opt);
                        setChips(next);
                      }}
                    >
                      {opt}
                    </Chip>
                  ))}
                </div>
                {chips.size > 0 && (
                  <p style={{ margin: 'var(--kiln-space-3) 0 0', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                    Selected: {[...chips].join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Forms & Inputs ── */}
          {showcaseTab === 'forms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-6)', maxWidth: 480 }}>
              <Input
                label="Project name"
                placeholder="my-awesome-app"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                helperText="Used as the package name and directory."
              />
              <Input
                label="With validation error"
                placeholder="enter a value"
                defaultValue="bad-value!"
                errorText="Only lowercase letters and hyphens are allowed."
              />
              <Input
                label="Success state"
                defaultValue="my-great-project"
                variant="success"
                helperText="Name is available."
              />
              <div>
                <p style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>
                  Toggle switches
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
                  <Toggle checked={toggleA} onChange={setToggleA} label="Enable dark mode" />
                  <Toggle checked={toggleB} onChange={setToggleB} label="Email notifications" />
                  <Toggle checked={toggleC} onChange={setToggleC} label="Auto-deploy on push" />
                </div>
              </div>
            </div>
          )}

          {/* ── Feedback & Status ── */}
          {showcaseTab === 'feedback' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-6)' }}>
              <div>
                <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Badge variants</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
                  {BADGE_VARIANTS.map(({ variant, label }) => (
                    <Badge key={variant} variant={variant}>{label}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Toast notifications</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-3)' }}>
                  <Button variant="primary"   size="sm" onClick={() => toast.success('Changes saved successfully.',   { title: 'Saved'   })}>Success</Button>
                  <Button variant="secondary" size="sm" onClick={() => toast.error('Failed to connect to server.',    { title: 'Error'   })}>Error</Button>
                  <Button variant="secondary" size="sm" onClick={() => toast.warning('Your session expires soon.',    { title: 'Warning' })}>Warning</Button>
                  <Button variant="ghost"     size="sm" onClick={() => toast.info('Deployment queued for 2:00 AM.',   { title: 'Info'    })}>Info</Button>
                </div>
              </div>
              <div>
                <p style={{ ...sectionLabel, marginBottom: 'var(--kiln-space-3)' }}>Card variants</p>
                <Grid minColWidth={200} gap="sm">
                  {(['default', 'raised', 'glass', 'gradient-border'] as const).map(v => (
                    <Card key={v} variant={v} style={{ '--kiln-card-padding': 'var(--kiln-space-4)' } as React.CSSProperties}>
                      <p style={{ margin: '0 0 var(--kiln-space-1)', fontWeight: 600, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                        {v}
                      </p>
                      <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                        variant="{v}"
                      </p>
                    </Card>
                  ))}
                </Grid>
              </div>
            </div>
          )}

        </div>
      </div>
    </Card>
  );
}

// ─── Key concepts accordion ───────────────────────────────────────────────────

const CONCEPTS = [
  {
    id: 'dark-mode',
    title: 'Dark mode',
    content: (
      <div>
        <p style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
          Set <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-gray-100)', padding: '1px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>data-theme="dark"</code> on{' '}
          <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-gray-100)', padding: '1px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>&lt;html&gt;</code>{' '}
          to activate dark mode globally. Use the built-in <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-gray-100)', padding: '1px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>ThemeToggle</code> component to let users switch and persist their preference to <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-gray-100)', padding: '1px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>localStorage</code> automatically. No context provider, no setup.
        </p>
        <Suspense fallback={null}>
          <CodeBlock code={SNIPPET_DARK_MODE} language="tsx" />
        </Suspense>
      </div>
    ),
  },
  {
    id: 'tokens',
    title: 'Design tokens',
    content: (
      <div>
        <p style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
          Every visual decision in Kiln is a CSS custom property. Override any token in your own stylesheet and every component that references it updates automatically — no Sass variables, no JS theme objects.
        </p>
        <Suspense fallback={null}>
          <CodeBlock code={SNIPPET_TOKENS} language="css" />
        </Suspense>
      </div>
    ),
  },
  {
    id: 'a11y',
    title: 'Accessibility',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)' }}>
        <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
          Every component ships WCAG 2.1 AA-compliant. Keyboard navigation, focus trapping in modals, correct ARIA roles, and screen-reader-only text are built in. Tested with axe DevTools — {KILN_STATS.axeIssues} issues across all categories.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
          <Badge variant="success">Keyboard navigable</Badge>
          <Badge variant="success">ARIA roles</Badge>
          <Badge variant="success">Focus management</Badge>
          <Badge variant="success">Screen reader tested</Badge>
          <Badge variant="success">{KILN_STATS.axeIssues} axe issues</Badge>
        </div>
      </div>
    ),
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    content: (
      <div>
        <p style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
          Every component ships with full type definitions. Props are narrowly typed — no <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-gray-100)', padding: '1px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>any</code>, no casting. Variant unions, size literals, and event handlers are all inferred correctly in your IDE.
        </p>
        <Suspense fallback={null}>
          <CodeBlock code={SNIPPET_TYPESCRIPT} language="tsx" />
        </Suspense>
      </div>
    ),
  },
];

// ─── GetStartedPage ───────────────────────────────────────────────────────────

export default function GetStartedPage() {
  usePageSchemas([HOWTO_SCHEMA, FAQ_SCHEMA]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--kiln-body-bg)',
      color: 'var(--kiln-gray-900)',
      fontFamily: 'var(--kiln-font-sans)',
      transition: 'background 0.3s, color 0.3s',
    }}>
      <ToastContainer position="bottom-right" />

      {/* ── Nav ── */}
      <Nav
        logo={NAV_LOGO}
        items={NAV_ITEMS}
        isActive={isNavActive}
        onNavigate={(href) => { window.history.pushState(null, '', href); window.dispatchEvent(new Event('popstate')); }}
        actions={<NavActions />}
      />

      <main style={{ flex: 1 }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <Hero
          id="get-started-heading"
          size="md"
          eyebrow="Get Started"
          title="Zero config. Copy-paste ready. Ship in minutes."
          description={`Install one package, import one CSS file, and you have access to ${KILN_STATS.componentCount} WCAG AA-compliant components — no providers, no setup wizards, no boilerplate.`}
          actions={
            <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--kiln-space-2)' }}>
              <Badge variant="success">WCAG AA</Badge>
              <Badge variant="info">TypeScript</Badge>
              <Badge variant="neutral">{KILN_STATS.bundleSizeGzipped} gzipped</Badge>
              <Badge variant="running">0 dependencies</Badge>
            </div>
          }
        />

        {/* ══ INSTALLATION ══════════════════════════════════════════════════════ */}
        <section id="install" aria-labelledby="install-heading" style={{ padding: 'var(--kiln-space-16) 0', background: 'var(--kiln-surface)' }}>
          <div style={sectionBase}>
            <p style={sectionLabel}>Installation</p>
            <h2 id="install-heading" style={sectionHeading}>Three steps to your first component</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-8)' }}>

              {/* Step 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--kiln-space-6)', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', alignItems: 'flex-start' }}>
                  <StepNumber n={1} />
                  <div>
                    <h3 style={{ margin: '0 0 var(--kiln-space-2)', fontSize: 'var(--kiln-text-lg)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                      Install the package
                    </h3>
                    <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                      Works with any React project — Vite, Next.js, Remix, Create React App. Requires React 18 or 19.
                    </p>
                  </div>
                </div>
                <Suspense fallback={null}>
                  <CodeBlock code={SNIPPET_INSTALL} language="bash" />
                </Suspense>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--kiln-gray-200)', margin: 0 }} />

              {/* Step 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--kiln-space-6)', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', alignItems: 'flex-start' }}>
                  <StepNumber n={2} />
                  <div>
                    <h3 style={{ margin: '0 0 var(--kiln-space-2)', fontSize: 'var(--kiln-text-lg)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                      Import the CSS once
                    </h3>
                    <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                      Add this single import at your application root. It loads all component styles and design tokens — that's it.
                    </p>
                  </div>
                </div>
                <Suspense fallback={null}>
                  <CodeBlock code={SNIPPET_IMPORT_CSS} language="tsx" />
                </Suspense>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--kiln-gray-200)', margin: 0 }} />

              {/* Step 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'var(--kiln-space-6)', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', alignItems: 'flex-start' }}>
                  <StepNumber n={3} />
                  <div>
                    <h3 style={{ margin: '0 0 var(--kiln-space-2)', fontSize: 'var(--kiln-text-lg)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                      Use a component
                    </h3>
                    <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                      Named imports, fully typed, tree-shakeable. No default exports to alias, no wrapper components to create.
                    </p>
                  </div>
                </div>
                <Suspense fallback={null}>
                  <CodeBlock code={SNIPPET_FIRST_COMPONENT} language="tsx" />
                </Suspense>
              </div>

            </div>
          </div>
        </section>

        {/* ══ COMPONENT SHOWCASE ════════════════════════════════════════════════ */}
        <section aria-labelledby="showcase-heading" style={{ padding: 'var(--kiln-space-16) 0' }}>
          <div style={sectionBase}>
            <p style={sectionLabel}>Try it live</p>
            <h2 id="showcase-heading" style={sectionHeading}>Components you can use right now</h2>
            <p style={{ margin: '0 0 var(--kiln-space-8)', fontSize: 'var(--kiln-text-base)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', maxWidth: 580 }}>
              Every interaction below is a real Kiln component — nothing mocked. Click around to see how they behave.
            </p>
            <ComponentShowcase />
          </div>
        </section>

        {/* ══ KEY CONCEPTS ══════════════════════════════════════════════════════ */}
        <section aria-labelledby="concepts-heading" style={{ padding: 'var(--kiln-space-16) 0', background: 'var(--kiln-surface)' }}>
          <div style={sectionBase}>
            <p style={sectionLabel}>Key concepts</p>
            <h2 id="concepts-heading" style={sectionHeading}>Everything you need to know upfront</h2>
            <p style={{ margin: '0 0 var(--kiln-space-8)', fontSize: 'var(--kiln-text-base)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', maxWidth: 580 }}>
              No framework-specific setup, no theming ceremony. These four concepts cover the entire mental model.
            </p>
            <Accordion items={CONCEPTS} allowMultiple />
          </div>
        </section>

        {/* ══ WHAT'S NEXT ═══════════════════════════════════════════════════════ */}
        <section aria-labelledby="next-heading" style={{ padding: 'var(--kiln-space-16) 0' }}>
          <div style={sectionBase}>
            <p style={sectionLabel}>What's next</p>
            <h2 id="next-heading" style={sectionHeading}>Keep going</h2>
            <Grid cols={3} gap="md">

              <Card
                variant="gradient-border"
                hoverLift
                style={{ '--kiln-card-padding': 'var(--kiln-space-8)' } as React.CSSProperties}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--kiln-space-4)' }} aria-hidden="true">📦</div>
                <h3 style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-xl)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                  Browse all components
                </h3>
                <p style={{ margin: '0 0 var(--kiln-space-5)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', flex: 1 }}>
                  Full API docs, live previews, copy-paste code examples, and accessibility notes for every component in the library.
                </p>
                <Button variant="primary" onClick={() => navigate('/components')}>
                  View components →
                </Button>
              </Card>

              <Card
                variant="gradient-border"
                hoverLift
                style={{ '--kiln-card-padding': 'var(--kiln-space-8)' } as React.CSSProperties}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--kiln-space-4)' }} aria-hidden="true">🎬</div>
                <h3 style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-xl)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                  See real-world demos
                </h3>
                <p style={{ margin: '0 0 var(--kiln-space-5)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', flex: 1 }}>
                  Three fully interactive demos — an e-commerce store, account settings dashboard, and a support ticket system — all built with Kiln.
                </p>
                <Button variant="primary" onClick={() => navigate('/demos')}>
                  Explore demos →
                </Button>
              </Card>

              <Card
                variant="gradient-border"
                hoverLift
                style={{ '--kiln-card-padding': 'var(--kiln-space-8)' } as React.CSSProperties}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--kiln-space-4)' }} aria-hidden="true">❓</div>
                <h3 style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-xl)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                  Common questions
                </h3>
                <p style={{ margin: '0 0 var(--kiln-space-5)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)', flex: 1 }}>
                  Bundle size, WCAG compliance, dark mode, TypeScript support, and how Kiln compares to shadcn/ui — all answered.
                </p>
                <Button variant="secondary" onClick={() => navigate('/faq')}>
                  Read the FAQ →
                </Button>
              </Card>

            </Grid>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <Footer
        logo={NAV_LOGO}
        links={FOOTER_LINKS}
        copyright={<>© {new Date().getFullYear()} <a href="https://doriansmith.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Dorian Smith</a></>}
        credit="Kiln v0.3.0 - MIT License"
      />
    </div>
  );
}
