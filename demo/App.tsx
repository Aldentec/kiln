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
    <div style={{ minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem',
          borderBottom: '1px solid #333',
          paddingBottom: '1rem',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Kiln Design System <span style={{ opacity: 0.4 }}>v0.1.0 demo</span>
        </h1>
        <button onClick={toggle} style={{ cursor: 'pointer', padding: '0.4rem 1rem' }}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main>
        <Section title="Tokens">
          <p style={{ opacity: 0.6 }}>Tokens will render here after Step 4.</p>
        </Section>

        <Section title="Button">
          <p style={{ opacity: 0.6 }}>Button variants will render here after Step 6.</p>
        </Section>

        <Section title="Input / Textarea">
          <p style={{ opacity: 0.6 }}>Input + Textarea will render here after Step 6.</p>
        </Section>

        <Section title="Card">
          <p style={{ opacity: 0.6 }}>Card variants will render here after Step 6.</p>
        </Section>

        <Section title="Badge">
          <p style={{ opacity: 0.6 }}>Badge variants will render here after Step 6.</p>
        </Section>

        <Section title="Chip">
          <p style={{ opacity: 0.6 }}>Chip will render here after Step 6.</p>
        </Section>

        <Section title="Tabs">
          <p style={{ opacity: 0.6 }}>Tabs will render here after Step 6.</p>
        </Section>

        <Section title="Modal">
          <p style={{ opacity: 0.6 }}>Modal will render here after Step 5.</p>
        </Section>

        <Section title="LoadingIndicator">
          <p style={{ opacity: 0.6 }}>LoadingIndicator will render here after Step 5.</p>
        </Section>

        <Section title="ErrorMessage">
          <p style={{ opacity: 0.6 }}>ErrorMessage will render here after Step 5.</p>
        </Section>

        <Section title="ThemeToggle">
          <p style={{ opacity: 0.6 }}>ThemeToggle will render here after Step 5.</p>
        </Section>

        <Section title="NavMenu / MobileNav">
          <p style={{ opacity: 0.6 }}>Nav primitives will render here after Step 5.</p>
        </Section>

        <Section title="Footer">
          <p style={{ opacity: 0.6 }}>Footer will render here after Step 5.</p>
        </Section>

        <Section title="ScrollToTop">
          <p style={{ opacity: 0.6 }}>ScrollToTop will render here after Step 5.</p>
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
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          opacity: 0.5,
          marginBottom: '1rem',
          borderBottom: '1px solid currentColor',
          paddingBottom: '0.4rem',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
