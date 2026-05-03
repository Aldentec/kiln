import React from 'react';
import { Tabs } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const TabsPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>Pill (default)</p>
      <Tabs
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'settings', label: 'Settings' },
          { value: 'logs', label: 'Logs' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
        defaultValue="overview"
      />
    </div>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>Underline</p>
      <Tabs
        variant="underline"
        items={[
          { value: 'preview', label: 'Preview' },
          { value: 'api', label: 'API' },
          { value: 'testing', label: 'Testing' },
          { value: 'usage', label: 'Usage' },
        ]}
        defaultValue="preview"
      />
    </div>
  </div>
);

export const tabs: ComponentDoc = {
  id: 'tabs',
  name: 'Tabs',
  description: 'Horizontal tab navigation in pill or underline variants with full keyboard support.',
  preview: TabsPreview,
  code: `import { Tabs } from '@doriansmith/kiln';

// Pill (default)
<Tabs
  items={[
    { value: 'overview',  label: 'Overview' },
    { value: 'settings',  label: 'Settings' },
    { value: 'logs',      label: 'Logs' },
    { value: 'disabled',  label: 'Disabled', disabled: true },
  ]}
  defaultValue="overview"
/>

// Underline — typical for docs/detail pages
<Tabs
  variant="underline"
  items={[
    { value: 'preview', label: 'Preview' },
    { value: 'api',     label: 'API' },
    { value: 'testing', label: 'Testing' },
    { value: 'usage',   label: 'Usage' },
  ]}
  defaultValue="preview"
/>`,
  props: [
    { name: 'items', type: 'TabItem[]', default: '—', required: true, description: 'Tab definitions (value, label, icon?, disabled?)' },
    { name: 'variant', type: "'pill' | 'underline'", default: "'pill'", required: false, description: 'Visual style — pill strip or underline indicator' },
    { name: 'value', type: 'string', default: '—', required: false, description: 'Controlled active tab value' },
    { name: 'defaultValue', type: 'string', default: 'first item', required: false, description: 'Initial active value (uncontrolled)' },
    { name: 'onChange', type: '(value: string) => void', default: '—', required: false, description: 'Fired when active tab changes' },
    { name: 'ariaLabel', type: 'string', default: "'Tabs'", required: false, description: 'Accessible label for the tablist' },
    { name: 'id', type: 'string', default: '—', required: false, description: 'Base ID — enables aria-controls linking to tab panels' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '@doriansmith/kiln';

const items = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
];

it('renders all tabs', () => {
  render(<Tabs items={items} />);
  expect(screen.getAllByRole('tab')).toHaveLength(2);
});

it('selects tab on click', () => {
  const onChange = vi.fn();
  render(<Tabs items={items} onChange={onChange} />);
  fireEvent.click(screen.getByText('Tab B'));
  expect(onChange).toHaveBeenCalledWith('b');
});

it('navigates with arrow keys', () => {
  render(<Tabs items={items} defaultValue="a" />);
  screen.getByText('Tab A').focus();
  fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
  expect(screen.getByText('Tab B')).toHaveFocus();
});`,
  usage: `// Controlled tabs with panel rendering
const [tab, setTab] = useState('overview');

<Tabs
  id="detail-tabs"
  items={TABS}
  value={tab}
  onChange={setTab}
  variant="underline"
/>

<div role="tabpanel" id={\`detail-tabs-panel-\${tab}\`}>
  {tab === 'overview' && <Overview />}
  {tab === 'settings' && <Settings />}
</div>`,
};
