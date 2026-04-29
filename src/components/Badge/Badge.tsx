import React from 'react';
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
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className = '',
}) => (
  <span
    className={[
      'kiln-badge',
      `kiln-badge--${variant}`,
      `kiln-badge--${size}`,
      className,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </span>
);

export default Badge;
