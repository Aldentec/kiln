import React, { useState } from 'react';
import { Checkbox } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const CheckboxPreview: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [partialSelected] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      {/* Sizes */}
      <Checkbox label="Small"  size="sm" defaultChecked />
      <Checkbox label="Medium" size="md" defaultChecked />
      <Checkbox label="Large"  size="lg" defaultChecked />

      <div style={{ height: '8px' }} />

      {/* States */}
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox
        label="Indeterminate (select-all)"
        indeterminate={partialSelected && !allSelected}
        checked={allSelected}
        onChange={(val) => setAllSelected(val)}
      />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked"   disabled defaultChecked />

      <div style={{ height: '8px' }} />

      {/* With sub-text */}
      <Checkbox
        label="Subscribe to updates"
        helperText="We'll only send you important product news."
      />
      <Checkbox
        label="Accept terms"
        checked={agreed}
        onChange={(val) => setAgreed(val)}
        errorText={!agreed ? 'You must accept the terms to continue.' : undefined}
      />
    </div>
  );
};

export const checkbox: ComponentDoc = {
  id: 'checkbox',
  name: 'Checkbox',
  description: 'Accessible custom checkbox with label, helper text, error state, and indeterminate support. Controlled and uncontrolled modes. Three sizes.',
  preview: CheckboxPreview,
  code: `import { Checkbox } from '@doriansmith/kiln';
import { useState } from 'react';

// ── Sizes (all checked) ────────────────────────────────────
<Checkbox label="Small"  size="sm" defaultChecked />
<Checkbox label="Medium" size="md" defaultChecked />
<Checkbox label="Large"  size="lg" defaultChecked />

// ── States ─────────────────────────────────────────────────
<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />

// Indeterminate — controlled, synced to a select-all pattern
const [allSelected, setAllSelected] = useState(false);
const partialSelected = true; // some items are selected

<Checkbox
  label="Indeterminate (select-all)"
  indeterminate={partialSelected && !allSelected}
  checked={allSelected}
  onChange={(val) => setAllSelected(val)}
/>

<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked"   disabled defaultChecked />

// ── Helper text ────────────────────────────────────────────
<Checkbox
  label="Subscribe to updates"
  helperText="We'll only send you important product news."
/>

// ── Controlled with error ──────────────────────────────────
const [agreed, setAgreed] = useState(false);

<Checkbox
  label="Accept terms"
  checked={agreed}
  onChange={(val) => setAgreed(val)}
  errorText={!agreed ? 'You must accept the terms to continue.' : undefined}
/>`,
  props: [
    { name: 'label', type: 'string', default: '—', required: false, description: 'Visible label text. Also the accessible name unless aria-label is provided.' },
    { name: 'labelHidden', type: 'boolean', default: 'false', required: false, description: 'Hide the label visually while keeping it accessible to screen readers.' },
    { name: 'checked', type: 'boolean', default: '—', required: false, description: 'Controlled checked state.' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', required: false, description: 'Uncontrolled initial checked state.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', required: false, description: 'Shows a dash instead of a tick. Typically used for a select-all checkbox when only some items are selected.' },
    { name: 'onChange', type: '(checked: boolean, e: ChangeEvent) => void', default: '—', required: false, description: 'Fired on every state change with the new checked value.' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Prevents interaction and dims the control.' },
    { name: 'helperText', type: 'string', default: '—', required: false, description: 'Helper text shown below the label. Hidden when errorText is set.' },
    { name: 'errorText', type: 'string', default: '—', required: false, description: 'Error message. Sets aria-invalid and shows a red error state with a shake animation.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Visual size of the checkbox box and label text.' },
    { name: 'id', type: 'string', default: 'auto', required: false, description: 'id for the underlying input element. Auto-generated when omitted.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the root field wrapper.' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '@doriansmith/kiln';

it('is unchecked by default', () => {
  render(<Checkbox label="Option" />);
  expect(screen.getByRole('checkbox')).not.toBeChecked();
});

it('calls onChange with new value', () => {
  const onChange = vi.fn();
  render(<Checkbox label="Option" onChange={onChange} />);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
});

it('sets aria-invalid on error', () => {
  render(<Checkbox label="Agree" errorText="Required" />);
  expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
});

it('does not fire onChange when disabled', () => {
  const onChange = vi.fn();
  render(<Checkbox label="Locked" disabled onChange={onChange} />);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onChange).not.toHaveBeenCalled();
});

it('respects controlled checked prop', () => {
  const { rerender } = render(<Checkbox label="Option" checked={false} onChange={() => {}} />);
  expect(screen.getByRole('checkbox')).not.toBeChecked();
  rerender(<Checkbox label="Option" checked={true} onChange={() => {}} />);
  expect(screen.getByRole('checkbox')).toBeChecked();
});`,
  usage: `// Form with multiple checkboxes
const [accepted, setAccepted] = useState(false);
const [subscribed, setSubscribed] = useState(true);

<form onSubmit={handleSubmit}>
  <Checkbox
    label="I accept the Terms of Service"
    checked={accepted}
    onChange={setAccepted}
    errorText={submitAttempted && !accepted ? 'Required' : undefined}
  />
  <Checkbox
    label="Send me product updates"
    helperText="Unsubscribe any time."
    checked={subscribed}
    onChange={setSubscribed}
  />
  <Button type="submit" variant="primary">Create account</Button>
</form>

// Select-all pattern
const [items, setItems] = useState([
  { id: 1, label: 'Apples',  selected: false },
  { id: 2, label: 'Bananas', selected: true  },
  { id: 3, label: 'Cherries',selected: false },
]);

const allSelected  = items.every((i) => i.selected);
const someSelected = items.some((i) => i.selected);

const toggleAll = (val: boolean) =>
  setItems((prev) => prev.map((i) => ({ ...i, selected: val })));

<Checkbox
  label="Select all"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={toggleAll}
/>
{items.map((item) => (
  <Checkbox
    key={item.id}
    label={item.label}
    checked={item.selected}
    onChange={(val) =>
      setItems((prev) =>
        prev.map((i) => i.id === item.id ? { ...i, selected: val } : i)
      )
    }
  />
))}`,
};
