import React from 'react';
import { TableOfContents } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const TableOfContentsPreview: React.FC = () => (
  <TableOfContents
    items={[
      { id: 'install', label: 'Installation', level: 1 },
      { id: 'usage', label: 'Basic usage', level: 2 },
      { id: 'variants', label: 'Variants', level: 2 },
      { id: 'props', label: 'Props', level: 1 },
      { id: 'dark', label: 'Dark mode', level: 1 },
    ]}
    heading="On this page"
  />
);

export const tableOfContents: ComponentDoc = {
  id: 'table-of-contents',
  name: 'TableOfContents',
  description: 'Sticky in-page navigation with IntersectionObserver-based active section tracking.',
  preview: TableOfContentsPreview,
  code: `import { TableOfContents } from '@doriansmith/kiln';

const items = [
  { id: 'install',  label: 'Installation', level: 1 },
  { id: 'usage',    label: 'Basic usage',  level: 2 },
  { id: 'variants', label: 'Variants',     level: 2 },
  { id: 'props',    label: 'Props',        level: 1 },
  { id: 'dark',     label: 'Dark mode',    level: 1 },
];

<TableOfContents items={items} heading="On this page" />`,
  props: [
    { name: 'items', type: 'TocItem[]', default: '—', required: true, description: 'Array of { id, label, level? } — id must match an element on the page' },
    { name: 'offsetTop', type: 'number', default: '0', required: false, description: 'Scroll offset in px (set to sticky nav height)' },
    { name: 'heading', type: 'string', default: "'On this page'", required: false, description: 'Heading text above the list' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-toc-* token overrides' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { TableOfContents } from '@doriansmith/kiln';

const items = [
  { id: 'a', label: 'Section A' },
  { id: 'b', label: 'Section B', level: 2 as const },
];

it('renders all items', () => {
  render(<TableOfContents items={items} />);
  expect(screen.getByText('Section A')).toBeInTheDocument();
  expect(screen.getByText('Section B')).toBeInTheDocument();
});

it('renders heading', () => {
  render(<TableOfContents items={items} heading="Contents" />);
  expect(screen.getByText('Contents')).toBeInTheDocument();
});`,
  usage: `// Docs layout — sidebar TOC
<div style={{ display: 'flex', gap: '4rem' }}>
  <article style={{ flex: 1 }}>
    <h2 id="intro">Introduction</h2>
    <h2 id="install">Installation</h2>
  </article>
  <aside>
    <TableOfContents
      items={[
        { id: 'intro', label: 'Introduction' },
        { id: 'install', label: 'Installation' },
      ]}
      offsetTop={64}
    />
  </aside>
</div>`,
};
