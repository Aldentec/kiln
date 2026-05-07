import React from 'react';
import { Blockquote } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const BlockquotePreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '520px' }}>
    <Blockquote cite="Dieter Rams">
      Good design is as little design as possible.
    </Blockquote>
    <Blockquote variant="accent" cite="Paul Rand">
      Design is the silent ambassador of your brand.
    </Blockquote>
    <Blockquote variant="subtle">
      The details are not the details. They make the design.
    </Blockquote>
  </div>
);

export const blockquote: ComponentDoc = {
  id: 'blockquote',
  name: 'Blockquote',
  description: 'Styled pull quote with a left accent border, italic serif text, and optional attribution.',
  preview: BlockquotePreview,
  code: `import { Blockquote } from '@doriansmith/kiln';

<Blockquote cite="Dieter Rams">
  Good design is as little design as possible.
</Blockquote>

<Blockquote variant="accent" cite="Paul Rand">
  Design is the silent ambassador of your brand.
</Blockquote>

<Blockquote variant="subtle">
  The details are not the details. They make the design.
</Blockquote>`,
  props: [
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'The quoted content' },
    { name: 'cite', type: 'React.ReactNode', default: '—', required: false, description: 'Attribution — author or source rendered in a footer' },
    { name: 'variant', type: "'default' | 'accent' | 'subtle'", default: "'default'", required: false, description: 'Visual treatment of the left border and background' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles (supports CSS custom property overrides)' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Blockquote } from '@doriansmith/kiln';

it('renders quoted text', () => {
  render(<Blockquote>Less, but better.</Blockquote>);
  expect(screen.getByText('Less, but better.')).toBeInTheDocument();
});

it('renders cite attribution', () => {
  render(<Blockquote cite="Dieter Rams">Less, but better.</Blockquote>);
  expect(screen.getByText('Dieter Rams')).toBeInTheDocument();
});`,
  usage: `// Pull quote in an article
<Blockquote cite="Steve Jobs" variant="accent">
  Design is not just what it looks like and feels like.
  Design is how it works.
</Blockquote>

// Subtle testimonial
<Blockquote variant="subtle" cite="A happy customer">
  Kiln cut our setup time from a day to under an hour.
</Blockquote>`,
};
