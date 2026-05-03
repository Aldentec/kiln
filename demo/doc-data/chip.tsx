import React, { useState } from 'react';
import { Chip } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ChipPreview: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['react']));
  const chips = ['React', 'TypeScript', 'CSS', 'Accessibility', 'Performance'];
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {chips.map((c) => (
        <Chip
          key={c}
          selected={selected.has(c.toLowerCase())}
          onToggle={(sel) => {
            const next = new Set(selected);
            if (sel) next.add(c.toLowerCase()); else next.delete(c.toLowerCase());
            setSelected(next);
          }}
        >
          {c}
        </Chip>
      ))}
    </div>
  );
};

export const chip: ComponentDoc = {
  id: 'chip',
  name: 'Chip',
  description: 'Toggleable filter tags for multi-select interactions with controlled and uncontrolled modes.',
  preview: ChipPreview,
  code: `import { Chip } from '@doriansmith/kiln';
import { useState } from 'react';

const chips = ['React', 'TypeScript', 'CSS', 'Accessibility', 'Performance'];
const [selected, setSelected] = useState(new Set(['react']));

{chips.map((c) => (
  <Chip
    key={c}
    selected={selected.has(c.toLowerCase())}
    onToggle={(sel) => {
      const next = new Set(selected);
      if (sel) next.add(c.toLowerCase()); else next.delete(c.toLowerCase());
      setSelected(next);
    }}
  >
    {c}
  </Chip>
))}`,
  props: [
    { name: 'selected', type: 'boolean', default: '—', required: false, description: 'Controlled selected state' },
    { name: 'defaultSelected', type: 'boolean', default: 'false', required: false, description: 'Initial selected state (uncontrolled)' },
    { name: 'onToggle', type: '(selected: boolean) => void', default: '—', required: false, description: 'Fired when selection changes' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Prevents interaction' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Chip label' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from '@doriansmith/kiln';

it('toggles selection on click', () => {
  const onToggle = vi.fn();
  render(<Chip onToggle={onToggle}>Tag</Chip>);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onToggle).toHaveBeenCalledWith(true);
});

it('does not toggle when disabled', () => {
  const onToggle = vi.fn();
  render(<Chip disabled onToggle={onToggle}>Tag</Chip>);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onToggle).not.toHaveBeenCalled();
});`,
  usage: `// Filter bar
const FILTERS = ['All', 'Active', 'Paused', 'Archived'];
const [active, setActive] = useState('All');

{FILTERS.map((f) => (
  <Chip
    key={f}
    selected={active === f}
    onToggle={() => setActive(f)}
  >
    {f}
  </Chip>
))}

// Tag input pattern
{selectedTags.map((tag) => (
  <Chip key={tag} selected onToggle={() => removeTag(tag)}>
    {tag}
  </Chip>
))}`,
};
