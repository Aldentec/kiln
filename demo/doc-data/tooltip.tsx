import React from 'react';
import { Tooltip, Button } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const TooltipPreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Tooltip content="Appears above" side="top"><Button variant="ghost" size="sm">Top</Button></Tooltip>
    <Tooltip content="Appears below" side="bottom"><Button variant="ghost" size="sm">Bottom</Button></Tooltip>
    <Tooltip content="Appears to the left" side="left"><Button variant="ghost" size="sm">Left</Button></Tooltip>
    <Tooltip content="Appears to the right" side="right"><Button variant="ghost" size="sm">Right</Button></Tooltip>
  </div>
);

export const tooltip: ComponentDoc = {
  id: 'tooltip',
  name: 'Tooltip',
  description: 'Contextual popup label that attaches to any interactive element via hover or focus.',
  preview: TooltipPreview,
  code: `import { Tooltip, Button } from '@doriansmith/kiln';

<Tooltip content="Appears above" side="top">
  <Button variant="ghost" size="sm">Top</Button>
</Tooltip>

<Tooltip content="Appears below" side="bottom">
  <Button variant="ghost" size="sm">Bottom</Button>
</Tooltip>

<Tooltip content="Appears to the left" side="left">
  <Button variant="ghost" size="sm">Left</Button>
</Tooltip>

<Tooltip content="Appears to the right" side="right">
  <Button variant="ghost" size="sm">Right</Button>
</Tooltip>`,
  props: [
    { name: 'content', type: 'React.ReactNode', default: '—', required: true, description: 'Tooltip text or content' },
    { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", required: false, description: 'Preferred placement relative to the trigger' },
    { name: 'delayMs', type: 'number', default: '200', required: false, description: 'Hover delay before tooltip shows (ms)' },
    { name: 'children', type: 'React.ReactElement', default: '—', required: true, description: 'Trigger element (must accept ref + aria attributes)' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the tooltip bubble' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip, Button } from '@doriansmith/kiln';

it('shows tooltip on hover', async () => {
  render(
    <Tooltip content="Hello" delayMs={0}>
      <Button>Trigger</Button>
    </Tooltip>
  );
  await userEvent.hover(screen.getByRole('button'));
  expect(await screen.findByRole('tooltip')).toBeInTheDocument();
});

it('hides tooltip when mouse leaves', async () => {
  render(
    <Tooltip content="Hello" delayMs={0}>
      <Button>Trigger</Button>
    </Tooltip>
  );
  await userEvent.hover(screen.getByRole('button'));
  await userEvent.unhover(screen.getByRole('button'));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});`,
  usage: `// Icon button — always add a tooltip when the label is icon-only
<Tooltip content="Settings" side="bottom">
  <Button variant="ghost" aria-label="Settings">⚙️</Button>
</Tooltip>

// Keyboard shortcut hint
<Tooltip content="Save (⌘S)" delayMs={400}>
  <Button variant="primary" onClick={save}>Save</Button>
</Tooltip>

// Explanatory tooltip on a disabled field
<Tooltip content="Requires admin access">
  <span> {/* wrapper needed when child is disabled */}
    <Input label="API key" disabled />
  </span>
</Tooltip>`,
};
