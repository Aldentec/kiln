import React from 'react';
import { Badge } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const BadgePreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="pending">Pending</Badge>
    <Badge variant="critical">Critical</Badge>
  </div>
);

export const badge: ComponentDoc = {
  id: 'badge',
  name: 'Badge',
  description: 'Compact status labels for communicating severity, state, or category at a glance.',
  preview: BadgePreview,
  code: `import { Badge } from '@doriansmith/kiln';

<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="pending">Pending</Badge>
<Badge variant="critical">Critical</Badge>`,
  props: [
    { name: 'variant', type: "'neutral' | 'success' | 'warning' | 'error' | 'info' | 'pending' | 'running' | 'critical' | 'high' | 'medium' | 'low'", default: "'neutral'", required: false, description: 'Visual severity or status variant' },
    { name: 'size', type: "'sm' | 'md'", default: "'md'", required: false, description: 'Badge size' },
    { name: 'aria-label', type: 'string', default: '—', required: false, description: 'Custom accessible label (overrides auto-prefix)' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Badge label' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Badge } from '@doriansmith/kiln';

it('renders children', () => {
  render(<Badge>Active</Badge>);
  expect(screen.getByText('Active')).toBeInTheDocument();
});

it('applies variant class', () => {
  const { container } = render(<Badge variant="success">Active</Badge>);
  expect(container.firstChild).toHaveClass('kiln-badge--success');
});

it('prepends hidden variant label for colour-blind accessibility', () => {
  render(<Badge variant="error">Degraded</Badge>);
  expect(screen.getByText('error:')).toHaveClass('kiln-sr-only');
});`,
  usage: `// Status column in a table
<td>
  <Badge variant={row.healthy ? 'success' : 'error'}>
    {row.status}
  </Badge>
</td>

// Severity indicator in a log list
<Badge variant={entry.severity} size="sm">
  {entry.severity}
</Badge>

// Custom accessible label when context makes variant obvious
<Badge variant="critical" aria-label="Severity: critical">
  P0
</Badge>`,
};
