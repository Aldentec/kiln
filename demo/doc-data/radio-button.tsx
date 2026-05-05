import React, { useState } from 'react';
import { RadioButton } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const RadioButtonPreview: React.FC = () => {
  const [plan, setPlan] = useState('pro');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      {/* Uncontrolled */}
      <RadioButton name="demo-uncontrolled">Unchecked</RadioButton>
      <RadioButton name="demo-uncontrolled" defaultChecked>Checked</RadioButton>

      {/* With description */}
      <RadioButton
        name="demo-desc"
        defaultChecked
        description="The first option in the set"
      >
        With description
      </RadioButton>

      {/* Controlled group */}
      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {(['starter', 'pro', 'enterprise'] as const).map((p) => (
          <RadioButton
            key={p}
            name="demo-plan"
            value={p}
            checked={plan === p}
            onChange={() => setPlan(p)}
            description={
              p === 'starter' ? 'Up to 3 projects, free forever'
              : p === 'pro'   ? 'Unlimited projects, $12/mo'
                              : 'Custom limits, contact sales'
            }
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </RadioButton>
        ))}
      </div>

      {/* Disabled states */}
      <RadioButton name="demo-dis" disabled>Disabled</RadioButton>
      <RadioButton name="demo-dis" disabled defaultChecked>Checked and disabled</RadioButton>

      {/* Read-only */}
      <RadioButton name="demo-ro" readOnly>Read-only</RadioButton>
      <RadioButton name="demo-ro" readOnly defaultChecked>Checked and read-only</RadioButton>
    </div>
  );
};

export const radioButton: ComponentDoc = {
  id: 'radio-button',
  name: 'RadioButton',
  description: 'A single-selection control for mutually exclusive options. Supports controlled and uncontrolled modes, optional description text, disabled, and read-only states.',
  preview: RadioButtonPreview,
  code: `import { RadioButton } from '@doriansmith/kiln';
import { useState } from 'react';

// Uncontrolled
<RadioButton name="demo">Unchecked</RadioButton>
<RadioButton name="demo" defaultChecked>Checked</RadioButton>

// With description
<RadioButton
  name="described"
  defaultChecked
  description="The first option in the set"
>
  With description
</RadioButton>

// Controlled group
const [plan, setPlan] = useState('pro');

{(['starter', 'pro', 'enterprise'] as const).map((p) => (
  <RadioButton
    key={p}
    name="plan"
    value={p}
    checked={plan === p}
    onChange={() => setPlan(p)}
    description={
      p === 'starter'    ? 'Up to 3 projects, free forever'
      : p === 'pro'      ? 'Unlimited projects, $12/mo'
                         : 'Custom limits, contact sales'
    }
  >
    {p.charAt(0).toUpperCase() + p.slice(1)}
  </RadioButton>
))}

// Disabled states
<RadioButton name="dis" disabled>Disabled</RadioButton>
<RadioButton name="dis" disabled defaultChecked>Checked and disabled</RadioButton>

// Read-only states
<RadioButton name="ro" readOnly>Read-only</RadioButton>
<RadioButton name="ro" readOnly defaultChecked>Checked and read-only</RadioButton>`,
  props: [
    { name: 'children',       type: 'React.ReactNode',                       default: '—',     required: true,  description: 'Label text rendered beside the indicator' },
    { name: 'checked',        type: 'boolean',                               default: '—',     required: false, description: 'Controlled checked state' },
    { name: 'defaultChecked', type: 'boolean',                               default: 'false', required: false, description: 'Initial checked state (uncontrolled)' },
    { name: 'onChange',       type: '(event: ChangeEvent<HTMLInputElement>) => void', default: '—', required: false, description: 'Fired when the radio is selected' },
    { name: 'disabled',       type: 'boolean',                               default: 'false', required: false, description: 'Prevents interaction and dims the control' },
    { name: 'readOnly',       type: 'boolean',                               default: 'false', required: false, description: 'Visually normal but blocks user interaction' },
    { name: 'description',    type: 'string',                                default: '—',     required: false, description: 'Helper text rendered below the label; linked via aria-describedby' },
    { name: 'name',           type: 'string',                                default: '—',     required: false, description: 'Radio group name — required for mutual exclusion between inputs' },
    { name: 'value',          type: 'string',                                default: '—',     required: false, description: 'Value submitted with the form' },
    { name: 'id',             type: 'string',                                default: 'auto',  required: false, description: 'Explicit id; auto-generated when omitted' },
    { name: 'className',      type: 'string',                                default: "''",    required: false, description: 'Additional CSS classes on the root label element' },
    { name: 'style',          type: 'React.CSSProperties',                   default: '—',     required: false, description: 'Inline styles; use for CSS custom property overrides' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { RadioButton } from '@doriansmith/kiln';

it('is unchecked by default', () => {
  render(<RadioButton>Option</RadioButton>);
  expect(screen.getByRole('radio')).not.toBeChecked();
});

it('respects defaultChecked', () => {
  render(<RadioButton defaultChecked>Option</RadioButton>);
  expect(screen.getByRole('radio')).toBeChecked();
});

it('fires onChange when selected', () => {
  const onChange = vi.fn();
  render(<RadioButton onChange={onChange}>Option</RadioButton>);
  fireEvent.click(screen.getByRole('radio'));
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('does not fire onChange when disabled', () => {
  const onChange = vi.fn();
  render(<RadioButton disabled onChange={onChange}>Option</RadioButton>);
  fireEvent.click(screen.getByRole('radio'));
  expect(onChange).not.toHaveBeenCalled();
});

it('does not fire onChange when readOnly', () => {
  const onChange = vi.fn();
  render(<RadioButton readOnly onChange={onChange}>Option</RadioButton>);
  fireEvent.click(screen.getByRole('radio'));
  expect(onChange).not.toHaveBeenCalled();
});

it('links description via aria-describedby', () => {
  render(<RadioButton description="Helper text">Option</RadioButton>);
  const input = screen.getByRole('radio');
  const desc = screen.getByText('Helper text');
  expect(input).toHaveAttribute('aria-describedby', desc.id);
});`,
  usage: `// Settings form — notification preferences
const [frequency, setFrequency] = useState('daily');

const options = [
  { value: 'realtime', label: 'Real-time',  desc: 'Get notified as events happen' },
  { value: 'daily',    label: 'Daily digest', desc: 'One summary email per day' },
  { value: 'weekly',   label: 'Weekly digest', desc: 'One summary email per week' },
  { value: 'none',     label: 'None',        desc: 'Disable all notifications' },
];

{options.map((opt) => (
  <RadioButton
    key={opt.value}
    name="frequency"
    value={opt.value}
    checked={frequency === opt.value}
    onChange={() => setFrequency(opt.value)}
    description={opt.desc}
  >
    {opt.label}
  </RadioButton>
))}

// Pricing tier selector
const [tier, setTier] = useState<'free' | 'pro' | 'team'>('free');

<RadioButton name="tier" value="free"  checked={tier === 'free'}  onChange={() => setTier('free')}  description="$0/mo — 3 projects">Free</RadioButton>
<RadioButton name="tier" value="pro"   checked={tier === 'pro'}   onChange={() => setTier('pro')}   description="$12/mo — unlimited">Pro</RadioButton>
<RadioButton name="tier" value="team"  checked={tier === 'team'}  onChange={() => setTier('team')}  description="$39/mo — 5 seats">Team</RadioButton>`,
};
