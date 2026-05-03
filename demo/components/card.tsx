import React from 'react';
import { Card } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const CardPreview: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', width: '100%' }}>
    <Card variant="default">
      <p style={{ margin: 0, fontWeight: 600 }}>Default</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>Standard card with top strip</p>
    </Card>
    <Card variant="raised">
      <p style={{ margin: 0, fontWeight: 600 }}>Raised</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>Elevated shadow with glow</p>
    </Card>
    <Card variant="gradient-border">
      <p style={{ margin: 0, fontWeight: 600 }}>Gradient Border</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>Animated gradient outline</p>
    </Card>
  </div>
);

export const card: ComponentDoc = {
  id: 'card',
  name: 'Card',
  description: 'Elevated content containers with four visual treatments and optional hover interaction.',
  preview: CardPreview,
  code: `import { Card } from '@doriansmith/kiln';

<Card variant="default">Default card</Card>
<Card variant="raised">Raised with gradient glow</Card>
<Card variant="glass">Glass morphism</Card>
<Card variant="gradient-border">Animated gradient border</Card>

// Clickable card
<Card onClick={() => navigate('/detail')} hoverLift>
  <h3>Project Alpha</h3>
</Card>`,
  props: [
    { name: 'variant', type: "'default' | 'raised' | 'glass' | 'gradient-border'", default: "'default'", required: false, description: 'Visual treatment variant' },
    { name: 'hoverLift', type: 'boolean', default: 'false', required: false, description: 'Lifts the card on hover with shadow enhancement' },
    { name: 'onClick', type: 'React.MouseEventHandler', default: '—', required: false, description: 'Makes the card interactive (adds role=button)' },
    { name: 'asChild', type: 'boolean', default: 'false', required: false, description: 'Merges props onto child element' },
    { name: 'as', type: 'React.ElementType', default: "'div'", required: false, description: 'Override the rendered HTML element' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-card-* token overrides' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Card content' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@doriansmith/kiln';

it('renders children', () => {
  render(<Card>Content</Card>);
  expect(screen.getByText('Content')).toBeInTheDocument();
});

it('applies variant class', () => {
  const { container } = render(<Card variant="raised">X</Card>);
  expect(container.firstChild).toHaveClass('kiln-card--raised');
});

it('adds role=button and handles click when onClick provided', () => {
  const onClick = vi.fn();
  render(<Card onClick={onClick}>Clickable</Card>);
  const card = screen.getByRole('button');
  fireEvent.click(card);
  expect(onClick).toHaveBeenCalled();
});`,
  usage: `// Dashboard metric card
<Card variant="raised" style={{ '--kiln-card-padding': '1.5rem' }}>
  <p className="label">Total revenue</p>
  <h2>$24,500</h2>
</Card>

// Navigable list item
<Card variant="default" hoverLift onClick={() => navigate(\`/items/\${id}\`)}>
  <h3>{item.name}</h3>
  <Badge variant={item.status}>{item.status}</Badge>
</Card>

// Override padding per instance
<Card style={{ '--kiln-card-padding': 'var(--kiln-space-4)' }}>
  Compact card
</Card>`,
};
