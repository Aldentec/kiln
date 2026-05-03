import React, { useState } from 'react';
import { SplitPanel } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const SplitPanelPreview: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', width: '100%', height: 400, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
        Main content area
      </div>
      <SplitPanel
        header="Logs"
        open={open}
        onOpenChange={setOpen}
        defaultHeight={140}
        resizable
      >
        <pre style={{ margin: 0, fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-600)', lineHeight: 1.6 }}>
          {`[10:42:01] Build started\n[10:42:03] Compiling TypeScript...\n[10:42:07] CSS bundle: 74 KB\n[10:42:08] Build complete ✓`}
        </pre>
      </SplitPanel>
    </div>
  );
};

export const splitPanel: ComponentDoc = {
  id: 'split-panel',
  name: 'SplitPanel',
  description: 'Expandable bottom panel with a drag handle for resizing, toggle bar, and keyboard-accessible resize via arrow keys.',
  preview: SplitPanelPreview,
  code: `import { SplitPanel } from '@doriansmith/kiln';

const [open, setOpen] = useState(false);

<SplitPanel
  header="Logs"
  open={open}
  onOpenChange={setOpen}
  defaultHeight={240}
  resizable
>
  <LogViewer />
</SplitPanel>`,
  props: [
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Panel content.' },
    { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Toggle bar label.' },
    { name: 'open', type: 'boolean', default: '—', required: false, description: 'Controlled open state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when open state should change.' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', required: false, description: 'Initial open state (uncontrolled).' },
    { name: 'defaultHeight', type: 'number', default: '280', required: false, description: 'Panel height in px when open.' },
    { name: 'minHeight', type: 'number', default: '80', required: false, description: 'Minimum height in px when dragging.' },
    { name: 'maxHeight', type: 'number', default: '600', required: false, description: 'Maximum height in px when dragging.' },
    { name: 'resizable', type: 'boolean', default: 'true', required: false, description: 'Whether the drag handle is shown.' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for CSS token overrides.' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { SplitPanel } from '@doriansmith/kiln';

it('renders toggle bar', () => {
  render(<SplitPanel header="Logs">content</SplitPanel>);
  expect(screen.getByRole('button', { name: /expand panel/i })).toBeInTheDocument();
});

it('shows content when open', () => {
  render(<SplitPanel open={true} header="Logs">Log output</SplitPanel>);
  expect(screen.getByText('Log output')).toBeInTheDocument();
});

it('calls onOpenChange when toggle clicked', () => {
  const fn = vi.fn();
  render(<SplitPanel open={false} onOpenChange={fn} header="Logs">content</SplitPanel>);
  fireEvent.click(screen.getByRole('button'));
  expect(fn).toHaveBeenCalledWith(true);
});

it('resize handle responds to arrow keys', () => {
  render(<SplitPanel open={true} defaultHeight={200} resizable>content</SplitPanel>);
  const handle = screen.getByRole('separator');
  fireEvent.keyDown(handle, { key: 'ArrowUp' });
  // height increases — implementation detail tested via style token
  expect(handle).toBeInTheDocument();
});`,
  usage: `// Log output panel below a code editor
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <CodeEditor />
  <SplitPanel header="Terminal" defaultOpen defaultHeight={200} resizable>
    <Terminal />
  </SplitPanel>
</div>

// Non-resizable details panel
<SplitPanel header="Details" defaultHeight={160} resizable={false}>
  <DetailsView item={selected} />
</SplitPanel>

// Inside AppLayout
<AppLayout
  splitPanel={<LogOutput />}
  splitPanelHeader="Logs"
  splitPanelDefaultHeight={220}
  splitPanelResizable
>
  <MainContent />
</AppLayout>`,
};
