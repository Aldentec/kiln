// a11y: WCAG AA verified 2026-05-03 — semantic h1/h2/h3, aria-hidden tagline, id forwarding
// perf: CLS=0, no JS animations, GPU-friendly static layout 2026-05-03
// mobile: all text ≥ 16px @ 375px; h2/h3 actions stack below 600px (CSS media query)
import React from 'react';
import { cn } from '../../utils';
import './Header.css';

export type HeaderVariant = 'h1' | 'h2' | 'h3';

export interface HeaderProps {
  /**
   * Semantic heading level and visual size.
   * - `h1` — page-level title, displayed immediately after the Nav
   * - `h2` — section-level heading
   * - `h3` — sub-section heading
   * @default 'h2'
   */
  variant?: HeaderVariant;
  /**
   * Optional large decorative display text rendered above the heading.
   * Rendered with the Kiln brand gradient and hidden from assistive technology.
   * Pass a string — the gradient styling is applied automatically.
   */
  tagline?: string;
  /** Subtitle rendered beneath the heading in muted, smaller text. */
  description?: React.ReactNode;
  /** Right-aligned slot for action buttons, badges, or other controls. */
  actions?: React.ReactNode;
  /**
   * Renders a hairline separator below the header block.
   * @default false
   */
  divider?: boolean;
  /** The heading text. */
  children: React.ReactNode;
  /** Stable id — set this and reference it with `aria-labelledby` on the parent `<section>`. */
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({
  variant = 'h2',
  tagline,
  description,
  actions,
  divider = false,
  children,
  id,
  className,
  style,
}) => {
  const Tag = variant as React.ElementType;

  return (
    <div
      className={cn('kiln-header', `kiln-header--${variant}`, className)}
      style={style}
    >
      {tagline && (
        <div className="kiln-header__tagline" aria-hidden="true">
          {tagline}
        </div>
      )}

      <div className="kiln-header__top">
        <div className="kiln-header__title-group">
          <Tag id={id} className="kiln-header__title">
            {children}
          </Tag>
          {description && (
            <p className="kiln-header__description">{description}</p>
          )}
        </div>

        {actions && (
          <div className="kiln-header__actions">
            {actions}
          </div>
        )}
      </div>

      {divider && <hr className="kiln-header__divider" aria-hidden="true" />}
    </div>
  );
};

export default Header;
