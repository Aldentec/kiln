import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toggle from './Toggle';

describe('Toggle', () => {
  it('renders with role switch', () => {
    render(<Toggle label="Notifications" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Toggle label="Notifications" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('reflects defaultChecked', () => {
    render(<Toggle label="Enabled" defaultChecked />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('toggles on click (uncontrolled)', () => {
    render(<Toggle label="Feature" />);
    const btn = screen.getByRole('switch');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange with new value', () => {
    const onChange = vi.fn();
    render(<Toggle label="Alerts" onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    render(<Toggle label="Locked" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('marks disabled with aria-disabled', () => {
    render(<Toggle label="Locked" disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays label text', () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('respects controlled checked prop', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Toggle label="Sync" checked={false} onChange={onChange} />);
    const btn = screen.getByRole('switch');
    expect(btn).toHaveAttribute('aria-checked', 'false');
    rerender(<Toggle label="Sync" checked={true} onChange={onChange} />);
    expect(btn).toHaveAttribute('aria-checked', 'true');
  });

  it('does not update internal state when controlled', () => {
    const onChange = vi.fn();
    render(<Toggle label="Sync" checked={false} onChange={onChange} />);
    const btn = screen.getByRole('switch');
    fireEvent.click(btn);
    // controlled — aria-checked stays false until parent updates prop
    expect(btn).toHaveAttribute('aria-checked', 'false');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies size class', () => {
    render(<Toggle label="Size" size="lg" />);
    expect(document.querySelector('.kiln-toggle--lg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Toggle label="Custom" className="my-toggle" />);
    expect(document.querySelector('.my-toggle')).toBeInTheDocument();
  });
});
