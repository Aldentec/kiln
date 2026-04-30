import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeBlock from './CodeBlock';

describe('CodeBlock', () => {
  it('renders code content', () => {
    render(<CodeBlock code="npm install @doriansmith/kiln" />);
    expect(screen.getByText('npm install @doriansmith/kiln')).toBeInTheDocument();
  });

  it('shows language label when provided', () => {
    render(<CodeBlock code="const x = 1;" language="tsx" />);
    expect(screen.getByText('tsx')).toBeInTheDocument();
  });

  it('does not show language label when omitted', () => {
    const { container } = render(<CodeBlock code="hello" />);
    expect(container.querySelector('.kiln-code-block__lang')).not.toBeInTheDocument();
  });

  it('renders copy button by default', () => {
    render(<CodeBlock code="hello" />);
    expect(screen.getByRole('button', { name: /copy code to clipboard/i })).toBeInTheDocument();
  });

  it('hides copy button when showCopy is false', () => {
    render(<CodeBlock code="hello" showCopy={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('hides toolbar entirely when no language and showCopy false', () => {
    const { container } = render(<CodeBlock code="hello" showCopy={false} />);
    expect(container.querySelector('.kiln-code-block__toolbar')).not.toBeInTheDocument();
  });

  it('accepts className prop', () => {
    const { container } = render(<CodeBlock code="x" className="my-class" />);
    expect(container.querySelector('.kiln-code-block')).toHaveClass('my-class');
  });

  it('accepts style prop', () => {
    const { container } = render(<CodeBlock code="x" style={{ marginTop: '1rem' }} />);
    const el = container.querySelector('.kiln-code-block') as HTMLElement;
    expect(el.style.marginTop).toBe('1rem');
  });

  describe('copy button', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      });
    });

    it('copies code to clipboard on click', async () => {
      render(<CodeBlock code="npm install" />);
      fireEvent.click(screen.getByRole('button', { name: /copy code to clipboard/i }));
      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('npm install');
      });
    });

    it('shows copied state after clicking', async () => {
      render(<CodeBlock code="hello" />);
      fireEvent.click(screen.getByRole('button', { name: /copy code to clipboard/i }));
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /copied to clipboard/i })).toBeInTheDocument();
      });
    });

    it('announces copy confirmation to screen readers', async () => {
      render(<CodeBlock code="hello" />);
      fireEvent.click(screen.getByRole('button', { name: /copy code to clipboard/i }));
      await waitFor(() => {
        expect(screen.getByRole('status')).toHaveTextContent('Copied to clipboard');
      });
    });

    it('silent-fails when clipboard API is unavailable', async () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockRejectedValue(new Error('Not allowed')) },
        writable: true,
        configurable: true,
      });
      render(<CodeBlock code="hello" />);
      // Should not throw
      expect(() =>
        fireEvent.click(screen.getByRole('button', { name: /copy code to clipboard/i })),
      ).not.toThrow();
    });
  });
});
