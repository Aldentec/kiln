// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React from 'react';
import { cn, Slot } from '../../utils';
import './Card.css';

export type CardVariant = 'default' | 'raised' | 'glass' | 'gradient-border' | 'coming-soon';

export interface CardProps {
  variant?: CardVariant;
  hoverLift?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  as?: React.ElementType;
  /** Merges props onto child element instead of rendering a wrapper */
  asChild?: boolean;
  onClick?: React.MouseEventHandler;
  /** `variant="coming-soon"` — heading text. Defaults to "Coming soon". */
  title?: string;
  /** `variant="coming-soon"` — description beneath the title. */
  description?: string;
}

// ── WIP icon used by the coming-soon variant ──────────────
const WIPIcon: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="22" cy="22" r="20" fill="currentColor" opacity="0.08" />
    <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 3" opacity="0.35" />
    <circle cx="22" cy="22" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M22 22 L16 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 22 L28 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <circle cx="22" cy="22" r="2" fill="currentColor" />
  </svg>
);

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverLift = false,
  className = '',
  style,
  children,
  as: Tag = 'div',
  asChild = false,
  onClick,
  title,
  description,
}) => {
  const classes = cn(
    'kiln-card',
    `kiln-card--${variant}`,
    hoverLift && 'kiln-card--hover-lift',
    onClick && 'kiln-card--clickable',
    className,
  );

  // ── coming-soon variant renders its own structured content ──
  if (variant === 'coming-soon') {
    return (
      <Tag className={classes} style={style}>
        <div className="kiln-card__wip-body">
          <span className="kiln-card__wip-icon">
            <WIPIcon />
          </span>
          <p className="kiln-card__wip-title">{title ?? 'Coming soon'}</p>
          {(description ?? children) && (
            <p className="kiln-card__wip-description">
              {description ?? children}
            </p>
          )}
        </div>
      </Tag>
    );
  }

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
