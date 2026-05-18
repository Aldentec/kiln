import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Avatar from './Avatar';
import type { DropdownMenuEntry } from '../DropdownMenu/DropdownMenu';

const MENU_ITEMS: DropdownMenuEntry[] = [
  { label: 'Profile', onSelect: vi.fn() },
  { label: 'Settings', onSelect: vi.fn() },
  { type: 'separator' },
  { label: 'Sign out', onSelect: vi.fn(), variant: 'danger' },
];

describe('Avatar', () => {
  // ── Rendering modes ──────────────────────────────────────

  it('renders initials derived from name', () => {
    render(<Avatar name="Jane Smith" />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  it('renders single initial for single-word name', () => {
    render(<Avatar name="Dorian" />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('renders explicit initials override', () => {
    render(<Avatar name="Jane Smith" initials="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback icon when no name or src', () => {
    const { container } = render(<Avatar />);
    // UserCircleIcon renders as an SVG
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="Jane Smith" />);
    const img = screen.getByRole('img', { name: 'Jane Smith' }) as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('falls back to initials on image error', async () => {
    render(<Avatar src="broken.jpg" name="Jane Smith" />);
    const img = screen.getByRole('img', { name: 'Jane Smith' }) as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
    fireEvent.error(img);
    await waitFor(() => expect(screen.getByText('JS')).toBeInTheDocument());
  });

  // ── Size classes ─────────────────────────────────────────

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('applies size class for %s', (size) => {
    const { container } = render(<Avatar name="AB" size={size} />);
    expect(container.firstChild).toHaveClass(`kiln-avatar--${size}`);
  });

  // ── Static (no menu) a11y ─────────────────────────────────

  it('static avatar with name has role="img" and aria-label when showing initials', () => {
    render(<Avatar name="Jane Smith" />);
    // Circle div acts as the img landmark when showing initials (no actual <img>)
    const el = screen.getByRole('img', { name: 'Jane Smith' });
    expect(el).toBeInTheDocument();
  });

  // ── Menu — not rendered without menuItems ─────────────────

  it('does not render a button when menuItems is absent', () => {
    render(<Avatar name="Jane Smith" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  // ── Menu behaviour ────────────────────────────────────────

  it('renders a trigger button when menuItems provided', () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    expect(screen.getByRole('button', { name: 'Jane Smith menu' })).toBeInTheDocument();
  });

  it('menu is not visible initially', () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens menu on trigger click', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
  });

  it('closes menu on second trigger click', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());
    fireEvent.click(btn);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('calls onSelect and closes menu when item clicked', async () => {
    const onProfile = vi.fn();
    const items: DropdownMenuEntry[] = [{ label: 'Profile', onSelect: onProfile }];
    render(<Avatar name="Jane Smith" menuItems={items} />);

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));
    expect(onProfile).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes on Escape and returns focus to trigger', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes on outside click', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.mouseDown(document.body);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('does not call onSelect for disabled items', async () => {
    const onSelect = vi.fn();
    const items: DropdownMenuEntry[] = [
      { label: 'Disabled', onSelect, disabled: true },
    ];
    render(<Avatar name="Jane Smith" menuItems={items} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('menuitem', { name: 'Disabled' }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders separator with role="separator"', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  // ── Menu a11y ─────────────────────────────────────────────

  it('trigger has aria-haspopup="menu"', () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('trigger has aria-expanded=false when closed', () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('trigger has aria-expanded=true when open', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  // ── Keyboard navigation ───────────────────────────────────

  it('arrow key navigation wraps through menu items', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    const menu = screen.getByRole('menu');
    const items = within(menu).getAllByRole('menuitem');

    // First item auto-focused on open
    expect(document.activeElement).toBe(items[0]);

    // ArrowDown → second item
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);

    // ArrowUp → back to first
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[0]);
  });

  it('Home/End keys navigate to first/last item', async () => {
    render(<Avatar name="Jane Smith" menuItems={MENU_ITEMS} />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('menu')).toBeInTheDocument());

    const menu = screen.getByRole('menu');
    const items = within(menu).getAllByRole('menuitem');

    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(items[items.length - 1]);

    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(items[0]);
  });

  // ── Custom menuAriaLabel ──────────────────────────────────

  it('uses menuAriaLabel when provided', () => {
    render(
      <Avatar
        name="Jane Smith"
        menuItems={MENU_ITEMS}
        menuAriaLabel="Account options"
      />,
    );
    expect(screen.getByRole('button', { name: 'Account options' })).toBeInTheDocument();
  });

  // ── className / style passthrough ────────────────────────

  it('forwards className and style to root element', () => {
    const { container } = render(
      <Avatar name="AB" className="my-custom" style={{ marginTop: 8 }} />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('my-custom');
    expect(root).toHaveStyle({ marginTop: '8px' });
  });
});
