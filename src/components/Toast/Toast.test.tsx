import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { toast, ToastContainer } from './Toast';

function setup() {
  return render(<ToastContainer />);
}

describe('ToastContainer', () => {
  it('renders nothing when there are no toasts', () => {
    const { container } = setup();
    expect(container.querySelector('.kiln-toast-container')).not.toBeInTheDocument();
  });

  it('shows a success toast', async () => {
    setup();
    act(() => { toast.success('Changes saved'); });
    expect(screen.getByText('Changes saved')).toBeInTheDocument();
  });

  it('shows a toast with title and message', () => {
    setup();
    act(() => { toast.error('Something went wrong', { title: 'Error' }); });
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders all four variants', () => {
    setup();
    act(() => {
      toast.success('Success message');
      toast.error('Error message');
      toast.warning('Warning message');
      toast.info('Info message');
    });
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('renders a dismiss button with accessible label', () => {
    setup();
    act(() => { toast.info('Hello'); });
    expect(screen.getByRole('button', { name: /dismiss notification/i })).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    setup();
    act(() => { toast.success('OK'); });
    // Portal renders to document.body, not the test container
    expect(document.querySelector('.kiln-toast--success')).toBeInTheDocument();
  });

  it('adds exiting class when close button clicked', () => {
    setup();
    act(() => { toast.success('Click to dismiss'); });
    expect(screen.getByText('Click to dismiss')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /dismiss notification/i }));
    expect(document.querySelector('.kiln-toast--exiting')).toBeInTheDocument();
  });

  it('removes toast from DOM after exit animation completes', async () => {
    setup();
    act(() => { toast.success('Exits after animation'); });

    fireEvent.click(screen.getByRole('button', { name: /dismiss notification/i }));

    // jsdom doesn't run CSS animations; fire animationEnd manually to complete dismissal
    const exitingEl = document.querySelector('.kiln-toast--exiting');
    if (exitingEl) act(() => { fireEvent.animationEnd(exitingEl); });

    await waitFor(() => {
      expect(screen.queryByText('Exits after animation')).not.toBeInTheDocument();
    });
  });

  it('respects maxToasts limit', () => {
    render(<ToastContainer maxToasts={2} />);
    act(() => {
      toast.success('Toast A');
      toast.success('Toast B');
      toast.success('Toast C');
    });
    expect(document.querySelectorAll('.kiln-toast').length).toBe(2);
  });

  it('persistent toast (duration: 0) has no progress bar', () => {
    setup();
    act(() => { toast.info('Persistent', { duration: 0 }); });
    expect(screen.getByText('Persistent')).toBeInTheDocument();
    expect(document.querySelector('.kiln-toast__progress')).not.toBeInTheDocument();
  });

  it('has role="status" and aria-live on each toast', () => {
    setup();
    act(() => { toast.info('Announced'); });
    const statusEl = screen.getByRole('status');
    expect(statusEl).toHaveAttribute('aria-live', 'polite');
  });
});

describe('toast function', () => {
  it('is callable without a container (no crash)', () => {
    expect(() => toast.success('No container')).not.toThrow();
    expect(() => toast.error('No container')).not.toThrow();
    expect(() => toast.warning('No container')).not.toThrow();
    expect(() => toast.info('No container')).not.toThrow();
    expect(() => toast.dismiss('fake-id')).not.toThrow();
  });
});
