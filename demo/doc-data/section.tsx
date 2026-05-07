import React from 'react';
import { Section } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const SectionPreview: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Section background="default" padding="sm" maxWidth="full">
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-600)' }}>
        <strong>default</strong> — base surface background
      </p>
    </Section>
    <Section background="subtle" padding="sm" maxWidth="full">
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-600)' }}>
        <strong>subtle</strong> — sunken / alternate row background
      </p>
    </Section>
    <Section background="emphasis" padding="sm" maxWidth="full">
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-600)' }}>
        <strong>emphasis</strong> — raised / card-level background
      </p>
    </Section>
  </div>
);

export const section: ComponentDoc = {
  id: 'section',
  name: 'Section',
  description: 'Full-width layout section with background alternation, constrained inner content, and optional ARIA landmark.',
  preview: SectionPreview,
  code: `import { Section } from '@doriansmith/kiln';

<Section background="default" padding="lg">
  <h2>Features</h2>
  <p>Everything you need to ship fast.</p>
</Section>

<Section background="subtle" padding="lg">
  <h2>Pricing</h2>
  <p>Simple, transparent pricing.</p>
</Section>

<Section background="emphasis" padding="lg">
  <h2>Testimonials</h2>
  <p>Trusted by indie developers worldwide.</p>
</Section>`,
  props: [
    { name: 'background', type: "'default' | 'subtle' | 'emphasis' | 'transparent'", default: "'default'", required: false, description: 'Background fill variant' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Vertical padding scale' },
    { name: 'maxWidth', type: "string | 'full'", default: "'1200px'", required: false, description: "Max-width of the inner content container. Pass 'full' to disable." },
    { name: 'aria-label', type: 'string', default: '—', required: false, description: "Accessible label — adds role='region' automatically when set" },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles (supports CSS custom property overrides)' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Section content' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Section } from '@doriansmith/kiln';

it('renders children', () => {
  render(<Section>Content</Section>);
  expect(screen.getByText('Content')).toBeInTheDocument();
});

it('adds landmark when aria-label is set', () => {
  render(<Section aria-label="Features">Content</Section>);
  expect(screen.getByRole('region', { name: 'Features' })).toBeInTheDocument();
});`,
  usage: `// Alternating page sections
<Section background="default" padding="lg" aria-label="Hero">
  <Hero title="Ship fast." />
</Section>

<Section background="subtle" padding="lg" aria-label="Features">
  <FeatureGrid />
</Section>

<Section background="default" padding="lg" aria-label="Pricing">
  <PricingTable />
</Section>`,
};
