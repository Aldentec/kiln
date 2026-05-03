import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Grid from './Grid';
import GridItem from './GridItem';

// ── Grid ────────────────────────────────────────────────────

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid><div>item</div></Grid>);
    expect(screen.getByText('item')).toBeInTheDocument();
  });

  it('applies default data attributes', () => {
    const { container } = render(<Grid><div /></Grid>);
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveAttribute('data-cols', '1');
    expect(grid).toHaveAttribute('data-gap', 'md');
  });

  it('applies cols prop as data attribute', () => {
    const { container } = render(<Grid cols={4}><div /></Grid>);
    expect(container.firstChild).toHaveAttribute('data-cols', '4');
  });

  it('applies gap prop as data attribute', () => {
    const { container } = render(<Grid gap="lg"><div /></Grid>);
    expect(container.firstChild).toHaveAttribute('data-gap', 'lg');
  });

  it('auto-fit mode: omits data-cols and sets --kiln-grid-min-col-width', () => {
    const { container } = render(<Grid minColWidth={260}><div /></Grid>);
    const grid = container.firstChild as HTMLElement;
    expect(grid).not.toHaveAttribute('data-cols');
    expect(grid.style.getPropertyValue('--kiln-grid-min-col-width')).toBe('260px');
  });

  it('dense mode adds kiln-grid--dense class', () => {
    const { container } = render(<Grid dense><div /></Grid>);
    expect(container.firstChild).toHaveClass('kiln-grid--dense');
  });

  it('dense is false by default', () => {
    const { container } = render(<Grid><div /></Grid>);
    expect(container.firstChild).not.toHaveClass('kiln-grid--dense');
  });

  it('merges className', () => {
    const { container } = render(<Grid className="custom"><div /></Grid>);
    expect(container.firstChild).toHaveClass('kiln-grid', 'custom');
  });

  it('forwards style prop in fixed-cols mode', () => {
    const { container } = render(
      <Grid style={{ color: 'red' }}><div /></Grid>,
    );
    expect((container.firstChild as HTMLElement).style.color).toBe('red');
  });

  it('merges style with min-col-width in auto-fit mode', () => {
    const { container } = render(
      <Grid minColWidth={200} style={{ color: 'blue' }}><div /></Grid>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--kiln-grid-min-col-width')).toBe('200px');
    expect(el.style.color).toBe('blue');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref}><div /></Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// ── GridItem ─────────────────────────────────────────────────

describe('GridItem', () => {
  it('renders children', () => {
    render(<GridItem>content</GridItem>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies kiln-grid-item class', () => {
    const { container } = render(<GridItem><div /></GridItem>);
    expect(container.firstChild).toHaveClass('kiln-grid-item');
  });

  it('sets data-col-span', () => {
    const { container } = render(<GridItem colSpan={2}><div /></GridItem>);
    expect(container.firstChild).toHaveAttribute('data-col-span', '2');
  });

  it('sets data-row-span', () => {
    const { container } = render(<GridItem rowSpan={3}><div /></GridItem>);
    expect(container.firstChild).toHaveAttribute('data-row-span', '3');
  });

  it('omits span attributes when not provided', () => {
    const { container } = render(<GridItem><div /></GridItem>);
    const el = container.firstChild as HTMLElement;
    expect(el).not.toHaveAttribute('data-col-span');
    expect(el).not.toHaveAttribute('data-row-span');
  });

  it('merges className', () => {
    const { container } = render(<GridItem className="wide"><div /></GridItem>);
    expect(container.firstChild).toHaveClass('kiln-grid-item', 'wide');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<GridItem ref={ref}><div /></GridItem>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
