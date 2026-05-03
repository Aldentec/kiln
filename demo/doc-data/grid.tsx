import React from 'react';
import { Grid, GridItem, Card } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const GridPreview: React.FC = () => {
  const labelStyle: React.CSSProperties = {
    margin: '0 0 var(--kiln-space-2)',
    fontSize: 'var(--kiln-text-xs)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--kiln-gray-500)',
  };
  const Cell = ({ label }: { label: string }) => (
    <Card variant="raised" style={{ '--kiln-card-padding': 'var(--kiln-space-4)' } as React.CSSProperties}>
      <span style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-600)' }}>{label}</span>
    </Card>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-8)', width: '100%' }}>
      <div>
        <p style={labelStyle}>Fixed cols — 4 cols at desktop, 2 at tablet, 1 on mobile</p>
        <Grid cols={4} gap="md">
          <Cell label="One" />
          <Cell label="Two" />
          <Cell label="Three" />
          <Cell label="Four" />
        </Grid>
      </div>
      <div>
        <p style={labelStyle}>Auto-fit — browser decides columns based on container width</p>
        <Grid minColWidth={260} gap="md">
          {['Item 1', 'Item 2', 'Item 3'].map((l) => <Cell key={l} label={l} />)}
        </Grid>
      </div>
      <div>
        <p style={labelStyle}>GridItem — span multiple columns or rows</p>
        <Grid cols={3} gap="md">
          <GridItem colSpan={2}><Cell label="Wide card" /></GridItem>
          <Cell label="Narrow" />
        </Grid>
      </div>
      <div>
        <p style={labelStyle}>Dense packing — mixed-height items fill gaps (masonry-style)</p>
        <Grid cols={4} gap="sm" dense>
          {[
            { label: 'A', rows: 2 },
            { label: 'B', rows: 1 },
            { label: 'C', rows: 1 },
            { label: 'D', rows: 2 },
            { label: 'E', rows: 1 },
            { label: 'F', rows: 1 },
          ].map(({ label, rows }) => (
            <GridItem key={label} rowSpan={rows as 1 | 2}>
              <Card variant="raised" style={{ '--kiln-card-padding': 'var(--kiln-space-4)', height: '100%' } as React.CSSProperties}>
                <span style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-600)' }}>{label}</span>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export const grid: ComponentDoc = {
  id: 'grid',
  name: 'Grid',
  description: 'Responsive CSS grid wrapper with fixed-column and container-aware auto-fit modes. Works inside any layout — no viewport breakpoint config needed.',
  preview: GridPreview,
  code: `import { Grid, GridItem } from '@doriansmith/kiln';

// Fixed cols: 4 at desktop → 2 at tablet → 1 on mobile
<Grid cols={4} gap="md">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
  <Card>Four</Card>
</Grid>

// Auto-fit: browser decides columns based on container width.
// Works inside modals, sidebars, or any nested layout automatically.
<Grid minColWidth={260} gap="md">
  {items.map((item) => <Card key={item.id}>{item.name}</Card>)}
</Grid>

// GridItem: span multiple columns or rows
<Grid cols={3} gap="md">
  <GridItem colSpan={2}><Card>Wide card</Card></GridItem>
  <Card>Narrow</Card>
</Grid>

// Dense packing for mixed-height items (masonry-style)
<Grid cols={4} gap="sm" dense>
  {photos.map((p) => <img key={p.id} src={p.src} alt={p.alt} />)}
</Grid>`,
  props: [
    { name: 'Grid.cols', type: '1 | 2 | 3 | 4', default: '1', required: false, description: 'Fixed columns at desktop. Collapses automatically: 4→2 at tablet, →1 on mobile. Ignored when minColWidth is set.' },
    { name: 'Grid.minColWidth', type: 'number', default: '', required: false, description: 'Auto-fit mode: items stay at least this many pixels wide; the browser calculates the column count from the container width. Mutually exclusive with cols.' },
    { name: 'Grid.dense', type: 'boolean', default: 'false', required: false, description: 'Fill gaps densely when items vary in size (grid-auto-flow: dense). Useful for image galleries.' },
    { name: 'Grid.gap', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", required: false, description: 'Gap between cells. Override with --kiln-grid-gap on the element.' },
    { name: 'Grid.className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'Grid.style', type: 'React.CSSProperties', default: '', required: false, description: 'Inline styles — use for --kiln-grid-gap token override' },
    { name: 'Grid.children', type: 'React.ReactNode', default: '', required: true, description: 'Grid cells — any elements, or GridItem for spanning' },
    { name: 'GridItem.colSpan', type: '1 | 2 | 3 | 4', default: '', required: false, description: 'Columns to span at desktop. Caps to 2 at tablet, resets to 1 on mobile.' },
    { name: 'GridItem.rowSpan', type: '1 | 2 | 3 | 4', default: '', required: false, description: 'Rows to span at all breakpoints.' },
    { name: 'GridItem.className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'GridItem.children', type: 'React.ReactNode', default: '', required: true, description: 'Cell content' },
  ],
  testing: `import { render } from '@testing-library/react';
import { Grid, GridItem } from '@doriansmith/kiln';

it('sets data-cols attribute', () => {
  const { container } = render(<Grid cols={4}><div /></Grid>);
  expect(container.firstChild).toHaveAttribute('data-cols', '4');
});

it('auto-fit mode omits data-cols and sets --kiln-grid-min-col-width', () => {
  const { container } = render(<Grid minColWidth={260}><div /></Grid>);
  const grid = container.firstChild as HTMLElement;
  expect(grid).not.toHaveAttribute('data-cols');
  expect(grid.style.getPropertyValue('--kiln-grid-min-col-width')).toBe('260px');
});

it('dense mode adds kiln-grid--dense class', () => {
  const { container } = render(<Grid dense><div /></Grid>);
  expect(container.firstChild).toHaveClass('kiln-grid--dense');
});

it('GridItem sets data-col-span', () => {
  const { container } = render(<GridItem colSpan={2}><div /></GridItem>);
  expect(container.firstChild).toHaveAttribute('data-col-span', '2');
});`,
  usage: `// Feature grid on a landing page (what you see in the Kiln hero)
<Grid cols={4} gap="lg">
  {PILLARS.map(({ icon, title, description }) => (
    <Card key={title} variant="raised">
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  ))}
</Grid>

// Dashboard metrics row
<Grid cols={4} gap="md">
  <GridItem colSpan={2}>
    <Card variant="raised"><RevenueChart /></Card>
  </GridItem>
  <MetricCard label="MRR" value="$24k" />
  <MetricCard label="Churn" value="1.2%" />
</Grid>

// Auto-fit image gallery with dense packing
<Grid minColWidth={200} gap="sm" dense>
  {photos.map((p) => (
    <img key={p.id} src={p.src} alt={p.alt} style={{ width: '100%', borderRadius: 'var(--kiln-radius-md)' }} />
  ))}
</Grid>

// Override gap with CSS token
<Grid cols={3} style={{ '--kiln-grid-gap': '2rem' } as React.CSSProperties}>
  {cards}
</Grid>`,
};
