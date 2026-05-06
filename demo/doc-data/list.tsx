import React, { useState, useRef } from 'react';
import { List, Button, Input } from '@doriansmith/kiln';
import type { KilnListItem } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

// ── Shared label style ────────────────────────────────────────────────────────

const sectionLabel = {
  margin: '0 0 8px',
  fontSize: '0.75rem',
  fontWeight: 600 as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: 'var(--kiln-gray-500)',
};

// ── Simple list ───────────────────────────────────────────────────────────────

const simpleItems: KilnListItem[] = [
  { id: '1', content: 'Apples' },
  { id: '2', content: 'Pears' },
  { id: '3', content: 'Oranges' },
];

// ── Secondary content ─────────────────────────────────────────────────────────

const teamItems: KilnListItem[] = [
  { id: '1', content: 'Dorian Smith', secondaryContent: 'Engineering · Owner' },
  { id: '2', content: 'Alex Chen',    secondaryContent: 'Design · Editor' },
  { id: '3', content: 'Jordan Lee',   secondaryContent: 'Marketing · Viewer' },
];

// ── Icons and actions ─────────────────────────────────────────────────────────

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const fileItems: KilnListItem[] = [
  {
    id: '1',
    content: 'report.pdf',
    icon: <FileIcon />,
    actions: (
      <>
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </>
    ),
  },
  {
    id: '2',
    content: 'design-spec.fig',
    icon: <FileIcon />,
    actions: (
      <>
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </>
    ),
  },
  {
    id: '3',
    content: 'README.md',
    icon: <FileIcon />,
    actions: (
      <>
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </>
    ),
  },
];

// ── External links ────────────────────────────────────────────────────────────

const linkItems: KilnListItem[] = [
  { id: '1', content: 'GitHub',      href: 'https://github.com/Aldentec/kiln' },
  { id: '2', content: 'npm package', href: 'https://www.npmjs.com/package/@doriansmith/kiln' },
  { id: '3', content: 'Live demo',   href: 'https://kiln-ui.com' },
];

// ── List builder ──────────────────────────────────────────────────────────────

function ListBuilder() {
  const [items, setItems] = useState<KilnListItem[]>([
    { id: '1', content: 'First task',  announcementLabel: 'First task' },
    { id: '2', content: 'Second task', announcementLabel: 'Second task' },
  ]);
  const [value, setValue] = useState('');
  const nextId = useRef(10);

  const add = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setItems(prev => [
      ...prev,
      { id: String(nextId.current++), content: trimmed, announcementLabel: trimmed },
    ]);
    setValue('');
  };

  const remove = (id: string) => setItems(prev => prev.filter(it => it.id !== id));

  const withActions: KilnListItem[] = items.map(item => ({
    ...item,
    actions: (
      <Button
        variant="ghost"
        size="sm"
        aria-label={`Remove ${item.announcementLabel}`}
        onClick={() => remove(item.id)}
      >
        ✕
      </Button>
    ),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.length > 0 && (
        <List
          items={withActions}
          sortable
          onReorder={setItems}
          ariaLabel="Custom task list"
        />
      )}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1 }}>
          <Input
            aria-label="New item"
            placeholder="Enter value"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') add(); }}
          />
        </div>
        <Button variant="secondary" onClick={add}>Add new value</Button>
      </div>
    </div>
  );
}

// ── Sortable ──────────────────────────────────────────────────────────────────

function SortableDemo() {
  const [items, setItems] = useState<KilnListItem[]>([
    { id: '1', content: 'Apples',       announcementLabel: 'Apples' },
    { id: '2', content: 'Pears',        announcementLabel: 'Pears' },
    { id: '3', content: 'Oranges',      announcementLabel: 'Oranges' },
    { id: '4', content: 'Bananas',      announcementLabel: 'Bananas' },
    { id: '5', content: 'Strawberries', announcementLabel: 'Strawberries' },
  ]);
  return <List items={items} sortable onReorder={setItems} ariaLabel="Sortable fruit list" />;
}

// ── Preview ───────────────────────────────────────────────────────────────────

const ListPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%', maxWidth: 480 }}>

    <div>
      <p style={sectionLabel}>Simple list</p>
      <List items={simpleItems} ariaLabel="Fruit list" />
    </div>

    <div>
      <p style={sectionLabel}>With secondary content</p>
      <List items={teamItems} ariaLabel="Team members" />
    </div>

    <div>
      <p style={sectionLabel}>With icons and actions</p>
      <List items={fileItems} ariaLabel="Files" />
    </div>

    <div>
      <p style={sectionLabel}>External links</p>
      <List items={linkItems} ariaLabel="Resources" />
    </div>

    <div>
      <p style={sectionLabel}>Sortable list — drag handle or keyboard (Space → arrows → Space)</p>
      <SortableDemo />
    </div>

    <div>
      <p style={sectionLabel}>List builder — add, remove, and reorder</p>
      <ListBuilder />
    </div>

  </div>
);

// ── Doc ───────────────────────────────────────────────────────────────────────

export const list: ComponentDoc = {
  id: 'list',
  name: 'List',
  description: 'A group of consecutive items displayed one below the other. Supports secondary content, icons, actions, links, drag-to-reorder, and a list-builder pattern.',
  preview: ListPreview,
  code: `import React, { useState, useRef } from 'react';
import { List, Button, Input } from '@doriansmith/kiln';
import type { KilnListItem } from '@doriansmith/kiln';

// ── Simple list ───────────────────────────────────────────────────────────────
const simpleItems: KilnListItem[] = [
  { id: '1', content: 'Apples' },
  { id: '2', content: 'Pears' },
  { id: '3', content: 'Oranges' },
];

<List items={simpleItems} ariaLabel="Fruit list" />

// ── With secondary content ────────────────────────────────────────────────────
const teamItems: KilnListItem[] = [
  { id: '1', content: 'Dorian Smith', secondaryContent: 'Engineering · Owner' },
  { id: '2', content: 'Alex Chen',    secondaryContent: 'Design · Editor' },
  { id: '3', content: 'Jordan Lee',   secondaryContent: 'Marketing · Viewer' },
];

<List items={teamItems} ariaLabel="Team members" />

// ── With icons and actions ────────────────────────────────────────────────────
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const fileItems: KilnListItem[] = [
  {
    id: '1',
    content: 'report.pdf',
    icon: <FileIcon />,
    actions: (
      <>
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </>
    ),
  },
  {
    id: '2',
    content: 'design-spec.fig',
    icon: <FileIcon />,
    actions: (
      <>
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </>
    ),
  },
  {
    id: '3',
    content: 'README.md',
    icon: <FileIcon />,
    actions: (
      <>
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </>
    ),
  },
];

<List items={fileItems} ariaLabel="Files" />

// ── External links ────────────────────────────────────────────────────────────
const linkItems: KilnListItem[] = [
  { id: '1', content: 'GitHub',      href: 'https://github.com/Aldentec/kiln' },
  { id: '2', content: 'npm package', href: 'https://www.npmjs.com/package/@doriansmith/kiln' },
  { id: '3', content: 'Live demo',   href: 'https://kiln-ui.com' },
];

<List items={linkItems} ariaLabel="Resources" />

// ── Sortable list ─────────────────────────────────────────────────────────────
// Keyboard: focus a drag handle → Space to lift → ArrowUp/Down → Space to drop
function SortableDemo() {
  const [items, setItems] = useState<KilnListItem[]>([
    { id: '1', content: 'Apples',       announcementLabel: 'Apples' },
    { id: '2', content: 'Pears',        announcementLabel: 'Pears' },
    { id: '3', content: 'Oranges',      announcementLabel: 'Oranges' },
    { id: '4', content: 'Bananas',      announcementLabel: 'Bananas' },
    { id: '5', content: 'Strawberries', announcementLabel: 'Strawberries' },
  ]);
  return <List items={items} sortable onReorder={setItems} ariaLabel="Sortable fruit list" />;
}

// ── List builder — add, remove, and reorder ───────────────────────────────────
function ListBuilder() {
  const [items, setItems] = useState<KilnListItem[]>([
    { id: '1', content: 'First task',  announcementLabel: 'First task' },
    { id: '2', content: 'Second task', announcementLabel: 'Second task' },
  ]);
  const [value, setValue] = useState('');
  const nextId = useRef(10);

  const add = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setItems(prev => [
      ...prev,
      { id: String(nextId.current++), content: trimmed, announcementLabel: trimmed },
    ]);
    setValue('');
  };

  const remove = (id: string) => setItems(prev => prev.filter(it => it.id !== id));

  const withActions: KilnListItem[] = items.map(item => ({
    ...item,
    actions: (
      <Button
        variant="ghost"
        size="sm"
        aria-label={\`Remove \${item.announcementLabel}\`}
        onClick={() => remove(item.id)}
      >
        ✕
      </Button>
    ),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.length > 0 && (
        <List items={withActions} sortable onReorder={setItems} ariaLabel="Custom task list" />
      )}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1 }}>
          <Input
            aria-label="New item"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
          />
        </div>
        <Button variant="secondary" onClick={add}>Add new value</Button>
      </div>
    </div>
  );
}`,
  props: [
    { name: 'items', type: 'KilnListItem[]', default: '—', required: true, description: 'Array of list items' },
    { name: 'sortable', type: 'boolean', default: 'false', required: false, description: 'Enables drag-and-drop and keyboard reordering with a drag handle per item' },
    { name: 'sortDisabled', type: 'boolean', default: 'false', required: false, description: 'Renders sortable without handles — disables all reorder interaction' },
    { name: 'onReorder', type: '(items: KilnListItem[]) => void', default: '—', required: false, description: 'Called with the new item array after every reorder' },
    { name: 'disablePaddings', type: 'boolean', default: 'false', required: false, description: 'Removes outer border, border-radius, and background from the list container' },
    { name: 'disableItemPaddings', type: 'boolean', default: 'false', required: false, description: 'Removes padding from individual list item bodies' },
    { name: 'ariaLabel', type: 'string', default: '—', required: false, description: 'Accessible label for the list landmark' },
    { name: 'ariaLabelledby', type: 'string', default: '—', required: false, description: 'ID of an element that labels the list' },
    { name: 'ariaDescribedby', type: 'string', default: '—', required: false, description: 'ID of an element that describes the list' },
    { name: 'tagOverride', type: 'string', default: "'ul'", required: false, description: 'Override the root element tag (e.g. "ol" for ordered lists)' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes on the list container' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for CSS custom property overrides (e.g. --kiln-list-radius)' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { List } from '@doriansmith/kiln';
import type { KilnListItem } from '@doriansmith/kiln';

const items: KilnListItem[] = [
  { id: '1', content: 'Apples',  announcementLabel: 'Apples' },
  { id: '2', content: 'Bananas', announcementLabel: 'Bananas' },
];

it('renders all items', () => {
  render(<List items={items} />);
  expect(screen.getByText('Apples')).toBeInTheDocument();
  expect(screen.getByText('Bananas')).toBeInTheDocument();
});

it('renders item body as a link when href is set', () => {
  const linked = [{ id: '1', content: 'GitHub', href: 'https://github.com' }];
  render(<List items={linked} />);
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com');
});

it('drag handle has accessible label per item', () => {
  render(<List items={items} sortable />);
  expect(screen.getByRole('button', { name: 'Reorder Apples' })).toBeInTheDocument();
});

it('keyboard: Space lifts item, ArrowDown + Space drops one position down', async () => {
  const user = userEvent.setup();
  const onReorder = vi.fn();
  render(<List items={items} sortable onReorder={onReorder} />);
  const handle = screen.getByRole('button', { name: 'Reorder Apples' });
  handle.focus();
  await user.keyboard(' ');
  await user.keyboard('{ArrowDown}');
  await user.keyboard(' ');
  expect(onReorder).toHaveBeenCalledWith([
    expect.objectContaining({ id: '2' }),
    expect.objectContaining({ id: '1' }),
  ]);
});

it('keyboard: Escape cancels reorder without firing onReorder', async () => {
  const user = userEvent.setup();
  const onReorder = vi.fn();
  render(<List items={items} sortable onReorder={onReorder} />);
  const handle = screen.getByRole('button', { name: 'Reorder Apples' });
  handle.focus();
  await user.keyboard(' ');
  await user.keyboard('{Escape}');
  expect(onReorder).not.toHaveBeenCalled();
});`,
  usage: `// ── KilnListItem shape ────────────────────────────────────────────────────────
interface KilnListItem {
  id: string;                        // unique — used as React key
  content: React.ReactNode;          // primary text or element
  secondaryContent?: React.ReactNode; // muted line below primary
  icon?: React.ReactNode;            // leading icon slot
  actions?: React.ReactNode;         // trailing buttons slot
  href?: string;                     // makes the item body a link
  disabled?: boolean;                // greys out and disables interaction
  announcementLabel?: string;        // string used in screen-reader announcements for sortable lists
}

// ── Disabled item ─────────────────────────────────────────────────────────────
<List
  items={[
    { id: '1', content: 'Active item' },
    { id: '2', content: 'Disabled item', disabled: true },
  ]}
  ariaLabel="Settings"
/>

// ── Ordered list ──────────────────────────────────────────────────────────────
<List
  items={steps}
  tagOverride="ol"
  ariaLabel="Setup steps"
/>

// ── No container (flush with surroundings) ────────────────────────────────────
<List
  items={items}
  disablePaddings
  ariaLabel="Inline list"
/>

// ── Custom token override ─────────────────────────────────────────────────────
<List
  items={items}
  ariaLabel="Custom styled list"
  style={{ '--kiln-list-radius': '0' } as React.CSSProperties}
/>`,
};
