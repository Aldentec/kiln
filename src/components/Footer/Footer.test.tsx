import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

const links = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: 'https://example.com', label: 'External', external: true },
];

describe('Footer', () => {
  it('renders footer landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<Footer links={links} />);
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('adds target=_blank to external links', () => {
    render(<Footer links={links} />);
    const ext = screen.getByText('External').closest('a');
    expect(ext).toHaveAttribute('target', '_blank');
    expect(ext).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders copyright text', () => {
    render(<Footer copyright="© 2025 Kiln" />);
    expect(screen.getByText('© 2025 Kiln')).toBeInTheDocument();
  });

  it('renders logo slot', () => {
    render(<Footer logo={<span>MyLogo</span>} />);
    expect(screen.getByText('MyLogo')).toBeInTheDocument();
  });
});
