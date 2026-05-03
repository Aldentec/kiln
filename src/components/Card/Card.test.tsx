import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Card variant="raised">R</Card>);
    expect(container.firstChild).toHaveClass('kiln-card--raised');
  });

  it('applies hover-lift class', () => {
    const { container } = render(<Card hoverLift>H</Card>);
    expect(container.firstChild).toHaveClass('kiln-card--hover-lift');
  });

  it('renders as button with role when onClick provided', () => {
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Click</Card>);
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as custom element via as prop', () => {
    render(<Card as="article">Article</Card>);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('coming-soon variant renders default title', () => {
    render(<Card variant="coming-soon" />);
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });

  it('coming-soon variant renders custom title and description', () => {
    render(
      <Card variant="coming-soon" title="In progress" description="Back shortly." />,
    );
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Back shortly.')).toBeInTheDocument();
  });
});
