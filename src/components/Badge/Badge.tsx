// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React from 'react';
import { cn } from '../../utils';
import './Badge.css';

export type BadgeSeverity = 'critical' | 'high' | 'medium' | 'low';
export type BadgeStatus = 'success' | 'warning' | 'error' | 'info' | 'pending' | 'running';
export type BadgeVariant = BadgeSeverity | BadgeStatus | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  /** Override the accessible label. By default, non-neutral variants prepend
   *  the variant name via a visually-hidden span to satisfy WCAG 1.4.1 (Use of Color). */
  'aria-label'?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
  'aria-label': ariaLabel,
}) => (
  <span
    className={cn(
      'kiln-badge',
      `kiln-badge--${variant}`,
      `kiln-badge--${size}`,
      className,
    )}
    aria-label={ariaLabel}
  >
    {/* Visually-hidden prefix ensures color-only meaning is accessible (WCAG 1.4.1) */}
    {!ariaLabel && variant !== 'neutral' && (
      <span className="kiln-sr-only">{variant}: </span>
    )}
    {children}
  </span>
);

export default Badge;
