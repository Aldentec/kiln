import React from 'react';
import { DropdownMenu, Button } from '@doriansmith/kiln';
import type { DropdownMenuEntry } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const DropdownMenuPreview: React.FC = () => {
  const items: DropdownMenuEntry[] = [
    { label: 'Edit', onSelect: () => {} },
    { label: 'Duplicate', onSelect: () => {} },
    { type: 'separator' },
    { label: 'Delete', onSelect: () => {}, variant: 'danger' },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignSelf: 'flex-start', width: '100%', paddingTop: '0.5rem' }}>
      <DropdownMenu
        trigger={<Button variant="secondary">Actions ▾</Button>}
        items={items}
      />
    </div>
  );
};

export const dropdownMenu: ComponentDoc = {
  id: 'dropdown-menu',
  name: 'DropdownMenu',
  description: 'Contextual action menus anchored to a trigger element with keyboard navigation.',
  preview: DropdownMenuPreview,
  code: `import { DropdownMenu, Button } from '@doriansmith/kiln';

const items = [
  { label: 'Edit', onSelect: () => openEditor() },
  { label: 'Duplicate', onSelect: () => duplicate() },
  { type: 'separator' },
  { label: 'Delete', onSelect: () => confirmDelete(), variant: 'danger' },
];

<DropdownMenu
  trigger={<Button variant="secondary">Actions ▾</Button>}
  items={items}
/>`,
  props: [
    { name: 'trigger', type: 'React.ReactElement', default: '—', required: true, description: 'The element that opens the menu on click' },
    { name: 'items', type: 'DropdownMenuEntry[]', default: '—', required: true, description: 'Array of items, separators, and labels' },
    { name: 'align', type: "'start' | 'end'", default: "'start'", required: false, description: 'Horizontal alignment relative to trigger' },
    { name: 'side', type: "'bottom' | 'top'", default: "'bottom'", required: false, description: 'Which side the menu opens on' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the menu panel' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu, Button } from '@doriansmith/kiln';

const items = [{ label: 'Edit', onSelect: vi.fn() }];

it('opens menu on trigger click', () => {
  render(<DropdownMenu trigger={<Button>Open</Button>} items={items} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open' }));
  expect(screen.getByRole('menu')).toBeInTheDocument();
});

it('closes on item select', () => {
  render(<DropdownMenu trigger={<Button>Open</Button>} items={items} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open' }));
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});`,
  usage: `// Row actions in a data table
<DropdownMenu
  trigger={<Button variant="ghost" aria-label="Row actions">⋯</Button>}
  items={[
    { label: 'View details', onSelect: () => openDrawer(row.id) },
    { label: 'Edit', onSelect: () => openEditor(row.id) },
    { type: 'separator' },
    { label: 'Remove', onSelect: () => remove(row.id), variant: 'danger' },
  ]}
  align="end"
/>

// With grouped labels
const items = [
  { type: 'label', label: 'Sort by' },
  { label: 'Newest first', onSelect: () => setSort('desc') },
  { label: 'Oldest first', onSelect: () => setSort('asc') },
];`,
};
