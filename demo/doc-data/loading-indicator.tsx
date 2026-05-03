import React from 'react';
import { LoadingIndicator } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const LoadingIndicatorPreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
    <LoadingIndicator />
    <LoadingIndicator message="Loading projects…" />
    <LoadingIndicator inline message="Fetching…" />
  </div>
);

export const loadingIndicator: ComponentDoc = {
  id: 'loading-indicator',
  name: 'LoadingIndicator',
  description: 'GPU-accelerated spinner for async operation feedback with full-screen and inline modes.',
  preview: LoadingIndicatorPreview,
  code: `import { LoadingIndicator } from '@doriansmith/kiln';

<LoadingIndicator />
<LoadingIndicator message="Loading projects…" />
<LoadingIndicator inline message="Fetching…" />
<LoadingIndicator fullScreen message="Loading workspace…" />`,
  props: [
    { name: 'message', type: 'string', default: "'Loading...'", required: false, description: 'Accessible status message shown below the spinner' },
    { name: 'fullScreen', type: 'boolean', default: 'false', required: false, description: 'Centers the spinner over the full viewport' },
    { name: 'inline', type: 'boolean', default: 'false', required: false, description: 'Renders the spinner inline for use within text/buttons' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from '@doriansmith/kiln';

it('has role=status', () => {
  render(<LoadingIndicator />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

it('shows message text', () => {
  render(<LoadingIndicator message="Saving…" />);
  expect(screen.getByText('Saving…')).toBeInTheDocument();
});`,
  usage: `// Full-page loading gate
{loading && <LoadingIndicator fullScreen message="Loading workspace…" />}

// Inline content area
<div aria-busy={loading}>
  {loading ? <LoadingIndicator message="Fetching projects…" /> : <ProjectList />}
</div>

// Button loading — prefer Button's built-in loading prop
<Button loading>Saving…</Button>`,
};
