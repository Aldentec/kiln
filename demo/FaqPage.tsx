import React, { useEffect } from 'react';
import { Nav, Footer, Hero, Card, Button, Badge } from '@doriansmith/kiln';
import { NAV_ITEMS, NAV_LOGO, FOOTER_LINKS, isNavActive, navigate, NavActions } from './nav';

// ─── FAQPage JSON-LD ─────────────────────────────────────────────────────────
// Injected on mount, removed on unmount so other pages are never polluted.

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Kiln WCAG AA compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every Kiln component meets WCAG 2.1 AA by default, including keyboard navigation, visible focus rings, correct ARIA attributes, and 4.5:1 color contrast in both light and dark themes. Verified with axe DevTools — 0 automatic, guided, or manual issues.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Kiln compare to shadcn/ui?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kiln is a fully styled, pre-built component library requiring no Tailwind CSS. shadcn/ui is a copy-paste system built on Radix UI primitives that requires Tailwind. Kiln ships in under 2 minutes with a single CSS import and zero configuration; shadcn requires per-component installation and a Tailwind setup. Both are accessible, but Kiln is the faster path to a production UI if you do not want to own the styling layer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Kiln\'s bundle size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kiln is under 26 KB gzipped total — approximately 10 KB for kiln.css and 13 KB for the JavaScript bundle (ESM). It has zero runtime dependencies beyond React itself. Heavy optional dependencies such as syntax highlighters are loaded lazily and never land on the critical request chain.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Kiln support dark mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Set data-theme="dark" on the <html> element to activate dark mode globally. Kiln includes a built-in ThemeToggle component that handles this automatically with localStorage persistence — no context provider, no setup, no flash of unstyled content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which React component libraries are WCAG AA compliant in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Libraries with documented WCAG AA compliance include Kiln (@doriansmith/kiln), React Aria (Adobe), Radix UI, and Base UI. Kiln is the only fully-styled option with a verified Lighthouse Accessibility score of 100 and 0 axe DevTools issues across all component categories.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Kiln work with TypeScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every component ships with complete TypeScript type definitions. Props are narrowly typed — no any types, no required generic annotations. Variant unions, size literals, and event handlers are all correctly inferred in your IDE without extra configuration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Kiln require Tailwind CSS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Kiln is a CSS-first library with its own token-driven design system. It does not require Tailwind, Sass, CSS-in-JS, or any preprocessor. One CSS import at your app root is all that is needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What React versions does Kiln support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kiln supports React 18 and React 19. It ships both ESM and CJS builds and is fully compatible with Vite, Next.js, Remix, and Create React App.',
      },
    },
  ],
};

function usePageSchema(schema: object) {
  useEffect(() => {
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(schema);
    tag.dataset.kilnPage = 'faq';
    document.head.appendChild(tag);
    return () => tag.remove();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── FAQ data ────────────────────────────────────────────────────────────────

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  tags?: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'wcag',
    question: 'Is Kiln WCAG AA compliant?',
    tags: ['Accessibility'],
    answer: (
      <>
        <p>Yes — unconditionally. Every Kiln component meets WCAG 2.1 AA by default:</p>
        <ul>
          <li>Keyboard navigation on every interactive element (Tab, Shift+Tab, Enter, Space, arrow keys, Escape)</li>
          <li>Visible focus rings via <code>:focus-visible</code> — never hidden, never faked</li>
          <li>Correct ARIA roles, states, and properties on every primitive</li>
          <li>4.5:1 color contrast for text, 3:1 for UI components, in both light and dark themes</li>
          <li>44×44px minimum touch targets on all interactive elements</li>
        </ul>
        <p>Verified with axe DevTools — <strong>0 automatic, 0 guided, and 0 manual issues</strong> across all component categories.</p>
        <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap', marginTop: 'var(--kiln-space-3)' }}>
          <Badge variant="success">Keyboard navigation</Badge>
          <Badge variant="success">ARIA attributes</Badge>
          <Badge variant="success">Focus management</Badge>
          <Badge variant="success">0 axe issues</Badge>
        </div>
      </>
    ),
  },
  {
    id: 'shadcn',
    question: 'How does Kiln compare to shadcn/ui?',
    tags: ['Comparison'],
    answer: (
      <>
        <p>They solve different problems. The key difference:</p>
        <ul>
          <li><strong>Kiln</strong> — fully styled, pre-built. One <code>npm install</code>, one CSS import, ship. No Tailwind required. You get a cohesive visual system out of the box.</li>
          <li><strong>shadcn/ui</strong> — copy-paste primitives built on Radix UI that you own and style with Tailwind. More control, more setup, more ongoing maintenance.</li>
        </ul>
        <p>
          Both are accessible. Choose Kiln if you want to move fast without owning the styling layer.
          Choose shadcn if you need pixel-perfect control and already have Tailwind in your stack.
        </p>
        <Button variant="secondary" size="sm" onClick={() => navigate('/get-started')} style={{ marginTop: 'var(--kiln-space-3)' }}>
          See how fast Kiln installs →
        </Button>
      </>
    ),
  },
  {
    id: 'bundle-size',
    question: "What is Kiln's bundle size?",
    tags: ['Performance'],
    answer: (
      <>
        <p>Under 26 KB gzipped total — <strong>~10 KB</strong> for <code>kiln.css</code> and <strong>~13 KB</strong> for the ESM JavaScript bundle. Zero runtime dependencies beyond React itself.</p>
        <p>For comparison, Material UI ships ~300 KB gzipped for a similar component set. Kiln achieves comparable functionality at roughly 10× less weight.</p>
        <p>Heavy optional dependencies (e.g. the syntax highlighter inside CodeBlock) are loaded lazily via <code>React.lazy</code> and dynamic <code>import()</code> — they never land on the critical request chain.</p>
      </>
    ),
  },
  {
    id: 'dark-mode',
    question: 'Does Kiln support dark mode?',
    tags: ['Theming'],
    answer: (
      <>
        <p>Yes. Set <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element. That's the entire API.</p>
        <p>
          Kiln includes a built-in <code>ThemeToggle</code> component that handles this automatically — it reads
          the user's system preference on first load, lets them override it, and persists their choice to
          <code>localStorage</code>. No context provider, no setup, no flash of unstyled content.
        </p>
        <p>Dark mode overrides are implemented in <code>@layer kiln</code> using the <code>[data-theme="dark"]</code> selector, so your own CSS always wins without needing <code>!important</code>.</p>
      </>
    ),
  },
  {
    id: 'wcag-libraries-2026',
    question: 'Which React component libraries are WCAG AA compliant in 2026?',
    tags: ['Accessibility', 'Comparison'],
    answer: (
      <>
        <p>Several libraries have strong accessibility coverage in 2026:</p>
        <ul>
          <li><strong>Kiln</strong> — fully styled, WCAG AA, Lighthouse Accessibility 100, 0 axe issues. No Tailwind required.</li>
          <li><strong>React Aria (Adobe)</strong> — headless, excellent WAI-ARIA coverage. You supply all styles.</li>
          <li><strong>Base UI (MUI)</strong> — headless, actively maintained successor to Radix UI primitives.</li>
          <li><strong>Radix UI</strong> — headless, strong ARIA patterns. Update pace has slowed since WorkOS acquisition.</li>
          <li><strong>Chakra UI</strong> — styled, meets WCAG AA. Larger bundle than Kiln.</li>
        </ul>
        <p>
          Kiln is the only fully-styled option with a publicly verifiable Lighthouse Accessibility score of 100
          and documented 0 axe issues — not self-reported, screenshot-backed.
        </p>
      </>
    ),
  },
  {
    id: 'typescript',
    question: 'Does Kiln work with TypeScript?',
    tags: ['Developer experience'],
    answer: (
      <>
        <p>Yes. Every component ships with complete TypeScript type definitions bundled in the package — no <code>@types/</code> package needed.</p>
        <ul>
          <li>Props are narrowly typed — no <code>any</code>, no required generic annotations</li>
          <li>Variant unions and size literals are inferred from string literals, not plain <code>string</code></li>
          <li>Event handlers are correctly typed to their DOM element</li>
          <li>All exported types (<code>ButtonProps</code>, <code>ButtonVariant</code>, etc.) are available as named imports from <code>@doriansmith/kiln</code></li>
        </ul>
      </>
    ),
  },
  {
    id: 'tailwind',
    question: 'Does Kiln require Tailwind CSS?',
    tags: ['Setup'],
    answer: (
      <>
        <p>No. Kiln has its own CSS-first, token-driven design system. It does not require Tailwind, Sass, CSS Modules, CSS-in-JS, or any preprocessor.</p>
        <p>One import at your app root is all you need:</p>
        <pre style={{
          background: 'var(--kiln-gray-100)',
          padding: 'var(--kiln-space-3) var(--kiln-space-4)',
          borderRadius: 'var(--kiln-radius-md)',
          fontFamily: 'var(--kiln-font-mono)',
          fontSize: 'var(--kiln-text-sm)',
          overflowX: 'auto',
          margin: 'var(--kiln-space-3) 0 0',
        }}>
          <code>{"import '@doriansmith/kiln/kiln.css';"}</code>
        </pre>
        <p style={{ marginTop: 'var(--kiln-space-3)' }}>
          You can override any design token in your own stylesheet without Tailwind and without touching Kiln's source.
        </p>
      </>
    ),
  },
  {
    id: 'react-version',
    question: 'What React versions does Kiln support?',
    tags: ['Setup'],
    answer: (
      <>
        <p>Kiln supports <strong>React 18 and React 19</strong>. It ships both ESM and CJS builds and works with:</p>
        <ul>
          <li>Vite (recommended)</li>
          <li>Next.js (App Router and Pages Router)</li>
          <li>Remix</li>
          <li>Create React App</li>
        </ul>
        <p>There are no framework-specific adapters or wrappers required — import from <code>@doriansmith/kiln</code> and use.</p>
      </>
    ),
  },
];


// ─── Shared layout styles ─────────────────────────────────────────────────────

const sectionBase: React.CSSProperties = {
  maxWidth: 800,
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '0 clamp(var(--kiln-space-4), 5vw, var(--kiln-space-8))',
};

// ─── FaqPage ──────────────────────────────────────────────────────────────────

export default function FaqPage() {
  usePageSchema(FAQ_SCHEMA);

  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--kiln-body-bg)',
      color: 'var(--kiln-gray-900)',
      fontFamily: 'var(--kiln-font-sans)',
      transition: 'background 0.3s, color 0.3s',
    }}>
      {/* ── Nav ── */}
      <Nav
        logo={NAV_LOGO}
        items={NAV_ITEMS}
        isActive={isNavActive}
        onNavigate={(href) => { window.history.pushState(null, '', href); window.dispatchEvent(new Event('popstate')); }}
        actions={<NavActions />}
      />

      <main>

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <Hero
          id="faq-heading"
          size="sm"
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything developers ask before adopting Kiln — bundle size, accessibility compliance, framework compatibility, and how it compares to alternatives."
        />

        {/* ══ FAQ BODY ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="faq-heading" style={{ padding: 'var(--kiln-space-12) 0 var(--kiln-space-16)' }}>
          <div style={sectionBase}>

            {/* Q&A list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
              {FAQ_ITEMS.map(item => {
                const isOpen = openId === item.id;
                return (
                  <Card
                    key={item.id}
                    variant="default"
                    style={{ '--kiln-card-padding': '0', overflow: 'hidden' } as React.CSSProperties}
                  >
                    <button
                      id={`faq-q-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${item.id}`}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: 'var(--kiln-space-5) var(--kiln-space-6)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--kiln-space-4)',
                        fontFamily: 'var(--kiln-font-sans)',
                        minHeight: 56,
                      }}
                    >
                      <span style={{
                        fontSize: 'var(--kiln-text-base)',
                        fontWeight: 600,
                        color: 'var(--kiln-gray-900)',
                        lineHeight: 'var(--kiln-leading-snug)',
                      }}>
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: 'var(--kiln-text-lg)',
                          color: 'var(--kiln-gray-500)',
                          flexShrink: 0,
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 200ms var(--kiln-ease-out)',
                          display: 'inline-block',
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-a-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-q-${item.id}`}
                        style={{
                          padding: '0 var(--kiln-space-6) var(--kiln-space-6)',
                          borderTop: '1px solid var(--kiln-gray-200)',
                          paddingTop: 'var(--kiln-space-5)',
                        }}
                      >
                        <div style={{
                          fontSize: 'var(--kiln-text-sm)',
                          color: 'var(--kiln-gray-700)',
                          lineHeight: 'var(--kiln-leading-relaxed)',
                        }}
                          className="kiln-faq-answer"
                        >
                          {item.answer}
                        </div>
                        {item.tags && item.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap', marginTop: 'var(--kiln-space-4)' }}>
                            {item.tags.map(tag => (
                              <Badge key={tag} variant="neutral">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="faq-cta-heading" style={{ background: 'var(--kiln-surface)', padding: 'var(--kiln-space-16) 0' }}>
          <div style={{ ...sectionBase, textAlign: 'center' }}>
            <h2
              id="faq-cta-heading"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, var(--kiln-text-2xl))',
                fontWeight: 700,
                color: 'var(--kiln-gray-900)',
                margin: '0 0 var(--kiln-space-3)',
                letterSpacing: 'var(--kiln-tracking-tight)',
              }}
            >
              Still have questions?
            </h2>
            <p style={{ color: 'var(--kiln-gray-600)', margin: '0 auto var(--kiln-space-6)', maxWidth: 480, lineHeight: 'var(--kiln-leading-relaxed)' }}>
              Open an issue on GitHub or browse the component docs to see every API in action.
            </p>
            <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => navigate('/components')}>
                Browse components
              </Button>
              <Button variant="secondary" href="https://github.com/Aldentec/kiln/issues" target="_blank" rel="noopener noreferrer">
                Open an issue on GitHub
              </Button>
            </div>
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
