import React from 'react';
import { Card } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const CardPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', width: '100%' }}>
      <Card variant="default">Default card</Card>
      <Card variant="raised">Raised with gradient glow</Card>
      <Card variant="glass">Glass morphism</Card>
      <Card variant="gradient-border">Animated gradient border</Card>
    </div>
    <Card variant="coming-soon" description="This feature is on the way." />
    <Card onClick={() => {}} hoverLift>
      <h3 style={{ margin: 0 }}>Project Alpha</h3>
    </Card>
  </div>
);

export const card: ComponentDoc = {
  id: 'card',
  name: 'Card',
  description: 'Elevated content containers with five visual treatments including a built-in coming-soon placeholder state.',
  preview: CardPreview,
  code: `import { Card } from '@doriansmith/kiln';

<Card variant="default">Default card</Card>
<Card variant="raised">Raised with gradient glow</Card>
<Card variant="glass">Glass morphism</Card>
<Card variant="gradient-border">Animated gradient border</Card>

// Coming-soon placeholder — no children needed
<Card variant="coming-soon" description="This feature is on the way." />

// Clickable card
<Card onClick={() => navigate('/detail')} hoverLift>
  <h3>Project Alpha</h3>
</Card>`,
  props: [
    { name: 'variant', type: "'default' | 'raised' | 'glass' | 'gradient-border' | 'coming-soon'", default: "'default'", required: false, description: 'Visual treatment variant. coming-soon renders a built-in WIP placeholder layout.' },
    { name: 'title', type: 'string', default: "'Coming soon'", required: false, description: 'Heading text shown inside the coming-soon variant.' },
    { name: 'description', type: 'string', default: '—', required: false, description: 'Description text shown inside the coming-soon variant.' },
    { name: 'hoverLift', type: 'boolean', default: 'false', required: false, description: 'Lifts the card on hover with shadow enhancement' },
    { name: 'onClick', type: 'React.MouseEventHandler', default: '—', required: false, description: 'Makes the card interactive (adds role=button)' },
    { name: 'asChild', type: 'boolean', default: 'false', required: false, description: 'Merges props onto child element' },
    { name: 'as', type: 'React.ElementType', default: "'div'", required: false, description: 'Override the rendered HTML element' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-card-* token overrides. --kiln-card-coming-soon-max-width controls the max-width of the coming-soon variant.' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: false, description: 'Card content. Optional for the coming-soon variant.' },
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
