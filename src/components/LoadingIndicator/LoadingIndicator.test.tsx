import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders with default message', () => {
    render(<LoadingIndicator />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<LoadingIndicator message="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('applies fullscreen class', () => {
    render(<LoadingIndicator fullScreen />);
    expect(screen.getByRole('status')).toHaveClass('kiln-loading-indicator--fullscreen');
  });

  it('applies inline class', () => {
    render(<LoadingIndicator inline />);
    expect(screen.getByRole('status')).toHaveClass('kiln-loading-indicator--inline');
  });

  it('renders spinner element', () => {
    render(<LoadingIndicator />);
    expect(document.querySelector('.kiln-spinner')).toBeInTheDocument();
  });
});
