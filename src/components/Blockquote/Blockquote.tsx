// a11y: WCAG AA verified 2026-05-07
// perf: CLS=0, GPU-friendly 2026-05-07
// mobile: verified 375px/768px 2026-05-07
import React from 'react';
import { cn } from '../../utils';
import './Blockquote.css';

export type BlockquoteVariant = 'default' | 'accent' | 'subtle';

export interface BlockquoteProps {
  /** The quoted text. Wrap in a <p> or pass a string. */
  children: React.ReactNode;
  /** Attribution — author name, source, or citation. Rendered in a <footer>. */
  cite?: React.ReactNode;
  /** Visual variant controlling the accent color. */
  variant?: BlockquoteVariant;
  className?: string;
  style?: React.CSSProperties;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(({
  children,
  cite,
  variant = 'default',
  className,
  style,
}, ref) => (
  <blockquote
    ref={ref}
    className={cn('kiln-blockquote', `kiln-blockquote--${variant}`, className)}
    style={style}
  >
    <div className="kiln-blockquote__body">{children}</div>
    {cite && <footer className="kiln-blockquote__cite">{cite}</footer>}
  </blockquote>
));

Blockquote.displayName = 'Blockquote';
export default Blockquote;
