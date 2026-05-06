import React, { useState } from 'react';
import { Table, Badge, Button, Input } from '@doriansmith/kiln';
import type { TableColumnDefinition, TableSortingState } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

// ── Sample data ───────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
  projects: number;
}

const USERS: User[] = [
  { id: '1', name: 'Dorian Smith',  role: 'Admin',   status: 'active',   joined: '2024-01-15', projects: 12 },
  { id: '2', name: 'Alex Chen',     role: 'Editor',  status: 'active',   joined: '2024-03-02', projects: 7  },
  { id: '3', name: 'Jordan Lee',    role: 'Viewer',  status: 'inactive', joined: '2024-06-18', projects: 2  },
  { id: '4', name: 'Sam Rivera',    role: 'Editor',  status: 'active',   joined: '2024-09-01', projects: 5  },
  { id: '5', name: 'Morgan Taylor', role: 'Viewer',  status: 'pending',  joined: '2025-01-10', projects: 0  },
];

const STATUS_VARIANT: Record<User['status'], 'success' | 'neutral' | 'warning'> = {
  active:   'success',
  inactive: 'neutral',
  pending:  'warning',
};

// ── Full featured demo ────────────────────────────────────────────────────────

function TablePreviewFull() {
  const [selected, setSelected] = useState<User[]>([]);
  const [sortingColumn, setSortingColumn] = useState<TableColumnDefinition<User>>();
  const [sortingDescending, setSortingDescending] = useState(false);
  const [filterText, setFilterText] = useState('');

  const columns: TableColumnDefinition<User>[] = [
    { id: 'name',     header: 'Name',     cell: (u) => u.name,     sortingField: 'name',     isRowHeader: true },
    { id: 'role',     header: 'Role',     cell: (u) => u.role,     sortingField: 'role'     },
    { id: 'status',   header: 'Status',   cell: (u) => (
      <Badge variant={STATUS_VARIANT[u.status]}>{u.status}</Badge>
    )},
    { id: 'joined',   header: 'Joined',   cell: (u) => u.joined,   sortingField: 'joined'   },
    { id: 'projects', header: 'Projects', cell: (u) => u.projects, sortingField: 'projects', width: 100 },
  ];

  const filtered = USERS.filter(
    (u) =>
      !filterText ||
      u.name.toLowerCase().includes(filterText.toLowerCase()) ||
      u.role.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <Table<User>
      columnDefinitions={columns}
      items={filtered}
      trackBy="id"
      selectionType="multi"
      selectedItems={selected}
      onSelectionChange={({ selectedItems }) => setSelected(selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ sortingColumn: col, isDescending }) => {
        setSortingColumn(col);
        setSortingDescending(isDescending);
      }}
      ariaLabel="Team members"
      totalItemsCount={filtered.length}
      header={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>
            Team members{selected.length > 0 && ` (${selected.length} selected)`}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="sm">Invite</Button>
            <Button variant="primary" size="sm">Add member</Button>
          </div>
        </div>
      }
      filter={
        <Input
          aria-label="Search members"
          placeholder="Search by name or role…"
          value={filterText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
        />
      }
      empty={
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--kiln-gray-500)' }}>
          No members match your filter.
        </div>
      }
      footer={
        <span style={{ fontSize: '0.8125rem', color: 'var(--kiln-gray-500)' }}>
          Showing {filtered.length} of {USERS.length} members
        </span>
      }
    />
  );
}

// ── Striped + compact demo ────────────────────────────────────────────────────

const simpleColumns: TableColumnDefinition<User>[] = [
  { id: 'name',   header: 'Name',   cell: (u) => u.name,   sortingField: 'name'   },
  { id: 'role',   header: 'Role',   cell: (u) => u.role   },
  { id: 'joined', header: 'Joined', cell: (u) => u.joined },
];

function TablePreviewVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>
          Striped + compact
        </p>
        <Table<User>
          columnDefinitions={simpleColumns}
          items={USERS}
          trackBy="id"
          stripedRows
          contentDensity="compact"
          ariaLabel="Team (striped compact)"
        />
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>
          Single selection
        </p>
        <SingleSelectDemo />
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>
          Loading state
        </p>
        <Table<User>
          columnDefinitions={simpleColumns}
          items={[]}
          loading
          loadingText="Loading team members…"
          ariaLabel="Team (loading)"
        />
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>
          Empty state
        </p>
        <Table<User>
          columnDefinitions={simpleColumns}
          items={[]}
          ariaLabel="Team (empty)"
          empty={
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ margin: 0, fontWeight: 600 }}>No team members yet</p>
              <p style={{ margin: '4px 0 12px', color: 'var(--kiln-gray-500)', fontSize: '0.875rem' }}>
                Invite someone to get started.
              </p>
              <Button variant="primary" size="sm">Invite member</Button>
            </div>
          }
        />
      </div>
    </div>
  );
}

function SingleSelectDemo() {
  const [selected, setSelected] = useState<User[]>([]);
  return (
    <Table<User>
      columnDefinitions={simpleColumns}
      items={USERS.slice(0, 3)}
      trackBy="id"
      selectionType="single"
      selectedItems={selected}
      onSelectionChange={({ selectedItems }) => setSelected(selectedItems)}
      ariaLabel="Team (single select)"
    />
  );
}

// ── Combined preview ──────────────────────────────────────────────────────────

const TablePreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%' }}>
    <TablePreviewFull />
    <TablePreviewVariants />
  </div>
);

// ── Doc ───────────────────────────────────────────────────────────────────────

export const table: ComponentDoc = {
  id: 'table',
  name: 'Table',
  description: 'A full-featured data table with sorting, multi/single selection, sticky header, column resize, empty/loading states, and composable slots for header, filter, pagination, and footer.',
  preview: TablePreview,
  code: `import React, { useState } from 'react';
import { Table, Badge, Button, Input } from '@doriansmith/kiln';
import type { TableColumnDefinition } from '@doriansmith/kiln';

interface User {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
  projects: number;
}

const USERS: User[] = [
  { id: '1', name: 'Dorian Smith',  role: 'Admin',   status: 'active',   joined: '2024-01-15', projects: 12 },
  { id: '2', name: 'Alex Chen',     role: 'Editor',  status: 'active',   joined: '2024-03-02', projects: 7  },
  { id: '3', name: 'Jordan Lee',    role: 'Viewer',  status: 'inactive', joined: '2024-06-18', projects: 2  },
  { id: '4', name: 'Sam Rivera',    role: 'Editor',  status: 'active',   joined: '2024-09-01', projects: 5  },
  { id: '5', name: 'Morgan Taylor', role: 'Viewer',  status: 'pending',  joined: '2025-01-10', projects: 0  },
];

const STATUS_VARIANT: Record<User['status'], 'success' | 'neutral' | 'warning'> = {
  active:   'success',
  inactive: 'neutral',
  pending:  'warning',
};

const columns: TableColumnDefinition<User>[] = [
  { id: 'name',     header: 'Name',     cell: (u) => u.name,     sortingField: 'name',     isRowHeader: true },
  { id: 'role',     header: 'Role',     cell: (u) => u.role,     sortingField: 'role'     },
  { id: 'status',   header: 'Status',   cell: (u) => (
    <Badge variant={STATUS_VARIANT[u.status]}>{u.status}</Badge>
  )},
  { id: 'joined',   header: 'Joined',   cell: (u) => u.joined,   sortingField: 'joined'   },
  { id: 'projects', header: 'Projects', cell: (u) => u.projects, sortingField: 'projects', width: 100 },
];

function TeamTable() {
  const [selected, setSelected]                   = useState<User[]>([]);
  const [sortingColumn, setSortingColumn]         = useState<TableColumnDefinition<User>>();
  const [sortingDescending, setSortingDescending] = useState(false);
  const [filterText, setFilterText]               = useState('');

  const filtered = USERS.filter(
    (u) =>
      !filterText ||
      u.name.toLowerCase().includes(filterText.toLowerCase()) ||
      u.role.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <Table<User>
      columnDefinitions={columns}
      items={filtered}
      trackBy="id"
      selectionType="multi"
      selectedItems={selected}
      onSelectionChange={({ selectedItems }) => setSelected(selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ sortingColumn: col, isDescending }) => {
        setSortingColumn(col);
        setSortingDescending(isDescending);
      }}
      ariaLabel="Team members"
      totalItemsCount={filtered.length}
      header={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>
            Team members{selected.length > 0 && \` (\${selected.length} selected)\`}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="sm">Invite</Button>
            <Button variant="primary" size="sm">Add member</Button>
          </div>
        </div>
      }
      filter={
        <Input
          aria-label="Search members"
          placeholder="Search by name or role…"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      }
      empty={
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--kiln-gray-500)' }}>
          No members match your filter.
        </div>
      }
      footer={
        <span style={{ fontSize: '0.8125rem', color: 'var(--kiln-gray-500)' }}>
          Showing {filtered.length} of {USERS.length} members
        </span>
      }
    />
  );
}`,
  props: [
    { name: 'columnDefinitions', type: 'ReadonlyArray<TableColumnDefinition<T>>', default: '—', required: true, description: 'Column configuration: id, header, cell renderer, optional sort field, width, and more.' },
    { name: 'items', type: 'ReadonlyArray<T>', default: '—', required: true, description: 'Data rows. Each element corresponds to one table row.' },
    { name: 'trackBy', type: 'string | ((item: T) => string)', default: '—', required: false, description: 'Property name or function to derive a stable key for each row. Required for selection to work correctly when items change.' },
    { name: 'selectionType', type: "'single' | 'multi'", default: '—', required: false, description: 'Enables row selection. single renders radio buttons, multi renders checkboxes with a select-all header.' },
    { name: 'selectedItems', type: 'ReadonlyArray<T>', default: '[]', required: false, description: 'Controlled selected items. Manage externally with onSelectionChange.' },
    { name: 'onSelectionChange', type: '(detail: { selectedItems: T[] }) => void', default: '—', required: false, description: 'Fired when selection changes. Receives the new selectedItems array.' },
    { name: 'isItemDisabled', type: '(item: T) => boolean', default: '—', required: false, description: 'Return true to disable selection on that item. Disabled items are still visible.' },
    { name: 'ariaLabels', type: 'TableAriaLabels<T>', default: '—', required: false, description: 'Aria label functions for selection controls. Provide for full screen reader support.' },
    { name: 'sortingColumn', type: 'TableColumnDefinition<T>', default: '—', required: false, description: 'Currently sorted column (controlled). Pass undefined to let the table sort internally.' },
    { name: 'sortingDescending', type: 'boolean', default: 'false', required: false, description: 'When true, the sortingColumn is sorted descending.' },
    { name: 'sortingDisabled', type: 'boolean', default: 'false', required: false, description: 'Disables all sort triggers (e.g. while loading fresh data).' },
    { name: 'onSortingChange', type: '(detail: TableSortingState<T>) => void', default: '—', required: false, description: 'Fired when the user clicks a sortable column header. detail includes sortingColumn and isDescending.' },
    { name: 'variant', type: "'container' | 'borderless' | 'stacked'", default: "'container'", required: false, description: 'container adds border, radius, and shadow. borderless removes all decoration. stacked omits radius for flush placement next to other bordered containers.' },
    { name: 'contentDensity', type: "'comfortable' | 'compact'", default: "'comfortable'", required: false, description: 'compact reduces cell padding and font size.' },
    { name: 'stripedRows', type: 'boolean', default: 'false', required: false, description: 'Alternates row backgrounds for easier scanning in dense tables.' },
    { name: 'wrapLines', type: 'boolean', default: 'false', required: false, description: 'Allows cell text to wrap instead of truncating with ellipsis.' },
    { name: 'stickyHeader', type: 'boolean', default: 'false', required: false, description: 'Keeps the column header row visible while scrolling down.' },
    { name: 'stickyHeaderVerticalOffset', type: 'number', default: '0', required: false, description: 'Vertical offset (px) for the sticky header. Use when a fixed top bar (e.g. Nav) is present.' },
    { name: 'resizableColumns', type: 'boolean', default: 'false', required: false, description: 'Adds a drag handle at the right edge of each column header. Pointer-based, touch-friendly.' },
    { name: 'columnDisplay', type: "ReadonlyArray<{ id: string; visible?: boolean }>", default: '—', required: false, description: 'Controls visible columns and their order. Columns with visible: false are hidden. Omit to show all columns in columnDefinitions order.' },
    { name: 'stickyColumns', type: '{ first?: number; last?: number }', default: '—', required: false, description: 'Number of leading and/or trailing columns to pin while scrolling horizontally. Requires columns to have explicit widths for accurate offsets.' },
    { name: 'loading', type: 'boolean', default: 'false', required: false, description: 'Shows a progress bar above the table and skeleton rows when items is empty. Sets aria-busy on the grid.' },
    { name: 'loadingText', type: 'string', default: '—', required: false, description: 'Accessible label for the loading progress bar.' },
    { name: 'header', type: 'ReactNode', default: '—', required: false, description: 'Slot rendered above the filter bar. Use for the table title and action buttons.' },
    { name: 'filter', type: 'ReactNode', default: '—', required: false, description: 'Slot rendered below the header. Use for search input or filter chips.' },
    { name: 'pagination', type: 'ReactNode', default: '—', required: false, description: 'Slot rendered below the table scroll area. Use for a Pagination component.' },
    { name: 'footer', type: 'ReactNode', default: '—', required: false, description: 'Slot rendered at the very bottom. Use for item counts, totals, or status text.' },
    { name: 'empty', type: 'ReactNode', default: "'No items to display.'", required: false, description: 'Shown when items is empty and loading is false.' },
    { name: 'onRowClick', type: '(detail: { item: T; rowIndex: number }) => void', default: '—', required: false, description: 'Called when the user clicks a data row. Rows render with cursor: pointer when this is set.' },
    { name: 'ariaLabel', type: 'string', default: '—', required: false, description: 'Accessible name for the table. Prefer this over ariaLabels.tableLabel.' },
    { name: 'totalItemsCount', type: 'number', default: '—', required: false, description: 'Total item count across all pages. Used for aria-rowcount and the live region announcement.' },
    { name: 'firstIndex', type: 'number', default: '1', required: false, description: '1-based index of the first visible item. Used with renderAriaLive for pagination announcements.' },
    { name: 'renderAriaLive', type: '(data: { firstIndex, lastIndex, totalItemsCount? }) => string', default: '—', required: false, description: 'Custom function for the aria-live page announcement. Defaults to "Showing items X to Y of Z".' },
    { name: 'enableKeyboardNavigation', type: 'boolean', default: 'false', required: false, description: 'Arrow-key navigation between cells (ARIA grid pattern). The whole table becomes a single tab stop.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the root element.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles. Use for CSS custom property overrides (e.g. --kiln-table-radius: 0).' },
  ],
  testing: `import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Table } from '@doriansmith/kiln';
import type { TableColumnDefinition } from '@doriansmith/kiln';

interface Row { id: string; name: string; role: string; }

const rows: Row[] = [
  { id: '1', name: 'Alice', role: 'Admin'  },
  { id: '2', name: 'Bob',   role: 'Viewer' },
];

const cols: TableColumnDefinition<Row>[] = [
  { id: 'name', header: 'Name', cell: (r) => r.name, sortingField: 'name' },
  { id: 'role', header: 'Role', cell: (r) => r.role },
];

it('renders headers and rows', () => {
  render(<Table columnDefinitions={cols} items={rows} ariaLabel="Users" />);
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Alice')).toBeInTheDocument();
});

it('calls onSortingChange on header click', async () => {
  const user = userEvent.setup();
  const onSortingChange = vi.fn();
  render(
    <Table
      columnDefinitions={cols}
      items={rows}
      onSortingChange={onSortingChange}
      ariaLabel="Users"
    />,
  );
  await user.click(screen.getByText('Name'));
  expect(onSortingChange).toHaveBeenCalledWith(
    expect.objectContaining({ sortingColumn: cols[0], isDescending: false }),
  );
});

it('selects a row via checkbox', async () => {
  const user = userEvent.setup();
  const onSelectionChange = vi.fn();
  render(
    <Table
      columnDefinitions={cols}
      items={rows}
      trackBy="id"
      selectionType="multi"
      selectedItems={[]}
      onSelectionChange={onSelectionChange}
      ariaLabel="Users"
    />,
  );
  const [, firstCheckbox] = screen.getAllByRole('checkbox');
  await user.click(firstCheckbox);
  expect(onSelectionChange).toHaveBeenCalledWith({ selectedItems: [rows[0]] });
});

it('fires onRowClick with item and index', async () => {
  const user = userEvent.setup();
  const onRowClick = vi.fn();
  render(
    <Table
      columnDefinitions={cols}
      items={rows}
      trackBy="id"
      onRowClick={onRowClick}
      ariaLabel="Users"
    />,
  );
  await user.click(screen.getByText('Alice'));
  expect(onRowClick).toHaveBeenCalledWith({ item: rows[0], rowIndex: 0 });
});

it('shows empty slot when items is empty', () => {
  render(
    <Table
      columnDefinitions={cols}
      items={[]}
      ariaLabel="Users"
      empty={<span>No data</span>}
    />,
  );
  expect(screen.getByText('No data')).toBeInTheDocument();
});`,
  usage: `// ── TableColumnDefinition shape ──────────────────────────────────────────────
// id             — unique, used as React key
// header         — ReactNode rendered in the column header
// cell           — (item: T) => ReactNode rendered in each data cell
// sortingField   — property name for built-in sort comparison
// sortingComparator — custom (a, b) => number for complex sort logic
// isRowHeader    — renders the cell as <th scope="row"> for accessibility
// width / minWidth / maxWidth — passed as CSS width values
// ariaLabel      — ({ sorted, descending, disabled }) => string for sort header label

// ── Resizable columns ─────────────────────────────────────────────────────────
<Table
  columnDefinitions={columns}
  items={items}
  resizableColumns
  ariaLabel="Resizable table"
/>

// ── Sticky header + nav offset ────────────────────────────────────────────────
<Table
  columnDefinitions={columns}
  items={items}
  stickyHeader
  stickyHeaderVerticalOffset={64} // height of your Nav bar
  ariaLabel="Sticky header table"
/>

// ── Sticky first and last columns ─────────────────────────────────────────────
<Table
  columnDefinitions={columns}
  items={items}
  stickyColumns={{ first: 1, last: 1 }}
  ariaLabel="Sticky columns table"
/>

// ── Column visibility toggle ──────────────────────────────────────────────────
<Table
  columnDefinitions={columns}
  items={items}
  columnDisplay={[
    { id: 'name',     visible: true  },
    { id: 'role',     visible: false }, // hidden
    { id: 'joined',   visible: true  },
  ]}
  ariaLabel="Custom columns table"
/>

// ── Loading overlay on existing data ─────────────────────────────────────────
<Table
  columnDefinitions={columns}
  items={existingItems}  // still rendered, dimmed by loading bar
  loading={isFetching}
  loadingText="Refreshing…"
  ariaLabel="Refreshing table"
/>

// ── Keyboard grid navigation ──────────────────────────────────────────────────
// Arrow keys navigate between cells, Home/End jump to row/col edges,
// Ctrl+Home / Ctrl+End jump to the first / last cell.
<Table
  columnDefinitions={columns}
  items={items}
  enableKeyboardNavigation
  ariaLabel="Keyboard-navigable table"
/>

// ── Custom token overrides ────────────────────────────────────────────────────
<Table
  columnDefinitions={columns}
  items={items}
  ariaLabel="Custom styled table"
  style={{
    '--kiln-table-radius':       '0',
    '--kiln-table-border':       'var(--kiln-gray-300)',
    '--kiln-table-selected-bg':  'var(--kiln-primary-100)',
    '--kiln-table-cell-py':      '8px',
  } as React.CSSProperties}
/>`,
};
