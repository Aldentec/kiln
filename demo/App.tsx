import React, { useState } from 'react';
import {
  Button, Input, Textarea, Card, Badge, Chip, Tabs,
  Modal, LoadingIndicator, ErrorMessage, ThemeToggle,
  NavMenu, Footer,
} from '@doriansmith/kiln';

const NAV_ITEMS = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/demo', label: 'Demo' },
];

const FOOTER_LINKS = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: 'https://github.com/Aldentec/kiln', label: 'GitHub', external: true as const },
];

const TAB_ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'settings', label: 'Settings' },
  { value: 'logs', label: 'Logs' },
  { value: 'disabled', label: 'Disabled', disabled: true },
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set(['react']));
  const [activeTab, setActiveTab] = useState('overview');

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--kiln-body-bg)',
      color: 'var(--kiln-gray-900)',
      fontFamily: 'var(--kiln-font-sans)',
      transition: 'background 0.3s, color 0.3s',
    }}>
      {/* Nav */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', borderBottom: '1px solid var(--kiln-gray-200)',
        position: 'sticky', top: 0, background: 'var(--kiln-body-bg)', zIndex: 10,
      }}>
        <strong style={{ fontSize: 'var(--kiln-text-lg)' }}>⚗️ Kiln</strong>
        <NavMenu items={NAV_ITEMS} isActive={(h) => h === '/demo'} />
        <ThemeToggle defaultTheme={theme} />
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>

        {/* ── Button ── */}
        <Section title="Button">
          <Row label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="States">
            <Button loading>Saving…</Button>
            <Button disabled>Disabled</Button>
            <Button leftIcon="→" rightIcon="✓">With Icons</Button>
          </Row>
        </Section>

        {/* ── Input ── */}
        <Section title="Input">
          <Row label="Default">
            <Input label="Email" placeholder="you@example.com" style={{ width: 260 }} />
          </Row>
          <Row label="Error">
            <Input label="Username" errorText="Username is taken" placeholder="jsmith" style={{ width: 260 }} />
          </Row>
          <Row label="Success">
            <Input label="Domain" variant="success" helperText="Domain is available" placeholder="example.com" style={{ width: 260 }} />
          </Row>
          <Row label="With icons">
            <Input leftIcon="🔍" placeholder="Search…" style={{ width: 260 }} />
          </Row>
        </Section>

        {/* ── Textarea ── */}
        <Section title="Textarea">
          <Row label="Default">
            <Textarea label="Description" placeholder="Tell us about your project…" style={{ width: 400 }} />
          </Row>
          <Row label="With char count">
            <Textarea label="Bio" showCharCount maxLength={200} defaultValue="Hello world" style={{ width: 400 }} />
          </Row>
          <Row label="Error">
            <Textarea label="Notes" errorText="Please add more detail" style={{ width: 400 }} />
          </Row>
        </Section>

        {/* ── Card ── */}
        <Section title="Card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {(['default', 'raised', 'glass', 'gradient-border'] as const).map((v) => (
              <Card key={v} variant={v} hoverLift>
                <strong style={{ textTransform: 'capitalize' }}>{v}</strong>
                <p style={{ margin: '0.5rem 0 0', fontSize: 'var(--kiln-text-sm)', opacity: 0.6 }}>
                  kiln-card--{v}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ── Badge ── */}
        <Section title="Badge">
          <Row label="Severity">
            {(['critical', 'high', 'medium', 'low'] as const).map((v) => (
              <Badge key={v} variant={v}>{v}</Badge>
            ))}
          </Row>
          <Row label="Status">
            {(['success', 'warning', 'error', 'info', 'pending', 'running'] as const).map((v) => (
              <Badge key={v} variant={v}>{v}</Badge>
            ))}
          </Row>
          <Row label="Sizes">
            <Badge variant="critical" size="sm">sm critical</Badge>
            <Badge variant="success" size="md">md success</Badge>
            <Badge variant="neutral">neutral</Badge>
          </Row>
        </Section>

        {/* ── Chip ── */}
        <Section title="Chip">
          <Row label="Selectable">
            {[['react', 'React'], ['ts', 'TypeScript'], ['css', 'CSS'], ['node', 'Node.js']].map(([val, label]) => (
              <Chip
                key={val}
                selected={selectedChips.has(val)}
                onToggle={(sel) => {
                  const next = new Set(selectedChips);
                  sel ? next.add(val) : next.delete(val);
                  setSelectedChips(next);
                }}
              >
                {label}
              </Chip>
            ))}
            <Chip disabled>Disabled</Chip>
          </Row>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <Row label="Uncontrolled">
            <Tabs items={TAB_ITEMS} defaultValue="overview" />
          </Row>
          <Row label="Controlled">
            <Tabs items={TAB_ITEMS} value={activeTab} onChange={setActiveTab} />
            <span style={{ marginLeft: '1rem', fontSize: 'var(--kiln-text-sm)', opacity: 0.6 }}>
              active: {activeTab}
            </span>
          </Row>
        </Section>

        {/* ── Modal ── */}
        <Section title="Modal">
          <Row label="">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </Row>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
            <p style={{ margin: 0, color: 'var(--kiln-gray-700)' }}>
              This is the modal content. Press Escape or click outside to close.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </Section>

        {/* ── LoadingIndicator ── */}
        <Section title="LoadingIndicator">
          <Row label="Default">
            <LoadingIndicator message="Loading data…" />
          </Row>
          <Row label="Inline">
            <LoadingIndicator inline message="Processing…" />
          </Row>
        </Section>

        {/* ── ErrorMessage ── */}
        <Section title="ErrorMessage">
          <ErrorMessage message="Something went wrong. Please try again." retryAction={() => {}} retryLabel="Retry" />
        </Section>

      </main>

      <Footer
        logo={<span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>⚗️ Kiln</span>}
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} Dorian Smith`}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'var(--kiln-text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em',
        opacity: 0.45, marginBottom: '1rem', borderBottom: '1px solid var(--kiln-gray-200)',
        paddingBottom: '0.4rem', fontWeight: 600,
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
      {label && <span style={{ fontSize: 'var(--kiln-text-xs)', opacity: 0.5, minWidth: 70 }}>{label}</span>}
      {children}
    </div>
  );
}
