import React from 'react';
import { GradientText } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const GradientTextPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)', width: '100%' }}>
    <div>
      <p style={{ margin: '0 0 var(--kiln-space-1)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>brand</p>
      <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.1 }}>
        Ship fast{' '}
        <GradientText variant="brand">without compromise</GradientText>
      </h2>
    </div>
    <div>
      <p style={{ margin: '0 0 var(--kiln-space-1)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>warm</p>
      <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.1 }}>
        <GradientText variant="warm">Golden hour</GradientText>{' '}
        design tokens
      </h2>
    </div>
    <div>
      <p style={{ margin: '0 0 var(--kiln-space-1)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>cool</p>
      <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.1 }}>
        Built for{' '}
        <GradientText variant="cool">indie developers</GradientText>
      </h2>
    </div>
    <div>
      <p style={{ margin: '0 0 var(--kiln-space-1)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>sunset</p>
      <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.1 }}>
        <GradientText variant="sunset">Zero config.</GradientText>{' '}
        One import.
      </h2>
    </div>
    <div>
      <p style={{ margin: '0 0 var(--kiln-space-1)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>custom tokens</p>
      <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.1 }}>
        <GradientText
          variant="custom"
          style={{ '--kiln-gradient-text-from': '#10b981', '--kiln-gradient-text-to': '#3b82f6' } as React.CSSProperties}
        >
          Your brand,
        </GradientText>{' '}
        your colors
      </h2>
    </div>
    <div>
      <p style={{ margin: '0 0 var(--kiln-space-1)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>as h1</p>
      <GradientText as="h1" variant="brand" style={{ margin: 0, fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800 }}>
        Full heading element
      </GradientText>
    </div>
  </div>
);

export const gradientText: ComponentDoc = {
  id: 'gradient-text',
  name: 'GradientText',
  description: 'Inline or block gradient text using CSS background-clip: text. Renders as any HTML element (default: span) so it composes naturally inside headings, paragraphs, and any other text context. Four built-in presets plus a fully customisable custom variant via CSS tokens. Forced-colors safe.',
  preview: GradientTextPreview,
  code: `import { GradientText } from '@doriansmith/kiln';

// brand — inline inside a heading
<h2>
  Ship fast{' '}
  <GradientText variant="brand">without compromise</GradientText>
</h2>

// warm — golden preset
<h2>
  <GradientText variant="warm">Golden hour</GradientText>{' '}
  design tokens
</h2>

// cool — blue-violet-pink preset
<h2>
  Built for{' '}
  <GradientText variant="cool">indie developers</GradientText>
</h2>

// sunset — orange-to-pink preset
<h2>
  <GradientText variant="sunset">Zero config.</GradientText>{' '}
  One import.
</h2>

// custom — pass your own colors via CSS tokens
<h2>
  <GradientText
    variant="custom"
    style={{
      '--kiln-gradient-text-from': '#10b981',
      '--kiln-gradient-text-to':   '#3b82f6',
    }}
  >
    Your brand,
  </GradientText>{' '}
  your colors
</h2>

// as="h1" — render as a standalone heading element
<GradientText
  as="h1"
  variant="brand"
  style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800 }}
>
  Full heading element
</GradientText>`,
  props: [
    { name: 'variant', type: "'brand' | 'warm' | 'cool' | 'sunset' | 'custom'", default: "'brand'", required: false, description: "Gradient preset. 'brand' uses --kiln-primary → --kiln-primary-light → --kiln-accent. 'custom' reads --kiln-gradient-text-from and --kiln-gradient-text-to tokens set via inline style or CSS." },
    { name: 'as', type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'strong' | 'em'", default: "'span'", required: false, description: "HTML element to render. Defaults to 'span' for inline use inside existing headings. Set to 'h1'–'h6' to render a standalone gradient heading." },
    { name: 'angle', type: 'number', default: '135', required: false, description: 'Gradient direction in degrees. Overrides --kiln-gradient-text-angle.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles. Use to pass --kiln-gradient-text-from / --kiln-gradient-text-to for the custom variant, or override font-size and font-weight when rendering as a heading element.' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Text content to render with the gradient.' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { GradientText } from '@doriansmith/kiln';

it('renders children', () => {
  render(<GradientText>Hello</GradientText>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

it('renders as span by default', () => {
  const { container } = render(<GradientText>Text</GradientText>);
  expect(container.querySelector('span')).toBeInTheDocument();
});

it('renders as h1 when as="h1"', () => {
  render(<GradientText as="h1">Heading</GradientText>);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

it('applies variant class', () => {
  const { container } = render(<GradientText variant="cool">Text</GradientText>);
  expect(container.querySelector('.kiln-gradient-text--cool')).toBeInTheDocument();
});`,
  usage: `// Hero headline with inline gradient accent
<Hero
  title={
    <>
      The toolkit that{' '}
      <GradientText variant="brand">ships with you</GradientText>
    </>
  }
/>

// Standalone gradient heading
<GradientText
  as="h2"
  variant="warm"
  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}
>
  Launch week
</GradientText>

// Custom brand colours (e.g. consumer overrides --kiln-primary)
<GradientText variant="brand">
  Already respects your --kiln-primary override
</GradientText>

// Fully custom palette
<GradientText
  variant="custom"
  style={{
    '--kiln-gradient-text-from': 'var(--brand-blue)',
    '--kiln-gradient-text-to':   'var(--brand-teal)',
    fontSize: '3rem',
    fontWeight: 900,
  }}
>
  Custom brand gradient
</GradientText>`,
};
