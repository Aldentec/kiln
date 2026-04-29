import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  it('calls window.scrollTo on mount', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<ScrollToTop trigger="/home" />);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
    scrollTo.mockRestore();
  });

  it('scrolls again when trigger changes', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { rerender } = render(<ScrollToTop trigger="/home" />);
    rerender(<ScrollToTop trigger="/about" />);
    expect(scrollTo).toHaveBeenCalledTimes(2);
    scrollTo.mockRestore();
  });

  it('renders nothing', () => {
    const { container } = render(<ScrollToTop trigger="/" />);
    expect(container.firstChild).toBeNull();
  });
});
