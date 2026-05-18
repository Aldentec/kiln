import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  // ── Rendering ──────────────────────────────────────────────

  it('renders a checkbox with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Checkbox label="Subscribe" helperText="You can unsubscribe at any time" />);
    expect(screen.getByText('You can unsubscribe at any time')).toBeInTheDocument();
  });

  it('renders error text with role="alert"', () => {
    render(<Checkbox label="Agree" errorText="You must agree to continue" />);
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('You must agree to continue');
  });

  it('hides helper text when errorText is set', () => {
    render(<Checkbox label="Agree" helperText="Helper" errorText="Error" />);
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  // ── State ──────────────────────────────────────────────────

  it('is unchecked by default', () => {
    render(<Checkbox label="Option" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('reflects defaultChecked', () => {
    render(<Checkbox label="Option" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles on click (uncontrolled)', () => {
    render(<Checkbox label="Option" />);
    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(cb).toBeChecked();
    fireEvent.click(cb);
    expect(cb).not.toBeChecked();
  });

  it('calls onChange with new value on click', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Option" onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('respects controlled checked prop', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Checkbox label="Option" checked={false} onChange={onChange} />);
    const cb = screen.getByRole('checkbox');
    expect(cb).not.toBeChecked();
    rerender(<Checkbox label="Option" checked={true} onChange={onChange} />);
    expect(cb).toBeChecked();
  });

  it('does not update internal state when controlled', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Option" checked={false} onChange={onChange} />);
    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(cb).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  // ── Disabled ───────────────────────────────────────────────

  it('is disabled when disabled prop is set', () => {
    render(<Checkbox label="Locked" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Locked" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // ── Accessibility ──────────────────────────────────────────

  it('sets aria-invalid when errorText is present', () => {
    render(<Checkbox label="Agree" errorText="Required" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid without errorText', () => {
    render(<Checkbox label="Option" />);
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid');
  });

  it('links error text via aria-describedby', () => {
    render(<Checkbox label="Agree" errorText="Required" />);
    const cb = screen.getByRole('checkbox');
    const describedBy = cb.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).toHaveTextContent('Required');
  });

  it('links helper text via aria-describedby', () => {
    render(<Checkbox label="Subscribe" helperText="Optional" />);
    const cb = screen.getByRole('checkbox');
    const describedBy = cb.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const helperEl = document.getElementById(describedBy!);
    expect(helperEl).toHaveTextContent('Optional');
  });

  it('label is linked to input via htmlFor', () => {
    render(<Checkbox label="Accept" />);
    const cb = screen.getByRole('checkbox');
    const label = screen.getByText('Accept').closest('label');
    expect(label).toHaveAttribute('for', cb.id);
  });

  // ── LabelHidden ────────────────────────────────────────────

  it('label text is still in DOM when labelHidden', () => {
    render(<Checkbox label="Hidden label" labelHidden />);
    // The span is in DOM but visually hidden
    expect(screen.getByText('Hidden label')).toBeInTheDocument();
  });

  // ── Size classes ───────────────────────────────────────────

  it.each(['sm', 'md', 'lg'] as const)('applies size class for %s', (size) => {
    const { container } = render(<Checkbox label="Option" size={size} />);
    expect(container.firstChild).toHaveClass(`kiln-checkbox-field--${size}`);
  });

  // ── Error class ────────────────────────────────────────────

  it('applies error class when errorText is set', () => {
    const { container } = render(<Checkbox label="Agree" errorText="Required" />);
    expect(container.firstChild).toHaveClass('kiln-checkbox-field--error');
  });

  // ── className / style ──────────────────────────────────────

  it('forwards className to root element', () => {
    const { container } = render(<Checkbox label="Option" className="my-check" />);
    expect(container.firstChild).toHaveClass('my-check');
  });
});
