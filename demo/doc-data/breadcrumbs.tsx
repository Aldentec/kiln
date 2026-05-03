import React from 'react';
import { Breadcrumbs } from '@doriansmith/kiln';
import type { BreadcrumbItem } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const BreadcrumbsPreview: React.FC = () => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Kiln' },
  ];
  return <Breadcrumbs items={items} />;
};

export const breadcrumbs: ComponentDoc = {
  id: 'breadcrumbs',
  name: 'Breadcrumbs',
  description: "Sleek, animated navigation trail with GPU-accelerated micro-interactions, pill-style current page indicator, and progressive disclosure on mobile.",
  preview: BreadcrumbsPreview,
  code: `import { Breadcrumbs } from '@doriansmith/kiln';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Kiln' },
  ]}
/>`,
  props: [
    { name: 'items', type: 'BreadcrumbItem[]', default: '—', required: true, description: 'Array of breadcrumb items. Last item is the current page (no link rendered, shown as a pill).' },
    { name: 'separator', type: 'React.ReactNode', default: 'animated chevron SVG', required: false, description: 'Custom separator between items.' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for CSS token overrides.' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '@doriansmith/kiln';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Dashboard' },
];

it('renders all labels', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

it('marks last item as current page', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByText('Dashboard')).toHaveAttribute('aria-current', 'page');
});

it('does not render a link for the last item', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
});

it('renders links for non-last items', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
});

it('adds title attribute to current page for truncation tooltip', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByText('Dashboard')).toHaveAttribute('title', 'Dashboard');
});`,
  usage: `// Basic usage
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
]} />

// With custom separator
<Breadcrumbs
  items={crumbs}
  separator={<span aria-hidden="true">›</span>}
/>

// With click handlers (for SPA navigation)
<Breadcrumbs
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Projects', onClick: () => navigate('/projects') },
    { label: 'Kiln' },
  ]}
/>

// Custom font size via token
<Breadcrumbs
  items={crumbs}
  style={{ '--kiln-breadcrumbs-font-size': 'var(--kiln-text-xs)' } as React.CSSProperties}
/>

// Custom colors via tokens
<Breadcrumbs
  items={crumbs}
  style={{
    '--kiln-breadcrumbs-link-color': 'var(--kiln-accent)',
    '--kiln-breadcrumbs-current-bg': 'var(--kiln-accent-50)',
  } as React.CSSProperties}
/>`,
};
