import React, { useState } from 'react';
import { ToolsPanel } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ToolsPanelPreview: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: 'flex', height: 320, border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', position: 'relative', width: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--kiln-space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
        Main content area
      </div>
      <ToolsPanel
        header="Help"
        open={open}
        onOpenChange={setOpen}
        hideFab
        style={{ '--kiln-tools-panel-width': '200px' } as React.CSSProperties}
      >
        <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
          This panel provides contextual help and tools for the current view. Close it with the × button or by pressing Escape.
        </p>
      </ToolsPanel>
    </div>
  );
};

export const toolsPanel: ComponentDoc = {
  id: 'tools-panel',
  name: 'ToolsPanel',
  description: 'Collapsible right-side panel for help, context, or tools — with a header, close button, mobile drawer, and FAB toggle.',
  preview: ToolsPanelPreview,
  code: `import { ToolsPanel } from '@doriansmith/kiln';

const [open, setOpen] = useState(true);

<ToolsPanel
  header="Help"
  open={open}
  onOpenChange={setOpen}
  hideFab
  style={{ '--kiln-tools-panel-width': '200px' } as React.CSSProperties}
>
  <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
    This panel provides contextual help and tools for the current view. Close it with the × button or by pressing Escape.
  </p>
</ToolsPanel>`,
  props: [
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Panel content.' },
    { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Header title rendered next to the tools icon.' },
    { name: 'open', type: 'boolean', default: '—', required: false, description: 'Controlled open state.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when open state should change.' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', required: false, description: 'Initial open state (uncontrolled).' },
    { name: 'label', type: 'string', default: "'Tools panel'", required: false, description: 'aria-label for the aside landmark.' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-tools-panel-width etc.' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { ToolsPanel } from '@doriansmith/kiln';

it('renders children when open', () => {
  render(<ToolsPanel open={true}><p>Help text</p></ToolsPanel>);
  expect(screen.getByText('Help text')).toBeInTheDocument();
});

it('calls onOpenChange(false) when close button clicked', () => {
  const fn = vi.fn();
  render(<ToolsPanel open={true} onOpenChange={fn}>content</ToolsPanel>);
  fireEvent.click(screen.getByRole('button', { name: /close tools panel/i }));
  expect(fn).toHaveBeenCalledWith(false);
});

it('calls onOpenChange(true) when FAB clicked while closed', () => {
  const fn = vi.fn();
  render(<ToolsPanel open={false} onOpenChange={fn}>content</ToolsPanel>);
  fireEvent.click(screen.getByRole('button', { name: /open tools panel/i }));
  expect(fn).toHaveBeenCalledWith(true);
});

it('closes on Escape key', async () => {
  const fn = vi.fn();
  render(<ToolsPanel open={true} onOpenChange={fn}>content</ToolsPanel>);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(fn).toHaveBeenCalledWith(false);
});`,
  usage: `// Standalone help panel
<div style={{ display: 'flex' }}>
  <main style={{ flex: 1 }}><Content /></main>
  <ToolsPanel
    header="Context"
    defaultOpen
    style={{ '--kiln-tools-panel-width': '300px' } as React.CSSProperties}
  >
    <HelpArticle />
  </ToolsPanel>
</div>

// Inside AppLayout
<AppLayout
  toolsPanel={<HelpContent />}
  toolsPanelHeader="Help"
  toolsOpen={toolsOpen}
  onToolsChange={setToolsOpen}
>
  <MainPage />
</AppLayout>

// Wider panel with custom token
<ToolsPanel
  header="Inspector"
  style={{ '--kiln-tools-panel-width': '360px' } as React.CSSProperties}
>
  <PropertiesInspector />
</ToolsPanel>`,
};
