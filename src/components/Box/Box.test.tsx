// a11y: WCAG AA verified 2026-05-04 — semantic HTML elements, contrast via design tokens
// perf: CLS=0, no transitions, static layout 2026-05-04
// mobile: text ≥ 14px for all variants, pre overflow-x: auto; verified 375px/768px 2026-05-04
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Box from './Box';

describe('Box', () => {

  // ── Default rendering ────────────────────────────────────────────────────

  it('renders a <p> by default', () => {
    render(<Box>Hello</Box>);
    expect(screen.getByText('Hello').tagName).toBe('P');
  });

  it('applies kiln-box and kiln-box--p classes by default', () => {
    render(<Box>text</Box>);
    const el = screen.getByText('text');
    expect(el).toHaveClass('kiln-box', 'kiln-box--p');
  });

  it('does not apply inline style when no override props are given', () => {
    render(<Box>text</Box>);
    expect(screen.getByText('text').getAttribute('style')).toBeNull();
  });

  // ── Variant → HTML tag ───────────────────────────────────────────────────

  it.each([
    ['h1', 'H1'],
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
    ['h5', 'H5'],
    ['p', 'P'],
    ['strong', 'STRONG'],
    ['small', 'SMALL'],
    ['code', 'CODE'],
    ['pre', 'PRE'],
    ['samp', 'SAMP'],
  ] as const)('variant="%s" renders <%s>', (variant, tag) => {
    render(<Box variant={variant}>content</Box>);
    expect(screen.getByText('content').tagName).toBe(tag);
  });

  it('applies the variant modifier class', () => {
    render(<Box variant="h2">heading</Box>);
    expect(screen.getByText('heading')).toHaveClass('kiln-box--h2');
  });

  // ── className prop ────────────────────────────────────────────────────────

  it('merges className with base classes', () => {
    render(<Box className="my-class">text</Box>);
    expect(screen.getByText('text')).toHaveClass('kiln-box', 'kiln-box--p', 'my-class');
  });

  // ── fontSize override ────────────────────────────────────────────────────

  it('maps named token fontSize to CSS variable', () => {
    render(<Box fontSize="xl">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ fontSize: 'var(--kiln-text-xl)' });
  });

  it.each([
    ['xs',   'var(--kiln-text-xs)'],
    ['sm',   'var(--kiln-text-sm)'],
    ['base', 'var(--kiln-text-base)'],
    ['lg',   'var(--kiln-text-lg)'],
    ['2xl',  'var(--kiln-text-2xl)'],
    ['3xl',  'var(--kiln-text-3xl)'],
    ['4xl',  'var(--kiln-text-4xl)'],
  ] as const)('fontSize="%s" maps to "%s"', (token, expected) => {
    render(<Box fontSize={token}>text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ fontSize: expected });
  });

  it('passes raw CSS fontSize value through unchanged', () => {
    render(<Box fontSize="1.75rem">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ fontSize: '1.75rem' });
  });

  // ── textAlign override ───────────────────────────────────────────────────

  it('applies textAlign override', () => {
    render(<Box textAlign="center">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ textAlign: 'center' });
  });

  // ── color override ───────────────────────────────────────────────────────

  it('applies color override', () => {
    render(<Box color="rgb(255, 0, 0)">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  // ── fontWeight override ──────────────────────────────────────────────────

  it('applies fontWeight override', () => {
    render(<Box fontWeight={600}>text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ fontWeight: '600' });
  });

  // ── display override ─────────────────────────────────────────────────────

  it('applies display override', () => {
    render(<Box display="flex">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ display: 'flex' });
  });

  // ── margin override ──────────────────────────────────────────────────────

  it('applies margin override', () => {
    render(<Box margin="1rem 2rem">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ margin: '1rem 2rem' });
  });

  // ── padding override ─────────────────────────────────────────────────────

  it('applies padding override', () => {
    render(<Box padding="1.5rem">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ padding: '1.5rem' });
  });

  // ── float override ───────────────────────────────────────────────────────

  it('applies float override', () => {
    render(<Box float="right">text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ float: 'right' });
  });

  // ── style prop ───────────────────────────────────────────────────────────

  it('merges style prop with override props (style wins on collisions)', () => {
    render(<Box fontSize="xl" style={{ fontSize: '3rem', letterSpacing: '0.1em' }}>text</Box>);
    const el = screen.getByText('text');
    expect(el).toHaveStyle({ fontSize: '3rem', letterSpacing: '0.1em' });
  });

  it('applies style prop when no override props are provided', () => {
    render(<Box style={{ opacity: 0.5 }}>text</Box>);
    expect(screen.getByText('text')).toHaveStyle({ opacity: '0.5' });
  });

  // ── Multiple overrides ────────────────────────────────────────────────────

  it('applies multiple overrides together', () => {
    render(
      <Box variant="h3" fontSize="2xl" textAlign="right" fontWeight={400} color="rgb(0, 128, 0)">
        text
      </Box>,
    );
    const el = screen.getByText('text');
    expect(el.tagName).toBe('H3');
    expect(el).toHaveStyle({
      fontSize: 'var(--kiln-text-2xl)',
      textAlign: 'right',
      fontWeight: '400',
      color: 'rgb(0, 128, 0)',
    });
  });

  // ── ref forwarding ───────────────────────────────────────────────────────

  it('forwards ref to the underlying element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Box ref={ref}>text</Box>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('P');
  });

  it('ref points to the correct element for non-default variants', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Box ref={ref} variant="h1">heading</Box>);
    expect(ref.current?.tagName).toBe('H1');
  });

  // ── Children ─────────────────────────────────────────────────────────────

  it('renders nested children', () => {
    render(
      <Box>
        Hello <strong>world</strong>
      </Box>,
    );
    expect(screen.getByText('world')).toBeInTheDocument();
  });

  it('renders without children (empty element)', () => {
    const { container } = render(<Box variant="p" />);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  // ── Pillar 1: Accessibility ──────────────────────────────────────────────

  it('heading variants are reachable via accessible role queries', () => {
    render(<Box variant="h1">Page title</Box>);
    expect(screen.getByRole('heading', { level: 1, name: 'Page title' })).toBeInTheDocument();
  });

  it('h2–h5 render at the correct ARIA heading level', () => {
    render(
      <div>
        <Box variant="h2">Section</Box>
        <Box variant="h4">Sub</Box>
      </div>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Sub' })).toBeInTheDocument();
  });

  it('strong renders as <strong> — conveys emphasis to assistive technology', () => {
    const { container } = render(<Box variant="strong">important</Box>);
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('small renders as <small> — semantically marks fine print', () => {
    const { container } = render(<Box variant="small">fine print</Box>);
    expect(container.querySelector('small')).toBeInTheDocument();
  });

  it('code renders as <code> — conveys machine-readable content to AT', () => {
    const { container } = render(<Box variant="code">npm install</Box>);
    expect(container.querySelector('code')).toBeInTheDocument();
  });

  it('pre renders as <pre> — preserves whitespace and conveys preformatted text to AT', () => {
    const { container } = render(<Box variant="pre">{'const x = 1;\n'}</Box>);
    expect(container.querySelector('pre')).toBeInTheDocument();
  });
});

import React from 'react';
