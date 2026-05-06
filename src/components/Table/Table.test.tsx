import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Table from './Table';
import type { TableColumnDefinition } from './Table';

interface Row {
  id: string;
  name: string;
  role: string;
  status: string;
}

const rows: Row[] = [
  { id: '1', name: 'Alice', role: 'Admin',  status: 'active'   },
  { id: '2', name: 'Bob',   role: 'Editor', status: 'inactive' },
  { id: '3', name: 'Carol', role: 'Viewer', status: 'active'   },
];

const cols: TableColumnDefinition<Row>[] = [
  { id: 'name',   header: 'Name',   cell: (r) => r.name,   sortingField: 'name'   },
  { id: 'role',   header: 'Role',   cell: (r) => r.role,   sortingField: 'role'   },
  { id: 'status', header: 'Status', cell: (r) => r.status, sortingField: 'status' },
];

// ── Basic rendering ────────────────────────────────────────────────────────────

describe('Table — rendering', () => {
  it('renders column headers', () => {
    render(<Table columnDefinitions={cols} items={rows} ariaLabel="Users" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders item data', () => {
    render(<Table columnDefinitions={cols} items={rows} ariaLabel="Users" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('shows empty state when items is empty', () => {
    render(<Table columnDefinitions={cols} items={[]} ariaLabel="Users" />);
    expect(screen.getByText(/no items/i)).toBeInTheDocument();
  });

  it('shows custom empty slot', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={[]}
        ariaLabel="Users"
        empty={<span>Nothing here</span>}
      />,
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders header, filter, pagination and footer slots', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        header={<span>Header slot</span>}
        filter={<span>Filter slot</span>}
        pagination={<span>Pagination slot</span>}
        footer={<span>Footer slot</span>}
        ariaLabel="Users"
      />,
    );
    expect(screen.getByText('Header slot')).toBeInTheDocument();
    expect(screen.getByText('Filter slot')).toBeInTheDocument();
    expect(screen.getByText('Pagination slot')).toBeInTheDocument();
    expect(screen.getByText('Footer slot')).toBeInTheDocument();
  });

  it('shows loading bar and skeleton rows when loading with no items', () => {
    const { container } = render(
      <Table columnDefinitions={cols} items={[]} loading ariaLabel="Users" />,
    );
    expect(container.querySelector('.kiln-table__loading-bar')).toBeInTheDocument();
    expect(container.querySelectorAll('.kiln-table__tr--skeleton').length).toBeGreaterThan(0);
  });

  it('sets aria-busy when loading', () => {
    render(<Table columnDefinitions={cols} items={[]} loading ariaLabel="Users" />);
    expect(screen.getByRole('grid')).toHaveAttribute('aria-busy', 'true');
  });

  it('applies variant class', () => {
    const { container } = render(
      <Table columnDefinitions={cols} items={rows} variant="borderless" ariaLabel="Users" />,
    );
    expect(container.firstChild).toHaveClass('kiln-table--borderless');
  });

  it('applies compact class', () => {
    const { container } = render(
      <Table columnDefinitions={cols} items={rows} contentDensity="compact" ariaLabel="Users" />,
    );
    expect(container.firstChild).toHaveClass('kiln-table--compact');
  });

  it('respects columnDisplay to hide a column', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        columnDisplay={[
          { id: 'name', visible: true },
          { id: 'role', visible: false },
          { id: 'status', visible: true },
        ]}
        ariaLabel="Users"
      />,
    );
    expect(screen.queryByText('Role')).not.toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});

// ── Selection ──────────────────────────────────────────────────────────────────

describe('Table — selection', () => {
  it('renders checkboxes for multi-select', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        selectionType="multi"
        selectedItems={[]}
        onSelectionChange={vi.fn()}
        ariaLabel="Users"
      />,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    // 1 header + 3 rows
    expect(checkboxes).toHaveLength(4);
  });

  it('calls onSelectionChange when a row checkbox is clicked', async () => {
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
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]); // first row checkbox
    expect(onSelectionChange).toHaveBeenCalledWith({ selectedItems: [rows[0]] });
  });

  it('renders radio buttons for single-select', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        selectionType="single"
        selectedItems={[]}
        onSelectionChange={vi.fn()}
        ariaLabel="Users"
      />,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('selects all via the header checkbox', async () => {
    const user = userEvent.setup();

    function Wrapper() {
      const [selected, setSelected] = useState<Row[]>([]);
      return (
        <Table
          columnDefinitions={cols}
          items={rows}
          trackBy="id"
          selectionType="multi"
          selectedItems={selected}
          onSelectionChange={({ selectedItems }) => setSelected(selectedItems)}
          ariaLabel="Users"
        />
      );
    }

    render(<Wrapper />);
    const [selectAll] = screen.getAllByRole('checkbox');
    await user.click(selectAll);

    const checked = screen.getAllByRole('checkbox').filter((cb) => (cb as HTMLInputElement).checked);
    expect(checked.length).toBe(4); // header + 3 rows all checked
  });

  it('marks disabled items as non-interactive', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        trackBy="id"
        selectionType="multi"
        selectedItems={[]}
        onSelectionChange={vi.fn()}
        isItemDisabled={(r) => r.id === '2'}
        ariaLabel="Users"
      />,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[2]).toBeDisabled(); // Bob is item index 1, checkbox index 2
  });
});

// ── Sorting ────────────────────────────────────────────────────────────────────

describe('Table — sorting', () => {
  it('calls onSortingChange when a sortable header is clicked', async () => {
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

  it('toggles sort direction on second click', async () => {
    const user = userEvent.setup();
    const onSortingChange = vi.fn();
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        sortingColumn={cols[0]}
        sortingDescending={false}
        onSortingChange={onSortingChange}
        ariaLabel="Users"
      />,
    );
    await user.click(screen.getByText('Name'));
    expect(onSortingChange).toHaveBeenCalledWith(
      expect.objectContaining({ isDescending: true }),
    );
  });

  it('does not call onSortingChange when sortingDisabled', async () => {
    const user = userEvent.setup();
    const onSortingChange = vi.fn();
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        sortingDisabled
        onSortingChange={onSortingChange}
        ariaLabel="Users"
      />,
    );
    await user.click(screen.getByText('Name'));
    expect(onSortingChange).not.toHaveBeenCalled();
  });

  it('sorts internally when sortingColumn prop is not provided', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Table columnDefinitions={cols} items={rows} ariaLabel="Users" />,
    );

    await user.click(screen.getByText('Name')); // ascending

    const dataRows = container.querySelectorAll('.kiln-table__tbody .kiln-table__tr');
    // Alice sorts first alphabetically
    expect(dataRows[0]).toHaveTextContent('Alice');
  });

  it('sets aria-sort on the sorted column header', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        sortingColumn={cols[0]}
        sortingDescending={false}
        ariaLabel="Users"
      />,
    );
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers.find((h) => within(h).queryByText('Name'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
  });
});

// ── Row click ──────────────────────────────────────────────────────────────────

describe('Table — onRowClick', () => {
  it('fires onRowClick with item and rowIndex', async () => {
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
    await user.click(screen.getByText('Bob'));
    expect(onRowClick).toHaveBeenCalledWith({ item: rows[1], rowIndex: 1 });
  });
});

// ── ARIA ───────────────────────────────────────────────────────────────────────

describe('Table — accessibility', () => {
  it('applies aria-label to the table', () => {
    render(<Table columnDefinitions={cols} items={rows} ariaLabel="My table" />);
    expect(screen.getByRole('grid', { name: 'My table' })).toBeInTheDocument();
  });

  it('sets aria-multiselectable on multi-select tables', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        selectionType="multi"
        selectedItems={[]}
        onSelectionChange={vi.fn()}
        ariaLabel="Users"
      />,
    );
    expect(screen.getByRole('grid')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('applies aria-selected to selected rows', () => {
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        trackBy="id"
        selectionType="multi"
        selectedItems={[rows[0]]}
        onSelectionChange={vi.fn()}
        ariaLabel="Users"
      />,
    );
    const tableRows = screen.getAllByRole('row');
    // Row index 1 is the first data row (index 0 is header)
    expect(tableRows[1]).toHaveAttribute('aria-selected', 'true');
    expect(tableRows[2]).toHaveAttribute('aria-selected', 'false');
  });
});

// ── Keyboard navigation ────────────────────────────────────────────────────────

describe('Table — keyboard navigation', () => {
  it('moves focus to the next cell on ArrowDown', async () => {
    const user = userEvent.setup();
    render(
      <Table
        columnDefinitions={cols}
        items={rows}
        ariaLabel="Users"
        enableKeyboardNavigation
      />,
    );
    const firstCell = document.querySelector<HTMLElement>('[data-grid-row="0"][data-grid-col="0"]');
    firstCell?.focus();
    await user.keyboard('{ArrowDown}');
    const expected = document.querySelector<HTMLElement>('[data-grid-row="1"][data-grid-col="0"]');
    expect(document.activeElement).toBe(expected);
  });
});
