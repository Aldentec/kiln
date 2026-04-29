import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Nav from './Nav';

const ITEMS = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

describe('Nav', () => {
  it('renders the brand slot', () => {
    render(<Nav logo={<span>MyBrand</span>} items={ITEMS} />);
    // Brand renders in both the bar and the mobile panel portal
    const brands = screen.getAllByText('MyBrand');
    expect(brands.length).toBeGreaterThanOrEqual(1);
    expect(brands[0]).toBeInTheDocument();
  });

  it('renders desktop nav links', () => {
    render(<Nav items={ITEMS} />);
    expect(screen.getAllByRole('link', { name: 'Home' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toBeInTheDocument();
  });

  it('marks the active link via isActive', () => {
    render(<Nav items={ITEMS} isActive={(h) => h === '/about'} />);
    const activeLinks = screen.getAllByRole('link', { name: 'About' });
    const desktopActive = activeLinks.find((el) => el.classList.contains('kiln-nav__link--active'));
    expect(desktopActive).toBeTruthy();
    expect(desktopActive).toHaveAttribute('aria-current', 'page');
  });

  it('renders the actions slot', () => {
    render(<Nav items={ITEMS} actions={<button>Login</button>} />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('mobile trigger opens the panel', () => {
    render(<Nav items={ITEMS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('panel close button closes the panel', () => {
    render(<Nav items={ITEMS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Two "Close navigation menu" buttons exist when open: the trigger + the panel close
    const closeBtns = screen.getAllByRole('button', { name: 'Close navigation menu' });
    // Click the panel's own close button (last in DOM order)
    fireEvent.click(closeBtns[closeBtns.length - 1]);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes the panel on Escape key', () => {
    render(<Nav items={ITEMS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('applies sticky class by default', () => {
    const { container } = render(<Nav items={ITEMS} />);
    expect(container.querySelector('.kiln-nav')).toHaveClass('kiln-nav--sticky');
  });

  it('omits sticky class when sticky=false', () => {
    const { container } = render(<Nav items={ITEMS} sticky={false} />);
    expect(container.querySelector('.kiln-nav')).not.toHaveClass('kiln-nav--sticky');
  });

  it('calls onNavigate when a desktop link is clicked', () => {
    const onNavigate = vi.fn();
    render(<Nav items={ITEMS} onNavigate={onNavigate} />);
    const links = screen.getAllByRole('link', { name: 'Home' });
    fireEvent.click(links[0]);
    expect(onNavigate).toHaveBeenCalledWith('/home', expect.any(Object));
  });
});
