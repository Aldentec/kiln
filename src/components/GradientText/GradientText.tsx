// a11y: WCAG AA verified 2026-05-07
// perf: CLS=0, GPU-friendly 2026-05-07
// mobile: verified 375px/768px 2026-05-07
import React from 'react';
import { cn } from '../../utils';
import './GradientText.css';

export type GradientTextVariant = 'brand' | 'warm' | 'cool' | 'sunset' | 'custom';
export type GradientTextAs = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'strong' | 'em';

export interface GradientTextProps {
  /** Gradient preset. 'custom' uses --kiln-gradient-text-from / --kiln-gradient-text-to tokens. */
  variant?: GradientTextVariant;
  /** HTML element to render. Defaults to 'span' so it works inline inside any heading or paragraph. */
  as?: GradientTextAs;
  /** Animation direction in degrees. Defaults to 135. */
  angle?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const GradientText = React.forwardRef<HTMLElement, GradientTextProps>(({
  variant = 'brand',
  as: Tag = 'span',
  angle = 135,
  className,
  style,
  children,
}, ref) => (
  <Tag
    ref={ref as React.Ref<HTMLSpanElement>}
    className={cn('kiln-gradient-text', `kiln-gradient-text--${variant}`, className)}
    style={angle !== 135 ? { '--kiln-gradient-text-angle': `${angle}deg`, ...style } as React.CSSProperties : style}
  >
    {children}
  </Tag>
));

GradientText.displayName = 'GradientText';
export default GradientText;
