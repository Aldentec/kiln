import React from 'react';
import { CopyToClipboard, Button, Badge, CodeBlock } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

// ─── Preview ──────────────────────────────────────────────────────────────────
// The `code` string below is the literal source for this preview.
// Keep the two in sync whenever the preview changes.

const CopyToClipboardPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>

    {/* 1. All four placements */}
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <CopyToClipboard key={p} value={`placement="${p}"`} placement={p}>
          <Button variant="secondary" size="sm">{p}</Button>
        </CopyToClipboard>
      ))}
    </div>

    {/* 2. Wrap a CodeBlock — clicking anywhere on it copies the code */}
    <div style={{ width: '100%', maxWidth: 480 }}>
      <CopyToClipboard
        value="import { Button } from '@doriansmith/kiln';"
        placement="top"
        successMessage="Import copied!"
      >
        <CodeBlock
          language="tsx"
          code="import { Button } from '@doriansmith/kiln';"
          showCopy={false}
        />
      </CopyToClipboard>
    </div>

    {/* 3. Wrap any element — Badges copy their label on click */}
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {['v0.7.1', 'MIT', 'TypeScript'].map((label) => (
        <CopyToClipboard key={label} value={label} placement="top">
          <Badge variant="neutral" style={{ cursor: 'pointer' }}>{label}</Badge>
        </CopyToClipboard>
      ))}
    </div>

  </div>
);

export const copyToClipboard: ComponentDoc = {
  id: 'copy-to-clipboard',
  name: 'CopyToClipboard',
  description: 'Zero-intrusion wrapper that copies a value to the clipboard on click and shows a contextual confirmation tooltip immediately adjacent to the trigger.',
  preview: CopyToClipboardPreview,

  // ── Matches the preview above exactly ──────────────────────────────────────
  code: `import { CopyToClipboard, Button, Badge, CodeBlock } from '@doriansmith/kiln';

// 1. All four placements
<div style={{ display: 'flex', gap: 12 }}>
  {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
    <CopyToClipboard key={p} value={\`placement="\${p}"\`} placement={p}>
      <Button variant="secondary" size="sm">{p}</Button>
    </CopyToClipboard>
  ))}
</div>

// 2. Wrap a CodeBlock — clicking anywhere on it copies the code
<CopyToClipboard
  value="import { Button } from '@doriansmith/kiln';"
  placement="top"
  successMessage="Import copied!"
>
  <CodeBlock
    language="tsx"
    code="import { Button } from '@doriansmith/kiln';"
    showCopy={false}
  />
</CopyToClipboard>

// 3. Wrap any element — Badges copy their label on click
<div style={{ display: 'flex', gap: 8 }}>
  {['v0.7.1', 'MIT', 'TypeScript'].map((label) => (
    <CopyToClipboard key={label} value={label} placement="top">
      <Badge variant="neutral" style={{ cursor: 'pointer' }}>{label}</Badge>
    </CopyToClipboard>
  ))}
</div>`,

  props: [
    { name: 'value',          type: 'string',                                default: '—',                required: true,  description: 'The string written to the clipboard when the child is clicked.' },
    { name: 'children',       type: 'React.ReactNode',                       default: '—',                required: true,  description: 'Trigger element(s). The child retains its own role, aria-label, and keyboard handling.' },
    { name: 'placement',      type: "'top' | 'bottom' | 'left' | 'right'",  default: "'top'",            required: false, description: 'Which side of the trigger the confirmation tooltip appears on.' },
    { name: 'duration',       type: 'number',                                default: '2000',             required: false, description: 'Milliseconds the tooltip stays visible before fading out.' },
    { name: 'successMessage', type: 'string',                                default: "'Copied!'",        required: false, description: 'Tooltip text shown after a successful clipboard write.' },
    { name: 'errorMessage',   type: 'string',                                default: "'Failed to copy'", required: false, description: 'Tooltip text shown when the clipboard write fails.' },
    { name: 'onCopy',         type: '(value: string) => void',              default: '—',                required: false, description: 'Called with the copied value after a successful write.' },
    { name: 'onError',        type: '(err: unknown) => void',               default: '—',                required: false, description: 'Called with the caught error when the write fails.' },
    { name: 'className',      type: 'string',                                default: '—',                required: false, description: 'Additional CSS classes on the wrapper element.' },
  ],

  testing: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyToClipboard, Button } from '@doriansmith/kiln';

beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
});

it('writes value to clipboard on click', async () => {
  render(
    <CopyToClipboard value="hello world">
      <Button>Copy</Button>
    </CopyToClipboard>
  );
  await userEvent.click(screen.getByRole('button'));
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
});

it('announces success to screen readers', async () => {
  render(
    <CopyToClipboard value="hello" successMessage="Done!">
      <Button>Copy</Button>
    </CopyToClipboard>
  );
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('status')).toHaveTextContent('Done!');
});

it('shows error message when clipboard fails', async () => {
  navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error('denied'));
  render(
    <CopyToClipboard value="x" errorMessage="No access">
      <Button>Copy</Button>
    </CopyToClipboard>
  );
  await userEvent.click(screen.getByRole('button'));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent('No access')
  );
});

it('calls onCopy callback with copied value', async () => {
  const onCopy = vi.fn();
  render(
    <CopyToClipboard value="abc" onCopy={onCopy}>
      <Button>Copy</Button>
    </CopyToClipboard>
  );
  await userEvent.click(screen.getByRole('button'));
  expect(onCopy).toHaveBeenCalledWith('abc');
});

it('tooltip disappears after duration', async () => {
  vi.useFakeTimers();
  render(
    <CopyToClipboard value="x" duration={1000}>
      <Button>Copy</Button>
    </CopyToClipboard>
  );
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('status')).toHaveTextContent('Copied!');
  vi.advanceTimersByTime(2000);
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent('')
  );
  vi.useRealTimers();
});`,

  usage: `// Wrap a CodeBlock — click anywhere on it to copy, showCopy={false} hides the built-in button
<CopyToClipboard value="npm install @doriansmith/kiln" placement="top">
  <CodeBlock
    language="bash"
    code="npm install @doriansmith/kiln"
    showCopy={false}
  />
</CopyToClipboard>

// Icon-only toolbar button
<CopyToClipboard value={shareUrl} placement="top" successMessage="Link copied!">
  <Button variant="ghost" size="sm" aria-label="Copy share link">
    <LinkIcon size={16} />
  </Button>
</CopyToClipboard>

// Wrap a Badge — any element works as the trigger
<CopyToClipboard value={versionTag} placement="top" successMessage="Version copied!">
  <Badge variant="neutral" style={{ cursor: 'pointer' }}>{versionTag}</Badge>
</CopyToClipboard>

// Long-lived toast + callback
<CopyToClipboard
  value={apiKey}
  placement="right"
  successMessage="API key copied!"
  duration={3000}
  onCopy={() => setLastCopied(Date.now())}
>
  <CodeBlock language="bash" code={apiKey} showCopy={false} />
</CopyToClipboard>`,
};
