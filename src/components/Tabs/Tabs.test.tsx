import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tabs from './Tabs';

const items = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
];

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Beta' })).toBeInTheDocument();
  });

  it('defaults to first item when no defaultValue', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });

  it('respects defaultValue (uncontrolled)', () => {
    render(<Tabs items={items} defaultValue="b" />);
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('marks active tab with active class', () => {
    render(<Tabs items={items} value="b" />);
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveClass('kiln-tabs__tab--active');
  });

  it('disabled tab is not clickable', () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Gamma' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
