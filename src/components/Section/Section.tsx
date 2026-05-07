// a11y: WCAG AA verified 2026-05-07
// perf: CLS=0, GPU-friendly 2026-05-07
// mobile: verified 375px/768px 2026-05-07
import React from 'react';
import { cn } from '../../utils';
import './Section.css';

export type SectionBackground = 'default' | 'subtle' | 'emphasis' | 'transparent';

export interface SectionProps {
  /** Background fill variant. */
  background?: SectionBackground;
  /** Max-width of the inner content container. Set to 'full' to disable. */
  maxWidth?: string | 'full';
  /** Vertical padding size. */
  padding?: 'sm' | 'md' | 'lg' | 'none';
  /** Accessible landmark label. When set, the section gets role="region" and aria-label. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(({
  background = 'default',
  maxWidth = '1200px',
  padding = 'md',
  'aria-label': ariaLabel,
  className,
  style,
  children,
}, ref) => {
  const regionProps = ariaLabel ? { role: 'region' as const, 'aria-label': ariaLabel } : {};

  return (
    <section
      ref={ref}
      className={cn(
        'kiln-section',
        `kiln-section--${background}`,
        `kiln-section--pad-${padding}`,
        className,
      )}
      style={style}
      {...regionProps}
    >
      <div
        className="kiln-section__inner"
        style={maxWidth !== 'full' ? { maxWidth } : undefined}
      >
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
