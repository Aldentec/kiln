import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the message', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('does not render retry button without retryAction', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders and triggers retry button', () => {
    const retry = vi.fn();
    render(<ErrorMessage message="Error" retryAction={retry} retryLabel="Try again" />);
    const btn = screen.getByRole('button', { name: 'Try again' });
    fireEvent.click(btn);
    expect(retry).toHaveBeenCalledOnce();
  });
});
