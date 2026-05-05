import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RadioButton from './RadioButton';

describe('RadioButton', () => {
  it('renders with label text', () => {
    render(<RadioButton>Option A</RadioButton>);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<RadioButton description="Helper text">Option</RadioButton>);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('links description via aria-describedby', () => {
    render(<RadioButton description="Helper text">Option</RadioButton>);
    const input = screen.getByRole('radio');
    const desc = screen.getByText('Helper text');
    expect(input).toHaveAttribute('aria-describedby', desc.id);
  });

  it('is unchecked by default', () => {
    render(<RadioButton>Option</RadioButton>);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('respects defaultChecked', () => {
    render(<RadioButton defaultChecked>Option</RadioButton>);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('respects controlled checked prop', () => {
    render(<RadioButton checked onChange={() => {}}>Option</RadioButton>);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('fires onChange when clicked', () => {
    const onChange = vi.fn();
    render(<RadioButton onChange={onChange}>Option</RadioButton>);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn();
    render(<RadioButton disabled onChange={onChange}>Option</RadioButton>);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has disabled attribute when disabled', () => {
    render(<RadioButton disabled>Option</RadioButton>);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('does not fire onChange when readOnly', () => {
    const onChange = vi.fn();
    render(<RadioButton readOnly onChange={onChange}>Option</RadioButton>);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards name and value props', () => {
    render(<RadioButton name="group" value="opt1">Option</RadioButton>);
    const input = screen.getByRole('radio');
    expect(input).toHaveAttribute('name', 'group');
    expect(input).toHaveAttribute('value', 'opt1');
  });

  it('uses provided id', () => {
    render(<RadioButton id="my-radio">Option</RadioButton>);
    expect(screen.getByRole('radio')).toHaveAttribute('id', 'my-radio');
  });

  it('auto-generates id when omitted', () => {
    render(<RadioButton>Option</RadioButton>);
    const input = screen.getByRole('radio');
    expect(input.id).toBeTruthy();
  });

  it('label htmlFor matches input id', () => {
    const { container } = render(<RadioButton>Option</RadioButton>);
    const label = container.querySelector('label')!;
    const input = screen.getByRole('radio');
    expect(label.htmlFor).toBe(input.id);
  });

  it('applies className to root label', () => {
    const { container } = render(<RadioButton className="custom">Option</RadioButton>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies style to root label', () => {
    const { container } = render(
      <RadioButton style={{ marginTop: '8px' }}>Option</RadioButton>,
    );
    expect((container.firstChild as HTMLElement).style.marginTop).toBe('8px');
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<RadioButton ref={ref}>Option</RadioButton>);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('radio');
  });

  it('renders kiln-radio--disabled class when disabled', () => {
    const { container } = render(<RadioButton disabled>Option</RadioButton>);
    expect(container.firstChild).toHaveClass('kiln-radio--disabled');
  });

  it('renders kiln-radio--readonly class when readOnly', () => {
    const { container } = render(<RadioButton readOnly>Option</RadioButton>);
    expect(container.firstChild).toHaveClass('kiln-radio--readonly');
  });
});
