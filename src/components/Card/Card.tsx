// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React from 'react';
import { cn, Slot } from '../../utils';
import './Card.css';

export type CardVariant = 'default' | 'raised' | 'glass' | 'gradient-border';

export interface CardProps {
  variant?: CardVariant;
  hoverLift?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  as?: React.ElementType;
  /** Merges props onto child element instead of rendering a wrapper */
  asChild?: boolean;
  onClick?: React.MouseEventHandler;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverLift = false,
  className = '',
  style,
  children,
  as: Tag = 'div',
  asChild = false,
  onClick,
}) => {
  const classes = cn(
    'kiln-card',
    `kiln-card--${variant}`,
    hoverLift && 'kiln-card--hover-lift',
    onClick && 'kiln-card--clickable',
    className,
  );

  if (asChild) {
    return (
      <Slot
        className={classes}
        style={style}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent); }
        } : undefined}
      >
        {children}
      </Slot>
    );
  }

  return (
    <Tag
      className={classes}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent); }
      } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Card;
