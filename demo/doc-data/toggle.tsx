import React, { useState } from 'react';
import { Toggle } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const TogglePreview: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Toggle label="Notifications" defaultChecked onChange={(on) => console.log(on)} />
      <Toggle label="Dark mode" checked={enabled} onChange={setEnabled} />
      <Toggle label="Small"  size="sm" />
      <Toggle label="Medium" size="md" />
      <Toggle label="Large"  size="lg" />
      <Toggle label="Read-only off" disabled />
      <Toggle label="Read-only on"  defaultChecked disabled />
      <Toggle label="Enable feature" labelHidden />
    </div>
  );
};

export const toggle: ComponentDoc = {
  id: 'toggle',
  name: 'Toggle',
  description: 'A binary switch for boolean settings. Supports controlled and uncontrolled modes, three sizes, and an optional visible label.',
  preview: TogglePreview,
  code: `import { Toggle } from '@doriansmith/kiln';
import { useState } from 'react';

// Uncontrolled
<Toggle label="Notifications" defaultChecked onChange={(on) => console.log(on)} />

// Controlled
const [enabled, setEnabled] = useState(false);
<Toggle label="Dark mode" checked={enabled} onChange={setEnabled} />

// Sizes
<Toggle label="Small"  size="sm" />
<Toggle label="Medium" size="md" />  {/* default */}
<Toggle label="Large"  size="lg" />

// Disabled states
<Toggle label="Read-only off" disabled />
<Toggle label="Read-only on"  defaultChecked disabled />

// Visually-hidden label (screen readers still announced)
<Toggle label="Enable feature" labelHidden />`,
  props: [
    { name: 'checked', type: 'boolean', default: '—', required: false, description: 'Controlled checked state' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', required: false, description: 'Initial checked state (uncontrolled)' },
    { name: 'onChange', type: '(checked: boolean) => void', default: '—', required: false, description: 'Fired when the switch is toggled' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Prevents interaction and dims the control' },
    { name: 'label', type: 'string', default: '—', required: false, description: 'Visible label text; also used as the accessible label via aria-labelledby' },
    { name: 'labelHidden', type: 'boolean', default: 'false', required: false, description: 'Hide the label visually while keeping it for screen readers' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Visual size of the track and thumb' },
    { name: 'id', type: 'string', default: 'auto', required: false, description: 'id for the underlying button element; auto-generated when omitted' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes applied to the outer wrapper' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from '@doriansmith/kiln';

it('is unchecked by default', () => {
  render(<Toggle label="Alerts" />);
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
});

it('toggles on click', () => {
  const onChange = vi.fn();
  render(<Toggle label="Alerts" onChange={onChange} />);
  fireEvent.click(screen.getByRole('switch'));
  expect(onChange).toHaveBeenCalledWith(true);
});

it('does not toggle when disabled', () => {
  const onChange = vi.fn();
  render(<Toggle label="Locked" disabled onChange={onChange} />);
  fireEvent.click(screen.getByRole('switch'));
  expect(onChange).not.toHaveBeenCalled();
});

it('respects controlled prop', () => {
  const { rerender } = render(<Toggle label="Sync" checked={false} onChange={() => {}} />);
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  rerender(<Toggle label="Sync" checked={true} onChange={() => {}} />);
  expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
});`,
  usage: `// Settings panel
const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoSave: true,
});

const toggle = (key: keyof typeof settings) =>
  setSettings((s) => ({ ...s, [key]: !s[key] }));

<Toggle label="Notifications" checked={settings.notifications} onChange={() => toggle('notifications')} />
<Toggle label="Dark mode"     checked={settings.darkMode}     onChange={() => toggle('darkMode')} />
<Toggle label="Auto-save"     checked={settings.autoSave}     onChange={() => toggle('autoSave')} />

// Feature flags
{featureFlags.map((flag) => (
  <Toggle
    key={flag.id}
    label={flag.name}
    checked={flag.enabled}
    onChange={(on) => updateFlag(flag.id, on)}
  />
))}`,
};
