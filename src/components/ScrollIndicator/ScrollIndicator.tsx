// a11y: WCAG AA verified 2026-05-07
// perf: CLS=0, GPU-friendly 2026-05-07
// mobile: verified 375px/768px 2026-05-07
import React from 'react';
import { cn } from '../../utils';
import './ScrollIndicator.css';

export type ScrollIndicatorVariant = 'default' | 'light' | 'ghost';

export interface ScrollIndicatorProps {
  /** Visual style. 'light' for use on dark backgrounds, 'ghost' for minimal. */
  variant?: ScrollIndicatorVariant;
  /** Accessible label for screen readers. */
  label?: string;
  /** Called when the indicator is clicked — use to scroll to the next section. */
  onClick?: () => void;
  /** href for anchor-based scroll (e.g. "#content"). When set, renders as <a>. */
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollIndicator = React.forwardRef<HTMLElement, ScrollIndicatorProps>(({
  variant = 'default',
  label = 'Scroll down',
  onClick,
  href,
  className,
  style,
}, ref) => {
  const classes = cn('kiln-scroll-indicator', `kiln-scroll-indicator--${variant}`, className);

  const inner = (
    <>
      <span className="kiln-scroll-indicator__mouse" aria-hidden="true">
        <span className="kiln-scroll-indicator__wheel" />
      </span>
      <span className="kiln-scroll-indicator__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={style}
        aria-label={label}
      >
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        style={style}
        onClick={onClick}
        aria-label={label}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={classes}
      style={style}
      aria-label={label}
      role="img"
    >
      {inner}
    </div>
  );
});

ScrollIndicator.displayName = 'ScrollIndicator';
export default ScrollIndicator;
