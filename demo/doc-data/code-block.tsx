import React from 'react';
import { CodeBlock } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const CodeBlockPreview: React.FC = () => (
  <CodeBlock
    language="tsx"
    code={`import { Button } from '@doriansmith/kiln';

export default function App() {
  return <Button variant="primary">Ship it</Button>;
}`}
  />
);

export const codeBlock: ComponentDoc = {
  id: 'code-block',
  name: 'CodeBlock',
  description: 'Monospace code display with language label and one-click copy-to-clipboard.',
  preview: CodeBlockPreview,
  code: `import { CodeBlock } from '@doriansmith/kiln';

<CodeBlock
  language="tsx"
  code={\`import { Button } from '@doriansmith/kiln';

export default function App() {
  return <Button variant="primary">Ship it</Button>;
}\`}
/>

// Copy button hidden
<CodeBlock code={shellScript} language="bash" showCopy={false} />`,
  props: [
    { name: 'code', type: 'string', default: '—', required: true, description: 'The code string to display' },
    { name: 'language', type: 'string', default: '—', required: false, description: 'Language label shown in toolbar (e.g. "tsx", "bash")' },
    { name: 'showCopy', type: 'boolean', default: 'true', required: false, description: 'Show the copy-to-clipboard button' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles' },
  ],
  testing: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from '@doriansmith/kiln';

it('renders code content', () => {
  render(<CodeBlock code="const x = 1;" />);
  expect(screen.getByText('const x = 1;')).toBeInTheDocument();
});

it('shows language label', () => {
  render(<CodeBlock code="x = 1" language="python" />);
  expect(screen.getByText('python')).toBeInTheDocument();
});

it('copies code on button click', async () => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
  render(<CodeBlock code="hello" showCopy />);
  await userEvent.click(screen.getByRole('button', { name: /copy/i }));
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
});`,
  usage: `// Installation snippet
<CodeBlock language="bash" code="npm install @doriansmith/kiln" />

// Component example in docs
<CodeBlock
  language="tsx"
  code={dedent\`
    import { Card } from '@doriansmith/kiln';
    <Card variant="raised">Hello world</Card>
  \`}
/>

// No copy button for inline reference
<CodeBlock code={configJson} language="json" showCopy={false} />`,
};
