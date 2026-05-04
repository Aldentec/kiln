import React from 'react';
import { Box } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const BoxPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)', maxWidth: 560 }}>
    <Box variant="h2" margin="0">Typography via variant</Box>
    <Box variant="p" margin="0">
      A paragraph styled with the Kiln type scale. Use <Box variant="strong">strong</Box> for emphasis
      and <Box variant="code">inline code</Box> for technical terms.
    </Box>
    <Box variant="h4" margin="0" color="var(--kiln-primary)">Overridden color</Box>
    <Box variant="small" display="block">Helper text in small — 14px minimum, muted color.</Box>
    <Box variant="pre" margin="0">{'const greet = (name: string) =>\n  `Hello, ${name}!`;'}</Box>
  </div>
);

export const box: ComponentDoc = {
  id: 'box',
  name: 'Box',
  description: 'Style a single semantic HTML element (h1–h5, p, strong, small, code, pre, samp) with design-system typography and optional layout overrides.',
  preview: BoxPreview,
  code: `import { Box } from '@doriansmith/kiln';

// Heading variants
<Box variant="h1">Page Title</Box>
<Box variant="h2">Section Heading</Box>
<Box variant="h3">Sub-section</Box>

// Body and inline text
<Box variant="p">Body paragraph with relaxed line-height.</Box>
<Box variant="strong">Bold emphasis</Box>
<Box variant="small">Helper or metadata text</Box>

// Monospace
<Box variant="code">npm install @doriansmith/kiln</Box>
<Box variant="pre">{'const x = 1;\\nconst y = 2;'}</Box>
<Box variant="samp">HTTP 200 OK</Box>

// Override props
<Box variant="h3" color="var(--kiln-primary)" textAlign="center" margin="0">
  Centred primary heading
</Box>

<Box variant="p" fontSize="lg" fontWeight={600}>
  Large semibold paragraph
</Box>

// Make an inline element block-level
<Box variant="small" display="block" padding="var(--kiln-space-2)">
  Block-level small text
</Box>`,
  props: [
    {
      name: 'variant',
      type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'strong' | 'small' | 'code' | 'pre' | 'samp'",
      default: "'p'",
      required: false,
      description: 'HTML element to render and the default typography style to apply.',
    },
    {
      name: 'fontSize',
      type: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | string",
      default: '—',
      required: false,
      description: 'Override font size. Named tokens map to design-system scale; raw CSS values (e.g. "1.75rem") are passed through.',
    },
    {
      name: 'textAlign',
      type: "'left' | 'center' | 'right' | 'justify'",
      default: '—',
      required: false,
      description: 'Override text alignment.',
    },
    {
      name: 'color',
      type: 'string',
      default: '—',
      required: false,
      description: 'Override text color. Accepts any CSS color value or custom property reference (e.g. "var(--kiln-primary)").',
    },
    {
      name: 'fontWeight',
      type: '300 | 400 | 500 | 600 | 700 | number',
      default: '—',
      required: false,
      description: 'Override font weight. Space Grotesk ships with 300, 400, 500, 600, 700.',
    },
    {
      name: 'display',
      type: "'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none' | string",
      default: '—',
      required: false,
      description: 'Override the CSS display property. Useful to make inline elements (small, strong, code) block-level.',
    },
    {
      name: 'margin',
      type: 'string',
      default: '—',
      required: false,
      description: 'CSS margin shorthand. Overrides the variant default (e.g. "0 0 1rem" or "0").',
    },
    {
      name: 'padding',
      type: 'string',
      default: '—',
      required: false,
      description: 'CSS padding shorthand.',
    },
    {
      name: 'float',
      type: "'left' | 'right' | 'none' | 'inline-start' | 'inline-end'",
      default: '—',
      required: false,
      description: 'CSS float value.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      required: false,
      description: 'Additional CSS classes merged with the base kiln-box classes.',
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      default: '—',
      required: false,
      description: 'Inline styles merged last — wins over override props on collisions. Use for CSS custom property overrides (e.g. --kiln-box-code-bg).',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: '—',
      required: false,
      description: 'Content to render inside the element.',
    },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Box } from '@doriansmith/kiln';

it('renders the correct HTML element for each variant', () => {
  render(<Box variant="h2">Section</Box>);
  expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument();
});

it('applies the variant modifier class', () => {
  render(<Box variant="p">text</Box>);
  expect(screen.getByText('text')).toHaveClass('kiln-box--p');
});

it('maps named fontSize token to CSS variable', () => {
  render(<Box fontSize="xl">text</Box>);
  expect(screen.getByText('text')).toHaveStyle({ fontSize: 'var(--kiln-text-xl)' });
});

it('passes raw CSS fontSize through unchanged', () => {
  render(<Box fontSize="1.75rem">text</Box>);
  expect(screen.getByText('text')).toHaveStyle({ fontSize: '1.75rem' });
});

it('applies textAlign, color, fontWeight together', () => {
  render(
    <Box textAlign="center" color="rgb(0,0,255)" fontWeight={700}>
      text
    </Box>,
  );
  const el = screen.getByText('text');
  expect(el).toHaveStyle({ textAlign: 'center', color: 'rgb(0, 0, 255)', fontWeight: '700' });
});

it('does not render style attr when no overrides given', () => {
  render(<Box>text</Box>);
  expect(screen.getByText('text').getAttribute('style')).toBeNull();
});`,
  usage: `// Page heading with muted margin reset
<Box variant="h1" margin="0">
  Getting Started
</Box>

// Body copy
<Box variant="p">
  Install Kiln with{' '}
  <Box variant="code">npm install @doriansmith/kiln</Box>
  {' '}and import the CSS once.
</Box>

// Centred primary-coloured section title
<Box
  variant="h2"
  textAlign="center"
  color="var(--kiln-primary)"
  margin="0 0 var(--kiln-space-8)"
>
  Why Kiln?
</Box>

// Metadata / helper text as a block element
<Box variant="small" display="block" margin="var(--kiln-space-2) 0 0">
  Last updated 2026-05-04
</Box>

// Pre-formatted code block with custom background
<Box
  variant="pre"
  style={{ '--kiln-box-code-bg': 'var(--kiln-gray-900)', '--kiln-box-code-color': 'var(--kiln-gray-50)' } as React.CSSProperties}
>
  {'$ npm run build'}
</Box>

// Float a label left of its sibling
<Box variant="strong" float="left" margin="0 var(--kiln-space-2) 0 0">
  Note:
</Box>
<Box variant="p" margin="0">The float prop controls the CSS float property.</Box>`,
};
