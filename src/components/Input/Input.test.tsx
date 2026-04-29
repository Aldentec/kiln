import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label and associates it', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('applies error variant and renders error text', () => {
    render(<Input label="Name" errorText="Required" />);
    expect(screen.getByRole('textbox')).toHaveClass('kiln-input--error');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders helper text when no error', () => {
    render(<Input helperText="Enter your email" />);
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
  });

  it('hides helper text when error present', () => {
    render(<Input helperText="Helper" errorText="Error!" />);
    expect(screen.queryByText('Helper')).toBeNull();
  });

  it('renders left and right icons', () => {
    render(<Input leftIcon={<span>@</span>} rightIcon={<span>✓</span>} />);
    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});
