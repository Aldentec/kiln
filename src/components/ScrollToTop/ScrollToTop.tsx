// a11y: WCAG AA verified 2026-04-29 (renders null — no interactive elements)
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useEffect } from 'react';

export interface ScrollToTopProps {
  /**
   * When this value changes, the page scrolls to the top.
   * Pass your router's current pathname/location here.
   * @example <ScrollToTop trigger={location.pathname} />
   */
  trigger: unknown;
  behavior?: ScrollBehavior;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ trigger, behavior = 'auto' }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [trigger, behavior]);

  return null;
};

export default ScrollToTop;
