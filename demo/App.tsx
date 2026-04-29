import React, { useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggle = () =>
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'var(--kiln-font-sans)',
        background: 'var(--kiln-body-bg)',
        color: 'var(--kiln-gray-900)',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          borderBottom: '1px solid var(--kiln-gray-200)',
          paddingBottom: '1rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 'var(--kiln-text-2xl)', fontWeight: 700 }}>
          Kiln Design System{' '}
          <span style={{ opacity: 0.4, fontWeight: 400 }}>v0.1.0 demo</span>
        </h1>
        <button
          onClick={toggle}
          style={{
            cursor: 'pointer',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--kiln-radius-md)',
            border: '1px solid var(--kiln-gray-300)',
            background: 'var(--kiln-surface-raised)',
            color: 'var(--kiln-gray-900)',
            fontSize: 'var(--kiln-text-sm)',
          }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main>
        <Section title="Tokens — Brand Colors">
          <SwatchRow
            swatches={[
              { label: '--kiln-primary', var: '--kiln-primary' },
              { label: '--kiln-primary-light', var: '--kiln-primary-light' },
              { label: '--kiln-primary-dark', var: '--kiln-primary-dark' },
              { label: '--kiln-accent', var: '--kiln-accent' },
              { label: '--kiln-accent-light', var: '--kiln-accent-light' },
              { label: '--kiln-accent-dark', var: '--kiln-accent-dark' },
            ]}
          />
        </Section>

        <Section title="Tokens — Neutral Scale">
          <SwatchRow
            swatches={[
              { label: '50', var: '--kiln-gray-50' },
              { label: '100', var: '--kiln-gray-100' },
              { label: '200', var: '--kiln-gray-200' },
              { label: '300', var: '--kiln-gray-300' },
              { label: '400', var: '--kiln-gray-400' },
              { label: '500', var: '--kiln-gray-500' },
              { label: '600', var: '--kiln-gray-600' },
              { label: '700', var: '--kiln-gray-700' },
              { label: '800', var: '--kiln-gray-800' },
              { label: '900', var: '--kiln-gray-900' },
              { label: '950', var: '--kiln-gray-950' },
            ]}
          />
        </Section>

        <Section title="Tokens — Severity">
          <SwatchRow
            swatches={[
              { label: 'critical', var: '--kiln-severity-critical' },
              { label: 'high', var: '--kiln-severity-high' },
              { label: 'medium', var: '--kiln-severity-medium' },
              { label: 'low', var: '--kiln-severity-low' },
            ]}
          />
        </Section>

        <Section title="Tokens — Status">
          <SwatchRow
            swatches={[
              { label: 'success', var: '--kiln-status-success' },
              { label: 'warning', var: '--kiln-status-warning' },
              { label: 'error', var: '--kiln-status-error' },
              { label: 'info', var: '--kiln-status-info' },
              { label: 'pending', var: '--kiln-status-pending' },
              { label: 'running', var: '--kiln-status-running' },
            ]}
          />
        </Section>

        <Section title="Tokens — Gradients">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'brand', var: '--kiln-gradient-brand' },
              { label: 'warm', var: '--kiln-gradient-warm' },
              { label: 'success', var: '--kiln-gradient-success' },
              { label: 'danger', var: '--kiln-gradient-danger' },
              { label: 'surface', var: '--kiln-gradient-surface' },
              { label: 'glass', var: '--kiln-gradient-glass' },
              { label: 'dark', var: '--kiln-gradient-dark' },
            ].map((s) => (
              <div key={s.var} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 80,
                    height: 48,
                    borderRadius: 'var(--kiln-radius-md)',
                    background: `var(${s.var})`,
                    border: '1px solid var(--kiln-gray-200)',
                    marginBottom: 4,
                  }}
                />
                <span style={{ fontSize: 'var(--kiln-text-xs)', opacity: 0.7 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Tokens — Shadows">
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'glow', 'glow-accent'].map((s) => (
              <div key={s} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 'var(--kiln-radius-md)',
                    background: 'var(--kiln-surface-raised)',
                    boxShadow: `var(--kiln-shadow-${s})`,
                    marginBottom: 8,
                  }}
                />
                <span style={{ fontSize: 'var(--kiln-text-xs)', opacity: 0.7 }}>{s}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Button">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 6.</p>
        </Section>

        <Section title="Input / Textarea">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 6.</p>
        </Section>

        <Section title="Card">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 6.</p>
        </Section>

        <Section title="Badge">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 6.</p>
        </Section>

        <Section title="Chip">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 6.</p>
        </Section>

        <Section title="Tabs">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 6.</p>
        </Section>

        <Section title="Modal / LoadingIndicator / ErrorMessage / ThemeToggle / NavMenu / MobileNav / Footer / ScrollToTop">
          <p style={{ opacity: 0.5, fontSize: 'var(--kiln-text-sm)' }}>Coming in Step 5.</p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2
        style={{
          fontSize: 'var(--kiln-text-xs)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: 0.45,
          marginBottom: '1rem',
          borderBottom: '1px solid var(--kiln-gray-200)',
          paddingBottom: '0.4rem',
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SwatchRow({ swatches }: { swatches: { label: string; var: string }[] }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      {swatches.map((s) => (
        <div key={s.var} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--kiln-radius-md)',
              background: `var(${s.var})`,
              border: '1px solid var(--kiln-gray-200)',
              marginBottom: 4,
            }}
          />
          <span style={{ fontSize: 'var(--kiln-text-xs)', opacity: 0.7, display: 'block', maxWidth: 56, wordBreak: 'break-word' }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
