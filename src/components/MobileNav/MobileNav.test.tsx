import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MobileNav from './MobileNav';

const items = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About' },
];

describe('MobileNav', () => {
  it('renders the hamburger trigger', () => {
    render(<MobileNav items={items} />);
    expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument();
  });

  it('opens panel on trigger click', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('closes panel on close button click', () => {
    render(<MobileNav items={items} />);
    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByLabelText('Close navigation menu'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders logo slot', () => {
    render(<MobileNav items={items} logo={<span>MyLogo</span>} />);
    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
  });

  it('calls onNavigate when a link is clicked', () => {
    const onNavigate = vi.fn();
    render(<MobileNav items={items} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    fireEvent.click(screen.getByText('Home'));
    expect(onNavigate).toHaveBeenCalledWith('/home', expect.anything());
  });
});
