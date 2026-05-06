import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import List from './List';
import type { KilnListItem } from './List';

const fruits: KilnListItem[] = [
  { id: '1', content: 'Apples',   announcementLabel: 'Apples' },
  { id: '2', content: 'Bananas',  announcementLabel: 'Bananas' },
  { id: '3', content: 'Cherries', announcementLabel: 'Cherries' },
];

describe('List', () => {
  it('renders all items', () => {
    render(<List items={fruits} />);
    expect(screen.getByText('Apples')).toBeInTheDocument();
    expect(screen.getByText('Bananas')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();
  });

  it('renders as a <ul> by default', () => {
    const { container } = render(<List items={fruits} />);
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('renders as <ol> when tagOverride is set', () => {
    const { container } = render(<List items={fruits} tagOverride="ol" />);
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('applies aria-label to the list', () => {
    render(<List items={fruits} ariaLabel="Fruit list" />);
    expect(screen.getByRole('list', { name: 'Fruit list' })).toBeInTheDocument();
  });

  it('renders secondary content when provided', () => {
    const items: KilnListItem[] = [
      { id: '1', content: 'Apples', secondaryContent: 'Fresh and crisp' },
    ];
    render(<List items={items} />);
    expect(screen.getByText('Fresh and crisp')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const items: KilnListItem[] = [
      { id: '1', content: 'Apples', icon: <span data-testid="icon">🍎</span> },
    ];
    render(<List items={items} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    const items: KilnListItem[] = [
      { id: '1', content: 'Apples', actions: <button>Delete</button> },
    ];
    render(<List items={items} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('renders item body as a link when href is set', () => {
    const items: KilnListItem[] = [
      { id: '1', content: 'Apples', href: 'https://example.com' },
    ];
    render(<List items={items} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('applies kiln-list--sortable class when sortable is true', () => {
    const { container } = render(<List items={fruits} sortable />);
    expect(container.querySelector('.kiln-list--sortable')).toBeInTheDocument();
  });

  it('does not render drag handles when sortable is false', () => {
    render(<List items={fruits} />);
    expect(screen.queryByRole('button', { name: /reorder/i })).not.toBeInTheDocument();
  });

  it('renders drag handles when sortable is true', () => {
    render(<List items={fruits} sortable ariaLabel="Fruit list" />);
    const handles = screen.getAllByRole('button', { name: /reorder/i });
    expect(handles).toHaveLength(3);
  });

  it('does not render drag handles when sortDisabled is true', () => {
    render(<List items={fruits} sortable sortDisabled />);
    expect(screen.queryByRole('button', { name: /reorder/i })).not.toBeInTheDocument();
  });

  it('handle aria-label includes item label', () => {
    render(<List items={fruits} sortable />);
    expect(screen.getByRole('button', { name: 'Reorder Apples' })).toBeInTheDocument();
  });

  it('handle aria-pressed is false initially', () => {
    render(<List items={fruits} sortable />);
    const handle = screen.getByRole('button', { name: 'Reorder Apples' });
    expect(handle).toHaveAttribute('aria-pressed', 'false');
  });

  it('keyboard: Space lifts item and sets aria-pressed to true', async () => {
    const user = userEvent.setup();
    render(<List items={fruits} sortable />);
    const handle = screen.getByRole('button', { name: 'Reorder Apples' });
    handle.focus();
    await user.keyboard(' ');
    expect(handle).toHaveAttribute('aria-pressed', 'true');
  });

  it('keyboard: Escape after lifting cancels without calling onReorder', async () => {
    const user = userEvent.setup();
    const onReorder = vi.fn();
    render(<List items={fruits} sortable onReorder={onReorder} />);
    const handle = screen.getByRole('button', { name: 'Reorder Apples' });
    handle.focus();
    await user.keyboard(' ');
    await user.keyboard('{Escape}');
    expect(onReorder).not.toHaveBeenCalled();
    expect(handle).toHaveAttribute('aria-pressed', 'false');
  });

  it('keyboard: ArrowDown + Space reorders the lifted item one position down', async () => {
    const user = userEvent.setup();
    const onReorder = vi.fn();
    render(<List items={fruits} sortable onReorder={onReorder} />);
    const handle = screen.getByRole('button', { name: 'Reorder Apples' });
    handle.focus();
    await user.keyboard(' ');
    await user.keyboard('{ArrowDown}');
    await user.keyboard(' ');
    expect(onReorder).toHaveBeenCalledTimes(1);
    const newItems: KilnListItem[] = onReorder.mock.calls[0][0];
    expect(newItems[0].id).toBe('2');
    expect(newItems[1].id).toBe('1');
    expect(newItems[2].id).toBe('3');
  });

  it('keyboard: ArrowUp does not move past the first position', async () => {
    const user = userEvent.setup();
    const onReorder = vi.fn();
    render(<List items={fruits} sortable onReorder={onReorder} />);
    const handle = screen.getByRole('button', { name: 'Reorder Apples' });
    handle.focus();
    await user.keyboard(' ');
    await user.keyboard('{ArrowUp}');
    await user.keyboard(' ');
    // Dropped at same position — no meaningful reorder
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('applies kiln-list--no-paddings when disablePaddings is true', () => {
    const { container } = render(<List items={fruits} disablePaddings />);
    expect(container.querySelector('.kiln-list--no-paddings')).toBeInTheDocument();
  });

  it('renders an aria-live region for reorder announcements', () => {
    const { container } = render(<List items={fruits} sortable />);
    expect(container.querySelector('[role="status"][aria-live="assertive"]')).toBeInTheDocument();
  });

  it('disabled items receive kiln-list__item--disabled class', () => {
    const items: KilnListItem[] = [{ id: '1', content: 'Apples', disabled: true }];
    const { container } = render(<List items={items} />);
    expect(container.querySelector('.kiln-list__item--disabled')).toBeInTheDocument();
  });
});
