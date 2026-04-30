import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import type { DropdownMenuEntry } from './DropdownMenu';

const ITEMS: DropdownMenuEntry[] = [
  { label: 'Edit', onSelect: vi.fn() },
  { label: 'Duplicate', onSelect: vi.fn() },
  { type: 'separator' },
  { label: 'Delete', onSelect: vi.fn(), variant: 'danger' },
];

function Trigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props}>Open</button>;
}

function setup(overrides?: Partial<React.ComponentProps<typeof DropdownMenu>>) {
  return render(
    <DropdownMenu
      trigger={<Trigger />}
      items={ITEMS}
      {...overrides}
    />,
  );
}

describe('DropdownMenu', () => {
  it('menu is not visible initially', () => {
    setup();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens menu on trigger click', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
  });

  it('closes menu on second trigger click', async () => {
    setup();
    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    fireEvent.click(trigger);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('renders items with menuitem role', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => {
      const menu = screen.getByRole('menu');
      const menuItems = within(menu).getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3); // 3 items (separator not a menuitem)
    });
  });

  it('closes and calls onSelect when item clicked', async () => {
    const onEdit = vi.fn();
    const items: DropdownMenuEntry[] = [{ label: 'Edit', onSelect: onEdit }];
    render(<DropdownMenu trigger={<Trigger />} items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes on Escape key', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes on outside click', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.mouseDown(document.body);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('does not call onSelect for disabled items', async () => {
    const onSelect = vi.fn();
    const items: DropdownMenuEntry[] = [
      { label: 'Disabled item', onSelect, disabled: true },
    ];
    render(<DropdownMenu trigger={<Trigger />} items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('menuitem'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('trigger has aria-haspopup="menu"', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Open' }))
      .toHaveAttribute('aria-haspopup', 'menu');
  });

  it('trigger has aria-expanded=false when closed', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Open' }))
      .toHaveAttribute('aria-expanded', 'false');
  });

  it('trigger has aria-expanded=true when open', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Open' }))
        .toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('arrow key navigation works', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    const menu = screen.getByRole('menu');
    const [first, second] = within(menu).getAllByRole('menuitem');

    // First item should be focused on open
    expect(document.activeElement).toBe(first);

    // ArrowDown → second item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(second);

    // ArrowUp → back to first
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(first);
  });

  it('Home/End keys navigate to first/last item', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    const menu = screen.getByRole('menu');
    const menuItems = within(menu).getAllByRole('menuitem');
    const last = menuItems[menuItems.length - 1];
    const first = menuItems[0];

    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(last);

    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(first);
  });

  it('renders separator with role="separator"', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => {
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});
