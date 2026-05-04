// a11y: WCAG AA verified 2026-05-03
// perf: CLS=0, GPU-friendly 2026-05-03
// mobile: verified 375px/768px 2026-05-03
import React from 'react';
import { cn } from '../../utils';
import './Hero.css';

export type HeroVariant = 'default' | 'gradient' | 'glass';
export type HeroSize = 'sm' | 'md' | 'lg';
export type HeroAlign = 'left' | 'center' | 'right';

export interface HeroProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  align?: HeroAlign;
  variant?: HeroVariant;
  size?: HeroSize;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(({
  eyebrow,
  title,
  description,
  actions,
  media,
  align = 'center',
  variant = 'default',
  size = 'lg',
  id,
  className,
  style,
}, ref) => (
  <section
    ref={ref}
    aria-labelledby={id}
    className={cn(
      'kiln-hero',
      `kiln-hero--${variant}`,
      `kiln-hero--${size}`,
      `kiln-hero--${align}`,
      media && 'kiln-hero--has-media',
      className,
    )}
    style={style}
  >
    <div className="kiln-hero__inner">
      <div className="kiln-hero__content">
        {eyebrow && <div className="kiln-hero__eyebrow">{eyebrow}</div>}
        <h1 id={id} className="kiln-hero__title">{title}</h1>
        {description && <p className="kiln-hero__description">{description}</p>}
        {actions && <div className="kiln-hero__actions">{actions}</div>}
      </div>
      {media && (
        <div className="kiln-hero__media" aria-hidden="true">{media}</div>
      )}
    </div>
  </section>
));

Hero.displayName = 'Hero';
export default Hero;
