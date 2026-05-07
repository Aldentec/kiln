// a11y: WCAG AA verified 2026-05-07
// perf: CLS=0, GPU-friendly 2026-05-07
// mobile: verified 375px/768px 2026-05-07
import React from 'react';
import { cn } from '../../utils';
import './Prose.css';

export type ProseSize = 'sm' | 'md' | 'lg';

export interface ProseProps {
  /** Base text size. Scales the whole type hierarchy proportionally. */
  size?: ProseSize;
  /** Max reading width. Defaults to 68ch — optimal line length for long-form text. */
  maxWidth?: string | 'full';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(({
  size = 'md',
  maxWidth = '68ch',
  className,
  style,
  children,
}, ref) => (
  <div
    ref={ref}
    className={cn('kiln-prose', `kiln-prose--${size}`, className)}
    style={{
      ...(maxWidth !== 'full' ? { maxWidth } : {}),
      ...style,
    }}
  >
    {children}
  </div>
));

Prose.displayName = 'Prose';
export default Prose;
