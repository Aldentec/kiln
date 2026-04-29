import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavMenu from './NavMenu';

const items = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
];

describe('NavMenu', () => {
  it('renders all nav items', () => {
    render(<NavMenu items={items} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('marks active link via isActive prop', () => {
    render(<NavMenu items={items} isActive={(href) => href === '/home'} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass('kiln-nav-menu__link--active');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNavigate when a link is clicked', () => {
    const onNavigate = vi.fn();
    render(<NavMenu items={items} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('Home'));
    expect(onNavigate).toHaveBeenCalledWith('/home', expect.anything());
  });

  it('applies custom ariaLabel', () => {
    render(<NavMenu items={items} ariaLabel="Primary nav" />);
    expect(screen.getByRole('navigation', { name: 'Primary nav' })).toBeInTheDocument();
  });
});
