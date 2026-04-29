import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Chip from './Chip';

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>React</Chip>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('has role checkbox', () => {
    render(<Chip>TypeScript</Chip>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('reflects selected state', () => {
    render(<Chip selected>Active</Chip>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('checkbox')).toHaveClass('kiln-chip--selected');
  });

  it('calls onToggle with new value', () => {
    const onToggle = vi.fn();
    render(<Chip onToggle={onToggle}>Click</Chip>);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('does not call onToggle when disabled', () => {
    const onToggle = vi.fn();
    render(<Chip disabled onToggle={onToggle}>Nope</Chip>);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).not.toHaveBeenCalled();
  });
});
