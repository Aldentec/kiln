import React from 'react';
import { ScrollIndicator } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ScrollIndicatorPreview: React.FC = () => (
  <div style={{ display: 'flex', gap: 'var(--kiln-space-8)', alignItems: 'center', flexWrap: 'wrap', padding: 'var(--kiln-space-4) 0' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
      <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>default</p>
      <ScrollIndicator />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
      <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>ghost</p>
      <ScrollIndicator variant="ghost" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
      <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>clickable</p>
      <ScrollIndicator onClick={() => {}} label="Jump to content" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
      <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>anchor</p>
      <ScrollIndicator href="#content" label="See more" />
    </div>
  </div>
);

export const scrollIndicator: ComponentDoc = {
  id: 'scroll-indicator',
  name: 'ScrollIndicator',
  description: 'A pulsing scroll cue — typically placed at the bottom of a full-page hero. Renders as a mouse icon with an animated scrolling wheel dot and an uppercase label. Adapts to three rendering modes: decorative div (no interaction), button (onClick), or anchor (href). Fully token-driven and prefers-reduced-motion safe.',
  preview: ScrollIndicatorPreview,
  code: `import { ScrollIndicator } from '@doriansmith/kiln';

// default — decorative, no interaction
<ScrollIndicator />

// ghost variant
<ScrollIndicator variant="ghost" />

// button — renders as <button> when onClick is provided
<ScrollIndicator onClick={() => {}} label="Jump to content" />

// anchor — renders as <a> when href is provided
<ScrollIndicator href="#content" label="See more" />`,
  props: [
    { name: 'variant', type: "'default' | 'light' | 'ghost'", default: "'default'", required: false, description: "Visual style. 'light' uses white tones — use on dark/gradient hero backgrounds. 'ghost' is minimal with muted tones." },
    { name: 'label', type: 'string', default: "'Scroll down'", required: false, description: 'Accessible label for screen readers and the visible text below the icon.' },
    { name: 'href', type: 'string', default: '—', required: false, description: "Anchor href (e.g. '#content'). When set, renders as an <a> element for native anchor scrolling." },
    { name: 'onClick', type: '() => void', default: '—', required: false, description: 'Click handler. When set (and no href), renders as a <button>. Use to trigger smooth-scroll via JS.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles. Override --kiln-scroll-indicator-color, --kiln-scroll-indicator-size, --kiln-scroll-indicator-pulse-color.' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollIndicator } from '@doriansmith/kiln';

it('renders default label', () => {
  render(<ScrollIndicator />);
  expect(screen.getByText('Scroll down')).toBeInTheDocument();
});

it('renders as anchor when href is set', () => {
  render(<ScrollIndicator href="#content" />);
  expect(screen.getByRole('link')).toHaveAttribute('href', '#content');
});

it('renders as button when onClick is set', async () => {
  const handler = vi.fn();
  render(<ScrollIndicator onClick={handler} />);
  await userEvent.click(screen.getByRole('button'));
  expect(handler).toHaveBeenCalledTimes(1);
});

it('renders as div with role=img when no interaction', () => {
  render(<ScrollIndicator />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});`,
  usage: `// Inside a full-page Hero — position at bottom-center with absolute/flex
<Hero
  fullPage
  navOffset
  variant="gradient"
  title="Your product. Shipped."
  actions={
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--kiln-space-6)' }}>
      <div style={{ display: 'flex', gap: 'var(--kiln-space-3)' }}>
        <Button variant="primary" size="lg">Get started</Button>
        <Button variant="ghost" size="lg">Learn more</Button>
      </div>
      <ScrollIndicator
        variant="light"
        href="#features"
        label="See what we build"
      />
    </div>
  }
/>

// Standalone, bottom-pinned inside a relative container
<section style={{ position: 'relative', minHeight: '100svh' }}>
  {/* hero content */}
  <div style={{ position: 'absolute', bottom: 'var(--kiln-space-8)', left: '50%', transform: 'translateX(-50%)' }}>
    <ScrollIndicator
      onClick={() => nextSection.current?.scrollIntoView({ behavior: 'smooth' })}
      label="Explore"
    />
  </div>
</section>`,
};
