import React from 'react';
import './Card.css';

export type CardVariant = 'default' | 'raised' | 'glass' | 'gradient-border';

export interface CardProps {
  variant?: CardVariant;
  hoverLift?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  onClick?: React.MouseEventHandler;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverLift = false,
  className = '',
  children,
  as: Tag = 'div',
  onClick,
}) => {
  const classes = [
    'kiln-card',
    `kiln-card--${variant}`,
    hoverLift ? 'kiln-card--hover-lift' : '',
    onClick ? 'kiln-card--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      className={classes}
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
